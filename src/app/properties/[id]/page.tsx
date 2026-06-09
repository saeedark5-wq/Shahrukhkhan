"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiHash,
} from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Property } from "@/lib/types";
import { AGENT } from "@/lib/constants";
import { DEFAULT_PROPERTIES, loadProperties } from "@/lib/properties";
import { PropertyDetailsSkeleton } from "@/components/ui/LoadingSkeleton";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PropertyDetailsPage() {
  const params = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allProperties, setAllProperties] = useState<Property[]>(() => DEFAULT_PROPERTIES);

  useEffect(() => {
    setAllProperties(loadProperties());
  }, []);

  const property = allProperties.find((p) => p.id === params.id);

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyDetailsSkeleton />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-white mb-4">
          Property Not Found
        </h1>
        <p className="text-gray-400 mb-6">
          The property you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/properties"
          className="text-gold hover:underline"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const whatsappMsg = `Hi Shahrukh! I'm interested in ${property.title} located in ${property.location} (${formatPrice(property.price)}). Can you provide more details?`;
  const whatsappUrl = `https://wa.me/${AGENT.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );

  const statusColors: Record<string, string> = {
    available: "bg-green-500/20 text-green-400",
    sold: "bg-red-500/20 text-red-400",
    rented: "bg-blue-500/20 text-blue-400",
    "under-offer": "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-8 text-sm"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatedSection>
            <div className="relative rounded-sm overflow-hidden">
              <div
                className="aspect-[16/10] bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url("${property.images[currentImage]}")`,
                }}
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentImage ? "bg-gold w-6" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`shrink-0 w-20 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                    i === currentImage
                      ? "border-gold opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${img}")` }}
                  />
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${
                  property.type === "buy"
                    ? "bg-gold text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {property.type === "buy" ? "For Sale" : "For Rent"}
              </span>
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-white/10 text-gray-300">
                {property.propertyType}
              </span>
              {property.status && (
                <span
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${
                    statusColors[property.status]
                  }`}
                >
                  {property.status.replace("-", " ")}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-gray-400 mb-2">
              <FiMapPin className="w-4 h-4 text-gold" />
              <span>{property.location}</span>
            </div>

            {property.referenceNumber && (
              <div className="flex items-center gap-1.5 text-gray-500 mb-6 text-sm">
                <FiHash className="w-3.5 h-3.5" />
                <span>Ref: {property.referenceNumber}</span>
              </div>
            )}

            <p className="text-gold font-bold text-3xl mb-6">
              {formatPrice(property.price)}
              {property.type === "rent" && (
                <span className="text-gray-500 text-lg font-normal">
                  /year
                </span>
              )}
            </p>

            <div className="flex items-center gap-6 py-5 border-y border-card-border mb-6 flex-wrap">
              <div className="flex items-center gap-2 text-gray-300">
                <IoBedOutline className="w-5 h-5 text-gold" />
                <span className="text-sm">
                  {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <LuBath className="w-5 h-5 text-gold" />
                <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiHome className="w-5 h-5 text-gold" />
                <span className="text-sm">{property.area} sqft</span>
              </div>
              {property.furnishing && (
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-sm capitalize">{property.furnishing}</span>
                </div>
              )}
              {property.yearBuilt && (
                <div className="flex items-center gap-2 text-gray-300">
                  <FiCalendar className="w-4 h-4 text-gold" />
                  <span className="text-sm">Built {property.yearBuilt}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-3">
                Description
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1.5 bg-card border border-card-border text-gray-300 text-xs rounded-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#22c35e] transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              Inquire via WhatsApp
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
