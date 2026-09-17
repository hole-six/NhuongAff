import { useId } from "react";

type IconProps = { size?: number; className?: string };

function Icons8Image({
  size = 22,
  className = "",
  style,
  slug,
  alt,
}: IconProps & { style: string; slug: string; alt: string }) {
  return (
    <img
      src={`https://img.icons8.com/${style}/96/${slug}.png`}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

export function FacebookIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="facebook-new" alt="Facebook" />;
}

export function ZaloIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="zalo" alt="Zalo" />;
}

export function YoutubeIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="youtube-play" alt="Youtube" />;
}

export function InstagramIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="instagram-new" alt="Instagram" />;
}

export function ThreadsIcon(props: IconProps) {
  return <Icons8Image {...props} style="ios-filled" slug="threads" alt="Threads" />;
}

export function ShopeeIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="shopee" alt="Shopee" />;
}

export function GoogleIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="google-logo" alt="Google" />;
}

export function TiktokIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="tiktok" alt="Tiktok" />;
}

// Icons8 chưa có icon Lazada nên đây là bản vẽ tay theo logo gốc.
export function LazadaIcon({ size = 22, className = "" }: IconProps) {
  const gradId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Lazada"
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF8A1E" />
          <stop offset="1" stopColor="#F0047F" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="13" fill={`url(#${gradId})`} />
      <path
        d="M24 38.2c-1.1-.85-4.75-3.75-8-7.35-3.35-3.7-6-8.05-6-11.85 0-4.7 3.7-8.5 8.25-8.5 2.35 0 4.5 1.05 6 2.75a8.16 8.16 0 0 1 6-2.75c4.55 0 8.25 3.8 8.25 8.5 0 3.8-2.65 8.15-6 11.85-3.25 3.6-6.9 6.5-8 7.35a1.6 1.6 0 0 1-1.5 0Z"
        fill="#fff"
      />
    </svg>
  );
}
