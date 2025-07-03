import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Events Gallery | JengaCode",
  description:
    "Explore our amazing journey through past workshops, camps, competitions, and showcases. See incredible projects, meet participants, and get inspired for future events.",
  keywords:
    "coding events, kids programming, tech workshops, coding camps, STEM education, youth innovation",
  openGraph: {
    title: "Past Events Gallery | JengaCode",
    description:
      "Explore our amazing journey through past workshops, camps, competitions, and showcases.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596443686812-2c72aaab1b48?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kids programming robots at JengaCode",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Past Events Gallery | JengaCode",
    description:
      "Explore our amazing journey through past workshops, camps, competitions, and showcases.",
    images: [
      "https://images.unsplash.com/photo-1596443686812-2c72aaab1b48?w=1200&h=630&fit=crop",
    ],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
