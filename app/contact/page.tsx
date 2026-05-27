import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { ContactForm } from "./ContactForm";
import { Mail, Phone as PhoneIcon, Clock } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "聯絡我們｜花蓮計程車 GoGoCha",
  description:
    "聯絡 GoGoCha 花蓮計程車：電話叫車、B2B 合作詢價、客戶建議。客服時間 24 小時，B2B 業務時間 09:00-21:00。",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: PhoneIcon,
    title: "立即叫車",
    desc: "24h 不打烊・三秒撥通",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
  },
  {
    icon: Mail,
    title: "B2B 合作",
    desc: "旅行社・飯店・企業",
    value: "business@gogocha.tw",
    href: "mailto:business@gogocha.tw",
  },
  {
    icon: Clock,
    title: "客服時間",
    desc: "電話叫車服務時間",
    value: "24 小時全年無休",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl">
          <BrandBadge variant="blue" className="mb-4">
            聯絡我們
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-[1.05] tracking-tight">
            有任何問題，
            <br />
            <span className="text-trust-blue-dark">我們都在花蓮</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-ink-700 leading-relaxed">
            無論是叫車、合作、建議，撥通電話或填寫表單，花蓮在地團隊親自回覆。
          </p>
        </div>
      </Section>

      <Section className="bg-sand-100 pt-8 md:pt-12">
        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const Wrap = c.href ? "a" : "div";
            return (
              <Wrap
                key={c.title}
                {...(c.href ? { href: c.href } : {})}
                className="block bg-white rounded-2xl border border-sand-200 p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="size-11 rounded-xl bg-trust-blue/10 grid place-items-center shrink-0">
                    <Icon
                      className="size-5 text-trust-blue-dark"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <p className="text-sm text-ink-500">{c.title}</p>
                    <p className="font-black text-ink-900 text-lg mt-0.5">
                      {c.value}
                    </p>
                    <p className="text-xs text-ink-500 mt-1">{c.desc}</p>
                  </div>
                </div>
              </Wrap>
            );
          })}
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-sand-200 bg-white p-10 text-center text-ink-500">
              載入表單中…
            </div>
          }
        >
          <ContactForm />
        </Suspense>

        <div className="mt-8 text-center">
          <p className="text-sm text-ink-500 mb-3">急著叫車？直接撥打：</p>
          <PhoneCTA size="lg" />
        </div>
      </Section>
    </>
  );
}
