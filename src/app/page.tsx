import { ContactSection } from "@/components/contact-section";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { HowIWork } from "@/components/how-i-work";
import { Work } from "@/components/work";

// Re-render at most once an hour so the live Good Fights numbers stay fresh.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <HowIWork />
      <Experience />
      <ContactSection />
    </>
  );
}
