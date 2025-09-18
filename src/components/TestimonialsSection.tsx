import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Julia Dias",
    role: "Estudante de Veterinária",
    content: "Amei essa ideia! Transformar memórias e momentos especiais com nossos animais em um livro é algo inspirador. Parabéns a todos que vão tornam isso possível, é simplesmente lindo!",
    avatar: "/imgs/juliadias.png",
    rating: 5
  },
  {
    name: "Maria Fernanda Toffoli",
    role: "Mestre em Direito da Saúde Animal",
    content: "Fiquei impressionada com a seriedade e o profissionalismo da proposta. Definitivamente, é uma oportunidade de contribuir para algo realmente significativo na literatura pet.",
    avatar: "/imgs/Toffoli.png",
    rating: 5
  },
  {
    name: "Tatiana Carilly",
    role: "Jornalista, Pedagoga, Mestre em Comunicação Social",
    content: "Esta é uma forma maravilhosa de dar voz a histórias que merecem ser contadas. Um projeto que celebra o amor incondicional dos nossos companheiros.",
    avatar: "/imgs/tatiana.png",
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

    // Staggered animation for cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.15
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4 text-primary">
            O que dizem sobre o Projeto
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Especialistas e amantes de pets compartilham suas impressões sobre esta iniciativa única
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-card p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-accent fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 relative z-10">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  loading="lazy"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-primary text-sm md:text-base">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
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