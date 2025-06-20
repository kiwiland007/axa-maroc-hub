
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Clock, CheckCircle, Star, Award } from 'lucide-react';

const Hero = () => {
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
    <section id="accueil" className="pt-36 pb-20 bg-gradient-to-br from-white via-axa-blue-light/30 to-white relative overflow-hidden">
      {/* Enhanced background with overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-axa-red/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-axa-blue/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Enhanced logo section with better prominence */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 group mb-8">
            <div className="relative">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE ET PREVOYANCE" 
                className="h-20 w-auto md:h-24 lg:h-28 transition-all duration-500 group-hover:scale-110 filter drop-shadow-2xl brightness-105 contrast-110"
              />
              <div className="absolute -bottom-3 left-0 w-full h-3 bg-gradient-to-r from-axa-red via-orange-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-lg blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>
            <div className="ml-6 text-left">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-axa-gray-dark leading-tight tracking-wide">
                MOUMEN TECHNIQUE
              </div>
              <div className="text-xl md:text-2xl text-axa-red font-bold tracking-wider">
                & PREVOYANCE
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Award className="h-5 w-5 text-axa-red" />
                <span className="text-sm text-axa-gray font-medium">Agent Général AXA</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="h-4 w-4 text-orange-500" />
                <span className="text-xs text-orange-600 font-semibold">Agréé ACAPS - Plus de 20 ans d'expérience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="text-axa-gray-dark animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="h-6 w-6 text-axa-green" />
              <span className="text-axa-green font-semibold text-lg">Agent Agréé AXA Maroc</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-axa-gray-dark">
              Votre Sécurité,
              <span className="text-axa-red block">Notre Priorité</span>
            </h1>
            
            <p className="text-xl text-axa-gray mb-8 leading-relaxed">
              <strong className="text-axa-red">MOUMEN TECHNIQUE ET PREVOYANCE</strong> vous accompagne depuis plus de 20 ans 
              pour protéger ce qui compte le plus : votre famille, votre maison, votre entreprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-axa-red to-orange-500 hover:from-axa-red/90 hover:to-orange-500/90 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all">
                Obtenir un Devis Gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-axa-gray-dark text-axa-gray-dark hover:bg-axa-gray-dark hover:text-white px-8 py-4 text-lg transition-all">
                Nos Produits
              </Button>
            </div>

            {/* Features cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-axa-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-axa-red" />
                    </div>
                    <h3 className="font-semibold text-axa-gray-dark mb-2">{feature.title}</h3>
                    <p className="text-axa-gray text-sm">{feature.description}</p>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-axa-red to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">
                    Devis Express
                  </h2>
                  <p className="text-axa-gray">
                    Obtenez votre devis personnalisé en 2 minutes
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red focus:border-transparent transition-all"
                  />
                  
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red focus:border-transparent transition-all">
                    <option value="">Type d&apos;assurance</option>
                    <option value="auto">Assurance Auto</option>
                    <option value="habitation">Assurance Habitation</option>
                    <option value="sante">Assurance Santé</option>
                    <option value="prevoyance">Prévoyance</option>
                    <option value="epargne">Épargne</option>
                    <option value="professionnelle">Professionnelle</option>
                  </select>

                  <Button className="w-full bg-gradient-to-r from-axa-red to-orange-500 hover:from-axa-red/90 hover:to-orange-500/90 text-white py-4 text-lg shadow-xl hover:shadow-2xl transition-all">
                    Demander mon Devis
                  </Button>
                  
                  <p className="text-xs text-axa-gray text-center leading-relaxed">
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
