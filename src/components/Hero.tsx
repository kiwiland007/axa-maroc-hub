
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Clock, CheckCircle } from 'lucide-react';

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
    <section id="accueil" className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-axa-blue-light relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="text-axa-gray-dark animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-5 w-5 text-axa-green" />
              <span className="text-axa-green font-medium">Agent Agréé AXA Maroc</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-axa-gray-dark">
              Votre Sécurité,
              <span className="text-axa-red block">Notre Priorité</span>
            </h1>
            
            <p className="text-xl text-axa-gray mb-8 leading-relaxed">
              <strong>MOUMEN TECHNIQUE ET PREVOYANCE</strong> vous accompagne depuis plus de 20 ans 
              pour protéger ce qui compte le plus : votre famille, votre maison, votre entreprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-axa-red hover:bg-axa-red/90 text-white px-8 py-3 text-lg">
                Obtenir un Devis Gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-axa-gray-dark text-axa-gray-dark hover:bg-axa-gray-dark hover:text-white px-8 py-3 text-lg">
                Nos Produits
              </Button>
            </div>

            {/* Features cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white transition-all duration-300 shadow-md">
                  <CardContent className="p-4 text-center">
                    <feature.icon className="h-8 w-8 text-axa-red mx-auto mb-2" />
                    <h3 className="font-semibold text-axa-gray-dark mb-1">{feature.title}</h3>
                    <p className="text-axa-gray text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulaire de contact rapide */}
          <div className="animate-fade-in">
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red"
                    />
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red"
                  />
                  
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-red">
                    <option value="">Type d&apos;assurance</option>
                    <option value="auto">Assurance Auto</option>
                    <option value="habitation">Assurance Habitation</option>
                    <option value="sante">Assurance Santé</option>
                    <option value="prevoyance">Prévoyance</option>
                    <option value="epargne">Épargne</option>
                    <option value="professionnelle">Professionnelle</option>
                  </select>

                  <Button className="w-full bg-axa-red hover:bg-axa-red/90 text-white py-3 text-lg">
                    Demander mon Devis
                  </Button>
                  
                  <p className="text-xs text-axa-gray text-center">
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
