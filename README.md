# JengaCode landing page redesign

Two builds of the same page, sharing one stylesheet so they cannot drift apart.

```
app/page.tsx        drop-in replacement for app/page.tsx in JengaCode-V2
app/jengacode.css   the whole design system, imported by page.tsx
preview.html        the same page as a standalone file, for showing the client
public/             every asset, already sized and optimised
```

`preview.html` needs no build step, so it is the fastest way to review the design or
send it to the client. `app/page.tsx` is what actually goes into the repo. Edit
`app/jengacode.css` and both change together.

---

## Dropping it into JengaCode-V2

1. Copy `app/page.tsx` and `app/jengacode.css` over `app/` in the repo.
2. Copy the contents of `public/` into the repo's `public/`.
3. Remove the global `<Navigation />` from `app/layout.tsx`. The landing page carries
   its own header now, and the old one would stack on top of it. If the inner pages
   still need it, render it per-page instead of in the layout.
4. Update the metadata in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.jengacode.co.ke"),
  title: "JengaCode | Coding & Robotics Academy for Children in Nairobi",
  description:
    "JengaCode teaches coding, robotics, AI and digital skills to children aged 8 to 17 in Nairobi. Hands-on classes, small groups, certificates. Register for the August Holiday Coding Camp at Maktaba Kuu.",
  icons: { icon: "/brand/icon.png" },
  openGraph: {
    title: "JengaCode | Coding & Robotics Academy for Children",
    description:
      "Hands-on coding and robotics for children aged 8 to 17 in Nairobi. Register for the August Holiday Coding Camp at Maktaba Kuu.",
    url: "https://www.jengacode.co.ke/",
    images: ["/events/poster-bootcamp.jpg"],
  },
};
```

Also drop `generator: "v0.dev"` while you are in there.

Organisation, Event and FAQPage structured data is rendered inside `page.tsx`, so
nothing else is needed for SEO.

The page type-checks clean under `strict: true` and needs no new dependencies. It
does not use framer-motion, Radix or Tailwind, so nothing else in the repo is
affected.

### Routes that no longer have a home

The redesign removes gamification and team profiles from the landing page, per the
brief. The underlying routes are untouched and still work if you link to them:
`/challenges`, `/blog`, `/dashboard`, `/admin`, `/attendance`. Decide separately
whether `/challenges` and the adventure and achievement components should stay in the
codebase at all, since nothing on the new homepage points at them.

---

## Fonts

`jengacode.css` pulls Bricolage Grotesque and Figtree from Google Fonts with an
`@import`, which works everywhere with no setup. For slightly faster first paint you
can switch to `next/font` in `app/layout.tsx` instead:

```tsx
import { Bricolage_Grotesque, Figtree } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const body    = Figtree({ subsets: ["latin"], variable: "--f-body" });
// add className={`${display.variable} ${body.variable}`} to <html>
```

Then delete the `@import` line and change `--display` and `--body` in `:root` to
`var(--f-display)` and `var(--f-body)`.

---

## What is in `public/`

| Path | Source |
|---|---|
| `brand/logo-mark.png` | The JJ mark, cropped from your logo. Used in the header. |
| `brand/logo-full.png` | Mark plus wordmark. **The wordmark is white**, so this only works on dark backgrounds. It is used in the footer. |
| `brand/icon.png` | 256px favicon, cropped from the same file. |
| `events/poster-bootcamp.jpg` | Your purple bootcamp poster, resized to 1400px. |
| `events/poster-summer.jpg` | Your white summer camp poster, 1280px. |
| `photos/*.jpg` | Five real photographs extracted from the brochure PDF at full resolution, resized to 1600px. |
| `brochure/jengacode-brochure.pdf` | Your brochure, untouched. |
| `brochure/page-1.jpg`, `page-2.jpg` | Rendered page images used for the on-page preview, so parents are not made to load an 8.5MB PDF just to look at it. The PDF itself stays one click away. |

Any image that goes missing renders as a labelled slot naming the file it expects,
rather than a broken icon.

---

## Still needed before launch

1. **More photographs.** The five in `public/photos/` came out of the brochure, and
   four of them are close-ups of boards and laptops. The page needs faces: children
   working, presenting, receiving certificates. Your Google Photos and Drive albums
   need a login, so download the ones you want, drop them in `public/photos/`, and add
   them to the `GALLERY` array at the top of `page.tsx` and the matching list in
   `preview.html`. Write real alt text for each one.
2. **A better hero image.** `student-lab.jpg` is standing in. A wide shot of a full
   session would carry that space better.
3. **Real testimonials.** The three cards are placeholders carrying a yellow "Sample"
   tag. Edit `TESTIMONIALS` in `page.tsx`, then set `sample: false` to clear the tag.
4. **A decision on the logo wordmark.** "JJENGA" is white in the logo file, so the full
   lockup is invisible on any light background. The header currently pairs your mark
   with the wordmark set in the site's display font. A version of the logo with the
   wordmark in deep violet would be worth having.
5. **A decision on the name.** The logo and brochure say "Jjenga Code", the domain and
   posters say "jengacode.co.ke". The page uses "JengaCode" throughout. Worth settling
   before print and web diverge further.

---

## Details worth knowing

- Phone numbers on the page are **0740 135 389** and **+254 792 696 592**, as
  specified. The posters carry 0798 813315 and the brochure carries +254 729 675117.
  If any of those should appear too, add them in the Contact section.
- Every Register button points to `https://forms.gle/gz8a9Ysnc6x3cbaB7`.
- The countdown targets `CAMP_START` at the top of `page.tsx`. Change it for the next
  camp, or the section will read "Camp in progress" forever after 14 August.
- Design tokens live in `:root` at the top of `jengacode.css`. Colours are sampled
  from the logo, posters and brochure.
- Accessibility: skip link, visible keyboard focus, labelled controls, an accordion
  and lightbox that both work from the keyboard, and `prefers-reduced-motion` honoured
  throughout.
