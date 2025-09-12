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
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 text-primary">
            Por que se tornar Coautor?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma oportunidade única de transformar suas experiências com pets em uma obra literária inspiradora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group text-center p-8 bg-card rounded-xl hover-lift hover:bg-white transition-all duration-300 border border-border/50"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-brand-blue-soft rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-heading font-semibold text-xl mb-4 text-primary group-hover:text-brand-blue-intense transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
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