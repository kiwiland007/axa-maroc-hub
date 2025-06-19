
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: ['123 Avenue Mohammed V', 'Casablanca 20000, Maroc'],
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: ['+212 5XX-XXX-XXX', '+212 6XX-XXX-XXX'],
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      content: ['contact@moumentechnique.ma', 'info@moumentechnique.ma'],
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: ['Lun-Ven: 8h00-18h00', 'Sam: 8h00-12h00'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-axa-blue mb-4">
            Contactez-Nous
          </h2>
          <p className="text-xl text-axa-gray max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos projets d'assurance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center`}>
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-axa-blue mb-2">{info.title}</h3>
                        {info.content.map((line, idx) => (
                          <p key={idx} className="text-axa-gray text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Urgences */}
              <Card className="bg-axa-red text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Urgences 24h/7j</h3>
                      <p className="text-sm text-red-100 mb-2">
                        En cas de sinistre, contactez immédiatement :
                      </p>
                      <p className="font-semibold">+212 5XX-XXX-XXX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-axa-blue">
                  Envoyez-nous un Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-axa-blue mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-blue"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-axa-blue mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-blue"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-axa-blue mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-blue"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-axa-blue mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-blue"
                        placeholder="+212 6XX-XXX-XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-axa-blue mb-2">
                      Sujet
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-blue">
                      <option value="">Sélectionnez un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="sinistre">Déclaration de sinistre</option>
                      <option value="information">Demande d'information</option>
                      <option value="reclamation">Réclamation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-axa-blue mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-axa-blue resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 text-axa-blue border-gray-300 rounded focus:ring-axa-blue"
                    />
                    <label htmlFor="consent" className="text-sm text-axa-gray">
                      J'accepte que mes données personnelles soient utilisées pour traiter ma demande. 
                      Vos informations ne seront jamais communiquées à des tiers.
                    </label>
                  </div>

                  <Button size="lg" className="w-full bg-axa-blue hover:bg-axa-blue-dark text-white">
                    Envoyer le Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-0">
              <div className="h-64 bg-axa-gray-light rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-axa-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-axa-blue mb-2">Notre Localisation</h3>
                  <p className="text-axa-gray">123 Avenue Mohammed V, Casablanca</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
