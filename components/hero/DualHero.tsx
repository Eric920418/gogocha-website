import Image from "next/image";
import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { stats } from "@/lib/site";

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
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            24h 在地車隊・現在可叫車
          </BrandBadge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-ink-900 tracking-tight">
            在花蓮，叫車
            <span className="text-taxi-yellow-dark">三秒撥通</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl">
            在地 24 小時計程車隊・跳表車資依花蓮縣政府公告・
            <span className="font-bold text-ink-900">大字按鈕、語音叫車</span>
            ，長輩也會用。
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <PhoneCTA size="xl" hideNumberOnSmall={false} />
            <Button asChild variant="outline" size="xl">
              <a href="#fare">看車資試算</a>
            </Button>
          </div>

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
