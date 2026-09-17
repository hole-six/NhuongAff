"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Headphones } from "lucide-react";
import { SupportInfoGrid } from "@/components/customer/SupportInfoGrid";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

/**
 * Bản công khai của nút hỗ trợ nổi trong dashboard khách hàng — dùng cho các
 * trang công khai (trang chủ...) để khách vãng lai cũng thấy được thông tin
 * liên hệ/mạng xã hội mà không cần đăng nhập. Bỏ chuông thông báo và link
 * "/app/notifications" vì không áp dụng cho người chưa đăng nhập.
 */
export function PublicFloatingSupport() {
  const [showSupport, setShowSupport] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Floating button với pulse-soft animation */}
      <div className="fixed right-5 bottom-5 z-40">
        <button
          onClick={() => setShowSupport(true)}
          title="Liên hệ hỗ trợ"
          className="flex h-14 w-14 items-center justify-center rounded-full
                     bg-gradient-to-br from-primary to-[#E8558A]
                     shadow-lg shadow-primary/30
                     ring-4 ring-[#FFDFE8]
                     transition-all hover:scale-110 hover:shadow-xl hover:shadow-primary/40
                     active:scale-95 pulse-soft"
        >
          <Headphones size={22} strokeWidth={2.25} className="text-white" />
        </button>
      </div>

      {showSupport &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSupport(false)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />
            <div
              className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto
                         rounded-3xl bg-white shadow-2xl fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header với bunny */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between
                           px-6 py-4 border-b border-[#FFDFE8]/60 rounded-t-3xl"
                style={{
                  background: "linear-gradient(135deg, #FFF3F7 0%, #FFDFE8 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm
                                  flex items-center justify-center overflow-hidden">
                    <BunnyMascot size={34} label="Hỗ trợ khách hàng iviback" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black text-ink">Hỗ trợ nhanh 🐰</h3>
                    <p className="text-[11px] text-mute">Liên hệ với iviback qua các kênh dưới đây</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSupport(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full
                             bg-white/70 text-mute hover:bg-white hover:text-ink
                             transition-colors shadow-sm"
                >
                  <X size={15} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-6">
                <SupportInfoGrid />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
