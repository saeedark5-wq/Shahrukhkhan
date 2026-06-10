import type { MetadataRoute } from "next";

const baseUrl = "https://pyramidstar.ae";

const propertyPages = [
  { id: "1", title: "Skycourts Tower Studio Apartment" },
  { id: "2", title: "1 Bedroom Hall Apartment - Skycourts Tower" },
  { id: "3", title: "2 Bedroom Hall Apartment - Skycourts Tower C" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/properties`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const propertyEntries: MetadataRoute.Sitemap = propertyPages.map((p) => ({
    url: `${baseUrl}/properties/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...propertyEntries];
}