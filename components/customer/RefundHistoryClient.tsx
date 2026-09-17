"use client";

import { useState } from "react";
import { Store, ShoppingBag, Music2, Copy, ExternalLink, Star, Clock, CheckCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";
import { ServerSearchInput } from "@/components/ui/ServerSearchInput";
import { useModal } from "@/components/ui/ModalProvider";

// Logo nền tảng từ Icons8 CDN
const I8_PLASTICINE = "https://img.icons8.com/plasticine/100";

const PLATFORM_STYLE: Record<string, { icon: typeof ShoppingBag; color: string; gradient: string; logo: string }> = {
  SHOPEE: { 
    icon: ShoppingBag, 
    color: "#ee4d2d",
    gradient: "from-orange-50 to-red-50",
    logo: `${I8_PLASTICINE}/shopee.png`
  },
  TIKTOK: { 
    icon: Music2, 
    color: "#000000",
    gradient: "from-gray-50 to-slate-100",
    logo: `${I8_PLASTICINE}/tiktok.png`
  },
  LAZADA: { 
    icon: Store, 
    color: "#0f146d",
    gradient: "from-blue-50 to-indigo-50",
    logo: `${I8_PLASTICINE}/lazada.png`
  },
  TIKI: { 
    icon: Store, 
    color: "#1a73e8",
    gradient: "from-blue-50 to-cyan-50",
    logo: `${I8_PLASTICINE}/shopee.png`
  },
};

type LinkItem = {
  id: string;
  createdAt: string;
  shortCode: string;
  shortUrl: string | null;
  productTitle: string | null;
  productImage: string | null;
  isFavorite: boolean;
  platform: { code: string; name: string };
};

function ProductThumb({ image, color, logo }: { image: string | null; color: string; logo: string }) {
  const [broken, setBroken] = useState(false);
  if (image && !broken) {
    return (
      <div className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden ring-2 ring-white shadow-md">
        <img
          src={image}
          alt=""
          onError={() => setBroken(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-md overflow-hidden"
      style={{ backgroundColor: `${color}15` }}
    >
      <img src={logo} alt="" className="h-12 w-12 object-contain opacity-80" />
    </div>
  );
}

function FavoriteButton({ linkId, isFavorite }: { linkId: string; isFavorite: boolean }) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (loading) return;
    const next = !favorite;
    setFavorite(next); // optimistic
    setLoading(true);
    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: next }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setFavorite(!next); // rollback nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={favorite ? "Bỏ yêu thích" : "Đánh dấu yêu thích"}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all hover:scale-110 ${
        favorite 
          ? "bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-md shadow-amber-400/30" 
          : "bg-white/80 backdrop-blur-sm text-gray-400 border-2 border-gray-200 hover:border-amber-300 hover:text-amber-500"
      }`}
    >
      <Star size={18} strokeWidth={2.5} fill={favorite ? "currentColor" : "none"} className="transition-transform hover:rotate-12" />
    </button>
  );
}

export function RefundHistoryClient({
  links,
  totalPages,
  currentPage,
  totalCount,
  counts,
}: {
  links: LinkItem[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
  counts: { all: number; favorite: number };
}) {
  const modal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "all";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    modal.alert({
      title: "Thành công",
      message: "Đã copy link: " + url,
      iconType: "success"
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white p-2xl shadow-cute-lg border border-primary/10">
      {/* Decorative corner bunny */}
      <div className="absolute -top-4 -right-4">
        <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-20 h-20 opacity-30 float" />
      </div>

      <div className="relative mb-xl flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#B92E5B] shadow-glow flex items-center justify-center">
            <Clock size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-gray-900">Lịch sử tạo link</h2>
            <p className="text-[13px] text-gray-500">Quản lý các link hoàn tiền đã tạo</p>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-lg py-sm text-[14px] font-bold text-primary">
          {totalCount} links
        </span>
      </div>

      <div className="mb-lg flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-sm flex-wrap">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`group flex h-10 items-center gap-sm rounded-2xl px-lg text-[13px] font-bold transition-all ${
              currentTab === "all" 
                ? "bg-gradient-to-r from-primary to-[#B92E5B] text-white shadow-md scale-105" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
            }`}
          >
            <CheckCircle size={16} strokeWidth={2.5} />
            Tất cả
            <span className={`rounded-full px-md py-[2px] text-[11px] font-bold ${
              currentTab === "all" ? "bg-white/20" : "bg-white text-gray-500"
            }`}>
              {counts.all}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("favorite")}
            className={`group flex h-10 items-center gap-sm rounded-2xl px-lg text-[13px] font-bold transition-all ${
              currentTab === "favorite" 
                ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md scale-105" 
                : "bg-amber-50 text-amber-700 hover:bg-amber-100 hover:scale-105"
            }`}
          >
            <Star size={16} strokeWidth={2.5} fill={currentTab === "favorite" ? "currentColor" : "none"} />
            Yêu thích
            <span className={`rounded-full px-md py-[2px] text-[11px] font-bold ${
              currentTab === "favorite" ? "bg-white/20" : "bg-white text-amber-600"
            }`}>
              {counts.favorite}
            </span>
          </button>
        </div>
        <ServerSearchInput placeholder="Tìm kiếm theo mã link..." className="sm:max-w-[280px]" />
      </div>

      {currentTab === "favorite" && counts.favorite === 0 && links.length === 0 && (
        <div className="mb-lg rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 px-lg py-md flex items-start gap-md">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
            <Star size={16} className="text-amber-600" fill="currentColor" />
          </div>
          <p className="text-[14px] text-amber-800 leading-relaxed">
            Bấm biểu tượng <Star size={14} className="inline -mt-[2px] text-amber-600" fill="currentColor" /> trên mỗi link để lưu lại — tiện cho các link chưa có ảnh sản phẩm, tránh bị lẫn khi danh sách dài ra.
          </p>
        </div>
      )}

      {links.length === 0 ? (
        <div className="flex flex-col items-center py-3xl text-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
          <img src="/mascots/icons/bunny-sleepy.webp" alt="" className="w-24 h-24 mb-lg opacity-60" />
          <h3 className="text-[18px] font-black text-gray-700 mb-sm">
            {currentTab === "favorite" ? "Chưa có link yêu thích nào" : "Không tìm thấy link nào"}
          </h3>
          <p className="text-[14px] text-gray-500 max-w-sm">
            {currentTab === "favorite" 
              ? "Đánh dấu sao vàng trên link để dễ tìm lại sau này!"
              : "Hãy tạo link hoàn tiền đầu tiên của bạn ngay bây giờ!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-lg">
          {links.map((l, idx) => {
            const pStyle = PLATFORM_STYLE[l.platform.code.toUpperCase()] ?? { 
              icon: Store, 
              color: "#454745",
              gradient: "from-gray-50 to-gray-100",
              logo: `${I8_PLASTICINE}/shopee.png`
            };

            return (
              <div 
                key={l.id} 
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${pStyle.gradient} p-xl border-2 border-white shadow-cute hover:shadow-cute-lg transition-all hover:-translate-y-1`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Platform watermark */}
                <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none">
                  <img src={pStyle.logo} alt="" className="w-32 h-32 object-contain" />
                </div>

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-lg">
                  <div className="flex items-start gap-lg flex-1 min-w-0">
                    <ProductThumb image={l.productImage} color={pStyle.color} logo={pStyle.logo} />
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-md mb-sm flex-wrap">
                        <div 
                          className="inline-flex items-center gap-xs px-md py-sm rounded-xl text-[12px] font-bold uppercase tracking-wider shadow-sm"
                          style={{ 
                            backgroundColor: `${pStyle.color}15`,
                            color: pStyle.color,
                            border: `1.5px solid ${pStyle.color}30`
                          }}
                        >
                          <img src={pStyle.logo} alt="" className="w-4 h-4 object-contain" />
                          {l.platform.name}
                        </div>
                        <span className="text-[12px] text-gray-400 font-medium">{l.createdAt}</span>
                      </div>
                      
                      <h3 className="text-[16px] font-bold text-gray-900 mb-sm line-clamp-2 leading-snug">
                        {l.productTitle ?? `Sản phẩm từ ${l.platform.name}`}
                      </h3>
                      
                      <div className="flex items-center gap-sm">
                        <a 
                          href={l.shortUrl ?? "#"} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="group/link inline-flex items-center gap-xs text-[13px] font-mono font-bold text-primary hover:text-[#B92E5B] transition-colors"
                        >
                          <span className="truncate max-w-[300px]">{l.shortUrl}</span>
                          <ExternalLink size={14} strokeWidth={2.5} className="shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-sm shrink-0">
                    <FavoriteButton linkId={l.id} isFavorite={l.isFavorite} />
                    <button
                      onClick={() => handleCopy(l.shortUrl ?? "")}
                      className="group/btn flex h-11 items-center gap-sm rounded-2xl bg-white/80 backdrop-blur-sm px-lg text-[14px] font-bold text-gray-700 border-2 border-gray-200 transition-all hover:bg-white hover:border-gray-300 hover:shadow-md hover:scale-105"
                    >
                      <Copy size={16} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                      <span>Copy</span>
                    </button>
                    <a href={l.shortUrl ?? "#"} target="_blank" rel="noreferrer">
                      <button className="group/btn flex h-11 items-center gap-sm rounded-2xl bg-gradient-to-r from-[#2bc48a] to-[#25ad7a] px-lg text-[14px] font-bold text-white transition-all hover:shadow-lg hover:shadow-[#2bc48a]/30 hover:scale-105">
                        <ExternalLink size={16} strokeWidth={2.5} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span>Mở</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-md border-t border-gray-100 pt-md">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
