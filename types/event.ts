export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  shortDescription: string;
  fullDescription: string;
  images: EventImage[];
  attendees: Attendee[];
  activities: Activity[];
  category: EventCategory;
  featured: boolean;
  location: string;
  duration: string;
  ageRange?: string;
  price?: number;
  capacity?: number;
  registered?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  featured: boolean;
}

export interface Attendee {
  id: string;
  name: string;
  age: number;
  email?: string;
  avatar?: string;
  achievement?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  icon: string;
  participants: number;
}

export type EventCategory =
  | "workshop"
  | "camp"
  | "competition"
  | "showcase"
  | "community"
  | "bootcamp"
  | "challenge"
  | "other";

export interface EventFilters {
  category: EventCategory | "all";
  sortBy: "date" | "title" | "featured";
  sortOrder: "asc" | "desc";
  searchTerm: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  coverImage?: string;
  category: string;
  authorId: string;
  publishedAt?: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  url: string;
  caption?: string;
  uploadedBy: string;
  eventId?: string;
  type: "image" | "video" | "document";
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: "Parent" | "Student";
  text: string;
  photo?: string;
  approved: boolean;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
  resourceLink?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "Admin" | "Editor" | "Volunteer";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;
}
