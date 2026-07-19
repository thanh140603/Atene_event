interface Props {
  size?: number;
  className?: string;
}

/**
 * Stylized "トクパック" (TokuPack) badge — a magenta disc with playful
 * white kana, standing in for the brand logo from the mockup.
 */
export default function TokuPackLogo({ size = 88, className = '' }: Props) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-full bg-brand text-white shadow-lg ${className}`}
      style={{ width: size, height: size }}
      aria-label="TokuPack"
    >
      <span
        className="font-extrabold leading-none tracking-tight"
        style={{ fontSize: size * 0.3 }}
      >
        トク
      </span>
      <span
        className="font-extrabold leading-none tracking-tight"
        style={{ fontSize: size * 0.3, marginTop: size * 0.04 }}
      >
        パック
      </span>
    </div>
  );
}
