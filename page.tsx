"use client";

/* =============================================================
   JengaCode landing page
   Drop-in replacement for app/page.tsx.
   All styling lives in ./jengacode.css, which is shared with
   preview.html so the two never drift apart.
   ============================================================= */

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import "./jengacode.css";

const REGISTER_URL = "https://forms.gle/gz8a9Ysnc6x3cbaB7";
const CAMP_START = new Date("2026-08-10T09:00:00+03:00");

/* -------------------------------------------------------------
   Gallery
   Add more photographs to public/photos/ and list them here.
   The alt text is read by screen readers and by Google, so
   describe what is actually in the picture.
   ------------------------------------------------------------- */
const GALLERY = [
  {
    src: "/photos/student-lab.jpg",
    alt: "A JengaCode student building an electronics project beside his laptop in the computer lab",
  },
  {
    src: "/photos/arduino-hands.jpg",
    alt: "A student pointing at a lit LED on an Arduino board during a robotics class",
  },
  {
    src: "/photos/code-screen.jpg",
    alt: "A laptop showing code written by a student during a JengaCode session",
  },
  {
    src: "/photos/laptop-board.jpg",
    alt: "A microcontroller board wired to a laptop on a workbench",
  },
  {
    src: "/photos/board-closeup.jpg",
    alt: "Close-up of a circuit board and jumper wires mid-build",
  },
  {
    src: "/events/poster-bootcamp.jpg",
    alt: "Poster for the Hands-on Coding and Robotics Bootcamp 2026",
  },
  {
    src: "/events/poster-summer.jpg",
    alt: "Poster for the Summer Coding and Bootcamp 2026",
  },
];

const NAV = [
  ["Home", "#home"],
  ["Programs", "#programs"],
  ["Events", "#event"],
  ["Gallery", "#gallery"],
  ["Testimonials", "#testimonials"],
  ["Brochure", "#brochure"],
  ["Contact", "#contact"],
];

const CAMP_META = [
  ["Dates", "10 \u2013 14 August 2026"],
  ["Time", "9:00am to 4:00pm daily"],
  ["Venue", "Maktaba Kuu Building, Upper Hill"],
  ["Ages", "8 to 17 years"],
];

const TRACKS = [
  ["Coding fundamentals", "Scratch, game dev, web design, app dev"],
  ["Robotics & STEM", "Robot building, sensors, programming challenges"],
  ["Digital creativity", "Design, animation, storytelling, digital innovation"],
  ["Innovation & problem solving", "Design thinking, team projects, showcase"],
];

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

const WHY = [
  ["Project based learning", "No copying slides. Children learn by building something, breaking it, and fixing it."],
  ["Small class sizes", "Groups stay small enough that an instructor reaches every child several times a session."],
  ["Experienced instructors", "Trainers who work in tech and know how to explain it to an eleven year old."],
  ["Safe, supportive rooms", "Supervised venues, clear drop-off and pick-up times, and a no-mockery rule when code fails."],
  ["Creativity and critical thinking", "Children choose what to build. The thinking behind the choice matters as much as the code."],
  ["Future ready skills", "Programming, robotics and AI literacy, aligned with the Competency Based Curriculum."],
  ["Certificate of participation", "Every child who completes a camp or term receives a certificate and keeps their workbook."],
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
    "If you have one, bring it, as children learn faster on a machine they already know. If you do not, tell us when you register and we will assign a device. Robotics kits and printed workbooks are always provided.",
  ],
  [
    "How do I register?",
    "Fill in the registration form on this page, which takes about two minutes. We confirm your child's slot by phone or WhatsApp and send you the joining details. You can also call or WhatsApp us directly on 0740 135 389.",
  ],
  [
    "Where are classes held?",
    "The August holiday camp runs at the Maktaba Kuu Building, Upper Hill, Nairobi. We also run programs inside partner schools, churches and community centres. Get in touch if you would like a program hosted at your school.",
  ],
  [
    "What actually happens during a holiday camp?",
    "Five days, 9am to 4pm. Mornings cover a new skill, afternoons are spent building with it. Children rotate through coding, robotics, digital creativity and problem solving, then present their finished project at the Friday showcase and receive a certificate.",
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
    sample: true,
    quote: "Placeholder quote from a parent about what changed for their child after the camp. Two or three sentences works best.",
    name: "Parent name",
    role: "Parent of a student, age 10",
  },
  {
    sample: true,
    quote: "Placeholder quote from a student describing the project they built and what they enjoyed most.",
    name: "Student name",
    role: "Student, age 13",
  },
  {
    sample: true,
    quote: "Placeholder quote from a school or church partner about running a JengaCode program with their group.",
    name: "Partner name",
    role: "Role, organisation",
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
      logo: "https://www.jengacode.co.ke/brand/logo-full.png",
      email: "info@jengacode.co.ke",
      telephone: "+254740135389",
      description:
        "Coding, robotics, AI and digital skills programs for children aged 8 to 17 in Nairobi, Kenya.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Maktaba Kuu Building, Upper Hill",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
    {
      "@type": "Event",
      name: "August Holiday Coding & Robotics Camp 2026",
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
        "Five day hands-on coding and robotics camp for children aged 8 to 17, covering coding fundamentals, robotics and STEM, digital creativity, and innovation and problem solving.",
      offers: { "@type": "Offer", url: REGISTER_URL, availability: "https://schema.org/InStock" },
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

  /* countdown to the camp */
  useEffect(() => {
    const tick = () => {
      const diff = CAMP_START.getTime() - Date.now();
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
            <img src="/brand/logo-mark.png" alt="" className="brand__img" width={539} height={372} />
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
            <a className="btn btn--primary btn--sm" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Register now
            </a>
          </nav>

          <a className="btn btn--primary btn--sm hdr__cta" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
            Register now
          </a>
        </div>
      </header>

      <main id="main">
        {/* ================= HERO ================= */}
        <section className="hero wrap">
          <div className="hero__grid">
            <div>
              <p className="eyebrow"><Stack /> Coding &amp; robotics academy &middot; Nairobi</p>
              <h1>Your child builds the robot. And the game. And the <em>website</em>.</h1>
              <p className="lede">
                JengaCode teaches coding, robotics and AI to children aged 8 to 17. Every session is
                hands-on, so your child goes home with something they made themselves, not just notes.
              </p>
              <div className="hero__cta">
                <a className="btn btn--primary" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Register now</a>
                <a className="btn btn--ghost" href="#programs">Explore programs</a>
              </div>
              <ul className="hero__facts">
                <li>Ages 8 to 17</li>
                <li>Small class sizes</li>
                <li>Certificate on completion</li>
                <li>Maktaba Kuu, Upper Hill</li>
              </ul>
            </div>

            <div className="hero__media">
              <div className="hero__photo">
                <img
                  src="/photos/student-lab.jpg"
                  alt="A JengaCode student building an electronics project beside his laptop in the computer lab"
                  width={1600}
                  height={1067}
                />
              </div>
              <div className="hero__badge">
                <b>August Holiday Camp is open</b>
                <span>10 to 14 August 2026 &middot; 9am to 4pm &middot; Maktaba Kuu Building, Upper Hill</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED EVENT ================= */}
        <section className="event" id="event">
          <div className="wrap">
            <div className="event__grid">
              <div className="posters rv">
                <a className="poster" href="/events/poster-bootcamp.jpg" target="_blank" rel="noopener noreferrer"
                   aria-label="View the Hands-on Coding and Robotics Bootcamp poster">
                  <img src="/events/poster-bootcamp.jpg" loading="lazy" width={1400} height={1400}
                       alt="Poster: Hands-on Coding and Robotics Bootcamp 2026, August 10 to 14, Maktaba Kuu Building, Upper Hill" />
                </a>
                <a className="poster" href="/events/poster-summer.jpg" target="_blank" rel="noopener noreferrer"
                   aria-label="View the Summer Coding Bootcamp poster">
                  <img src="/events/poster-summer.jpg" loading="lazy" width={1280} height={1280}
                       alt="Poster: Summer Coding and Bootcamp 2026 showing the four camp tracks and registration details" />
                </a>
              </div>

              <div className="rv">
                <p className="eyebrow eyebrow--light"><Stack light /> Next intake &middot; limited slots</p>
                <h2>August Holiday <em>Coding &amp; Robotics</em> Camp</h2>
                <p className="lede lede--light">
                  Five full days of building. Your child moves from an idea on paper to a working robot,
                  game or website, then presents it at the Friday showcase. Robotics kits and printed
                  workbooks are provided.
                </p>

                <dl className="meta">
                  {CAMP_META.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>

                <ul className="tracks">
                  {TRACKS.map(([t, d]) => (
                    <li key={t}><b>{t}</b><span>{d}</span></li>
                  ))}
                </ul>

                <div className="event__cta">
                  <a className="btn btn--primary" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Reserve your child&rsquo;s slot
                  </a>
                  <div className="countdown" aria-label="Time remaining until the camp begins">
                    {left ? (
                      <>
                        <div><b>{left.d}</b><span>days</span></div>
                        <div><b>{left.h}</b><span>hrs</span></div>
                        <div><b>{left.m}</b><span>min</span></div>
                      </>
                    ) : (
                      <div style={{ minWidth: "auto", padding: "10px 16px" }}>
                        <b style={{ fontSize: "1rem" }}>Camp in progress</b>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="section" id="about">
          <div className="wrap about__grid">
            <div className="collage rv">
              <figure>
                <img src="/photos/arduino-hands.jpg" loading="lazy" width={1600} height={1067}
                     alt="A student pointing at a lit LED on an Arduino board during a robotics class" />
              </figure>
              <figure>
                <img src="/photos/laptop-board.jpg" loading="lazy" width={1600} height={1067}
                     alt="A microcontroller board wired to a laptop on a workbench" />
              </figure>
              <figure>
                <img src="/photos/board-closeup.jpg" loading="lazy" width={1600} height={1067}
                     alt="Close-up of a circuit board and jumper wires mid-build" />
              </figure>
            </div>
            <div className="rv">
              <p className="eyebrow"><Stack /> About JengaCode</p>
              <h2 className="h-sec">A place where children build, not just watch</h2>
              <p className="lede">
                JengaCode runs practical digital skills programs for children and teens across Nairobi.
                We work with parents, schools, churches and community organisations to deliver hands-on
                learning in coding, robotics and digital literacy.
              </p>
              <p className="pullquote">Turning tech curiosity into <em>creative confidence</em></p>
              <ul className="about__points">
                <li><span><b>What we teach.</b> Scratch, Python, robotics, artificial intelligence, web and game development, and the digital literacy that holds it all together.</span></li>
                <li><span><b>How we teach.</b> Small groups, one project at a time, with printed step-by-step workbooks the child keeps.</span></li>
                <li><span><b>Why it matters.</b> Coding teaches a child to break a big problem into small ones and keep going after something fails. That habit outlasts any single language.</span></li>
                <li><span><b>Where we work.</b> Holiday camps and weekend classes, plus in-school and after-school programs aligned with Kenya&rsquo;s Competency Based Curriculum.</span></li>
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
              Children start where they are and move up as they are ready. Every pathway ends with a
              finished project your child can show you.
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

        {/* ================= WHY PARENTS ================= */}
        <section className="section why">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Why parents choose us</p>
            <h2 className="h-sec rv">What you are actually paying for</h2>
            <div className="why__grid">
              {WHY.map(([title, body]) => (
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

        {/* ================= GALLERY ================= */}
        <section className="section" id="gallery">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Gallery</p>
            <h2 className="h-sec rv">Real sessions, real students</h2>
            <p className="lede rv">
              Photographs from our camps, robotics workshops and school programs. Tap any photo to view
              it full size.
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

        {/* ================= BROCHURE ================= */}
        <section className="section brochure" id="brochure">
          <div className="wrap brochure__grid">
            <div className="rv">
              <p className="eyebrow eyebrow--light"><Stack light /> Brochure</p>
              <h2 className="h-sec">Everything, on two pages</h2>
              <p className="lede lede--light">
                Our official brochure covers the programs, the age groups, how school and church bookings
                work, and how to reach us. Read it here or save a copy to share.
              </p>
              <div style={{ marginTop: 30 }}>
                <a className="btn btn--light" href="/brochure/jengacode-brochure.pdf" download>Download brochure</a>
                <a className="btn btn--outline-light" href="/brochure/jengacode-brochure.pdf" target="_blank" rel="noopener noreferrer">
                  Open full screen
                </a>
              </div>
            </div>
            <div className="brochure__frame rv">
              <a href="/brochure/page-1.jpg" target="_blank" rel="noopener noreferrer">
                <img src="/brochure/page-1.jpg" loading="lazy"
                     alt="JengaCode brochure, outside spread: about us, contact details and website" />
              </a>
              <a href="/brochure/page-2.jpg" target="_blank" rel="noopener noreferrer">
                <img src="/brochure/page-2.jpg" loading="lazy"
                     alt="JengaCode brochure, inside spread: what we offer, why choose us and how to book a program" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section" id="faq">
          <div className="wrap">
            <p className="eyebrow rv"><Stack /> Questions parents ask</p>
            <h2 className="h-sec rv">Before you register</h2>
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
              <h2 className="h-sec">Talk to us before you decide</h2>
              <p className="lede lede--light">
                Call or WhatsApp us and we will walk you through the programs, the age fit and the dates.
                No form needed to ask a question.
              </p>
              <ul className="contact__rows">
                <li>
                  <a href="tel:+254740135389">
                    <span className="ico"><PhoneIcon /></span>
                    <span><small>Call us</small><b>0740 135 389</b></span>
                  </a>
                </li>
                <li>
                  <a href="tel:+254792696592">
                    <span className="ico"><PhoneIcon /></span>
                    <span><small>Call us</small><b>+254 792 696 592</b></span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/254740135389?text=Hello%20JengaCode%2C%20I%20would%20like%20to%20ask%20about%20the%20August%20holiday%20camp."
                     target="_blank" rel="noopener noreferrer">
                    <span className="ico ico--wa"><WhatsAppIcon /></span>
                    <span><small>WhatsApp</small><b>Chat with us</b></span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/254792696592?text=Hello%20JengaCode%2C%20I%20would%20like%20to%20register%20my%20child."
                     target="_blank" rel="noopener noreferrer">
                    <span className="ico ico--wa"><WhatsAppIcon /></span>
                    <span><small>WhatsApp</small><b>Register by chat</b></span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="contact__cta rv">
              <h3>Register for the August camp</h3>
              <p>
                Slots are limited and filled in the order they are confirmed. The form takes about two
                minutes and you can register more than one child on it.
              </p>
              <a className="btn btn--primary" href={REGISTER_URL} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
                Register now
              </a>
              <p style={{ marginTop: 22, fontSize: ".88rem" }}>
                Venue: Maktaba Kuu Building, Upper Hill, Nairobi<br />
                Email: <a href="mailto:info@jengacode.co.ke" style={{ color: "var(--gold)" }}>info@jengacode.co.ke</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="ftr">
        <div className="wrap ftr__in">
          <p style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/brand/logo-full.png" alt="JengaCode" style={{ height: 54, width: "auto" }} />
            <span>&copy; {new Date().getFullYear()} JengaCode.<br />Coding and robotics for children, Nairobi.</span>
          </p>
          <nav aria-label="Footer">
            <a href="#programs">Programs</a>
            <a href="#event">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#brochure">Brochure</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>

      {/* ================= STICKY MOBILE CTA ================= */}
      <div className="sticky-cta">
        <a className="btn btn--ghost btn--sm" href="tel:+254740135389">Call us</a>
        <a className="btn btn--primary btn--sm" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Register now</a>
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
