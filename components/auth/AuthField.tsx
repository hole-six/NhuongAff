"use client";

import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "placeholder"> & {
  icon: LucideIcon;
  label: string;
  hint?: string;
  error?: string | null;
  /** Hiện nút ẩn/hiện mật khẩu và tự đổi qua lại giữa text và password. */
  revealable?: boolean;
};

export const AuthField = forwardRef<HTMLInputElement, Props>(function AuthField(
  { icon: Icon, label, hint, error, revealable = false, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");

  const inputType = revealable ? (revealed ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-xs">
      <div className="relative">
        <Icon
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          className={`pointer-events-none absolute left-lg top-[29px] -translate-y-1/2 transition-colors duration-200 ${
            error ? "text-negative" : "text-mute peer-focus:text-primary"
          }`}
        />
        <input
          {...props}
          ref={ref}
          id={id}
          type={inputType}
          /* Khoảng trắng để :placeholder-shown hoạt động, nhãn mới nổi lên được. */
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`peer h-[58px] w-full rounded-2xl border bg-white/70 pl-[52px] ${
            revealable ? "pr-[52px]" : "pr-lg"
          } pt-[18px] text-[16px] font-semibold text-ink transition-all duration-200 ease-soft focus:bg-white focus:outline-none focus:ring-4 ${
            error
              ? "border-negative/50 focus:border-negative focus:ring-negative/15"
              : "border-ink/10 focus:border-primary focus:ring-primary/15"
          } ${className}`}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-[52px] top-[29px] -translate-y-1/2 text-[15px] font-medium transition-all duration-200 ease-soft peer-focus:top-[17px] peer-focus:text-[11px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:top-[17px] peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider ${
            error ? "text-negative" : "text-mute peer-focus:text-primary"
          }`}
        >
          {label}
        </label>

        {revealable && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            aria-pressed={revealed}
            className="absolute right-[10px] top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl text-mute transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {revealed ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        )}
      </div>

      {hint && !error && (
        <p id={`${id}-hint`} className="pl-xs text-[12px] leading-snug text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="pl-xs text-[12px] font-semibold leading-snug text-negative"
        >
          {error}
        </p>
      )}
    </div>
  );
});
