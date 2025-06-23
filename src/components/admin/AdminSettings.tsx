
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Key, 
  Bell, 
  Shield, 
  Database,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    api: {
      emailProvider: '',
      emailApiKey: '',
      smsProvider: '',
      smsApiKey: '',
      facebookAppId: '',
      facebookAppSecret: '',
      instagramBusinessId: '',
      instagramAccessToken: '',
      webhookUrl: ''
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      browserNotifications: true,
      leadAlerts: true,
      quoteReminders: true,
      clientUpdates: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: true,
      ipWhitelist: '',
      auditLog: true
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: 365,
      maintenanceMode: false
    }
  });

  const [activeTab, setActiveTab] = useState('integrations');

  const handleSave = (section: string) => {
    // In a real application, this would save to your backend
    toast.success(`Paramètres ${section} sauvegardés avec succès !`);
  };

  const testFacebookIntegration = async () => {
    if (!settings.api.facebookAppId || !settings.api.facebookAppSecret) {
      toast.error('Veuillez renseigner l\'App ID et l\'App Secret Facebook');
      return;
    }

    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Connexion Facebook réussie ! Leads peuvent être importés.');
    } catch (error) {
      toast.error('Erreur de connexion Facebook. Vérifiez vos paramètres.');
    }
  };

  const testInstagramIntegration = async () => {
    if (!settings.api.instagramBusinessId || !settings.api.instagramAccessToken) {
      toast.error('Veuillez renseigner l\'ID Business et le Token d\'accès Instagram');
      return;
    }

    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Connexion Instagram réussie ! Leads peuvent être importés.');
    } catch (error) {
      toast.error('Erreur de connexion Instagram. Vérifiez vos paramètres.');
    }
  };

  const importFacebookLeads = async () => {
    try {
      // Simulate lead import
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('15 nouveaux leads importés depuis Facebook !');
    } catch (error) {
      toast.error('Erreur lors de l\'importation des leads Facebook');
    }
  };

  const importInstagramLeads = async () => {
    try {
      // Simulate lead import
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('8 nouveaux leads importés depuis Instagram !');
    } catch (error) {
      toast.error('Erreur lors de l\'importation des leads Instagram');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Paramètres et Configuration</h2>
          <p className="text-gray-600">Gérez les intégrations API, notifications et paramètres de sécurité</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Intégrations API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          {/* Intégrations Email et SMS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Communication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emailProvider">Fournisseur Email</Label>
                  <select
                    id="emailProvider"
                    value={settings.api.emailProvider}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      api: { ...prev.api, emailProvider: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    <option value="">Sélectionner</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="ses">Amazon SES</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="emailApiKey">Clé API Email</Label>
                  <Input
                    id="emailApiKey"
                    type="password"
                    value={settings.api.emailApiKey}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      api: { ...prev.api, emailApiKey: e.target.value }
                    }))}
                    placeholder="sk-xxxxxxxxxxxxxxxx"
                  />
                </div>
                <div>
                  <Label htmlFor="smsProvider">Fournisseur SMS</Label>
                  <select
                    id="smsProvider"
                    value={settings.api.smsProvider}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      api: { ...prev.api, smsProvider: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    <option value="">Sélectionner</option>
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Vonage (Nexmo)</option>
                    <option value="clickatell">Clickatell</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="smsApiKey">Clé API SMS</Label>
                  <Input
                    id="smsApiKey"
                    type="password"
                    value={settings.api.smsApiKey}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      api: { ...prev.api, smsApiKey: e.target.value }
                    }))}
                    placeholder="ACxxxxxxxxxxxxxxxx"
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('communication')} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder Communication
              </Button>
            </CardContent>
          </Card>

          {/* Intégrations Réseaux Sociaux */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Facebook className="h-5 w-5" />
                <span>Réseaux Sociaux - Importation de Leads</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Facebook */}
              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center space-x-2 mb-4">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Facebook Business</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facebookAppId">App ID Facebook</Label>
                    <Input
                      id="facebookAppId"
                      value={settings.api.facebookAppId}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        api: { ...prev.api, facebookAppId: e.target.value }
                      }))}
                      placeholder="123456789012345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebookAppSecret">App Secret Facebook</Label>
                    <Input
                      id="facebookAppSecret"
                      type="password"
                      value={settings.api.facebookAppSecret}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        api: { ...prev.api, facebookAppSecret: e.target.value }
                      }))}
                      placeholder="abcdef123456789"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={testFacebookIntegration} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tester Connexion
                  </Button>
                  <Button onClick={importFacebookLeads} className="bg-blue-600 hover:bg-blue-700" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Importer Leads
                  </Button>
                </div>
              </div>

              {/* Instagram */}
              <div className="border rounded-lg p-4 bg-pink-50">
                <div className="flex items-center space-x-2 mb-4">
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <h3 className="font-semibold text-pink-800">Instagram Business</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instagramBusinessId">Business Account ID</Label>
                    <Input
                      id="instagramBusinessId"
                      value={settings.api.instagramBusinessId}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        api: { ...prev.api, instagramBusinessId: e.target.value }
                      }))}
                      placeholder="17841405822304914"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagramAccessToken">Token d'Accès</Label>
                    <Input
                      id="instagramAccessToken"
                      type="password"
                      value={settings.api.instagramAccessToken}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        api: { ...prev.api, instagramAccessToken: e.target.value }
                      }))}
                      placeholder="IGQVJxxxxxxxxxxxxxxxx"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={testInstagramIntegration} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tester Connexion
                  </Button>
                  <Button onClick={importInstagramLeads} className="bg-pink-600 hover:bg-pink-700" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Importer Leads
                  </Button>
                </div>
              </div>

              {/* Webhook */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="h-6 w-6 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Webhook Global</h3>
                </div>
                <div>
                  <Label htmlFor="webhookUrl">URL de Webhook pour Leads</Label>
                  <Input
                    id="webhookUrl"
                    value={settings.api.webhookUrl}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      api: { ...prev.api, webhookUrl: e.target.value }
                    }))}
                    placeholder="https://votre-site.com/api/webhook/leads"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Cette URL recevra tous les leads des différentes sources
                  </p>
                </div>
              </div>

              <Button onClick={() => handleSave('social')} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder Intégrations Sociales
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Paramètres de Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notifications Email</Label>
                    <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notifications SMS</Label>
                    <p className="text-sm text-gray-500">Recevoir les alertes urgentes par SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, smsNotifications: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notifications Navigateur</Label>
                    <p className="text-sm text-gray-500">Afficher les notifications dans le navigateur</p>
                  </div>
                  <Switch
                    checked={settings.notifications.browserNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, browserNotifications: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Alertes Nouveaux Leads</Label>
                    <p className="text-sm text-gray-500">Notification immédiate pour chaque nouveau lead</p>
                  </div>
                  <Switch
                    checked={settings.notifications.leadAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, leadAlerts: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Rappels Devis</Label>
                    <p className="text-sm text-gray-500">Rappels pour les devis en attente</p>
                  </div>
                  <Switch
                    checked={settings.notifications.quoteReminders}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, quoteReminders: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Mises à Jour Clients</Label>
                    <p className="text-sm text-gray-500">Notifications pour les changements de statut client</p>
                  </div>
                  <Switch
                    checked={settings.notifications.clientUpdates}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, clientUpdates: checked }
                    }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('notifications')} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Paramètres de Sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Authentification à Double Facteur</Label>
                    <p className="text-sm text-gray-500">Sécurité renforcée pour la connexion</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorAuth: checked }
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Timeout de Session (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Politique de Mot de Passe Renforcée</Label>
                    <p className="text-sm text-gray-500">Exiger des mots de passe complexes</p>
                  </div>
                  <Switch
                    checked={settings.security.passwordPolicy}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordPolicy: checked }
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="ipWhitelist">Liste Blanche IP</Label>
                  <Textarea
                    id="ipWhitelist"
                    value={settings.security.ipWhitelist}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, ipWhitelist: e.target.value }
                    }))}
                    placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">Une adresse IP par ligne</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Journal d'Audit</Label>
                    <p className="text-sm text-gray-500">Enregistrer toutes les actions utilisateurs</p>
                  </div>
                  <Switch
                    checked={settings.security.auditLog}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, auditLog: checked }
                    }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('security')} className="bg-red-600 hover:bg-red-700">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder Sécurité
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Paramètres Système</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Sauvegarde Automatique</Label>
                    <p className="text-sm text-gray-500">Sauvegarder automatiquement les données</p>
                  </div>
                  <Switch
                    checked={settings.system.autoBackup}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, autoBackup: checked }
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="backupFrequency">Fréquence de Sauvegarde</Label>
                  <select
                    id="backupFrequency"
                    value={settings.system.backupFrequency}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, backupFrequency: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="dataRetention">Rétention des Données (jours)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.system.dataRetention}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, dataRetention: parseInt(e.target.value) }
                    }))}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Mode Maintenance</Label>
                    <p className="text-sm text-gray-500">Désactiver l'accès public temporairement</p>
                  </div>
                  <Switch
                    checked={settings.system.maintenanceMode}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, maintenanceMode: checked }
                    }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('system')} className="bg-gray-600 hover:bg-gray-700">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder Système
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
