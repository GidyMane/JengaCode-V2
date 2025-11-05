import {
  Event,
  BlogPost,
  Media,
  Testimonial,
  Challenge,
  TeamMember,
  AdminUser,
} from "@/types/event";

const EVENTS_KEY = "admin_events";
const BLOG_POSTS_KEY = "admin_blog_posts";
const MEDIA_KEY = "admin_media";
const TESTIMONIALS_KEY = "admin_testimonials";
const CHALLENGES_KEY = "admin_challenges";
const TEAM_MEMBERS_KEY = "admin_team_members";
const USERS_KEY = "admin_users";

// Utilities
function getFromLocalStorage<T>(key: string, defaultValue: T[]): T[] {
  if (typeof window === "undefined") return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToLocalStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.error(`Failed to save ${key} to localStorage`);
  }
}

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Events Service
export const eventService = {
  getAll: (): Event[] => getFromLocalStorage<Event>(EVENTS_KEY, []),

  getById: (id: string): Event | undefined => {
    const events = eventService.getAll();
    return events.find((e) => e.id === id);
  },

  create: (data: Omit<Event, "id" | "createdAt" | "updatedAt">): Event => {
    const events = eventService.getAll();
    const newEvent: Event = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    events.push(newEvent);
    saveToLocalStorage(EVENTS_KEY, events);
    return newEvent;
  },

  update: (id: string, data: Partial<Event>): Event | undefined => {
    const events = eventService.getAll();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    events[index] = {
      ...events[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(EVENTS_KEY, events);
    return events[index];
  },

  delete: (id: string): boolean => {
    const events = eventService.getAll();
    const filtered = events.filter((e) => e.id !== id);
    if (filtered.length === events.length) return false;
    saveToLocalStorage(EVENTS_KEY, filtered);
    return true;
  },

  exportToCSV: (events: Event[]): string => {
    const headers = [
      "ID",
      "Title",
      "Date",
      "Location",
      "Capacity",
      "Registered",
      "Featured",
    ];
    const rows = events.map((e) => [
      e.id,
      e.title,
      e.date,
      e.location,
      e.capacity || 0,
      e.registered || 0,
      e.featured ? "Yes" : "No",
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");
    return csvContent;
  },
};

// Blog Posts Service
export const blogService = {
  getAll: (): BlogPost[] => getFromLocalStorage<BlogPost>(BLOG_POSTS_KEY, []),

  getById: (id: string): BlogPost | undefined => {
    const posts = blogService.getAll();
    return posts.find((p) => p.id === id);
  },

  create: (
    data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
  ): BlogPost => {
    const posts = blogService.getAll();
    const newPost: BlogPost = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    saveToLocalStorage(BLOG_POSTS_KEY, posts);
    return newPost;
  },

  update: (id: string, data: Partial<BlogPost>): BlogPost | undefined => {
    const posts = blogService.getAll();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    posts[index] = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(BLOG_POSTS_KEY, posts);
    return posts[index];
  },

  delete: (id: string): boolean => {
    const posts = blogService.getAll();
    const filtered = posts.filter((p) => p.id !== id);
    if (filtered.length === posts.length) return false;
    saveToLocalStorage(BLOG_POSTS_KEY, filtered);
    return true;
  },
};

// Media Service
export const mediaService = {
  getAll: (): Media[] => getFromLocalStorage<Media>(MEDIA_KEY, []),

  getById: (id: string): Media | undefined => {
    const items = mediaService.getAll();
    return items.find((m) => m.id === id);
  },

  create: (data: Omit<Media, "id" | "createdAt">): Media => {
    const items = mediaService.getAll();
    const newMedia: Media = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    items.push(newMedia);
    saveToLocalStorage(MEDIA_KEY, items);
    return newMedia;
  },

  delete: (id: string): boolean => {
    const items = mediaService.getAll();
    const filtered = items.filter((m) => m.id !== id);
    if (filtered.length === items.length) return false;
    saveToLocalStorage(MEDIA_KEY, filtered);
    return true;
  },

  filterByEvent: (eventId: string): Media[] => {
    const items = mediaService.getAll();
    return items.filter((m) => m.eventId === eventId);
  },
};

// Testimonials Service
export const testimonialService = {
  getAll: (): Testimonial[] =>
    getFromLocalStorage<Testimonial>(TESTIMONIALS_KEY, []),

  getById: (id: string): Testimonial | undefined => {
    const items = testimonialService.getAll();
    return items.find((t) => t.id === id);
  },

  create: (
    data: Omit<Testimonial, "id" | "createdAt" | "approved">
  ): Testimonial => {
    const items = testimonialService.getAll();
    const newTestimonial: Testimonial = {
      ...data,
      id: generateId(),
      approved: false,
      createdAt: new Date().toISOString(),
    };
    items.push(newTestimonial);
    saveToLocalStorage(TESTIMONIALS_KEY, items);
    return newTestimonial;
  },

  approve: (id: string): Testimonial | undefined => {
    const items = testimonialService.getAll();
    const index = items.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    items[index].approved = true;
    saveToLocalStorage(TESTIMONIALS_KEY, items);
    return items[index];
  },

  reject: (id: string): boolean => {
    const items = testimonialService.getAll();
    const filtered = items.filter((t) => t.id !== id);
    if (filtered.length === items.length) return false;
    saveToLocalStorage(TESTIMONIALS_KEY, filtered);
    return true;
  },
};

// Challenges Service
export const challengeService = {
  getAll: (): Challenge[] =>
    getFromLocalStorage<Challenge>(CHALLENGES_KEY, []),

  getById: (id: string): Challenge | undefined => {
    const items = challengeService.getAll();
    return items.find((c) => c.id === id);
  },

  create: (
    data: Omit<Challenge, "id" | "createdAt" | "updatedAt">
  ): Challenge => {
    const items = challengeService.getAll();
    const newChallenge: Challenge = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newChallenge);
    saveToLocalStorage(CHALLENGES_KEY, items);
    return newChallenge;
  },

  update: (id: string, data: Partial<Challenge>): Challenge | undefined => {
    const items = challengeService.getAll();
    const index = items.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(CHALLENGES_KEY, items);
    return items[index];
  },

  delete: (id: string): boolean => {
    const items = challengeService.getAll();
    const filtered = items.filter((c) => c.id !== id);
    if (filtered.length === items.length) return false;
    saveToLocalStorage(CHALLENGES_KEY, filtered);
    return true;
  },
};

// Team Members Service
export const teamService = {
  getAll: (): TeamMember[] =>
    getFromLocalStorage<TeamMember>(TEAM_MEMBERS_KEY, []),

  getById: (id: string): TeamMember | undefined => {
    const items = teamService.getAll();
    return items.find((t) => t.id === id);
  },

  create: (
    data: Omit<TeamMember, "id" | "createdAt">
  ): TeamMember => {
    const items = teamService.getAll();
    const newMember: TeamMember = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    items.push(newMember);
    saveToLocalStorage(TEAM_MEMBERS_KEY, items);
    return newMember;
  },

  update: (id: string, data: Partial<TeamMember>): TeamMember | undefined => {
    const items = teamService.getAll();
    const index = items.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    items[index] = { ...items[index], ...data };
    saveToLocalStorage(TEAM_MEMBERS_KEY, items);
    return items[index];
  },

  delete: (id: string): boolean => {
    const items = teamService.getAll();
    const filtered = items.filter((t) => t.id !== id);
    if (filtered.length === items.length) return false;
    saveToLocalStorage(TEAM_MEMBERS_KEY, filtered);
    return true;
  },
};

// Users Service
export const adminUserService = {
  getAll: (): AdminUser[] =>
    getFromLocalStorage<AdminUser>(USERS_KEY, []),

  getById: (id: string): AdminUser | undefined => {
    const items = adminUserService.getAll();
    return items.find((u) => u.id === id);
  },

  create: (
    data: Omit<AdminUser, "id" | "createdAt" | "updatedAt">
  ): AdminUser => {
    const items = adminUserService.getAll();
    const newUser: AdminUser = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newUser);
    saveToLocalStorage(USERS_KEY, items);
    return newUser;
  },

  update: (id: string, data: Partial<AdminUser>): AdminUser | undefined => {
    const items = adminUserService.getAll();
    const index = items.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(USERS_KEY, items);
    return items[index];
  },

  delete: (id: string): boolean => {
    const items = adminUserService.getAll();
    const filtered = items.filter((u) => u.id !== id);
    if (filtered.length === items.length) return false;
    saveToLocalStorage(USERS_KEY, filtered);
    return true;
  },
};
