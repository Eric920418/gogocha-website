import { ChevronDown } from "lucide-react";

type FaqEntry = { question: string; answer: string };

/**
 * 純伺服器渲染的 FAQ 折疊列表。用原生 <details>/<summary>：
 * 零 JS、內容即刻可被爬蟲擷取（GEO 友善）、原生鍵盤與報讀器支援（長輩友善）。
 * /faq 依分類多次呼叫，/routes 單次呼叫，共用同一視覺。
 */
export function FaqList({ items }: { items: FaqEntry[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details
          key={f.question}
          className="group rounded-2xl border border-sand-200 bg-white overflow-hidden"
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 md:px-6 py-4 min-h-[56px] text-lg font-black text-ink-900 hover:bg-sand-50 [&::-webkit-details-marker]:hidden">
            <span>{f.question}</span>
            <ChevronDown
              className="size-5 shrink-0 text-ink-500 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="px-5 md:px-6 pb-5 text-base text-ink-700 leading-relaxed">
            {f.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
