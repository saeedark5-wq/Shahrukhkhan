"use client";

import { motion } from "framer-motion";
import {
  BsHouseCheck,
  BsKey,
  BsGraphUpArrow,
  BsBuilding,
} from "react-icons/bs";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const iconMap: Record<string, React.ElementType> = {
  BsHouseCheck,
  BsKey,
  BsGraphUpArrow,
  BsBuilding,
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive real estate services tailored to your needs, from finding your dream home to maximizing your investment returns."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-card border border-card-border rounded-sm p-8 h-full hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    {Icon && <Icon className="w-7 h-7 text-gold" />}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
