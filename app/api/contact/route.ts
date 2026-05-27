import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

const Body = z.object({
  type: z.enum(["general", "business", "complaint"]).default("general"),
  segment: z.string().optional(),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(8).max(40),
  email: z.string().trim().email().optional().or(z.literal("")),
  message: z.string().trim().min(5).max(4000),
});

function getDestination(type: string): string {
  const env = process.env;
  if (type === "business") {
    return env.B2B_TO_EMAIL ?? env.CONTACT_TO_EMAIL ?? "contact@gogocha.tw";
  }
  return env.CONTACT_TO_EMAIL ?? "contact@gogocha.tw";
}

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
    // No Resend configured — log and return success in dev, error in prod
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY not set — payload:", payload);
      return NextResponse.json({ ok: true, devMode: true });
    }
    return new NextResponse(
      "聯絡服務暫時無法使用，請改撥客服電話 " + site.phoneDisplay,
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = getDestination(payload.type);
  const subject = `[${site.shortName} 官網表單] ${
    payload.type === "business" ? "B2B 合作詢問" : "一般聯絡"
  }｜${payload.name}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;max-width:560px">
      <h2 style="color:#1A1814">官網聯絡表單</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>類型</b></td><td style="padding:8px;border-bottom:1px solid #eee">${payload.type}${payload.segment ? ` / ${payload.segment}` : ""}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>姓名 / 公司</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>電話</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.phone)}</td></tr>
        ${payload.email ? `<tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(payload.email)}</td></tr>` : ""}
      </table>
      <h3 style="margin-top:16px">訊息</h3>
      <p style="white-space:pre-wrap;background:#FBF8F3;padding:12px;border-radius:8px">${escapeHtml(payload.message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `${site.shortName} 官網 <noreply@${(process.env.RESEND_FROM_DOMAIN ?? "gogocha.tw").replace(/^https?:\/\//, "")}>`,
      to: [to],
      replyTo: payload.email || undefined,
      subject,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "未知錯誤";
    console.error("[contact] resend error:", err);
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
