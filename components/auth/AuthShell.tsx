"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

type Props = {
  mode: "login" | "register";
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  highlights: { icon: React.ReactNode; label: string; hint: string }[];
  children: React.ReactNode;
};

export function AuthShell({ mode, eyebrow, title, subtitle, highlights, children }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);

  // Đèn rọi bám theo con trỏ. Chỉ bật trên thiết bị có chuột thật và khi người
  // dùng không tắt hiệu ứng chuyển động — trên điện thoại sẽ bỏ qua hoàn toàn.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    let frame = 0;
    function onMove(e: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el!.getBoundingClientRect();
        el!.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el!.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isLogin = mode === "login";

  return (
    <main
      ref={stageRef}
      className="relative grid min-h-dvh place-items-center overflow-hidden bg-canvas-soft px-lg py-2xl"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {/* Nền aurora */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob aurora-1 -left-[10%] -top-[15%] h-[460px] w-[460px] bg-[#FFC4D6] opacity-60" />
        <div className="aurora-blob aurora-2 -right-[12%] top-[6%] h-[520px] w-[520px] bg-[#FFE0EA] opacity-70" />
        <div className="aurora-blob aurora-3 bottom-[-18%] left-[22%] h-[480px] w-[480px] bg-[#FFF0D9] opacity-50" />
        {/* Đèn rọi mềm chạy theo con trỏ */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(209,58,107,0.10), transparent 70%)",
          }}
        />
      </div>

      <Link
        href="/"
        className="absolute left-lg top-lg z-20 inline-flex min-h-[44px] items-center gap-xs rounded-full bg-white/70 px-lg py-sm text-[13px] font-bold text-ink backdrop-blur-md transition-all duration-200 ease-soft hover:bg-white hover:shadow-cute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Trang chủ
      </Link>

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Linh vật nằm chồng lên mép trên của thẻ */}
        {/* z-10 để thỏ nổi lên trên thẻ, nếu không sẽ bị thẻ che mất nửa dưới */}
        <div className="rise-in relative z-10 flex justify-center" style={{ ["--d" as string]: "40ms" }}>
          <div className="grid h-[118px] w-[118px] translate-y-[58px] place-items-center rounded-full border border-white bg-white shadow-cute-lg">
            <BunnyMascot size={94} />
          </div>
        </div>

        <section className="gloss rounded-[28px] border border-white/70 bg-white/80 px-lg pb-xl pt-[74px] shadow-cute-lg backdrop-blur-xl sm:px-2xl">
          {/* Chuyển nhanh giữa hai trang, con trượt hồng báo trang đang mở */}
          <div
            className="rise-in mx-auto mb-xl grid w-full max-w-[280px] grid-cols-2 rounded-pill bg-primary-neutral p-[5px]"
            style={{ ["--d" as string]: "90ms" }}
          >
            <Link
              href="/login"
              aria-current={isLogin ? "page" : undefined}
              className={`inline-flex min-h-[40px] items-center justify-center rounded-pill text-[14px] font-bold transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isLogin ? "bg-primary text-white shadow-glow" : "text-primary/70 hover:text-primary"
              }`}
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              aria-current={!isLogin ? "page" : undefined}
              className={`inline-flex min-h-[40px] items-center justify-center rounded-pill text-[14px] font-bold transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                !isLogin ? "bg-primary text-white shadow-glow" : "text-primary/70 hover:text-primary"
              }`}
            >
              Đăng ký
            </Link>
          </div>

          <header className="rise-in mb-xl text-center" style={{ ["--d" as string]: "140ms" }}>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary/70">{eyebrow}</p>
            <h1 className="mt-xs text-[27px] font-black leading-tight tracking-tight text-ink sm:text-[30px]">
              {title}
            </h1>
            <p className="mt-sm text-[14px] leading-relaxed text-mute">{subtitle}</p>
          </header>

          <div className="rise-in" style={{ ["--d" as string]: "200ms" }}>
            {children}
          </div>
        </section>

        {/* Ba lý do tin tưởng — thay cho khung quảng cáo cũ */}
        <ul className="rise-in mt-xl grid grid-cols-1 gap-sm sm:grid-cols-3" style={{ ["--d" as string]: "280ms" }}>
          {highlights.map((h) => (
            <li
              key={h.label}
              className="lift flex items-center gap-md rounded-2xl border border-white/70 bg-white/70 px-lg py-md backdrop-blur-md sm:flex-col sm:items-start sm:gap-xs sm:px-md"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-pale text-primary">
                {h.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold leading-tight text-ink">{h.label}</span>
                <span className="block text-[12px] leading-snug text-mute">{h.hint}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
