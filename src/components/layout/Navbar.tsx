"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiPhone, FiLock } from "react-icons/fi";
import { AGENT } from "@/lib/constants";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#properties", label: "Properties" },
  { href: "/#services", label: "Services" },
  { href: "/#areas", label: "Areas" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jfif"
              alt="Pyramid Star Real Estate Brokerage"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold text-white tracking-wide">
                Pyramid Star
              </span>
              <span className="text-gold text-sm block -mt-1">
                Real Estate Brokerage
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${AGENT.phone}`}
              className="hidden md:flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <FiPhone className="w-4 h-4" />
              <span>{AGENT.phone}</span>
            </a>
            <Link
              href="/admin/login"
              className="text-xs text-gray-600 hover:text-gold transition-colors"
              title="Admin Panel"
            >
              <FiLock className="w-3.5 h-3.5" />
            </Link>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <HiOutlineX className="w-6 h-6" />
              ) : (
                <HiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg text-gray-300 hover:text-gold transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${AGENT.phone}`}
                className="flex items-center gap-2 text-gold pt-4 border-t border-white/10"
              >
                <FiPhone className="w-4 h-4" />
                {AGENT.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
