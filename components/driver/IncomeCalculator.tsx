"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const AVG_FARE = 190; // NT$ 平均車資
const GOGOCHA_FEE = 0.08;
const UBER_FEE = 0.25;
const WORK_DAYS = 25;

export function IncomeCalculator() {
  const [hours, setHours] = useState(8);
  const [tripsPerHour, setTripsPerHour] = useState(2.5);

  const calc = useMemo(() => {
    const dailyGross = hours * tripsPerHour * AVG_FARE;
    const dailyGogocha = dailyGross * (1 - GOGOCHA_FEE);
    const dailyUber = dailyGross * (1 - UBER_FEE);
    const monthlyGogocha = dailyGogocha * WORK_DAYS;
    const monthlyUber = dailyUber * WORK_DAYS;
    const monthlyDiff = monthlyGogocha - monthlyUber;
    return {
      dailyGogocha: Math.round(dailyGogocha),
      monthlyGogocha: Math.round(monthlyGogocha),
      monthlyDiff: Math.round(monthlyDiff),
    };
  }, [hours, tripsPerHour]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-8 lg:p-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp
                className="size-5 text-trust-blue"
                aria-hidden
              />
              <span className="text-sm font-bold text-trust-blue uppercase tracking-widest">
                收入試算
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-ink-900">
              你能賺多少？
            </h3>
            <p className="mt-1 text-sm text-ink-500">
              拖動數字看看你的月收入潛力
            </p>

            <div className="mt-8 space-y-7">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <Label htmlFor="hours">每日上線時數</Label>
                  <span className="text-2xl font-black tabular-nums text-ink-900">
                    {hours}{" "}
                    <span className="text-sm font-medium text-ink-500">
                      小時
                    </span>
                  </span>
                </div>
                <Slider
                  id="hours"
                  min={4}
                  max={14}
                  step={1}
                  value={[hours]}
                  onValueChange={([v]) => setHours(v)}
                  aria-label="每日上線時數"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <Label htmlFor="trips">每小時平均接單</Label>
                  <span className="text-2xl font-black tabular-nums text-ink-900">
                    {tripsPerHour.toFixed(1)}{" "}
                    <span className="text-sm font-medium text-ink-500">
                      趟
                    </span>
                  </span>
                </div>
                <Slider
                  id="trips"
                  min={1}
                  max={5}
                  step={0.5}
                  value={[tripsPerHour]}
                  onValueChange={([v]) => setTripsPerHour(v)}
                  aria-label="每小時平均接單數"
                />
              </div>

              <div className="text-xs text-ink-500 leading-relaxed">
                假設條件：平均車資 NT${AVG_FARE}/趟、每月工作 {WORK_DAYS} 天、
                GoGoCha 平台費 8%
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-gradient-to-br from-trust-blue to-trust-blue-dark p-6 md:p-8 text-white">
              <p className="text-sm font-bold text-white/70 uppercase tracking-widest mb-2">
                每月預估到手
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-white/70">NT$</span>
                <span className="text-5xl md:text-7xl font-black tabular-nums leading-none">
                  {calc.monthlyGogocha.toLocaleString()}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/80">
                每日約 {formatCurrency(calc.dailyGogocha)}・扣除 8% 平台費後
              </p>
            </div>

            <div className="mt-3 rounded-2xl bg-success/10 border-2 border-success/30 p-5">
              <p className="text-sm text-ink-700">
                同樣工時，若是抽成 25% 的平台：
              </p>
              <p className="mt-1 text-xl font-black text-ink-900">
                你<span className="text-success">多賺</span>{" "}
                <span className="tabular-nums">
                  {formatCurrency(calc.monthlyDiff)}
                </span>{" "}
                / 月
              </p>
            </div>

            <Button asChild variant="trust" size="lg" className="mt-5 w-full">
              <Link href="#apply">
                立即申請加入司機
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
