
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock, Phone, Mail, Save, Edit, Eye } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { toast } from 'sonner';

const LocationManager = () => {
  const { content, updateContent } = useContentStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingLocation, setEditingLocation] = useState(content.contact);

  const handleSave = () => {
    updateContent('contact', editingLocation);
    setIsEditing(false);
    toast.success('Informations de localisation mises à jour!');
  };

  const handleCancel = () => {
    setEditingLocation(content.contact);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion de la Localisation</h2>
          <p className="text-axa-gray">Mise à jour des informations de contact et localisation</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Aperçu sur le Site</span>
          </Button>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-axa-red hover:bg-axa-red/90">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-gray-800 hover:bg-gray-700">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Informations de Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Informations de Contact</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2">Adresse Complète</Label>
              {isEditing ? (
                <Textarea
                  value={editingLocation.address}
                  onChange={(e) => setEditingLocation(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="mt-2"
                  placeholder="Adresse complète de l'agence"
                />
              ) : (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-red-500 mt-1" />
                    <span className="text-gray-700">{content.contact.address}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2">Téléphone</Label>
              {isEditing ? (
                <Input
                  value={editingLocation.phone}
                  onChange={(e) => setEditingLocation(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-2"
                  placeholder="+212 5XX-XXX-XXX"
                />
              ) : (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700">{content.contact.phone}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2">Email</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editingLocation.email}
                  onChange={(e) => setEditingLocation(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2"
                  placeholder="contact@moumentechnique.ma"
                />
              ) : (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700">{content.contact.email}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2">Horaires d'Ouverture</Label>
              {isEditing ? (
                <Input
                  value={editingLocation.hours}
                  onChange={(e) => setEditingLocation(prev => ({ ...prev, hours: e.target.value }))}
                  className="mt-2"
                  placeholder="Lun-Ven: 8h00-18h00, Sam: 8h00-12h00"
                />
              ) : (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700">{content.contact.hours}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Aperçu Carte et Localisation */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu de Localisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Carte Google Maps</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Intégration Google Maps à venir
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-semibold mb-3 text-gray-800">Informations Affichées</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                    <span className="text-gray-600">{editingLocation.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">{editingLocation.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">{editingLocation.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">{editingLocation.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations supplémentaires */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Complémentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Localisation</h3>
              <p className="text-sm text-blue-600 mt-1">
                Ces informations apparaissent dans le footer, la section contact et les devis
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Contact Direct</h3>
              <p className="text-sm text-green-600 mt-1">
                Numéro affiché sur tous les boutons d'appel et formulaires
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">Horaires</h3>
              <p className="text-sm text-orange-600 mt-1">
                Horaires d'ouverture visibles pour les clients
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <Edit className="h-5 w-5" />
              <p className="font-medium">Mode Édition Actif</p>
            </div>
            <p className="text-sm text-red-700 mt-2">
              Vous modifiez les informations de localisation. Cliquez sur "Sauvegarder" pour appliquer les changements sur le site public.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationManager;
