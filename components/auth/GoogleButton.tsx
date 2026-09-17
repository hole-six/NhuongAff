import { GoogleIcon } from "@/components/icons/PlatformIcons";

export function GoogleButton({ label }: { label: string }) {
  return (
    <>
      <div className="flex items-center gap-md" aria-hidden="true">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="text-[12px] font-medium text-mute">hoặc</span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <a
        href="/api/auth/google"
        className="lift flex h-[56px] w-full items-center justify-center gap-sm rounded-2xl border border-ink/10 bg-white text-[15px] font-bold text-ink transition-all duration-200 ease-soft hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <GoogleIcon size={20} />
        {label}
      </a>
    </>
  );
}
