import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { FareCalculator } from "@/components/fare-calculator/FareCalculator";
import { FareTable, FareRulesList } from "@/components/fare-calculator/FareTable";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildLocalBusinessJsonLd, buildFAQJsonLd } from "@/lib/seo/jsonld";
import { faqsByCategory } from "@/content/faqs";

export const metadata: Metadata = {
  title: "花蓮計程車車資試算｜縣府公告跳表費率一覽",
  description:
    "花蓮計程車透明車資表：起跳 NT$100、續跳每 250m NT$5、夜間 23-06 加成 20%。對齊花蓮縣政府公告，無平台加成。提供即時車資試算器。",
  alternates: { canonical: "/pricing" },
};

// 車資與付款分類 FAQ：頁面顯示與 FAQPage schema 共用同一子集（內容＝可見內容）
const pricingFaqs = faqsByCategory("車資與付款");

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <JsonLd data={buildFAQJsonLd(pricingFaqs)} />

      <Section className="bg-sand-50 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-3xl">
          <BrandBadge variant="blue" className="mb-4">
            透明車資・無加成
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-tight">
            花蓮計程車車資
            <br />
            <span className="text-trust-blue-dark">
              花蓮縣政府公告跳表費率
            </span>
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            GoGoCha 所有司機統一依花蓮縣政府公告計費。沒有平台抽成、沒有夜間漫天喊價、沒有觀光客加價。先試算、再上車。
          </p>
        </div>
      </Section>

      <Section className="bg-sand-100 py-12 md:py-16">
        <FareCalculator />
      </Section>

      <Section className="bg-sand-50">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <FareTable />
          <FareRulesList />
        </div>
      </Section>

      <Section className="bg-ink-900 text-sand-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
            車資常見問題
          </h2>
          <div className="grid gap-4 text-left">
            {pricingFaqs.map((f) => (
              <div
                key={f.question}
                className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10"
              >
                <h3 className="font-black text-lg text-taxi-yellow mb-2">
                  Q. {f.question}
                </h3>
                <p className="text-base text-sand-200 leading-relaxed">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 font-bold text-taxi-yellow underline underline-offset-4 hover:text-taxi-yellow-dark"
            >
              看全部常見問題
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
