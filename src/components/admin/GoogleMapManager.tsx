
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';

const GoogleMapManager = () => {
  const [mapSettings, setMapSettings] = useState({
    apiKey: '',
    latitude: '33.5731',
    longitude: '-7.5898',
    zoom: '12',
    address: '123 Boulevard Mohammed V, Casablanca, Maroc'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    // Ici vous pouvez sauvegarder les paramètres de la carte
    toast.success('Paramètres de la carte sauvegardés !');
  };

  const handlePreview = () => {
    if (!mapSettings.apiKey) {
      toast.error('Veuillez saisir votre clé API Google Maps');
      return;
    }
    setPreviewMode(!previewMode);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Configuration Google Maps</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2">Clé API Google Maps</Label>
            <Input
              type="password"
              value={mapSettings.apiKey}
              onChange={(e) => setMapSettings(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder="Votre clé API Google Maps"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Obtenez votre clé API sur Google Cloud Console
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2">Latitude</Label>
              <Input
                value={mapSettings.latitude}
                onChange={(e) => setMapSettings(prev => ({ ...prev, latitude: e.target.value }))}
                placeholder="33.5731"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2">Longitude</Label>
              <Input
                value={mapSettings.longitude}
                onChange={(e) => setMapSettings(prev => ({ ...prev, longitude: e.target.value }))}
                placeholder="-7.5898"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2">Niveau de zoom</Label>
            <Input
              type="number"
              value={mapSettings.zoom}
              onChange={(e) => setMapSettings(prev => ({ ...prev, zoom: e.target.value }))}
              min="1"
              max="20"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2">Adresse à afficher</Label>
            <Input
              value={mapSettings.address}
              onChange={(e) => setMapSettings(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Votre adresse complète"
              className="mt-2"
            />
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Masquer' : 'Aperçu'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {previewMode && mapSettings.apiKey && (
        <Card>
          <CardHeader>
            <CardTitle>Aperçu de la carte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aperçu Google Maps</p>
                <p className="text-sm text-gray-500 mt-2">{mapSettings.address}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Lat: {mapSettings.latitude}, Lng: {mapSettings.longitude}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleMapManager;
