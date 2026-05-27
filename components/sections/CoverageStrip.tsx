import { Section } from "@/components/layout/Section";
import { MapPin } from "lucide-react";

const TOWNS = [
  "花蓮市",
  "吉安鄉",
  "新城鄉",
  "壽豐鄉",
  "鳳林鎮",
  "光復鄉",
  "瑞穗鄉",
  "玉里鎮",
  "秀林鄉",
  "萬榮鄉",
  "卓溪鄉",
  "豐濱鄉",
  "富里鄉",
];

const LANDMARKS = [
  "花蓮機場",
  "花蓮火車站",
  "太魯閣國家公園",
  "七星潭",
  "清水斷崖",
  "慶修院",
  "東大門夜市",
  "瑞穗牧場",
  "光復糖廠",
  "六十石山",
];

export function CoverageStrip() {
  return (
    <Section className="bg-ink-900 text-sand-50">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <p className="text-sm font-bold text-taxi-yellow uppercase tracking-widest mb-3">
            服務區域
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            花蓮全縣 13 鄉鎮市，
            <br />
            一鍵呼叫到家門口
          </h2>
          <p className="text-base md:text-lg text-sand-200 leading-relaxed">
            從北端的秀林鄉到南端的富里鄉，從濱海到中央山脈，GoGoCha
            的在地司機熟悉每一條花蓮道路。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TOWNS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium"
              >
                <MapPin className="size-3.5 text-taxi-yellow" aria-hidden />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 md:p-8">
          <h3 className="text-lg font-black mb-4 text-taxi-yellow">
            熱門接送地點
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {LANDMARKS.map((l) => (
              <li
                key={l}
                className="flex items-center gap-2 text-base text-sand-200"
              >
                <span className="size-1.5 rounded-full bg-taxi-yellow shrink-0" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
