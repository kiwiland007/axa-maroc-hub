
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';

const Hero = () => {
  const { content } = useContentStore();

  const scrollToProducts = () => {
    document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${content.hero.backgroundImage})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {content.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={scrollToProducts}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg shadow-xl"
            >
              Découvrir nos Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToContact}
              className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Nous Contacter
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-white">
              <Shield className="h-8 w-8 text-red-400" />
              <div>
                <div className="font-bold text-lg">+20 ans</div>
                <div className="text-gray-300 text-sm">d'expérience</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-white">
              <Users className="h-8 w-8 text-red-400" />
              <div>
                <div className="font-bold text-lg">5000+</div>
                <div className="text-gray-300 text-sm">clients satisfaits</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-white">
              <Award className="h-8 w-8 text-red-400" />
              <div>
                <div className="font-bold text-lg">98%</div>
                <div className="text-gray-300 text-sm">de satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
