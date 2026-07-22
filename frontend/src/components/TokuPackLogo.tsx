interface Props {
  size?: number;
  className?: string;
}

/**
 * The トクパック (TokuPack) logo — the disc cropped from the delivered
 * `homepage/02_About The Event/Tokupaku.png` (served at /tokupack-logo.png).
 */
export default function TokuPackLogo({ size = 88, className = '' }: Props) {
  return (
    <img
      src="/tokupack-logo.png"
      alt="TokuPack"
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
