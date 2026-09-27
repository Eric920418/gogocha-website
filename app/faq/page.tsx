import { pageMetadata } from "@/lib/seo/pages";
import { Section } from "@/components/layout/Section";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { FaqList } from "@/components/shared/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { faqs, faqsByCategory, FAQ_CATEGORIES } from "@/content/faqs";

export const metadata = pageMetadata("/faq");

export default function FaqPage() {
  return (
    <>
      {/* FAQPage 餵 AEO/GEO；Breadcrumb 幫 AI 理解站點層級。傳入內容＝本頁可見內容 */}
      <JsonLd data={buildFAQJsonLd(faqs)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "常見問題", path: "/faq" },
        ])}
      />

      {/* Hero */}
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-6 md:pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="blue" className="mb-4">
            常見問題
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-tight">
            花蓮計程車
            <br />
            <span className="text-trust-blue-dark">常見問題</span>
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            叫車、車資、付款、機場接送、長輩友善、服務範圍——花蓮在地車隊一次幫你說清楚。找不到想問的，直接打電話或加 LINE，我們的客服聽得懂台語。
          </p>
        </div>
      </Section>

      {/* 依分類列出問答 */}
      <Section className="bg-sand-50 pt-4 md:pt-6">
        <div className="max-w-3xl space-y-10 md:space-y-14">
          {FAQ_CATEGORIES.map((category) => (
            <div key={category}>
              <h2 className="text-2xl md:text-3xl font-black text-ink-900 mb-5">
                {category}
              </h2>
              <FaqList items={faqsByCategory(category)} />
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-sand-100">
        <p className="text-base leading-relaxed">費率來源與適用日期請見 <a href="/pricing" className="font-bold underline text-trust-blue-dark">官方車資說明</a>；太魯閣與山區行程請先查 <a href="https://www.taroko.gov.tw/" className="font-bold underline text-trust-blue-dark">太魯閣國家公園官方開放資訊</a>，再與客服確認。</p>
      </Section>
      {/* CTA */}
      <Section className="bg-ink-900 text-sand-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            還是想直接問？
          </h2>
          <p className="text-lg text-sand-200 leading-relaxed mb-8">
            找不到你要的答案，或想直接叫車——可透過電話或 LINE 聯絡花蓮在地客服，確認接送安排。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneCTA size="xl" />
            <LineCTA size="xl" label="加 LINE 詢問" showId />
          </div>
        </div>
      </Section>
    </>
  );
}
