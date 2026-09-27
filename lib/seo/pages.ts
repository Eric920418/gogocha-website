import type { Metadata } from "next";
import { site } from "@/lib/site";

export const pages = [
  {
    path: "/",
    name: "首頁",
    title: "花蓮計程車叫車｜電話、LINE 預約與接送",
    description:
      "GoGoCha 花蓮計程車提供電話、LINE 與 Android App 叫車。查詢機場、車站接送、預約流程與官方車資說明，派車依地點與當時車況確認。",
  },
  {
    path: "/passenger",
    name: "乘客叫車",
    title: "花蓮叫車與預約流程｜機場、車站、看診接送",
    description:
      "在花蓮用電話或 LINE 預約計程車：提供上車地點、目的地、時間、人數與行李。長輩、輪椅與付款需求請事先確認。",
  },
  {
    path: "/driver",
    name: "司機招募",
    title: "花蓮計程車司機招募｜加入 GoGoCha",
    description:
      "了解 GoGoCha 花蓮車隊的司機申請條件、接單工具與合作方式，透過申請表聯絡車隊。",
  },
  {
    path: "/pricing",
    name: "車資說明",
    title: "花蓮計程車費率｜官方公告與收費說明",
    description:
      "查閱花蓮縣政府公告的日間、夜間及春節計程車費率，區分 2026 年適用費率與 2027 年新制。實際依計費表收費，接送需求可電話或 LINE 詢問。",
  },
  {
    path: "/routes",
    name: "接送路線",
    title: "花蓮機場與車站接送｜熱門路線預約指南",
    description:
      "花蓮機場、火車站、市區與七星潭接送指南，整理會合地點、行李、回程預約及山區路況提醒；用電話或 LINE 確認行程。",
  },
  {
    path: "/faq",
    name: "常見問題",
    title: "花蓮計程車常見問題｜叫車、付款與預約",
    description:
      "整理花蓮計程車叫車方式、車資來源、機場接送、付款與輪椅需求。出發前確認時間、車型與派車安排。",
  },
  {
    path: "/about",
    name: "關於我們",
    title: "關於 GoGoCha｜花蓮計程車服務",
    description:
      "認識 GoGoCha 花蓮計程車的叫車管道、長輩友善設計與服務區域，透過電話或 LINE 聯絡車隊確認行程。",
  },
  {
    path: "/contact",
    name: "聯絡我們",
    title: "聯絡 GoGoCha｜花蓮電話與 LINE 叫車",
    description:
      "GoGoCha 花蓮計程車聯絡方式：電話、LINE 叫車與行程詢問，以及飯店、企業合作和乘客服務表單。",
  },
  {
    path: "/privacy",
    name: "隱私政策",
    title: "GoGoCha 隱私政策",
    description: "GoGoCha 隱私政策：個人資料蒐集、使用、保護及聯絡方式。",
  },
] as const;

export type PagePath = (typeof pages)[number]["path"];

export function pageMetadata(path: PagePath): Metadata {
  const page = pages.find((page) => page.path === path)!;
  const title = `${page.title}｜${site.shortName}`;
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: site.name,
      title,
      description: page.description,
      url: path,
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: site.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}
