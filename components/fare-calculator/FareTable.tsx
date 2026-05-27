import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const ROWS = [
  { km: 1.25, fare: 100, note: "起跳" },
  { km: 2, fare: 115 },
  { km: 3, fare: 135 },
  { km: 5, fare: 190 },
  { km: 10, fare: 285 },
  { km: 15, fare: 380 },
  { km: 20, fare: 475 },
  { km: 30, fare: 665 },
];

export function FareTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>常用距離車資對照</CardTitle>
        <p className="text-sm text-ink-500">
          以下為日間費率（06:00-23:00）參考。實際以司機跳表為準。
        </p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b-2 border-sand-200 text-sm font-bold text-ink-500 uppercase tracking-wide">
                <th className="text-left px-6 md:px-8 py-3">距離</th>
                <th className="text-right px-6 md:px-8 py-3">車資</th>
                <th className="text-left px-6 md:px-8 py-3 hidden sm:table-cell">
                  備註
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={r.km}
                  className="border-b border-sand-100 hover:bg-sand-50"
                >
                  <td className="px-6 md:px-8 py-3 font-bold tabular-nums">
                    {r.km} 公里
                  </td>
                  <td className="px-6 md:px-8 py-3 text-right font-black tabular-nums text-ink-900">
                    {formatCurrency(r.fare)}
                  </td>
                  <td className="px-6 md:px-8 py-3 text-sm text-ink-500 hidden sm:table-cell">
                    {r.note ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function FareRulesList() {
  const RULES = [
    {
      title: "起跳",
      desc: "前 1.25 公里 NT$100",
    },
    {
      title: "續跳",
      desc: "每 250 公尺加 NT$5",
    },
    {
      title: "延滯計時",
      desc: "時速 5km/h 以下，每 60 秒加 NT$5",
    },
    {
      title: "夜間加成",
      desc: "23:00-06:00，全程 +20%",
    },
    {
      title: "春節加成",
      desc: "農曆除夕至初五，全程 +50 元",
    },
    {
      title: "預約服務費",
      desc: "預約 30 分鐘以上加 NT$50",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>費率規則</CardTitle>
        <p className="text-sm text-ink-500">
          依花蓮縣政府公告，所有 GoGoCha 司機統一遵循。
        </p>
      </CardHeader>
      <CardContent>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          {RULES.map((r) => (
            <div key={r.title} className="border-l-4 border-taxi-yellow-dark pl-4">
              <dt className="font-black text-ink-900">{r.title}</dt>
              <dd className="text-sm text-ink-700 mt-0.5">{r.desc}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
