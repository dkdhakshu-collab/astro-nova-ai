import mercury from "@/assets/planets/mercury.jpg";
import venus from "@/assets/planets/venus.jpg";
import earth from "@/assets/planets/earth.jpg";
import mars from "@/assets/planets/mars.jpg";
import jupiter from "@/assets/planets/jupiter.jpg";
import saturn from "@/assets/planets/saturn.jpg";
import uranus from "@/assets/planets/uranus.jpg";
import neptune from "@/assets/planets/neptune.jpg";

export const planetImages: Record<string, string> = {
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
};

export function planetImage(slug: string): string {
  return planetImages[slug] ?? earth;
}
