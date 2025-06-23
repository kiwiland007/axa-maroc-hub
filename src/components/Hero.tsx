
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
    <section id="accueil" className="relative min-h-[70vh] flex items-center mt-24">
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
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {content.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              onClick={scrollToProducts}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 text-base shadow-xl"
            >
              Découvrir nos Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToContact}
              className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 px-6 py-3 text-base font-semibold shadow-lg backdrop-blur-sm"
            >
              Nous Contacter
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-white">
              <Shield className="h-6 w-6 text-red-400" />
              <div>
                <div className="font-bold text-lg">+20 ans</div>
                <div className="text-gray-300 text-sm">d'expérience</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-white">
              <Users className="h-6 w-6 text-red-400" />
              <div>
                <div className="font-bold text-lg">5000+</div>
                <div className="text-gray-300 text-sm">clients satisfaits</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-white">
              <Award className="h-6 w-6 text-red-400" />
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
