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
import CarouselSection from "@/components/CarouselSection";
import ProcessoEditorial from "@/components/processoeditorial";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    gsap.config({ force3D: true });
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  try {
    return (
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <ProcessoEditorial />
        <VideoCardsSection />
        <TestimonialsSection />
        <CarouselSection />
        <LeadCaptureForm />
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Erro na renderização:", error);
    return <div>Erro ao carregar a página. Verifique o console para mais detalhes.</div>;
  }
};

export default Index;