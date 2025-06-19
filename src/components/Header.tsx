
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
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
              alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-axa-gray-dark hover:text-axa-red transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button className="bg-axa-red hover:bg-axa-red/90 text-white">
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
              <Button className="bg-axa-red hover:bg-axa-red/90 text-white w-fit">
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
