"use client";

import { Testimonial } from "./types";
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from "./constants";

const STORAGE_KEY = "srk_testimonials_v1";

export function loadTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return DEFAULT_TESTIMONIALS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  saveTestimonials(DEFAULT_TESTIMONIALS);
  return DEFAULT_TESTIMONIALS;
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
  } catch {}
}

export function resetTestimonials(): Testimonial[] {
  saveTestimonials(DEFAULT_TESTIMONIALS);
  return DEFAULT_TESTIMONIALS;
}
