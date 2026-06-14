import { calculateFareLocally } from "@/lib/api/fare";

/**
 * 熱門路線資料 — 單一資料源（/routes 頁與相關 FAQ 共用）。
 *
 * 設計：
 * - 車資「不寫死」，由 distanceMeters 經 calculateFareLocally 衍生（費率改了自動同步）。
 * - 車程 estMinutes「手填」在地常識值，不用公式硬算——花蓮山路紅綠燈與彎道多，
 *   距離÷均速會給出明顯錯誤的數字，反而傷信任。
 * - suggestCharter 標記長途/景點分散路線，引導改用更划算的包車方案。
 */

export type Route = {
  slug: string;
  from: string;
  to: string;
  /** 約略距離（公尺），給 calculateFareLocally 算估算車資 */
  distanceMeters: number;
  /** 在地常識車程，如 "約 15 分鐘"（手填，非公式） */
  estMinutes: string;
  /** 在地人味備註 */
  note: string;
  /** 長途或景點分散，建議改包車 */
  suggestCharter?: boolean;
};

export const routes: Route[] = [
  {
    slug: "airport-to-city",
    from: "花蓮機場",
    to: "花蓮市區",
    distanceMeters: 5500,
    estMinutes: "約 15 分鐘",
    note: "機場到市區其實很近，跳表大概一百八上下。班機誤點、半夜抵達都不用慌，先用 LINE 把航班傳給我們，落地直接上車。",
  },
  {
    slug: "station-to-dongdamen",
    from: "花蓮火車站",
    to: "東大門夜市",
    distanceMeters: 3000,
    estMinutes: "約 8 分鐘",
    note: "下了火車想直接去東大門夜市吃飯，跳一下表就到，不用拖著行李走一大段。",
  },
  {
    slug: "station-to-taroko",
    from: "花蓮火車站",
    to: "太魯閣國家公園",
    distanceMeters: 27000,
    estMinutes: "約 35–45 分鐘",
    note: "這段很多人問。單趟跳表六百多，但太魯閣景點分散、回程不一定立刻叫得到車，包半天車會更省心也更划算。",
    suggestCharter: true,
  },
  {
    slug: "city-to-qixingtan",
    from: "花蓮市區",
    to: "七星潭",
    distanceMeters: 9000,
    estMinutes: "約 15 分鐘",
    note: "看海最方便的一段。回程怕叫不到車，上車前跟司機要個聯絡方式，或先加 LINE 約好回程時間。",
  },
  {
    slug: "city-to-qingshui",
    from: "花蓮市區",
    to: "清水斷崖",
    distanceMeters: 30000,
    estMinutes: "約 40 分鐘",
    note: "蘇花路上的招牌風景。路程有點長、彎道多，建議直接包車順道把太魯閣、七星潭一起跑完。",
    suggestCharter: true,
  },
  {
    slug: "airport-to-taroko",
    from: "花蓮機場",
    to: "太魯閣國家公園",
    distanceMeters: 25000,
    estMinutes: "約 35 分鐘",
    note: "一下飛機就直奔太魯閣的玩法。行李先放車上省得拉著跑，這種長途建議直接包車安排一整天。",
    suggestCharter: true,
  },
  {
    slug: "city-to-qingxiuyuan",
    from: "花蓮市區",
    to: "慶修院（吉安）",
    distanceMeters: 6000,
    estMinutes: "約 12 分鐘",
    note: "吉安的日式古蹟，離市區很近。順路還能安排吉安其他點，跟司機說一聲就好。",
  },
  {
    slug: "station-to-airport",
    from: "花蓮火車站",
    to: "花蓮機場",
    distanceMeters: 7000,
    estMinutes: "約 12 分鐘",
    note: "轉機或送機的短程，跳表十幾分鐘就到。趕飛機怕塞車，提前一點預約最安心。",
  },
  {
    slug: "city-to-ruisui-ranch",
    from: "花蓮市區",
    to: "瑞穗牧場",
    distanceMeters: 60000,
    estMinutes: "約 60 分鐘",
    note: "縱谷長途，單趟跳表破千。這種距離強烈建議包車，把瑞穗、光復一帶順路玩完更值得。",
    suggestCharter: true,
  },
  {
    slug: "city-to-guangfu-sugar",
    from: "花蓮市區",
    to: "光復糖廠",
    distanceMeters: 35000,
    estMinutes: "約 40 分鐘",
    note: "去吃糖廠冰的經典路線，路程不近。建議包車當天順遊馬太鞍、大農大富，一趟玩到飽。",
    suggestCharter: true,
  },
];

/**
 * 固定白天時間，避免 build 落在夜間（23:00–06:00）誤加 20% 夜間費、
 * 確保 SSG 產出的車資數字穩定（calculateFareLocally 內部用 date.getHours()）。
 */
const NOON_DATE = new Date(2026, 0, 1, 12, 0, 0);

/** 估算某距離的日間跳表車資（整數，已是 NT$5 的倍數）。 */
export function estimateDayFare(distanceMeters: number): number {
  return calculateFareLocally(distanceMeters, 0, NOON_DATE).totalFare;
}
