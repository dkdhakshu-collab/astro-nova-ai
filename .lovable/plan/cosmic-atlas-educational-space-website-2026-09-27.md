# Cosmic Atlas — Educational Space Website

## Concept
"Cosmic Atlas" — an educational explorer site with a deep-space dark aesthetic. The core feature is **planet profiles**: a full tour of the 8 planets of the solar system with real, curated data, plus a small section teasing galaxies/missions/astronauts so the site matches the requested scope without diluting the focus.

## Pages (routes)

- `/` (src/routes/index.tsx, replaces placeholder)
  - Full-bleed starfield hero: site name "Cosmic Atlas", short tagline, CTA to explore planets
  - Interactive planet strip: all 8 planets in order from the Sun, clickable (hover shows name)
  - "Did you know?" rotating fact card
  - Small teaser sections for Galaxies, Missions, Astronauts (cards linking to a future expansion — real curated one-liners, not lorem)
  - Footer with credits
- `/planets/$planet` (src/routes/planets.$planet.tsx)
  - Detail page per planet: large planet artwork, curated facts (diameter, mass, distance from Sun, orbital period, moons, temperature, day length), a "scale" bar comparing size to Earth, 3–5 notable facts, "next planet" navigation
  - Route head() with per-planet title/description/og tags

## Data
- `src/data/planets.ts` — typed module with all 8 planets: real figures from NASA fact sheets (distance, diameter, moons, temperature, orbital period, day length) + curated descriptions and fun facts. No database needed — static curated content.
- `src/data/highlights.ts` — small curated arrays for galaxies / missions / astronauts teasers.

## Visual design (deep-space dark)
- Tokens in `src/styles.css`: near-black space background (oklch), star-white foreground, per-planet accent colors registered as tokens; no hardcoded color utilities in components.
- Fonts via `<link>` in `src/routes/__root.tsx` head: display font (Space Grotesk) + body (Inter or DM Sans). Registered in @theme.
- Subtle animated starfield background (CSS-generated stars, gentle twinkle) — restrained motion.
- Cards with soft glow borders; planet artwork images as visual anchors.

## Assets
- Generate planet artwork (8 planets + 1 hero nebula/galaxy image) with image generation into `src/assets/`, dark-background style so they blend into the page. Each planet gets its own image.

## Technical notes
- Tailwind v4 CSS-first tokens; all @import rules stay at top of src/styles.css; fonts loaded via link tag, never remote @import.
- Each content route gets its own head() metadata (title, description, og:title, og:description, og:type, twitter:card).
- Links use TanStack `<Link>` with typed params; route files created in the same batch as references.
- No backend/Lovable Cloud needed — static curated data module.

## Build order
1. Design tokens + fonts in styles.css and __root head; add `<Outlet />` chrome (minimal nav) in root if needed.
2. Data modules (planets, highlights).
3. Generate planet + hero images.
4. Rewrite src/routes/index.tsx (hero, planet strip, teasers).
5. Create src/routes/planets.$planet.tsx (detail page).
6. Verify build logs clean; screenshot preview with Playwright to confirm visuals.
