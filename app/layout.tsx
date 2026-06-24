import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { notoSansTC } from "@/lib/fonts";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildOrganizationJsonLd,
  buildLocalBusinessJsonLd,
} from "@/lib/seo/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `花蓮計程車叫車推薦｜${site.shortName} 在地24h車隊・透明跳表`,
    template: `%s ｜ ${site.name}`,
  },
  description: site.description,
  keywords: [
    "花蓮計程車",
    "花蓮叫車",
    "花蓮 AI 叫車",
    "AI 語音客服",
    "花蓮無障礙叫車",
    "花蓮包車",
    "花蓮機場接送",
    "太魯閣包車",
    "花蓮計程車推薦",
    "GoGoCha",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: site.url,
    siteName: site.name,
    title: `花蓮計程車叫車推薦｜${site.shortName} 在地24h車隊`,
    description: site.description,
    // og:image 由 app/opengraph-image.tsx 動態產生（Next 自動注入正確 URL），
    // 不再手動指向不存在的 /og-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // 允許使用者縮放 — 長輩友善必備（多數現代官網禁用是錯的）
  maximumScale: 5,
  themeColor: "#FFD54F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSansTC.variable} h-full antialiased`}
    >
      <body className="bg-sand-50 text-ink-900 min-h-full flex flex-col">
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildLocalBusinessJsonLd()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            className: "font-sans",
          }}
        />
      </body>
    </html>
  );
}
