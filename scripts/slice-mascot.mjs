// Cắt sprite sheet 3x3 của linh vật thành từng icon rời trong public/mascots/icons.
// Chạy lại khi thay sprite: node scripts/slice-mascot.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SHEET = "public/mascots/bunny-reactions.webp";
const OUT_DIR = "public/mascots/icons";
const TILE = 360;
const SIZE = 256;

// Thứ tự ô đúng theo sprite sheet của thư viện page-mascot.
const MOODS = [
  "blink",
  "heart",
  "sparkle",
  "surprised",
  "wink",
  "bashful",
  "sleepy",
  "dizzy",
  "delighted",
];

await mkdir(OUT_DIR, { recursive: true });

for (const [i, mood] of MOODS.entries()) {
  const left = (i % 3) * TILE;
  const top = Math.floor(i / 3) * TILE;

  // Không cắt viền trong suốt: giữ nguyên khung 360px để cả 9 icon cùng một tỉ
  // lệ, nếu cắt riêng từng ô thì mỗi con thỏ sẽ to nhỏ khác nhau.
  await sharp(SHEET)
    .extract({ left, top, width: TILE, height: TILE })
    .resize(SIZE, SIZE)
    .webp({ quality: 90 })
    .toFile(`${OUT_DIR}/bunny-${mood}.webp`);

  console.log(`bunny-${mood}.webp`);
}

console.log(`\nDa cat ${MOODS.length} icon vao ${OUT_DIR}`);
