import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, Briefcase, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const B2B_ITEMS = [
  {
    icon: Plane,
    title: "旅行社",
    headline: "旺季不斷車",
    desc: "固定合約車隊保留・提前 24h 預約・太魯閣／清水斷崖路線熟悉司機優先派遣。",
    cta: "申請旅行社合約",
    href: "/contact?type=business&segment=travel",
  },
  {
    icon: Hotel,
    title: "飯店",
    headline: "禮賓服務升級",
    desc: "飯店專屬叫車 hotline・車輛整潔保證・櫃台一通電話即派車。",
    cta: "成為合作飯店",
    href: "/contact?type=business&segment=hotel",
  },
  {
    icon: Briefcase,
    title: "企業",
    headline: "差旅報帳簡化",
    desc: "月結制・電子發票自動寄送・員工編號識別・行程明細報表匯出。",
    cta: "申請企業合約",
    href: "/contact?type=business&segment=corporate",
  },
];

export function B2BSection() {
  return (
    <Section className="bg-sand-100">
      <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
        <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
          B2B 合作
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
          需要長期合作的，
          <br className="hidden md:block" />
          我們也準備好了
        </h2>
        <p className="mt-4 text-base md:text-lg text-ink-700">
          旅行社、飯店、企業合約方案。對應窗口、月結發票、固定車隊保留。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {B2B_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className={cn(
                "h-full flex flex-col group transition-all hover:-translate-y-1 hover:shadow-lg",
                idx === 1 && "md:scale-105 border-trust-blue/30",
              )}
            >
              <CardContent className="pt-6 md:pt-8 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-trust-blue/10 grid place-items-center">
                    <Icon
                      className="size-6 text-trust-blue-dark"
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-xl font-black text-ink-900">
                    {item.title}
                  </h3>
                </div>
                <div>
                  <p className="text-2xl font-black text-trust-blue-dark mb-2">
                    「{item.headline}」
                  </p>
                  <p className="text-base text-ink-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-2 text-base font-bold text-trust-blue hover:text-trust-blue-dark group/cta"
                >
                  {item.cta}
                  <ArrowRight
                    className="size-5 transition-transform group-hover/cta:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
