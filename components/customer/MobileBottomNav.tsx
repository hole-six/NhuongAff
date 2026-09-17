"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, RotateCcw, Gift, Wallet, ShoppingBag } from "lucide-react";

const TABS = [
  { href: "/app", label: "Trang chủ", icon: Home, gradient: "from-rose-500 to-pink-500" },
  { href: "/app/refunds", label: "Hoàn tiền", icon: RotateCcw, gradient: "from-blue-500 to-cyan-500" },
  { href: "/app/deals", label: "Ưu đãi", icon: Gift, gradient: "from-purple-500 to-pink-500" },
  { href: "/app/wallet", label: "Ví tiền", icon: Wallet, gradient: "from-emerald-500 to-teal-500" },
  { href: "/app/orders", label: "Đơn hàng", icon: ShoppingBag, gradient: "from-orange-500 to-amber-500" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/app") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex md:hidden items-stretch bg-white/80 backdrop-blur-xl border-t border-pink-200/60 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
    >
      {/* Gradient Bar Animation */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {TABS.map((tab, index) => {
        const active = isActive(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="group relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 min-h-[64px] transition-all duration-300 active:scale-95"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Active Indicator - Top */}
            {active && (
              <>
                <span className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-gradient-to-r ${tab.gradient} shadow-lg animate-in slide-in-from-top-2 fade-in duration-300`} />
                
                {/* Glow Effect */}
                <span className={`absolute inset-x-0 top-0 h-full bg-gradient-to-b ${tab.gradient} opacity-5 rounded-t-3xl`} />
              </>
            )}

            {/* Icon Container */}
            <div className={`relative flex items-center justify-center transition-all duration-300 ${active ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
              {active && (
                <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tab.gradient} opacity-10 blur-xl animate-pulse`} />
              )}
              
              <div className={`relative p-2 rounded-2xl transition-all duration-300 ${
                active 
                  ? `bg-gradient-to-br ${tab.gradient} shadow-lg` 
                  : 'bg-transparent group-hover:bg-pink-50'
              }`}>
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 2}
                  className={`transition-all duration-300 ${
                    active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
              </div>
            </div>

            {/* Label */}
            <span
              className={`text-[10px] leading-tight text-center transition-all duration-300 ${
                active 
                  ? `font-black bg-gradient-to-r ${tab.gradient} bg-clip-text text-transparent` 
                  : 'font-semibold text-slate-500 group-hover:text-slate-700'
              }`}
            >
              {tab.label}
            </span>

            {/* Hover Ripple Effect */}
            <span className="absolute inset-0 rounded-2xl bg-pink-100/0 group-hover:bg-pink-100/30 transition-colors duration-300" />
          </Link>
        );
      })}
    </nav>
  );
}
