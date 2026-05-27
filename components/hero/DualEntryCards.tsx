import Link from "next/link";
import { ArrowRight, Car, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ENTRIES = [
  {
    href: "/driver",
    icon: Car,
    title: "我是司機",
    desc: "加入花蓮在地車隊・AI 智慧派單・平台費業界最低",
    tone: "yellow",
  },
  {
    href: "/contact?type=business",
    icon: Building2,
    title: "我是業者",
    desc: "旅行社・飯店・企業合約・包車一鍵調度",
    tone: "blue",
  },
] as const;

export function DualEntryCards() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 -mt-8 md:-mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ENTRIES.map((e) => {
          const Icon = e.icon;
          return (
            <Link
              key={e.href}
              href={e.href}
              className="group"
              aria-label={e.title}
            >
              <Card
                className={cn(
                  "p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  e.tone === "yellow" &&
                    "bg-gradient-to-br from-taxi-yellow to-taxi-yellow-dark border-taxi-yellow-dark",
                  e.tone === "blue" &&
                    "bg-gradient-to-br from-trust-blue to-trust-blue-dark border-trust-blue-dark text-white",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "size-12 rounded-xl grid place-items-center shrink-0",
                      e.tone === "yellow" && "bg-taxi-yellow-ink/10",
                      e.tone === "blue" && "bg-white/15",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-7",
                        e.tone === "yellow" && "text-taxi-yellow-ink",
                        e.tone === "blue" && "text-white",
                      )}
                      aria-hidden
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={cn(
                          "text-xl md:text-2xl font-black",
                          e.tone === "yellow" && "text-taxi-yellow-ink",
                          e.tone === "blue" && "text-white",
                        )}
                      >
                        {e.title}
                      </h3>
                      <ArrowRight
                        className={cn(
                          "size-5 transition-transform group-hover:translate-x-1",
                          e.tone === "yellow" && "text-taxi-yellow-ink",
                          e.tone === "blue" && "text-white",
                        )}
                        aria-hidden
                      />
                    </div>
                    <p
                      className={cn(
                        "mt-1.5 text-sm md:text-base leading-relaxed",
                        e.tone === "yellow" && "text-taxi-yellow-ink/85",
                        e.tone === "blue" && "text-white/90",
                      )}
                    >
                      {e.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
