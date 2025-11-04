export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  year: number;
  event?: string;
  location?: string;
  category: "photo" | "video";
  featured?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "summer-camp-group-photo-2024",
    title: "Summer Camp 2024 Group Photo",
    description: "All participants from the 2024 summer camp with their projects",
    image: "/images/gallery/summer-camp-2024-group.jpg",
    thumbnail: "/images/gallery/summer-camp-2024-group-thumb.jpg",
    year: 2024,
    event: "Summer Coding Camp",
    location: "JengaCode Innovation Hub",
    category: "photo",
    featured: true,
  },
  {
    id: "robotics-demo-2024",
    title: "Robotics Workshop Demo",
    description: "Students showcasing their robot creations at the workshop",
    image: "/images/gallery/robotics-demo-2024.jpg",
    thumbnail: "/images/gallery/robotics-demo-2024-thumb.jpg",
    year: 2024,
    event: "Robot Building Workshop",
    location: "JengaCode Lab",
    category: "photo",
  },
  {
    id: "scratch-animation-showcase-2024",
    title: "Animation Festival Showcase",
    description: "Young creators presenting their animated stories",
    image: "/images/gallery/animation-showcase-2024.jpg",
    thumbnail: "/images/gallery/animation-showcase-2024-thumb.jpg",
    year: 2024,
    event: "Scratch Animation Festival",
    location: "JengaCode Hub",
    category: "photo",
  },
  {
    id: "innovation-day-hackathon-2024",
    title: "Innovation Day Hackathon",
    description: "Teams competing in the 2024 Innovation Day hackathon",
    image: "/images/gallery/hackathon-2024.jpg",
    thumbnail: "/images/gallery/hackathon-2024-thumb.jpg",
    year: 2024,
    event: "JengaCode Innovation Day",
    location: "Kenya National Theatre",
    category: "photo",
    featured: true,
  },
  {
    id: "school-program-nairobi-2024",
    title: "School Program in Action",
    description: "Students learning robotics at a Nairobi school",
    image: "/images/gallery/school-program-2024.jpg",
    thumbnail: "/images/gallery/school-program-2024-thumb.jpg",
    year: 2024,
    event: "School Robotics Program",
    location: "Various Schools",
    category: "photo",
  },
  {
    id: "web-dev-bootcamp-2023",
    title: "Web Development Bootcamp Projects",
    description: "Students showcasing their first websites created during bootcamp",
    image: "/images/gallery/webdev-bootcamp-2023.jpg",
    thumbnail: "/images/gallery/webdev-bootcamp-2023-thumb.jpg",
    year: 2023,
    event: "Web Development Bootcamp",
    location: "JengaCode Innovation Hub",
    category: "photo",
  },
  {
    id: "innovation-day-2023",
    title: "2023 Innovation Day Celebration",
    description: "Young innovators and mentors celebrating achievements",
    image: "/images/gallery/innovation-2023.jpg",
    thumbnail: "/images/gallery/innovation-2023-thumb.jpg",
    year: 2023,
    event: "JengaCode Innovation Day",
    location: "Kenya National Theatre",
    category: "photo",
  },
  {
    id: "coding-challenge-2024",
    title: "Coding Challenge Winners",
    description: "Top performers in our monthly coding challenges",
    image: "/images/gallery/coding-challenge-2024.jpg",
    thumbnail: "/images/gallery/coding-challenge-2024-thumb.jpg",
    year: 2024,
    event: "Monthly Coding Challenge",
    location: "Online",
    category: "photo",
  },
  {
    id: "youth-conference-2023",
    title: "Youth Tech Conference",
    description: "Young speakers sharing their tech journey",
    image: "/images/gallery/youth-conference-2023.jpg",
    thumbnail: "/images/gallery/youth-conference-2023-thumb.jpg",
    year: 2023,
    event: "Youth Tech Conference",
    location: "Nairobi",
    category: "photo",
  },
  {
    id: "maker-faire-2024",
    title: "JengaCode at Maker Faire",
    description: "JengaCode showcase at the 2024 Maker Faire",
    image: "/images/gallery/maker-faire-2024.jpg",
    thumbnail: "/images/gallery/maker-faire-2024-thumb.jpg",
    year: 2024,
    event: "Maker Faire",
    location: "Nairobi",
    category: "photo",
  },
];

export function getGalleryByYear(year: number): GalleryItem[] {
  return galleryItems.filter((item) => item.year === year);
}

export function getGalleryByEvent(event: string): GalleryItem[] {
  return galleryItems.filter((item) => item.event === event);
}

export function getGalleryByCategory(category: string): GalleryItem[] {
  return galleryItems.filter((item) => item.category === category);
}

export function getFeaturedGallery(): GalleryItem[] {
  return galleryItems.filter((item) => item.featured);
}

export function getGalleryYears(): number[] {
  return Array.from(new Set(galleryItems.map((item) => item.year))).sort(
    (a, b) => b - a
  );
}
