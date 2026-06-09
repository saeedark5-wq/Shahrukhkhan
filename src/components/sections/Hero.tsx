"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaArrowDown } from "react-icons/fa";
import { AGENT, WHATSAPP_MESSAGE } from "@/lib/constants";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${AGENT.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left w-full">
        <div className="lg:max-w-3xl mx-auto lg:mx-0">


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {AGENT.name}
            <span className="block text-gold mt-2">
              {AGENT.tagline}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-gray-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {AGENT.subtitle}. With {AGENT.experience} of experience and{" "}
            {AGENT.dealsClosed} deals closed, let me help you find your dream
            property.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              href="/#properties"
              className="group relative px-8 py-4 bg-gold text-black font-semibold rounded-sm overflow-hidden transition-all duration-300 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/20"
            >
              <span className="relative z-10">View Properties</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 border border-gold/50 text-gold rounded-sm hover:bg-gold/10 transition-all duration-300"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Contact on WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown className="w-5 h-5 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
