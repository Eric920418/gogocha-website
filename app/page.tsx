import { DualHero } from "@/components/hero/DualHero";
import { DualEntryCards } from "@/components/hero/DualEntryCards";
import { Differentiators } from "@/components/sections/Differentiators";
import { OrderingChannels } from "@/components/sections/OrderingChannels";
import { FareCalculatorSection } from "@/components/sections/FareCalculatorSection";
import { CoverageStrip } from "@/components/sections/CoverageStrip";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { B2BSection } from "@/components/sections/B2BSection";
import { DriverCallout } from "@/components/sections/DriverCallout";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <DualHero />
      <DualEntryCards />
      <Differentiators />
      <OrderingChannels />
      <FareCalculatorSection />
      <CoverageStrip />
      <TestimonialsSection />
      <B2BSection />
      <DriverCallout />
      <FinalCTA />
    </>
  );
}
