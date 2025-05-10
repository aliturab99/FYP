import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ChatBot from "./components/ChatBot";
import Whatsapp from "./components/Whatsapp";
import VoiceControl from "./components/Voice";
import { SpeedInsights } from "@vercel/speed-insights/next"
import DownTime from "./components/DownTime";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "medMagic - Home",
  description: "One stop solution for all your medical needs",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <DownTime />
        </body>
      </html>
  );
}
