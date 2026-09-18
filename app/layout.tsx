import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { ModalProvider } from "@/components/ui/ModalProvider";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { ChunkErrorRecovery } from "@/components/pwa/ChunkErrorRecovery";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoahuongaff.click"),
  title: {
    default: "BunnyHoanTien — Mua sắm Shopee, TikTok Shop, Lazada nhận hoàn tiền",
    template: "%s | BunnyHoanTien"
  },
  description: "Nền tảng hoàn tiền thông minh cho Shopee, TikTok Shop & Lazada. Rút tiền từ 10.000đ, tích hợp bot Telegram, miễn phí hoàn toàn.",
  keywords: ["hoàn tiền", "cashback", "affiliate", "Shopee", "TikTok Shop", "Lazada", "mua sắm online", "tiết kiệm"],
  authors: [{ name: "BunnyHoanTien" }],
  creator: "BunnyHoanTien",
  publisher: "BunnyHoanTien",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BunnyHoanTien",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/icon-512.png", color: "#D13A6B" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#D13A6B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className={beVietnamPro.className}>
        <ServiceWorkerRegister />
        <ChunkErrorRecovery />
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
