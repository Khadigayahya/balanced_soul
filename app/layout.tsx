import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "./AuthProvider";

export const metadata: Metadata = {
  title: "صحح بوصلة قلبك",
  description: "منصة للتزكية والاتزان النفسي",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0d3b2b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}