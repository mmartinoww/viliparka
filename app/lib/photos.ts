/**
 * Every photograph on the site, with its real intrinsic size so next/image can
 * reserve space without a layout shift. Alt text lives in the dictionaries and is
 * looked up by the photo id.
 */
export type PhotoGroup = "pool" | "property" | "interiors" | "around";

export type Photo = {
  id: PhotoId;
  src: string;
  width: number;
  height: number;
  group: PhotoGroup;
};

export const photos = {
  poolWinter: { src: "/property/pool-winter.webp", width: 1440, height: 1440, group: "pool" },
  poolSummer: { src: "/property/pool-summer.webp", width: 1440, height: 1439, group: "pool" },
  aerialWinter: { src: "/property/aerial-winter.webp", width: 1599, height: 1080, group: "property" },
  gardenAerial: { src: "/property/garden-aerial.webp", width: 1119, height: 1080, group: "property" },
  gardenDusk: { src: "/property/garden-dusk.webp", width: 810, height: 1080, group: "property" },
  gardenLawn: { src: "/property/garden-lawn.webp", width: 1400, height: 1935, group: "property" },
  rilaPanorama: { src: "/property/rila-panorama.webp", width: 1100, height: 499, group: "around" },

  house1Facade: { src: "/houses/house-1-facade.webp", width: 895, height: 1080, group: "property" },
  house1Flowers: { src: "/houses/house-1-flowers.webp", width: 1400, height: 1865, group: "property" },
  house1Veranda: { src: "/houses/house-1-veranda.webp", width: 1400, height: 1544, group: "property" },
  house1Bedroom: { src: "/houses/house-1-bedroom.webp", width: 810, height: 1080, group: "interiors" },
  house1Bathroom: { src: "/houses/house-1-bathroom.webp", width: 810, height: 1080, group: "interiors" },

  house2Living: { src: "/houses/house-2-living.webp", width: 810, height: 1080, group: "interiors" },
  house2Bedroom: { src: "/houses/house-2-bedroom.webp", width: 810, height: 1080, group: "interiors" },
  house2Bathroom: { src: "/houses/house-2-bathroom.webp", width: 810, height: 1080, group: "interiors" },

  house3Dining: { src: "/houses/house-3-dining.webp", width: 810, height: 1080, group: "interiors" },
  house3Bathroom: { src: "/houses/house-3-bathroom.webp", width: 810, height: 1080, group: "interiors" },

  house4Facade: { src: "/houses/house-4-facade.webp", width: 1440, height: 1080, group: "property" },
  house4Living: { src: "/houses/house-4-living.webp", width: 1400, height: 1867, group: "interiors" },
  house4Kitchen: { src: "/houses/house-4-kitchen.webp", width: 1400, height: 1867, group: "interiors" },
  house4Bedroom: { src: "/houses/house-4-bedroom.webp", width: 1400, height: 1605, group: "interiors" },
  house4Bedroom2: { src: "/houses/house-4-bedroom-2.webp", width: 1400, height: 1671, group: "interiors" },
  house4Bathroom: { src: "/houses/house-4-bathroom.webp", width: 810, height: 1080, group: "interiors" },

  geyser: { src: "/around/geyser.webp", width: 1400, height: 2100, group: "around" },
  sevenLakes: { src: "/around/seven-rila-lakes.webp", width: 1600, height: 1540, group: "around" },
  monastery: { src: "/around/rila-monastery.webp", width: 1024, height: 768, group: "around" },
  monasteryNight: { src: "/around/rila-monastery-night.webp", width: 700, height: 420, group: "around" },
  craterLake: { src: "/around/crater-lake.webp", width: 1600, height: 1059, group: "around" },
  lakeWinter: { src: "/around/rila-lake-winter.webp", width: 900, height: 600, group: "around" }
} as const satisfies Record<string, Omit<Photo, "id">>;

export type PhotoId = keyof typeof photos;

export function photo(id: PhotoId): Photo {
  return { id, ...photos[id] };
}

export const HERO_PHOTO: PhotoId = "poolWinter";

/** Order used on the gallery page. */
export const galleryOrder: PhotoId[] = [
  "poolWinter",
  "poolSummer",
  "aerialWinter",
  "gardenAerial",
  "house1Facade",
  "house1Flowers",
  "house1Veranda",
  "house4Facade",
  "gardenDusk",
  "gardenLawn",
  "house4Kitchen",
  "house4Living",
  "house3Dining",
  "house2Living",
  "house1Bedroom",
  "house4Bedroom",
  "house4Bedroom2",
  "house2Bedroom",
  "house1Bathroom",
  "house2Bathroom",
  "house3Bathroom",
  "house4Bathroom",
  "geyser",
  "sevenLakes",
  "monastery",
  "craterLake",
  "lakeWinter",
  "rilaPanorama"
];
