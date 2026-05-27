import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

const Body = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(8).max(40),
  licenseYears: z.string().trim().max(80).optional(),
  currentJob: z.string().trim().max(120).optional(),
  motivation: z.string().trim().max(2000).optional(),
});

export async function POST(req: Request) {
  let payload: z.infer<typeof Body>;
  try {
    const json = await req.json();
    payload = Body.parse(json);
  } catch (err) {
    return new NextResponse(
      `表單欄位驗證失敗：${err instanceof Error ? err.message : "未知錯誤"}`,
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[driver-apply] RESEND_API_KEY not set — payload:",
        payload,
      );
      return NextResponse.json({ ok: true, devMode: true });
    }
    return new NextResponse(
      "申請服務暫時無法使用，請改撥客服電話 " + site.phoneDisplay,
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to =
    process.env.DRIVER_APPLY_TO_EMAIL ??
    process.env.CONTACT_TO_EMAIL ??
    "hr@gogocha.tw";

  const subject = `[${site.shortName} 司機申請] ${payload.name}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;max-width:560px">
      <h2 style="color:#1A1814">司機加入申請</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>姓名</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>電話</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.phone)}</td></tr>
        ${payload.licenseYears ? `<tr><td style="padding:8px;border-bottom:1px solid #eee"><b>駕照年資</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.licenseYears)}</td></tr>` : ""}
        ${payload.currentJob ? `<tr><td style="padding:8px;border-bottom:1px solid #eee"><b>目前工作</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.currentJob)}</td></tr>` : ""}
      </table>
      ${payload.motivation ? `<h3 style="margin-top:16px">加入動機</h3><p style="white-space:pre-wrap;background:#FBF8F3;padding:12px;border-radius:8px">${escapeHtml(payload.motivation)}</p>` : ""}
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `${site.shortName} 官網 <noreply@${(process.env.RESEND_FROM_DOMAIN ?? "gogocha.tw").replace(/^https?:\/\//, "")}>`,
      to: [to],
      subject,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "未知錯誤";
    console.error("[driver-apply] resend error:", err);
    return new NextResponse(`寄送失敗：${msg}`, { status: 502 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
