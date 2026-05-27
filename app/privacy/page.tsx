import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "隱私政策｜花蓮計程車 GoGoCha",
  description: `${site.shortName} 隱私政策：說明我們蒐集、使用、保護您個人資料的方式。`,
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    title: "1. 我們蒐集哪些資料",
    body: [
      "**個人識別資料**：當您撥打客服電話、使用 App 叫車、或填寫官網表單時，我們會收集您的姓名、聯絡電話、Email（若提供）。",
      "**位置資料**：使用 App 叫車時，我們會請求您的位置權限以提供叫車服務。位置資料僅在訂單期間使用。",
      "**行程記錄**：叫車起訖地點、車資、付款方式、評價內容，用於服務改善與客服紀錄。",
      "**裝置與技術資料**：使用網站時自動收集的 IP、瀏覽器類型、訪問頁面（用於 Google Analytics 統計）。",
    ],
  },
  {
    title: "2. 我們如何使用這些資料",
    body: [
      "**提供服務**：派發訂單、計算車資、聯絡您完成行程、處理付款。",
      "**客服支援**：回應您的詢問、處理客訴與建議。",
      "**改善服務**：分析使用行為，優化系統與司機派遣演算法。",
      "**法律遵循**：依政府法令保留必要的計程車營業記錄。",
    ],
  },
  {
    title: "3. 資料分享",
    body: [
      "**司機**：我們會將乘客姓名、上下車地點分享給接單司機，以提供服務。",
      "**第三方服務**：我們使用 Google Maps（路線計算）、Resend（表單寄信）、Google Analytics（流量分析）。這些服務有各自的隱私政策。",
      "**主管機關**：依法律要求（如警方、法院）配合提供。",
      "**永不出售**：我們不會將您的個人資料賣給任何第三方做廣告用途。",
    ],
  },
  {
    title: "4. 資料保護",
    body: [
      "所有資料傳輸使用 HTTPS 加密。資料儲存於台灣境內伺服器，採用業界標準的存取控制。",
      "員工僅在執行必要工作時才能存取個資，並簽署保密協議。",
    ],
  },
  {
    title: "5. 資料保留期限",
    body: [
      "**行程資料**：保留 5 年（依交通部規定）。",
      "**官網表單**：聯絡訊息保留 1 年後刪除。",
      "**Cookie**：依瀏覽器設定，可隨時清除。",
    ],
  },
  {
    title: "6. 您的權利",
    body: [
      "您可以隨時：（1）查詢您的個人資料、（2）要求更正錯誤、（3）要求刪除（行程記錄除外，因法令要求保留）、（4）撤回同意（將影響服務提供）。",
      `如需行使權利，請寄信至 privacy@gogocha.tw 或撥打 ${site.phoneDisplay}。`,
    ],
  },
  {
    title: "7. Cookie 政策",
    body: [
      "本網站使用必要 Cookie 維持功能，並使用 Google Analytics 統計流量（匿名）。您可以在瀏覽器設定停用 Cookie，但部分功能可能受影響。",
    ],
  },
  {
    title: "8. 政策變更",
    body: [
      "我們可能不時更新本政策。重大變更會在網站公告並更新「最後更新日」。",
    ],
  },
];

/** Render **bold** markup safely without dangerouslySetInnerHTML. */
function renderBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-ink-900 font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function PrivacyPage() {
  return (
    <>
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="ink" className="mb-4">
            法律文件
          </BrandBadge>
          <h1 className="text-4xl md:text-5xl font-black text-ink-900 leading-tight">
            隱私政策
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            最後更新：2026 年 5 月 27 日
          </p>
          <p className="mt-5 text-base md:text-lg text-ink-700 leading-relaxed">
            {site.name}（以下簡稱「我們」）尊重並保護您的個人資料隱私。本政策說明我們蒐集、使用、保護資料的方式。
          </p>
        </div>
      </Section>

      <Section className="bg-sand-50 pt-0">
        <div className="max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl md:text-2xl font-black text-ink-900 mb-4">
                {s.title}
              </h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-base text-ink-700 leading-relaxed"
                  >
                    {renderBold(p)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
