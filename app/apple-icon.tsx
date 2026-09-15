import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#191a18",
          color: "#e9e2d3",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
          borderBottom: "8px solid #8d4039",
        }}
      >
        jh
      </div>
    ),
    size,
  );
}
