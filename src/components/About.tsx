
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Clock, MapPin, Phone, Mail } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '20+', label: 'Années d\'expérience', icon: Clock },
    { number: '5000+', label: 'Clients satisfaits', icon: Users },
    { number: '98%', label: 'Taux de satisfaction', icon: Award },
    { number: '24h', label: 'Délai de réponse', icon: Phone }
  ];

  const values = [
    {
      title: 'Expertise',
      description: 'Plus de 20 ans d\'expérience dans le secteur de l\'assurance au Maroc.'
    },
    {
      title: 'Proximité',
      description: 'Un accompagnement personnalisé et un service de proximité.'
    },
    {
      title: 'Confiance',
      description: 'La force d\'AXA avec la qualité de service d\'un agent indépendant.'
    },
    {
      title: 'Innovation',
      description: 'Des solutions modernes adaptées aux nouveaux besoins.'
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-gradient-to-br from-white to-axa-blue-light relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenu textuel */}
          <div>
            <h2 className="text-4xl font-bold text-axa-gray-dark mb-6">
              MOUMEN TECHNIQUE & PREVOYANCE
            </h2>
            <h3 className="text-xl text-axa-red mb-6">
              Votre Agent Général AXA de Confiance
            </h3>
            
            <div className="space-y-4 text-axa-gray leading-relaxed">
              <p>
                Depuis plus de <strong>20 ans</strong>, MOUMEN TECHNIQUE ET PREVOYANCE accompagne 
                les particuliers et les entreprises dans leurs projets d'assurance et de prévoyance.
              </p>
              
              <p>
                En tant qu'<strong>agent général AXA agréé</strong>, nous bénéficions de la solidité 
                et de l'expertise du leader mondial de l'assurance, tout en conservant notre 
                indépendance et notre proximité avec nos clients.
              </p>
              
              <p>
                Notre mission : vous offrir des solutions d'assurance sur-mesure, 
                un conseil expert et un service client d'exception pour protéger 
                ce qui compte le plus pour vous.
              </p>
            </div>

            {/* Nos valeurs */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-axa-gray-dark mb-4">Nos Valeurs</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="border-l-4 border-axa-red pl-4 bg-white/50 p-3 rounded-r-lg">
                    <h5 className="font-semibold text-axa-gray-dark">{value.title}</h5>
                    <p className="text-sm text-axa-gray">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistiques et informations */}
          <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 border-2 border-gray-100 hover:border-axa-red transition-colors bg-white/90">
                  <CardContent className="p-0">
                    <stat.icon className="h-8 w-8 text-axa-red mx-auto mb-2" />
                    <div className="text-3xl font-bold text-axa-gray-dark mb-1">{stat.number}</div>
                    <div className="text-sm text-axa-gray">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Informations de contact */}
            <Card className="bg-axa-gray-dark text-white">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Informations de Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-axa-red" />
                    <span>123 Avenue Mohammed V, Casablanca, Maroc</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-axa-red" />
                    <span>+212 5XX-XXX-XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-axa-red" />
                    <span>contact@moumentechnique.ma</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-axa-red-light border-axa-red">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-axa-red mx-auto mb-3" />
                <h4 className="font-semibold text-axa-gray-dark mb-2">Agréments & Certifications</h4>
                <p className="text-sm text-axa-gray">
                  Agent Général AXA agréé par l'ACAPS<br />
                  Licence d'intermédiation n° XXXX
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
