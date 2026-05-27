import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Brain, Wallet, Wrench, ArrowRight } from "lucide-react";

const POINTS = [
  {
    icon: Brain,
    title: "AI 自動接單",
    desc: "你不用一直滑手機，系統幫你篩選最佳訂單",
  },
  {
    icon: Wallet,
    title: "平台費業界最低",
    desc: "8% vs 平台 25%，跑同樣的趟，你多賺三倍",
  },
  {
    icon: Wrench,
    title: "工具齊全",
    desc: "自動跳表、低速計時、愛心卡、夜間自動切換",
  },
];

export function DriverCallout() {
  return (
    <Section className="bg-gradient-to-br from-taxi-yellow to-taxi-yellow-dark">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="text-sm font-bold text-taxi-yellow-ink/70 uppercase tracking-widest mb-3">
            司機招募中
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-taxi-yellow-ink leading-tight">
            在花蓮開車，
            <br />
            賺得更踏實
          </h2>
          <p className="mt-5 text-lg text-taxi-yellow-ink/85 leading-relaxed">
            GoGoCha 是花蓮在地經營的車隊，不是抽成 25% 的平台。
            <span className="font-bold">用對工具，你的時間就是你的收入。</span>
          </p>
          <Button asChild variant="trust" size="xl" className="mt-8">
            <Link href="/driver">
              查看司機收入試算
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="grid gap-3">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex items-start gap-4 bg-white/95 backdrop-blur rounded-2xl p-5 md:p-6 shadow-sm"
              >
                <div className="size-12 rounded-xl bg-trust-blue/10 grid place-items-center shrink-0">
                  <Icon
                    className="size-6 text-trust-blue-dark"
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="text-lg font-black text-ink-900">
                    {p.title}
                  </h3>
                  <p className="text-sm md:text-base text-ink-700 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
