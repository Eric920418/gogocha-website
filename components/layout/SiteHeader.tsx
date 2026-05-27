"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { FontSizeToggle } from "@/components/shared/FontSizeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/passenger", label: "我要叫車" },
  { href: "/driver", label: "司機招募" },
  { href: "/pricing", label: "透明車資" },
  { href: "/contact", label: "聯絡我們" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-sand-50/90 backdrop-blur-md border-b border-sand-200">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="主選單">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg text-base font-bold text-ink-700 hover:text-ink-900 hover:bg-sand-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FontSizeToggle className="hidden md:inline-flex" />
          <PhoneCTA
            className="hidden sm:inline-flex"
            size="default"
            hideNumberOnSmall
          />

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden h-12 w-12 rounded-xl border-2 border-sand-200 bg-white flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
          >
            {open ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="px-4 pb-4 flex flex-col gap-1" aria-label="主選單">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-lg font-bold text-ink-900 hover:bg-sand-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-between">
            <FontSizeToggle />
            <PhoneCTA size="sm" />
          </div>
        </nav>
      </div>
    </header>
  );
}
