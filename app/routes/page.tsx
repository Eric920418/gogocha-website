import { pageMetadata } from "@/lib/seo/pages";
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
import { routes } from "@/content/routes";
import { faqsByQuestion } from "@/content/faqs";

export const metadata = pageMetadata("/routes");

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
          { name: "熱門接送路線", path: "/routes" },
        ])}
      />
      <JsonLd data={buildFAQJsonLd(ROUTE_FAQS)} />

      {/* Hero + 誠實聲明 */}
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-6 md:pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="blue" className="mb-4">
            熱門接送路線
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-tight">
            花蓮熱門路線
            <br />
            <span className="text-trust-blue-dark">上車地點與預約提醒</span>
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            花蓮機場、火車站與市區接送，請先提供日期時間、上下車地點、人數及行李。車資與車程受實際路線、等候和路況影響，請透過電話或 LINE 確認安排，實際依計費表收費。
          </p>
        </div>
      </Section>

      <Section className="bg-sand-100 py-8">
        <nav aria-label="接送路線索引" className="flex flex-wrap gap-3 mb-6">
          {routes.map((r) => <Link key={r.slug} href={`#${r.slug}`} className="underline text-trust-blue-dark p-2">{r.from} → {r.to}</Link>)}
        </nav>
        <p className="text-base leading-relaxed">太魯閣、清水斷崖及山區路線受天候與管制影響。出發前請查閱 <a href="https://www.taroko.gov.tw/" className="font-bold underline text-trust-blue-dark">太魯閣國家公園官方開放資訊</a>，並與客服確認可行路線。</p>
      </Section>
      {/* 路線列表 */}
      <Section className="bg-sand-50 pt-4 md:pt-6">
        <div className="max-w-4xl grid gap-4">
          {routes.map((r) => {
            return (
              <Card key={r.slug} id={r.slug} className="scroll-mt-24">
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <MapPin
                        className="size-5 shrink-0 text-trust-blue"
                        aria-hidden
                      />
                      <h2 className="text-lg md:text-xl font-black text-ink-900">
                        {r.from}
                        <span className="px-1.5 font-normal text-ink-500">
                          →
                        </span>
                        {r.to}
                      </h2>
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
                      <Link href="/contact">
                        詢問長途與回程安排
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
            想知道官方費率與夜間、春節收費規則？
            <Link
              href="/pricing"
              className="ml-1 font-bold text-trust-blue-dark underline underline-offset-4 hover:text-trust-blue"
            >
              看官方費率與收費說明
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
            無論接機、趕車、看海還是包車一日遊，花蓮在地司機熟悉每一條路。請打電話或加 LINE，先確認行程與車輛安排。
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
