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
  return `${site.url}${path}`;
}

export function buildOrganizationJsonLd() {
  const hasRealPhone = !isPlaceholderPhone(site.phone);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    ...(hasRealPhone ? { telephone: site.phone } : {}),
    sameAs: [site.lineOAUrl],
  };
}

/**
 * SAB（service-area business）計程車的 LocalBusiness + TaxiService schema。
 * 設計重點（無實體店面、無真實 NAP/評價的約束下，只放不會被判造假的欄位）：
 * - 不放街道地址（SAB 正解）：用 areaServed 表服務範圍，address 只到行政區層級。
 * - geo 用花蓮市公開座標，作為服務範圍中心（非門牌）。
 * - telephone 套佔位守衛：假號碼時整個欄位省略，只留真實的 LINE 預約管道。
 * - 絕不放 aggregateRating／review：無第三方真實評價，自家網站自評違反 Google 政策。
 */
export function buildLocalBusinessJsonLd() {
  const hasRealPhone = !isPlaceholderPhone(site.phone);
  return {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "LocalBusiness"],
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl("/logo.png"),
    logo: absoluteUrl("/logo.png"),
    priceRange: "$$",
    ...(hasRealPhone ? { telephone: site.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "花蓮市",
      addressRegion: serviceArea.county,
      addressCountry: "TW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: serviceArea.center.latitude,
      longitude: serviceArea.center.longitude,
    },
    areaServed: serviceArea.towns.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: [
      ...(hasRealPhone
        ? [
            {
              "@type": "ContactPoint",
              telephone: site.phone,
              contactType: "customer service",
              areaServed: "TW",
              availableLanguage: ["zh-TW"],
              hoursAvailable: "Mo-Su 00:00-23:59",
            },
          ]
        : []),
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        url: site.lineOAUrl,
        identifier: `LINE ${site.lineOAId}`,
        areaServed: "TW",
        availableLanguage: ["zh-TW"],
      },
    ],
    sameAs: [site.lineOAUrl],
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
 * FAQPage schema。價值主要在 AEO/GEO（ChatGPT Search、Perplexity、AI Overviews
 * 擷取問答作引用來源）；Google 已將 FAQ 富摘要限縮至權威網站，一般商家頁不會長出
 * 折疊富摘要——這是預期行為，非失敗。傳入的 faqs 必須等於該頁實際可見內容。
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
