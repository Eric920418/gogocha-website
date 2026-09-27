export type Route = {
  slug: string;
  from: string;
  to: string;
  note: string;
  suggestCharter?: boolean;
};

// 保留既有 slug，供路線頁錨點與 llms.txt 導覽共用；不提供未核實估價。
export const routes: Route[] = [
  {
    slug: "airport-to-city",
    from: "花蓮機場",
    to: "花蓮市區",
    note: "預約時提供航班號碼、抵達時間、市區地址、人數與行李件數；航班變更請通知客服，會合出口以司機確認為準。",
  },
  {
    slug: "station-to-airport",
    from: "花蓮火車站",
    to: "花蓮機場",
    note: "提供車站出口、火車抵達時間、航班及行李件數；請預留報到與交通時間，並取得客服的派車確認。",
  },
  {
    slug: "station-to-dongdamen",
    from: "花蓮火車站",
    to: "東大門夜市",
    note: "先確認花蓮車站前站或後站出口，以及東大門的下車地點；攜帶行李請事先告知，並確認夜市周邊可停靠位置。",
  },
  {
    slug: "city-to-qixingtan",
    from: "花蓮市區",
    to: "七星潭",
    note: "提供市區上車地址及七星潭會合地標；建議預先確認回程時間與地點，現場不一定隨時有空車。",
  },
  {
    slug: "city-to-qingxiuyuan",
    from: "花蓮市區",
    to: "慶修院（吉安）",
    note: "提供市區地址、出發時間及回程需求；請自行確認景點營業時間，與客服約定可安全停靠的會合點。",
  },
  {
    slug: "station-to-taroko",
    from: "花蓮火車站",
    to: "太魯閣國家公園",
    note: "請指定園區內確切目的地，先查官方開放公告與道路管制，再與客服確認接送及回程；無法保證園區可通行或可遊覽。",
    suggestCharter: true,
  },
  {
    slug: "airport-to-taroko",
    from: "花蓮機場",
    to: "太魯閣國家公園",
    note: "請提供航班、行李及園區內確切目的地；先查官方開放公告，再確認可行接送路線，不保證落地即可進入園區。",
    suggestCharter: true,
  },
  {
    slug: "city-to-qingshui",
    from: "花蓮市區",
    to: "清水斷崖",
    note: "出發前查詢道路與遊憩據點開放狀態，確認可停靠地點；沿線管制或天候可能影響接送與回程。",
    suggestCharter: true,
  },
  {
    slug: "city-to-ruisui-ranch",
    from: "花蓮市區",
    to: "瑞穗牧場",
    note: "長途接送請先確認景點營業時間、用車時段與回程安排；是否能派車及費用請由客服確認。",
    suggestCharter: true,
  },
  {
    slug: "city-to-guangfu-sugar",
    from: "花蓮市區",
    to: "光復糖廠",
    note: "請提供景點內確切目的地、人數、行李及回程需求；長途與跨區接送需事先確認車輛安排。",
    suggestCharter: true,
  },
];
