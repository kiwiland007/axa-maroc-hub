
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

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
    <footer className="bg-axa-gray-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Informations entreprise */}
          <div>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre agent général AXA au Maroc. Plus de 20 ans d'expérience 
              dans l'assurance et la prévoyance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-gray-300">123 Avenue Mohammed V, Casablanca</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-gray-300">+212 5XX-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-gray-300">contact@moumentechnique.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-gray-300">Lun-Ven: 8h-18h, Sam: 8h-12h</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos produits */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos Produits</h3>
            <ul className="space-y-3">
              {products.map((product, index) => (
                <li key={index}>
                  <a 
                    href={product.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Informations Légales</h3>
            <ul className="space-y-3">
              {legal.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold mb-2">Agréments</h4>
              <p className="text-sm text-gray-300">
                Agent Général AXA<br />
                Agréé ACAPS<br />
                Licence n° XXXX
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 MOUMEN TECHNIQUE ET PREVOYANCE. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">Propulsé par AXA</span>
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-axa-gray-dark font-bold text-xs">AXA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
