
import { MapPin, Phone, Mail, Clock, Award, Star, Shield } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';

const Footer = () => {
  const { content } = useContentStore();
  
  const quickLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Nos Produits', href: '#produits' },
    { name: 'À Propos', href: '#apropos' },
    { name: 'Contact', href: '#contact' },
  ];

  const products = [
    { name: 'Assurance Auto', href: '#' },
    { name: 'Assurance Habitation', href: '#' },
    { name: 'Assurance Santé', href: '#' },
    { name: 'Prévoyance', href: '#' },
    { name: 'Épargne & Retraite', href: '#' },
    { name: 'Assurance Pro', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Enhanced decorative background elements with better visibility */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Enhanced company info with prominent logo */}
          <div className="lg:col-span-2">
            <div className="mb-8 group">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-500 relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                      alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                      className="h-20 w-auto md:h-24 filter brightness-0 invert transition-all duration-300 group-hover:scale-110 drop-shadow-2xl"
                    />
                    <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"></div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold leading-tight tracking-wide mb-1 text-white">
                      MOUMEN TECHNIQUE
                    </div>
                    <div className="text-red-400 font-bold text-lg tracking-wider mb-2">
                      & PREVOYANCE
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-red-400" />
                    <span className="text-white font-semibold">Agent Général AXA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-300 font-medium">Agréé ACAPS - Plus de 20 ans d'expérience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300 font-medium">Licence Officielle Maroc</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre agent général AXA au Maroc. Plus de 20 ans d'expérience 
              dans l'assurance et la prévoyance. Votre partenaire de confiance pour protéger ce qui compte le plus.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-gray-300">{content.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-gray-300">{content.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-gray-300">{content.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-gray-300">{content.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-white">
              Liens Rapides
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-2 transform duration-200 inline-block hover:text-red-400 font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-white">
              Nos Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3 mb-8">
              {products.slice(0, 4).map((product, index) => (
                <li key={index}>
                  <a 
                    href={product.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-2 transform duration-200 inline-block hover:text-red-400 font-medium"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-red-500/50 transition-all">
              <h4 className="font-bold mb-3 text-red-400 flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Agréments Officiels</span>
              </h4>
              <div className="space-y-1 text-gray-300 text-sm">
                <p>🏛️ Agent Général AXA</p>
                <p>✅ Agréé ACAPS</p>
                <p>📋 Licence n° XXXX</p>
                <p>🇲🇦 Certifié Maroc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Copyright with better contrast */}
      <div className="border-t border-white/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2024 MOUMEN TECHNIQUE ET PREVOYANCE. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Propulsé par</span>
              <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110">
                <span className="text-gray-800 font-bold text-xl">AXA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
