"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { AGENT, WHATSAPP_MESSAGE } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    const whatsappMsg = `New Inquiry from ${formData.name} (${formData.email}): ${formData.message}`;
    const url = `https://wa.me/${AGENT.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(url, "_blank");
    setSending(false);
    setFormData({ name: "", email: "", message: "" });
    toast.success("Message sent via WhatsApp!");
  };

  const whatsappUrl = `https://wa.me/${AGENT.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to find your dream property in Dubai? Get in touch with me today."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-card border border-card-border rounded-sm px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-card border border-card-border rounded-sm px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-card border border-card-border rounded-sm px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-4 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                <FiSend className="w-4 h-4" />
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-card border border-card-border rounded-sm">
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                  <FiPhone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <a
                    href={`tel:${AGENT.phone}`}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {AGENT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card border border-card-border rounded-sm">
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                  <FiMail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <a
                    href={`mailto:${AGENT.email}`}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {AGENT.email}
                  </a>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/PYRAMID+STAR+REAL+ESTATE+BROKERAGE/@25.1178379,55.3906289,656m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f656deea1fc63:0x3cbccabb05e8d4f8!8m2!3d25.1178379!4d55.3906289!16s%2Fg%2F11fp84xpkl?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-card border border-card-border rounded-sm hover:border-gold/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <FiMapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400 text-sm group-hover:text-gold transition-colors">
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#22c35e] transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
