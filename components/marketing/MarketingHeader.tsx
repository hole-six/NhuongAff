"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, LayoutDashboard, Menu, X } from "lucide-react";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/cua-hang" },
  { label: "Ưu đãi", href: "/uu-dai" },
  { label: "Hướng dẫn", href: "/huong-dan" },
  { label: "FAQ", href: "/faq" },
];

type Auth = { authenticated: boolean; role?: string } | null;

export function MarketingHeader({ activePath = "/" }: { activePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState<Auth>(null);
  const [scrolled, setScrolled] = useState(false);

  // Hỏi trạng thái đăng nhập sau khi trang đã hiện, để các trang marketing vẫn
  // được build tĩnh. Chưa biết thì tạm hiện nút đăng nhập (đa số khách vào là
  // chưa đăng nhập), biết rồi mới đổi.
  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setAuth(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Khoá cuộn nền khi menu mobile đang mở, tránh cuộn xuyên qua lớp phủ.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const loggedIn = auth?.authenticated === true;
  const dashHref = auth?.role === "admin" ? "/admin" : "/app";
  const dashLabel = auth?.role === "admin" ? "Trang quản trị" : "Vào trang quản lý";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-lg pt-md">
      <div
        className={`mx-auto flex h-[62px] max-w-[1160px] items-center gap-md rounded-pill border border-white/70 bg-white/80 pl-md pr-sm backdrop-blur-xl transition-all duration-300 ease-soft ${
          scrolled ? "shadow-cute-lg" : "shadow-cute"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-sm rounded-pill transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-primary-pale bg-primary-neutral">
            <BunnyMascot size={32} label="BunnyHoanTien" />
          </span>
          {/* Ẩn chữ ở màn hình hẹp: logo + chữ + nút CTA + hamburger không đủ
              chỗ trên 390px, chữ tràn ra làm mất nút hamburger. */}
          <span className="hidden text-[17px] font-black leading-none tracking-tight text-primary sm:inline">
            BunnyHoanTien
          </span>
        </Link>

        {/* Nav dạng viên thuốc, mục đang mở được tô nền thay vì gạch chân */}
        <nav className="mx-auto hidden items-center gap-xxs rounded-pill bg-primary-neutral/70 p-[5px] lg:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-pill px-lg py-[7px] text-[13.5px] font-bold transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-white text-primary shadow-cute"
                    : "text-body hover:bg-white/70 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA — đổi theo trạng thái đăng nhập */}
        <div className="ml-auto flex shrink-0 items-center gap-sm lg:ml-0">
          {loggedIn ? (
            <Link
              href={dashHref}
              className="sheen gloss inline-flex min-h-[42px] items-center gap-xs rounded-pill bg-gradient-to-r from-primary to-[#E8558A] px-lg text-[13px] font-bold text-white shadow-glow transition-all duration-200 ease-soft hover:-translate-y-[2px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <LayoutDashboard size={15} strokeWidth={2.5} aria-hidden="true" />
              <span className="hidden sm:inline">{dashLabel}</span>
              <span className="sm:hidden">Vào app</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden min-h-[42px] items-center rounded-pill border border-primary-pale bg-white px-lg text-[13px] font-bold text-primary transition-all duration-200 ease-soft hover:border-primary/40 hover:bg-primary-neutral sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="sheen gloss inline-flex min-h-[42px] items-center gap-xs rounded-pill bg-gradient-to-r from-primary to-[#E8558A] px-lg text-[13px] font-bold text-white shadow-glow transition-all duration-200 ease-soft hover:-translate-y-[2px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Nhận tiền hoàn
                <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-primary-neutral text-primary transition-colors duration-200 hover:bg-primary-pale lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {menuOpen ? <X size={19} strokeWidth={2.5} /> : <Menu size={19} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Menu mobile: thẻ bo tròn trượt xuống dưới đảo, không phải thanh dán mép */}
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 -z-10 cursor-default bg-ink/20 backdrop-blur-[2px] lg:hidden"
          />
          <div className="rise-in mx-auto mt-sm max-w-[1160px] overflow-hidden rounded-[26px] border border-white/70 bg-white/95 p-sm shadow-cute-lg backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-xxs">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activePath === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-[48px] items-center rounded-2xl px-lg text-[15px] font-bold transition-colors duration-200 ${
                      isActive ? "bg-primary-neutral text-primary" : "text-body hover:bg-canvas-soft"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-sm border-t border-primary-pale/60 pt-sm">
              {loggedIn ? (
                <Link
                  href={dashHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[50px] w-full items-center justify-center gap-xs rounded-2xl bg-gradient-to-r from-primary to-[#E8558A] text-[15px] font-black text-white shadow-glow"
                >
                  <LayoutDashboard size={17} strokeWidth={2.5} aria-hidden="true" />
                  {dashLabel}
                </Link>
              ) : (
                <div className="flex flex-col gap-sm">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[50px] w-full items-center justify-center rounded-2xl border border-primary-pale bg-white text-[15px] font-bold text-primary"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[50px] w-full items-center justify-center gap-xs rounded-2xl bg-gradient-to-r from-primary to-[#E8558A] text-[15px] font-black text-white shadow-glow"
                  >
                    Nhận tiền hoàn
                    <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
