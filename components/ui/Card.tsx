import { HTMLAttributes } from "react";

type Variant = "default" | "soft" | "tinted" | "dark";

const variantClasses: Record<Variant, string> = {
  default: "bg-white text-ink shadow-cute ring-1 ring-primary/[0.07]",
  soft: "bg-canvas-soft text-ink ring-1 ring-primary/[0.06]",
  tinted: "gloss bg-gradient-to-br from-primary-neutral to-primary-pale/60 text-ink-deep ring-1 ring-primary/15",
  dark: "bg-gradient-to-br from-[#2E1F26] to-[#4A2A38] text-white shadow-md",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hover?: boolean;
}

export function Card({ variant = "default", hover = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-xl ${variantClasses[variant]} ${
        hover ? "lift cursor-pointer" : ""
      } ${className}`}
      {...props}
    />
  );
}
