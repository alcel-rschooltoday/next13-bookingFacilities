import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking Facilities Records",
  description: "Generated by Alcel Montecino",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto p-4">
          <Navbar />
          <div className="mt-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
