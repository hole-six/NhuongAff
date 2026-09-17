import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import {
  FacebookIcon,
  ZaloIcon,
  YoutubeIcon,
  TiktokIcon,
  InstagramIcon,
  ThreadsIcon,
} from "@/components/icons/PlatformIcons";
import { BunnyFace } from "@/components/ui/BunnyFace";

const SOCIAL_LINKS = [
  { key: "zalo", label: "Zalo", href: "https://zalo.me/g/cgmmvw504", Icon: ZaloIcon },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/share/1BShYKizDV/?mibextid=wwXIfr", Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@vi_ha790?_r=1&_t=ZS-983XgTM1aum", Icon: TiktokIcon },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@iviback", Icon: YoutubeIcon },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/imviihaaa?igsh=M2RqZml1NHpzbmgx&utm_source=qr", Icon: InstagramIcon },
  { key: "threads", label: "Threads", href: "https://www.threads.com/@imviihaaa?igshid=NTc4MTIwNjQ2YQ==", Icon: ThreadsIcon },
];

const LINK_GROUPS = [
  {
    title: "Bắt đầu",
    links: [
      { label: "Tạo tài khoản miễn phí", href: "/register" },
      { label: "Đăng nhập", href: "/login" },
      { label: "Cách hoạt động", href: "/huong-dan" },
    ],
  },
  {
    title: "Khám phá",
    links: [
      { label: "Cửa hàng", href: "/cua-hang" },
      { label: "Ưu đãi hôm nay", href: "/uu-dai" },
      { label: "Câu hỏi thường gặp", href: "/faq" },
    ],
  },
  {
    title: "Minh bạch",
    links: [
      { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
      { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="bg-canvas-soft pt-3xl">
      <div className="mx-auto max-w-[1160px] px-lg">
        {/* Dải kêu gọi hành động nổi hẳn lên trên phần chân trang */}
        <div className="gloss relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary via-[#E8558A] to-[#F2809E] px-lg py-2xl text-center shadow-glow sm:px-2xl">
          <div className="relative z-10 mx-auto flex max-w-[620px] flex-col items-center gap-md">
            <BunnyFace mood="delighted" size={78} className="float drop-shadow" />
            <h2 className="text-balance text-[26px] font-black leading-tight tracking-tight text-white sm:text-[32px]">
              Tung tăng mua sắm, để tiền tự chạy về ví
            </h2>
            <p className="text-[15px] leading-relaxed text-white/85">
              Mở tài khoản chưa tới một phút. Không phí, không ràng buộc, mua như thường ngày là
              đã có tiền hoàn.
            </p>
            <Link
              href="/register"
              className="sheen mt-xs inline-flex min-h-[52px] items-center gap-sm rounded-pill bg-white px-2xl text-[15px] font-black text-primary shadow-cute-lg transition-transform duration-200 ease-soft hover:-translate-y-[2px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Nhận tiền hoàn ngay
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Thân chân trang: thương hiệu bên trái, ba nhóm liên kết bên phải */}
        <div className="grid grid-cols-1 gap-2xl py-2xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)]">
          <div>
            <p className="text-[22px] font-black leading-none tracking-tight text-primary">
              BunnyHoanTien
            </p>
            <p className="mt-sm max-w-[380px] text-[14px] leading-relaxed text-mute">
              Nền tảng hoàn tiền cho Shopee, TikTok Shop và Lazada. Bạn mua như bình thường, phần
              hoa hồng affiliate được chia lại phần lớn cho bạn.
            </p>

            <div className="mt-lg flex flex-col gap-sm">
              <a
                href="tel:0965965439"
                className="inline-flex min-h-[44px] w-fit items-center gap-sm rounded-pill border border-primary-pale bg-white px-lg text-[13px] font-bold text-ink transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Phone size={15} strokeWidth={2.5} className="text-primary" aria-hidden="true" />
                0965.965.439
              </a>
              <a
                href="mailto:hoadt122@gmail.com"
                className="inline-flex min-h-[44px] w-fit items-center gap-sm rounded-pill border border-primary-pale bg-white px-lg text-[13px] font-bold text-ink transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail size={15} strokeWidth={2.5} className="text-primary" aria-hidden="true" />
                hoadt122@gmail.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-xl sm:grid-cols-3">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-primary/70">
                  {group.title}
                </h3>
                <ul className="mt-md flex flex-col gap-sm">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[14px] font-medium text-body transition-colors duration-200 hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mạng xã hội dạng nhãn có chữ — icon trơn khó đoán là kênh nào */}
        <div className="border-t border-primary-pale/70 py-xl">
          <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-primary/70">
            Cộng đồng
          </h3>
          <ul className="mt-md flex flex-wrap gap-sm">
            {SOCIAL_LINKS.map(({ key, label, href, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift inline-flex min-h-[44px] items-center gap-sm rounded-pill border border-primary-pale bg-white px-lg text-[13px] font-bold text-ink transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon size={18} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-pale/70 bg-white/70">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-xs px-lg py-lg text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[12px] font-medium text-mute">
            © {new Date().getFullYear()} BunnyHoanTien — Hoàn tiền cho người mua sắm thông minh.
          </p>
          <p className="text-[12px] text-mute">
            Tiền hoàn được tính trên hoa hồng affiliate thực nhận từ sàn.
          </p>
        </div>
      </div>
    </footer>
  );
}
