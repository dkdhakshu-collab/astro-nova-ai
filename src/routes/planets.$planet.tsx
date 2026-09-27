import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { planets, getPlanet, nextPlanet } from "@/data/planets";
import { planetImage } from "@/data/planetImages";

export const Route = createFileRoute("/planets/$planet")({
  loader: ({ params }) => {
    const planet = getPlanet(params.planet);
    if (!planet) throw notFound();
    return { planet };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Planet not found — Cosmic Atlas" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { planet } = loaderData;
    const description = `${planet.name} — ${planet.tagline}. ${planet.diameterKm.toLocaleString()} km wide, ${planet.distanceFromSunMkm} million km from the Sun. Facts, figures, and notable discoveries.`;
    return {
      meta: [
        { title: `${planet.name} — Cosmic Atlas` },
        { name: "description", content: description },
        { property: "og:title", content: `${planet.name} — Cosmic Atlas` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PlanetProfile,
  notFoundComponent: PlanetNotFound,
});

function PlanetProfile() {
  const { planet } = Route.useLoaderData();
  const next = nextPlanet(planet.slug);

  const stats = [
    { label: "Diameter", value: `${planet.diameterKm.toLocaleString()} km` },
    { label: "Distance from Sun", value: `${planet.distanceFromSunMkm} million km` },
    { label: "Orbital period", value: planet.orbitalPeriod },
    { label: "Day length", value: planet.dayLength },
    { label: "Moons", value: planet.moons === 0 ? "None" : String(planet.moons) },
    { label: "Mean temperature", value: `${planet.meanTempC}°C` },
  ];

  return (
    <main
      className="mx-auto max-w-6xl px-4 pb-24 pt-24"
      style={{ "--planet-accent": `var(--planet-${planet.slug})` } as React.CSSProperties}
    >
      <nav className="mb-10 text-sm text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">
          ← Back to Cosmic Atlas
        </Link>
      </nav>

      <section className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <div
            className="planet-glow overflow-hidden rounded-full"
            style={{ "--planet-accent": `var(--planet-${planet.slug})` } as React.CSSProperties}
          >
            <img
              src={planetImage(planet.slug)}
              alt={planet.name}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <p
            className="font-display text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--planet-accent)" }}
          >
            {planet.tagline}
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">
            {planet.name}
          </h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">{planet.description}</p>

          <div className="mt-8">
            <div className="mb-2 flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Size compared to Earth</span>
              <span className="font-medium text-foreground">
                {planet.sizeVsEarth}× Earth's diameter
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.max((planet.sizeVsEarth / 11.2) * 100, 4)}%`,
                  backgroundColor: "var(--planet-accent)",
                }}
              />
            </div>
            <div className="mt-1 text-right text-xs text-muted-foreground">
              Full bar = Jupiter, the largest planet
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold">Vital statistics</h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-lg font-medium text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold">Notable facts</h2>
        <ul className="mt-6 space-y-4">
          {planet.facts.map((fact) => (
            <li
              key={fact}
              className="flex gap-4 rounded-xl border border-border bg-card p-5"
            >
              <span
                className="mt-1.5 block size-2 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--planet-accent)" }}
              />
              <p className="leading-relaxed text-foreground/90">{fact}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 flex items-center justify-between rounded-2xl border border-border bg-card p-6">
        <div>
          <p className="text-sm text-muted-foreground">Next stop</p>
          <Link
            to="/planets/$planet"
            params={{ planet: next.slug }}
            className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-semibold transition-colors hover:text-primary"
          >
            {next.name}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div
          className="planet-glow hidden size-16 overflow-hidden rounded-full sm:block"
          style={{ "--planet-accent": `var(--planet-${next.slug})` } as React.CSSProperties}
        >
          <img
            src={planetImage(next.slug)}
            alt={next.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}

function PlanetNotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold">Unknown world</h1>
      <p className="mt-4 text-muted-foreground">
        We haven't charted that planet yet. Head back to the atlas to pick one of the eight.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-transform hover:scale-105"
      >
        Back to Cosmic Atlas
      </Link>
    </main>
  );
}
