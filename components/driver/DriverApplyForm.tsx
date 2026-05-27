"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function DriverApplyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/driver-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`送出失敗 (HTTP ${res.status})：${text}`);
      }
      toast.success("申請已送出！我們將在 2 個工作天內聯繫您。");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "送出失敗";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card id="apply">
      <CardContent className="p-6 md:p-8 lg:p-10">
        <h3 className="text-2xl md:text-3xl font-black text-ink-900">
          司機加入申請
        </h3>
        <p className="mt-1 text-sm text-ink-500">
          填寫後我們會在 2 個工作天內聯繫您
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">姓名 *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="王大明"
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

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="licenseYears">職業駕照年資</Label>
              <Input
                id="licenseYears"
                name="licenseYears"
                placeholder="例：5 年"
              />
            </div>
            <div>
              <Label htmlFor="currentJob">目前工作狀態</Label>
              <Input
                id="currentJob"
                name="currentJob"
                placeholder="例：兼職、轉職、退休"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="motivation">加入動機（選填）</Label>
            <Textarea
              id="motivation"
              name="motivation"
              placeholder="想多了解的事項，或為什麼想加入 GoGoCha"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-danger/10 border-2 border-danger/30 text-danger p-4 text-sm">
              {error}
            </div>
          )}

          <p className="text-xs text-ink-500 leading-relaxed">
            送出即表示您同意我們透過電話或簡訊聯繫您，並依
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
            variant="trust"
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
              "送出申請"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
