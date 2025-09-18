import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LeadCaptureForm = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Animação da seção ao aparecer
    gsap.fromTo(
      section.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Verifica se o formulário já existe e remove se houver
    const formContainer = document.getElementById(
      "coautoria-pet-0f2c03002cccef64bff5"
    );
    if (!formContainer) return;

    formContainer.innerHTML = "";

    // Criar o formulário RD Station dinamicamente
    const script = document.createElement("script");
    script.src =
      "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new RDStationForms(
        "coautoria-pet-0f2c03002cccef64bff5",
        "null"
      ).createForm();

      // Aplicar estilos customizados após o form ser carregado
      setTimeout(() => {
        const form = formContainer.querySelector("form") as HTMLElement | null;
        if (!form) return;

        form.classList.add("w-full", "space-y-6");

        // Campos
        const inputs = form.querySelectorAll(
          "input, textarea"
        ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
        inputs.forEach((input) => {
          input.classList.add(
            "w-full",
            "h-12",
            "border-2",
            "border-border",
            "rounded-lg",
            "px-4",
            "transition-all",
            "duration-300",
            "focus:outline-none",
            "focus:border-accent"
          );
        });

        // Botão
        const button = formContainer.querySelector(
          "button"
        ) as HTMLButtonElement | null;
        if (button) {
          button.classList.add(
            "bg-brand-blue-intense",
            "text-white",
            "font-semibold",
            "rounded-lg",
            "h-12",
            "w-full",
            "transition-all",
            "duration-300",
            "hover:bg-brand-blue-soft",
            "flex",
            "items-center",
            "justify-center",
            "gap-2"
          );
        }
      }, 500); // espera o formulário renderizar
    };
    section.appendChild(script);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <section
      id="lead-capture"
      ref={sectionRef}
      className="section-spacing bg-white"
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 text-primary">
              
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Preencha o formulário abaixo e faça parte desta jornada literária
              única. Em breve entraremos em contato para conhecer sua história.
            </p>
          </div>

          {/* RD Station Form */}
          <div role="main" id="coautoria-pet-0f2c03002cccef64bff5" className="mx-auto"></div>
          <script
            type="text/javascript"
            src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"
          ></script>
          <script type="text/javascript">
            new RDStationForms('coautoria-pet-0f2c03002cccef64bff5', 'null').createForm();
          </script>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;