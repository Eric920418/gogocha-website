import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — 花蓮在地 24h 計程車隊`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #1565C0 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1F1B0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFD54F",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#1F1B0A" }}>
              {site.shortName}
            </span>
            <span style={{ fontSize: 18, color: "#1F1B0A", opacity: 0.7 }}>
              花蓮計程車
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#1F1B0A",
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            花蓮叫車・電話與 LINE
          </h1>
          <p
            style={{
              fontSize: 30,
              color: "#1F1B0A",
              opacity: 0.85,
              margin: 0,
            }}
          >
            AI 接電話像真人・聽得懂台語・在地 24h 車隊
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 22,
            color: "#1F1B0A",
            opacity: 0.85,
            fontWeight: 700,
          }}
        >
          <span>{site.phoneDisplay}</span>
          <span>LINE {site.lineOAId}</span>
          <span>機場・車站・市區接送</span>
        </div>
      </div>
    ),
    size,
  );
}
