import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { PublicFloatingSupport } from "@/components/marketing/PublicFloatingSupport";
import { DealGrid } from "@/components/customer/DealGrid";
import { ServerSearchInput } from "@/components/ui/ServerSearchInput";
import { Flame, Sparkles, TrendingUp, Tag } from "lucide-react";
import { safeJsonLdString } from "@/lib/jsonLd";

// Logo nền tảng từ Icons8 CDN
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";

export const metadata: Metadata = {
  title: "Ưu Đãi & Mã Giảm Giá Shopee, TikTok Shop, Lazada Mới Nhất — BunnyHoanTien",
  description: "Cập nhật liên tục mã giảm giá, deal sập sàn Shopee, TikTok Shop và Lazada. Mua qua link BunnyHoanTien vừa được giá tốt vừa nhận thêm hoàn tiền.",
  alternates: { canonical: "/uu-dai" },
  openGraph: {
    title: "Ưu Đãi & Mã Giảm Giá Shopee, TikTok Shop, Lazada Mới Nhất — BunnyHoanTien",
    description: "Cập nhật liên tục mã giảm giá, deal sập sàn Shopee, TikTok Shop và Lazada. Mua qua link BunnyHoanTien vừa được giá tốt vừa nhận thêm hoàn tiền.",
    type: "website",
    locale: "vi_VN",
    url: "/uu-dai",
    siteName: "BunnyHoanTien",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://hoahuongaff.click/" },
    { "@type": "ListItem", position: 2, name: "Ưu đãi", item: "https://hoahuongaff.click/uu-dai" },
  ],
};

export default async function PublicDealsPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string; platform?: string; category?: string; sort?: string; linkType?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  const q = searchParams.q || "";
  const platform = searchParams.platform || "";
  const category = searchParams.category || "";
  const linkType = searchParams.linkType || "";
  const sort = searchParams.sort || "newest";

  // Deal hết hạn tự động ẩn khỏi danh sách công khai — không cần job dọn
  // riêng, chỉ cần lọc tại thời điểm truy vấn.
  const activeNotExpired = {
    status: "active",
    AND: [{ OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] }],
  };
  const where: any = { ...activeNotExpired, AND: [...activeNotExpired.AND] };
  if (platform) where.platformCode = platform;
  if (category) where.category = category;
  if (linkType) where.linkType = linkType;
  if (q) {
    where.AND.push({ OR: [{ title: { contains: q } }, { description: { contains: q } }] });
  }

  const orderBy =
    sort === "discount" ? { discountPercent: "desc" as const }
    : sort === "clicks" ? { clicks: "desc" as const }
    : { createdAt: "desc" as const };

  const [totalCount, activeDealsCount, productTypeCount, shopTypeCount, deals] = await Promise.all([
    prisma.dealPost.count({ where }),
    prisma.dealPost.count({ where: { status: "active" } }),
    prisma.dealPost.count({ where: { ...activeNotExpired, linkType: "product" } }),
    prisma.dealPost.count({ where: { ...activeNotExpired, linkType: "shop" } }),
    prisma.dealPost.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
  ]);

  const formattedDeals = deals.map((d) => ({
    id: d.id,
    title: d.title,
    description: d.description,
    originalPrice: d.originalPrice ? Number(d.originalPrice) : null,
    salePrice: d.salePrice ? Number(d.salePrice) : null,
    discountPercent: d.discountPercent,
    category: d.category,
    linkType: d.linkType,
    expiresAt: d.expiresAt ? d.expiresAt.toISOString() : null,
    imageUrl: d.uploadedImageUrl || d.shopeeImageUrl || null,
    shortUrl: d.shortUrl,
    platformCode: d.platformCode,
    clicks: d.clicks,
    createdAt: d.createdAt.toISOString(),
  }));

  const totalPages = Math.ceil(totalCount / limit);

  // ItemList JSON-LD cho các ưu đãi đang hiện trên trang — hỗ trợ rich snippet.
  const itemListJsonLd =
    formattedDeals.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: formattedDeals.map((d, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: d.shortUrl || "https://hoahuongaff.click/uu-dai",
            name: d.title,
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas via-canvas-soft to-amber-50/30 font-sans overflow-x-hidden text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(itemListJsonLd) }} />
      )}
      <MarketingHeader activePath="/uu-dai" />

      <main className="pt-[90px] relative">
        {/* Floating platform icons */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.2 }}>
          <img src={`${I8_PLASTICINE}/shopee.png`} alt="" className="absolute top-[12%] right-[8%] w-16 h-16 float-icon-1 sparkle-1" />
          <img src={`${I8_PLASTICINE}/tiktok.png`} alt="" className="absolute top-[30%] left-[5%] w-12 h-12 float-icon-2 sparkle-2" />
          <img src={`${I8_PLASTICINE}/lazada.png`} alt="" className="absolute bottom-[20%] right-[10%] w-14 h-14 float-icon-3 sparkle-3" />
          <img src={`${I8_PLASTICINE}/shopee.png`} alt="" className="absolute bottom-[40%] left-[8%] w-10 h-10 float-icon-4 sparkle-1" />
        </div>

        {/* Header Hero - Magazine Style */}
        <section className="relative py-3xl overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-red-100/40" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-lg">
            <div className="grid lg:grid-cols-2 gap-xl items-center">
              {/* Left: Text Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-xl py-md rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white mb-lg shadow-lg">
                  <Flame size={18} className="animate-pulse" />
                  <span className="text-[13px] font-bold">Hot Deals</span>
                </div>
                
                <h1 className="text-[48px] md:text-[64px] font-black tracking-tight mb-md leading-none">
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Ưu Đãi &
                  </span>
                  <br />
                  <span className="text-ink">Mã Giảm Giá</span>
                </h1>
                
                <p className="text-[18px] text-body leading-relaxed mb-xl max-w-xl">
                  Deal sập sàn Shopee, TikTok Shop, Lazada được cập nhật mỗi ngày. Mua qua link BunnyHoanTien vừa được giá tốt, vừa nhận thêm hoàn tiền.
                </p>

                {/* Stats Pills */}
                <div className="flex flex-wrap items-center gap-md">
                  <div className="flex items-center gap-sm px-lg py-md rounded-2xl bg-white/90 backdrop-blur-sm shadow-md border border-amber-200">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Tag size={20} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-[20px] font-black text-ink leading-none">{activeDealsCount}</div>
                      <div className="text-[11px] text-mute font-bold">Deals đang có</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-sm px-lg py-md rounded-2xl bg-white/90 backdrop-blur-sm shadow-md border border-green-200">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                      <TrendingUp size={20} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-[20px] font-black text-ink leading-none">Mới</div>
                      <div className="text-[11px] text-mute font-bold">Cập nhật hàng ngày</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image/Mascot Area */}
              <div className="relative">
                <div className="relative rounded-[40px] bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm p-2xl border-2 border-white shadow-2xl">
                  <div className="absolute -top-6 -right-6">
                    <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-24 h-24 object-contain bunny-pop" />
                  </div>
                  <div className="absolute -bottom-4 -left-4">
                    <img src="/mascots/icons/bunny-delighted.webp" alt="" className="w-20 h-20 object-contain float" />
                  </div>
                  
                  <div className="text-center py-3xl">
                    <Flame size={64} className="mx-auto mb-lg text-amber-500" strokeWidth={1.5} />
                    <h3 className="text-[24px] font-black text-ink mb-sm">🔥 Deal Sập Sàn Hôm Nay</h3>
                    <p className="text-body">Săn deal thả ga, tiết kiệm tối đa!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section className="relative z-10 py-2xl max-w-[1200px] mx-auto px-lg pb-3xl">
          <div className="mb-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex items-center justify-center">
                <Flame size={24} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-ink">Danh sách ưu đãi</h2>
                <p className="text-[13px] text-mute">Săn deal ngay để không bỏ lỡ!</p>
              </div>
            </div>
            <ServerSearchInput placeholder="Tìm kiếm ưu đãi..." className="sm:max-w-[320px]" />
          </div>

          <DealGrid
            deals={formattedDeals}
            totalPages={totalPages}
            currentPage={page}
            hasQuery={Boolean(q || platform || category)}
            linkTypeCounts={{ product: productTypeCount, shop: shopTypeCount }}
          />
        </section>
      </main>

      <MarketingFooter />
      <PublicFloatingSupport />
    </div>
  );
}
