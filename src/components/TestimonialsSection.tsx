import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ana Carolina",
    role: "Veterinária e Escritora",
    content: "Uma oportunidade incrível de compartilhar experiências únicas sobre o mundo dos pets. A proposta é inspiradora e o projeto promete tocar muitos corações.",
    avatar: "/api/placeholder/80/80",
    rating: 5
  },
  {
    name: "Roberto Silva",
    role: "Especialista em Comportamento Animal",
    content: "Fiquei impressionado com a seriedade e profissionalismo da proposta. Definitivamente uma chance de contribuir para algo realmente significativo na literatura pet.",
    avatar: "/api/placeholder/80/80",
    rating: 5
  },
  {
    name: "Mariana Costa",
    role: "Ativista pelos Direitos dos Animais",
    content: "Esta é uma forma maravilhosa de dar voz às histórias que precisam ser contadas. Um projeto que celebra o amor incondicional dos nossos companheiros.",
    avatar: "/api/placeholder/80/80",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards.length) return;

    // Animate testimonials
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          rotationY: index % 2 === 0 ? -10 : 10
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
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
            O que dizem sobre o Projeto
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Especialistas e amantes de pets compartilham suas impressões sobre esta iniciativa única
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-card p-8 rounded-2xl hover-lift hover:bg-white transition-all duration-300 border border-border/50 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-brand-blue-soft flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;