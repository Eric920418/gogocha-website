"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SCALES = [0.9, 1, 1.15, 1.3] as const;
const STORAGE_KEY = "gogocha-fs-scale";

export function FontSizeToggle({ className }: { className?: string }) {
  const [idx, setIdx] = useState(1);

  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (saved && SCALES.includes(saved as (typeof SCALES)[number])) {
      const i = SCALES.indexOf(saved as (typeof SCALES)[number]);
      setIdx(i);
      document.documentElement.style.setProperty("--fs-scale", String(saved));
    }
  }, []);

  const apply = (newIdx: number) => {
    setIdx(newIdx);
    const scale = SCALES[newIdx];
    document.documentElement.style.setProperty("--fs-scale", String(scale));
    localStorage.setItem(STORAGE_KEY, String(scale));
  };

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="group"
      aria-label="調整字體大小"
    >
      <button
        type="button"
        onClick={() => apply(Math.max(0, idx - 1))}
        disabled={idx === 0}
        aria-label="字體縮小"
        className="h-9 w-9 rounded-lg border-2 border-sand-200 bg-white text-sm font-bold text-ink-900 hover:bg-sand-100 disabled:opacity-30"
      >
        A-
      </button>
      <button
        type="button"
        onClick={() => apply(Math.min(SCALES.length - 1, idx + 1))}
        disabled={idx === SCALES.length - 1}
        aria-label="字體放大"
        className="h-9 w-9 rounded-lg border-2 border-sand-200 bg-white text-lg font-bold text-ink-900 hover:bg-sand-100 disabled:opacity-30"
      >
        A+
      </button>
    </div>
  );
}
