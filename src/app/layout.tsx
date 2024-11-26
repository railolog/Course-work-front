import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {AuthProvider} from "@/context/auth/AuthProvider";
import {FightsProvider} from "@/context/fight/FightProvider";
import {UserProvider} from "@/context/user/UserProvider";
import {SideBar} from "@/components/SideBar";
import React from "react";

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
      <UserProvider>
          <AuthProvider>
              <FightsProvider>
                  <Header />
                  <div className="content">
                      <SideBar />
                      {children}
                  </div>
              </FightsProvider>
          </AuthProvider>
      </UserProvider>
      </body>
    </html>
  );
}
