import type { Metadata } from "next";
import Navigation from "./components/navigation";
import { Geist, Geist_Mono, Reenie_Beanie } from "next/font/google";
import "./globals.css";
// import { getAuthenticatedAppForUser } from "./lib/firebase/serverApp";
// import { getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
// import {auth} from "./lib/firebase/clientApp"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const reenieBeanie = Reenie_Beanie({
  variable: "--font-reenie-beanie",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Turn me to anything",
  description: "Turn yourself into various styles",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${reenieBeanie.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
