"use client";

import Link from "next/link";
import { useState } from "react";
import { versionedAsset } from "@/lib/versionedAsset";

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
    <header className="fixed top-0 w-full z-50 glass border-b border-[#FFDFE8] shadow-sm">
      <nav className="flex justify-between items-center w-full px-5 md:px-10 py-0 max-w-[1200px] mx-auto h-16">
        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            src={versionedAsset("/icontitle.png")}
            alt="iviback logo"
            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full shrink-0"
          />
          <span
            className="font-bold text-[#D13A6B] text-[15px] md:text-[18px] leading-tight whitespace-nowrap"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            iviback
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div
          className="hidden md:flex items-center gap-7"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-[15px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-[#D13A6B] border-b-2 border-[#D13A6B] pb-0.5"
                    : "text-gray-500 hover:text-[#D13A6B]"
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
            className="bg-[#D13A6B] text-white rounded-full px-4 py-2 md:px-5 font-bold text-[13px] md:text-[14px] whitespace-nowrap hover:bg-[#B92E5B] shadow-md transition-all duration-200 active:scale-95"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Mở app
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            className="flex md:hidden flex-col justify-center items-center w-9 h-9 rounded-full bg-[#FFF3F7] hover:bg-[#FFDFE8] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-4 h-0.5 bg-[#D13A6B] rounded-full transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-[#D13A6B] rounded-full my-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-[#D13A6B] rounded-full transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-[#FFDFE8] ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-[15px] font-semibold py-2.5 px-3 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? "text-[#D13A6B] bg-[#FFF3F7]"
                    : "text-gray-500 hover:text-[#D13A6B] hover:bg-[#FFF3F7]"
                }`}
              >
                {isActive ? "✨ " : ""}{label}
              </Link>
            );
          })}

          <div className="mt-2 pt-3 border-t border-[#FFDFE8]">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-[#D13A6B] text-white rounded-full px-5 py-2.5 font-bold text-[14px] hover:bg-[#B92E5B] shadow-md transition-all duration-200"
            >
              Mở app
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
