import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { CustomerLinkForm } from "@/components/customer/CustomerLinkForm";
import { RefundHistoryClient } from "@/components/customer/RefundHistoryClient";
import { RefundNotes } from "@/components/customer/RefundNotes";

// Logo nền tảng từ Icons8 CDN - giống trang chủ
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";
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

const PLATFORM_DISPLAY_ORDER: Record<string, number> = { SHOPEE: 0, TIKTOK: 1, LAZADA: 2 };

function sortPlatformsForDisplay<T extends { code: string; name: string }>(platforms: T[]): T[] {
  return [...platforms].sort((a, b) => {
    const rankA = PLATFORM_DISPLAY_ORDER[a.code] ?? 99;
    const rankB = PLATFORM_DISPLAY_ORDER[b.code] ?? 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });
}

export default async function CustomerRefundsPage({ searchParams }: { searchParams: { q?: string; page?: string; tab?: string } }) {
  const session = await getSession();
  if (!session?.customerId) redirect("/admin");

  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const q = searchParams.q || "";
  const tab = searchParams.tab || "all";

  const where: any = { customerId: session.customerId };
  if (q) {
    where.shortCode = { contains: q };
  }
  if (tab === "favorite") {
    where.isFavorite = true;
  }

  const [platforms, links, totalCount, allCount, favoriteCount] = await Promise.all([
    prisma.platform.findMany({ where: { status: "active" }, orderBy: { name: "asc" } }),
    prisma.trackingLink.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { platform: true },
      skip,
      take: limit,
    }),
    prisma.trackingLink.count({ where }),
    prisma.trackingLink.count({ where: { customerId: session.customerId } }),
    prisma.trackingLink.count({ where: { customerId: session.customerId, isFavorite: true } }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  const formattedLinks = links.map(l => ({
    id: l.id,
    createdAt: formatDate(l.createdAt),
    shortCode: l.shortCode || "",
    shortUrl: l.shortUrl,
    productTitle: l.productTitle,
    productImage: l.productImage,
    isFavorite: l.isFavorite,
    platform: { code: l.platform.code, name: l.platform.name },
  }));

  return (
    <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-2xl fade-in pb-3xl">
      {/* Logo bay tứ tung như trang chủ */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ opacity: 0.3 }}>
        {FLOATING_ICONS.map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt}
            loading="lazy"
            className={`absolute ${icon.cls}`}
            style={{ ...icon.style, width: icon.size, height: icon.size, objectFit: "contain" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-2xl">
        {/* HEADER CARD */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 shadow-cute-lg border border-primary/10 p-lg sm:p-2xl">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex items-center justify-between gap-lg">
            <div>
              <div className="inline-flex items-center gap-2 px-lg py-sm rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-md shadow-sm">
                <span className="text-[13px] font-bold text-primary">✨ Tạo link siêu tốc</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-black tracking-tight bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] bg-clip-text text-transparent">
                Tạo link hoàn tiền
              </h1>
              <p className="mt-sm text-[15px] text-body font-medium max-w-xl">
                Chọn sàn và dán link sản phẩm để lấy hoàn tiền ngay. Chỉ mất 5 giây!
              </p>
            </div>

            {/* Mascot */}
            <div className="hidden sm:block">
              <img 
                src="/mascots/icons/bunny-wink.webp" 
                alt="" 
                className="h-24 w-24 object-contain drop-shadow-lg bounce-in" 
              />
            </div>
          </div>
        </div>

      {/* Trái: chọn nền tảng & tạo link — Phải: 6 điều lưu ý (trước đây là ảnh) */}
      <div className="grid grid-cols-1 gap-2xl lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
        <CustomerLinkForm platforms={sortPlatformsForDisplay(platforms).map((p) => ({ id: p.id, code: p.code, label: p.name }))} />
        <RefundNotes />
      </div>

      {/* HISTORY CARD */}
      <RefundHistoryClient
        links={formattedLinks}
        totalPages={totalPages}
        currentPage={page}
        totalCount={totalCount}
        counts={{ all: allCount, favorite: favoriteCount }}
      />
      </div>
    </div>
  );
}
