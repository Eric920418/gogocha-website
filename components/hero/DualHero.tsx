import Image from "next/image";
import { Star, Clock, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { site, stats } from "@/lib/site";

export function DualHero() {
  return (
    <section className="relative overflow-hidden bg-sand-50">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/splash-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-sand-50/70 via-sand-50/85 to-sand-50"
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 pt-12 md:pt-20 pb-16">
        <div className="max-w-3xl">
          <BrandBadge variant="yellow" className="mb-5">
            <Sparkles className="size-4" aria-hidden />
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            全新・AI 語音接線・現在可撥打
          </BrandBadge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-ink-900 tracking-tight">
            在花蓮叫車，
            <span className="text-taxi-yellow-dark">AI 接電話・三秒派車</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl">
            撥 {site.phoneDisplay}，AI 馬上接、
            <span className="font-bold text-ink-900">聽得懂國台語</span>
            ，說出地點就好；
            <span className="font-bold text-ink-900">忙線自動轉真人</span>
            ，不用學 App、不漏接。
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <PhoneCTA size="xl" />
            <LineCTA size="xl" label="加 LINE 叫車" showId />
            <Button asChild variant="outline" size="xl">
              <a href="#fare">看車資試算</a>
            </Button>
          </div>

          <a
            href="#ai-voice"
            className="mt-4 inline-flex items-center gap-1.5 text-base font-bold text-trust-blue hover:text-trust-blue-dark hover:gap-2.5 transition-all"
          >
            <span aria-hidden>▶</span> 看 AI 怎麼接電話
          </a>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-700">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-taxi-yellow-dark text-taxi-yellow-dark" aria-hidden />
              <span className="font-bold tabular-nums">{stats.rating}</span>
              <span className="text-ink-500">／{stats.reviewCount} 則評價</span>
            </div>
            <span className="text-sand-200" aria-hidden>
              ・
            </span>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-trust-blue" aria-hidden />
              <span className="font-bold tabular-nums">{stats.totalTrips}</span>
              <span className="text-ink-500">趟次・10 年在地</span>
            </div>
            <span className="text-sand-200" aria-hidden>
              ・
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-trust-blue" aria-hidden />
              <span className="font-bold">花蓮全縣</span>
              <span className="text-ink-500">{stats.coverageTowns} 鄉鎮市</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
