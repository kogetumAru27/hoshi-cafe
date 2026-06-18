import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Provider from "@/components/Provider";
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "polaris",
  description: "天体観測カフェへようこそ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
        <div className="flex justify-center py-4 bg-slate-900">
        <Image src="/logo.png" alt="polaris logo" width={200} height={200} />
        </div>
          <nav className="flex justify-center gap-4 p-4 bg-slate-900 text-white">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/menu" className="hover:underline">Menu</Link>
            <Link href="/reservation" className="hover:underline">Stargazing</Link>
            <Link href="/constellation" className="hover:underline">Constellation</Link>
            <Link href="/mypage" className="hover:underline">My page</Link>
            <Link href="/order" className="hover:underline">Order</Link>
          </nav>
          {children}
        </Provider>
      </body>
    </html>
  );
}