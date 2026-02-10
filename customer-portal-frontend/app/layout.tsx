import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PortalProvider } from "@/lib/portal-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Customer Portal",
  description: "Allow customers to manage their subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PortalProvider>{children}</PortalProvider>
      </body>
    </html>
  );
}
