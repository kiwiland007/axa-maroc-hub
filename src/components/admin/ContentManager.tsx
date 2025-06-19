
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, Upload, Image as ImageIcon, Type, Globe } from 'lucide-react';

const ContentManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [content, setContent] = useState({
    hero: {
      title: 'Votre Sécurité, Notre Priorité',
      subtitle: 'MOUMEN TECHNIQUE ET PREVOYANCE vous accompagne depuis plus de 20 ans pour protéger ce qui compte le plus : votre famille, votre maison, votre entreprise.',
      backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    },
    about: {
      title: 'MOUMEN TECHNIQUE & PREVOYANCE',
      subtitle: 'Votre Agent Général AXA de Confiance',
      description: 'Depuis plus de 20 ans, MOUMEN TECHNIQUE ET PREVOYANCE accompagne les particuliers et les entreprises dans leurs projets d\'assurance et de prévoyance.',
      experience: '20+',
      clients: '5000+',
      satisfaction: '98%',
      response: '24h'
    },
    contact: {
      address: '123 Avenue Mohammed V, Casablanca 20000, Maroc',
      phone: '+212 5XX-XXX-XXX',
      email: 'contact@moumentechnique.ma',
      hours: 'Lun-Ven: 8h00-18h00, Sam: 8h00-12h00'
    }
  });

  const handleSave = () => {
    // Ici on sauvegarderait en base de données
    console.log('Contenu sauvegardé:', content);
    setIsEditing(false);
  };

  const handleImageUpload = (section: string, field: string) => {
    // Simulation d'upload d'image
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Ici on uploadrait l'image et on récupérerait l'URL
        console.log('Image uploadée:', file.name);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion du Contenu</h2>
          <p className="text-axa-gray">Modifiez le contenu et les images du site public</p>
        </div>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-axa-red hover:bg-axa-red/90">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-axa-gray-dark hover:bg-axa-gray-dark/90">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Section Héro</TabsTrigger>
          <TabsTrigger value="about">À Propos</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Section Héro - Page d'Accueil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre Principal</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                  />
                ) : (
                  <p className="text-lg font-semibold text-axa-gray-dark">{content.hero.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sous-titre</label>
                {isEditing ? (
                  <textarea
                    value={content.hero.subtitle}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                  />
                ) : (
                  <p className="text-axa-gray">{content.hero.subtitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image de fond</label>
                <div className="flex items-center space-x-4">
                  <img 
                    src={content.hero.backgroundImage} 
                    alt="Background" 
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleImageUpload('hero', 'backgroundImage')}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Changer l'image
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section À Propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.about.title}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        about: { ...prev.about, title: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="font-semibold">{content.about.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sous-titre</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.about.subtitle}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        about: { ...prev.about, subtitle: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-axa-red">{content.about.subtitle}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                {isEditing ? (
                  <textarea
                    value={content.about.description}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      about: { ...prev.about, description: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                  />
                ) : (
                  <p className="text-axa-gray">{content.about.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Années d'expérience</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.about.experience}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        about: { ...prev.about, experience: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-2xl font-bold">{content.about.experience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Clients satisfaits</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.about.clients}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        about: { ...prev.about, clients: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-2xl font-bold">{content.about.clients}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Taux de satisfaction</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.about.satisfaction}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        about: { ...prev.about, satisfaction: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-2xl font-bold">{content.about.satisfaction}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Délai de réponse</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.about.response}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        about: { ...prev.about, response: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-2xl font-bold">{content.about.response}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-axa-gray mb-4">
                Gérez les descriptions, images et tarifs de vos produits d'assurance.
              </p>
              <Button className="bg-axa-red hover:bg-axa-red/90">
                <Edit className="h-4 w-4 mr-2" />
                Modifier les Produits
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Adresse</label>
                  {isEditing ? (
                    <textarea
                      value={content.contact.address}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: { ...prev.contact, address: e.target.value }
                      }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-axa-gray">{content.contact.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.contact.phone}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-axa-gray">{content.contact.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={content.contact.email}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-axa-gray">{content.contact.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Horaires</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.contact.hours}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: { ...prev.contact, hours: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                    />
                  ) : (
                    <p className="text-axa-gray">{content.contact.hours}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
