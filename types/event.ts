export interface Event {
  id: string;
  title: string;
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
  | "community";

export interface EventFilters {
  category: EventCategory | "all";
  sortBy: "date" | "title" | "featured";
  sortOrder: "asc" | "desc";
  searchTerm: string;
}
