import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { AGENT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.jpg"
                alt="Pyramid Star Real Estate Brokerage"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="font-heading text-xl font-bold text-white tracking-wide">
                  Pyramid Star
                </span>
                <span className="text-gold text-xs block -mt-1">
                  Real Estate Brokerage
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {AGENT.tagline}. Your trusted partner for buying, renting, and
              investing in premium Dubai properties.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/#properties", label: "Properties" },
                { href: "/#services", label: "Services" },
                { href: "/#areas", label: "Areas" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${AGENT.phone}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors"
                >
                  <FiPhone className="w-4 h-4 text-gold" />
                  {AGENT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AGENT.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors"
                >
                  <FiMail className="w-4 h-4 text-gold" />
                  {AGENT.email}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <FiMapPin className="w-4 h-4 text-gold shrink-0" />
                  Dubai, United Arab Emirates
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href={AGENT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-200"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={AGENT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-200"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href={AGENT.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-200"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-6">
              &copy; {new Date().getFullYear()} Pyramid Star Real Estate Brokerage. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
