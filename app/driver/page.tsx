import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { IncomeCalculator } from "@/components/driver/IncomeCalculator";
import { DriverApplyForm } from "@/components/driver/DriverApplyForm";
import {
  Brain,
  Wallet,
  MapPin,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "司機招募｜花蓮在地車隊・AI 智慧派單",
  description:
    "加入 GoGoCha 花蓮計程車隊。AI 自動接單、平台費業界最低 8%、在地調度。先試算月收入，再決定加入。",
  alternates: { canonical: "/driver" },
};

const REASONS = [
  {
    icon: Brain,
    title: "AI 幫你接單",
    desc: "SmartOrderManager 自動篩選最佳訂單，依距離、空車狀態智慧派發。你不用一直滑手機，專心開車。",
  },
  {
    icon: Wallet,
    title: "平台費 8%",
    desc: "GoGoCha 8% vs Uber 25%。跑同樣的趟，你每月多賺數萬元。花蓮人經營，不剝削司機。",
  },
  {
    icon: MapPin,
    title: "在地調度",
    desc: "花蓮人經營、花蓮辦公室、在地客服。司機有問題隨時找得到人，不是國外客服。",
  },
  {
    icon: Wrench,
    title: "工具齊全",
    desc: "自動跳表、低速計時、夜間自動切換、春節加成、愛心卡支援。所有計費 App 內自動處理。",
  },
];

const FAQS = [
  {
    q: "需要押金嗎？",
    a: "不需要押金、不需要保證金、不需要購買設備。只要你有職業駕照與合法車輛即可。",
  },
  {
    q: "要培訓嗎？",
    a: "需要 1 小時線上 App 操作說明 + 30 分鐘實際路測。我們提供完整 App 教學。",
  },
  {
    q: "怎麼結算？",
    a: "每週結算一次，匯款到您指定帳戶。App 內隨時查看收入明細、扣款項目。",
  },
  {
    q: "有保險嗎？",
    a: "車輛需投保乘客險（強制險已涵蓋基本）。我們協助合作保險公司方案，較市價優惠。",
  },
];

export default function DriverPage() {
  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-br from-taxi-yellow to-taxi-yellow-dark pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <BrandBadge variant="ink" className="mb-4">
            司機招募中
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-taxi-yellow-ink leading-[1.05] tracking-tight">
            在花蓮開車，
            <br />
            <span className="text-trust-blue-dark">賺得更踏實</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-taxi-yellow-ink/85 leading-relaxed">
            GoGoCha 是花蓮在地車隊，不是抽成 25% 的平台。AI 幫你接單、平台費業界最低、工具齊全。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="trust" size="xl">
              <Link href="#calculator">
                試算我能賺多少
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="#apply">直接申請</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Income Calculator */}
      <Section id="calculator" className="bg-sand-100">
        <IncomeCalculator />
      </Section>

      {/* Reasons */}
      <Section className="bg-sand-50">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
            為什麼加入 GoGoCha
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
            四件事讓你跑得更輕鬆
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.title}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="size-14 rounded-2xl bg-taxi-yellow/40 grid place-items-center shrink-0">
                      <Icon
                        className="size-7 text-taxi-yellow-ink"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-ink-900">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-base text-ink-700 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Requirements */}
      <Section className="bg-ink-900 text-sand-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
            申請條件
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "持有合法職業駕照",
              "車齡 10 年內合法營業車輛",
              "持有花蓮縣計程車執業登記證",
              "可全職或兼職，每週至少 20 小時",
              "智慧型手機（Android 8.0 以上）",
              "可配合車隊形象（整潔、禮貌）",
            ].map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3"
              >
                <Check
                  className="size-5 text-taxi-yellow shrink-0 mt-0.5"
                  aria-hidden
                />
                <span className="text-base">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-sand-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-ink-900 mb-8 text-center">
            常見問題
          </h2>
          <div className="grid gap-4">
            {FAQS.map((f) => (
              <Card key={f.q}>
                <CardContent className="p-5 md:p-6">
                  <h3 className="font-black text-lg text-ink-900 mb-2">
                    Q. {f.q}
                  </h3>
                  <p className="text-base text-ink-700 leading-relaxed">
                    {f.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Application form */}
      <Section className="bg-sand-100">
        <DriverApplyForm />
      </Section>
    </>
  );
}
