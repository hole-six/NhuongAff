"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Sun, Menu, X, Sparkles } from "lucide-react";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export function Sidebar({
  brandName,
  brandSubtitle,
  sections,
}: {
  brandName: string;
  brandSubtitle: string;
  sections: NavSection[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/admin" || href === "/app") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-pink-100 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-pink-100 border border-pink-200 p-1 flex items-center justify-center shadow-sm">
            <BunnyMascot size={26} />
          </div>
          <div className="font-extrabold text-sm text-slate-800 truncate max-w-[200px]">{brandName}</div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-pink-50 rounded-xl transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar — Màu trắng tinh khôi & phong cách điện ảnh hiện đại */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[270px] shrink-0 flex-col justify-between bg-white border-r border-pink-100/80 shadow-xl md:shadow-none transition-transform duration-300 md:relative md:translate-x-0 flex ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="relative flex-1 overflow-y-auto scrollbar-hide">
          {/* Brand header — Thỏ Bunny lớn nổi bật với aura hào quang */}
          <div className="px-6 pt-6 pb-5 border-b border-pink-100/60 mb-3 relative bg-gradient-to-b from-pink-50/60 via-white to-white">
            <button 
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 md:hidden rounded-full hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3.5">
              {/* Bunny Mascot Avatar lớn với hiệu ứng aura đập nhẹ */}
              <div className="relative flex shrink-0 items-center justify-center p-1.5 bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl border-2 border-pink-200/80 shadow-md shadow-pink-100">
                <BunnyMascot size={46} label="Bunny Logo" />
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm ring-2 ring-emerald-200" />
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-black text-slate-900 tracking-tight flex items-center gap-1">
                  {brandName}
                  <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0 inline fill-pink-300" />
                </div>
                <div className="truncate text-xs font-semibold text-pink-500 mt-0.5 tracking-wide uppercase">
                  {brandSubtitle}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-4 px-4 pb-6">
            {sections.map((section, i) => (
              <div key={i} className={i > 0 ? "pt-2 border-t border-slate-100/80" : ""}>
                {section.title && (
                  <div className="mb-2 px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {section.title}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-sm font-extrabold transition-all duration-200 ${
                          active
                            ? "bg-gradient-to-r from-pink-50 via-pink-100/40 to-white text-pink-600 border-l-4 border-pink-500 shadow-sm shadow-pink-100 pl-3"
                            : "text-slate-600 hover:bg-pink-50/50 hover:text-pink-600 hover:translate-x-1"
                        }`}
                      >
                        <span
                          className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            active ? "text-pink-500" : "text-slate-400 group-hover:text-pink-500"
                          }`}
                        >
                          {item.icon}
                        </span>
                        
                        <span className="truncate flex-1">{item.label}</span>
                        
                        {!!item.badge && item.badge > 0 && (
                          <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-500 px-1.5 text-[11px] font-black text-white shadow-sm shadow-pink-300">
                            {item.badge > 99 ? "99+" : item.badge}
                          </span>
                        )}
                        
                        {!item.badge && active && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-pink-500 shadow-sm shadow-pink-400" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar — Giao diện & Đăng xuất */}
        <div className="px-4 py-4 border-t border-pink-100/80 bg-gradient-to-b from-white to-pink-50/30">
          <div className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-slate-500 mb-1">
            <div className="flex items-center gap-2.5">
              <Sun size={16} strokeWidth={2.5} className="text-amber-500" />
              <span>Chế độ giao diện</span>
            </div>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200/60">Sáng</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-extrabold text-rose-500 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 group"
          >
            <LogOut
              size={18}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
}
