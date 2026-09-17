import type { Metadata } from "next";
import { Wallet, ShieldCheck, Zap } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Đăng Nhập Tài Khoản — BunnyHoanTien Hoàn Tiền Shopee, TikTok Shop, Lazada",
  description: "Đăng nhập vào BunnyHoanTien để quản lý ví hoàn tiền, đơn hàng và rút tiền dễ dàng.",
  alternates: { canonical: "/login" },
};

const HIGHLIGHTS = [
  {
    icon: <Wallet size={17} strokeWidth={2} aria-hidden="true" />,
    label: "Ví luôn sẵn sàng",
    hint: "Rút từ 10.000đ",
  },
  {
    icon: <Zap size={17} strokeWidth={2} aria-hidden="true" />,
    label: "Ghi nhận tự động",
    hint: "Đơn về là thấy ngay",
  },
  {
    icon: <ShieldCheck size={17} strokeWidth={2} aria-hidden="true" />,
    label: "Bảo mật tài khoản",
    hint: "Mã hoá đầu cuối",
  },
];

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <AuthShell
      mode="login"
      eyebrow="Mừng bạn quay lại"
      title={
        <>
          Tiền hoàn của bạn
          <br />
          vẫn đang chờ sẵn
        </>
      }
      subtitle="Đăng nhập để xem đơn đã ghi nhận, số dư ví và rút tiền về ngân hàng."
      highlights={HIGHLIGHTS}
    >
      <LoginForm next={searchParams.next} />
    </AuthShell>
  );
}
