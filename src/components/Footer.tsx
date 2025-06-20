
import { MapPin, Phone, Mail, Clock, Award, Star } from 'lucide-react';

const Footer = () => {
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
    <footer className="bg-gradient-to-br from-axa-gray-dark via-axa-gray-dark to-black text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-axa-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Enhanced company info with prominent logo */}
          <div>
            <div className="mb-8 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 relative">
                <div className="relative mb-4">
                  <img 
                    src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                    alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                    className="h-16 w-auto md:h-20 filter brightness-0 invert transition-all duration-300 group-hover:scale-110 drop-shadow-2xl"
                  />
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-axa-red via-orange-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"></div>
                </div>
                
                <div>
                  <div className="text-xl font-bold leading-tight tracking-wide mb-1">
                    MOUMEN TECHNIQUE
                  </div>
                  <div className="text-axa-red font-bold text-lg tracking-wider mb-3">
                    & PREVOYANCE
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-axa-red" />
                    <span className="text-sm text-gray-300 font-medium">Agent Général AXA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-orange-400" />
                    <span className="text-xs text-orange-400 font-semibold">Agréé ACAPS - Plus de 20 ans d'expérience</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre agent général AXA au Maroc. Plus de 20 ans d'expérience 
              dans l'assurance et la prévoyance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 bg-axa-red/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-axa-red" />
                </div>
                <span className="text-sm text-gray-300">123 Avenue Mohammed V, Casablanca</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 bg-axa-red/20 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-axa-red" />
                </div>
                <span className="text-sm text-gray-300">+212 5XX-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 bg-axa-red/20 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-axa-red" />
                </div>
                <span className="text-sm text-gray-300">contact@moumentechnique.ma</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 bg-axa-red/20 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-axa-red" />
                </div>
                <span className="text-sm text-gray-300">Lun-Ven: 8h-18h, Sam: 8h-12h</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Liens Rapides
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-axa-red to-orange-500"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-2 transform duration-200 inline-block hover:text-axa-red"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos produits */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Nos Produits
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-axa-red to-orange-500"></div>
            </h3>
            <ul className="space-y-3">
              {products.map((product, index) => (
                <li key={index}>
                  <a 
                    href={product.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-2 transform duration-200 inline-block hover:text-axa-red"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Informations Légales
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-axa-red to-orange-500"></div>
            </h3>
            <ul className="space-y-3 mb-6">
              {legal.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-all hover:translate-x-2 transform duration-200 inline-block hover:text-axa-red"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:border-axa-red/50 transition-all">
              <h4 className="font-semibold mb-3 text-axa-red flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Agréments</span>
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Agent Général AXA<br />
                Agréé ACAPS<br />
                Licence n° XXXX
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Copyright */}
      <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 MOUMEN TECHNIQUE ET PREVOYANCE. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">Propulsé par</span>
              <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <span className="text-axa-gray-dark font-bold text-lg">AXA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
