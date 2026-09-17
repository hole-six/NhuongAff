"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { AuthField } from "@/components/auth/AuthField";
import { GoogleButton } from "@/components/auth/GoogleButton";

// Chấp nhận cả ba cách người Việt hay nhập: 090..., 8490..., +84 90...
// Khoảng trắng, dấu chấm và gạch ngang được bỏ qua trước khi so khớp.
const PHONE_RE = /^(?:0|84|\+84)(3|5|7|8|9)\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(v: string) {
  return v.replace(/[\s.\-()]/g, "");
}

type FieldKey = "fullName" | "phone" | "email" | "password" | "confirmPassword";

function scorePassword(v: string) {
  let score = 0;
  if (v.length >= 6) score++;
  if (v.length >= 10) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return Math.min(score, 4);
}

const STRENGTH = [
  { label: "Quá yếu", color: "bg-negative", width: "20%" },
  { label: "Yếu", color: "bg-negative", width: "40%" },
  { label: "Tạm ổn", color: "bg-warning-deep", width: "60%" },
  { label: "Mạnh", color: "bg-positive", width: "80%" },
  { label: "Rất mạnh", color: "bg-positive", width: "100%" },
];

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string | null>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  function validate(key: FieldKey, v: string, all = values): string | null {
    switch (key) {
      case "fullName":
        return v.trim().length < 2 ? "Vui lòng nhập họ tên của bạn." : null;
      case "phone":
        return PHONE_RE.test(normalizePhone(v))
          ? null
          : "Số điện thoại chưa hợp lệ, ví dụ: 0901234567.";
      case "email":
        return EMAIL_RE.test(v.trim()) ? null : "Email chưa đúng định dạng, ví dụ: ban@gmail.com";
      case "password":
        return v.length < 6 ? "Mật khẩu phải có ít nhất 6 ký tự." : null;
      case "confirmPassword":
        return v !== all.password ? "Mật khẩu nhập lại chưa khớp." : null;
    }
  }

  function setField(key: FieldKey, v: string) {
    setValues((s) => {
      const nextValues = { ...s, [key]: v };
      // Khi sửa mật khẩu, kiểm tra lại ô nhập lại nếu nó đang báo lỗi.
      if (key === "password" && errors.confirmPassword) {
        setErrors((e) => ({
          ...e,
          confirmPassword: validate("confirmPassword", nextValues.confirmPassword, nextValues),
        }));
      }
      return nextValues;
    });
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const keys: FieldKey[] = ["fullName", "phone", "email", "password", "confirmPassword"];
    const nextErrors: Partial<Record<FieldKey, string | null>> = {};
    for (const k of keys) nextErrors[k] = validate(k, values[k]);
    setErrors(nextErrors);

    const firstBad = keys.find((k) => nextErrors[k]);
    if (firstBad) {
      refs[firstBad].current?.focus();
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        password: values.password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? "Đăng ký thất bại");
      return;
    }

    const data = await res.json();
    router.push(data.redirectTo);
    router.refresh();
  }

  const strength = STRENGTH[scorePassword(values.password)];

  return (
    <div className="flex flex-col gap-lg">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-lg">
        <AuthField
          ref={refs.fullName}
          icon={User}
          label="Họ và tên"
          autoComplete="name"
          value={values.fullName}
          error={errors.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          onBlur={(e) => setErrors((s) => ({ ...s, fullName: validate("fullName", e.target.value) }))}
        />

        <AuthField
          ref={refs.phone}
          icon={Phone}
          label="Số điện thoại"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => setField("phone", e.target.value)}
          onBlur={(e) => setErrors((s) => ({ ...s, phone: validate("phone", e.target.value) }))}
        />

        <AuthField
          ref={refs.email}
          icon={Mail}
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => setField("email", e.target.value)}
          onBlur={(e) => setErrors((s) => ({ ...s, email: validate("email", e.target.value) }))}
        />

        <div className="flex flex-col gap-xs">
          <AuthField
            ref={refs.password}
            icon={Lock}
            label="Mật khẩu"
            revealable
            autoComplete="new-password"
            value={values.password}
            error={errors.password}
            onChange={(e) => setField("password", e.target.value)}
            onBlur={(e) => setErrors((s) => ({ ...s, password: validate("password", e.target.value) }))}
          />
          {values.password && !errors.password && (
            <div className="flex items-center gap-sm pl-xs">
              <span className="h-[5px] flex-1 overflow-hidden rounded-pill bg-primary-pale">
                <span
                  className={`block h-full rounded-pill transition-all duration-300 ease-soft ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </span>
              <span className="text-[11px] font-bold text-mute">{strength.label}</span>
            </div>
          )}
        </div>

        <AuthField
          ref={refs.confirmPassword}
          icon={Lock}
          label="Nhập lại mật khẩu"
          revealable
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          onBlur={(e) =>
            setErrors((s) => ({ ...s, confirmPassword: validate("confirmPassword", e.target.value) }))
          }
        />

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
              Đang tạo tài khoản…
            </>
          ) : (
            <>
              Tạo tài khoản
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <GoogleButton label="Đăng ký bằng Google" />
    </div>
  );
}
