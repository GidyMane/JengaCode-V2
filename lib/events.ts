export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  image: string;
  description: string;
  fullDescription: string;
  ageGroup: string[];
  category: "bootcamp" | "workshop" | "challenge" | "camp" | "other";
  capacity?: number;
  registered?: number;
  agenda?: Array<{
    time: string;
    activity: string;
  }>;
  featured?: boolean;
  status: "upcoming" | "ongoing" | "completed";
}

export const events: Event[] = [
  {
    id: "summer-camp-2025",
    title: "JengaCode Summer Coding Camp",
    date: "August 8-9, 2025",
    time: "9:00 AM",
    endTime: "4:00 PM",
    location: "JengaCode Innovation Hub, Nairobi",
    image: "/images/events/summer-camp.jpg",
    description: "Our biggest event of the year! Hackathons, workshops, and prizes!",
    fullDescription:
      "Join us for an exciting 2-day intensive coding camp where young innovators will learn robotics, Scratch programming, web development, and more. This immersive experience includes hands-on projects, team collaborations, and opportunities to showcase your creations.",
    ageGroup: ["All Ages"],
    category: "camp",
    capacity: 150,
    registered: 87,
    featured: true,
    status: "upcoming",
    agenda: [
      { time: "9:00 AM", activity: "Registration & Welcome" },
      { time: "9:30 AM", activity: "Icebreaker Games" },
      { time: "10:00 AM", activity: "Scratch Programming Basics" },
      { time: "12:00 PM", activity: "Lunch Break" },
      { time: "1:00 PM", activity: "Robotics Workshop" },
      { time: "3:00 PM", activity: "Project Showcase Prep" },
      { time: "4:00 PM", activity: "Day 1 Wrap-up" },
    ],
  },
  {
    id: "robot-workshop-july-2025",
    title: "Robot Building Workshop",
    date: "July 15, 2025",
    time: "2:00 PM",
    endTime: "5:00 PM",
    location: "JengaCode Lab, Nairobi",
    image: "/images/events/robot-workshop.jpg",
    description: "Build and program your own robot companion!",
    fullDescription:
      "In this hands-on workshop, participants will learn robotics fundamentals, design their own robot, and program it to perform various tasks. Perfect for beginners and experienced makers alike.",
    ageGroup: ["Ages 9-17"],
    category: "workshop",
    capacity: 40,
    registered: 28,
    status: "upcoming",
  },
  {
    id: "scratch-animation-festival-july-2025",
    title: "Scratch Animation Festival",
    date: "July 22, 2025",
    time: "1:00 PM",
    endTime: "3:00 PM",
    location: "JengaCode Hub, Nairobi",
    image: "/images/events/animation-festival.jpg",
    description: "Create animated stories and share with friends!",
    fullDescription:
      "Unleash your creativity in this fun animation festival where you'll learn Scratch basics and create your own animated stories. Share your creations with the community and celebrate each other's work.",
    ageGroup: ["Ages 5-12"],
    category: "bootcamp",
    capacity: 60,
    registered: 45,
    status: "upcoming",
  },
  {
    id: "web-dev-bootcamp-june-2025",
    title: "Web Development Bootcamp",
    date: "June 10-14, 2025",
    time: "10:00 AM",
    endTime: "2:00 PM",
    location: "JengaCode Innovation Hub, Nairobi",
    image: "/images/events/web-dev-bootcamp.jpg",
    description: "Learn HTML, CSS, and JavaScript to build real websites!",
    fullDescription:
      "A comprehensive 5-day bootcamp covering the fundamentals of web development. Build responsive websites, learn JavaScript interactivity, and deploy your first project online.",
    ageGroup: ["Ages 13-17"],
    category: "bootcamp",
    capacity: 50,
    registered: 42,
    status: "upcoming",
  },
  {
    id: "innovation-day-2024",
    title: "JengaCode Innovation Day 2024",
    date: "August 10, 2024",
    time: "9:00 AM",
    endTime: "6:00 PM",
    location: "Kenya National Theatre, Nairobi",
    image: "/images/events/innovation-day-2024.jpg",
    description:
      "Annual celebration of youth innovation with hackathons and project showcases",
    fullDescription:
      "Our flagship annual event celebrating young innovators. Features interactive hackathons, expert talks, project showcases, and networking opportunities.",
    ageGroup: ["All Ages"],
    category: "challenge",
    capacity: 500,
    registered: 450,
    status: "completed",
  },
  {
    id: "school-robotics-program-2024",
    title: "School Robotics Program",
    date: "March-May 2024",
    time: "3:30 PM",
    endTime: "5:30 PM",
    location: "Various schools across Nairobi",
    image: "/images/events/school-robotics.jpg",
    description: "10-week robotics curriculum for school students",
    fullDescription:
      "Partnership program bringing robotics education directly to schools. Students learn STEM principles through hands-on robot building and programming.",
    ageGroup: ["Ages 9-15"],
    category: "bootcamp",
    capacity: 200,
    registered: 180,
    status: "completed",
  },
];

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id);
}

export function getUpcomingEvents(): Event[] {
  return events.filter((event) => event.status === "upcoming");
}

export function getPastEvents(): Event[] {
  return events.filter((event) => event.status === "completed");
}

export function getEventsByCategory(category: string): Event[] {
  return events.filter((event) => event.category === category);
}

export function getFeaturedEvents(): Event[] {
  return events.filter((event) => event.featured);
}
