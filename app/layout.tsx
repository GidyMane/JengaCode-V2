import type { Metadata, Viewport } from "next";
// @ts-expect-error - Next.js handles global CSS imports at build time.
import "./globals.css";

const DESCRIPTION =
  "JengaCode runs hands-on digital skills programs for children and teens aged 8 to 17 in Nairobi: coding and robotics bootcamps, in-school and after-school programs, workshops and events, and printed learning booklets.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jengacode.co.ke"),
  title: "JengaCode | Coding & Robotics Programs for Children in Nairobi",
  description: DESCRIPTION,
  keywords: [
    "coding for kids Nairobi",
    "robotics classes for children Kenya",
    "school coding program Kenya",
    "children coding academy",
    "STEM for kids Kenya",
    "holiday coding bootcamp Nairobi",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
  openGraph: {
    type: "website",
    title: "JengaCode | Coding & Robotics Programs for Children",
    description: DESCRIPTION,
    url: "/",
    siteName: "JengaCode",
    images: [{ url: "/images/jengacode-brand.jpg", width: 1280, height: 830, alt: "JengaCode" }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "JengaCode | Coding & Robotics Programs for Children",
    description: DESCRIPTION,
    images: ["/images/jengacode-brand.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2E0F52",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
