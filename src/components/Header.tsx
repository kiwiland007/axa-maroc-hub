
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
    // Si on n'est pas sur la page d'accueil, naviguer d'abord vers l'accueil
    if (location.pathname !== path) {
      navigate(path);
      // Attendre que la navigation soit terminée puis scroller
      setTimeout(() => {
        const sectionId = href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si on est déjà sur la bonne page, scroller directement
      const sectionId = href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleDevisClick = () => {
    navigate('/formulaires/affaire-nouvelle');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      {/* Top bar avec informations de contact */}
      <div className="bg-gray-800 text-white py-2 hidden md:block">
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
            Agent Général - Licence ACAPS
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo largement amélioré et plus visible */}
          <div 
            className="flex items-center space-x-4 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-24 w-auto md:h-28 lg:h-32 transition-all duration-300 group-hover:scale-110 drop-shadow-2xl filter brightness-105 contrast-110"
              />
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="hidden lg:block ml-2">
              <div className="text-2xl font-bold text-gray-800 leading-tight tracking-wide">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-lg text-red-600 font-bold tracking-wider">
                & PREVOYANCE
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">
                Agent Général
              </div>
              <div className="text-xs text-orange-600 font-semibold">
                ✓ Agréé ACAPS - Plus de 20 ans d'expérience
              </div>
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
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
            <Button 
              onClick={handleDevisClick}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
            >
              Devis Gratuit
            </Button>
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
          <div className="md:hidden mt-4 pb-4 animate-slide-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.path)}
                  className="text-gray-800 hover:text-red-600 transition-colors font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={handleDevisClick}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white w-fit"
              >
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
