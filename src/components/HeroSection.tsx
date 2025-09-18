import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const video = videoRef.current;

    if (!hero || !content || !video) return;

    // Optimize video loading
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.muted = true;
    video.loop = true;
    video.autoplay = true;

    // Lazy-load video for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.src = video.dataset.src || "/video/dog.mp4";
            video.load();
            video.play().catch((error) => console.error("Video playback error:", error));
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // Animação inicial do conteúdo
    gsap.fromTo(
      content.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Scroll effect otimizado
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(content, {
          opacity: 1 - progress * 1.2,
          y: -progress * 80,
          duration: 0,
          ease: "none",
        });

        gsap.to(video, {
          opacity: 1 - progress * 0.6,
          scale: 1 + progress * 0.05,
          duration: 0,
          ease: "none",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      observer.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("lead-capture");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[60vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
  ref={videoRef}
  muted
  loop
  autoPlay
  playsInline
  preload="metadata"   // 👈 leve
  poster="/video/dog-poster.jpg"
  className="w-full h-full object-cover"
>
  <source src="/video/dog1.mp4" type="video/mp4" />
</video>

        {/* Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-blue-intense/30 via-brand-blue-soft/20 to-transparent z-10"></div>
      </div>

      {/* Conteúdo central */}
      <div
        ref={contentRef}
        className="relative z-20 text-center text-white container-custom pb-16 sm:pb-24"
      >
        <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
          Seja Coautor de um
          <span className="block">
            Livro sobre{" "}
            <span
              style={{
                color: "#1a87b5",
                textShadow:
                  "-1px -1px 0 #ffffffff, 1px -1px 0 #ffffffff, -1px 1px 0 #ffffffff, 1px 1px 0 #ffffffff",
              }}
            >
              Pets
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed opacity-90">
          Compartilhe suas experiências únicas com animais de estimação e faça
          parte de uma obra inspiradora que celebra o amor incondicional dos
          pets.
        </p>
      </div>

      {/* Botão centralizado na parte inferior */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <Button
          onClick={scrollToForm}
          variant="hero"
          size="lg"
          className="w-[90vw] sm:w-auto px-6 py-3 text-sm sm:text-base md:text-lg"
        >
          Quero ser Coautor
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;