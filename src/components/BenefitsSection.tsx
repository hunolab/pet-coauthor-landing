import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Users, BookOpen, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Heart,
    title: "Compartilhe Amor",
    description: "Divida suas histórias mais tocantes e inspiradoras sobre o amor incondicional dos pets."
  },
  {
    icon: Users,
    title: "Comunidade Exclusiva",
    description: "Faça parte de uma comunidade seleta de amantes de animais e escritores apaixonados."
  },
  {
    icon: BookOpen,
    title: "Obra Publicada",
    description: "Tenha seu nome como coautor em uma obra literária real e profissionalmente publicada."
  },
  {
    icon: Award,
    title: "Reconhecimento",
    description: "Ganhe visibilidade e reconhecimento como especialista e amante de animais de estimação."
  }
];

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards.length) return;

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.08,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-12 md:py-16 bg-muted/30">
      <div className="container-custom px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 md:mb-6 text-primary">
            Por que se tornar Coautor?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-prose mx-auto leading-relaxed">
            Uma oportunidade única de transformar suas experiências com pets em uma obra literária inspiradora
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group text-center p-4 sm:p-6 md:p-8 bg-card rounded-lg sm:rounded-xl sm:hover-lift sm:hover:bg-white transition-all duration-300 border border-border/50 max-w-sm mx-auto"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary to-brand-blue-soft rounded-full flex items-center justify-center sm:group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                
                <h3 className="font-heading font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 text-primary sm:group-hover:text-brand-blue-intense transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;