import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { FaqList } from "@/components/shared/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildFAQJsonLd } from "@/lib/seo/jsonld";
import { routes, estimateDayFare } from "@/content/routes";
import { faqsByQuestion } from "@/content/faqs";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "花蓮計程車車資與車程指南｜機場、車站到太魯閣、七星潭多少錢",
  description:
    "花蓮熱門路線一次查：花蓮機場到市區、火車站到太魯閣、到七星潭、清水斷崖大概多少錢、要開多久。跳表估算、在地司機熟門熟路，實際以司機跳表為準。",
  alternates: { canonical: "/routes" },
};

// 本頁顯示的 OD 相關問答（同一組同時驅動畫面與 FAQPage schema）
const ROUTE_FAQS = faqsByQuestion([
  "從花蓮機場到市區大概多少錢？",
  "花蓮車站到太魯閣車資大概多少？要開多久？",
  "可以到花蓮機場接機嗎？怎麼跟司機會合？",
  "太魯閣一日遊可以包車嗎？怎麼算？",
]);

export default function RoutesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "熱門路線車資", path: "/routes" },
        ])}
      />
      <JsonLd data={buildFAQJsonLd(ROUTE_FAQS)} />

      {/* Hero + 誠實聲明 */}
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-6 md:pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="blue" className="mb-4">
            熱門路線車資
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-tight">
            花蓮熱門路線
            <br />
            <span className="text-trust-blue-dark">要多少錢、開多久</span>
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            機場、火車站到市區、太魯閣、七星潭、清水斷崖——花蓮最多人問的路線，車資與車程一次看清楚。以下為日間跳表估算，實際依當天路況與司機跳表為準；夜間 23:00–06:00 另加成 20%。
          </p>
        </div>
      </Section>

      {/* 路線列表 */}
      <Section className="bg-sand-50 pt-4 md:pt-6">
        <div className="max-w-4xl grid gap-4">
          {routes.map((r) => {
            const fare = estimateDayFare(r.distanceMeters);
            return (
              <Card key={r.slug}>
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <MapPin
                        className="size-5 shrink-0 text-trust-blue"
                        aria-hidden
                      />
                      <span className="text-lg md:text-xl font-black text-ink-900">
                        {r.from}
                        <span className="px-1.5 font-normal text-ink-500">
                          →
                        </span>
                        {r.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8 shrink-0 pl-7 md:pl-0">
                      <div>
                        <p className="text-xs text-ink-500">車程</p>
                        <p className="text-base font-bold text-ink-900 tabular-nums">
                          {r.estMinutes}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-ink-500">跳表估算</p>
                        <p className="text-lg font-black text-trust-blue-dark tabular-nums">
                          約 {formatCurrency(fare)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-base text-ink-700 leading-relaxed">
                    {r.note}
                  </p>
                  {r.suggestCharter && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      <Link href="/contact?type=business">
                        這段建議包車，問問怎麼安排
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mt-8">
          <p className="text-base text-ink-700 leading-relaxed">
            想知道完整費率怎麼算、或自己輸入距離試算？
            <Link
              href="/pricing"
              className="ml-1 font-bold text-trust-blue-dark underline underline-offset-4 hover:text-trust-blue"
            >
              看透明車資與即時試算器
            </Link>
          </p>
        </div>
      </Section>

      {/* OD 相關問答 */}
      {ROUTE_FAQS.length > 0 && (
        <Section className="bg-sand-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-ink-900 mb-6 text-center">
              關於接送與包車
            </h2>
            <FaqList items={ROUTE_FAQS} />
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-ink-900 text-sand-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            準備好出發了嗎？
          </h2>
          <p className="text-lg text-sand-200 leading-relaxed mb-8">
            無論接機、趕車、看海還是包車一日遊，花蓮在地司機熟悉每一條路。三秒撥通，或加 LINE 先講好行程。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneCTA size="xl" />
            <LineCTA size="xl" label="加 LINE 預約" showId />
          </div>
        </div>
      </Section>
    </>
  );
}
