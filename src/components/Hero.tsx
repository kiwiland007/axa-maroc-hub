
import { Button } from '@/components/ui/button';
import { Shield, Users, Clock, CheckCircle, Star, Award, Phone } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';

const Hero = () => {
  const { content } = useContentStore();
  
  const features = [
    {
      icon: Shield,
      title: 'Protection Garantie',
      description: 'Couverture complète avec AXA'
    },
    {
      icon: Users,
      title: 'Conseil Expert',
      description: '20+ ans d\'expérience'
    },
    {
      icon: Clock,
      title: 'Service Rapide',
      description: 'Devis en 24h'
    }
  ];

  const handleQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Votre demande de devis a été envoyée ! Nous vous contacterons dans les plus brefs délais.');
  };

  return (
    <section id="accueil" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden min-h-screen flex items-center">
      {/* Background overlay optimized */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${content.hero.backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll'
        }}
      ></div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-red-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-orange-400/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Logo section with better spacing */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-6 md:p-8 bg-white/98 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group mb-8 max-w-4xl mx-auto">
            <div className="relative mr-4 md:mr-6">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-16 w-auto md:h-24 lg:h-28 transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
              />
            </div>
            <div className="text-left">
              <div className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight mb-1">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-base md:text-xl lg:text-2xl text-red-500 font-bold mb-2">
                & PREVOYANCE
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <div className="flex items-center space-x-1">
                  <Award className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                  <span className="text-xs md:text-sm text-gray-700 font-semibold">Agent Général AXA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                  <span className="text-xs md:text-sm text-orange-600 font-medium">20+ ans d'expérience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Main content with better typography */}
          <div className="text-gray-800 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-semibold text-base">Agent Agréé AXA Maroc</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-6 leading-tight text-gray-800">
              {content.hero.title}
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-base md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Phone className="h-5 w-5 mr-2" />
                Obtenir un Devis Gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-base md:text-lg transition-all transform hover:scale-105">
                Nos Produits
              </Button>
            </div>

            {/* Features cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="bg-red-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{feature.title}</h3>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote form with better UX */}
          <div className="animate-fade-in">
            <div className="bg-white/98 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 rounded-lg">
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    Devis Express
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Obtenez votre devis personnalisé en 2 minutes
                  </p>
                </div>

                <form onSubmit={handleQuoteRequest} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nom"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Prénom"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                  />
                  
                  <select 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                  >
                    <option value="">Type d'assurance</option>
                    <option value="auto">Assurance Auto</option>
                    <option value="habitation">Assurance Habitation</option>
                    <option value="sante">Assurance Santé</option>
                    <option value="prevoyance">Prévoyance</option>
                    <option value="epargne">Épargne</option>
                    <option value="professionnelle">Professionnelle</option>
                  </select>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-base md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Demander mon Devis
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Vos données sont protégées et ne seront jamais communiquées à des tiers.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
