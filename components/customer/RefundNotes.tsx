import { ShopeeIcon } from "@/components/icons/PlatformIcons";

// Nội dung lấy từ ảnh "6 điều lưu ý" cũ, chuyển sang chữ để đọc được trên mọi
// cỡ màn hình, chọn/sao chép được và trình đọc màn hình hiểu được.
const NOTES = [
  {
    icon: "blink",
    text: (
      <>
        <strong className="font-bold text-ink">Xoá sản phẩm khỏi giỏ hàng</strong> trước khi
        nhấp vào link chuyển đổi.
      </>
    ),
  },
  {
    icon: "surprised",
    text: (
      <>
        Bấm vào sản phẩm là <strong className="font-bold text-ink">mua luôn</strong> — đừng bấm
        sang sản phẩm khác, xem video hay live sau khi đã mở link.
      </>
    ),
  },
  {
    icon: "sleepy",
    text: (
      <>
        <strong className="font-bold text-ink">Thoát hẳn ứng dụng</strong> trước và sau khi đặt
        đơn.
      </>
    ),
  },
  {
    icon: "dizzy",
    text: (
      <>
        <strong className="font-bold text-negative">Không mua</strong> sản phẩm trong Live hoặc
        Video.
      </>
    ),
  },
  {
    icon: "bashful",
    text: (
      <>
        Mỗi lần chỉ đặt <strong className="font-bold text-ink">1 shop</strong> — không gộp nhiều
        shop trong cùng một lần thanh toán.
      </>
    ),
  },
  {
    icon: "heart",
    text: (
      <>
        Vào{" "}
        <a
          href="https://zalo.me/g/cgmmvw504"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary-active"
        >
          nhóm Zalo
        </a>{" "}
        để kiểm tra đơn đã được ghi nhận hay chưa.
      </>
    ),
  },
];

export function RefundNotes() {
  return (
    <section
      aria-labelledby="refund-notes-title"
      className="gloss rounded-3xl bg-white p-lg shadow-cute ring-1 ring-primary/[0.07] sm:p-xl"
    >
      <div className="mb-lg flex items-center gap-md">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-pale">
          <ShopeeIcon size={22} />
        </span>
        <div className="min-w-0">
          <h2 id="refund-notes-title" className="text-[17px] font-black leading-tight text-ink">
            6 điều cần nhớ
          </h2>
          <p className="text-[13px] leading-snug text-mute">Để đơn Shopee được ghi nhận hoàn tiền</p>
        </div>
      </div>

      <ol className="flex flex-col gap-sm">
        {NOTES.map((note, i) => (
          <li
            key={i}
            className="lift flex items-start gap-md rounded-2xl bg-canvas-soft px-md py-md ring-1 ring-primary/[0.06]"
          >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white ring-1 ring-primary/10">
              <img
                src={`/mascots/icons/bunny-${note.icon}.webp`}
                alt=""
                aria-hidden="true"
                width={34}
                height={34}
                loading="lazy"
                className="h-[34px] w-[34px] object-contain"
              />
              <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] font-black text-white ring-2 ring-white">
                {i + 1}
              </span>
            </span>
            <p className="pt-[3px] text-[14px] leading-relaxed text-body">{note.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
