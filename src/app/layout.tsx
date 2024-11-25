import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/Header";

export const metadata: Metadata = {
  title: "Pokemon's fights",
  description: "Million chances to win",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
