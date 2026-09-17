import Link from "next/link";
import {
  ArrowRight,
  Link2,
  ClipboardList,
  Wallet,
  Send,
  TicketPercent,
  ShieldCheck,
  Sparkles,
  Gift,
  Zap,
  Users,
  BadgeCheck,
} from "lucide-react";
// Platform icons dùng trực tiếp từ Icons8 CDN (không cần import component)
import { Reveal } from "@/components/marketing/Reveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { PublicFloatingSupport } from "@/components/marketing/PublicFloatingSupport";
import { SocialProofSection } from "@/components/marketing/SocialProofSection";
import { DemoConvertLink } from "@/components/marketing/DemoConvertLink";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

/* ─── Icon bay tứ tung — dùng plasticine CDN từ Icons8 (Shopee, TikTok, Lazada) ─── */
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";
const I8 = I8_PLASTICINE;
const FLOATING_ICONS = [
  { src: `${I8_PLASTICINE}/shopee.png`,  alt: "Shopee",  size: 46, cls: "float-icon-1 sparkle-1", style: { top: "8%",   left: "3%"    } },
  { src: `${I8_PLASTICINE}/tiktok.png`,  alt: "TikTok",  size: 40, cls: "float-icon-2 sparkle-2", style: { top: "5%",    left: "21%"   } },
  { src: `${I8_PLASTICINE}/lazada.png`,  alt: "Lazada",  size: 44, cls: "float-icon-3 sparkle-3", style: { top: "30%",   left: "2%"    } },
  { src: `${I8_PLASTICINE}/shopee.png`,  alt: "Shopee",  size: 34, cls: "float-icon-4 sparkle-1", style: { bottom: "18%", left: "5%"   } },
  { src: `${I8_PLASTICINE}/tiktok.png`,  alt: "TikTok",  size: 36, cls: "float-icon-5 sparkle-2", style: { bottom: "8%",  left: "22%"  } },
  { src: `${I8_PLASTICINE}/lazada.png`,  alt: "Lazada",  size: 50, cls: "float-icon-6 sparkle-3", style: { top: "48%",   left: "42%"   } },
  { src: `${I8_PLASTICINE}/shopee.png`,  alt: "Shopee",  size: 40, cls: "float-icon-7 sparkle-1", style: { bottom: "28%", right: "3%"  } },
  { src: `${I8_PLASTICINE}/tiktok.png`,  alt: "TikTok",  size: 32, cls: "float-icon-8 sparkle-2", style: { top: "38%",   left: "12%"   } },
  { src: `${I8_PLASTICINE}/lazada.png`,  alt: "Lazada",  size: 38, cls: "float-icon-1 sparkle-3", style: { top: "14%",   right: "4%"   } },
];

/* ─── Feature cards - Dùng Icons8 Dusk style cho icon đẹp hơn ─── */
const BUNNY_FEATURES = [
  {
    iconSrc: "https://img.icons8.com/dusk/64/link--v1.png",
    useLucideIcon: false,
    color: "from-[#FFF0F4] to-white",
    border: "border-[#FFDFE8]",
    dot: "bg-primary",
    title: "Tạo link tức thì",
    description: "Tạo link Shopee, TikTok Shop hoặc Lazada nhanh chóng chỉ với 1 click. Mua gì cũng hoàn, không bỏ lỡ ưu đãi.",
  },
  {
    iconSrc: `${I8_PLASTICINE}/combo-chart.png`,
    color: "from-[#E3F5EA] to-white",
    border: "border-[#B7E4C7]",
    dot: "bg-green-500",
    title: "Theo dõi minh bạch",
    description: "Theo dõi đơn hàng, tiền hoàn theo thời gian thực. Mọi thông tin rõ ràng, đáng tin cậy.",
  },
  {
    iconSrc: `${I8_PLASTICINE}/cash-in-hand.png`,
    color: "from-[#FFF6EF] to-white",
    border: "border-[#FFDCC2]",
    dot: "bg-orange-400",
    title: "Rút tiền từ 10K",
    description: "Rút tiền linh hoạt chỉ từ 10.000đ. Về ví nhanh chóng, không cần chờ lâu.",
  },
  {
    iconSrc: `${I8_PLASTICINE}/gift.png`,
    color: "from-[#F0ECFB] to-white",
    border: "border-[#D8CCF5]",
    dot: "bg-purple-400",
    title: "Mời bạn nhận 5%",
    description: "Mời bạn bè dùng hệ thống, nhận ngay 5% trên tiền hoàn của bạn bè mỗi đơn.",
  },
];

const FEATURES = [
  {
    icon: Link2,
    color: "bg-[#FFF0F4]",
    iconColor: "text-primary",
    title: "Tạo link hoàn tiền tức thì",
    description: "Dán link sản phẩm Shopee, TikTok Shop hoặc Lazada — hệ thống tự sinh link riêng cho bạn ngay lập tức.",
  },
  {
    icon: ClipboardList,
    color: "bg-[#E3F5EA]",
    iconColor: "text-green-600",
    title: "Theo dõi đơn hàng minh bạch",
    description: "Mọi đơn hàng được ghi nhận rõ ràng: chờ xác nhận, đã duyệt, số tiền hoàn từng đơn.",
  },
  {
    icon: Wallet,
    color: "bg-[#FFF6EF]",
    iconColor: "text-orange-500",
    title: "Rút tiền từ 10.000đ",
    description: "Đủ ngưỡng tối thiểu là rút được ngay về ngân hàng, không phí ẩn.",
  },
  {
    icon: Send,
    color: "bg-[#EEF5FF]",
    iconColor: "text-blue-500",
    title: "Bot Telegram tự động",
    description: "Gửi link thẳng vào Telegram, bot tự đổi link và báo khi đơn được duyệt — không cần mở web.",
  },
  {
    icon: TicketPercent,
    color: "bg-[#F0ECFB]",
    iconColor: "text-purple-500",
    title: "Kho voucher độc quyền",
    description: "Cập nhật voucher, mã giảm giá theo từng sàn để tối ưu thêm phần tiết kiệm mỗi đơn.",
  },
  {
    icon: ShieldCheck,
    color: "bg-[#FFF0F4]",
    iconColor: "text-primary",
    title: "Đối soát minh bạch",
    description: "Dữ liệu đối soát hoa hồng từ sàn được nhập và tính toán rõ ràng, không mập mờ.",
  },
];

const STEPS = [
  {
    iconSrc: `${I8_PLASTICINE}/add-user-male.png`,
    color: "from-[#FFF0F4] to-[#FFDFE8]",
    numberColor: "text-primary",
    title: "Đăng ký tài khoản",
    description: "Tạo tài khoản miễn phí trong chưa đầy 1 phút, không cần thẻ thanh toán.",
  },
  {
    iconSrc: `${I8_PLASTICINE}/link.png`,
    color: "from-[#EEF5FF] to-[#DBEAFE]",
    numberColor: "text-blue-500",
    title: "Dán link sản phẩm",
    description: "Copy link Shopee, TikTok Shop hoặc Lazada bạn muốn mua, dán vào hệ thống để lấy link hoàn tiền.",
  },
  {
    iconSrc: `${I8_PLASTICINE}/shopping-bag.png`,
    color: "from-[#FFF6EF] to-[#FFE5CC]",
    numberColor: "text-orange-500",
    title: "Mua sắm & nhận hoàn tiền",
    description: "Bấm vào link vừa tạo rồi mua sắm như bình thường — hoàn tiền tự động ghi nhận vào ví.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Hệ thống hoạt động như thế nào?",
    answer:
      "Khi bạn mua hàng qua link hoàn tiền của hệ thống, sàn thương mại điện tử sẽ trả một khoản hoa hồng affiliate. Chúng tôi chia lại phần lớn khoản này cho bạn dưới dạng tiền hoàn vào ví.",
  },
  {
    question: "Rút tiền tối thiểu bao nhiêu?",
    answer:
      "Mức rút tối thiểu là 10.000đ. Bạn có thể nhận về tài khoản ngân hàng sau khi đơn hàng được duyệt.",
  },
  {
    question: "Có mất phí sử dụng không?",
    answer: "Hoàn toàn miễn phí — không thu phí đăng ký, tạo link hay rút tiền.",
  },
  {
    question: "Hệ thống hỗ trợ những sàn nào?",
    answer: "Hiện tại hỗ trợ Shopee, TikTok Shop và Lazada. Các sàn khác sẽ được bổ sung trong thời gian tới.",
  },
  {
    question: "Tôi có thể dùng Telegram thay vì vào web không?",
    answer:
      "Có. Liên kết tài khoản Telegram trong mục Cá nhân, sau đó gửi link sản phẩm thẳng vào bot — bot tự đổi link và báo khi đơn được duyệt.",
  },
];

export function LandingPage({ totalPaidOut, totalCustomers }: { totalPaidOut: number; totalCustomers: number }) {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-ink">
      <MarketingHeader activePath="/" />

      <main className="pt-[90px]">

        {/* ═══ HERO SECTION ═══ */}
        <section className="relative overflow-hidden bg-white" style={{ minHeight: "90vh" }}>

          {/* Nền gradient pastel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 70% at 75% 50%, #FFDFE8 0%, #FFF0F4 40%, #ffffff 72%)",
            }}
          />

          {/* Lớp icon TikTok/Shopee/Lazada bay tứ tung — Icons8 CDN */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
            {FLOATING_ICONS.map(({ src, alt, size, cls, style }, i) => (
              <div
                key={i}
                className={`absolute ${cls}`}
                style={{ ...style, opacity: 0.78 }}
              >
                <img
                  src={src}
                  alt={alt}
                  width={size}
                  height={size}
                  loading="lazy"
                  style={{ width: size, height: size, objectFit: "contain" }}
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24
                          grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(90vh-64px)]">

            {/* LEFT — copy */}
            <div className="space-y-7 fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-[#E8558A]
                              text-white px-5 py-2 rounded-full shadow-md badge-glow text-[13px] font-bold">
                <Gift size={15} strokeWidth={2} />
                Trả bạn 80% hoa hồng · Mời bạn thêm 5%
              </div>

              {/* Headline */}
              <h1 className="text-balance text-[42px] md:text-[60px] font-black leading-[1.08] tracking-[-0.025em] text-ink">
                Tung tăng mua,{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #D13A6B 0%, #E8558A 100%)" }}
                >
                  không lo nhiều tiền
                </span>{" "}
                🐰
              </h1>

              <p className="text-[18px] text-body leading-relaxed max-w-lg">
                Vẫn cái giỏ hàng đó, vẫn cái giá đó — chỉ khác là mua qua đây thì{" "}
                <span className="font-bold text-ink">80% hoa hồng</span> sàn trả về túi bạn, không
                phải túi ai khác. Rút từ <span className="font-bold text-ink">10.000đ</span>, miễn
                phí trọn đời.
              </p>

              {/* Ví dụ bằng số thật — nói 80% suông thì khó hình dung */}
              <div className="flex flex-wrap items-center gap-sm rounded-2xl border border-primary-pale bg-white/80 px-lg py-md text-[14px] shadow-cute">
                <span className="font-bold text-ink">Đơn 1.000.000đ</span>
                <span className="text-mute">→ sàn trả hoa hồng ~80.000đ</span>
                <span className="text-mute">→</span>
                <span className="rounded-pill bg-primary-neutral px-md py-[3px] font-black text-primary">
                  bạn nhận ~57.000đ
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/register"
                  className="group relative inline-flex items-center justify-center gap-2
                             bg-gradient-to-r from-primary to-[#E8558A]
                             text-white px-8 py-4 rounded-2xl font-black text-[16px]
                             shadow-lg shadow-primary/30
                             hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5
                             active:scale-95 transition-all duration-200 overflow-hidden sheen gloss"
                >
                  Lấy tiền hoàn của tôi
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2
                             bg-white text-primary px-8 py-4 rounded-2xl font-bold text-[16px]
                             border-2 border-[#FFDFE8] hover:border-primary/40
                             hover:bg-[#FFF0F4] transition-all shadow-sm"
                >
                  Xem cách ăn tiền
                </a>
              </div>

              {/* Demo convert link */}
              <div className="pt-2">
                <DemoConvertLink />
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["✓ Không mất đồng nào", "✓ Rút bất cứ lúc nào", "✓ Giá mua y như cũ"].map((t) => (
                  <span
                    key={t}
                    className="text-[12px] font-bold text-body bg-white border border-[#FFDFE8]
                               px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Bunny mascot lớn + platform badges */}
            <div className="flex flex-col items-center justify-center gap-8 relative">
              {/* Vòng tròn nền hồng glowing */}
              <div
                className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, #FFDFE8 0%, #FFF0F4 50%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Bunny mascot */}
              <div className="relative z-10 bunny-pop wiggle">
                <BunnyMascot size={260} label="Linh vật thỏ BunnyHoanTien" />
              </div>

              {/* Platform badges bên dưới bunny — Icons8 CDN */}
              <div className="relative z-10 flex items-center gap-3 flex-wrap justify-center">
                {[
                  { src: `${I8}/shopee.png`,  name: "Shopee",    bg: "#FFF3E5", border: "#FFD0A0", textColor: "#EE4D2D" },
                  { src: `${I8}/tiktok.png`,  name: "TikTok",    bg: "#F5F5F5", border: "#DDDDDD", textColor: "#010101" },
                  { src: `${I8}/lazada.png`,  name: "Lazada",    bg: "#FFF0F7", border: "#FFCCDE", textColor: "#F0047F" },
                ].map(({ src, name, bg, border, textColor }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[14px]
                               shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 lift"
                    style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}
                  >
                    <img src={src} alt={name} width={22} height={22}
                         style={{ width: 22, height: 22, objectFit: "contain" }} loading="lazy" />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURE CARDS (dùng Icons8 Plasticine CDN) ═══ */}
        <section className="py-16 bg-white border-y border-[#FFDFE8]/60">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {BUNNY_FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className={`group flex items-start gap-4 rounded-3xl bg-gradient-to-br ${f.color}
                                border ${f.border} p-6 shadow-sm hover:shadow-lg
                                hover:-translate-y-1 transition-all duration-300`}
                  >
                    {/* Icon container */}
                    <div
                      className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center
                                 shadow-sm bg-white border border-white p-2"
                    >
                      {f.useLucideIcon ? (
                        <Zap className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-200" strokeWidth={2.5} />
                      ) : (
                        <img
                          src={f.iconSrc}
                          alt={f.title}
                          width={36}
                          height={36}
                          loading="lazy"
                          className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-2 h-2 rounded-full ${f.dot}`} />
                        <h2 className="font-black text-[16px] text-ink">{f.title}</h2>
                      </div>
                      <p className="text-mute text-[13px] leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ PLATFORM STRIP — Icons8 CDN ═══ */}
        <section className="py-12 bg-[#FAFAFA] border-b border-[#FFDFE8]/50">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <p className="text-center text-[12px] font-black uppercase tracking-[0.18em] text-mute mb-8">
              Hợp tác cùng các siêu nền tảng
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {[
                { src: `${I8}/shopee.png`,  name: "Shopee",     textColor: "#EE4D2D", bg: "#FFF8F5", border: "#FFE0D0" },
                { src: `${I8}/tiktok.png`,  name: "TikTok Shop", textColor: "#111111", bg: "#F7F7F7", border: "#E5E5E5" },
                { src: `${I8}/lazada.png`,  name: "Lazada",     textColor: "#F0047F", bg: "#FFF5FA", border: "#FFD6EC" },
              ].map(({ src, name, textColor, bg, border }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-2xl
                             shadow-sm hover:shadow-lg hover:-translate-y-1
                             transition-all duration-200 cursor-default lift"
                  style={{ background: bg, border: `1.5px solid ${border}` }}
                >
                  <img
                    src={src}
                    alt={name}
                    width={40}
                    height={40}
                    loading="lazy"
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                  <span className="text-[20px] font-black" style={{ color: textColor }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full
                          bg-[#FFDFE8]/30 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full
                          bg-[#FFF0F4]/50 blur-[60px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-4 bg-[#FFF0F4] border border-[#FFDFE8]
                                text-primary px-4 py-2 rounded-full text-[13px] font-bold">
                  <Sparkles size={14} />
                  Đơn giản · Minh bạch · Tự động
                </div>
                <h2 className="font-black text-[36px] md:text-[48px] text-ink tracking-tight">
                  Ba bước, tiền về ví
                </h2>
                <p className="text-mute text-[17px] max-w-xl mx-auto mt-3 leading-relaxed">
                  Không cài app lạ, không nhập thẻ, không đổi thói quen mua sắm.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((step, i) => (
                <Reveal key={i}>
                  <div
                    className={`group relative bg-gradient-to-br ${step.color} rounded-[36px] p-8
                                border border-white/60 shadow-md hover:shadow-xl
                                hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                  >
                    {/* Background number watermark */}
                    <div className="absolute -right-3 -top-3 font-black text-[120px] leading-none
                                    text-white/40 select-none group-hover:text-white/60 transition-colors">
                      {i + 1}
                    </div>

                    {/* Icon + step number */}
                    <div className="relative z-10 flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center
                                      shadow-sm p-2">
                        <img
                          src={step.iconSrc}
                          alt={step.title}
                          width={36}
                          height={36}
                          loading="lazy"
                          className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <span className={`text-[13px] font-black uppercase tracking-wide ${step.numberColor}`}>
                        Bước {i + 1}
                      </span>
                    </div>

                    <h3 className="font-black text-[22px] text-ink mb-2 relative z-10 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-body text-[14px] leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES BENTO ═══ */}
        <section id="features" className="py-24 bg-[#FAFAFA] border-t border-[#FFDFE8]/40">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="font-black text-[34px] md:text-[44px] text-ink tracking-tight">
                  Tại sao chọn{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #D13A6B 0%, #E8558A 100%)" }}
                  >
                    BunnyHoanTien?
                  </span>
                </h2>
                <p className="text-mute text-[17px] mt-3 max-w-lg mx-auto">
                  Được xây dựng để bạn luôn nhận được phần hoàn tiền cao nhất, nhanh nhất.
                </p>
              </div>
            </Reveal>

            {/* Main bento grid — 3 cột chuẩn trên desktop, tall card bên trái span 2 dòng */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

              {/* Hero bento — cao 2 dòng bên trái */}
              <Reveal className="lg:row-span-2 h-full">
                <div className="h-full bg-gradient-to-br from-primary to-[#E8558A] rounded-[40px] p-8 md:p-10
                                flex flex-col justify-between
                                shadow-xl shadow-primary/20 overflow-hidden relative min-h-[420px]">
                  {/* Decorative circle */}
                  <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full
                                  bg-white/10 pointer-events-none" />
                  <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full
                                  bg-white/5 pointer-events-none" />

                  <div className="relative z-10 space-y-5">
                    <h3 className="font-black text-[28px] md:text-[34px] text-white leading-tight tracking-tight">
                      Phần lớn hoa hồng<br/>là của bạn
                    </h3>
                    <p className="text-white/85 text-[15px] leading-relaxed">
                      Sàn trả hoa hồng cho việc giới thiệu đơn hàng. Chúng tôi giữ lại một phần nhỏ để vận hành, 80% còn lại trả thẳng cho bạn.
                    </p>
                    <ul className="space-y-3 pt-2">
                      {[
                        "Hoàn lên đến 80% hoa hồng affiliate",
                        "Cập nhật trạng thái đơn thời gian thực",
                        "Hàng ngàn mã giảm giá độc quyền",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-white text-[14px] font-semibold">
                          <BadgeCheck size={18} className="shrink-0 text-white" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bunny mascot nhỏ phía dưới */}
                  <div className="relative z-10 flex justify-end pt-6 opacity-95">
                    <BunnyMascot size={130} label="" />
                  </div>
                </div>
              </Reveal>

              {/* Bento phụ 1 — Rút tiền siêu tốc */}
              <Reveal>
                <div className="h-full bg-white rounded-[36px] p-7 border border-[#FFDFE8] shadow-md
                                hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5">
                  <div className="w-14 h-14 bg-[#FFF6EF] rounded-2xl flex items-center justify-center p-2.5 border border-[#FFDCC2]/60 shadow-sm">
                    <img src={`${I8_PLASTICINE}/cash-in-hand.png`} alt="Rút tiền" width={40} height={40} loading="lazy" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-black text-[20px] text-ink mb-2">Rút tiền siêu tốc</h4>
                    <p className="text-mute text-[14px] leading-relaxed">
                      Tiền hoàn về thẳng tài khoản ngân hàng trong 24h. Mức tối thiểu cực thấp: chỉ từ{" "}
                      <span className="font-black text-ink">10.000đ</span>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <Zap size={14} className="text-orange-400" />
                    <span className="text-[12px] font-bold text-orange-400">Xử lý siêu nhanh</span>
                  </div>
                </div>
              </Reveal>

              {/* Bento phụ 2 — Bot Telegram */}
              <Reveal>
                <div className="h-full bg-white rounded-[36px] p-7 border border-[#DBEAFE] shadow-md
                                hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5">
                  <div className="w-14 h-14 bg-[#EEF5FF] rounded-2xl flex items-center justify-center p-2.5 border border-[#BFDBFE]/60 shadow-sm">
                    <img src={`${I8_PLASTICINE}/telegram-app.png`} alt="Bot Telegram" width={40} height={40} loading="lazy" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-black text-[20px] text-ink mb-2">Bot Telegram</h4>
                    <p className="text-mute text-[14px] leading-relaxed">
                      Theo dõi đơn hàng tự động thông minh. Gửi link vào bot — nhận kết quả ngay lập tức không cần mở app.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <Send size={14} className="text-blue-400" />
                    <span className="text-[12px] font-bold text-blue-400">Hoạt động 24/7</span>
                  </div>
                </div>
              </Reveal>

              {/* Bento phụ 3 — Mã giảm giá */}
              <Reveal>
                <div className="h-full bg-gradient-to-br from-[#F0ECFB] to-white rounded-[36px] p-7
                                border border-[#D8CCF5] shadow-md
                                hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2.5 border border-[#D8CCF5]/60 shadow-sm">
                    <img src={`${I8_PLASTICINE}/ticket.png`} alt="Voucher" width={40} height={40} loading="lazy" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-black text-[20px] text-ink mb-2">Mã giảm giá</h4>
                    <p className="text-mute text-[14px] leading-relaxed">
                      Kho voucher độc quyền Freeship và giảm sâu lên tới 50% cập nhật hàng ngày.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-purple-100/60">
                    <TicketPercent size={14} className="text-purple-400" />
                    <span className="text-[12px] font-bold text-purple-400">Cập nhật liên tục</span>
                  </div>
                </div>
              </Reveal>

              {/* Bento phụ 4 — Mời bạn */}
              <Reveal>
                <div className="h-full bg-gradient-to-br from-[#FFF0F4] to-white rounded-[36px] p-7
                                border border-[#FFDFE8] shadow-md
                                hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2.5 border border-[#FFDFE8]/60 shadow-sm">
                    <img src={`${I8_PLASTICINE}/gift.png`} alt="Mời bạn" width={40} height={40} loading="lazy" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-black text-[20px] text-ink mb-2">Mời bạn +5%</h4>
                    <p className="text-mute text-[14px] leading-relaxed">
                      Chia sẻ link giới thiệu — nhận thêm 5% trên tiền hoàn của bạn bè mỗi khi họ mua hàng.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-pink-100/60">
                    <Gift size={14} className="text-primary" />
                    <span className="text-[12px] font-bold text-primary">Không giới hạn bạn bè</span>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ═══ SOCIAL PROOF ═══ */}
        <SocialProofSection totalPaidOut={totalPaidOut} totalCustomers={totalCustomers} />

        {/* ═══ FAQ ═══ */}
        <section className="py-24 bg-[#FAFAFA] border-t border-[#FFDFE8]/40">
          <div className="max-w-[800px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="font-black text-[32px] md:text-[42px] text-ink tracking-tight">
                  Câu hỏi thường gặp
                </h2>
                <p className="text-mute text-[16px] mt-2">Thắc mắc gì cũng có câu trả lời ở đây</p>
              </div>
            </Reveal>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ═══ CTA CUỐI TRANG ═══ */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Nền gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, #FFF0F4 0%, #FFFFFF 65%)",
            }}
          />

          {/* Floating icons nhỏ trang trí — Icons8 CDN */}
          <img src={`${I8}/shopee.png`} alt="" aria-hidden width={36} height={36}
               loading="lazy" className="absolute top-8 left-8 opacity-40 pointer-events-none float-icon-2"
               style={{ width: 36, height: 36, objectFit: "contain" }} />
          <img src={`${I8}/tiktok.png`} alt="" aria-hidden width={30} height={30}
               loading="lazy" className="absolute top-14 right-14 opacity-35 pointer-events-none float-icon-4"
               style={{ width: 30, height: 30, objectFit: "contain" }} />
          <img src={`${I8}/lazada.png`} alt="" aria-hidden width={40} height={40}
               loading="lazy" className="absolute bottom-12 left-20 opacity-40 pointer-events-none float-icon-6"
               style={{ width: 40, height: 40, objectFit: "contain" }} />
          <img src={`${I8}/shopee.png`} alt="" aria-hidden width={32} height={32}
               loading="lazy" className="absolute bottom-8 right-10 opacity-35 pointer-events-none float-icon-1"
               style={{ width: 32, height: 32, objectFit: "contain" }} />

          <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center relative z-10">
            <Reveal>
              <div className="space-y-7">
                {/* Bunny nhỏ trên cùng */}
                <div className="flex justify-center">
                  <div className="bunny-pop">
                    <BunnyMascot size={120} label="Thỏ mời bạn đăng ký" />
                  </div>
                </div>

                <h2 className="font-black text-[36px] md:text-[48px] text-ink leading-tight tracking-tight">
                  Trở thành bậc thầy{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #D13A6B 0%, #E8558A 100%)" }}
                  >
                    mua sắm thông minh
                  </span>
                </h2>

                <p className="text-[17px] text-mute leading-relaxed max-w-lg mx-auto">
                  Đăng ký miễn phí ngay hôm nay — nhận đặc quyền hoàn tiền lên tới 80% và hàng ngàn voucher độc quyền mỗi ngày.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2
                               bg-gradient-to-r from-primary to-[#E8558A]
                               text-white px-10 py-4 rounded-2xl font-black text-[17px]
                               shadow-lg shadow-primary/30
                               hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5
                               active:scale-95 transition-all duration-200 sheen gloss"
                  >
                    Đăng ký tài khoản miễn phí
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2
                               bg-white text-primary px-8 py-4 rounded-2xl font-bold text-[16px]
                               border-2 border-[#FFDFE8] hover:border-primary/40
                               hover:bg-[#FFF0F4] transition-all shadow-sm"
                  >
                    Tôi đã có tài khoản
                  </Link>
                </div>

                {/* Mini trust badges */}
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {[
                    { icon: ShieldCheck, label: "Bảo mật 100%", color: "text-green-500" },
                    { icon: Wallet,      label: "Rút tiền 24/7", color: "text-primary" },
                    { icon: Users,       label: "Cộng đồng đang dùng", color: "text-blue-500" },
                  ].map(({ icon: Icon, label, color }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 bg-white border border-[#F0F0F0]
                                 px-4 py-2 rounded-full text-[13px] font-bold text-ink shadow-sm"
                    >
                      <Icon size={14} className={color} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <MarketingFooter />
      <PublicFloatingSupport />
    </div>
  );
}
