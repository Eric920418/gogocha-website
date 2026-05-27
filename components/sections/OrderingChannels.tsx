import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { LineIcon } from "@/components/shared/LineIcon";
import { Phone, Smartphone, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const CHANNELS = [
  {
    type: "phone",
    title: "電話叫車",
    headline: "最直接，三秒撥通",
    desc: "不會用手機 App 也沒關係，直接撥客服專線即可。24h 在地客服。",
    ctaLabel: "立即撥打",
    audience: "適合所有人",
    icon: Phone,
    iconBg: "bg-taxi-yellow/30",
    iconColor: "text-taxi-yellow-ink",
    accent: "border-taxi-yellow-dark",
    href: `tel:${site.phone}`,
    external: false,
    primary: true,
  },
  {
    type: "line",
    title: "LINE 叫車",
    headline: "加好友就能叫",
    desc: "台灣最普及的方式。加入 LINE 官方帳號後，傳訊息給我們就能叫車、查車資、聯絡客服。",
    ctaLabel: `加入 ${site.lineOAId}`,
    audience: "適合 LINE 重度使用者",
    icon: LineIcon,
    iconBg: "bg-[#06C755]/15",
    iconColor: "text-[#06C755]",
    accent: "border-[#06C755]",
    href: site.lineOAUrl,
    external: true,
  },
  {
    type: "app",
    title: "App 叫車",
    headline: "全功能自助",
    desc: "下載 GoGoCha App，即時車輛位置、自選付款方式、行程紀錄、評分司機，全功能由你掌握。",
    ctaLabel: "下載 Android App",
    audience: "適合常常叫車的人",
    icon: Smartphone,
    iconBg: "bg-trust-blue/10",
    iconColor: "text-trust-blue-dark",
    accent: "border-trust-blue",
    href: site.playStoreUrl,
    external: true,
  },
];

export function OrderingChannels() {
  return (
    <Section className="bg-sand-50">
      <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
        <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
          三種叫車方式
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
          選你最順手的，
          <br className="md:hidden" />
          一鍵叫到車
        </h2>
        <p className="mt-4 text-base md:text-lg text-ink-700">
          不會用 App 的長輩、習慣 LINE 的上班族、要全功能的常客 — 各有專屬入口。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CHANNELS.map((c, idx) => {
          const Icon = c.icon;
          return (
            <a
              key={c.type}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group block"
            >
              <Card
                className={cn(
                  "h-full transition-all hover:-translate-y-1 hover:shadow-lg border-t-4",
                  c.accent,
                  c.primary && "md:scale-[1.02]",
                )}
              >
                <CardContent className="p-6 md:p-7 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "size-14 rounded-2xl grid place-items-center",
                        c.iconBg,
                      )}
                    >
                      <Icon className={cn("size-7", c.iconColor)} aria-hidden />
                    </div>
                    <span className="text-xs font-bold text-ink-500 uppercase tracking-wide">
                      #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-ink-900">
                      {c.title}
                    </h3>
                    <p className={cn("text-lg font-black mt-1", c.iconColor)}>
                      「{c.headline}」
                    </p>
                  </div>

                  <p className="text-base text-ink-700 leading-relaxed flex-1">
                    {c.desc}
                  </p>

                  <div className="border-t border-sand-200 pt-4">
                    <p className="text-xs text-ink-500 mb-2">{c.audience}</p>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 font-bold text-base group-hover:gap-3 transition-all",
                        c.iconColor,
                      )}
                    >
                      {c.ctaLabel}
                      <ArrowRight className="size-5" aria-hidden />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
