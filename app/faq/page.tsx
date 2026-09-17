import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/faqData";
import { safeJsonLdString } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Câu Hỏi Thường Gặp (FAQ) — BunnyHoanTien",
  description: "Giải đáp các thắc mắc về hệ thống hoàn tiền thông minh: rút tiền, phí sử dụng, sàn hỗ trợ và liên kết Telegram.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Câu Hỏi Thường Gặp (FAQ) — BunnyHoanTien",
    description: "Giải đáp các thắc mắc về hệ thống hoàn tiền thông minh: rút tiền, phí sử dụng, sàn hỗ trợ và liên kết Telegram.",
    type: "website",
    locale: "vi_VN",
    url: "/faq",
    siteName: "BunnyHoanTien",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://hoahuongaff.click/" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://hoahuongaff.click/faq" },
  ],
};

/* ─── Platform icons CDN ─── */
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";

/* ─── Floating platform icons data ─── */
const FLOATING_ICONS = [
  { src: `${I8_PLASTICINE}/shopee.png`,  alt: "Shopee",  size: 48, cls: "float-icon-1 sparkle-1", style: { top: "6%",   left: "4%"    } },
  { src: `${I8_PLASTICINE}/tiktok.png`,  alt: "TikTok",  size: 42, cls: "float-icon-2 sparkle-2", style: { top: "12%",  right: "6%"   } },
  { src: `${I8_PLASTICINE}/lazada.png`,  alt: "Lazada",  size: 46, cls: "float-icon-3 sparkle-3", style: { top: "35%",  left: "2%"    } },
  { src: `${I8_PLASTICINE}/shopee.png`,  alt: "Shopee",  size: 36, cls: "float-icon-4 sparkle-1", style: { bottom: "22%", left: "7%"   } },
  { src: `${I8_PLASTICINE}/tiktok.png`,  alt: "TikTok",  size: 38, cls: "float-icon-5 sparkle-2", style: { bottom: "12%", right: "8%"  } },
  { src: `${I8_PLASTICINE}/lazada.png`,  alt: "Lazada",  size: 52, cls: "float-icon-6 sparkle-3", style: { top: "48%",   right: "3%"   } },
  { src: `${I8_PLASTICINE}/shopee.png`,  alt: "Shopee",  size: 40, cls: "float-icon-7 sparkle-1", style: { bottom: "35%", right: "5%"  } },
  { src: `${I8_PLASTICINE}/tiktok.png`,  alt: "TikTok",  size: 34, cls: "float-icon-8 sparkle-2", style: { top: "28%",   left: "8%"   } },
  { src: `${I8_PLASTICINE}/lazada.png`,  alt: "Lazada",  size: 40, cls: "float-icon-1 sparkle-3", style: { top: "62%",   left: "5%"   } },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbJsonLd) }} />
      <MarketingHeader activePath="/faq" />

      <main className="pt-[90px]">
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-[#FFF0F4] via-[#FFF9FB] to-white py-20 md:py-24 relative overflow-hidden">
          {/* Decorative gradient blobs */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FFDFE8]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FFF0F4]/60 rounded-full blur-3xl pointer-events-none" />
          
          {/* Floating platform icons */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
            {FLOATING_ICONS.map(({ src, alt, size, cls, style }, i) => (
              <div
                key={i}
                className={`absolute ${cls}`}
                style={{ ...style, opacity: 0.75 }}
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

          <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 text-center">
            {/* Bunny mascots at corners */}
            <div className="absolute -top-4 -left-4 hidden lg:block opacity-90 bunny-pop" style={{ animationDelay: '0.2s' }}>
              <img src="/mascots/icons/bunny-surprised.webp" alt="" className="h-24 w-24 object-contain wiggle" />
            </div>
            <div className="absolute -top-4 -right-4 hidden lg:block opacity-90 bunny-pop" style={{ animationDelay: '0.4s' }}>
              <img src="/mascots/icons/bunny-heart.webp" alt="" className="h-24 w-24 object-contain float" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-primary to-[#E8558A] text-white px-5 py-2.5 rounded-full shadow-lg badge-glow text-[13px] font-bold fade-in">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Giải đáp mọi thắc mắc
            </div>

            {/* Main bunny mascot */}
            <div className="flex justify-center mb-6 bounce-in">
              <img 
                src="/mascots/icons/bunny-surprised.webp" 
                alt="Câu hỏi thường gặp BunnyHoanTien" 
                className="h-28 w-28 md:h-32 md:w-32 object-contain wiggle" 
              />
            </div>

            <h1 className="text-[42px] md:text-[64px] font-black text-ink tracking-tight mb-5 leading-[1.1] fade-in" style={{ animationDelay: '0.1s' }}>
              Câu Hỏi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#E8558A]">Thường Gặp</span>
            </h1>
            <p className="text-[18px] md:text-[20px] text-body max-w-3xl mx-auto leading-relaxed fade-in" style={{ animationDelay: '0.2s' }}>
              Bạn có thắc mắc? Chúng tôi có câu trả lời! 🐰<br />
              Khám phá cách hệ thống hoạt động và tối ưu số tiền hoàn của bạn.
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 fade-in" style={{ animationDelay: '0.3s' }}>
              {[
                { icon: "⚡", text: "Trả lời tức thì", bg: "from-[#FFF6EF] to-[#FFE5CC]", border: "border-orange-200" },
                { icon: "✓", text: "Hỗ trợ 24/7", bg: "from-[#E3F5EA] to-white", border: "border-green-200" },
                { icon: "🎯", text: "Hướng dẫn chi tiết", bg: "from-[#F0ECFB] to-white", border: "border-purple-200" },
              ].map((pill) => (
                <div
                  key={pill.text}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold bg-gradient-to-br ${pill.bg} border ${pill.border} shadow-sm lift`}
                >
                  <span>{pill.icon}</span>
                  <span className="text-ink">{pill.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 max-w-[900px] mx-auto px-6 md:px-12 relative">
          {/* Background decorations */}
          <div className="absolute -left-12 top-24 hidden lg:block opacity-80 bunny-pop" style={{ animationDelay: '0.5s' }}>
            <img src="/mascots/icons/bunny-delighted.webp" alt="" className="h-24 w-24 object-contain float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute -right-12 top-64 hidden lg:block opacity-80 bunny-pop" style={{ animationDelay: '0.7s' }}>
            <img src="/mascots/icons/bunny-wink.webp" alt="" className="h-24 w-24 object-contain float" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute -left-8 bottom-32 hidden lg:block opacity-80 bunny-pop" style={{ animationDelay: '0.9s' }}>
            <img src="/mascots/icons/bunny-heart.webp" alt="" className="h-20 w-20 object-contain wiggle" />
          </div>

          {/* Main FAQ card */}
          <div className="relative z-10 bg-white rounded-[40px] p-8 md:p-12 border-2 border-[#FFDFE8] shadow-2xl shadow-primary/10 fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#FFDFE8] to-[#FFF0F4] rounded-full opacity-60 blur-xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-[#E8558A]/20 rounded-full opacity-60 blur-xl pointer-events-none" />

            {/* Section header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4 bg-[#FFF0F4] border border-[#FFDFE8] text-primary px-4 py-2 rounded-full text-[13px] font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Câu hỏi phổ biến nhất
              </div>
              <h2 className="text-[28px] md:text-[32px] font-black text-ink">
                Tìm câu trả lời cho bạn
              </h2>
              <p className="text-mute text-[15px] mt-2">
                Chọn câu hỏi bên dưới để xem câu trả lời chi tiết
              </p>
            </div>

            {/* FAQ Accordion with enhanced styling */}
            <div className="space-y-3">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 pt-10 border-t-2 border-[#FFDFE8]/50 text-center">
              <div className="flex justify-center mb-4">
                <img src="/mascots/icons/bunny-delighted.webp" alt="" className="h-16 w-16 object-contain wiggle" />
              </div>
              <h3 className="text-[22px] font-black text-ink mb-3">
                Vẫn còn thắc mắc?
              </h3>
              <p className="text-mute text-[15px] mb-6 max-w-md mx-auto">
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://t.me/hoahuongaff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0088cc] to-[#0077b5] text-white px-6 py-3.5 rounded-2xl font-bold text-[15px] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.23 5.109-1.74 6.779-.216.708-.642.944-.997 1.028-.846.139-1.488-.558-2.308-1.094-1.282-.839-2.006-1.361-3.25-2.178-1.437-.945-.506-1.464.314-2.315.214-.222 3.941-3.616 4.01-3.925.009-.039.017-.184-.068-.261-.085-.077-.209-.05-.298-.03-.127.029-2.146 1.364-6.063 4.008-.574.394-1.093.586-1.558.576-.512-.011-1.498-.289-2.231-.527-.899-.292-1.613-.446-1.551-.942.032-.259.385-.523 1.058-.793 4.147-1.806 6.912-2.998 8.298-3.578 3.949-1.647 4.769-1.932 5.303-1.941.118-.002.381.027.552.165.144.117.184.275.203.387.018.112.041.367.023.567z"/>
                  </svg>
                  Chat Telegram
                </a>
                <a
                  href="/app/guide"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3.5 rounded-2xl font-bold text-[15px] border-2 border-[#FFDFE8] hover:border-primary/40 hover:bg-[#FFF0F4] transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Xem hướng dẫn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom floating bunnies */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 hidden md:flex gap-8 opacity-70 bunny-pop" style={{ animationDelay: '1s' }}>
            <img src="/mascots/icons/bunny-surprised.webp" alt="" className="h-16 w-16 object-contain float" style={{ animationDelay: '0.5s' }} />
            <img src="/mascots/icons/bunny-wink.webp" alt="" className="h-16 w-16 object-contain float" style={{ animationDelay: '1.5s' }} />
            <img src="/mascots/icons/bunny-delighted.webp" alt="" className="h-16 w-16 object-contain float" style={{ animationDelay: '2.5s' }} />
          </div>
        </section>

      </main>

      <MarketingFooter />
    </div>
  );
}
