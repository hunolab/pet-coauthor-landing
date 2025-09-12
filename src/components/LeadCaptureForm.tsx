import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    // Animate form on scroll
    gsap.fromTo(form.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Microinteraction for button
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success animation
    toast.success("Obrigado! Em breve entraremos em contato.", {
      description: "Sua inscrição foi recebida com sucesso.",
    });

    // Reset form
    setFormData({ name: '', email: '', phone: '' });
    setIsSubmitting(false);

    // Success microinteraction
    if (button) {
      gsap.to(button, {
        backgroundColor: "#22c55e",
        duration: 0.3,
        ease: "power2.out"
      });
      
      setTimeout(() => {
        gsap.to(button, {
          backgroundColor: "",
          duration: 0.3,
          ease: "power2.out"
        });
      }, 2000);
    }
  };

  return (
    <section id="lead-capture" ref={sectionRef} className="section-spacing bg-gradient-to-br from-muted/50 to-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 text-primary">
              Quero ser Coautor
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Preencha o formulário abaixo e faça parte desta jornada literária única. Em breve entraremos em contato para conhecer sua história.
            </p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2 group-focus-within:text-accent transition-colors">
                  Nome Completo *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-12 border-2 border-border focus:border-accent transition-all duration-300 rounded-lg"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2 group-focus-within:text-accent transition-colors">
                  E-mail *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 border-2 border-border focus:border-accent transition-all duration-300 rounded-lg"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2 group-focus-within:text-accent transition-colors">
                Telefone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full h-12 border-2 border-border focus:border-accent transition-all duration-300 rounded-lg"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="cta"
                size="xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  "Quero ser Coautor"
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Ao enviar este formulário, você concorda com nossa Política de Privacidade e autoriza o contato para mais informações sobre o projeto.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;