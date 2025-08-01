import { Event, EventCategory, EventFilters } from "@/types/event";

export const mockEvents: Event[] = [
  {
    id: "summer-camp-2025",
    title: "Summer Coding Camp 2025",
    date: "2025-08-08",
    shortDescription: "Two-day intensive coding adventure for young innovators - August 8th & 9th",
    fullDescription:
      "Join us for an amazing 2-day coding adventure where kids will learn Scratch programming, build robots, and create their first web pages. The event features hands-on workshops, team challenges, and a final showcase where participants will present their projects. This year's camp focuses on collaborative learning and creative problem-solving.",
    images: [
      {
        id: "img_camp2025_1",
        url: "https://images.unsplash.com/photo-1596443686812-2c72aaab1b48?w=800&h=600&fit=crop",
        alt: "Kids programming robots at summer camp",
        caption: "Young coders programming their first robots",
        featured: true,
      },
      {
        id: "img_camp2025_2",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
        alt: "Group coding session",
        caption: "Collaborative coding session during camp",
        featured: false,
      },
      {
        id: "img_camp2025_3",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
        alt: "Project showcase",
        caption: "Final project presentations on day 2",
        featured: false,
      },
    ],
    attendees: [], // Will be populated as kids register and attend
    activities: [
      {
        id: "act_camp2025_1",
        name: "Scratch Programming",
        description: "Learn programming basics with visual blocks",
        icon: "🧩",
        participants: 0, // Will be updated as camp progresses
      },
      {
        id: "act_camp2025_2",
        name: "Robot Building",
        description: "Build and program Arduino robots",
        icon: "🤖",
        participants: 0,
      },
      {
        id: "act_camp2025_3",
        name: "Web Development",
        description: "Create your first website",
        icon: "🌐",
        participants: 0,
      },
      {
        id: "act_camp2025_4",
        name: "Team Challenges",
        description: "Collaborative problem-solving activities",
        icon: "🏆",
        participants: 0,
      },
    ],
    category: "camp",
    featured: true,
    location: "JengaCode Innovation Hub",
    duration: "2 days (August 8-9, 2025)",
  },
  {
    id: "1",
    title: "Summer Coding Camp 2024",
    date: "2024-08-15",
    shortDescription: "Two-day intensive coding adventure for young innovators",
    fullDescription:
      "An amazing 2-day coding adventure where kids learned Scratch programming, built robots, and created their first web pages. The event featured hands-on workshops, team challenges, and a final showcase where participants presented their projects.",
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1596443686812-2c72aaab1b48?w=800&h=600&fit=crop",
        alt: "Kids programming robots",
        caption: "Young coders programming their first robots",
        featured: true,
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
        alt: "Group coding session",
        caption: "Collaborative coding session",
        featured: false,
      },
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
        alt: "Project showcase",
        caption: "Final project presentations",
        featured: false,
      },
      {
        id: "img4",
        url: "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?w=600&h=400&fit=crop",
        alt: "Team celebration",
        caption: "Celebrating achievements",
        featured: false,
      },
    ],
    attendees: [
      { id: "att1", name: "Maya", age: 10, achievement: "Best Robot Design" },
      {
        id: "att2",
        name: "Alex",
        age: 12,
        achievement: "Most Creative Project",
      },
      { id: "att3", name: "Sam", age: 8, achievement: "Team Player Award" },
      { id: "att4", name: "Jordan", age: 14, achievement: "Innovation Prize" },
      { id: "att5", name: "Riley", age: 9, achievement: "Problem Solver" },
      { id: "att6", name: "Casey", age: 11, achievement: "Code Warrior" },
    ],
    activities: [
      {
        id: "act1",
        name: "Scratch Programming",
        description: "Learn programming basics with visual blocks",
        icon: "🧩",
        participants: 15,
      },
      {
        id: "act2",
        name: "Robot Building",
        description: "Build and program Arduino robots",
        icon: "🤖",
        participants: 12,
      },
      {
        id: "act3",
        name: "Web Development",
        description: "Create your first website",
        icon: "🌐",
        participants: 18,
      },
    ],
    category: "camp",
    featured: true,
    location: "JengaCode Innovation Hub",
    duration: "2 days",
  },
  {
    id: "2",
    title: "Robot Building Workshop",
    date: "2024-07-20",
    shortDescription: "Hands-on robotics workshop for beginners",
    fullDescription:
      "A comprehensive robotics workshop where participants learned the fundamentals of robotics engineering. Students built their own robots from scratch, programmed them to perform various tasks, and competed in friendly challenges.",
    images: [
      {
        id: "img5",
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
        alt: "Robot components",
        caption: "Exploring robot components and sensors",
        featured: true,
      },
      {
        id: "img6",
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
        alt: "Kids building robots",
        caption: "Assembling robots step by step",
        featured: false,
      },
      {
        id: "img7",
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
        alt: "Robot testing",
        caption: "Testing robot movements",
        featured: false,
      },
    ],
    attendees: [
      { id: "att7", name: "Emma", age: 13, achievement: "Fastest Robot" },
      { id: "att8", name: "Noah", age: 11, achievement: "Best Design" },
      { id: "att9", name: "Zoe", age: 12, achievement: "Creative Solution" },
    ],
    activities: [
      {
        id: "act4",
        name: "Circuit Building",
        description: "Learn basic electronics and circuits",
        icon: "⚡",
        participants: 10,
      },
      {
        id: "act5",
        name: "Programming Motors",
        description: "Code robot movements and behaviors",
        icon: "⚙️",
        participants: 10,
      },
      {
        id: "act6",
        name: "Robot Race",
        description: "Friendly competition between robots",
        icon: "🏁",
        participants: 10,
      },
    ],
    category: "workshop",
    featured: false,
    location: "Tech Lab Room A",
    duration: "3 hours",
  },
  {
    id: "3",
    title: "Code Art Exhibition",
    date: "2024-06-10",
    shortDescription: "Showcase of creative coding projects and digital art",
    fullDescription:
      "A stunning exhibition featuring digital art and creative coding projects created by young artists. The event showcased the intersection of technology and creativity, with interactive installations and live coding demonstrations.",
    images: [
      {
        id: "img8",
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
        alt: "Digital art display",
        caption: "Interactive digital art installations",
        featured: true,
      },
      {
        id: "img9",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        alt: "Kids presenting",
        caption: "Young artists explaining their work",
        featured: false,
      },
      {
        id: "img10",
        url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
        alt: "Audience engagement",
        caption: "Visitors interacting with exhibits",
        featured: false,
      },
    ],
    attendees: [
      { id: "att10", name: "Ava", age: 15, achievement: "Most Creative" },
      {
        id: "att11",
        name: "Liam",
        age: 14,
        achievement: "Technical Excellence",
      },
      { id: "att12", name: "Sophia", age: 16, achievement: "People's Choice" },
    ],
    activities: [
      {
        id: "act7",
        name: "Interactive Art",
        description: "Create art that responds to touch and movement",
        icon: "🎨",
        participants: 8,
      },
      {
        id: "act8",
        name: "Generative Design",
        description: "Code that creates unique visual patterns",
        icon: "🌀",
        participants: 6,
      },
      {
        id: "act9",
        name: "Live Coding",
        description: "Real-time programming performances",
        icon: "⚡",
        participants: 4,
      },
    ],
    category: "showcase",
    featured: false,
    location: "Gallery Space",
    duration: "1 day",
  },
  {
    id: "4",
    title: "Game Development Hackathon",
    date: "2024-05-25",
    shortDescription: "48-hour game development challenge for teens",
    fullDescription:
      "An intense 48-hour hackathon where teenage developers worked in teams to create original video games. Participants learned game design principles, collaborated on creative projects, and competed for prizes.",
    images: [
      {
        id: "img11",
        url: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&h=600&fit=crop",
        alt: "Team coding",
        caption: "Teams collaborating on game development",
        featured: true,
      },
      {
        id: "img12",
        url: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop",
        alt: "Game testing",
        caption: "Testing and debugging games",
        featured: false,
      },
      {
        id: "img13",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        alt: "Final presentations",
        caption: "Teams presenting their finished games",
        featured: false,
      },
    ],
    attendees: [
      { id: "att13", name: "Ethan", age: 16, achievement: "Best Game Design" },
      { id: "att14", name: "Mia", age: 15, achievement: "Most Innovative" },
      {
        id: "att15",
        name: "Owen",
        age: 17,
        achievement: "Technical Achievement",
      },
    ],
    activities: [
      {
        id: "act10",
        name: "Game Design",
        description: "Plan game mechanics and storylines",
        icon: "🎮",
        participants: 20,
      },
      {
        id: "act11",
        name: "Asset Creation",
        description: "Design characters, backgrounds, and sounds",
        icon: "🎭",
        participants: 15,
      },
      {
        id: "act12",
        name: "Playtesting",
        description: "Test games and provide feedback",
        icon: "🕹️",
        participants: 25,
      },
    ],
    category: "competition",
    featured: true,
    location: "Main Hall",
    duration: "48 hours",
  },
  {
    id: "5",
    title: "AI for Kids Workshop",
    date: "2024-04-12",
    shortDescription: "Introduction to artificial intelligence concepts",
    fullDescription:
      "An engaging workshop that introduced young minds to the fascinating world of artificial intelligence. Kids learned about machine learning, created simple AI projects, and explored how AI impacts our daily lives.",
    images: [
      {
        id: "img14",
        url: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
        alt: "AI demonstration",
        caption: "Learning about machine learning concepts",
        featured: true,
      },
      {
        id: "img15",
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
        alt: "Hands-on AI projects",
        caption: "Building simple AI applications",
        featured: false,
      },
    ],
    attendees: [
      { id: "att16", name: "Isabella", age: 13, achievement: "AI Innovator" },
      { id: "att17", name: "Mason", age: 12, achievement: "Future Scientist" },
      { id: "att18", name: "Luna", age: 14, achievement: "Problem Solver" },
    ],
    activities: [
      {
        id: "act13",
        name: "Machine Learning Basics",
        description: "Understand how computers learn patterns",
        icon: "🧠",
        participants: 12,
      },
      {
        id: "act14",
        name: "AI Art Generator",
        description: "Create art using AI tools",
        icon: "🤖",
        participants: 10,
      },
    ],
    category: "workshop",
    featured: false,
    location: "Innovation Lab",
    duration: "4 hours",
  },
];

export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  let filtered = [...events];

  // Filter by category
  if (filters.category !== "all") {
    filtered = filtered.filter((event) => event.category === filters.category);
  }

  // Filter by search term
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.shortDescription.toLowerCase().includes(searchLower) ||
        event.activities.some((activity) =>
          activity.name.toLowerCase().includes(searchLower),
        ),
    );
  }

  // Sort events
  filtered.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (filters.sortBy) {
      case "date":
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case "title":
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case "featured":
        aValue = a.featured ? 1 : 0;
        bValue = b.featured ? 1 : 0;
        break;
      default:
        return 0;
    }

    if (filters.sortOrder === "desc") {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
  });

  return filtered;
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find((event) => event.id === id);
}

export function getFeaturedEvents(): Event[] {
  return mockEvents.filter((event) => event.featured);
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return mockEvents.filter((event) => event.category === category);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCategoryDisplay(category: EventCategory): string {
  const categoryMap = {
    workshop: "Workshop",
    camp: "Camp",
    competition: "Competition",
    showcase: "Showcase",
    community: "Community Event",
  };
  return categoryMap[category];
}
