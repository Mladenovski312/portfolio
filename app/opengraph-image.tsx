import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} · AI Engineer & Full-Stack Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0A192F 0%, #112240 100%)",
          padding: 80,
          color: "#E5EAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5EEAD4",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#5EEAD4",
              display: "block",
            }}
          />
          <span>Available · Q2 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Ship AI-powered web apps and automation, fast.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#AFB8D5",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {site.name} · AI Engineer & Full-Stack Builder · Kumanovo, MK
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#AFB8D5",
            borderTop: "1px solid #233554",
            paddingTop: 24,
          }}
        >
          <span>Top Rated · 100% JSS · 1000+ client hours</span>
          <span style={{ color: "#5EEAD4" }}>filipmladenovski.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
