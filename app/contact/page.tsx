import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { ContactForm } from "./ContactForm";
import { LineIcon } from "@/components/shared/LineIcon";
import { LineQR } from "@/components/shared/LineQR";
import { Mail, Phone as PhoneIcon, Clock } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "聯絡我們｜花蓮計程車 GoGoCha",
  description:
    "聯絡 GoGoCha 花蓮計程車：電話叫車、B2B 合作詢價、客戶建議。客服時間 24 小時，B2B 業務時間 09:00-21:00。",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: PhoneIcon,
    title: "立即叫車",
    desc: "24h 不打烊・三秒撥通",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    accent: "text-taxi-yellow-ink bg-taxi-yellow/30",
  },
  {
    icon: LineIcon,
    title: "LINE 叫車",
    desc: "加好友、傳訊息、叫車",
    value: site.lineOAId,
    href: site.lineOAUrl,
    external: true,
    accent: "text-[#06C755] bg-[#06C755]/10",
  },
  {
    icon: Mail,
    title: "B2B 合作",
    desc: "旅行社・飯店・企業",
    value: "business@hualientaxi.taxi",
    href: "mailto:business@hualientaxi.taxi",
    accent: "text-trust-blue-dark bg-trust-blue/10",
  },
  {
    icon: Clock,
    title: "客服時間",
    desc: "電話叫車服務時間",
    value: "24h 全年無休",
    accent: "text-ink-700 bg-sand-100",
  },
];

type ChannelInnerProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  desc: string;
  accent: string;
};

function ChannelInner({
  icon: Icon,
  title,
  value,
  desc,
  accent,
}: ChannelInnerProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`size-11 rounded-xl grid place-items-center shrink-0 ${accent}`}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm text-ink-500">{title}</p>
        <p className="font-black text-ink-900 text-lg mt-0.5">{value}</p>
        <p className="text-xs text-ink-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="blue" className="mb-4">
            聯絡我們
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-[1.05] tracking-tight">
            有任何問題，
            <br />
            <span className="text-trust-blue-dark">我們都在花蓮</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-ink-700 leading-relaxed">
            無論是叫車、合作、建議，撥通電話或填寫表單，花蓮在地團隊親自回覆。
          </p>
        </div>
      </Section>

      <Section className="bg-sand-100 pt-8 md:pt-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CHANNELS.map((c) => {
            const isAnchor = "href" in c && c.href;
            const isExternal = "external" in c && c.external;
            return isAnchor ? (
              <a
                key={c.title}
                href={c.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block bg-white rounded-2xl border border-sand-200 p-5 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <ChannelInner {...c} />
              </a>
            ) : (
              <div
                key={c.title}
                className="block bg-white rounded-2xl border border-sand-200 p-5"
              >
                <ChannelInner {...c} />
              </div>
            );
          })}
        </div>

        {/* LINE 叫車快速通道（含 QR） */}
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-[#06C755] to-[#05B14C] text-white p-6 md:p-10">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
            <LineQR size={180} showId={false} className="bg-white border-0 mx-auto md:mx-0" />
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold bg-white/15 rounded-full px-3 py-1 mb-3">
                <LineIcon className="size-4" />
                推薦給長輩
              </div>
              <h2 className="text-2xl md:text-4xl font-black leading-tight">
                LINE 叫車最方便
              </h2>
              <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
                加入官方帳號 <span className="font-black tabular-nums">{site.lineOAId}</span>
                ，直接傳訊息就能叫車、查車資、問路線。手機 LINE App 掃左邊 QR 立刻加好友。
              </p>
              <a
                href={site.lineOAUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-[#06C755] font-black hover:bg-white/90 transition-all"
              >
                <LineIcon className="size-5" />
                直接開啟 LINE 加入
              </a>
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-sand-200 bg-white p-10 text-center text-ink-500">
              載入表單中…
            </div>
          }
        >
          <ContactForm />
        </Suspense>

        <div className="mt-8 text-center">
          <p className="text-sm text-ink-500 mb-3">急著叫車？</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneCTA size="lg" />
            <a
              href={site.lineOAUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg rounded-xl bg-[#06C755] text-white font-bold hover:bg-[#05B14C] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <LineIcon className="size-5" />
              加 LINE {site.lineOAId}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
