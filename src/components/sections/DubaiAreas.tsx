"use client";

import { motion } from "framer-motion";
import { DUBAI_AREAS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiMapPin } from "react-icons/fi";

export default function DubaiAreas() {
  return (
    <section id="areas" className="py-20 md:py-28 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore Dubai Areas"
          subtitle="From the iconic Downtown skyline to the serene beaches of Palm Jumeirah, discover what makes each area unique."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUBAI_AREAS.map((area, index) => (
            <AnimatedSection key={area.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-80 rounded-sm overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${area.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <FiMapPin className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">
                      Premium Location
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {area.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
