import { Fragment } from "react";
import { Section } from "@/components/layout/Section";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import {
  Sparkles,
  Phone,
  MessageCircle,
  UserCheck,
  Zap,
  PhoneCall,
  Mic,
  Car,
  ArrowRight,
} from "lucide-react";

/**
 * AI 語音叫車賣點區塊。
 *
 * 行銷翻譯層：把內部語音派遣管線（電話進線 → AI 對話 → 忙線轉真人 → 即時配車）
 * 轉成消費者聽得懂的「好處」與「怎麼運作」。
 * 刻意不揭露任何廠商名、並發門檻、SIP 號碼 — 那些是內部機密，不是賣點。
 */

const BENEFITS = [
  {
    icon: Phone,
    title: "不用學 App，撥打就好",
    desc: "拿起電話撥客服專線就能叫車。不會用智慧型手機的長輩，也能自己叫到車。",
  },
  {
    icon: MessageCircle,
    title: "聽得懂國台語，沒有按鍵選單",
    desc: "像跟真人講話一樣直接說，不必再「國語請按 1、台語請按 2」。說出地點就好。",
  },
  {
    icon: UserCheck,
    title: "忙線自動轉真人，絕不漏接",
    desc: "電話多到接不完時，立刻接力給在地真人客服。半夜、颱風天、過年都接得到。",
  },
  {
    icon: Zap,
    title: "講完地點，3 秒配到車",
    desc: "說完上車地點，系統立刻為你配到最近的車，不用等、不用反覆確認。",
  },
];

const STEPS = [
  { icon: PhoneCall, title: "撥打電話", desc: "撥打 24h 客服專線" },
  { icon: Mic, title: "AI 對話、聽懂你", desc: "說出地點與需求，忙線自動轉真人" },
  { icon: Car, title: "3 秒配到車", desc: "系統派最近的車來接你" },
];

export function VoiceAiSection() {
  return (
    <Section id="ai-voice" tone="dark" className="bg-ink-900">
      <div className="mx-auto max-w-2xl text-center">
        <BrandBadge variant="yellow" className="mb-4">
          <Sparkles className="size-4" aria-hidden />
          全新・AI 語音叫車
        </BrandBadge>
        <h2 className="text-3xl md:text-5xl font-black leading-tight text-sand-50">
          AI 接電話，
          <span className="text-taxi-yellow">像真人一樣</span>
        </h2>
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-sand-200">
          打電話進來，AI 馬上接、聽得懂你說的話，忙不過來還會自動轉真人。
          <span className="font-bold text-sand-50">不用學 App、不用等接線，秒接不漏接。</span>
        </p>
      </div>

      {/* 四大好處 */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
        {BENEFITS.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
            >
              <div className="size-12 shrink-0 rounded-xl bg-taxi-yellow/15 grid place-items-center">
                <Icon className="size-6 text-taxi-yellow" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-sand-50">
                  {b.title}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-sand-200">
                  {b.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 怎麼運作：三步驟（消毒過的派遣流程） */}
      <div className="mt-14 md:mt-20 max-w-4xl mx-auto">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-taxi-yellow mb-8">
          怎麼運作・三步驟
        </p>
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-6 md:gap-2">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Fragment key={s.title}>
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 md:flex-1 md:max-w-[12rem]">
                  <div className="relative size-16 shrink-0 rounded-2xl bg-taxi-yellow grid place-items-center">
                    <Icon className="size-8 text-taxi-yellow-ink" aria-hidden />
                    <span className="absolute -top-2 -right-2 size-7 rounded-full bg-trust-blue text-sand-50 text-sm font-black grid place-items-center tabular-nums">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-sand-50">{s.title}</h4>
                    <p className="mt-0.5 text-base text-sand-200">{s.desc}</p>
                  </div>
                </div>
                {idx < STEPS.length - 1 && (
                  <ArrowRight
                    className="hidden md:block size-7 shrink-0 text-ink-500 mt-5"
                    aria-hidden
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* 行動呼籲 */}
      <div className="mt-14 md:mt-16 flex flex-col sm:flex-row justify-center gap-3">
        <PhoneCTA size="xl" />
        <LineCTA size="xl" label="加 LINE 叫車" showId />
      </div>
    </Section>
  );
}
