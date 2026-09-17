import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Sparkles, ArrowRight, Check, Zap, Link2, ShoppingCart, Wallet } from "lucide-react";
import Link from "next/link";
import { safeJsonLdString } from "@/lib/jsonLd";

// Logo nền tảng từ Icons8 CDN
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";

export const metadata: Metadata = {
  title: "Hướng Dẫn Sử Dụng — BunnyHoanTien Hoàn Tiền Shopee, TikTok Shop, Lazada",
  description: "Cách sử dụng nền tảng hoàn tiền BunnyHoanTien: 3 bước đơn giản để mua sắm Shopee, TikTok Shop, Lazada và nhận hoàn tiền tự động.",
  alternates: { canonical: "/huong-dan" },
  openGraph: {
    title: "Hướng Dẫn Sử Dụng — BunnyHoanTien Hoàn Tiền Shopee, TikTok Shop, Lazada",
    description: "Cách sử dụng nền tảng hoàn tiền BunnyHoanTien: 3 bước đơn giản để mua sắm Shopee, TikTok Shop, Lazada và nhận hoàn tiền tự động.",
    type: "website",
    locale: "vi_VN",
    url: "/huong-dan",
    siteName: "BunnyHoanTien",
  },
};

const STEPS = [
  {
    icon: Zap,
    iconColor: "from-purple-400 to-pink-500",
    title: "Đăng ký tài khoản",
    description: "Tạo tài khoản miễn phí trong chưa đầy 1 phút, không cần thẻ thanh toán. Bạn chỉ cần điền thông tin cơ bản để hệ thống tạo ví nhận hoàn tiền cho bạn.",
    bunny: "/mascots/icons/bunny-heart.webp",
  },
  {
    icon: Link2,
    iconColor: "from-blue-400 to-cyan-500",
    title: "Dán link sản phẩm",
    description: "Copy link Shopee, TikTok Shop hoặc Lazada bạn muốn mua, dán vào hệ thống để lấy link hoàn tiền. Hệ thống sẽ tự động sinh ra một link dành riêng cho bạn.",
    bunny: "/mascots/icons/bunny-wink.webp",
  },
  {
    icon: Wallet,
    iconColor: "from-emerald-400 to-green-500",
    title: "Mua sắm & nhận hoàn tiền",
    description: "Bấm vào link vừa tạo rồi mua sắm như bình thường. Khi đơn hàng giao thành công, hoàn tiền sẽ tự động ghi nhận vào ví và có thể rút bất cứ lúc nào.",
    bunny: "/mascots/icons/bunny-sparkle.webp",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://hoahuongaff.click/" },
    { "@type": "ListItem", position: 2, name: "Hướng Dẫn", item: "https://hoahuongaff.click/huong-dan" },
  ],
};

export default function HuongDanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas via-primary-neutral/20 to-purple-50/30 font-sans overflow-x-hidden text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbJsonLd) }} />
      <MarketingHeader activePath="/huong-dan" />

      <main className="pt-[90px] relative">
        {/* Floating icons */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.25 }}>
          <img src={`${I8_PLASTICINE}/shopee.png`} alt="" className="absolute top-[15%] left-[6%] w-14 h-14 float-icon-1 sparkle-1" />
          <img src={`${I8_PLASTICINE}/tiktok.png`} alt="" className="absolute top-[25%] right-[10%] w-12 h-12 float-icon-2 sparkle-2" />
          <img src={`${I8_PLASTICINE}/lazada.png`} alt="" className="absolute bottom-[30%] left-[8%] w-16 h-16 float-icon-3 sparkle-3" />
        </div>

        {/* Header Hero */}
        <section className="relative py-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-100/30 to-pink-100/30" />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-lg text-center">
            <div className="inline-flex items-center gap-md mb-xl">
              <img src="/mascots/icons/bunny-delighted.webp" alt="" className="w-16 h-16 object-contain bounce-in" />
              <div className="inline-flex items-center gap-2 px-xl py-md rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm">
                <Check size={18} className="text-purple-500" />
                <span className="text-[13px] font-bold text-purple-700">Cực kỳ dễ dàng</span>
              </div>
              <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-16 h-16 object-contain bounce-in" style={{ animationDelay: '0.2s' }} />
            </div>

            <h1 className="text-[48px] md:text-[64px] font-black tracking-tight mb-md leading-tight">
              Hướng dẫn{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Sử Dụng
              </span>
            </h1>
            
            <p className="text-[18px] text-body max-w-2xl mx-auto leading-relaxed">
              Chỉ với <strong className="text-primary">3 bước cực kỳ đơn giản</strong>, bạn đã có thể bắt đầu tích luỹ hoàn tiền cho mỗi đơn mua sắm trực tuyến.
            </p>
          </div>
        </section>

        {/* Steps Timeline - Vertical Layout */}
        <section className="relative z-10 py-3xl max-w-[1000px] mx-auto px-lg">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[40px] top-[80px] bottom-[80px] w-1 bg-gradient-to-b from-purple-300 via-pink-300 to-rose-300 hidden md:block" />

            <div className="space-y-3xl">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={index} 
                    className="relative fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex flex-col md:flex-row gap-xl items-start">
                      {/* Left: Number & Icon */}
                      <div className="relative shrink-0">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.iconColor} shadow-2xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform`}>
                          <Icon size={36} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-canvas">
                          <span className="text-[16px] font-black text-ink">{index + 1}</span>
                        </div>
                      </div>

                      {/* Right: Content Card */}
                      <div className="flex-1 group">
                        <div className="relative overflow-hidden rounded-[32px] bg-white p-2xl border-2 border-primary/10 shadow-cute hover:shadow-2xl hover:-translate-y-2 transition-all">
                          {/* Decorative bunny watermark */}
                          <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
                            <img src={step.bunny} alt="" className="w-32 h-32 object-contain" />
                          </div>

                          <div className="relative">
                            <h3 className="text-[28px] font-black text-ink mb-md">{step.title}</h3>
                            <p className="text-[16px] text-body leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="relative z-10 py-xl max-w-[900px] mx-auto px-lg">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-3xl border-2 border-blue-200 shadow-2xl">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cyan-300/30 rounded-full blur-3xl" />
            <div className="absolute top-4 right-4">
              <img src="/mascots/icons/bunny-surprised.webp" alt="" className="w-20 h-20 object-contain float" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-md mb-xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg flex items-center justify-center">
                  <Zap size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[24px] font-black text-blue-900">💡 Mẹo nhỏ nâng cao</h3>
                  <p className="text-[13px] text-blue-600 font-medium">(Tuỳ chọn - nhưng rất tiện!)</p>
                </div>
              </div>

              <p className="text-[16px] text-blue-900 mb-lg leading-relaxed">
                Bạn cũng có thể không cần phải mở Website để đổi link! Hãy liên kết với <span className="font-black text-blue-700">Bot Telegram</span> của chúng tôi trong Cài đặt Cá nhân.
              </p>
              <p className="text-[16px] text-blue-900 leading-relaxed">
                Mỗi khi lướt thấy đồ muốn mua trên Shopee/TikTok/Lazada, chỉ việc gửi link đó vào khung chat Telegram, Bot sẽ gửi lại ngay link hoàn tiền trong <strong>1 giây</strong>. Mọi tin nhắn duyệt hoàn tiền cũng sẽ được thông báo ngay lập tức qua Telegram. ⚡
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 bg-transparent pb-3xl pt-xl max-w-[1200px] mx-auto px-lg">
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-[40px] p-3xl flex flex-col items-center text-center shadow-2xl">
            <div className="absolute inset-0 overflow-hidden">
              <Sparkles className="absolute top-6 left-6 text-white/20 w-16 h-16 float" />
              <Sparkles className="absolute bottom-8 right-8 text-white/20 w-20 h-20 float" style={{ animationDelay: '1s' }} />
              <Sparkles className="absolute top-1/3 right-1/4 text-white/15 w-12 h-12 float" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-md mb-lg">
                <img src="/mascots/icons/bunny-heart.webp" alt="" className="w-20 h-20 object-contain bunny-pop" />
              </div>

              <h2 className="text-[36px] md:text-[48px] font-black text-white mb-md leading-tight">
                Bắt đầu ngay hôm nay!
              </h2>
              <p className="text-white/95 text-[17px] mb-2xl max-w-xl mx-auto leading-relaxed">
                Chỉ mất 1 phút để đăng ký. Bắt đầu nhận hoàn tiền từ mọi đơn hàng ngay lập tức! 🎉
              </p>
              
              <Link 
                href="/register" 
                className="group inline-flex items-center gap-md bg-white text-purple-600 font-black px-3xl py-xl rounded-3xl hover:scale-105 hover:shadow-2xl transition-all shadow-xl"
              >
                <Check size={24} className="group-hover:scale-125 transition-transform" />
                <span className="text-[18px]">Tạo tài khoản & lấy link</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
