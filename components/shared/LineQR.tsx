import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LineQRProps {
  /** 尺寸（px） */
  size?: number;
  /** 是否顯示 ID 文字 */
  showId?: boolean;
  className?: string;
}

export function LineQR({
  size = 160,
  showId = true,
  className,
}: LineQRProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm border border-sand-200",
        className,
      )}
    >
      <Image
        src="/line-qr.png"
        alt={`掃描加入 LINE 官方帳號 ${site.lineOAId}`}
        width={size}
        height={size}
        sizes={`${size}px`}
        className="rounded-lg"
      />
      {showId && (
        <div className="text-center">
          <p className="text-xs text-ink-500">掃描加入 LINE</p>
          <p className="font-black text-[#06C755] tabular-nums">
            {site.lineOAId}
          </p>
        </div>
      )}
    </div>
  );
}
