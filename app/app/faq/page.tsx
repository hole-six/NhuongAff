"use client";

import { useState, useMemo } from "react";
import { FAQ_ITEMS, FAQ_GROUPS } from "@/lib/faqData";
import { Search, HelpCircle, Sparkles, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";

const groupIcons: Record<string, string> = {
  "Về cách hoạt động": "/mascots/icons/bunny-wink.webp",
  "Về tiền hoàn": "/mascots/icons/bunny-sparkle.webp",
  "Về lý do link không ghi nhận": "/mascots/icons/bunny-surprised.webp",
  "Về mời bạn bè": "/mascots/icons/bunny-heart.webp",
  "Các tình huống khác": "/mascots/icons/bunny-delighted.webp",
};

const groupColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  "Về cách hoạt động": { 
    bg: "from-blue-50 to-cyan-50", 
    border: "border-blue-200/50",
    text: "text-blue-900",
    badge: "bg-blue-500"
  },
  "Về tiền hoàn": { 
    bg: "from-emerald-50 to-green-50", 
    border: "border-emerald-200/50",
    text: "text-emerald-900",
    badge: "bg-emerald-500"
  },
  "Về lý do link không ghi nhận": { 
    bg: "from-amber-50 to-orange-50", 
    border: "border-amber-200/50",
    text: "text-amber-900",
    badge: "bg-amber-500"
  },
  "Về mời bạn bè": { 
    bg: "from-pink-50 to-rose-50", 
    border: "border-pink-200/50",
    text: "text-pink-900",
    badge: "bg-pink-500"
  },
  "Các tình huống khác": { 
    bg: "from-purple-50 to-pink-50", 
    border: "border-purple-200/50",
    text: "text-purple-900",
    badge: "bg-purple-500"
  },
};

export default function CustomerFaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = FAQ_ITEMS;
    
    if (selectedGroup) {
      items = items.filter(item => item.group === selectedGroup);
    }
    
    if (q) {
      items = items.filter(
        item => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      );
    }
    
    return items;
  }, [query, selectedGroup]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof FAQ_ITEMS> = {};
    filtered.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="relative min-h-screen pb-2xl">
      {/* Decorative floating bunnies */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.35 }}>
        <img src="/mascots/icons/bunny-wink.webp" alt="" className="absolute top-[8%] left-[5%] w-14 h-14 opacity-30 float" />
        <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="absolute top-[20%] right-[8%] w-16 h-16 opacity-25 float" style={{ animationDelay: '1.2s' }} />
        <img src="/mascots/icons/bunny-heart.webp" alt="" className="absolute top-[45%] left-[3%] w-12 h-12 opacity-20 float" style={{ animationDelay: '2s' }} />
        <img src="/mascots/icons/bunny-delighted.webp" alt="" className="absolute bottom-[25%] right-[6%] w-14 h-14 opacity-30 float" style={{ animationDelay: '0.8s' }} />
        <img src="/mascots/icons/bunny-blink.webp" alt="" className="absolute bottom-[10%] left-[10%] w-10 h-10 opacity-25 float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 flex flex-col gap-3xl">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-[32px] p-2xl gradient-hero-bunny shadow-cute-lg border border-primary/10">
          <div className="absolute top-4 right-4">
            <img src="/mascots/icons/bunny-surprised.webp" alt="" className="w-20 h-20 opacity-50 bounce-in" />
          </div>
          <div className="absolute bottom-4 left-4">
            <img src="/mascots/icons/bunny-bashful.webp" alt="" className="w-16 h-16 opacity-40 float" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-lg py-sm rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-lg shadow-sm">
              <HelpCircle size={16} className="text-primary" />
              <span className="text-[13px] font-bold text-primary">Câu hỏi thường gặp</span>
            </div>
            <h1 className="display-md mb-md bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] bg-clip-text text-transparent">
              Giải đáp mọi thắc mắc của bạn
            </h1>
            <p className="body-lg text-body max-w-2xl">
              Tìm câu trả lời nhanh chóng cho các thắc mắc về cách hoạt động, tiền hoàn, và mọi tình huống bạn có thể gặp phải.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-12 h-12 opacity-50">
            <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-full h-full object-contain wiggle" />
          </div>
          
          <div className="relative rounded-3xl bg-white shadow-cute-lg border border-primary/10 p-lg">
            <div className="relative">
              <Search size={20} className="absolute left-lg top-1/2 -translate-y-1/2 text-mute pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm câu hỏi... (VD: hoàn tiền, link không ghi nhận, rút tiền)"
                className="w-full rounded-2xl border-2 border-primary/10 bg-canvas-soft py-lg pl-[52px] pr-lg text-[15px] text-ink outline-none transition-all focus:border-primary/30 focus:bg-white focus:shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-md">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`group relative overflow-hidden rounded-2xl px-lg py-md text-[14px] font-bold transition-all ${
              selectedGroup === null
                ? "bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] text-white shadow-glow scale-105"
                : "bg-white text-body border border-primary/10 hover:border-primary/30 hover:shadow-sm"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} />
              Tất cả ({FAQ_ITEMS.length})
            </span>
            {selectedGroup === null && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            )}
          </button>

          {FAQ_GROUPS.map((group) => {
            const count = FAQ_ITEMS.filter(item => item.group === group).length;
            const colors = groupColors[group];
            const isActive = selectedGroup === group;

            return (
              <button
                key={group}
                onClick={() => setSelectedGroup(isActive ? null : group)}
                className={`group relative overflow-hidden rounded-2xl px-lg py-md text-[14px] font-bold transition-all border ${
                  isActive
                    ? `bg-gradient-to-br ${colors.bg} ${colors.border} shadow-md scale-105 ${colors.text}`
                    : `bg-white text-body border-primary/10 hover:border-primary/30 hover:shadow-sm`
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {group} ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items by Group */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-3xl text-center border border-gray-200">
            <img src="/mascots/icons/bunny-dizzy.webp" alt="" className="w-24 h-24 mx-auto mb-lg opacity-60" />
            <h3 className="display-xs text-gray-700 mb-sm">Không tìm thấy câu hỏi phù hợp</h3>
            <p className="text-body mb-lg">Thử tìm kiếm với từ khóa khác hoặc xem tất cả câu hỏi</p>
            <button
              onClick={() => { setQuery(""); setSelectedGroup(null); }}
              className="rounded-xl bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] px-xl py-md font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3xl">
            {Object.entries(groupedItems).map(([group, items]) => {
              const colors = groupColors[group];
              const icon = groupIcons[group];

              return (
                <div key={group} className="fade-in">
                  {/* Group Header */}
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${colors.bg} p-xl mb-lg shadow-cute border ${colors.border}`}>
                    <div className="absolute top-2 right-2 w-16 h-16 opacity-30">
                      <img src={icon} alt="" className="w-full h-full object-contain float" />
                    </div>
                    
                    <div className="relative flex items-center gap-md">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                        <img src={icon} alt="" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h2 className={`text-[20px] font-black ${colors.text}`}>{group}</h2>
                        <p className="text-[13px] text-body">{items.length} câu hỏi</p>
                      </div>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="flex flex-col gap-md">
                    {items.map((item) => {
                      const key = `${group}-${item.question}`;
                      const isOpen = openKey === key;

                      return (
                        <div
                          key={key}
                          className={`group rounded-2xl bg-white border-2 transition-all duration-300 overflow-hidden lift ${
                            isOpen 
                              ? `${colors.border} shadow-md` 
                              : "border-primary/10 hover:border-primary/20"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenKey(isOpen ? null : key)}
                            className="flex w-full items-start justify-between gap-lg px-xl py-lg text-left"
                          >
                            <div className="flex items-start gap-md flex-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${colors.badge} mt-2 shrink-0`} />
                              <span className="text-[16px] font-bold text-ink leading-relaxed">{item.question}</span>
                            </div>
                            <ChevronDown
                              size={22}
                              strokeWidth={2.5}
                              className={`shrink-0 text-primary transition-all duration-300 ${
                                isOpen ? "rotate-180 scale-110" : "group-hover:scale-110"
                              }`}
                            />
                          </button>
                          
                          <div
                            className={`grid transition-all duration-300 ${
                              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className={`px-xl pb-xl pl-[56px] border-t ${colors.border} bg-gradient-to-br ${colors.bg}`}>
                                <p className="text-[15px] leading-relaxed text-body whitespace-pre-line pt-lg">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Help Box */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-xl shadow-cute-lg border border-indigo-200">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col sm:flex-row items-center gap-lg">
            <div className="shrink-0">
              <img src="/mascots/icons/bunny-heart.webp" alt="" className="w-20 h-20 object-contain bunny-pop" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-[20px] font-black text-indigo-900 mb-2">💬 Không tìm thấy câu trả lời?</h3>
              <p className="text-[14px] text-indigo-700 leading-relaxed">
                Đừng lo! Team BunnyHoanTien luôn sẵn sàng hỗ trợ bạn qua Zalo, Telegram hoặc trực tiếp trong hệ thống.
              </p>
            </div>

            <Link
              href="/app/notifications"
              className="shrink-0 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2xl py-lg text-center font-bold text-white shadow-glow transition-all hover:shadow-xl hover:scale-105 active:scale-100"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle size={18} />
                Liên hệ hỗ trợ
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
