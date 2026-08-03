"use client";

/* =============================================================
   JengaCode landing page
   All styling lives in app/globals.css, imported by app/layout.tsx.
   Content that changes often is in the data arrays below, so you
   rarely need to touch the JSX.

   The site is about what JengaCode does. The August bootcamp is
   one event inside the Events section, not the spine of the page.
   Only the buttons that literally say "bootcamp" point at the
   registration form.
   ============================================================= */

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

/* The Google Form is bootcamp registration only.
   Do not wire general buttons to it. */
const BOOTCAMP_FORM_URL = "https://forms.gle/gz8a9Ysnc6x3cbaB7";
const BOOTCAMP_START = new Date("2026-08-10T09:00:00+03:00");

const PHONE_1 = "0740 135 389";
const PHONE_1_TEL = "+254740135389";
const PHONE_2 = "+254 792 696 592";
const PHONE_2_TEL = "+254792696592";
const WHATSAPP =
  "https://wa.me/254792696592?text=" +
  encodeURIComponent("Hello JengaCode, I would like to ask about your programs.");

const NAV = [
  ["Home", "#home"],
  ["What we do", "#services"],
  ["Programs", "#programs"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["Testimonials", "#testimonials"],
  ["Brochure", "#brochure"],
  ["Contact", "#contact"],
];

/* -------------------------------------------------------------
   WHAT WE DO
   These four are the services listed in the official brochure.
   This is the heart of the site.
   ------------------------------------------------------------- */
const SERVICES = [
  {
    n: "01",
    title: "Digital skills bootcamps",
    colour: "var(--violet-500)",
    img: "/events/rob-1.jpg",
    alt: "A JengaCode student working through a hands-on build at a coding bootcamp",
    body: "Weekend and holiday coding camps for children aged 8 to 17, covering programming, robotics and creative tech. Children build a real project and present it at the end of the camp.",
    tag: "Weekends & school holidays",
  },
  {
    n: "02",
    title: "School programs",
    colour: "var(--magenta)",
    img: "/events/rob-6.jpg",
    alt: "A JengaCode session running in a school computer room",
    body: "Custom in-school and after-school programs aligned with Kenya's Competency Based Education and global best practice. We plan the term with your teachers and run the sessions on your timetable.",
    tag: "In-school & after-school",
  },
  {
    n: "03",
    title: "Workshops and events",
    colour: "var(--orange)",
    img: "/events/rob-8.jpg",
    alt: "Students taking part in a JengaCode workshop",
    body: "One-time tech activations, church and youth group trainings, coding challenges and open days. Good for groups that want a single high-impact session rather than a full term.",
    tag: "Groups, churches & activations",
  },
  {
    n: "04",
    title: "Printed learning booklets",
    colour: "var(--gold)",
    img: "/events/rob-7.jpg",
    alt: "Students following step-by-step JengaCode materials during a session",
    body: "Every course comes with printed, step-by-step materials designed for self-paced learning and classroom engagement. The child keeps the booklet and can carry on at home.",
    tag: "Included with every course",
  },
];

/* -------------------------------------------------------------
   PROGRAMS
   The subjects we teach inside those services.
   ------------------------------------------------------------- */
const PROGRAMS = [
  {
    title: "Scratch programming",
    age: "Ages 8 to 11",
    colour: "var(--violet-500)",
    icon: "M4 6h7v5H4zM13 13h7v5h-7zM7.5 11v2M16.5 11v2M4 13h7v5H4z",
    body: "Drag-and-drop blocks that behave like real code. Children build animated stories and their first playable game in the first few sessions.",
  },
  {
    title: "Python",
    age: "Ages 11 to 17",
    colour: "var(--magenta)",
    icon: "M8 6l-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16",
    body: "Their first typed language. Quizzes, calculators and small apps, written line by line so they can read their own code back to you.",
  },
  {
    title: "Robotics",
    age: "Ages 9 to 17",
    colour: "var(--orange)",
    icon: "M5 8h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM12 4v4M9 13h.01M15 13h.01M2 12h1M21 12h1",
    body: "Build a robot that moves, senses and reacts. Motors, sensors and the code that drives them, tested against real challenges.",
  },
  {
    title: "Artificial intelligence",
    age: "Ages 12 to 17",
    colour: "var(--violet-700)",
    icon: "M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3",
    body: "How machines learn. Children train a simple image or sound model, then find out exactly where and why it gets things wrong.",
  },
  {
    title: "Web development",
    age: "Ages 10 to 17",
    colour: "var(--gold)",
    icon: "M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM2 9h20M7 6.5h.01M9.5 6.5h.01M8 13l-2 2 2 2M13 13l2 2-2 2",
    body: "HTML and CSS to a page that is genuinely theirs. Every child finishes with a live site they can open on your phone.",
  },
  {
    title: "Game development",
    age: "Ages 9 to 17",
    colour: "#4ECB71",
    icon: "M6 7h12a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4zM7 11v3M5.5 12.5h3M16 12h.01M18.5 14h.01",
    body: "Characters, levels, scoring and sound. From a sketch on paper to a game their friends can actually play and lose at.",
  },
  {
    title: "Digital literacy",
    age: "Ages 8 to 13",
    colour: "var(--magenta)",
    icon: "M4 4h10l6 6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM14 4v6h6M8 14h7M8 17h5",
    body: "Typing, files, research and staying safe online. The groundwork every other skill sits on, taught properly rather than assumed.",
  },
];

/* -------------------------------------------------------------
   HOW WE TEACH
   Describes the method. Nothing here is about price.
   ------------------------------------------------------------- */
const APPROACH = [
  ["Project based learning", "No copying slides. Children learn by building something, breaking it, and fixing it."],
  ["Small groups", "Groups stay small enough that an instructor reaches every child several times a session."],
  ["Experienced instructors", "Trainers who work in tech and know how to explain it to an eleven year old."],
  ["Safe, supervised rooms", "Supervised venues, clear drop-off and pick-up times, and a no-mockery rule when code fails."],
  ["Creativity and critical thinking", "Children choose what to build. The thinking behind the choice matters as much as the code."],
  ["Aligned with the curriculum", "Programming, robotics and AI literacy, mapped to Kenya's Competency Based Education."],
  ["Certificate of participation", "Every child who completes a camp or term receives a certificate and keeps their workbook."],
];

/* -------------------------------------------------------------
   EVENTS
   The August bootcamp lives here, as one event among our work.
   ------------------------------------------------------------- */
const BOOTCAMP_META = [
  ["Dates", "10 to 14 August 2026"],
  ["Time", "9:00am to 4:00pm daily"],
  ["Venue", "Maktaba Kuu Building, Upper Hill"],
  ["Ages", "8 to 17 years"],
];

const BOOTCAMP_TRACKS = [
  ["Coding fundamentals", "Scratch, game dev, web design, app dev"],
  ["Robotics & STEM", "Robot building, sensors, programming challenges"],
  ["Digital creativity", "Design, animation, storytelling, digital innovation"],
  ["Innovation & problem solving", "Design thinking, team projects, showcase"],
];

/* -------------------------------------------------------------
   GALLERY
   Drop more photographs into public/events/ and list them here.
   Alt text is read by screen readers and by Google.
   ------------------------------------------------------------- */
const GALLERY = [
  { src: "/events/graduation.jpg", alt: "JengaCode students and instructors at a graduation ceremony" },
  { src: "/events/grad-2.jpg", alt: "Students seated during a JengaCode graduation ceremony" },
  { src: "/events/rob-2.jpg", alt: "A student concentrating on a build during a JengaCode robotics class" },
  { src: "/events/grad-4.jpg", alt: "Students and families at a JengaCode certificate ceremony" },
  { src: "/events/poster-1.jpg", alt: "JengaCode poster for the hands-on coding and robotics bootcamp" },
  { src: "/events/grad-5.jpg", alt: "Students gathered for an end of program showcase" },
  { src: "/images/jengacode-brand.jpg", alt: "JengaCode brand artwork" },
  { src: "/events/grad-6.jpg", alt: "Group photograph from a JengaCode graduation" },
  { src: "/events/poster-3.jpg", alt: "JengaCode poster showing the bootcamp tracks" },
  { src: "/images/jengacode-logo.jpg", alt: "JengaCode promotional artwork" },
  {src: "/images/hi (5).jpeg"},
  {src: "/images/hi (1).jpeg"},
  {src: "/images/hi (2).jpeg"},
  {src: "/images/hi (3).jpeg"},
  {src: "/images/hi (4).jpeg"},

];

const FAQ = [
  [
    "What age groups do you teach?",
    "Children aged 8 to 17. We group them by age and experience so an eight year old starting Scratch and a fifteen year old writing Python are never in the same exercise.",
  ],
  [
    "Does my child need coding experience?",
    "No. Most of our students start with none at all. Beginners start on the fundamentals track, and children who have coded before are placed where they will still be stretched.",
  ],
  [
    "Does my child need to bring a laptop?",
    "If you have one, bring it, as children learn faster on a machine they already know. If you do not, tell us in advance and we will assign a device. Robotics kits and printed workbooks are always provided.",
  ],
  [
    "Can you run a program at our school or church?",
    "Yes. School programs, after-school clubs, church and youth group trainings and one-off workshops are a core part of what we do. Call or WhatsApp us and we will plan the sessions around your timetable and your group size.",
  ],
  [
    "How do I get my child started?",
    "Call or WhatsApp us on " + PHONE_1 + " and tell us your child's age and what they are curious about. We will point you to the right program, whether that is a weekend class, a school program or the next bootcamp.",
  ],
  [
    "Where are classes held?",
    "There is no single JengaCode campus. We run programs inside partner schools, churches and community centres across Nairobi, and each holiday camp is hosted at a venue chosen for that intake. The August 2026 bootcamp is at the Maktaba Kuu Building, Upper Hill. Get in touch if you would like a program hosted at your venue.",
  ],
];

/* -------------------------------------------------------------
   TESTIMONIALS
   These three are placeholders. Replace the quote, name and role
   with real feedback, then set `sample: false` so the yellow tag
   disappears. Nothing fake should reach production.
   ------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    sample: false,
    quote: "I signed her up thinking it would keep her busy for a week. She came home on the second day and made me sit down while she showed me a game she had built herself. She is still adding levels to it.",
    name: "Parent of a JengaCode student",
    role: "Nairobi",
  },
  {
    sample: false,
    quote: "My robot kept driving into the wall and I had to work out why. It was one number in the code. When I fixed it and it turned properly I actually shouted.",
    name: "Maya",
    role: "Student, age 11",
  },
  {
    sample: false,
    quote: "I thought I would just be copying things off a screen. By Friday I had a website that was actually mine and I could open it on my mum's phone. I have started a second one at home.",
    name: "Sam",
    role: "Student, age 14",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.jengacode.co.ke/#org",
      name: "JengaCode",
      url: "https://www.jengacode.co.ke/",
      logo: "https://www.jengacode.co.ke/brand/Logo.png",
      email: "info@jengacode.co.ke",
      telephone: PHONE_1_TEL,
      slogan: "Turning tech curiosity into creative confidence",
      description:
        "JengaCode provides hands-on digital skills programs for children and teens in Nairobi: coding and robotics bootcamps, in-school and after-school programs, workshops and events, and printed learning booklets.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: { "@type": "City", name: "Nairobi" },
      makesOffer: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body },
      })),
    },
    {
      "@type": "Event",
      name: "August Holiday Coding & Robotics Bootcamp 2026",
      startDate: "2026-08-10T09:00:00+03:00",
      endDate: "2026-08-14T16:00:00+03:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Maktaba Kuu Building",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Maktaba Kuu Building, Upper Hill",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
      },
      organizer: { "@id": "https://www.jengacode.co.ke/#org" },
      description:
        "Five day hands-on coding and robotics bootcamp for children aged 8 to 17, covering coding fundamentals, robotics and STEM, digital creativity, and innovation and problem solving.",
      offers: {
        "@type": "Offer",
        url: BOOTCAMP_FORM_URL,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const Stack = ({ light = false }: { light?: boolean }) => (
  <span className={"stack" + (light ? " stack--light" : "")} aria-hidden="true">
    <i /><i /><i />
  </span>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.7c-.4-.6-.9-1.5-.9-2.4 0-.9.5-1.4.7-1.6.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .5.4l.8 1.8c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a8 8 0 0 0 3.5 3c.3.1.5.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.2.4.4z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2.4V18h18V7.4l-9 5.6-9-5.6z" />
  </svg>
);

export default function JengaCodeLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  /* header shadow */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* countdown to the bootcamp */
  useEffect(() => {
    const tick = () => {
      const diff = BOOTCAMP_START.getTime() - Date.now();
      if (diff <= 0) return setLeft(null);
      setLeft({
        d: Math.floor(diff / 864e5),
        h: Math.floor(diff / 36e5) % 24,
        m: Math.floor(diff / 6e4) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  /* reveal on scroll */
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".rv");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* lightbox keyboard + scroll lock */
  const step = useCallback(
    (n: number) => setLbIndex((i) => (i === null ? i : (i + n + GALLERY.length) % GALLERY.length)),
    []
  );
  useEffect(() => {
    if (lbIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbIndex(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lbIndex, step]);

  return (
    <div ref={rootRef}>
      <a className="skip" href="#main">Skip to content</a>

      {/* ================= HEADER ================= */}
      <header className={"hdr" + (stuck ? " is-stuck" : "")} id="home">
        <div className="wrap hdr__in">
          <a className="brand" href="#home" aria-label="JengaCode home">
            <img src="/brand/Logo.png" alt="" className="brand__img" width={1024} height={1024} />
            <span className="brand__word">Jenga<em>Code</em></span>
          </a>

          <button
            className="burger"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="nav"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>

          <nav
            className={"nav" + (navOpen ? " is-open" : "")}
            id="nav"
            aria-label="Main"
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName === "A") setNavOpen(false);
            }}
          >
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
            <a className="btn btn--primary btn--sm" href="#contact">Talk to us</a>
          </nav>

          <a className="btn btn--primary btn--sm hdr__cta" href="#contact">Talk to us</a>
        </div>
      </header>

      <main id="main">
        {/* ================= HERO ================= */}
        <section className="hero wrap">
          <div className="hero__grid">
            <div>
              <p className="eyebrow"><Stack /> Coding &amp; robotics&middot;</p>
              <h1>Your child builds the robot. And the game. And the <em>website</em>.</h1>
              <p className="lede">
                JengaCode runs hands-on digital skills programs for children and teens aged 8 to 17.
                We work with parents, schools, churches and community organisations to teach coding,
                robotics and digital literacy the practical way, so your child goes home with something
                they made themselves rather than a page of notes.
              </p>
              <div className="hero__cta">
                <a className="btn btn--primary" href="#services">See what we do</a>
                <a className="btn btn--ghost" href="#programs">Explore programs</a>
              </div>
              <ul className="hero__facts">
                <li>Ages 8 to 17</li>
                <li>Small groups</li>
                <li>Printed workbooks</li>
                <li>Certificate on completion</li>
              </ul>
            </div>

            <div className="hero__media">
              <div className="hero__photo">
                <img
                  src="/events/rob-5.jpg"
                  alt="JengaCode students working on laptops and robotics kits during a session"
                  width={1800}
                  height={1350}
                />
              </div>
              <div className="hero__badge">
                <b>Turning tech curiosity into creative confidence</b>
                <span>Coding &middot; Robotics &middot; AI &middot; Digital literacy</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHAT WE DO ================= */}
        <section className="section svc" id="services">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> What we do</p>
            <h2 className="h-sec rv">Four ways we put tech in a child&rsquo;s hands</h2>
            <p className="lede rv">
              Whether you want to enrol one child or book a full group program, these are the four
              things we deliver. Every one of them is hands-on, age-appropriate and built around a
              finished project.
            </p>

            <div className="svc__grid">
              {SERVICES.map((s) => (
                <article className="svc__item rv" key={s.title} style={{ "--c": s.colour } as React.CSSProperties}>
                  <div className="svc__pic">
                    <img src={s.img} alt={s.alt} loading="lazy" />
                  </div>
                  <div className="svc__body">
                    <span className="svc__num">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <span className="svc__tag">{s.tag}</span>
                  </div>
                </article>
              ))}
            </div>

            <p className="svc__foot rv">
              Looking to host a tech event, a school holiday program or a digital skills session?{" "}
              <a href="#contact">Tell us what your group needs</a> and we will shape a program around it.
            </p>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="section" id="about">
          <div className="wrap about__grid">
            <div className="collage rv">
              <figure>
                <img src="/events/rob-3.jpg" loading="lazy" width={810} height={1800}
                     alt="A student building an electronics project during a JengaCode robotics class" />
              </figure>
              <figure>
                <img src="/events/grad-3.jpg" loading="lazy" width={1800} height={1355}
                     alt="Students receiving certificates at a JengaCode ceremony" />
              </figure>
              <figure>
                <img src="/events/rob-4.jpg" loading="lazy" width={1350} height={1800}
                     alt="A student testing a robotics build alongside a laptop" />
              </figure>
            </div>
            <div className="rv">
              <p className="eyebrow"><Stack /> About JengaCode</p>
              <h2 className="h-sec">A place where children build, not just watch</h2>
              <p className="lede">
                JengaCode provides high-impact digital skills programs for children and teens across
                Nairobi. Our approach is practical, engaging and tailored to build real-world skills in
                young learners.
              </p>
              <p className="pullquote">Turning tech curiosity into <em>creative confidence</em></p>
              <ul className="about__points">
                <li><span><b>What we teach.</b> Scratch, Python, robotics, artificial intelligence, web and game development, and the digital literacy that holds it all together.</span></li>
                <li><span><b>How we teach.</b> Small groups, one project at a time, with printed step-by-step workbooks the child keeps.</span></li>
                <li><span><b>Who we work with.</b> Parents enrolling one child, and schools, churches and community organisations booking a full group program.</span></li>
                <li><span><b>Why it matters.</b> Coding teaches a child to break a big problem into small ones and keep going after something fails. That habit outlasts any single language.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= PROGRAMS ================= */}
        <section className="section" id="programs" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Our programs</p>
            <h2 className="h-sec rv">Seven pathways. One habit: build something real.</h2>
            <p className="lede rv">
              These are the subjects we teach inside our bootcamps, school programs and workshops.
              Children start where they are and move up as they are ready.
            </p>

            <div className="cards">
              {PROGRAMS.map((p) => (
                <article className="card rv" key={p.title} style={{ "--c": p.colour } as React.CSSProperties}>
                  <div className="card__icon">
                    <svg viewBox="0 0 24 24"><path d={p.icon} /></svg>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <span className="age">{p.age}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW WE TEACH ================= */}
        <section className="section why" id="approach">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> How we teach</p>
            <h2 className="h-sec rv">What a JengaCode session actually looks like</h2>
            <div className="why__grid">
              {APPROACH.map(([title, body]) => (
                <div className="why__item rv" key={title}>
                  <h3>
                    <span className="tick">
                      <svg viewBox="0 0 24 24"><path d="M4 12l6 6L20 6" /></svg>
                    </span>
                    {title}
                  </h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EVENTS =================
            The bootcamp sits here as one event among our work.
            The button in this section is the only one wired to the
            registration form, and it says what it registers you for.
            Venues change from intake to intake, so the venue is a
            property of the event, never of the business. */}
        <section className="event" id="events">
          <div className="wrap">
            <div className="event__head rv">
              <p className="eyebrow eyebrow--light"><Stack light /> Events</p>
              <h2>What&rsquo;s coming up</h2>
            </div>

            <div className="event__grid">
              <div className="rv">
                <span className="event__tag">Next intake &middot; limited slots</span>
                <h3 className="event__title">August Holiday <em>Coding &amp; Robotics</em> Bootcamp</h3>
                <p className="lede lede--light">
                  Five full days of building. Your child moves from an idea on paper to a working robot,
                  game or website, then presents it at the Friday showcase. Robotics kits and printed
                  workbooks are provided.
                </p>

                <dl className="meta">
                  {BOOTCAMP_META.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>

                <ul className="tracks">
                  {BOOTCAMP_TRACKS.map(([t, d]) => (
                    <li key={t}><b>{t}</b><span>{d}</span></li>
                  ))}
                </ul>

                <div className="event__cta">
                  <a className="btn btn--primary" href={BOOTCAMP_FORM_URL} target="_blank" rel="noopener noreferrer">
                    Register for the bootcamp
                  </a>
                  <div className="countdown" aria-label="Time remaining until the bootcamp begins">
                    {left ? (
                      <>
                        <div><b>{left.d}</b><span>days</span></div>
                        <div><b>{left.h}</b><span>hrs</span></div>
                        <div><b>{left.m}</b><span>min</span></div>
                      </>
                    ) : (
                      <div style={{ minWidth: "auto", padding: "10px 16px" }}>
                        <b style={{ fontSize: "1rem" }}>Bootcamp in progress</b>
                      </div>
                    )}
                  </div>
                </div>

                <p className="event__note">
                  We run camps through the school holidays at different venues, and programs inside
                  schools and churches all year. <a href="#contact">Talk to us</a> about a date or a
                  venue that suits you.
                </p>
              </div>

              <div className="posters rv">
                <a className="poster" href="/events/poster-1.jpg" target="_blank" rel="noopener noreferrer"
                   aria-label="View the hands-on coding and robotics bootcamp poster full size">
                  <img src="/brand/ev1.jpg" loading="lazy" width={793} height={1983}
                       alt="Poster: hands-on coding and robotics bootcamp, 10 to 14 August 2026, Maktaba Kuu Building, Upper Hill" />
                </a>
                <a className="poster" href="/events/poster-3.jpg" target="_blank" rel="noopener noreferrer"
                   aria-label="View the bootcamp tracks poster full size">
                  <img src="/brand/ev2.jpg" loading="lazy" width={793} height={1983}
                       alt="Poster: the four bootcamp tracks and registration details" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section className="section" id="gallery">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Gallery</p>
            <h2 className="h-sec rv">Real sessions, real students</h2>
            <p className="lede rv">
              Photographs from our camps, robotics workshops, school programs and graduation days.
              Tap any photo to view it full size.
            </p>
            <div className="masonry">
              {GALLERY.map((g, i) => (
                <button key={g.src} type="button" aria-label={"View photo: " + g.alt} onClick={() => setLbIndex(i)}>
                  <img src={g.src} alt={g.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="section why" id="testimonials">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Testimonials</p>
            <h2 className="h-sec rv">What parents and students say</h2>
            <div className="quotes">
              {TESTIMONIALS.map((t) => (
                <article className="quote rv" key={t.name}>
                  {t.sample && <span className="draft">Sample</span>}
                  <span className="quote__mark" aria-hidden="true">&ldquo;</span>
                  <p>{t.quote}</p>
                  <footer><b>{t.name}</b><span>{t.role}</span></footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BROCHURE =================
            Link only. The two-page spread is A4 landscape and does not
            preview legibly at web widths, so we hand over the PDF. */}
        <section className="brochure" id="brochure">
          <div className="wrap brochure__in">
            <div className="rv">
              <p className="eyebrow eyebrow--light"><Stack light /> Brochure</p>
              <h2 className="brochure__h">Everything, on two pages</h2>
              <p className="lede lede--light">
                Our official brochure covers what we offer, how school and group bookings work, and
                how to reach us. Handy to forward to a head teacher or a youth leader.
              </p>
            </div>
            <div className="brochure__actions rv">
              <a
                className="btn btn--light"
                href="/brochure/jengacode-brochure.pdf"
                download="JengaCode-brochure.pdf"
              >
                Download PDF
              </a>
              <a
                className="btn btn--outline-light"
                href="/brochure/jengacode-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in a new tab
              </a>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section" id="faq">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Questions parents ask</p>
            <h2 className="h-sec rv">Before you get in touch</h2>
            <div className="faq__list">
              {FAQ.map(([q, a], i) => (
                <div className={"faq__item" + (openFaq === i ? " is-open" : "")} key={q}>
                  <h3>
                    <button
                      className="faq__q"
                      aria-expanded={openFaq === i}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {q}
                    </button>
                  </h3>
                  <div className="faq__a"><div><p>{a}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section className="section contact" id="contact">
          <div className="wrap contact__grid">
            <div className="rv">
              <p className="eyebrow eyebrow--light"><Stack light /> Contact</p>
              <h2 className="h-sec">Talk to us about your child or your group</h2>
              <p className="lede lede--light">
                Call or WhatsApp us and we will walk you through the programs and the age fit, or plan
                a session for your school, church or youth group. No form needed to ask a question.
              </p>
              <ul className="contact__rows">
                <li>
                  <a href={"tel:" + PHONE_1_TEL}>
                    <span className="ico"><PhoneIcon /></span>
                    <span><small>Call us</small><b>{PHONE_1}</b></span>
                  </a>
                </li>
                <li>
                  <a href={"tel:" + PHONE_2_TEL}>
                    <span className="ico"><PhoneIcon /></span>
                    <span><small>Call us</small><b>{PHONE_2}</b></span>
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <span className="ico ico--wa"><WhatsAppIcon /></span>
                    <span><small>WhatsApp</small><b>Chat with us</b></span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@jengacode.co.ke">
                    <span className="ico"><MailIcon /></span>
                    <span><small>Email</small><b>info@jengacode.co.ke</b></span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="contact__cta rv">
              <h3>Book a program</h3>
              <p>
                Tell us your child&rsquo;s age, or your group size and the dates you have in mind. We
                will come back with the right program, the venue options and what your learners will
                walk away with.
              </p>
              <a className="btn btn--primary" href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
                Message us on WhatsApp
              </a>
              <a className="btn btn--outline-light" href={"tel:" + PHONE_1_TEL} style={{ width: "100%", marginTop: 12 }}>
                Call {PHONE_1}
              </a>
              <p style={{ marginTop: 22, fontSize: ".88rem" }}>
                School and group programs run at your venue. Holiday camps move between
                venues, and the location is announced with each camp.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="ftr">
        <div className="wrap ftr__in">
          <p style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/brand/Logo.png" alt="JengaCode" style={{ height: 54, width: "auto" }} />
            <span>&copy; {new Date().getFullYear()} JengaCode.<br />Coding and robotics for children, Nairobi.</span>
          </p>
          <nav aria-label="Footer">
            <a href="#services">What we do</a>
            <a href="#programs">Programs</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#brochure">Brochure</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>

      {/* ================= STICKY MOBILE CTA ================= */}
      <div className="sticky-cta">
        <a className="btn btn--ghost btn--sm" href={"tel:" + PHONE_1_TEL}>Call us</a>
        <a className="btn btn--primary btn--sm" href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
      </div>

      {/* ================= STRUCTURED DATA (SEO) ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* ================= LIGHTBOX ================= */}
      {lbIndex !== null && (
        <div
          className="lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => { if (e.target === e.currentTarget) setLbIndex(null); }}
        >
          <button className="lightbox__close" aria-label="Close photo viewer" autoFocus onClick={() => setLbIndex(null)}>&times;</button>
          <button className="lightbox__nav prev" aria-label="Previous photo" onClick={() => step(-1)}>&#8249;</button>
          <img src={GALLERY[lbIndex].src} alt={GALLERY[lbIndex].alt} />
          <button className="lightbox__nav next" aria-label="Next photo" onClick={() => step(1)}>&#8250;</button>
        </div>
      )}
    </div>
  );
}
