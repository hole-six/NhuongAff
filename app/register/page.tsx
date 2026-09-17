import type { Metadata } from "next";
import { Gift, Link2, PiggyBank } from "lucide-react";
import { RegisterForm } from "./RegisterForm";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản — iviback",
  description:
    "Tạo tài khoản iviback miễn phí để nhận hoàn tiền mọi đơn Shopee, TikTok Shop và Lazada.",
  alternates: { canonical: "/register" },
};

const HIGHLIGHTS = [
  {
    icon: <Link2 size={17} strokeWidth={2} aria-hidden="true" />,
    label: "Tạo link 1 chạm",
    hint: "Dán là có link riêng",
  },
  {
    icon: <PiggyBank size={17} strokeWidth={2} aria-hidden="true" />,
    label: "Hoàn tới 80%",
    hint: "Trên mỗi đơn đã duyệt",
  },
  {
    icon: <Gift size={17} strokeWidth={2} aria-hidden="true" />,
    label: "Mời bạn +5%",
    hint: "Nhận theo bạn bè",
  },
];

export default function RegisterPage() {
  return (
    <AuthShell
      mode="register"
      eyebrow="Miễn phí, chưa tới 1 phút"
      title={
        <>
          Mua như thường ngày,
          <br />
          nhận thêm tiền về ví
        </>
      }
      subtitle="Tạo tài khoản để bắt đầu hoàn tiền cho mọi đơn Shopee, TikTok Shop và Lazada."
      highlights={HIGHLIGHTS}
    >
      <RegisterForm />
    </AuthShell>
  );
}
