import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";

export function FareCalculatorSection() {
  return (
    <Section id="fare" className="bg-sand-100">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-black">
          出發前，先確認接送與收費
        </h2>
        <p className="text-lg leading-relaxed">
          提供上車地點、目的地、日期時間、人數與行李，讓客服確認車輛與安排。一般接送實際依計費表收費；付款方式及特殊需求請預約時確認。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PhoneCTA />
          <LineCTA label="加 LINE 詢問行程" />
        </div>
        <Link
          href="/pricing"
          className="inline-block font-bold text-trust-blue-dark underline"
        >
          查看官方費率與收費說明
        </Link>
      </div>
    </Section>
  );
}
