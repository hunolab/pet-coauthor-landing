import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import VideoCardsSection from "@/components/VideoCardsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize smooth scrolling and GSAP settings
    gsap.config({ force3D: true });
    
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Cleanup on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <VideoCardsSection />
      <AboutSection />
      <TestimonialsSection />
      <LeadCaptureForm />
      <Footer />
    </main>
  );
};

export default Index;