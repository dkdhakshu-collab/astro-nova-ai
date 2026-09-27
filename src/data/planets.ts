export interface Planet {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  diameterKm: number;
  distanceFromSunMkm: number;
  orbitalPeriod: string;
  dayLength: string;
  moons: number;
  meanTempC: number;
  /** Diameter relative to Earth (Earth = 1) */
  sizeVsEarth: number;
  facts: string[];
}

// Figures from NASA planetary fact sheets (approximate mean values).
export const planets: Planet[] = [
  {
    slug: "mercury",
    name: "Mercury",
    tagline: "The Swift Planet",
    description:
      "The smallest planet and the closest to the Sun, Mercury races around its orbit faster than any other world — yet its slow spin and thin atmosphere leave it scorched by day and frozen by night.",
    diameterKm: 4879,
    distanceFromSunMkm: 57.9,
    orbitalPeriod: "88 Earth days",
    dayLength: "59 Earth days",
    moons: 0,
    meanTempC: 167,
    sizeVsEarth: 0.38,
    facts: [
      "A single Mercury day (sunrise to sunrise) lasts 176 Earth days — two full Mercury years.",
      "Surface temperatures swing from 430°C in daylight to −180°C at night, the widest range of any planet.",
      "Despite being closest to the Sun, Venus is hotter — Mercury has almost no atmosphere to trap heat.",
      "Mercury's heavily cratered face resembles our Moon and hasn't changed much in billions of years.",
    ],
  },
  {
    slug: "venus",
    name: "Venus",
    tagline: "Earth's Evil Twin",
    description:
      "Nearly the same size as Earth but wrapped in crushing clouds of sulfuric acid and carbon dioxide, Venus is the hottest planet in the solar system — a runaway greenhouse world hiding beneath permanent cloud cover.",
    diameterKm: 12104,
    distanceFromSunMkm: 108.2,
    orbitalPeriod: "225 Earth days",
    dayLength: "243 Earth days",
    moons: 0,
    meanTempC: 464,
    sizeVsEarth: 0.95,
    facts: [
      "Venus spins backwards — on its surface, the Sun rises in the west and sets in the east.",
      "Its surface pressure is 92 times Earth's, equivalent to being 900 meters underwater.",
      "A Venus day is longer than its year: it takes 243 Earth days to spin once, but only 225 to orbit the Sun.",
      "It is the brightest natural object in Earth's night sky after the Moon, visible even in daylight.",
    ],
  },
  {
    slug: "earth",
    name: "Earth",
    tagline: "The Pale Blue Dot",
    description:
      "The only known world with liquid-water oceans, plate tectonics, and life. From its protective magnetic field to its oxygen-rich atmosphere, Earth is a remarkably rare oasis in the void.",
    diameterKm: 12756,
    distanceFromSunMkm: 149.6,
    orbitalPeriod: "365.25 Earth days",
    dayLength: "24 hours",
    moons: 1,
    meanTempC: 15,
    sizeVsEarth: 1,
    facts: [
      "Oceans cover about 71% of the surface, yet all that water is less than 0.02% of the planet's mass.",
      "Earth is the densest planet in the solar system, thanks to its large iron core.",
      "The Moon is slowly drifting away from Earth at about 3.8 centimeters per year.",
      "Earth's rotation is gradually slowing — days were only about 18 hours long, 1.4 billion years ago.",
    ],
  },
  {
    slug: "mars",
    name: "Mars",
    tagline: "The Red Frontier",
    description:
      "A cold desert world of rust-colored dust, home to the solar system's tallest volcano and deepest canyon. Ancient riverbeds tell of a warmer, wetter past — and make Mars the prime target in the search for past life.",
    diameterKm: 6792,
    distanceFromSunMkm: 227.9,
    orbitalPeriod: "687 Earth days",
    dayLength: "24.6 hours",
    moons: 2,
    meanTempC: -65,
    sizeVsEarth: 0.53,
    facts: [
      "Olympus Mons on Mars is nearly three times the height of Mount Everest — about 22 kilometers tall.",
      "Valles Marineris, a canyon system on Mars, would stretch from New York to Los Angeles.",
      "Mars has two tiny moons, Phobos and Deimos, likely captured asteroids.",
      "Sunsets on Mars appear blue, because fine dust scatters red light and lets blue light through.",
    ],
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    tagline: "King of the Planets",
    description:
      "A gas giant so massive it outweighs all other planets combined. Jupiter's banded clouds, centuries-old storms, and vast family of moons make it a miniature solar system of its own.",
    diameterKm: 142984,
    distanceFromSunMkm: 778.6,
    orbitalPeriod: "11.9 Earth years",
    dayLength: "9.9 hours",
    moons: 95,
    meanTempC: -110,
    sizeVsEarth: 11.2,
    facts: [
      "The Great Red Spot is a storm wider than Earth that has been raging for at least 190 years.",
      "Jupiter spins faster than any other planet — a full day lasts under 10 hours.",
      "Its moon Ganymede is the largest moon in the solar system, bigger than the planet Mercury.",
      "Jupiter's immense gravity acts as a cosmic shield, deflecting or capturing many comets and asteroids.",
    ],
  },
  {
    slug: "saturn",
    name: "Saturn",
    tagline: "Lord of the Rings",
    description:
      "The showpiece of the solar system. Saturn's magnificent rings of ice and rock span hundreds of thousands of kilometers, yet the planet itself is so light it would float in water.",
    diameterKm: 120536,
    distanceFromSunMkm: 1433.5,
    orbitalPeriod: "29.4 Earth years",
    dayLength: "10.7 hours",
    moons: 146,
    meanTempC: -140,
    sizeVsEarth: 9.45,
    facts: [
      "Saturn's density is lower than water — in a big enough ocean, it would float.",
      "The rings are incredibly thin: hundreds of thousands of kilometers wide, but often just 10 meters thick.",
      "Its moon Titan has rivers, lakes, and rain — made of liquid methane instead of water.",
      "A hexagonal jet stream, wider than two Earths, swirls around Saturn's north pole.",
    ],
  },
  {
    slug: "uranus",
    name: "Uranus",
    tagline: "The Tipped Ice Giant",
    description:
      "An ice giant rolling around the Sun on its side. Uranus's extreme tilt gives it decades-long seasons of continuous sunlight and darkness, beneath a calm, methane-tinted cyan haze.",
    diameterKm: 51118,
    distanceFromSunMkm: 2872.5,
    orbitalPeriod: "84 Earth years",
    dayLength: "17.2 hours",
    moons: 28,
    meanTempC: -195,
    sizeVsEarth: 4.0,
    facts: [
      "Uranus rotates at a 98° tilt — it essentially orbits the Sun on its side.",
      "Each pole gets 42 years of nonstop sunlight followed by 42 years of darkness.",
      "It is the coldest planet in the solar system, dropping to −224°C.",
      "Uranus was the first planet discovered with a telescope, by William Herschel in 1781.",
    ],
  },
  {
    slug: "neptune",
    name: "Neptune",
    tagline: "The Windy Blue Giant",
    description:
      "The most distant planet, a deep-blue ice giant whipped by the fastest winds ever measured. Discovered by mathematics before it was seen by telescope, Neptune marks the edge of the planetary realm.",
    diameterKm: 49528,
    distanceFromSunMkm: 4495.1,
    orbitalPeriod: "165 Earth years",
    dayLength: "16.1 hours",
    moons: 16,
    meanTempC: -200,
    sizeVsEarth: 3.88,
    facts: [
      "Winds on Neptune reach 2,100 km/h — the fastest in the solar system, faster than the speed of sound on Earth.",
      "Neptune was found in 1846 by predicting where an unseen planet must be from Uranus's wobble.",
      "One Neptune year lasts 165 Earth years — it has completed just one orbit since its discovery.",
      "Its large moon Triton orbits backwards and may be a captured object from the Kuiper Belt.",
    ],
  },
];

export function getPlanet(slug: string): Planet | undefined {
  return planets.find((p) => p.slug === slug);
}

export function nextPlanet(slug: string): Planet {
  const index = planets.findIndex((p) => p.slug === slug);
  return planets[(index + 1) % planets.length] ?? planets[0]!;
}
