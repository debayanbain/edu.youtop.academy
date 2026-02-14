import HeroSection from "@/components/home/hero-section";
import FeaturesGrid from "@/components/home/features-grid";
import LatestUpdates from "@/components/home/latest-updates";
import BestSellers from "@/components/home/best-sellers";
import CtaSection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-16">
      <HeroSection />
      <FeaturesGrid />

      {/* Main Content — sidebar + featured content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LatestUpdates />
          </div>
          <div className="lg:col-span-2">
            <BestSellers />
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
