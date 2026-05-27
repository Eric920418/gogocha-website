import { Button, type ButtonProps } from "@/components/ui/button";
import { LineIcon } from "@/components/shared/LineIcon";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LineCTAProps extends Omit<ButtonProps, "asChild" | "children" | "variant"> {
  label?: string;
  showId?: boolean;
}

/**
 * LINE 官方帳號 CTA。
 * 用 LINE 原色 #06C755（從 LINE Brand Guidelines）。
 * 點擊在手機開啟 LINE app、桌機開 LINE web。
 */
export function LineCTA({
  label = "LINE 叫車",
  size = "default",
  showId = false,
  className,
  ...props
}: LineCTAProps) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "bg-[#06C755] text-white hover:bg-[#05B14C] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md",
        className,
      )}
      {...props}
    >
      <a
        href={site.lineOAUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`加入 LINE 官方帳號 ${site.lineOAId}`}
      >
        <LineIcon className="size-5" />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-medium opacity-90">{label}</span>
          {showId && (
            <span className="font-black tabular-nums">{site.lineOAId}</span>
          )}
        </span>
      </a>
    </Button>
  );
}
