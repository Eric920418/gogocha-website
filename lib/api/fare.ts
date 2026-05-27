import { site } from "@/lib/site";
import {
  envelope,
  FareCalcRequestSchema,
  FareCalcResponseSchema,
  FareConfigSchema,
  type FareCalcRequest,
  type FareCalcResponse,
  type FareConfig,
} from "./schemas";

/**
 * 預設 fallback 費率（API 失敗時使用）— 對齊花蓮縣政府公告 2024 版。
 * 起跳 1.25km / NT$100，續跳每 250m / NT$5。
 */
export const FALLBACK_FARE_CONFIG: FareConfig = {
  baseFare: 100,
  baseDistanceMeters: 1250,
  perKmFare: 5,
  perKmDistance: 250,
  slowTrafficUnit: 5,
  slowTrafficSeconds: 60,
  nightSurchargeRate: 0.2,
  nightStartHour: 23,
  nightEndHour: 6,
};

/** 從 server 拉費率配置（用於 fallback 與顯示） */
export async function fetchFareConfig(): Promise<FareConfig> {
  try {
    const res = await fetch(`${site.apiBase}/api/config/fare`, {
      next: { revalidate: 3600 }, // ISR：每小時更新
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = await res.json();
    const parsed = envelope(FareConfigSchema).parse(json);
    if (!parsed.success || !parsed.data) {
      throw new Error(parsed.error ?? "API 回傳格式異常");
    }
    return parsed.data;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[fare] fetchFareConfig failed, using fallback:", err);
    }
    return FALLBACK_FARE_CONFIG;
  }
}

/** 呼叫 server 計算車資 */
export async function calculateFare(
  req: FareCalcRequest,
): Promise<FareCalcResponse> {
  const body = FareCalcRequestSchema.parse({
    ...req,
    timestamp: req.timestamp ?? new Date().toISOString(),
  });

  const res = await fetch(`${site.apiBase}/api/config/fare/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`車資計算失敗 (HTTP ${res.status})：${text || "無回應"}`);
  }

  const json = await res.json();
  const parsed = envelope(FareCalcResponseSchema).parse(json);
  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.error ?? parsed.message ?? "API 回傳格式異常");
  }
  return parsed.data;
}

/**
 * 純前端 fallback 計算（API 連線失敗時備援）。
 * 對齊 Android App FareCalculator.kt 的邏輯。
 */
export function calculateFareLocally(
  distanceMeters: number,
  slowTrafficSeconds: number,
  date: Date,
  config: FareConfig = FALLBACK_FARE_CONFIG,
): FareCalcResponse {
  const baseFare = config.baseFare;
  let distanceFare = 0;
  const baseDist = config.baseDistanceMeters ?? 1250;

  if (distanceMeters > baseDist) {
    const extraDistance = distanceMeters - baseDist;
    const perKmDist = config.perKmDistance ?? 250;
    const perKmFare = config.perKmFare ?? 5;
    distanceFare = Math.ceil(extraDistance / perKmDist) * perKmFare;
  }

  const slowTrafficUnit = config.slowTrafficUnit ?? 5;
  const slowTrafficSecondsUnit = config.slowTrafficSeconds ?? 60;
  const slowTrafficFare =
    Math.floor(slowTrafficSeconds / slowTrafficSecondsUnit) * slowTrafficUnit;

  const hour = date.getHours();
  const nightStart = config.nightStartHour ?? 23;
  const nightEnd = config.nightEndHour ?? 6;
  const isNight = hour >= nightStart || hour < nightEnd;
  const nightRate = config.nightSurchargeRate ?? 0;
  const beforeNight = baseFare + distanceFare + slowTrafficFare;
  const nightSurcharge = isNight ? Math.round(beforeNight * nightRate) : 0;

  const totalFare = beforeNight + nightSurcharge;

  return {
    totalFare,
    baseFare,
    distanceFare,
    slowTrafficFare,
    nightSurcharge,
    springFestivalSurcharge: 0,
    isNight,
    isSpringFestival: false,
  };
}
