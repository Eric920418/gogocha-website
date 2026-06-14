/**
 * 全站共用設定 — 部署前換成真實值。
 */
export const site = {
  name: "GoGoCha 花蓮計程車",
  shortName: "GoGoCha",
  description:
    "花蓮在地 24h 計程車隊，跳表車資依花蓮縣政府公告，長輩友善大字按鈕，AI 智慧派車。叫車三秒撥通。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hualientaxi.taxi",
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

/**
 * 服務區域 — 花蓮縣 13 鄉鎮市與熱門接送地標。
 * 單一資料源：CoverageStrip、JSON-LD areaServed、熱門路線頁、llms.txt 共用同一份。
 */
export const serviceArea = {
  county: "花蓮縣",
  towns: [
    "花蓮市",
    "吉安鄉",
    "新城鄉",
    "壽豐鄉",
    "鳳林鎮",
    "光復鄉",
    "瑞穗鄉",
    "玉里鎮",
    "秀林鄉",
    "萬榮鄉",
    "卓溪鄉",
    "豐濱鄉",
    "富里鄉",
  ],
  landmarks: [
    "花蓮機場",
    "花蓮火車站",
    "太魯閣國家公園",
    "七星潭",
    "清水斷崖",
    "慶修院",
    "東大門夜市",
    "瑞穗牧場",
    "光復糖廠",
    "六十石山",
  ],
  // 花蓮市中心公開座標，作為 SAB 服務範圍中心點（非門牌地址）
  center: { latitude: 23.9871, longitude: 121.6015 },
} as const;
