import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {AuthProvider} from "@/context/auth/AuthProvider";
import {FightsProvider} from "@/context/fight/FightProvider";
import {UserProvider} from "@/context/user/UserProvider";
import {SideBar} from "@/components/SideBar";
import React from "react";
import {Toaster} from "react-hot-toast";

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
          <FightsProvider>
              <AuthProvider>
                  <Toaster
                      position="bottom-right"
                      reverseOrder={false}
                  />
                  <Header />
                  <div className="content">
                      <SideBar />
                      {children}
                  </div>
              </AuthProvider>
          </FightsProvider>
      </UserProvider>
      </body>
    </html>
  );
}
