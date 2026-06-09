"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { AGENT, WHATSAPP_MESSAGE } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${AGENT.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-xl hover:shadow-[#25D366]/30 transition-shadow"
            onClick={() => {
              if (typeof window !== "undefined" && "gtag" in window) {
                (window as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "whatsapp_click", {
                  event_category: "WhatsApp",
                  event_label: "Floating Button",
                });
              }
            }}
          >
            <FaWhatsapp className="w-6 h-6" />
            <span className="text-sm font-medium hidden sm:inline">
              Chat on WhatsApp
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
