import { About } from "@/components/about";
import { ContactSection } from "@/components/contact-section";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";

// Re-render at most once an hour so the live Good Fights numbers stay fresh.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <ContactSection />
    </>
  );
}
