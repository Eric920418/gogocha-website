"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import {
  calculateFare,
  calculateFareLocally,
  FALLBACK_FARE_CONFIG,
} from "@/lib/api/fare";
import type { FareCalcResponse } from "@/lib/api/schemas";
import { formatCurrency } from "@/lib/utils";

interface FareCalculatorProps {
  /** 完整版（用於 /pricing） vs 精簡版（用於首頁嵌入） */
  variant?: "full" | "compact";
}

export function FareCalculator({ variant = "full" }: FareCalculatorProps) {
  const [distanceKm, setDistanceKm] = useState(5);
  const [slowSec, setSlowSec] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<FareCalcResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 初始化 + 每次輸入變化都重算（debounce 400ms）
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const r = await calculateFare({
          distanceMeters: Math.round(distanceKm * 1000),
          slowTrafficSeconds: slowSec,
        });
        setResult(r);
        setUsedFallback(false);
      } catch (err) {
        // 完整顯示錯誤（user CLAUDE.md 要求）但同時用本地 fallback 計算
        const msg = err instanceof Error ? err.message : "未知錯誤";
        setErrorMsg(`API 連線失敗：${msg}（已切換本地估算）`);
        const local = calculateFareLocally(
          Math.round(distanceKm * 1000),
          slowSec,
          new Date(),
        );
        setResult(local);
        setUsedFallback(true);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [distanceKm, slowSec]);

  const isCompact = variant === "compact";

  const breakdown = useMemo(() => {
    if (!result) return [];
    const items: { label: string; value: number; muted?: boolean }[] = [
      { label: "起跳", value: result.baseFare },
    ];
    if (result.distanceFare && result.distanceFare > 0)
      items.push({ label: "跳表里程", value: result.distanceFare });
    if (result.slowTrafficFare && result.slowTrafficFare > 0)
      items.push({ label: "塞車計時", value: result.slowTrafficFare });
    if (result.nightSurcharge && result.nightSurcharge > 0)
      items.push({ label: "夜間加成", value: result.nightSurcharge });
    if (result.springFestivalSurcharge && result.springFestivalSurcharge > 0)
      items.push({
        label: "春節加成",
        value: result.springFestivalSurcharge,
      });
    return items;
  }, [result]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-8 lg:p-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: inputs */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-ink-900">
              花蓮車資試算
            </h3>
            <p className="mt-1 text-sm text-ink-500">
              依花蓮縣政府公告費率即時計算
            </p>

            <div className="mt-8 space-y-7">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <Label htmlFor="distance">距離</Label>
                  <span className="text-2xl font-black tabular-nums text-ink-900">
                    {distanceKm.toFixed(1)}{" "}
                    <span className="text-sm font-medium text-ink-500">
                      公里
                    </span>
                  </span>
                </div>
                <Slider
                  id="distance"
                  min={0.5}
                  max={50}
                  step={0.5}
                  value={[distanceKm]}
                  onValueChange={([v]) => setDistanceKm(v)}
                  aria-label="距離（公里）"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-500 tabular-nums">
                  <span>0.5</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced((v) => !v)}
                  className="text-sm font-bold text-trust-blue hover:text-trust-blue-dark"
                  aria-expanded={showAdvanced}
                >
                  {showAdvanced ? "▲ 收起進階" : "▼ 進階（塞車時間預估）"}
                </button>
                {showAdvanced && (
                  <div className="mt-4">
                    <div className="flex items-baseline justify-between mb-1">
                      <Label htmlFor="slow">塞車秒數</Label>
                      <span className="text-lg font-bold tabular-nums text-ink-900">
                        {Math.floor(slowSec / 60)} 分 {slowSec % 60} 秒
                      </span>
                    </div>
                    <Slider
                      id="slow"
                      min={0}
                      max={1800}
                      step={60}
                      value={[slowSec]}
                      onValueChange={([v]) => setSlowSec(v)}
                      aria-label="塞車秒數"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: result */}
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-taxi-yellow to-taxi-yellow-dark p-6 md:p-8 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-taxi-yellow-ink/70 uppercase tracking-widest">
                  預估車資
                </span>
                <div className="flex items-center gap-2">
                  {result?.isNight && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-900/15 px-2 py-0.5 text-xs font-bold text-ink-900">
                      <Moon className="size-3.5" aria-hidden />
                      夜間
                    </span>
                  )}
                  {loading && (
                    <Loader2
                      className="size-4 text-taxi-yellow-ink/60 animate-spin"
                      aria-label="計算中"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-taxi-yellow-ink/70">
                  NT$
                </span>
                <span className="text-6xl md:text-7xl font-black tabular-nums text-taxi-yellow-ink leading-none">
                  {result?.totalFare ?? "—"}
                </span>
              </div>

              {breakdown.length > 0 && !isCompact && (
                <ul className="mt-5 space-y-1.5 border-t border-taxi-yellow-ink/15 pt-4">
                  {breakdown.map((b) => (
                    <li
                      key={b.label}
                      className="flex justify-between text-sm text-taxi-yellow-ink/85"
                    >
                      <span>{b.label}</span>
                      <span className="tabular-nums font-bold">
                        {formatCurrency(b.value)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {errorMsg && (
              <div className="mt-3 flex items-start gap-2 text-xs text-danger bg-danger/5 border border-danger/20 rounded-xl p-3">
                <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden />
                <span>{errorMsg}</span>
              </div>
            )}

            <p className="mt-4 text-xs text-ink-500 leading-relaxed">
              {usedFallback ? "本地估算・" : "即時計算・"}
              依花蓮縣政府公告費率，
              <span className="font-bold text-ink-700">無平台加成</span>
              。實際車資以司機跳表機為準。
              {result?.isNight && "（夜間 23:00-06:00 加成 20%）"}
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <PhoneCTA className="flex-1" />
              <Button
                asChild
                variant="outline"
                className="flex-1"
                size="default"
              >
                <a href="/pricing">完整費率表</a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
