import { Section } from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, ScrollText, Accessibility } from "lucide-react";

const POINTS = [
  {
    icon: Zap,
    title: "三秒撥通・全年無休",
    desc: "24 小時在地調度，不是平台轉介，半夜也有車。颱風天、過年、清晨班機接送都不打烊。",
  },
  {
    icon: ScrollText,
    title: "跳表車資・政府公告",
    desc: "費率對齊花蓮縣政府公告，無平台加成、無夜間漫天喊價。所有費率公開可試算。",
  },
  {
    icon: Accessibility,
    title: "長輩友善・語音叫車",
    desc: "大字按鈕、語音指令、無障礙設計。爸媽阿公阿嬤自己叫車也安心，不用再麻煩孩子。",
  },
];

export function Differentiators() {
  return (
    <Section className="bg-sand-50">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
          為什麼選 GoGoCha
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
          別家做不到的三件事
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {POINTS.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.title} className="h-full">
              <CardHeader>
                <div className="size-14 rounded-2xl bg-taxi-yellow/40 grid place-items-center mb-2">
                  <Icon className="size-7 text-taxi-yellow-ink" aria-hidden />
                </div>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {p.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
