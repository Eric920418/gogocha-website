import { Section } from "@/components/layout/Section";
import { FareCalculator } from "@/components/fare-calculator/FareCalculator";

export function FareCalculatorSection() {
  return (
    <Section id="fare" className="bg-sand-100">
      <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
        <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
          透明車資
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
          先試算，再上車
        </h2>
        <p className="mt-4 text-base md:text-lg text-ink-700">
          告訴你大概多少錢，不喊價、不加成。
          <br className="md:hidden" />
          所有費率對齊花蓮縣政府公告。
        </p>
      </div>

      <FareCalculator />
    </Section>
  );
}
