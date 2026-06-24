import { site, serviceArea } from "@/lib/site";
import { isPlaceholderPhone } from "@/lib/seo/jsonld";

/**
 * /llms.txt — 給 AI 引擎（ChatGPT Search、Perplexity、AI Overviews 等）的結構化導覽。
 * 用動態 route（非 public 靜態檔）：URL 從 site.url 衍生，網域改一處即全站正確；
 * 電話套佔位守衛，假號碼時不外露給機器讀取。
 */
export const dynamic = "force-static";

export function GET(): Response {
  const u = site.url;
  const hasRealPhone = !isPlaceholderPhone(site.phone);
  const phoneLine = hasRealPhone
    ? `- 電話叫車（24 小時）：${site.phoneDisplay}\n`
    : "";

  const body = `# GoGoCha 花蓮計程車

> 花蓮在地 24 小時計程車隊。打電話由 AI 語音客服接聽、像真人對話、聽得懂台語；跳表收費依花蓮縣政府公告、不加價，App 為長輩做大字大按鈕，提供電話、LINE、App 三種叫車方式。服務範圍涵蓋花蓮縣 13 鄉鎮市。

GoGoCha 是花蓮人經營的在地車隊（非全國型叫車平台）。核心特色：

- AI 語音接線（特色）：撥打客服專線由 AI 語音客服接聽，像真人一樣對話、聽得懂國台語，說出地點即可叫車，沒有按鍵選單；忙線或需要時自動轉接在地真人客服，不漏接。
- 跳表透明：起跳 NT$100（前 1.25 公里），續跳每 250 公尺 NT$5，夜間 23:00–06:00 加成 20%，農曆春節（除夕至初五）全程加 NT$50，實際以司機跳表為準。
- 長輩友善：App 大字大按鈕、客服聽得懂台語；不會用 App 也能直接打電話，AI 語音客服一樣幫你叫到車。
- 在地調度：花蓮辦公室、在地司機熟悉每一條花蓮道路。
- 三種叫車方式：電話、LINE 官方帳號 ${site.lineOAId}、Android App。
- 付款方式：現金、信用卡、悠遊卡、LINE Pay、街口支付。
- 服務範圍：${serviceArea.county} ${serviceArea.towns.join("、")}。

## 熱門路線車資（日間跳表估算，實際以司機跳表為準）

- 花蓮機場 → 花蓮市區：約 NT$185，車程約 15 分鐘
- 花蓮火車站 → 太魯閣：約 NT$615，車程約 35–45 分鐘（景點分散，建議包車）
- 花蓮市區 → 七星潭：約 NT$255，車程約 15 分鐘
- 花蓮市區 → 清水斷崖：約 NT$675，車程約 40 分鐘（建議包車）

## 主要頁面

- [乘客叫車](${u}/passenger)：叫車方式、長輩友善功能、無障礙服務
- [常見問題](${u}/faq)：叫車、車資、付款、機場接送、長輩與無障礙、服務範圍的完整問答
- [熱門路線車資](${u}/routes)：花蓮機場、火車站到市區、太魯閣、七星潭、清水斷崖等路線的估算車資與車程
- [透明車資](${u}/pricing)：完整費率表與即時車資試算器
- [關於我們](${u}/about)：花蓮在地車隊的故事與服務承諾
- [司機招募](${u}/driver)：加入車隊、AI 派單、收入試算

## 聯絡方式

${phoneLine}- LINE 官方帳號：${site.lineOAId}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
