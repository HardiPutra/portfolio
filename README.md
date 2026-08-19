# Hardi — Portfolio

A single-page personal portfolio. Minimal, white and grey, Apple-inspired, with restrained
glassmorphism and subtle scroll-driven motion.

Built with **React 19**, **Vite 6**, **Tailwind CSS 4**, **Motion**, and **Lucide** icons.

---

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
```

Start the dev server (http://localhost:5173):

```bash
npm run dev
```

Build for production into `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Editing your content

**Everything you need to change lives in one file: [`src/data/portfolio.js`](src/data/portfolio.js).**
No component needs to be touched to update your name, bio, skills, projects, or links.

Anything written in `UPPER_SNAKE_CASE` is a placeholder waiting for a real value:

| Placeholder                                | Where it appears                     |
| ------------------------------------------ | ------------------------------------ |
| `YOUR_EMAIL`                               | Contact card, footer, `mailto:` CTA  |
| `YOUR_GITHUB_URL` / `YOUR_GITHUB_HANDLE`   | Contact card, social icons           |
| `YOUR_LINKEDIN_URL` / `YOUR_LINKEDIN_HANDLE` | Contact card, social icons         |
| `YOUR_INSTAGRAM_URL`, `YOUR_FACEBOOK_URL`  | Social icons                         |
| `YOUR_PROJECT_URL`, `YOUR_REPO_URL`        | Project cards                        |
| `YOUR_LOCATION`, `YOUR_RESUME_URL`         | Profile (unused by default)          |
| `YEAR`                                     | Project cards                        |

`YOUR_SITE_URL` also appears in [`index.html`](index.html) for the canonical URL, Open Graph tags,
and structured data — set it once you have a domain.

### Placeholders never ship as broken links

The site detects unfilled placeholders and degrades gracefully instead of rendering dead `href`s:

- A social icon with no URL renders as an **inert icon**, labelled `"GitHub — link not set"` for
  screen readers, rather than a link that goes nowhere.
- A project with no URL shows **"Link coming soon"** instead of a broken *View Project* button.
- A project with no repo URL simply hides its GitHub button.

Fill the value in and the link activates itself. The check lives in `isPlaceholder()` in
[`src/components/ui/SocialLinks.jsx`](src/components/ui/SocialLinks.jsx).

### Replacing the project images

`public/projects/` holds four generated SVG placeholders that match the site's palette. Drop in real
screenshots (JPG or WebP, roughly 1600×1000) and point `image` at the new path in `portfolio.js`.
Keep `imageAlt` descriptive — it is real alt text, not decoration.

---

## Project structure

```
├── index.html                  # SEO: title, meta description, Open Graph, JSON-LD
├── vite.config.js              # React + Tailwind plugins, dependency chunk splitting
├── public/
│   ├── favicon.svg
│   ├── og-image.svg            # social share card
│   └── projects/               # project thumbnails (placeholders)
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # section order, nothing else
    ├── index.css               # design tokens, base styles, glass utilities
    ├── data/
    │   └── portfolio.js        # ← all content lives here
    ├── hooks/
    │   ├── useActiveSection.js # IntersectionObserver scroll-spy for the navbar
    │   └── useScrolled.js      # navbar transparent → frosted on scroll
    └── components/
        ├── Navbar.jsx          # sticky nav, scroll-spy, mobile sheet
        ├── Hero.jsx            # headline, CTAs, entrance animation
        ├── HeroVisual.jsx      # decorative abstract composition
        ├── About.jsx           # narrative + stats
        ├── Skills.jsx          # grouped skill cards
        ├── Projects.jsx        # selected work
        ├── Contact.jsx         # glass contact card
        ├── Footer.jsx
        └── ui/
            ├── Section.jsx     # section shell + header (owns vertical rhythm)
            ├── Reveal.jsx      # the one scroll-reveal animation wrapper
            ├── Button.jsx      # primary / secondary
            └── SocialLinks.jsx # icon registry + placeholder detection
```

### How the pieces fit

- **`Section` owns spacing.** Every section renders through it, so vertical rhythm and the
  max-width gutter stay identical from About to Contact. Change the padding once, it changes
  everywhere.
- **`Reveal` owns motion.** Every scroll-triggered entrance on the page uses this single wrapper
  with one shared easing curve and duration. That consistency is most of what makes the motion
  read as designed rather than decorative.
- **`portfolio.js` owns content.** Components map over data; they never hard-code copy.

### Adding a section

1. Add `{ id: 'writing', label: 'Writing' }` to `navigation` in `portfolio.js` — the navbar and
   scroll-spy pick it up automatically.
2. Create the component, wrapping content in `<Section id="writing">`.
3. Render it in `App.jsx` in the right position.

### Adding a skill category

Add an entry to `skillGroups` in `portfolio.js`, then register its icon in the `ICONS` map at the
top of `Skills.jsx`. The grid needs no changes.

---

## Design system

Tokens are defined once in the `@theme` block of `src/index.css`:

| Token              | Value     | Role                    |
| ------------------ | --------- | ----------------------- |
| `--color-canvas`   | `#FFFFFF` | Page background         |
| `--color-surface`  | `#F5F5F7` | Alternating sections    |
| `--color-ink`      | `#1D1D1F` | Primary text            |
| `--color-ink-muted`| `#6E6E73` | Secondary text          |
| `--color-line`     | `#E5E5E5` | Borders and dividers    |
| `--color-accent`   | `#0071E3` | Links, focus rings only |

**Text uses two tiers, not three.** A third, lighter grey (Apple's `#86868B`) cannot reach the
4.5:1 contrast ratio required by WCAG AA on either background — it lands at 3.6:1 on white.
Hierarchy is carried by size, weight, and letter-spacing instead. Every piece of text on the page
was verified against its actual computed background at AA.

**Glass is an accent, not the theme.** The `.glass` utility is used in exactly four places: the
navbar once scrolled, the contact card, and the two floating chips in the hero visual. There is a
`@supports` fallback to a near-opaque white for browsers without `backdrop-filter`.

---

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and a single `h1` with correct heading order
- "Skip to content" link as the first focusable element
- Visible focus ring on every interactive element, declared **unlayered** in `index.css` so it beats
  Tailwind's `transition-colors` utility — otherwise the ring would fade in over 300ms from the
  element's own grey text colour, which is not an acceptable focus indicator
- `aria-label` on every icon-only control; decorative graphics are `aria-hidden`
- Mobile menu traps nothing, locks body scroll, and closes on `Escape`
- `prefers-reduced-motion` respected twice over: globally in CSS, and per-component through Motion's
  `useReducedMotion()`, which skips transforms entirely rather than just shortening them
- All AA contrast checks pass against actual rendered backgrounds

## Performance

Production bundle, gzipped:

| Chunk   | Size    |
| ------- | ------- |
| React   | 59.2 kB |
| Motion  | 37.8 kB |
| App     | 9.2 kB  |
| CSS     | 7.9 kB  |
| Icons   | 2.2 kB  |

Inter is self-hosted and subset by `unicode-range`, so a visitor reading English downloads one
48 kB font file and nothing else. Project images are `loading="lazy"` with explicit dimensions to
avoid layout shift. Dependencies are split into their own chunks so a content edit invalidates only
the 9 kB app bundle.

---

## Deploying

The build output in `dist/` is fully static — any host works.

**Netlify / Vercel:** build command `npm run build`, publish directory `dist`.

**GitHub Pages:** if serving from a subpath such as `username.github.io/portfolio/`, set the base
in `vite.config.js`:

```js
export default defineConfig({
  base: '/portfolio/',
  // ...
});
```
