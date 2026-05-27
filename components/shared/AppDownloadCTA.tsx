import Link from "next/link";
import { Smartphone, Apple } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface AppDownloadCTAProps {
  className?: string;
  layout?: "row" | "column";
}

export function AppDownloadCTA({
  className,
  layout = "row",
}: AppDownloadCTAProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "column" && "flex-col",
        layout === "row" && "flex-col sm:flex-row",
        className,
      )}
    >
      {/* Google Play */}
      <Link
        href={site.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group inline-flex items-center gap-3 rounded-xl bg-ink-900 px-5 py-3 text-sand-50 transition-all hover:bg-ink-700 hover:-translate-y-0.5",
        )}
      >
        <Smartphone className="size-7 shrink-0" aria-hidden />
        <div className="flex flex-col leading-tight text-left">
          <span className="text-xs opacity-80">立即下載</span>
          <span className="text-base font-bold">Google Play</span>
        </div>
      </Link>

      {/* iOS Waitlist */}
      <Link
        href={site.iosWaitlistUrl}
        className={cn(
          "group inline-flex items-center gap-3 rounded-xl bg-white border-2 border-ink-900 px-5 py-3 text-ink-900 transition-all hover:bg-ink-900 hover:text-sand-50 hover:-translate-y-0.5",
        )}
      >
        <Apple className="size-7 shrink-0" aria-hidden />
        <div className="flex flex-col leading-tight text-left">
          <span className="text-xs opacity-80">iOS 即將推出</span>
          <span className="text-base font-bold">預約通知</span>
        </div>
      </Link>
    </div>
  );
}
