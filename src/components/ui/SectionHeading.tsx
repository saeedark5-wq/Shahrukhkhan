"use client";

import AnimatedSection from "./AnimatedSection";

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light }: Props) {
  return (
    <AnimatedSection className="text-center mb-12 md:mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8 bg-gold" />
        <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">
          Pyramid Star Real Estate Brokerage
        </span>
        <div className="h-px w-8 bg-gold" />
      </div>
      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold ${
          light ? "text-gold" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
