import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoCards = [
  {
    title: "Histórias de Resgate",
    description: "Compartilhe emocionantes relatos de salvamento e transformação de vidas através do amor aos animais.",
    videoSrc: "/api/placeholder/400/600"
  },
  {
    title: "Momentos Especiais",
    description: "Capture e eternize os momentos mais marcantes e divertidos ao lado do seu companheiro de quatro patas.",
    videoSrc: "/api/placeholder/400/600"
  },
  {
    title: "Lições de Vida",
    description: "Descubra como os pets nos ensinam sobre amor, lealdade, perseverança e felicidade genuína.",
    videoSrc: "/api/placeholder/400/600"
  },
  {
    title: "Conexões Únicas",
    description: "Explore o vínculo extraordinário entre humanos e animais que transcende palavras e barreiras.",
    videoSrc: "/api/placeholder/400/600"
  }
];

const VideoCardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards.length) return;

    // Staggered animation for cards
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 60,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Individual hover animations
    cards.forEach((card) => {
      const video = card.querySelector('video');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (video) {
          gsap.to(video, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (video) {
          gsap.to(video, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 text-primary">
            Temas para sua História
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore diferentes abordagens para contar sua experiência única com o mundo dos pets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoCards.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50"
            >
              {/* Video Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500"
                >
                  <source src={card.videoSrc} type="video/mp4" />
                </video>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-3 text-primary group-hover:text-brand-blue-intense transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCardsSection;