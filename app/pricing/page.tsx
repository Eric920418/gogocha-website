import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { FareCalculator } from "@/components/fare-calculator/FareCalculator";
import { FareTable, FareRulesList } from "@/components/fare-calculator/FareTable";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildTaxiServiceJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "花蓮計程車車資｜花蓮縣政府公告跳表費率",
  description:
    "花蓮計程車透明車資表：起跳 NT$100、續跳每 250m NT$5、夜間 23-06 加成 20%。對齊花蓮縣政府公告，無平台加成。提供即時車資試算器。",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildTaxiServiceJsonLd()} />

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
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            常見問題
          </h2>
          <div className="grid gap-4 text-left mt-8">
            {[
              {
                q: "從花蓮機場到市區大概多少錢？",
                a: "約 5-6 公里，日間車資 NT$190-220 之間。夜間（23:00 後）加成 20%。",
              },
              {
                q: "去太魯閣包車怎麼算？",
                a: "太魯閣行程建議使用包車方案，依時間與里程計算，請洽 B2B 合作頁面或直接電話詢問。",
              },
              {
                q: "可以刷卡或行動支付嗎？",
                a: "全車隊支援現金、信用卡、悠遊卡、LINE Pay、街口支付。",
              },
              {
                q: "預約叫車要加錢嗎？",
                a: "30 分鐘內加價不收費；30 分鐘以上預約加收 NT$50 服務費。",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10"
              >
                <h3 className="font-black text-lg text-taxi-yellow mb-2">
                  Q. {f.q}
                </h3>
                <p className="text-base text-sand-200 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
