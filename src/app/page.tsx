import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import FeaturedProperties from "@/components/properties/FeaturedProperties";
import Services from "@/components/sections/Services";
import DubaiAreas from "@/components/sections/DubaiAreas";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <DubaiAreas />
      <Contact />
    </>
  );
}
