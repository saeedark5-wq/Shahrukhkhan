"use client";

import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { Property } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import { loadProperties } from "@/lib/properties";

interface Props {
  properties?: Property[];
}

export default function FeaturedProperties({ properties }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [internalProperties] = useState(() =>
    loadProperties().filter((p) => p.featured)
  );

  const items = properties && properties.length > 0
    ? properties
    : internalProperties;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="properties" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Properties"
          subtitle="Explore our handpicked selection of the finest luxury properties available in Dubai."
        />

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-black/80 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          >
            {items.map((property, index) => (
              <div key={property.id} className="min-w-[320px] md:min-w-[380px] lg:min-w-[400px]">
                <PropertyCard property={property} index={index} />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-black/80 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/50 text-gold rounded-sm hover:bg-gold/10 transition-colors text-sm uppercase tracking-wider"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
