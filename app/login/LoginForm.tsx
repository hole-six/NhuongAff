"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { AuthField } from "@/components/auth/AuthField";
import { GoogleButton } from "@/components/auth/GoogleButton";

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  google_state_mismatch: "Phiên đăng nhập Google đã hết hạn, vui lòng thử lại.",
  google_not_configured: "Đăng nhập Google chưa được cấu hình trên hệ thống.",
  google_token_exchange_failed: "Không thể xác thực với Google, vui lòng thử lại.",
  google_userinfo_failed: "Không lấy được thông tin tài khoản Google.",
  google_email_not_verified: "Email Google của bạn chưa được xác minh.",
  account_inactive: "Tài khoản của bạn đã bị khoá.",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(v: string) {
  if (!v.trim()) return "Bạn chưa nhập email.";
  if (!EMAIL_RE.test(v)) return "Email chưa đúng định dạng, ví dụ: ban@gmail.com";
  return null;
}

function validatePassword(v: string) {
  if (!v) return "Bạn chưa nhập mật khẩu.";
  if (v.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
  return null;
}

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [formError, setFormError] = useState<string | null>(
    googleError ? GOOGLE_ERROR_MESSAGES[googleError] ?? "Đăng nhập Google thất bại." : null
  );
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setFieldErrors({ email: emailError, password: passwordError });

    // Đưa con trỏ về ô sai đầu tiên để người dùng sửa được ngay.
    if (emailError || passwordError) {
      (emailError ? emailRef : passwordRef).current?.focus();
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? "Đăng nhập thất bại");
      return;
    }

    const data = await res.json();
    router.push(next || data.redirectTo);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-lg">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-lg">
        <AuthField
          ref={emailRef}
          icon={Mail}
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          error={fieldErrors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) setFieldErrors((s) => ({ ...s, email: null }));
          }}
          onBlur={(e) => setFieldErrors((s) => ({ ...s, email: validateEmail(e.target.value) }))}
        />

        <div className="flex flex-col gap-xs">
          <AuthField
            ref={passwordRef}
            icon={Lock}
            label="Mật khẩu"
            revealable
            autoComplete="current-password"
            value={password}
            error={fieldErrors.password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) setFieldErrors((s) => ({ ...s, password: null }));
            }}
            onBlur={(e) => setFieldErrors((s) => ({ ...s, password: validatePassword(e.target.value) }))}
          />
          <a
            href="/forgot-password"
            className="self-end rounded-md px-xs py-[2px] text-[13px] font-bold text-primary transition-colors hover:text-primary-active hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Quên mật khẩu?
          </a>
        </div>

        {formError && (
          <p
            role="alert"
            className="rounded-2xl border border-negative/20 bg-negative/10 px-lg py-md text-[13px] font-semibold text-negative-darkest"
          >
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="sheen gloss flex h-[56px] w-full items-center justify-center gap-sm rounded-2xl bg-gradient-to-r from-primary to-primary-active text-[15px] font-black text-white shadow-glow transition-all duration-200 ease-soft hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Đang đăng nhập…
            </>
          ) : (
            <>
              Đăng nhập
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <GoogleButton label="Tiếp tục với Google" />
    </div>
  );
}
