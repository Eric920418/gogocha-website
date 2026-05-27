import { z } from "zod";

/** Server 統一 envelope 格式 */
export function envelope<T extends z.ZodTypeAny>(inner: T) {
  return z.object({
    success: z.boolean(),
    data: inner.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });
}

/** GET /api/config/fare 內層 data */
export const FareConfigSchema = z.object({
  baseFare: z.number(),
  baseDistanceMeters: z.number().optional(),
  perKmFare: z.number().optional(),
  perKmDistance: z.number().optional(),
  slowTrafficUnit: z.number().optional(),
  slowTrafficSeconds: z.number().optional(),
  nightSurchargeRate: z.number().optional(),
  nightStartHour: z.number().optional(),
  nightEndHour: z.number().optional(),
  springFestivalSurchargeRate: z.number().optional(),
  springFestivalDates: z.array(z.string()).optional(),
}).passthrough();
export type FareConfig = z.infer<typeof FareConfigSchema>;

/** POST /api/config/fare/calculate 請求 */
export const FareCalcRequestSchema = z.object({
  distanceMeters: z.number().min(0).max(200_000),
  slowTrafficSeconds: z.number().min(0).max(7200).default(0),
  timestamp: z.string().optional(),
});
export type FareCalcRequest = z.infer<typeof FareCalcRequestSchema>;

/** POST /api/config/fare/calculate 內層 data */
export const FareCalcResponseSchema = z.object({
  totalFare: z.number(),
  baseFare: z.number(),
  distanceFare: z.number().optional().default(0),
  slowTrafficFare: z.number().optional().default(0),
  nightSurcharge: z.number().optional().default(0),
  springFestivalSurcharge: z.number().optional().default(0),
  isNight: z.boolean().optional().default(false),
  isSpringFestival: z.boolean().optional().default(false),
  meterJumps: z.number().optional(),
  appliedSchedule: z.string().optional(),
  distanceKm: z.number().optional(),
}).passthrough();
export type FareCalcResponse = z.infer<typeof FareCalcResponseSchema>;
