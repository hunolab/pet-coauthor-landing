import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://i.postimg.cc/t4fxcLhG/1.png',
  'https://i.ibb.co/j9h2TN6T/A-primeira-segunda-feira-CAPA-com-selopng.png',
  'https://i.ibb.co/JWHvpxfH/Capa-frontal-10-PODCAST.png',
  'https://i.ibb.co/21zfmCRF/capa-frontal-com-selo.png',
  'https://i.ibb.co/hJcn9dST/Capa-com-selo-Maria-Candida-2.png',
  'https://i.ibb.co/fdJnHgzv/capa-edicao-especial-em-baixa-2.png',
  'https://i.ibb.co/qFFk7WXj/Capa-frontal-Carlos-Eduardo.jpg',
  'https://i.ibb.co/j9F191yC/frontal-5.png',
  'https://i.ibb.co/qFL0X4Cg/Capa-Laura-selo.png',
  'https://i.ibb.co/mrJRBf6q/Capa-2-Overdone-1.png',
  'https://i.ibb.co/mW6GNr8/Capa-com-selo.png',
  'https://i.ibb.co/C5s6Zn8c/Capa-Gilson-1.png',
];

const TweetDemo: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!track || !section || !card) return;

    // Calculate total width for seamless looping
    const bookCovers = track.querySelectorAll('.book-cover');
    const coverWidth = bookCovers[0]?.getBoundingClientRect().width || 0;
    const totalWidth = coverWidth * images.length;

    // Infinite carousel animation
    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      repeat: -1,
      duration: 20,
      modifiers: {
        x: gsap.utils.unitize((x: number) => x % totalWidth, 'px'),
      },
    });

    // Hover animations for book covers
    bookCovers.forEach((cover) => {
      cover.addEventListener('mouseenter', () => {
        gsap.to(cover, {
          scale: 1.05,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      cover.addEventListener('mouseleave', () => {
        gsap.to(cover, {
          scale: 1,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Section animation
    gsap.fromTo(
      section,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Card content animation
    gsap.fromTo(
      card.children,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      bookCovers.forEach((cover) => {
        cover.removeEventListener('mouseenter', () => {});
        cover.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        className="relative py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
          Explore Nossos Títulos
        </h2>
        <div className="absolute top-0 left-0 w-8 md:w-16 h-full z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-8 md:w-16 h-full z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        <div
          className="relative flex gap-3 md:gap-4 px-4"
          ref={trackRef}
          style={{ minWidth: `${images.length * 100}%` }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="book-cover flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg overflow-hidden relative transition-all duration-300"
              style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
              <img
                src={src}
                alt={`Capa do livro ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>
      <section ref={cardRef} className="py-8 md:py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <img
                src="https://i.ibb.co/wNQx0g3T/jorgetakeda.png"
                alt="Jorge Takeda"
                loading="lazy"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3"
              />
              <div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Jorge Takeda</h2>
                <h3 className="text-xs md:text-sm text-gray-600">Diretor de Negócios e Marketing</h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-900 mb-4">
              Por menos de 14 reais por dia, você e seu pet podem fazer parte de uma obra incrível! Compartilhar suas histórias e eternizar seu amor em um livro emocionante.
            </p>
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src="/imgs/Sejacoautor.png"
                alt="Banner promocional"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-1 mt-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 md:w-5 md:h-5 stroke-yellow-500 fill-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TweetDemo;