import { Suspense } from 'react'
import localFont from 'next/font/local'

// Nouveaux composants
import Navbar from "@/components/LandingPage/Navbar";
import HeroSection from "@/components/LandingPage/HeroSection";
import WhySection from "@/components/LandingPage/WhySection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import PricingSection from "@/components/LandingPage/PricingSection";
import TestimonialsSection from "@/components/LandingPage/TestimonialsSection";
import FooterSection from "@/components/LandingPage/FooterSection";
import BuiltBySection from '@/components/LandingPage/BuiltBySection';

const naturaly = localFont({ 
  src: '../public/Naturaly.otf',
  variable: '--font-naturaly'
})

export default function Home() {
  return (
    <div className={`${naturaly.variable}`}>
      <Suspense>
        <Navbar />
      </Suspense>
      <HeroSection />
      <FeaturesSection />
      <WhySection />
      <PricingSection />
      <TestimonialsSection />
      <BuiltBySection />
      <FooterSection />
    </div>
  );
}