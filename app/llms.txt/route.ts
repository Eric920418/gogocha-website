import { site, serviceArea } from "@/lib/site";
import { isPlaceholderPhone } from "@/lib/seo/jsonld";
import { pages } from "@/lib/seo/pages";
import { routes } from "@/content/routes";
import { faqsByCategory } from "@/content/faqs";

export const dynamic = "force-static";

export function GET(): Response {
  const body = `# ${site.name}

> ${site.description}

## 聯絡與服務範圍

${isPlaceholderPhone(site.phone) ? "" : `- 電話：${site.phoneDisplay}\n`}- [LINE 官方帳號 ${site.lineOAId}](${site.lineOAUrl})
- 可洽詢地區：${serviceArea.county} ${serviceArea.towns.join("、")}。偏遠、山區及跨鄉鎮接送需提前確認，不保證隨時有空車。
- 預約請提供上下車地點、日期時間、人數與行李；收到客服確認後再安排行程。
- 一般接送依計費表收費；官方公告來源與適用日期請見[車資說明](${site.url}/pricing)。本導覽不提供路線估價。

## 主要頁面

${pages.map((page) => `- [${page.name}](${new URL(page.path, site.url).href})：${page.description}`).join("\n")}

## 接送路線

${routes.map((r) => `- [${r.from} → ${r.to}](${site.url}/routes#${r.slug})：${r.note}`).join("\n")}

太魯閣與山區行程請先查[太魯閣國家公園官方開放資訊](https://www.taroko.gov.tw/)，再確認接送。

## 預約常見問題

${faqsByCategory("叫車與預約")
  .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
  .join("\n\n")}
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
