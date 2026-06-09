"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Testimonial } from "@/lib/types";
import { loadTestimonials } from "@/lib/testimonials";
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => DEFAULT_TESTIMONIALS);

  useEffect(() => {
    setTestimonials(loadTestimonials());
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Hear from our satisfied clients about their experience working with Pyramid Star Real Estate Brokerage."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card border border-card-border rounded-sm p-6 h-full flex flex-col"
              >
                <FaQuoteLeft className="w-6 h-6 text-gold/30 mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < testimonial.rating
                          ? "text-gold"
                          : "text-gray-700"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 flex items-center justify-center">
                    <span className="text-gold text-sm font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
