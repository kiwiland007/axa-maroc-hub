
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
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 relative overflow-hidden border-t border-gray-200">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company info with modern card design */}
          <div className="lg:col-span-2">
            <div className="mb-8 group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:bg-white/90 hover:shadow-lg transition-all duration-500 relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                      alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                      className="h-16 w-auto md:h-20 transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold leading-tight tracking-wide mb-1 text-gray-800">
                      MOUMEN TECHNIQUE
                    </div>
                    <div className="text-red-500 font-bold text-base md:text-lg tracking-wider mb-2">
                      & PREVOYANCE
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700 font-semibold">Agent Général AXA</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-600 font-medium">Agréé ACAPS - Plus de 20 ans d'expérience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-600 font-medium">Licence Officielle Maroc</span>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  Votre agent général AXA au Maroc. Plus de 20 ans d'expérience 
                  dans l'assurance et la prévoyance. Votre partenaire de confiance pour protéger ce qui compte le plus.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/60 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-gray-700 font-medium">{content.contact.address}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/60 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-gray-700 font-medium">{content.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/60 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-gray-700 font-medium">{content.contact.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/60 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-gray-700 font-medium">{content.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-gray-800">
              Liens Rapides
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-red-500 transition-all hover:translate-x-2 transform duration-200 inline-block font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-gray-800">
              Nos Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4 mb-8">
              {products.slice(0, 4).map((product, index) => (
                <li key={index}>
                  <a 
                    href={product.href} 
                    className="text-gray-600 hover:text-red-500 transition-all hover:translate-x-2 transform duration-200 inline-block font-medium"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-red-200 transition-all">
              <h4 className="font-bold mb-4 text-red-500 flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Agréments Officiels</span>
              </h4>
              <div className="space-y-2 text-gray-600 text-sm">
                <p className="flex items-center space-x-2">
                  <span>🏛️</span>
                  <span>Agent Général AXA</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Agréé ACAPS</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>Licence n° XXXX</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>🇲🇦</span>
                  <span>Certifié Maroc</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright with clean design */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0 font-medium">
              © 2024 MOUMEN TECHNIQUE ET PREVOYANCE. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Propulsé par</span>
              <div className="w-16 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
                <span className="text-white font-bold text-xl">AXA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
