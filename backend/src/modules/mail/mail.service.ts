import { existsSync } from 'fs';
import { join } from 'path';

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { Booking } from '../../entities/booking.entity';

// Bundled at build time via nest-cli "assets" → dist/assets/banner.png.
// __dirname at runtime is dist/modules/mail, so climb two levels to dist.
const BANNER_PATH = join(__dirname, '..', '..', 'assets', 'banner.png');

/**
 * Sends transactional email via SMTP (Gmail by default).
 *
 * Required env vars (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   MAIL_FROM     — the "From" address shown to recipients
 *   MAIL_REPLY_TO — (optional) address booker replies go to
 *
 * For Gmail: SMTP_PASS must be a 16-char App Password (not your login
 * password), and 2-Step Verification must be enabled on the account.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter(): nodemailer.Transporter | null {
    if (this.transporter) return this.transporter;

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      this.logger.warn(
        'SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASS missing) — skipping email send.',
      );
      return null;
    }

    const port = Number(process.env.SMTP_PORT) || 587;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user, pass },
    });
    return this.transporter;
  }

  /** Send a "you booked successfully" email to the booker. Never throws. */
  async sendBookingConfirmation(booking: Booking): Promise<void> {
    if (!booking.email) {
      this.logger.warn(`Booking #${booking.id} has no email — cannot notify.`);
      return;
    }

    const transporter = this.getTransporter();
    if (!transporter) return;

    // Embed the banner inline so it renders without any public hosting.
    const hasBannerFile = existsSync(BANNER_PATH);
    const attachments = hasBannerFile
      ? [{ filename: 'banner.png', path: BANNER_PATH, cid: 'banner' }]
      : [];

    try {
      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: booking.email,
        replyTo: process.env.MAIL_REPLY_TO || undefined,
        subject: '【TOKUPACK】ライブ配信日程確定のお知らせ',
        html: this.buildConfirmationHtml(booking, hasBannerFile),
        attachments,
      });
      this.logger.log(
        `Confirmation email sent to ${booking.email} for booking #${booking.id}.`,
      );
    } catch (err) {
      // Don't fail the booking if email delivery fails — just log it.
      this.logger.error(
        `Failed to send confirmation email for booking #${booking.id}: ${
          (err as Error).message
        }`,
      );
    }
  }

  /** Escape user-supplied text before inserting into the HTML email. */
  private esc(v: string): string {
    return String(v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Builds the confirmation email body (Japanese template).
   * `[Tên KOL] 様` → booker's name, falling back to their email address.
   */
  private buildConfirmationHtml(booking: Booking, hasBannerFile = false): string {
    // Name shown after 様 — use the booker's name, else their email.
    const kolName = this.esc(booking.creatorName || booking.email || 'お客様');

    // One block per reserved slot: brand / date / time. Every line carries
    // the same explicit style so mail clients (and Gmail auto-translate)
    // can't render them at different sizes/indents.
    const detailLine = (text: string) =>
      `<p style="margin:4px 0;font-size:14px;line-height:1.7;">・${text}</p>`;
    const bookingDetails = booking.slots
      .map((s) =>
        [
          detailLine(`対象ブランド（Brand）：${this.esc(s.brand)}`),
          detailLine(`配信日程（Date）：${this.esc(s.date)}`),
          detailLine(`配信時間（Time）：${this.esc(s.start)}〜${this.esc(s.end)}`),
        ].join(''),
      )
      .join(
        '<hr style="border:none;border-top:1px dashed #ddd;margin:12px 0;" />',
      );

    // Prefer the bundled inline image (cid:banner); fall back to a hosted URL.
    const bannerSrc = hasBannerFile
      ? 'cid:banner'
      : process.env.MAIL_BANNER_URL || '';
    const banner = bannerSrc
      ? `<img src="${bannerSrc}" alt="CREATOR SOURCING DAY" style="width:100%;max-width:600px;display:block;border-radius:8px;" />`
      : '';

    return `
    <div style="font-family:'Hiragino Kaku Gothic ProN','Meiryo',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;line-height:1.7;">
      ${banner}

      <p style="font-weight:bold;margin:20px 0 12px;">${kolName} 様</p>

      <p style="margin:0 0 4px;">いつも大変お世話になっております。</p>
      <p style="margin:0 0 16px;">この度は、公式サイトよりライブ配信のご予約をいただき、誠にありがとうございます。</p>

      <p style="font-weight:bold;margin:0 0 12px;">ご予約内容が確定いたしましたので、以下の通りお知らせいたします：</p>

      <hr style="border:none;border-top:1px solid #333;margin:12px 0;" />
      <p style="font-weight:bold;margin:0 0 8px;">📌 ご予約内容（Booking Details）</p>
      ${bookingDetails}
      <hr style="border:none;border-top:1px solid #333;margin:12px 0;" />

      <p style="margin:12px 0 4px;">※ ライブ配信を追加でご予約される場合は、下記ウェブサイトよりご予約手続きをお願いいたします。</p>
      <p style="margin:0 0 20px;">👉 <a href="https://www.atene.asia" style="color:#e6007e;">https://www.atene.asia</a></p>

      <div style="background:#ec1a8d;color:#fff;padding:16px 20px;border-radius:6px;">
        <p style="font-weight:bold;margin:0 0 8px;">■ お問い合わせ先（Contact Info）</p>
        <p style="margin:0 0 8px;">ご質問や日時の変更がございましたら、サポート用に作成された [LINE / Lark] グループ、または下記メールアドレスへご連絡をお願いいたします。</p>
        <p style="margin:0;">・Email：<a href="mailto:team@atene.kr" style="color:#fff;text-decoration:underline;">team@atene.kr</a></p>
      </div>

      <p style="color:#888;font-size:12px;margin-top:16px;">※本メールは送信専用アドレスより自動送信されています。</p>
    </div>`;
  }
}
