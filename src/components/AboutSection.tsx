import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    // Parallax effect for the image
    gsap.fromTo(image,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(content.children,
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 text-primary">
              Uma Obra Literária 
              <span className="block text-accent">sobre Pets</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Este livro será uma coletânea única de histórias reais, tocantes e inspiradoras sobre a relação especial entre humanos e seus companheiros de quatro patas.
              </p>
              
              <p>
                Cada coautor terá a oportunidade de contribuir com sua experiência pessoal, criando uma obra diversa que celebra o amor incondicional, a lealdade e as lições de vida que nossos pets nos proporcionam diariamente.
              </p>
              
              <p>
                Mais do que um livro, esta será uma jornada emocional que conecta corações através de histórias autênticas sobre resgate, cura, companheirismo e a magia transformadora do amor aos animais.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm font-medium text-primary">Histórias Reais</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-blue-intense rounded-full"></div>
                <span className="text-sm font-medium text-primary">Publicação Profissional</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-blue-soft rounded-full"></div>
                <span className="text-sm font-medium text-primary">Comunidade Exclusiva</span>
              </div>
            </div>
          </div>

          {/* Book Mockup Placeholder */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative">
              {/* Main book mockup placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-brand-blue-intense via-brand-blue-soft to-primary rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-8 bg-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🐾</span>
                    </div>
                    <div className="font-heading font-bold text-lg mb-2">Livro sobre Pets</div>
                    <div className="text-sm opacity-80">Histórias de Amor</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute -bottom-6 -right-6 w-6 h-6 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -right-8 w-4 h-4 bg-brand-blue-soft rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;