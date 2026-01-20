import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyDataTrace - 时光数绘轨迹图",
  description: "用数据当画笔，绘出独属于你的时光轨迹",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
