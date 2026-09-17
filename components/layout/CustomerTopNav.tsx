"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TicketPercent, Store, ShoppingBag, Info, LogOut } from "lucide-react";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

export function CustomerTopNav({ userName }: { userName: string }) {
  const pathname = usePathname();

  const links = [
    { href: "/app", label: "Trang chủ", icon: <Home size={18} /> },
    { href: "/app/deals", label: "Ưu đãi", icon: <TicketPercent size={18} /> },
    { href: "/cua-hang", label: "Cửa hàng", icon: <Store size={18} /> },
    { href: "/app/orders", label: "Đơn hàng", icon: <ShoppingBag size={18} /> },
    { href: "/huong-dan", label: "Giới thiệu", icon: <Info size={18} /> },
  ];

  return (
    <header className="glass border-b border-primary-pale/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-lg md:px-xl h-[72px] flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/app" className="flex items-center gap-sm hover:opacity-90 transition-opacity">
          <div className="h-10 w-10 rounded-full bg-pink-100 border border-pink-200 p-1 flex items-center justify-center shadow-sm">
            <BunnyMascot size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-black text-primary leading-tight">BunnyHoanTien</span>
            <span className="text-[12px] font-bold text-mute leading-none">Hoàn tiền là thích! 💗</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-xs">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-[6px] px-md py-[10px] rounded-2xl text-[14px] font-bold transition-all ${
                  active
                    ? "bg-primary-pale/30 text-primary"
                    : "text-mute hover:bg-canvas-soft hover:text-ink"
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-md">
          <div className="hidden sm:flex items-center gap-sm bg-canvas-soft border border-primary-pale/50 pl-1 pr-3 py-1 rounded-full cursor-pointer hover:bg-primary-pale/20 transition-colors">
            <div className="h-7 w-7 rounded-full bg-pink-100 p-0.5 flex items-center justify-center">
              <BunnyMascot size={20} />
            </div>
            <span className="text-[14px] font-bold text-ink truncate max-w-[120px]">{userName}</span>
          </div>
          <Link href="/api/auth/logout" className="p-2 text-mute hover:text-negative bg-canvas-soft rounded-full hover:bg-negative/10 transition-colors" title="Đăng xuất">
            <LogOut size={18} />
          </Link>
        </div>
      </div>

      {/* Mobile nav bottom bar could be added here later if needed */}
    </header>
  );
}
