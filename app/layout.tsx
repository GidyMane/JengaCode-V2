import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/ui/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JengaCode - Where Young Minds Code the Future",
  description:
    "A public tech and innovation hub for kids aged 5 to 17. Explore, discover, and get inspired to code, build, and create in our magical digital world.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
