import { Hero } from "@/components/Hero";
import { PhotoPreview, QuickAccess } from "@/components/PhotoPreview";
import { VouchersSection } from "@/components/VouchersSection";
import { QuoteSection } from "@/components/QuoteSection";
import { Hours } from "@/components/Hours";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <PhotoPreview />
      <QuickAccess />
      <VouchersSection />
      <QuoteSection />
      <Hours />
      <Contact />
    </main>
  );
}
