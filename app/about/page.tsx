import { pageMetadata } from "@/lib/seo/pages";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { PhoneCTA } from "@/components/shared/PhoneCTA";
import { LineCTA } from "@/components/shared/LineCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { serviceArea } from "@/lib/site";
import { Wallet, HandHeart, MapPin, ShieldCheck } from "lucide-react";

export const metadata = pageMetadata("/about");

// 已知的品牌差異化事實，可直接寫；沿用 driver 頁 REASONS 卡片模式
const PRINCIPLES = [
  {
    icon: Wallet,
    title: "跳表不加價",
    desc: "車資一律依花蓮縣政府公告跳表，不看你是不是觀光客、不挑半夜漫天喊價。該多少就多少，出發前可先查閱官方費率說明。",
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


export default function AboutPage() {

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
            GoGoCha 不是從外地來開分店的叫車平台。我們就是在這片土地上跑車的花蓮人——提供市區、機場與車站接送的聯絡管道，讓乘客在出發前確認安排。
          </p>
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

      <Section className="bg-ink-900 text-sand-50">
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl font-black">花蓮接送服務範圍</h2>
          <p className="text-lg leading-relaxed">可洽詢{serviceArea.towns.join("、")}的接送需求。偏遠、山區與跨鄉鎮行程需提前確認，派車依當時車況與道路條件安排。</p>
        </div>
      </Section>

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
