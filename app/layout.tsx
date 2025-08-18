import type { Metadata } from "next";
import Navigation from "./components/navigation";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Turn me to anything",
  description: "Turn yourself into various styles",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { currentUser } = await getAuthenticatedAppForUser();
  // console.log(currentUser);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
