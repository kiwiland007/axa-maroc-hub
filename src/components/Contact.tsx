
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    console.log('Message envoyé:', formData);
    toast.success('Message envoyé avec succès ! Nous vous répondrons rapidement.');
    
    setFormData({
      nom: '',
      email: '',
      telephone: '',
      sujet: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Contactez-Nous
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos projets d'assurance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Nos Coordonnées
              </h3>
              
              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Adresse</h4>
                      <p className="text-gray-600">
                        123 Boulevard Mohammed V<br />
                        Casablanca, Maroc<br />
                        20000
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Téléphone</h4>
                      <p className="text-gray-600">
                        +212 5XX-XXX-XXX<br />
                        <span className="text-sm">Ligne directe</span>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                      <p className="text-gray-600">
                        contact@moumentechnique.ma<br />
                        <span className="text-sm">Réponse sous 24h</span>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Horaires</h4>
                      <div className="text-gray-600 space-y-1">
                        <p>Lundi - Vendredi: 8h30 - 18h30</p>
                        <p>Samedi: 9h00 - 13h00</p>
                        <p className="text-red-600 font-medium">Dimanche: Fermé</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Urgence Sinistre</h4>
              <p className="mb-4">
                En cas de sinistre urgent, contactez-nous immédiatement :
              </p>
              <div className="text-2xl font-bold">
                📞 +212 6XX-XXX-XXX
              </div>
              <p className="text-sm opacity-90 mt-2">
                Service d'urgence 24h/24 et 7j/7
              </p>
            </div>
          </div>

          {/* Formulaire de contact */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Envoyez-nous un Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <Input
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <Input
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+212 6XX-XXX-XXX"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <Input
                      id="sujet"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 text-lg font-semibold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer le Message
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Champs obligatoires - Nous vous répondrons dans les plus brefs délais
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Carte Google Maps */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center">Notre Localisation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-red-500" />
                  <p className="text-lg font-medium">Carte Google Maps</p>
                  <p className="text-sm">Intégration à venir</p>
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
