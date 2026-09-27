import Link from "next/link";
import { pageMetadata } from "@/lib/seo/pages";
import { Section } from "@/components/layout/Section";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { FaqList } from "@/components/shared/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildFAQJsonLd } from "@/lib/seo/jsonld";
import { farePolicy } from "@/content/fare-policy";
import { faqsByCategory } from "@/content/faqs";

export const metadata = pageMetadata("/pricing");
const pricingFaqs = faqsByCategory("車資與付款");

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "車資說明", path: "/pricing" },
        ])}
      />
      <JsonLd data={buildFAQJsonLd(pricingFaqs)} />
      <Section className="bg-sand-50 pt-16 md:pt-24">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-ink-900">
            花蓮計程車費率與收費說明
          </h1>
          <p className="text-lg leading-relaxed">
            一般接送實際依計費表收費。路線、等候及夜間時段會影響金額；請用電話或
            LINE
            提供行程，先確認接送安排。本頁提供官方公告摘要，不提供數值試算或固定路線報價。
          </p>
          <p className="text-sm text-ink-500">
            資料查核日期：
            <time dateTime={farePolicy.reviewedAt}>
              {farePolicy.reviewedAt}
            </time>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <PhoneCTA />
            <LineCTA label="加 LINE 詢問接送" />
          </div>
        </div>
      </Section>
      <Section className="bg-sand-100">
        <div className="max-w-3xl space-y-8">
          <h2 className="text-3xl font-black">2026 年查核適用費率</h2>
          <p className="text-lg leading-relaxed">{farePolicy.current}</p>
          <h3 className="text-xl font-black">夜間費率</h3>
          <p className="text-lg leading-relaxed">{farePolicy.night}</p>
          <h3 className="text-xl font-black">春節期間</h3>
          <p className="text-lg leading-relaxed">{farePolicy.spring}</p>
          <a
            href={farePolicy.currentSource}
            className="font-bold text-trust-blue-dark underline"
          >
            資料來源：花蓮縣政府計程車運價公告（PDF）
          </a>
          <h2 className="text-3xl font-black">2027 年 1 月 1 日起的新制</h2>
          <p className="text-lg leading-relaxed">{farePolicy.future}</p>
          <a
            href={farePolicy.futureSource}
            className="font-bold text-trust-blue-dark underline"
          >
            資料來源：縣府 2027 年運價調整公告
          </a>
        </div>
      </Section>
      <Section className="bg-sand-50">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-black">車資與付款常見問題</h2>
          <FaqList items={pricingFaqs} />
          <Link
            href="/routes"
            className="inline-block font-bold text-trust-blue-dark underline"
          >
            查看機場與車站接送指南
          </Link>
        </div>
      </Section>
    </>
  );
}
