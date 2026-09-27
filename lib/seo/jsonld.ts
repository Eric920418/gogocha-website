import { site, serviceArea } from "@/lib/site";

/**
 * 佔位電話（部署前的假值）。偵測到就不把它寫進任何給機器讀取的結構化資料，
 * 避免 AI 引擎／搜尋引擎拿假號碼去顯示或撥打。真實電話一進環境變數即自動放行。
 */
const PLACEHOLDER_PHONE = "+886900000000";
export function isPlaceholderPhone(phone: string): boolean {
  return phone === PLACEHOLDER_PHONE;
}

/** 把相對路徑組成絕對 URL（集中處理，網域改 site.url 一處即全站生效）。 */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).href;
}

export function buildOrganizationJsonLd() {
  const hasRealPhone = !isPlaceholderPhone(site.phone);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    ...(hasRealPhone ? { telephone: site.phone } : {}),
    sameAs: [site.lineOAUrl],
  };
}

/** 服務與營運組織分開描述；沒有已核實店址，不宣稱 LocalBusiness 地點。 */
export function buildTaxiServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": absoluteUrl("/#taxi-service"),
    name: site.name,
    description: site.description,
    url: site.url,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: serviceArea.towns.map((name) => ({ "@type": "AdministrativeArea", name })),
  };
}

/** 可重用麵包屑。items 用相對 path，內部組成絕對 URL。 */
export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/**
 * FAQPage 描述頁面問答，不保證 AI 引用或 Google 富摘要。
 * 傳入的 faqs 必須等於該頁實際可見內容。
 */
export function buildFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
