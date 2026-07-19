export default function BookLivestream() {
  return (
    <section className="bg-brand-dark text-white">
      <div className="section-container py-20 sm:py-24">
        <p className="text-center text-sm font-semibold tracking-wide">
          Book Livestream
        </p>
        <div className="heading-rule !bg-white" />

        <h2 className="mx-auto mt-10 max-w-3xl text-center text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          あなたのTokupackが、
          <br />
          <span className="text-brand">未来のK-Beauty</span> トレンド
          <br />
          をつくる。
        </h2>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-300">
          「Creator Sourcing Day」であなたが見つけたTokupackを、いち早くファンへ紹介し、
          <span className="font-semibold text-white">
            自分だけの特別なライブ配信
          </span>
          で魅力を発信しませんか？
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-neutral-400">
          今回の Korea Invitation Challenge では、Top Creators は
          <span className="font-semibold text-neutral-200">韓国3日間体験ツアー</span>
          など豪華特典を獲得するチャンス。限定Tokupackで、ライブを盛り上げ、ファンに特別な体験を届けよう。
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#reserve" className="btn-pill bg-brand text-white hover:opacity-90">
            Book Livestream →
          </a>
          <a
            href="#/competition"
            className="btn-pill border border-white/40 text-white hover:bg-white/10"
          >
            Explore Competition
          </a>
        </div>
      </div>
    </section>
  );
}
