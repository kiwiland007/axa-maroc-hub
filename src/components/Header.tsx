
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '#accueil', path: '/' },
    { name: 'Nos Produits', href: '#produits', path: '/' },
    { name: 'À Propos', href: '#apropos', path: '/' },
    { name: 'Contact', href: '#contact', path: '/' },
  ];

  const scrollToSection = (href: string, path: string) => {
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        const sectionId = href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const sectionId = href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+212523456789';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@moumentechnique.ma';
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      {/* Navigation principale */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo amélioré */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-16 w-auto md:h-20 transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
              />
            </div>
            <div className="hidden lg:block">
              <div className="text-xl font-bold text-gray-800 leading-tight">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-lg text-red-600 font-bold">
                & PREVOYANCE
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Agent Général - Agréé ACAPS - Assurance AXA Maroc
              </div>
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.path)}
                className="text-gray-800 hover:text-red-600 transition-colors font-medium relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <div className="flex space-x-2">
              <Button 
                onClick={handleCallClick}
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Nous Appeler
              </Button>
              <Button 
                onClick={handleEmailClick}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
                size="sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                Nous Écrire
              </Button>
            </div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.path)}
                  className="text-gray-800 hover:text-red-600 transition-colors font-medium text-left py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  onClick={handleCallClick}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 w-fit"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Nous Appeler
                </Button>
                <Button 
                  onClick={handleEmailClick}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white w-fit"
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Nous Écrire
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
