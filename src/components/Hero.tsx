
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
    <section id="accueil" className="pt-16 pb-16 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced background with overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${content.hero.backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      {/* Decorative elements with brand colors */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced logo section with professional brand layout */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-700 group mb-8 max-w-5xl mx-auto">
            <div className="relative mr-6 md:mr-8">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-20 w-auto md:h-32 lg:h-40 transition-all duration-500 group-hover:scale-105 filter drop-shadow-2xl brightness-105 contrast-110"
              />
              <div className="absolute -bottom-3 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-orange-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-lg blur-sm"></div>
            </div>
            <div className="text-left">
              <div className="text-xl md:text-3xl lg:text-5xl font-bold text-gray-800 leading-tight tracking-wide mb-1">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-lg md:text-2xl lg:text-4xl text-red-500 font-bold tracking-wider mb-3">
                & PREVOYANCE
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-4 w-4 md:h-6 md:w-6 text-red-500" />
                <span className="text-sm md:text-lg text-gray-700 font-semibold">Agent Général AXA</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-3 w-3 md:h-5 md:w-5 text-orange-500" />
                <span className="text-xs md:text-sm text-orange-600 font-semibold">Agréé ACAPS - Plus de 20 ans d'expérience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 md:h-5 md:w-5 text-green-600" />
                <span className="text-xs md:text-sm text-green-600 font-medium">Licence Officielle Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal avec le contenu dynamique */}
          <div className="text-white animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-green-400 font-bold text-lg">Agent Agréé AXA Maroc</span>
            </div>
            
            <h1 className="text-3xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
              {content.hero.title}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-5 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <Phone className="h-5 w-5 mr-2" />
                Obtenir un Devis Gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-5 text-lg transition-all transform hover:scale-105 backdrop-blur-sm">
                Nos Produits
              </Button>
            </div>

            {/* Features cards with brand consistency */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="bg-red-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-base">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulaire de contact rapide amélioré */}
          <div className="animate-fade-in">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Devis Express
                  </h2>
                  <p className="text-gray-600">
                    Obtenez votre devis personnalisé en 2 minutes
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nom"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                  
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
                    <option value="">Type d&apos;assurance</option>
                    <option value="auto">Assurance Auto</option>
                    <option value="habitation">Assurance Habitation</option>
                    <option value="sante">Assurance Santé</option>
                    <option value="prevoyance">Prévoyance</option>
                    <option value="epargne">Épargne</option>
                    <option value="professionnelle">Professionnelle</option>
                  </select>

                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    Demander mon Devis
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
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
