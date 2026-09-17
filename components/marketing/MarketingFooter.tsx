"use client";

import Link from "next/link";
import { Phone, Heart, Sparkles } from "lucide-react";
import {
  FacebookIcon,
  ZaloIcon,
  YoutubeIcon,
  TiktokIcon,
  InstagramIcon,
  ThreadsIcon,
} from "@/components/icons/PlatformIcons";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

const SOCIAL_LINKS = [
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/share/1BShYKizDV/?mibextid=wwXIfr", Icon: FacebookIcon },
  { key: "zalo", label: "Zalo", href: "https://zalo.me/g/cgmmvw504", Icon: ZaloIcon },
  { key: "youtube", label: "Youtube", href: "https://www.youtube.com/@iviback", Icon: YoutubeIcon },
  { key: "tiktok", label: "Tiktok", href: "https://www.tiktok.com/@vi_ha790?_r=1&_t=ZS-983XgTM1aum", Icon: TiktokIcon },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/imviihaaa?igsh=M2RqZml1NHpzbmgx&utm_source=qr", Icon: InstagramIcon },
  { key: "threads", label: "Threads", href: "https://www.threads.com/@imviihaaa?igshid=NTc4MTIwNjQ2YQ==", Icon: ThreadsIcon },
];

export function MarketingFooter() {
  return (
    <footer className="bg-gradient-to-b from-white via-[#FFF8FA] to-[#FFEBF2] border-t border-pink-100">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand & Info */}
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 p-1.5 shadow-md shadow-pink-200 flex items-center justify-center">
              <BunnyMascot size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                BunnyHoanTien
                <Sparkles className="w-4 h-4 text-pink-400 fill-pink-300" />
              </span>
              <span className="text-[11px] font-bold tracking-widest text-pink-500 uppercase">Hệ Thống Hoàn Tiền Thông Minh</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Nền tảng hoàn tiền mua sắm Shopee, TikTok Shop & Lazada hàng đầu Việt Nam. Tối ưu ưu đãi, tích lũy tiền hoàn tự động & rút về ngân hàng dễ dàng.
          </p>
          <div className="pt-2 space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700">Kết nối cộng đồng</h5>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="p-2 rounded-xl bg-white border border-pink-100 shadow-sm hover:border-pink-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <Icon size={26} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-3">
            <h5 className="font-extrabold text-base text-slate-800 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              Hỗ trợ khách hàng
            </h5>
            <ul className="space-y-2.5 text-slate-500 font-medium text-sm">
              <li>
                <Link className="hover:text-pink-500 hover:translate-x-1.5 inline-flex items-center gap-1 transition-all duration-200" href="/faq">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-500 hover:translate-x-1.5 inline-flex items-center gap-1 transition-all duration-200" href="/dieu-khoan-su-dung">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-500 hover:translate-x-1.5 inline-flex items-center gap-1 transition-all duration-200" href="/chinh-sach-bao-mat">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-extrabold text-base text-slate-800 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              Tài khoản & Hệ thống
            </h5>
            <ul className="space-y-2.5 text-slate-500 font-medium text-sm">
              <li>
                <Link className="hover:text-pink-500 hover:translate-x-1.5 inline-flex items-center gap-1 transition-all duration-200" href="/login">
                  Đăng nhập tài khoản
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-500 hover:translate-x-1.5 inline-flex items-center gap-1 transition-all duration-200" href="/register">
                  Đăng ký miễn phí
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-100 px-6 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-400 font-medium text-xs flex items-center gap-1">
            © {new Date().getFullYear()} BunnyHoanTien. Made with <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 inline" /> for smart shoppers.
          </p>
          <a
            href="tel:0965965439"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-600 font-bold hover:bg-pink-100 transition-colors"
          >
            <Phone size={14} strokeWidth={2.5} />
            Hotline: 0965.965.439
          </a>
        </div>
      </div>
    </footer>
  );
}
