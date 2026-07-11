"use client";

import { useQuery } from '@tanstack/react-query';
import HeroSection from "@/components/home/hero-section";
import FeaturesGrid from "@/components/home/features-grid";
import LatestUpdates from "@/components/home/latest-updates";
import BestSellers from "@/components/home/best-sellers";
import CtaSection from "@/components/home/cta-section";
import { Loader } from "@/components/ui/loader";
import { HomepageResponseDto, HeroSectionDto, LatestUpdatesSectionDto, BestSellersSectionDto, CtaBannerSectionDto, JobHighlightsSectionDto } from "@/lib/homepage-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const fetchHomepageData = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/homepage`);
  if (!res.ok) throw new Error('Failed to fetch homepage data');
  const json = await res.json();
  return json.data as HomepageResponseDto;
};

export default function HomePage() {
  const { data: homepageData, isLoading, error } = useQuery({
    queryKey: ['homepage'],
    queryFn: fetchHomepageData,
  });

  const sections = homepageData?.sections || [];
  
  const heroData = sections.find(s => s.__component === 'sections.hero') as HeroSectionDto | undefined;
  const updatesData = sections.find(s => s.__component === 'sections.latest-updates') as LatestUpdatesSectionDto | undefined;
  const bestSellersData = sections.find(s => s.__component === 'sections.best-sellers') as BestSellersSectionDto | undefined;
  const jobHighlightsData = sections.find(s => s.__component === 'sections.job-highlights') as JobHighlightsSectionDto | undefined;
  const ctaData = sections.find(s => s.__component === 'sections.cta-banner') as CtaBannerSectionDto | undefined;

  if (isLoading) {
    return <Loader layout="fullscreen" text="Preparing your academy..." />;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center">Error loading homepage data.</div>;
  }

  return (
    <div className="space-y-8 sm:space-y-16">
      {/* We pass the dynamic data to the existing components without changing their design */}
      <HeroSection data={heroData} />
      <FeaturesGrid />

      {/* Main Content — sidebar + featured content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LatestUpdates data={updatesData} />
          </div>
          <div className="lg:col-span-2">
            <BestSellers data={bestSellersData} jobData={jobHighlightsData} />
          </div>
        </div>
      </section>

      <CtaSection data={ctaData} />
    </div>
  );
}
