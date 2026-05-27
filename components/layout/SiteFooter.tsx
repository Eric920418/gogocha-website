import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LineIcon } from "@/components/shared/LineIcon";
import { Phone as PhoneIcon } from "lucide-react";
import { site } from "@/lib/site";

const COLUMNS = [
  {
    title: "服務",
    links: [
      { href: "/passenger", label: "乘客叫車" },
      { href: "/driver", label: "司機招募" },
      { href: "/pricing", label: "透明車資" },
      { href: "/contact?type=business", label: "B2B 合作" },
    ],
  },
  {
    title: "關於",
    links: [
      { href: "/about", label: "關於我們" },
      { href: "/coverage", label: "服務區域" },
      { href: "/contact", label: "聯絡我們" },
    ],
  },
  {
    title: "法律",
    links: [
      { href: "/privacy", label: "隱私政策" },
      { href: "/terms", label: "服務條款" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 text-sand-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-taxi-yellow-dark grid place-items-center">
                <span className="font-black text-taxi-yellow-ink text-lg">G</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-xl">{site.shortName}</span>
                <span className="text-xs text-sand-200">花蓮計程車</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-sand-200 leading-relaxed">
              花蓮在地 24 小時計程車隊。透明跳表、長輩友善、AI 智慧派車。
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 text-xl font-black text-taxi-yellow tabular-nums hover:text-taxi-yellow-dark transition-colors"
              >
                <PhoneIcon className="size-5" aria-hidden />
                {site.phoneDisplay}
              </a>
              <a
                href={site.lineOAUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-bold text-[#06C755] hover:text-[#5DCE7C] transition-colors"
              >
                <LineIcon className="size-5" />
                LINE {site.lineOAId}
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-base font-black mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-sand-200 hover:text-taxi-yellow transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ink-700 flex flex-col md:flex-row justify-between gap-4 text-xs text-sand-200">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>服務區域：花蓮縣｜車資依花蓮縣政府公告計算</p>
        </div>
      </div>
    </footer>
  );
}
