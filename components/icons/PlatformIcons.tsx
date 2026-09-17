type IconProps = { size?: number; className?: string };

/** Icon bất kỳ từ Icons8 — dùng khi cần slug ngoài danh sách nền tảng bên dưới. */
export function Icons8Icon({
  slug,
  style = "plasticine",
  alt = "",
  size = 22,
  className = "",
}: IconProps & { slug: string; style?: string; alt?: string }) {
  return <Icons8Image size={size} className={className} style={style} slug={slug} alt={alt} />;
}

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

const PLATFORM_LOGOS: Record<string, (p: IconProps) => JSX.Element> = {
  SHOPEE: ShopeeIcon,
  TIKTOK: TiktokIcon,
  LAZADA: LazadaIcon,
};

export const PLATFORM_COLORS: Record<string, string> = {
  SHOPEE: "#EE4D2D",
  TIKTOK: "#000000",
  LAZADA: "#0F146D",
  TIKI: "#1A73E8",
};

/**
 * Logo sàn theo mã nền tảng ("SHOPEE" | "TIKTOK" | "LAZADA").
 * Sàn lạ chưa có logo thì trả về null để nơi gọi tự quyết định hiển thị gì.
 */
export function PlatformLogo({
  platform,
  size = 22,
  className = "",
}: IconProps & { platform: string }) {
  const Logo = PLATFORM_LOGOS[platform?.toUpperCase()];
  if (!Logo) return null;
  return <Logo size={size} className={className} />;
}
