import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {AuthProvider} from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "Pokebet",
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
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
