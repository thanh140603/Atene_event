import type { ResourcePack } from '../config';

export const tokupack: ResourcePack = {
  ja: {
    tokupack: {
      header: {
        wordmark: 'TOKUPACK REQUEST',
      },
      footer: {
        tagline: 'CREATOR SOURCING DAY — TOKUPACK',
        poweredBy: 'Powered by ATENE',
        copyright: '© 2026 ATENE. All rights reserved.',
      },
      hero: {
        eyebrow: 'CREATOR SOURCING DAY 2026 · TOKUPACK',
        title: '受け取りたいTOKUPACKを教えてください',
        subtitle:
          'イベント当日に受け取りたいブランドと、今後ライブ配信してみたいブランドを事前に教えてください。あなたにぴったりのK-Beauty体験をご用意します。',
      },
      form: {
        options: {
          allBrands: 'すべて希望する',
          other: 'その他',
          undecided: '特に決まっていない',
          otherCollab: '他のコラボレーション形式を希望する',
        },
        name: {
          label: 'あなたのお名前',
          help: '参加チケットに記載のお名前をご記入ください。',
          placeholder: '山田 花子',
          error: 'お名前を入力してください。',
        },
        tiktokId: {
          label: 'TikTok ID',
          help: 'TikTokのアカウントIDをご記入ください（例: @yourID）。',
          placeholder: '@yourID',
          error: 'TikTok IDを入力してください。',
        },
        email: {
          label: 'メールアドレス',
          help: '事前登録時に使用したメールアドレスをご記入ください。',
          placeholder: 'you@example.com',
          error: '有効なメールアドレスを入力してください。',
        },
        preferredBrand: {
          label:
            'イベント当日、どのブランドの「Tokupack」を一番受け取りたいですか？',
          error: '1つ選択してください。',
          otherPlaceholder: 'その他の内容をご記入ください',
          otherError: '内容を入力してください。',
        },
        liveCommerce: {
          label:
            '今後、どのブランドのTOKUPACKでライブ配信（ライブコマース）をしてみたいですか？',
          help: '複数選択できます。',
          error: '1つ以上選択してください。',
        },
        comment: {
          label: 'ご質問・ご要望（任意）',
          placeholder: 'ご自由にご記入ください',
        },
        submit: {
          idle: '送信する →',
          saving: '送信中…',
          error: '送信に失敗しました。時間をおいて再度お試しください。',
        },
        success: {
          title: '送信ありがとうございました',
          message:
            'TOKUPACKのリクエストを受け付けました。イベント当日の詳細はご登録のメールアドレスにご案内します。',
          back: '← イベントページに戻る',
        },
      },
    },
  },
  en: {
    tokupack: {
      header: {
        wordmark: 'TOKUPACK REQUEST',
      },
      footer: {
        tagline: 'CREATOR SOURCING DAY — TOKUPACK',
        poweredBy: 'Powered by ATENE',
        copyright: '© 2026 ATENE. All rights reserved.',
      },
      hero: {
        eyebrow: 'CREATOR SOURCING DAY 2026 · TOKUPACK',
        title: 'Tell us which TOKUPACK you want',
        subtitle:
          'Let us know in advance which brands you want to receive on the event day, and which brands you would like to livestream in the future. We will prepare the perfect K-Beauty experience just for you.',
      },
      form: {
        options: {
          allBrands: 'I want all of them',
          other: 'Other',
          undecided: 'Not decided yet',
          otherCollab: 'I would prefer another collaboration format',
        },
        name: {
          label: 'Your name',
          help: 'Please enter the name shown on your admission ticket.',
          placeholder: 'Hanako Yamada',
          error: 'Please enter your name.',
        },
        tiktokId: {
          label: 'TikTok ID',
          help: 'Please enter your TikTok account ID (e.g. @yourID).',
          placeholder: '@yourID',
          error: 'Please enter your TikTok ID.',
        },
        email: {
          label: 'Email address',
          help: 'Please enter the email address you used when you pre-registered.',
          placeholder: 'you@example.com',
          error: 'Please enter a valid email address.',
        },
        preferredBrand: {
          label:
            'On the event day, which brand’s "Tokupack" would you most like to receive?',
          error: 'Please select one option.',
          otherPlaceholder: 'Please describe your choice',
          otherError: 'Please enter the details.',
        },
        liveCommerce: {
          label:
            'Going forward, which brand’s TOKUPACK would you like to livestream (live commerce) with?',
          help: 'You can select more than one.',
          error: 'Please select at least one.',
        },
        comment: {
          label: 'Questions or requests (optional)',
          placeholder: 'Feel free to write anything here',
        },
        submit: {
          idle: 'Submit →',
          saving: 'Submitting…',
          error: 'Submission failed. Please wait a moment and try again.',
        },
        success: {
          title: 'Thank you for your submission',
          message:
            'We have received your TOKUPACK request. Details for the event day will be sent to your registered email address.',
          back: '← Back to the event page',
        },
      },
    },
  },
  ko: {
    tokupack: {
      header: {
        wordmark: 'TOKUPACK REQUEST',
      },
      footer: {
        tagline: 'CREATOR SOURCING DAY — TOKUPACK',
        poweredBy: 'Powered by ATENE',
        copyright: '© 2026 ATENE. All rights reserved.',
      },
      hero: {
        eyebrow: 'CREATOR SOURCING DAY 2026 · TOKUPACK',
        title: '받고 싶은 TOKUPACK을 알려주세요',
        subtitle:
          '이벤트 당일에 받고 싶은 브랜드와 앞으로 라이브 방송을 해보고 싶은 브랜드를 미리 알려주세요. 당신에게 꼭 맞는 K-Beauty 경험을 준비해 드립니다.',
      },
      form: {
        options: {
          allBrands: '모두 받고 싶어요',
          other: '기타',
          undecided: '아직 정하지 않았어요',
          otherCollab: '다른 협업 형태를 원해요',
        },
        name: {
          label: '이름',
          help: '참가 티켓에 기재된 이름을 입력해 주세요.',
          placeholder: '홍길동',
          error: '이름을 입력해 주세요.',
        },
        tiktokId: {
          label: 'TikTok ID',
          help: 'TikTok 계정 ID를 입력해 주세요 (예: @yourID).',
          placeholder: '@yourID',
          error: 'TikTok ID를 입력해 주세요.',
        },
        email: {
          label: '이메일',
          help: '사전 등록 시 사용한 이메일 주소를 입력해 주세요.',
          placeholder: 'you@example.com',
          error: '유효한 이메일 주소를 입력해 주세요.',
        },
        preferredBrand: {
          label:
            '이벤트 당일에 어떤 브랜드의 "Tokupack"을 가장 받고 싶으신가요?',
          error: '하나를 선택해 주세요.',
          otherPlaceholder: '기타 내용을 입력해 주세요',
          otherError: '내용을 입력해 주세요.',
        },
        liveCommerce: {
          label:
            '앞으로 어떤 브랜드의 TOKUPACK으로 라이브 방송(라이브 커머스)을 해보고 싶으신가요?',
          help: '여러 개 선택할 수 있습니다.',
          error: '하나 이상 선택해 주세요.',
        },
        comment: {
          label: '문의 및 요청 사항 (선택)',
          placeholder: '자유롭게 입력해 주세요',
        },
        submit: {
          idle: '보내기 →',
          saving: '보내는 중…',
          error: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        },
        success: {
          title: '보내주셔서 감사합니다',
          message:
            'TOKUPACK 요청을 접수했습니다. 이벤트 당일 상세 안내는 등록하신 이메일 주소로 보내드립니다.',
          back: '← 이벤트 페이지로 돌아가기',
        },
      },
    },
  },
};
