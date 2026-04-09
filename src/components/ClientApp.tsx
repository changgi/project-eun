'use client';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import OverviewSection from '@/components/sections/OverviewSection';
import TimelineSection from '@/components/sections/TimelineSection';
import GallerySection from '@/components/sections/GallerySection';
import LeadersSection from '@/components/sections/LeadersSection';
import BusinessSection from '@/components/sections/BusinessSection';
import VideoSection from '@/components/sections/VideoSection';
import FeaturesSection from '@/components/sections/FeaturesSection';

export default function ClientApp() {
  return (
    <>
      <Navigation />

      <main>
        <HeroSection />
        <OverviewSection />
        <TimelineSection />
        <GallerySection />
        <LeadersSection />
        <BusinessSection />
        <VideoSection />
        <FeaturesSection />
      </main>

      <Footer />
    </>
  );
}
