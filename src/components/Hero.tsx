
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  return (
    <section id="accueil" className="pt-20 pb-16 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced background with overlay */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("${content.hero.backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Decorative elements with brand colors */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced logo section with professional brand layout */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-700 group mb-12 max-w-4xl mx-auto">
            <div className="relative mr-8">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-32 w-auto md:h-40 lg:h-48 transition-all duration-500 group-hover:scale-105 filter drop-shadow-2xl brightness-105 contrast-110"
              />
              <div className="absolute -bottom-4 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-orange-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-lg blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>
            <div className="text-left">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-wide mb-2">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-2xl md:text-4xl lg:text-5xl text-red-500 font-bold tracking-wider mb-4">
                & PREVOYANCE
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Award className="h-6 w-6 text-red-500" />
                <span className="text-lg md:text-xl text-gray-700 font-semibold">Agent Général AXA</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <Star className="h-5 w-5 text-orange-500" />
                <span className="text-sm md:text-base text-orange-600 font-semibold">Agréé ACAPS - Plus de 20 ans d'expérience</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm md:text-base text-green-600 font-medium">Licence Officielle Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenu principal avec le contenu dynamique */}
          <div className="text-gray-800 animate-fade-in">
            <div className="flex items-center space-x-3 mb-8">
              <CheckCircle className="h-7 w-7 text-green-600" />
              <span className="text-green-600 font-bold text-xl">Agent Agréé AXA Maroc</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold mb-8 leading-tight text-gray-800">
              {content.hero.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-10 py-6 text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <Phone className="h-6 w-6 mr-3" />
                Obtenir un Devis Gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-10 py-6 text-xl transition-all transform hover:scale-105">
                Nos Produits
              </Button>
            </div>

            {/* Features cards with brand consistency */}
            <div className="grid sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-10 w-10 text-red-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulaire de contact rapide amélioré */}
          <div className="animate-fade-in">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Devis Express
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Obtenez votre devis personnalisé en 2 minutes
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nom"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                    />
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                  />
                  
                  <select className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg">
                    <option value="">Type d&apos;assurance</option>
                    <option value="auto">Assurance Auto</option>
                    <option value="habitation">Assurance Habitation</option>
                    <option value="sante">Assurance Santé</option>
                    <option value="prevoyance">Prévoyance</option>
                    <option value="epargne">Épargne</option>
                    <option value="professionnelle">Professionnelle</option>
                  </select>

                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-6 text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    Demander mon Devis
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center leading-relaxed">
                    Vos données sont protégées et ne seront jamais communiquées à des tiers.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
