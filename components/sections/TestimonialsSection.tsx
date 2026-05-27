import { Section } from "@/components/layout/Section";
import { Testimonial } from "@/components/shared/Testimonial";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  return (
    <Section className="bg-sand-50">
      <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
        <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
          真實乘客評價
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
          花蓮人說的算
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <Testimonial key={t.name} {...t} />
        ))}
      </div>
    </Section>
  );
}
