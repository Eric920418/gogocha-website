import { Section } from "@/components/layout/Section";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { AppDownloadCTA } from "@/components/shared/AppDownloadCTA";

export function FinalCTA() {
  return (
    <Section className="bg-sand-100">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-ink-900 leading-tight">
          現在就叫一台車
        </h2>
        <p className="mt-5 text-lg md:text-xl text-ink-700">
          無論是上班、看診、回家、接機，撥一通電話或下載 App，
          <br className="hidden md:block" />
          花蓮在地司機三秒撥通。
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <PhoneCTA size="xl" />
          <div className="flex items-center gap-3 text-sm text-ink-500">
            <span className="h-px w-12 bg-sand-200" aria-hidden />
            或下載 App
            <span className="h-px w-12 bg-sand-200" aria-hidden />
          </div>
          <AppDownloadCTA />
        </div>
      </div>
    </Section>
  );
}
