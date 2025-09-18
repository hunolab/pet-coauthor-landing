import { Heart, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-accent" />
              <span className="font-heading font-bold text-xl">Eles nos escolheram</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Um projeto literário que celebra as histórias mais tocantes entre humanos e seus companheiros!
            </p>
            <p>
              LITERARE BOOKS INTERNATIONAL LTDA - CNPJ 10.789.508/0001-74 <br></br> End.: Alameda dos Guatás, 102 - Vila da Saúde - São Paulo - SP - 04053-040
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/literarebooks/" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
             
              
            </div>
          </div>

          {/* Quick Links */}

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-gray-300">comercial3@literarebooks.com.br</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-gray-300">(11) 2659-0964 </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Literare Books International. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center space-x-1">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-accent" />
              <span>para amantes de pets</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;