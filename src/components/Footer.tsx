
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
    <footer className="bg-axa-blue text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Informations entreprise */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-axa-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MT</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">MOUMEN TECHNIQUE</h2>
                <p className="text-sm text-blue-200">& PREVOYANCE</p>
              </div>
            </div>
            
            <p className="text-blue-100 mb-6 leading-relaxed">
              Votre agent général AXA au Maroc. Plus de 20 ans d'expérience 
              dans l'assurance et la prévoyance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-blue-100">123 Avenue Mohammed V, Casablanca</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-blue-100">+212 5XX-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-blue-100">contact@moumentechnique.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-axa-red" />
                <span className="text-sm text-blue-100">Lun-Ven: 8h-18h, Sam: 8h-12h</span>
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
                    className="text-blue-100 hover:text-white transition-colors"
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
                    className="text-blue-100 hover:text-white transition-colors"
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
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold mb-2">Agréments</h4>
              <p className="text-sm text-blue-100">
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
            <p className="text-blue-100 text-sm">
              © 2024 MOUMEN TECHNIQUE ET PREVOYANCE. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-blue-100">Propulsé par AXA</span>
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-axa-blue font-bold text-xs">AXA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
