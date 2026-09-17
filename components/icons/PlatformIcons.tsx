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
  return <Icons8Image {...props} style="plasticine" slug="shopee" alt="Shopee" />;
}

export function GoogleIcon(props: IconProps) {
  return <Icons8Image {...props} style="color" slug="google-logo" alt="Google" />;
}

export function TiktokIcon(props: IconProps) {
  return <Icons8Image {...props} style="plasticine" slug="tiktok" alt="Tiktok" />;
}

export function LazadaIcon(props: IconProps) {
  return <Icons8Image {...props} style="plasticine" slug="lazada" alt="Lazada" />;
}
