"use client";

import { Property } from "./types";

const STORAGE_KEY = "srk_properties_v2";

export const DEFAULT_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Skycourts Tower Studio Apartment",
    price: 40000,
    location: "Skycourts Tower - International City",
    type: "rent",
    propertyType: "studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 428,
    description:
      "Well-planned studio apartment in Skycourts Tower offering a comfortable living space of 427.87 sq. ft. Ideal for singles or working professionals, the unit features built-in wardrobes, central chiller A/C, full open view, and covered parking. Located in a well-maintained building by National Bonds Corporation PJSC with easy access to main roads and nearby facilities.",
    images: [
      "/images/Skycourts Tower.webp",
      "/images/Skycourts Tower evening Picture.jfif",
      "/images/Skycourts Tower Night Picture.jfif",
      "/images/Building.webp",
      "/images/Studio A.webp",
      "/images/Studio B.webp",
      "/images/Studio D.webp",
    ],
    featured: true,
    createdAt: 1700000000000,
    amenities: [
      "Built-in Wardrobes",
      "Central Chiller A/C",
      "Full Open View",
      "Covered Parking",
      "Community Gym",
      "Swimming Pool",
      "Children Play Area",
      "Jogging Track",
      "24hr Security",
    ],
    furnishing: "unfurnished",
    yearBuilt: 2010,
    referenceNumber: "SKY-ST-001",
    status: "available",
  },
  {
    id: "2",
    title: "1 Bedroom Hall Apartment - Skycourts Tower",
    price: 55000,
    location: "Skycourts Tower - International City",
    type: "rent",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 843,
    description:
      "Spacious 1 bedroom hall apartment in Skycourts Tower offering 843 sq. ft. of well-planned living space. Features built-in wardrobes, central chiller A/C, full open view, and covered parking. Ready to move and perfect for singles or working professionals. The building offers high-speed elevators, landscaped surroundings, and 24-hour security.",
    images: [
      "/images/1 Bedroom A.webp",
      "/images/1 Bedroom Hall.webp",
      "/images/1 Bedroom Hall A.webp",
      "/images/1 Bedroom Hall b.webp",
      "/images/1 Bedroom Hall Balcony.webp",
      "/images/1 Bedroom Balcony.webp",
      "/images/1 Bedroom Hall D.webp",
      "/images/1 Bedroom Hall E.webp",
    ],
    featured: true,
    createdAt: 1700000000001,
    amenities: [
      "Built-in Wardrobes",
      "Central Chiller A/C",
      "Full Open View",
      "Covered Parking",
      "Community Gym",
      "Swimming Pool",
      "Children Play Area",
      "Jogging Track",
      "24hr Security",
    ],
    furnishing: "unfurnished",
    yearBuilt: 2010,
    referenceNumber: "SKY-1BR-001",
    status: "available",
  },
  {
    id: "3",
    title: "2 Bedroom Hall Apartment - Skycourts Tower C",
    price: 70000,
    location: "Skycourts Tower C - International City",
    type: "rent",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1268,
    description:
      "Unfurnished 2-bedroom apartment for rent in Skycourts Tower C. Offering 1,268 sqft of practical layout with open-plan living and dining area, U-shaped kitchen with breakfast bar, tiled flooring throughout, built-in stove with range hood, and large windows with downtown city and open views. Building features high-speed elevators, children's play area, and landscaped surroundings.",
    images: [
      "/images/2 bedroom Living Hall.webp",
      "/images/2 Bedroom Living Hall a.webp",
      "/images/2 bedroom Living Hall b.webp",
      "/images/2 bedroom Living Hall c.webp",
    ],
    featured: true,
    createdAt: 1700000000002,
    amenities: [
      "Open-plan Living",
      "U-Shaped Kitchen",
      "Breakfast Bar",
      "Built-in Wardrobes",
      "Central Chiller A/C",
      "Covered Parking",
      "Community Gym",
      "Swimming Pool",
      "Children Play Area",
    ],
    furnishing: "unfurnished",
    yearBuilt: 2010,
    referenceNumber: "SKY-2BR-001",
    status: "available",
  },
];

export function loadProperties(): Property[] {
  if (typeof window === "undefined") return DEFAULT_PROPERTIES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const defaultIds = new Set(DEFAULT_PROPERTIES.map((p) => p.id));
        const needsMigration = DEFAULT_PROPERTIES.some((def) => {
          const stored = parsed.find((p: Property) => p.id === def.id);
          return !stored || JSON.stringify(stored) !== JSON.stringify(def);
        });
        if (needsMigration) {
          const defaultsById = new Map(DEFAULT_PROPERTIES.map((p) => [p.id, p]));
          const merged = parsed.map((p: Property) => defaultsById.get(p.id) || p);
          const extras = parsed.filter((p: Property) => !defaultIds.has(p.id));
          const result = [...merged, ...extras];
          saveProperties(result);
          return result;
        }
        return parsed;
      }
    }
  } catch {}
  saveProperties(DEFAULT_PROPERTIES);
  return DEFAULT_PROPERTIES;
}

export function saveProperties(properties: Property[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch {}
}

export function resetProperties(): Property[] {
  saveProperties(DEFAULT_PROPERTIES);
  return DEFAULT_PROPERTIES;
}

export function getPropertyById(id: string): Property | undefined {
  return loadProperties().find((p) => p.id === id);
}
