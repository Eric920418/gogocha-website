import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "compact";
  href?: string | null;
  className?: string;
}

export function Logo({
  variant = "default",
  href = "/",
  className,
}: LogoProps) {
  const inner = (
    <div
      className={cn(
        "flex items-center gap-3",
        variant === "compact" && "gap-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 rounded-xl bg-taxi-yellow-dark",
          variant === "default" ? "h-12 w-12" : "h-9 w-9",
        )}
        aria-hidden
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          className="object-contain p-1"
          sizes="48px"
          priority
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-black text-ink-900",
            variant === "default" ? "text-2xl" : "text-base",
          )}
        >
          {site.shortName}
        </span>
        <span
          className={cn(
            "text-ink-500 -mt-0.5",
            variant === "default" ? "text-sm" : "text-xs",
          )}
        >
          花蓮計程車
        </span>
      </div>
    </div>
  );

  if (href === null) return inner;
  return (
    <Link
      href={href}
      className="rounded-xl"
      aria-label={`${site.name} 回首頁`}
    >
      {inner}
    </Link>
  );
}
