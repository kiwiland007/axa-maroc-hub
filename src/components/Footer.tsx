
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE" 
                className="h-12 w-auto"
              />
              <div>
                <div className="text-lg font-bold">MOUMEN TECHNIQUE</div>
                <div className="text-sm text-red-400">& PREVOYANCE</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire de confiance en assurance depuis plus de 20 ans. 
              Agent général agréé ACAPS pour toutes vos protections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Nos Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-red-400">Nos Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Assurance Auto</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Assurance Habitation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Assurance Santé</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Prévoyance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Épargne & Retraite</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Assurance Professionnelle</a></li>
            </ul>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-red-400">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><a href="#accueil" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#produits" className="text-gray-300 hover:text-white transition-colors">Nos Produits</a></li>
              <li><a href="#apropos" className="text-gray-300 hover:text-white transition-colors">À Propos</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/comparateur" className="text-gray-300 hover:text-white transition-colors">Comparateur</a></li>
              <li><a href="/formulaires/affaire-nouvelle" className="text-gray-300 hover:text-white transition-colors">Demande de Devis</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-red-400">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>123 Boulevard Mohammed V</div>
                  <div>Casablanca, Maroc 20000</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div className="text-gray-300">+212 5XX-XXX-XXX</div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div className="text-gray-300">contact@moumentechnique.ma</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-red-600 rounded-lg">
              <div className="text-sm font-semibold mb-1">Urgence Sinistre</div>
              <div className="text-lg font-bold">📞 +212 6XX-XXX-XXX</div>
              <div className="text-xs opacity-90">24h/24 - 7j/7</div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Moumen Technique et Prévoyance. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Conditions Générales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
