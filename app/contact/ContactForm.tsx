"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const TYPES = [
  { value: "general", label: "一般詢問" },
  { value: "business", label: "B2B 合作" },
  { value: "complaint", label: "客訴 / 建議" },
] as const;

const SEGMENTS = [
  { value: "travel", label: "旅行社" },
  { value: "hotel", label: "飯店" },
  { value: "corporate", label: "企業" },
  { value: "other", label: "其他" },
] as const;

export function ContactForm() {
  const sp = useSearchParams();
  const initialType = sp.get("type") === "business" ? "business" : "general";
  const initialSegment = sp.get("segment") ?? "";

  const [type, setType] = useState<string>(initialType);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = sp.get("type");
    if (t === "business" || t === "general" || t === "complaint") setType(t);
  }, [sp]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`送出失敗 (HTTP ${res.status})：${text}`);
      }
      toast.success("訊息已送出！我們會盡快回覆您。");
      (e.target as HTMLFormElement).reset();
      setType("general");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "送出失敗";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6 md:p-8 lg:p-10">
        <form onSubmit={onSubmit} className="grid gap-5">
          {/* Type selector */}
          <div>
            <Label htmlFor="type">詢問類型</Label>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="詢問類型"
            >
              {TYPES.map((t) => (
                <label
                  key={t.value}
                  className={cn(
                    "inline-flex items-center px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all font-bold text-sm",
                    type === t.value
                      ? "border-trust-blue bg-trust-blue/10 text-trust-blue-dark"
                      : "border-sand-200 bg-white text-ink-700 hover:border-sand-200/80",
                  )}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t.value}
                    checked={type === t.value}
                    onChange={(e) => setType(e.target.value)}
                    className="sr-only"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          {type === "business" && (
            <div>
              <Label htmlFor="segment">合作類型</Label>
              <select
                id="segment"
                name="segment"
                defaultValue={initialSegment || "travel"}
                className="flex h-12 w-full rounded-xl border-2 border-sand-200 bg-white px-4 py-2 text-base text-ink-900 focus:outline-none focus:border-trust-blue"
              >
                {SEGMENTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">姓名 / 公司 *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder={type === "business" ? "公司名稱" : "您的姓名"}
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="phone">聯絡電話 *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="0912-345-678"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email（選填）</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div>
            <Label htmlFor="message">訊息內容 *</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder={
                type === "business"
                  ? "請描述您的合作需求、預估趟次、特殊要求等"
                  : "請告訴我們您的需求或建議"
              }
            />
          </div>

          {error && (
            <div className="rounded-xl bg-danger/10 border-2 border-danger/30 text-danger p-4 text-sm">
              {error}
            </div>
          )}

          <p className="text-xs text-ink-500 leading-relaxed">
            送出即表示您同意我們依
            <a
              href="/privacy"
              className="text-trust-blue underline underline-offset-2"
            >
              隱私政策
            </a>
            處理您提供的資訊。
          </p>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                送出中…
              </>
            ) : (
              "送出訊息"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
