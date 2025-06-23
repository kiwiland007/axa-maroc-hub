
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Key, 
  Database, 
  Cloud,
  Shield,
  Bell,
  Palette,
  Save,
  TestTube,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Paramètres généraux
    siteName: 'MOUMEN TECHNIQUE ET PREVOYANCE',
    siteDescription: 'Agent Général d\'assurance au Maroc',
    contactEmail: 'contact@moumentechnique.ma',
    contactPhone: '+212 5XX-XXX-XXX',
    address: '123 Boulevard Mohammed V, Casablanca, Maroc',
    
    // Intégrations API
    googleMapsApi: '',
    emailApiKey: '',
    smsApiKey: '',
    analyticsId: '',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    leadAlerts: true,
    quoteAlerts: true,
    
    // Sécurité
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordPolicy: 'strong'
  });

  const [apiStatus, setApiStatus] = useState({
    googleMaps: 'disconnected',
    email: 'connected',
    sms: 'error',
    analytics: 'connected'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success('Paramètres sauvegardés avec succès !');
  };

  const testApiConnection = (apiType: string) => {
    setApiStatus(prev => ({ ...prev, [apiType]: 'testing' }));
    
    // Simulation du test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% de chance de succès
      setApiStatus(prev => ({ 
        ...prev, 
        [apiType]: success ? 'connected' : 'error' 
      }));
      
      if (success) {
        toast.success(`Connexion ${apiType} réussie !`);
      } else {
        toast.error(`Erreur de connexion ${apiType}`);
      }
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connecté</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erreur</Badge>;
      case 'testing':
        return <Badge className="bg-blue-100 text-blue-800">Test en cours...</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Non configuré</Badge>;
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Informations du site</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nom du site</Label>
            <Input
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Informations de contact</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email de contact</Label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
              />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input
                value={settings.contactPhone}
                onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Adresse</Label>
            <Textarea
              value={settings.address}
              onChange={(e) => handleSettingChange('address', e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Google Maps</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(apiStatus.googleMaps)}
              {getStatusBadge(apiStatus.googleMaps)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => testApiConnection('googleMaps')}
              disabled={apiStatus.googleMaps === 'testing'}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Tester
            </Button>
          </div>
          <div>
            <Label>Clé API Google Maps</Label>
            <Input
              type="password"
              value={settings.googleMapsApi}
              onChange={(e) => handleSettingChange('googleMapsApi', e.target.value)}
              placeholder="AIzaSy..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Obtenez votre clé API sur Google Cloud Console
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Service Email</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(apiStatus.email)}
              {getStatusBadge(apiStatus.email)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => testApiConnection('email')}
              disabled={apiStatus.email === 'testing'}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Tester
            </Button>
          </div>
          <div>
            <Label>Clé API Email (SendGrid/Mailgun)</Label>
            <Input
              type="password"
              value={settings.emailApiKey}
              onChange={(e) => handleSettingChange('emailApiKey', e.target.value)}
              placeholder="SG.xxx ou key-xxx"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Service SMS</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(apiStatus.sms)}
              {getStatusBadge(apiStatus.sms)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => testApiConnection('sms')}
              disabled={apiStatus.sms === 'testing'}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Tester
            </Button>
          </div>
          <div>
            <Label>Clé API SMS (Twilio/Nexmo)</Label>
            <Input
              type="password"
              value={settings.smsApiKey}
              onChange={(e) => handleSettingChange('smsApiKey', e.target.value)}
              placeholder="AC..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Google Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(apiStatus.analytics)}
              {getStatusBadge(apiStatus.analytics)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => testApiConnection('analytics')}
              disabled={apiStatus.analytics === 'testing'}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Tester
            </Button>
          </div>
          <div>
            <Label>ID de mesure Google Analytics</Label>
            <Input
              value={settings.analyticsId}
              onChange={(e) => handleSettingChange('analyticsId', e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications par email</div>
                <div className="text-sm text-gray-500">Recevoir les notifications importantes par email</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications SMS</div>
                <div className="text-sm text-gray-500">Recevoir les alertes urgentes par SMS</div>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Alertes nouveaux leads</div>
                <div className="text-sm text-gray-500">Notification à chaque nouveau lead</div>
              </div>
              <input
                type="checkbox"
                checked={settings.leadAlerts}
                onChange={(e) => handleSettingChange('leadAlerts', e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Alertes devis</div>
                <div className="text-sm text-gray-500">Notification pour les nouvelles demandes de devis</div>
              </div>
              <input
                type="checkbox"
                checked={settings.quoteAlerts}
                onChange={(e) => handleSettingChange('quoteAlerts', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Sécurité</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Authentification à deux facteurs</div>
              <div className="text-sm text-gray-500">Sécurité renforcée pour les comptes administrateurs</div>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div>
            <Label>Délai d'expiration de session (minutes)</Label>
            <Input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              min="5"
              max="480"
            />
          </div>

          <div>
            <Label>Politique de mot de passe</Label>
            <select
              value={settings.passwordPolicy}
              onChange={(e) => handleSettingChange('passwordPolicy', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="basic">Basique (6 caractères minimum)</option>
              <option value="medium">Moyen (8 caractères, majuscules et chiffres)</option>
              <option value="strong">Fort (12 caractères, majuscules, chiffres et symboles)</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Paramètres Système</h2>
          <p className="text-gray-600">Configuration et intégrations</p>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'general', label: 'Général', icon: Settings },
            { id: 'api', label: 'Intégrations API', icon: Key },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Sécurité', icon: Shield }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'general' && renderGeneralSettings()}
      {activeTab === 'api' && renderApiSettings()}
      {activeTab === 'notifications' && renderNotificationSettings()}
      {activeTab === 'security' && renderSecuritySettings()}
    </div>
  );
};

export default AdminSettings;
