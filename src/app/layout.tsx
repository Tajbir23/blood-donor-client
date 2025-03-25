import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar/Navbar";
import EmergencyHeadline from "@/components/Emergency-headline/Emergency-headline";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'রক্তদান রংপুর বিভাগ',
  description: 'রংপুর বিভাগের সবচেয়ে বড় রক্তদাতা নেটওয়ার্ক। দ্রুত এবং নির্ভরযোগ্যভাবে রক্তদাতাদের সাথে সংযোগ স্থাপন করুন।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <Navbar />
        <EmergencyHeadline />
        {children}
        <Footer />
      </body>
    </html>
  );
}
