import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { StoreProvider } from "@/lib/store/StoreProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "AdMaster AI - AI that thinks like a marketer",
  description:
    "AI-powered marketing automation platform that helps brands generate, manage, and optimize ads across Google, Meta, LinkedIn, and Microsoft Ads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
