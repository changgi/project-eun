import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "은평구시설관리공단 기관변천사",
  description:
    "주차장, 체육시설, 공공시설 관리를 넘어 구민의 일상을 함께하는 20년의 발자취",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
