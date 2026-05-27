/**
 * 全站共用設定 — 部署前換成真實值。
 */
export const site = {
  name: "GoGoCha 花蓮計程車",
  shortName: "GoGoCha",
  description:
    "花蓮在地 24h 計程車隊，跳表車資依花蓮縣政府公告，長輩友善大字按鈕，AI 智慧派車。叫車三秒撥通。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gogocha.tw",
  apiBase:
    process.env.NEXT_PUBLIC_API_BASE ?? "https://api.hualientaxi.taxi",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+886900000000",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "0900-000-000",
  playStoreUrl:
    process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
    "https://play.google.com/store/apps/details?id=com.hualien.taxidriver",
  iosWaitlistUrl: process.env.NEXT_PUBLIC_IOS_WAITLIST_URL ?? "/ios-waitlist",
  lineOAUrl:
    process.env.NEXT_PUBLIC_LINE_OA_URL ?? "https://line.me/R/ti/p/@948rysbt",
  lineOAId: "@948rysbt",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  locale: "zh-TW",
} as const;

/**
 * 品牌統計數字 — 部署前替換為真實數據（用戶提供）。
 * 顯示時用 `<StatPill>`。
 */
export const stats = {
  totalTrips: "5,000+",
  rating: "4.9",
  reviewCount: "120+",
  driverCount: "30+",
  yearsOperating: "10+",
  coverageTowns: 13,
} as const;
