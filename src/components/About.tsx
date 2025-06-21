
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Award, Clock, MapPin, Phone } from 'lucide-react';

const About = () => {
  return (
    <section id="apropos" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            À Propos de Moumen Technique et Prévoyance
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Depuis plus de 20 ans, nous accompagnons particuliers et professionnels 
            dans la protection de leurs biens les plus précieux avec expertise et proximité.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Bureau Moumen Technique"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Notre Mission
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Offrir des solutions d'assurance personnalisées et innovantes, 
              en plaçant la satisfaction client au cœur de nos préoccupations. 
              Notre expertise reconnue nous permet d'accompagner chaque client 
              dans le choix de la protection la mieux adaptée à ses besoins.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-red-500" />
                <span className="text-gray-700 font-medium">Agent général agréé ACAPS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-red-500" />
                <span className="text-gray-700 font-medium">Certification qualité service</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-red-500" />
                <span className="text-gray-700 font-medium">Équipe d'experts qualifiés</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Expertise</h4>
              <p className="text-gray-600">Plus de 20 ans d'expérience dans l'assurance au Maroc</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Proximité</h4>
              <p className="text-gray-600">Accompagnement personnalisé et conseil sur-mesure</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Clock className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Réactivité</h4>
              <p className="text-gray-600">Service client disponible et gestion rapide des sinistres</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Award className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Qualité</h4>
              <p className="text-gray-600">98% de satisfaction client et service reconnu</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Nos Valeurs</h4>
              <p className="text-gray-600 leading-relaxed">
                Transparence, intégrité et excellence guident notre action quotidienne 
                pour mériter votre confiance.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Notre Engagement</h4>
              <p className="text-gray-600 leading-relaxed">
                Vous offrir la meilleure protection au meilleur prix, 
                avec un service client irréprochable.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Votre Garantie</h4>
              <p className="text-gray-600 leading-relaxed">
                Un interlocuteur unique, des conseils personnalisés et 
                un suivi constant de vos contrats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
