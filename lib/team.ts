export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "david-kipchoge",
    name: "David Kipchoge",
    role: "Founder & Executive Director",
    bio: "David is a passionate educator and software engineer with over 10 years of experience in tech education. He founded JengaCode to democratize access to coding and robotics education for young people across Kenya.",
    image: "/images/team/david-kipchoge.jpg",
    expertise: ["Education Technology", "Software Development", "Leadership", "Curriculum Design"],
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "sarah-mwangi",
    name: "Sarah Mwangi",
    role: "Director of Education",
    bio: "Sarah leads curriculum development and teacher training at JengaCode. With a background in computer science and education, she ensures our programs are engaging, effective, and accessible to learners of all backgrounds.",
    image: "/images/team/sarah-mwangi.jpg",
    expertise: ["Curriculum Design", "Python", "Web Development", "Teacher Training"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "james-ochieng",
    name: "James Ochieng",
    role: "Robotics & Hardware Lead",
    bio: "James brings expertise in robotics, embedded systems, and STEM education. He designs hands-on robotics projects that inspire students to think like engineers and solve real-world problems.",
    image: "/images/team/james-ochieng.jpg",
    expertise: ["Robotics", "Arduino", "Electronics", "Mechanical Design", "STEM Education"],
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    id: "emma-kariuki",
    name: "Emma Kariuki",
    role: "Community & Partnerships Manager",
    bio: "Emma manages partnerships with schools, organizations, and community groups. She's passionate about expanding JengaCode's reach and ensuring our programs serve diverse communities.",
    image: "/images/team/emma-kariuki.jpg",
    expertise: ["Community Outreach", "Partnership Development", "Event Management", "Student Mentorship"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "alex-kipchoge",
    name: "Alex Kipchoge",
    role: "Senior Instructor & Mentor",
    bio: "Alex is one of our most experienced instructors, specializing in web development and mobile app creation. Students love his clear explanations and patient mentoring approach.",
    image: "/images/team/alex-kipchoge.jpg",
    expertise: ["Web Development", "JavaScript", "React", "Mobile Development", "UI/UX Design"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "mercy-njeri",
    name: "Mercy Njeri",
    role: "Instructor - Scratch & Beginners",
    bio: "Mercy specializes in making coding accessible to young learners. Her creative approach to teaching Scratch and visual programming has inspired hundreds of kids to love coding.",
    image: "/images/team/mercy-njeri.jpg",
    expertise: ["Scratch Programming", "Creative Coding", "Game Development", "Beginner Instruction", "Youth Mentorship"],
    socialLinks: {
      twitter: "https://twitter.com",
    },
  },
  {
    id: "peter-ng-erokwu",
    name: "Peter Ng'erokwu",
    role: "Tech Operations Manager",
    bio: "Peter ensures all our platforms, tools, and systems run smoothly. He manages our online learning platform and IT infrastructure.",
    image: "/images/team/peter-ng-erokwu.jpg",
    expertise: ["Cloud Infrastructure", "DevOps", "System Administration", "IT Support"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "linda-okonkwo",
    name: "Linda Okonkwo",
    role: "Program Coordinator",
    bio: "Linda coordinates day-to-day program operations, student registrations, and event logistics. She's the backbone of our day-to-day operations.",
    image: "/images/team/linda-okonkwo.jpg",
    expertise: ["Program Management", "Student Relations", "Administrative Operations", "Event Coordination"],
    socialLinks: {
      linkedin: "https://linkedin.com",
    },
  },
];

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getTeamMembersByRole(role: string): TeamMember[] {
  return teamMembers.filter((member) => member.role.includes(role));
}
