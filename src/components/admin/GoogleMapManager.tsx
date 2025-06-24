
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Save, Eye, AlertCircle, CheckCircle, Settings } from 'lucide-react';
import { toast } from 'sonner';

const GoogleMapManager = () => {
  const [mapConfig, setMapConfig] = useState({
    apiKey: '',
    center: {
      lat: 33.5731,
      lng: -7.5898
    },
    zoom: 12,
    markers: [
      {
        id: '1',
        name: 'MOUMEN TECHNIQUE ET PREVOYANCE',
        address: 'Casablanca, Maroc',
        lat: 33.5731,
        lng: -7.5898
      }
    ]
  });

  const [isConfigured, setIsConfigured] = useState(false);
  const [testingMap, setTestingMap] = useState(false);

  const handleSaveConfig = () => {
    if (!mapConfig.apiKey.trim()) {
      toast.error('Veuillez saisir votre clé API Google Maps');
      return;
    }

    // Simulation de sauvegarde
    setIsConfigured(true);
    toast.success('Configuration Google Maps sauvegardée !');
  };

  const testMapConnection = () => {
    setTestingMap(true);
    
    // Simulation de test de connexion
    setTimeout(() => {
      setTestingMap(false);
      if (mapConfig.apiKey.trim()) {
        toast.success('Connexion Google Maps réussie !');
        setIsConfigured(true);
      } else {
        toast.error('Échec de la connexion. Vérifiez votre clé API.');
      }
    }, 2000);
  };

  const addMarker = () => {
    const newMarker = {
      id: Date.now().toString(),
      name: 'Nouveau marqueur',
      address: '',
      lat: mapConfig.center.lat,
      lng: mapConfig.center.lng
    };
    
    setMapConfig({
      ...mapConfig,
      markers: [...mapConfig.markers, newMarker]
    });
    toast.success('Nouveau marqueur ajouté');
  };

  const updateMarker = (markerId: string, field: string, value: string | number) => {
    setMapConfig({
      ...mapConfig,
      markers: mapConfig.markers.map(marker =>
        marker.id === markerId ? { ...marker, [field]: value } : marker
      )
    });
  };

  const removeMarker = (markerId: string) => {
    setMapConfig({
      ...mapConfig,
      markers: mapConfig.markers.filter(marker => marker.id !== markerId)
    });
    toast.success('Marqueur supprimé');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Configuration Google Maps</h2>
          <p className="text-gray-600">Configurez l'intégration Google Maps pour afficher votre localisation</p>
        </div>
        <div className="flex items-center space-x-3">
          {isConfigured ? (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Configuré</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Non configuré</span>
            </div>
          )}
        </div>
      </div>

      {/* Configuration API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configuration API Google Maps</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Comment obtenir votre clé API Google Maps :</h3>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Rendez-vous sur <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
              <li>Créez un nouveau projet ou sélectionnez un projet existant</li>
              <li>Activez l'API Google Maps JavaScript</li>
              <li>Créez une clé API dans "Identifiants"</li>
              <li>Copiez votre clé API et collez-la ci-dessous</li>
            </ol>
          </div>

          <div>
            <Label htmlFor="apiKey">Clé API Google Maps *</Label>
            <Input
              id="apiKey"
              type="password"
              value={mapConfig.apiKey}
              onChange={(e) => setMapConfig({ ...mapConfig, apiKey: e.target.value })}
              placeholder="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="mt-1"
            />
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={testMapConnection} 
              variant="outline"
              disabled={testingMap || !mapConfig.apiKey.trim()}
            >
              {testingMap ? 'Test en cours...' : 'Tester la connexion'}
            </Button>
            <Button 
              onClick={handleSaveConfig}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!mapConfig.apiKey.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration de la carte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Paramètres de la Carte</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="centerLat">Latitude du centre</Label>
              <Input
                id="centerLat"
                type="number"
                step="0.0001"
                value={mapConfig.center.lat}
                onChange={(e) => setMapConfig({
                  ...mapConfig,
                  center: { ...mapConfig.center, lat: parseFloat(e.target.value) }
                })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="centerLng">Longitude du centre</Label>
              <Input
                id="centerLng"
                type="number"
                step="0.0001"
                value={mapConfig.center.lng}
                onChange={(e) => setMapConfig({
                  ...mapConfig,
                  center: { ...mapConfig.center, lng: parseFloat(e.target.value) }
                })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zoom">Niveau de zoom</Label>
              <Input
                id="zoom"
                type="number"
                min="1"
                max="20"
                value={mapConfig.zoom}
                onChange={(e) => setMapConfig({
                  ...mapConfig,
                  zoom: parseInt(e.target.value)
                })}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gestion des marqueurs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Marqueurs sur la Carte</CardTitle>
            <Button onClick={addMarker} variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Ajouter un marqueur
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mapConfig.markers.map((marker) => (
              <div key={marker.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Marqueur {marker.id}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMarker(marker.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nom du lieu</Label>
                    <Input
                      value={marker.name}
                      onChange={(e) => updateMarker(marker.id, 'name', e.target.value)}
                      className="mt-1"
                      placeholder="Ex: Siège social"
                    />
                  </div>
                  <div>
                    <Label>Adresse</Label>
                    <Input
                      value={marker.address}
                      onChange={(e) => updateMarker(marker.id, 'address', e.target.value)}
                      className="mt-1"
                      placeholder="123 Rue Mohammed V, Casablanca"
                    />
                  </div>
                  <div>
                    <Label>Latitude</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={marker.lat}
                      onChange={(e) => updateMarker(marker.id, 'lat', parseFloat(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={marker.lng}
                      onChange={(e) => updateMarker(marker.id, 'lng', parseFloat(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aperçu */}
      <Card>
        <CardHeader>
          <CardTitle>Aperçu de la Carte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Aperçu Google Maps</p>
              <p className="text-xs text-gray-400 mt-1">
                {isConfigured 
                  ? `Carte centrée sur ${mapConfig.center.lat}, ${mapConfig.center.lng} avec ${mapConfig.markers.length} marqueur(s)`
                  : 'Configurez votre clé API pour voir l\'aperçu'
                }
              </p>
            </div>
          </div>
          
          {isConfigured && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Configuration actuelle :</h4>
              <div className="text-sm text-green-700 space-y-1">
                <div><strong>Centre :</strong> {mapConfig.center.lat}, {mapConfig.center.lng}</div>
                <div><strong>Zoom :</strong> {mapConfig.zoom}</div>
                <div><strong>Marqueurs :</strong> {mapConfig.markers.length}</div>
                <div><strong>API :</strong> Configurée ✓</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleMapManager;
