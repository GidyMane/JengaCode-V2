export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage?: string;
  date: string;
  category: "news" | "tutorial" | "success-story" | "announcement" | "insight";
  featured?: boolean;
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "summer-camp-announcement-2025",
    title: "Introducing JengaCode Summer Camp 2025",
    slug: "summer-camp-2025",
    excerpt:
      "Get ready for the most exciting coding adventure of the year! Join us August 8-9 for an unforgettable experience.",
    content: `# JengaCode Summer Camp 2025

We're thrilled to announce the return of JengaCode Summer Camp 2025! This year promises to be bigger and better than ever.

## What to Expect

- **Two Full Days** of intensive learning and fun
- **Multiple Tracks** for different age groups and skill levels
- **Hands-on Workshops** in Robotics, Scratch, Web Development, and more
- **Team Projects** where you'll collaborate with other young innovators
- **Project Showcase** where you'll present your creations
- **Prizes and Recognition** for outstanding projects

## Event Details

- **Dates:** August 8-9, 2025
- **Time:** 9:00 AM - 4:00 PM each day
- **Location:** JengaCode Innovation Hub, Nairobi
- **Age Groups:** All ages 5-17

## What's Included

- All materials and equipment
- Lunch and snacks
- Certificate of completion
- Exclusive JengaCode merchandise
- Lifetime access to camp resources

Early bird registration is now open! Secure your spot today as spaces fill up quickly.

[Register Now →](#)`,
    image: "/images/blog/summer-camp-2025.jpg",
    author: "JengaCode Team",
    date: "2025-05-15",
    category: "announcement",
    featured: true,
    readingTime: 4,
  },
  {
    id: "robotics-transforms-school-participation",
    title: "How Robotics Education is Transforming School Participation",
    slug: "robotics-transforms-education",
    excerpt:
      "Learn how our robotics programs have changed the way students approach problem-solving and STEM education.",
    content: `# How Robotics Education is Transforming School Participation

Robotics has emerged as one of the most powerful tools for engaging students in STEM learning. At JengaCode, we've seen firsthand how hands-on robotics projects transform students' understanding and passion for technology.

## The Impact

Over the past year, our school robotics programs have reached over 500 students across Nairobi. The results speak for themselves:

- **95%** of participating students show improved problem-solving skills
- **87%** report increased interest in STEM careers
- **92%** complete their robotics projects with pride and excitement

## Why Robotics Works

Robotics combines multiple disciplines—programming, engineering, design, and teamwork. Unlike traditional coding lessons, robotics provides immediate, tangible feedback. When your robot moves correctly, you see it right away. This instant gratification keeps students motivated and engaged.

## Beyond the Classroom

Our programs don't just teach robotics; they teach students to think like engineers and innovators. They learn to:

- Break down complex problems into manageable steps
- Collaborate effectively with teammates
- Persist through challenges
- Celebrate each other's successes

## Looking Forward

We're expanding our school programs to reach more students across Kenya. By 2025, we aim to bring robotics education to 50+ schools, impacting over 1,000 young learners.

[Join us on this journey →](#)`,
    image: "/images/blog/robotics-impact.jpg",
    author: "Sarah Kipchoge",
    authorImage: "/images/team/sarah.jpg",
    date: "2025-04-20",
    category: "insight",
    featured: true,
    readingTime: 6,
  },
  {
    id: "student-success-story-alice",
    title: "From Curious to Creator: Alice's JengaCode Journey",
    slug: "alice-success-story",
    excerpt:
      "Meet Alice, a 12-year-old who went from coding novice to app developer in just 6 months at JengaCode.",
    content: `# From Curious to Creator: Alice's JengaCode Journey

Alice walked into JengaCode six months ago with zero coding experience and a lot of curiosity. Today, she's the creator of "SchoolBuddy," a mobile app designed to help students organize their assignments.

## The Beginning

"I honestly didn't know where to start," Alice recalls. "I'd heard about coding but thought it was only for kids in movies who were super smart. But the mentors at JengaCode made it feel accessible and fun."

Alice started with the Scratch program, learning the basics of logic and programming concepts through visual blocks. Within two weeks, she'd created her first interactive game. The confidence boost was immediate.

## The Breakthrough

Three months into her JengaCode journey, Alice decided to challenge herself with web development. "My biggest frustration as a student was managing homework and deadlines," she explains. "I wanted to build something that would help me and my friends."

Working with her mentor, Alex, Alice learned HTML, CSS, and JavaScript. The learning curve was steep, but with regular feedback and support from the JengaCode community, she pushed through.

## The Launch

After four months of development, testing, and refinement, SchoolBuddy was ready. The app features:

- Assignment tracking and reminders
- Subject organization
- Due date notifications
- Collaboration features for group projects

"Seeing my idea come to life was the most amazing feeling," Alice says. "I never thought I could build something like this."

## What's Next?

Alice is now mentoring younger students in the Scratch program and planning her next project—a platform to connect student coders with local nonprofits that need tech support.

## The Lesson

Alice's story is just one of many at JengaCode. It demonstrates what's possible when young people are given access to:

- **Expert Mentorship** - Guidance from experienced developers
- **Structured Learning** - Curriculum that builds progressively
- **Supportive Community** - Peers and mentors who celebrate wins
- **Real Project Opportunities** - Chances to build things that matter

If Alice can go from curious novice to published app creator in six months, what could you create?

[Start Your JengaCode Journey →](#)`,
    image: "/images/blog/alice-app.jpg",
    author: "James Mwangi",
    authorImage: "/images/team/james.jpg",
    date: "2025-03-10",
    category: "success-story",
    readingTime: 8,
  },
  {
    id: "beginner-guide-scratch",
    title: "Beginner's Guide: Getting Started with Scratch",
    slug: "beginner-scratch-guide",
    excerpt: "New to coding? Learn how to create your first Scratch project in this comprehensive beginner's guide.",
    content: `# Beginner's Guide: Getting Started with Scratch

Scratch is the perfect starting point for young programmers. This free, visual programming language makes coding accessible, fun, and engaging for beginners of all ages.

## What is Scratch?

Scratch is a block-based programming language where you drag and drop code blocks instead of typing. It's intuitive, visual, and instant—you see your code run immediately.

## Getting Started

1. **Visit scratch.mit.edu** - It's completely free!
2. **Create an account** - Use your email or connect through Google
3. **Click "Create"** - Start your first project

## Your First Project

Let's create a simple interactive animation:

1. **Add a Sprite** - Click the sprite button and choose a character
2. **Add a Script** - From the "Scripts" tab, drag the "when green flag clicked" block
3. **Make it Move** - Add a "move" block
4. **Add Repetition** - Wrap it in a "repeat" loop
5. **Add Interactivity** - Use "if key pressed" blocks

## Key Concepts

- **Sprites** - Your characters or objects
- **Scripts** - Instructions that sprites follow
- **Loops** - Repeat actions without writing code multiple times
- **Conditions** - Make decisions in your program
- **Variables** - Store information your program can use

## Tips for Success

- **Start Simple** - Create one small thing before combining ideas
- **Experiment** - Try different blocks and see what happens
- **Save Often** - Don't lose your work!
- **Share Your Work** - Show your friends and get feedback
- **Join the Community** - Look at others' projects for inspiration

## Next Steps

Once you're comfortable with basics, explore:
- Drawing and painting tools
- Sound and music
- Advanced variables and lists
- Cloud variables for multiplayer games

[Start Creating Now →](#)`,
    image: "/images/blog/scratch-guide.jpg",
    author: "Emma Njeri",
    authorImage: "/images/team/emma.jpg",
    date: "2025-02-28",
    category: "tutorial",
    readingTime: 5,
  },
  {
    id: "jengacode-reaches-5-counties",
    title: "JengaCode Expands: Now Reaching 5+ Counties Across Kenya",
    slug: "expansion-5-counties",
    excerpt:
      "Exciting news! JengaCode is expanding its reach to bring coding education to more young minds across Kenya.",
    content: `# JengaCode Expands: Now Reaching 5+ Counties

We're proud to announce that JengaCode has expanded its programs to reach students in 5+ counties across Kenya! This is a major milestone in our mission to democratize access to tech education.

## Where We're Now Operating

- **Nairobi County** - Our home base with 15+ locations
- **Kiambu County** - 5 school partnerships
- **Nakuru County** - Expanding partnerships
- **Kisumu County** - New partnerships launching this quarter
- **Mombasa County** - Coastal expansion initiative

## What This Means

This expansion allows us to:

- Reach over 2,000 students annually
- Partner with 50+ schools
- Employ 30+ experienced mentors and instructors
- Provide diverse program options (in-person and online)

## Our Growth Numbers

- **Students Trained:** 1,500+
- **Schools Partnered:** 45
- **Mentors & Instructors:** 28
- **Programs Offered:** 8 different tracks

## Thank You

None of this would be possible without:

- Our amazing mentors and volunteers
- Partner schools and their administrators
- Supportive families and students
- Community partners and sponsors

[Learn More About Our Programs →](#)`,
    image: "/images/blog/expansion-counties.jpg",
    author: "David Kariuki",
    authorImage: "/images/team/david.jpg",
    date: "2025-01-15",
    category: "news",
    readingTime: 4,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getRecentBlogPosts(count: number): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}
