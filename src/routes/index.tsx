import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroNebula from "@/assets/hero-nebula.jpg";
import { planets } from "@/data/planets";
import { planetImage } from "@/data/planetImages";
import {
  astronautHighlights,
  didYouKnow,
  galaxyHighlights,
  missionHighlights,
  type Highlight,
} from "@/data/highlights";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosmic Atlas — Planets, Galaxies & Space Missions" },
      {
        name: "description",
        content:
          "Take an educational journey through the solar system: profile all 8 planets, plus galaxies, astronauts, and historic space missions.",
      },
      {
        property: "og:title",
        content: "Cosmic Atlas — Planets, Galaxies & Space Missions",
      },
      {
        property: "og:description",
        content:
          "Take an educational journey through the solar system: profile all 8 planets, plus galaxies, astronauts, and historic space missions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <PlanetStrip />
      <DidYouKnow />
      <Highlights />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <img
        src={heroNebula}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <p className="mb-4 font-display text-sm uppercase tracking-[0.35em] text-primary">
          An educational journey through space
        </p>
        <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Cosmic Atlas
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Tour all eight planets of the solar system, discover the galaxies beyond,
          and meet the missions and explorers that carried us there.
        </p>
        <a
          href="#planets"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-display text-base font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--primary)] transition-transform hover:scale-105"
        >
          Begin the tour
          <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}

function PlanetStrip() {
  return (
    <section id="planets" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
      <header className="mb-14 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          The Solar System, in order
        </h2>
        <p className="mt-3 text-muted-foreground">
          Eight worlds between 58 million and 4.5 billion kilometers from the Sun. Pick one to explore.
        </p>
      </header>
      <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-10 sm:gap-x-8">
        {planets.map((planet) => {
          // Visual size scaled from real relative diameters, clamped for layout.
          const size = Math.min(Math.max(planet.sizeVsEarth * 64, 56), 200);
          return (
            <Link
              key={planet.slug}
              to="/planets/$planet"
              params={{ planet: planet.slug }}
              className="group flex flex-col items-center gap-3"
            >
              <span
                className="planet-glow block overflow-hidden rounded-full"
                style={
                  {
                    width: size,
                    height: size,
                    "--planet-accent": `var(--planet-${planet.slug})`,
                  } as React.CSSProperties
                }
              >
                <img
                  src={planetImage(planet.slug)}
                  alt={planet.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="font-display text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {planet.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DidYouKnow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % didYouKnow.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24">
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
          Did you know?
        </p>
        <p
          key={index}
          className="mt-4 min-h-16 font-display text-xl leading-relaxed text-foreground"
        >
          {didYouKnow[index]}
        </p>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="grid gap-6 md:grid-cols-3">
        <HighlightCard
          title="Galaxies"
          subtitle="Island universes beyond our own"
          items={galaxyHighlights}
          accent="--planet-uranus"
        />
        <HighlightCard
          title="Space Missions"
          subtitle="Humanity's greatest journeys"
          items={missionHighlights}
          accent="--planet-mars"
        />
        <HighlightCard
          title="Astronauts"
          subtitle="The people who went"
          items={astronautHighlights}
          accent="--planet-neptune"
        />
      </div>
    </section>
  );
}

function HighlightCard({
  title,
  subtitle,
  items,
  accent,
}: {
  title: string;
  subtitle: string;
  items: Highlight[];
  accent: string;
}) {
  return (
    <article
      className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
      style={{ "--planet-accent": `var(${accent})` } as React.CSSProperties}
    >
      <span
        className="mb-4 block h-1 w-10 rounded-full"
        style={{ backgroundColor: "var(--planet-accent)" }}
      />
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.name}>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
