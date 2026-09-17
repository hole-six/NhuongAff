"use client";

import Link from "next/link";
import { useState } from "react";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/cua-hang" },
  { label: "Ưu đãi", href: "/uu-dai" },
  { label: "Hướng dẫn", href: "/huong-dan" },
  { label: "FAQ", href: "/faq" },
];

export function MarketingHeader({ activePath = "/" }: { activePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-[#FFDFE8]/70 shadow-sm">
      <nav className="flex justify-between items-center w-full px-5 md:px-10 max-w-[1200px] mx-auto h-16">

        {/* ── Logo: Bunny SVG + wordmark ── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        >
          {/* Bunny mascot nhỏ trong vòng tròn hồng nhạt */}
          <div className="w-9 h-9 rounded-full bg-[#FFF0F4] border border-[#FFDFE8] shadow-sm
                          flex items-center justify-center overflow-hidden shrink-0">
            <BunnyMascot size={30} label="iviback" />
          </div>
          <span className="font-black text-[18px] text-primary leading-none tracking-tight">
            iviback
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-[14px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-body hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5
                       bg-white text-primary border border-[#FFDFE8]
                       rounded-full px-4 py-1.5 font-bold text-[13px]
                       hover:bg-[#FFF0F4] hover:border-primary/40
                       shadow-sm transition-all duration-200 active:scale-95"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-primary to-[#E8558A] text-white
                       rounded-full px-4 py-1.5 font-bold text-[13px]
                       shadow-md hover:shadow-lg hover:shadow-primary/30
                       hover:-translate-y-0.5 transition-all duration-200
                       active:scale-95 whitespace-nowrap"
          >
            Mở app
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            className="flex md:hidden flex-col justify-center items-center w-9 h-9
                       rounded-full bg-[#FFF3F7] hover:bg-[#FFDFE8] transition-colors gap-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-4 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    bg-white border-t border-[#FFDFE8]/60 ${
                      menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
      >
        <div className="flex flex-col px-5 py-4 gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-[15px] font-semibold py-2.5 px-4 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-[#FFF0F4]"
                    : "text-body hover:text-primary hover:bg-[#FFF9FB]"
                }`}
              >
                {isActive ? "🐰 " : ""}{label}
              </Link>
            );
          })}

          <div className="mt-2 pt-3 border-t border-[#FFDFE8]/60 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-white text-primary border border-[#FFDFE8]
                         rounded-2xl px-5 py-2.5 font-bold text-[14px]
                         hover:bg-[#FFF0F4] transition-all duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center
                         bg-gradient-to-r from-primary to-[#E8558A] text-white
                         rounded-2xl px-5 py-2.5 font-bold text-[14px]
                         shadow-md hover:shadow-lg transition-all duration-200"
            >
              Đăng ký miễn phí 🐰
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
