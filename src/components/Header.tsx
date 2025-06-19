
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Nos Produits', href: '#produits' },
    { name: 'À Propos', href: '#apropos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      {/* Top bar avec informations de contact */}
      <div className="bg-axa-gray-dark text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+212 5XX-XXX-XXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contact@moumentechnique.ma</span>
            </div>
          </div>
          <div className="text-sm">
            Agent Général AXA - Licence ACAPS
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo largement amélioré et plus visible */}
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-24 w-auto md:h-28 lg:h-32 transition-all duration-300 group-hover:scale-110 drop-shadow-2xl filter brightness-105 contrast-110"
              />
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-axa-red via-orange-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="hidden lg:block ml-2">
              <div className="text-2xl font-bold text-axa-gray-dark leading-tight tracking-wide">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-lg text-axa-red font-bold tracking-wider">
                & PREVOYANCE
              </div>
              <div className="text-sm text-axa-gray font-medium mt-1">
                Agent Général AXA
              </div>
              <div className="text-xs text-orange-600 font-semibold">
                ✓ Agréé ACAPS - Plus de 20 ans d'expérience
              </div>
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-axa-gray-dark hover:text-axa-red transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-axa-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button className="bg-gradient-to-r from-axa-red to-orange-500 hover:from-axa-red/90 hover:to-orange-500/90 text-white shadow-lg">
              Devis Gratuit
            </Button>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-axa-gray-dark"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-axa-gray-dark hover:text-axa-red transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-axa-red to-orange-500 hover:from-axa-red/90 hover:to-orange-500/90 text-white w-fit">
                Devis Gratuit
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
