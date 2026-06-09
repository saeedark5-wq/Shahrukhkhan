import Link from "next/link";
import { motion } from "framer-motion";
import { FiMapPin, FiHome } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { Property } from "@/lib/types";

interface Props {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: Props) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(price);
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/properties/${property.id}`}>
        <div className="group bg-card border border-card-border rounded-sm overflow-hidden hover:border-gold/30 transition-all duration-500">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url("${property.images[0] || "/images/Building.webp"}")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${
                  property.type === "buy"
                    ? "bg-gold text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {property.type === "buy" ? "For Sale" : "For Rent"}
              </span>
            </div>

            {property.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-red-500/90 text-white">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="font-heading text-lg font-bold text-white mb-1 truncate group-hover:text-gold transition-colors">
              {property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
              <FiMapPin className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>

            <p className="text-gold font-bold text-xl mb-4">
              {formatPrice(property.price)}
              {property.type === "rent" && (
                <span className="text-gray-500 text-sm font-normal">/yr</span>
              )}
            </p>

            <div className="flex items-center gap-4 text-gray-400 text-sm border-t border-card-border pt-4">
              <div className="flex items-center gap-1.5">
                <IoBedOutline className="w-4 h-4" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LuBath className="w-4 h-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiHome className="w-4 h-4" />
                <span>{property.area} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
