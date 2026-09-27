export interface Highlight {
  name: string;
  detail: string;
}

export const galaxyHighlights: Highlight[] = [
  {
    name: "Andromeda Galaxy",
    detail: "Our nearest large galactic neighbor — 2.5 million light-years away, on a slow collision course with the Milky Way.",
  },
  {
    name: "Pillars of Creation",
    detail: "Towering columns of gas and dust in the Eagle Nebula where new stars are being born.",
  },
  {
    name: "Milky Way",
    detail: "Our home galaxy: over 100,000 light-years across with an estimated 100–400 billion stars.",
  },
];

export const missionHighlights: Highlight[] = [
  {
    name: "Apollo 11 · 1969",
    detail: "The first crewed Moon landing — Neil Armstrong and Buzz Aldrin walked on the lunar surface.",
  },
  {
    name: "Voyager 1 · 1977",
    detail: "The farthest human-made object, now beyond the solar system and still sending data home.",
  },
  {
    name: "James Webb · 2021",
    detail: "The most powerful space telescope ever built, peering at the first galaxies of the early universe.",
  },
];

export const astronautHighlights: Highlight[] = [
  {
    name: "Valentina Tereshkova",
    detail: "The first woman in space, orbiting Earth 48 times aboard Vostok 6 in 1963.",
  },
  {
    name: "Neil Armstrong",
    detail: "Commander of Apollo 11 and the first human to set foot on the Moon.",
  },
  {
    name: "Kalpana Chawla",
    detail: "The first woman of Indian origin in space, flying two missions aboard Space Shuttle Columbia.",
  },
];

/** Rotating "did you know?" facts for the home page. */
export const didYouKnow: string[] = [
  "A day on Venus is longer than a year on Venus.",
  "Neutron stars can spin 600 times per second.",
  "There is enough room between Earth and Mars for every other planet, lined up side by side.",
  "One million Earths could fit inside the Sun.",
  "Space is completely silent — there is no air to carry sound.",
  "The footprints on the Moon will likely stay there for millions of years.",
];
