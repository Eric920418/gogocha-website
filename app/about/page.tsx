import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { stats, serviceArea } from "@/lib/site";
import { testimonials } from "@/content/testimonials";
import { Wallet, HandHeart, MapPin, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "關於我們｜花蓮在地計程車隊的故事",
  description:
    "GoGoCha 是花蓮人經營的在地計程車隊。為什麼我們堅持跳表不加價、把 App 字做大給長輩用、用聽得懂台語的在地客服。這是我們的故事，也是我們對花蓮的承諾。",
  alternates: { canonical: "/about" },
};

// 已知的品牌差異化事實，可直接寫；沿用 driver 頁 REASONS 卡片模式
const PRINCIPLES = [
  {
    icon: Wallet,
    title: "跳表不加價",
    desc: "車資一律依花蓮縣政府公告跳表，不看你是不是觀光客、不挑半夜漫天喊價。該多少就多少，先試算、再上車。",
  },
  {
    icon: HandHeart,
    title: "長輩友善",
    desc: "打電話進來，AI 像真人接、聽得懂台語，說出地點就好，忙線自動轉真人；App 也做了大字、大按鈕。讓阿公阿嬤自己也能叫車，不用每次都麻煩孩子。",
  },
  {
    icon: MapPin,
    title: "在地調度",
    desc: "花蓮人、花蓮辦公室、在地客服。有問題打得到電話、找得到人，不是轉接到外地的罐頭語音。",
  },
  {
    icon: ShieldCheck,
    title: "不剝削司機",
    desc: "平台費只跟司機收 8%，不是抽四分之一。司機賺得踏實，才願意把每一趟都做好——最後受惠的是乘客。",
  },
];

const STAT_ITEMS = [
  { value: stats.yearsOperating, label: "年在地經營" },
  { value: stats.driverCount, label: "位在地司機" },
  { value: stats.totalTrips, label: "趟安全接送" },
  { value: String(serviceArea.towns.length), label: "鄉鎮市全覆蓋" },
];

export default function AboutPage() {
  // 引用既有合作飯店評價，作為在地權威佐證（Authoritativeness）
  const partnerQuote = testimonials.find((t) => t.role === "合作飯店");

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "關於我們", path: "/about" },
        ])}
      />

      {/* Hero */}
      <Section className="bg-sand-50 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-3xl">
          <BrandBadge variant="yellow" className="mb-4">
            關於 GoGoCha
          </BrandBadge>
          <h1 className="text-4xl md:text-6xl font-black text-ink-900 leading-[1.1]">
            我們是花蓮人，
            <br />
            載花蓮人，
            <br />
            <span className="text-trust-blue-dark">也載來花蓮的你。</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-700 leading-relaxed">
            GoGoCha 不是從外地來開分店的叫車平台。我們就是在這片土地上跑車的花蓮人——熟悉每一條巷子、每一段山路，也記得每一位常坐我們車的乘客。
          </p>
        </div>
      </Section>

      {/* 起源故事 */}
      <Section className="bg-sand-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
            我們的故事
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight mb-6">
            為什麼會有 GoGoCha
          </h2>
          {/* TODO: 換成創辦人／負責人的真實故事——成立緣由、在花蓮跑車幾年、看到什麼具體問題 */}
          <div className="space-y-4 text-lg text-ink-700 leading-relaxed">
            <p>
              會想做這個車隊，是因為太常看到一些畫面——阿嬤站在路邊招不到車、外地朋友被開了高得離譜的價、晚上想回家卻怎麼等都等不到。
            </p>
            <p>
              我們想做的其實很簡單：讓花蓮人叫車這件事，回到它該有的樣子。按表收費、有人接電話、車真的會來。
            </p>
            <p>
              於是我們把在地司機組織起來，做了一套對長輩友善的 App，設了 24 小時、聽得懂台語的客服。一路走到今天，載過花蓮人看診、上班、回家，也載過來花蓮的旅人，看他們第一次看到太魯閣和七星潭時的表情。
            </p>
          </div>
        </div>
      </Section>

      {/* 我們的堅持 */}
      <Section className="bg-sand-50">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-3">
            我們的堅持
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-ink-900 leading-tight">
            把簡單的事，認真做好
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="size-14 rounded-2xl bg-taxi-yellow/40 grid place-items-center shrink-0">
                      <Icon
                        className="size-7 text-taxi-yellow-ink"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-ink-900">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-base text-ink-700 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 在地實力 + 團隊 */}
      <Section className="bg-ink-900 text-sand-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {STAT_ITEMS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl md:text-5xl font-black text-taxi-yellow tabular-nums">
                  {s.value}
                </p>
                <p className="mt-1 text-sm md:text-base text-sand-200">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          {/* TODO: 補司機團隊照片、真實人數與在地年資，讓「在地」更有臉孔 */}
          <p className="mt-10 text-center text-base md:text-lg text-sand-200 leading-relaxed max-w-2xl mx-auto">
            從北端的秀林，到南端的富里，{serviceArea.towns.length} 個鄉鎮市都有我們的在地司機。他們不只是會開車，更熟悉哪條路這個時間會塞、哪個景點回程難叫車、哪位老人家需要多等一下、多扶一把。
          </p>
        </div>
      </Section>

      {/* 合作佐證 */}
      {partnerQuote && (
        <Section className="bg-sand-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold text-trust-blue uppercase tracking-widest mb-6">
              在地夥伴怎麼說
            </p>
            <blockquote className="text-xl md:text-2xl font-bold text-ink-900 leading-relaxed">
              「{partnerQuote.content}」
            </blockquote>
            <p className="mt-5 text-base text-ink-500">
              — {partnerQuote.name}
            </p>
          </div>
        </Section>
      )}

      {/* 承諾 + CTA */}
      <Section className="bg-sand-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ink-900 mb-4">
            下次在花蓮要用車，想到我們
          </h2>
          <p className="text-lg text-ink-700 leading-relaxed mb-8">
            不管是趕飛機、跑醫院、回家，還是帶遠道的朋友看花蓮的山與海——一通電話，或加個 LINE，在地的車就到你身邊。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneCTA size="xl" />
            <LineCTA size="xl" label="加 LINE 叫車" showId />
          </div>
        </div>
      </Section>
    </>
  );
}
