// Ảnh tĩnh cắt từ sprite sheet 3x3 của linh vật — không chạy JS nên dùng được
// ở nhiều chỗ cùng lúc, khác với <BunnyMascot> (bám theo con trỏ, chỉ nên có một).
const SHEET = "/mascots/bunny-reactions.webp";

const MOODS = {
  blink: 0,
  heart: 1,
  sparkle: 2,
  surprised: 3,
  wink: 4,
  bashful: 5,
  sleepy: 6,
  dizzy: 7,
  delighted: 8,
} as const;

export type BunnyMood = keyof typeof MOODS;

export function BunnyFace({
  mood = "blink",
  size = 72,
  className = "",
}: {
  mood?: BunnyMood;
  size?: number;
  className?: string;
}) {
  const index = MOODS[mood];
  return (
    <span
      role="img"
      aria-label="Linh vật thỏ"
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundImage: `url(${SHEET})`,
        backgroundSize: "300% 300%",
        backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
