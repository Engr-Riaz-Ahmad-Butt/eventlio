import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MarketplacePreview } from "@/components/landing/MarketplacePreview";
import { Navbar } from "@/components/landing/Navbar";
import { PakistanMap } from "@/components/landing/PakistanMap";
import { PlatformExplainer } from "@/components/landing/PlatformExplainer";
import { Pricing } from "@/components/landing/Pricing";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { VendorFeatures } from "@/components/landing/VendorFeatures";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <PlatformExplainer />
        <VendorFeatures />
        <MarketplacePreview />
        <HowItWorks />
        <ComparisonTable />
        <Pricing />
        <Testimonials />
        <PakistanMap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
