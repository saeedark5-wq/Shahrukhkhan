export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "buy" | "rent";
  propertyType: "apartment" | "villa" | "commercial" | "studio";
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  images: string[];
  featured: boolean;
  createdAt: number;
  amenities?: string[];
  furnishing?: "furnished" | "unfurnished" | "semi-furnished";
  yearBuilt?: number;
  referenceNumber?: string;
  status?: "available" | "sold" | "rented" | "under-offer";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface DubaiArea {
  name: string;
  description: string;
  image: string;
  slug: string;
}
