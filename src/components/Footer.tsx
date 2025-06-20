
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

  const legal = [
    { name: 'Mentions Légales', href: '#' },
    { name: 'Politique de Confidentialité', href: '#' },
    { name: 'Conditions Générales', href: '#' },
    { name: 'Réclamations', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Decorative background elements with brand colors */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Enhanced company info with prominent logo */}
          <div className="lg:col-span-2">
            <div className="mb-10 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 relative">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                      alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                      className="h-24 w-auto md:h-28 filter brightness-0 invert transition-all duration-300 group-hover:scale-110 drop-shadow-2xl"
                    />
                    <div className="absolute -bottom-3 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-orange-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"></div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold leading-tight tracking-wide mb-1">
                      MOUMEN TECHNIQUE
                    </div>
                    <div className="text-red-500 font-bold text-xl tracking-wider mb-3">
                      & PREVOYANCE
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-red-500" />
                    <span className="text-white font-semibold text-lg">Agent Général AXA</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-orange-400" />
                    <span className="text-orange-400 font-semibold">Agréé ACAPS - Plus de 20 ans d'expérience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">Licence Officielle Maroc</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Votre agent général AXA au Maroc. Plus de 20 ans d'expérience 
              dans l'assurance et la prévoyance. Votre partenaire de confiance pour protéger ce qui compte le plus.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-gray-300 text-lg">{content.contact.address}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-gray-300 text-lg">{content.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-gray-300 text-lg">{content.contact.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-gray-300 text-lg">{content.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-2xl font-bold mb-8 relative">
              Liens Rapides
              <div className="absolute -bottom-3 left-0 w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-3 transform duration-200 inline-block hover:text-red-400 text-lg font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales et produits combinés */}
          <div>
            <h3 className="text-2xl font-bold mb-8 relative">
              Nos Services
              <div className="absolute -bottom-3 left-0 w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4 mb-10">
              {products.slice(0, 4).map((product, index) => (
                <li key={index}>
                  <a 
                    href={product.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-3 transform duration-200 inline-block hover:text-red-400 text-lg font-medium"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-red-500/50 transition-all">
              <h4 className="font-bold mb-4 text-red-500 flex items-center space-x-3 text-xl">
                <Award className="h-6 w-6" />
                <span>Agréments Officiels</span>
              </h4>
              <div className="space-y-2 text-gray-300">
                <p className="text-lg">🏛️ Agent Général AXA</p>
                <p className="text-lg">✅ Agréé ACAPS</p>
                <p className="text-lg">📋 Licence n° XXXX</p>
                <p className="text-lg">🇲🇦 Certifié Maroc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Copyright with brand consistency */}
      <div className="border-t border-white/20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-lg">
              © 2024 MOUMEN TECHNIQUE ET PREVOYANCE. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-6 md:mt-0">
              <span className="text-gray-300 text-lg">Propulsé par</span>
              <div className="w-20 h-16 bg-white rounded-xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
                <span className="text-gray-800 font-bold text-2xl">AXA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
