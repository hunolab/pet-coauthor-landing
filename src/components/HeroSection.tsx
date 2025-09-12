import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current; 
    const video = videoRef.current;

    if (!hero || !content || !video) return;

    // Initial animation on load
    gsap.fromTo(content.children, 
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      }
    );

    // Squadeasy-style scroll effect
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Fade out content and video with parallax
        gsap.to(content, {
          opacity: 1 - progress * 1.5,
          y: -progress * 100,
          duration: 0.1,
          ease: "none"
        });
        
        gsap.to(video, {
          opacity: 1 - progress * 0.8,
          scale: 1 + progress * 0.1,
          duration: 0.1,
          ease: "none"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-capture');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-gradient-to-br from-brand-blue-intense/30 via-brand-blue-soft/20 to-transparent video-overlay"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/api/placeholder/1920/1080" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center text-white container-custom">
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          Seja Coautor de um
          <span className="block text-accent"> Livro sobre Pets</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
          Compartilhe suas experiências únicas com animais de estimação e faça parte de uma obra inspiradora que celebra o amor incondicional dos pets.
        </p>
        
        <Button 
          onClick={scrollToForm}
          variant="hero"
          size="xl"
        >
          Quero ser Coautor
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;