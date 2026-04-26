import { ImageResponse } from "next/og";

export const alt = "Tu 2026 en puntos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: "black",
            borderRadius: 999,
            marginBottom: 56,
          }}
        />
        <div
          style={{
            fontSize: 120,
            color: "black",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            textAlign: "center",
            lineHeight: 0.95,
            marginBottom: 40,
          }}
        >
          Tu 2026 en puntos
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#666666",
            textAlign: "center",
            fontWeight: 400,
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          Transforma tus días en logros
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#999999",
          }}
        >
          yourlifeindots.com
        </div>
      </div>
    ),
    { ...size }
  );
}
