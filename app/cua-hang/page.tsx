import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { ShopeeIcon, TiktokIcon } from "@/components/icons/PlatformIcons";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { safeJsonLdString } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Cửa Hàng — BunnyHoanTien | Nền Tảng Hỗ Trợ Hoàn Tiền",
  description: "Danh sách sàn thương mại điện tử được BunnyHoanTien hỗ trợ hoàn tiền: Shopee, TikTok Shop và nhiều đối tác khác.",
  alternates: { canonical: "/cua-hang" },
  openGraph: {
    title: "Cửa Hàng — BunnyHoanTien",
    description: "Danh sách sàn thương mại điện tử được BunnyHoanTien hỗ trợ hoàn tiền: Shopee, TikTok Shop và nhiều đối tác khác.",
    type: "website",
    locale: "vi_VN",
    url: "/cua-hang",
    siteName: "BunnyHoanTien",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://hoahuongaff.click/" },
    { "@type": "ListItem", position: 2, name: "Cửa Hàng", item: "https://hoahuongaff.click/cua-hang" },
  ],
};

// Logo nền tảng từ Icons8 CDN
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";

export default async function CuaHangPage() {
  const activeRule = await prisma.commissionRule.findFirst({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  const customerRate = Number(activeRule?.customerRate ?? 80);

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas via-canvas-soft to-primary-neutral/20 font-sans overflow-x-hidden text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbJsonLd) }} />
      <MarketingHeader activePath="/cua-hang" />

      <main className="pt-[90px] relative">
        {/* Floating platform icons */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.25 }}>
          <img src={`${I8_PLASTICINE}/shopee.png`} alt="" className="absolute top-[10%] left-[5%] w-12 h-12 float-icon-1 sparkle-1" />
          <img src={`${I8_PLASTICINE}/tiktok.png`} alt="" className="absolute top-[15%] right-[8%] w-14 h-14 float-icon-2 sparkle-2" />
          <img src={`${I8_PLASTICINE}/lazada.png`} alt="" className="absolute bottom-[25%] left-[6%] w-16 h-16 float-icon-3 sparkle-3" />
          <img src={`${I8_PLASTICINE}/shopee.png`} alt="" className="absolute bottom-[15%] right-[10%] w-10 h-10 float-icon-4 sparkle-1" />
        </div>

        {/* Header Hero */}
        <section className="relative py-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 via-pink-100/30 to-purple-100/30 pointer-events-none" />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-lg text-center">
            <div className="inline-flex items-center gap-2 px-xl py-md rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-lg shadow-sm">
              <Sparkles size={18} className="text-primary" />
              <span className="text-[13px] font-bold text-primary">Đối tác tin cậy</span>
            </div>
            
            <h1 className="text-[44px] md:text-[64px] font-black tracking-tight mb-md">
              Hệ thống{" "}
              <span className="bg-gradient-to-r from-primary to-[#B92E5B] bg-clip-text text-transparent">
                Cửa hàng
              </span>
            </h1>
            
            <p className="text-[18px] text-body max-w-2xl mx-auto leading-relaxed mb-xl">
              Mua sắm thả ga, nhận hoàn tiền tối đa từ những đối tác lớn nhất. Chúng tôi luôn mở rộng hệ thống để mang lại lợi ích tốt nhất cho bạn.
            </p>

            <div className="flex items-center justify-center gap-md">
              <img src="/mascots/icons/bunny-delighted.webp" alt="" className="w-16 h-16 object-contain bounce-in" />
              <img src="/mascots/icons/bunny-heart.webp" alt="" className="w-16 h-16 object-contain bounce-in" style={{ animationDelay: '0.2s' }} />
              <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-16 h-16 object-contain bounce-in" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </section>

        {/* Stores Grid */}
        <section className="relative z-10 py-3xl max-w-[1200px] mx-auto px-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
            
            {/* Shopee */}
            <div className="group relative bg-gradient-to-br from-orange-50 via-red-50 to-rose-50 rounded-[40px] p-3xl border-2 border-orange-200/50 shadow-cute-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#ee4d2d]/20 rounded-full blur-3xl group-hover:bg-[#ee4d2d]/30 transition-all pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Watermark logo */}
              <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                <img src={`${I8_PLASTICINE}/shopee.png`} alt="" className="w-48 h-48 object-contain" />
              </div>

              <div className="relative z-10">
                <div className="w-28 h-28 bg-white rounded-3xl shadow-xl border-2 border-orange-200 flex items-center justify-center mb-xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <ShopeeIcon size={68} />
                </div>
                
                <div className="text-center mb-xl">
                  <h2 className="text-[36px] font-black text-ink mb-sm">Shopee</h2>
                  <p className="text-body text-[16px] leading-relaxed">
                    Nhận hoàn tiền cực khủng khi mua sắm qua Shopee. Từ hàng thời trang, mỹ phẩm đến đồ điện tử, mọi đơn hàng đều được đối soát và hoàn tiền minh bạch.
                  </p>
                </div>

                <div className="flex flex-col gap-md">
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-orange-200/50 p-lg shadow-md">
                    <div className="flex items-center justify-between mb-sm">
                      <span className="text-[14px] font-bold text-gray-700">💰 Hoàn tiền tối đa</span>
                      <div className="flex items-center gap-xs">
                        <span className="text-[28px] font-black text-[#ee4d2d] tabular-nums">{customerRate}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#ee4d2d] to-orange-400" style={{ width: `${customerRate}%` }} />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-orange-200/50 p-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-gray-700">⏱️ Thời gian duyệt</span>
                      <span className="text-[18px] font-black text-ink">15-30 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TikTok Shop */}
            <div className="group relative bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100 rounded-[40px] p-3xl border-2 border-gray-300/50 shadow-cute-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute -left-16 -top-16 w-48 h-48 bg-black/10 rounded-full blur-3xl group-hover:bg-black/15 transition-all pointer-events-none" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gray-400/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Watermark logo */}
              <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                <img src={`${I8_PLASTICINE}/tiktok.png`} alt="" className="w-48 h-48 object-contain" />
              </div>

              <div className="relative z-10">
                <div className="w-28 h-28 bg-white rounded-3xl shadow-xl border-2 border-gray-300 flex items-center justify-center mb-xl mx-auto group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <TiktokIcon size={68} />
                </div>
                
                <div className="text-center mb-xl">
                  <h2 className="text-[36px] font-black text-ink mb-sm">TikTok Shop</h2>
                  <p className="text-body text-[16px] leading-relaxed">
                    Bắt kịp xu hướng và tận hưởng niềm vui mua sắm giải trí trên TikTok Shop, kèm theo mức hoa hồng affiliate vô cùng hấp dẫn chuyển thẳng vào ví của bạn.
                  </p>
                </div>

                <div className="flex flex-col gap-md">
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-300/50 p-lg shadow-md">
                    <div className="flex items-center justify-between mb-sm">
                      <span className="text-[14px] font-bold text-gray-700">💰 Hoàn tiền tối đa</span>
                      <div className="flex items-center gap-xs">
                        <span className="text-[28px] font-black text-primary tabular-nums">{customerRate}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-800 to-gray-600" style={{ width: `${customerRate}%` }} />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-300/50 p-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-gray-700">⏱️ Thời gian duyệt</span>
                      <span className="text-[18px] font-black text-ink">15-30 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 bg-transparent pb-3xl pt-xl max-w-[1200px] mx-auto px-lg">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary via-[#E8558A] to-primary-active rounded-[40px] p-3xl flex flex-col items-center text-center shadow-2xl shadow-primary/30">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <Sparkles className="absolute top-8 left-8 text-white/20 w-20 h-20 float" />
              <Sparkles className="absolute bottom-8 right-8 text-white/20 w-20 h-20 float" style={{ animationDelay: '1s' }} />
              <Sparkles className="absolute top-1/2 left-1/4 text-white/15 w-12 h-12 float" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-md mb-xl">
                <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="w-16 h-16 object-contain bunny-pop" />
              </div>

              <h2 className="text-[36px] md:text-[44px] font-black text-white mb-md leading-tight">
                Bạn đã sẵn sàng để tiết kiệm?
              </h2>
              <p className="text-white/95 text-[17px] mb-2xl max-w-2xl mx-auto leading-relaxed">
                Đăng ký ngay tài khoản để bắt đầu lấy link sản phẩm từ các cửa hàng trên và nhận lại tiền mặt cho mỗi đơn mua hàng thành công.
              </p>
              
              <Link 
                href="/register" 
                className="group inline-flex items-center gap-md bg-white text-primary font-black px-3xl py-xl rounded-3xl hover:scale-105 hover:shadow-2xl transition-all shadow-xl"
              >
                <Sparkles size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-[18px]">Bắt đầu nhận hoàn tiền</span>
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <MarketingFooter />
    </div>
  );
}
