import type { HouseId } from "./i18n/types";
import type { PhotoId } from "./photos";
import { withTrailingSlash } from "./site";

/**
 * Rates are per night for the whole house, in EUR. House 4 is let by section, so
 * it carries a range rather than a weekday/weekend split.
 */
export type Rate =
  | { kind: "split"; weekday: number; weekend: number }
  | { kind: "range"; min: number; max: number };

export type House = {
  id: HouseId;
  number: number;
  sleeps: number;
  /** Upper bound where the house is let flexibly (house 4). */
  sleepsMax?: number;
  bedrooms: number;
  rate: Rate;
  cover: PhotoId;
  photos: PhotoId[];
};

export const houses: House[] = [
  {
    id: "kashta-1",
    number: 1,
    sleeps: 4,
    bedrooms: 2,
    rate: { kind: "split", weekday: 102, weekend: 112 },
    cover: "house1Facade",
    photos: ["house1Facade", "house1Flowers", "house1Veranda", "house1Bedroom", "house1Bathroom"]
  },
  {
    id: "kashta-2",
    number: 2,
    sleeps: 4,
    bedrooms: 2,
    rate: { kind: "split", weekday: 102, weekend: 112 },
    cover: "gardenAerial",
    photos: ["gardenAerial", "house2Living", "house2Bedroom", "house2Bathroom", "gardenDusk"]
  },
  {
    id: "kashta-3",
    number: 3,
    sleeps: 8,
    bedrooms: 4,
    rate: { kind: "split", weekday: 184, weekend: 205 },
    cover: "poolSummer",
    photos: ["poolSummer", "house3Dining", "house1Bedroom", "house3Bathroom", "poolWinter"]
  },
  {
    id: "kashta-4",
    number: 4,
    sleeps: 10,
    sleepsMax: 12,
    bedrooms: 3,
    rate: { kind: "range", min: 77, max: 92 },
    cover: "house4Facade",
    photos: [
      "house4Facade",
      "house4Kitchen",
      "house4Living",
      "house4Bedroom",
      "house4Bedroom2",
      "house4Bathroom"
    ]
  }
];

export const houseIds = houses.map((house) => house.id);

export function getHouse(id: string): House | undefined {
  return houses.find((house) => house.id === id);
}

export function housePath(id: HouseId): string {
  return withTrailingSlash(`/vili/${id}`);
}

export function formatEur(amount: number): string {
  return `${amount} €`;
}
