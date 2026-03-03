import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "صحح بوصلة قلبك",
  description: "منصة للتزكية والاتزان النفسي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}