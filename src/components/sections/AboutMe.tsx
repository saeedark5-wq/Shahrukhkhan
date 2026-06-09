"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaHandshake, FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { AGENT } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";

const badges = [
  {
    icon: FaAward,
    label: "RERA Certified Agent",
    value: AGENT.license,
    certImage: "/images/BROKER CARD.jfif",
  },
  {
    icon: FaStar,
    label: "Experience",
    value: AGENT.experience,
  },
  {
    icon: FaHandshake,
    label: "Deals Closed",
    value: AGENT.dealsClosed,
  },
];

export default function AboutMe() {
  const [showCert, setShowCert] = useState<string | null>(null);
  return (
    <section className="py-20 md:py-28 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border border-gold/20 rounded-sm translate-x-4 translate-y-4" />
              <div
                className="relative w-full h-full bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage:
                    "url('/images/shahrukh-khan-a.jfif')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-sm" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {AGENT.name}
                  </h3>
                  <p className="text-gold text-sm">{AGENT.company}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">
                About Me
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Your Trusted Partner in{" "}
              <span className="text-gold">Dubai Real Estate</span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-8">{AGENT.bio}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => badge.certImage && setShowCert(badge.certImage)}
                  className={`bg-card border border-card-border rounded-sm p-5 text-center transition-colors ${
                    badge.certImage
                      ? "cursor-pointer hover:border-gold/50 hover:bg-gold/5"
                      : "hover:border-gold/30"
                  }`}
                >
                  <badge.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">
                    {badge.value}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{badge.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCert(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCert(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
              <img
                src={showCert}
                alt="Broker Certificate"
                className="w-full h-auto rounded-sm"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
