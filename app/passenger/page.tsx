import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { AppDownloadCTA } from "@/components/shared/AppDownloadCTA";
import { Testimonial } from "@/components/shared/Testimonial";
import { testimonials } from "@/content/testimonials";
import {
  Mic,
  Eye,
  HandHeart,
  Phone,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "乘客叫車｜花蓮在地24h車隊・長輩友善",
  description:
    "GoGoCha 乘客叫車。電話三秒撥通、跳表車資依花蓮縣政府公告、大字按鈕長輩友善、語音叫車。花蓮在地車隊，24h 服務。",
  alternates: { canonical: "/passenger" },
};

const FEATURES = [
  {
    icon: Mic,
    title: "語音叫車",
    desc: "說話就能叫車，不用打字。「我要叫車到花蓮車站」即可。",
  },
  {
    icon: Eye,
    title: "大字按鈕",
    desc: "App 介面字體放大、按鈕加大，長輩、視力差也看得清楚。",
  },
  {
    icon: HandHeart,
    title: "無障礙友善",
    desc: "標示輪椅可上下車車輛，特殊需求備註，司機提前準備。",
  },
  {
    icon: Phone,
    title: "電話也能叫",
    desc: "不會用 App 沒關係，撥打客服專線一樣可以叫車。",
  },
  {
    icon: CreditCard,
    title: "多元支付",
    desc: "現金、信用卡、悠遊卡、LINE Pay、街口支付，自由選擇。",
  },
  {
    icon: ShieldCheck,
    title: "車輛保險",
    desc: "所有車輛投保乘客險，旅程全程保障。",
  },
];

export default function PassengerPage() {
  return (
    <>
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="yellow" className="mb-4">
            乘客專區
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-[1.05] tracking-tight">
            一通電話 / 一個按鈕，
            <br />
            <span className="text-trust-blue-dark">花蓮車到你身邊</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-ink-700 leading-relaxed">
            無論是長輩看診、上班通勤、機場接送，還是夜歸回家。GoGoCha 24 小時在地車隊三秒撥通。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <PhoneCTA size="xl" />
            <LineCTA size="xl" label="加 LINE 叫車" showId />
          </div>
          <div className="mt-6">
            <p className="text-sm text-ink-500 mb-3">或下載 App 自助叫車</p>
            <AppDownloadCTA />
          </div>
        </div>
      </Section>

      <Section className="bg-sand-100">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
            乘客功能
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
            為花蓮人量身打造
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="h-full">
                <CardContent className="p-6">
                  <div className="size-12 rounded-xl bg-taxi-yellow/30 grid place-items-center mb-4">
                    <Icon
                      className="size-6 text-taxi-yellow-ink"
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-lg font-black text-ink-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-base text-ink-700 leading-relaxed">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-sand-50">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
            真實乘客評價
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
            花蓮人說的算
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <Testimonial key={t.name} {...t} />
          ))}
        </div>
      </Section>
    </>
  );
}
