
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, Key, Database, Mail, Bell, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      newLeadAlert: true,
      contractExpiration: true,
      systemMaintenance: false
    },
    integrations: {
      metaBusinessConnected: true,
      googleAdsConnected: true,
      emailServiceConnected: true,
      analyticsConnected: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 3
    },
    general: {
      siteName: 'MOUMEN TECHNIQUE ET PREVOYANCE',
      companyEmail: 'contact@moumentechnique.ma',
      companyPhone: '+212 5XX-XXX-XXX',
      address: '123 Avenue Mohammed V, Casablanca',
      timezone: 'Africa/Casablanca'
    }
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Mohamed Moumen',
      email: 'mohamed@moumentechnique.ma',
      role: 'Administrateur',
      status: 'Actif',
      lastLogin: '2024-01-20 14:30'
    },
    {
      id: 2,
      name: 'Fatima Assistant',
      email: 'fatima@moumentechnique.ma',
      role: 'Assistant',
      status: 'Actif',
      lastLogin: '2024-01-19 16:45'
    },
    {
      id: 3,
      name: 'Ahmed Commercial',
      email: 'ahmed@moumentechnique.ma',
      role: 'Commercial',
      status: 'Inactif',
      lastLogin: '2024-01-15 10:20'
    }
  ]);

  const handleSaveSettings = () => {
    toast.success('Paramètres sauvegardés avec succès');
  };

  const handleToggleNotification = (key: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  const handleToggleSecurity = (key: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key as keyof typeof prev.security]
      }
    }));
  };

  const addNewUser = () => {
    toast.success('Formulaire d\'ajout d\'utilisateur ouvert');
  };

  const resetUserPassword = (userId: number) => {
    toast.success('Email de réinitialisation envoyé');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Paramètres</h2>
          <p className="text-axa-gray">Configuration de la console d'administration</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-axa-red hover:bg-axa-red/90">
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Paramètres Généraux</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom de l'entreprise</label>
                  <Input
                    value={settings.general.siteName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email principal</label>
                  <Input
                    type="email"
                    value={settings.general.companyEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, companyEmail: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <Input
                    value={settings.general.companyPhone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, companyPhone: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fuseau horaire</label>
                  <Input
                    value={settings.general.timezone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, timezone: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Adresse complète</label>
                <Input
                  value={settings.general.address}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, address: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Gestion des Utilisateurs</span>
                </div>
                <Button onClick={addNewUser} size="sm" className="bg-axa-red hover:bg-axa-red/90">
                  <Users className="h-4 w-4 mr-2" />
                  Ajouter Utilisateur
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-axa-gray-dark">{user.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded ${
                            user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                          <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </div>
                        <div className="text-sm text-axa-gray">
                          <div>📧 {user.email}</div>
                          <div>🕒 Dernière connexion: {user.lastLogin}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Modifier
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => resetUserPassword(user.id)}
                        >
                          Reset PWD
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Authentification à deux facteurs</h3>
                  <p className="text-sm text-axa-gray">Ajoute une couche de sécurité supplémentaire</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={() => handleToggleSecurity('twoFactorAuth')}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Timeout session (minutes)</label>
                  <Input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expiration mot de passe (jours)</label>
                  <Input
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordExpiry: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tentatives de connexion max</label>
                <Input
                  type="number"
                  value={settings.security.loginAttempts}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, loginAttempts: parseInt(e.target.value) }
                  }))}
                  className="w-48"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Préférences de Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Alertes Email</h3>
                  <p className="text-sm text-axa-gray">Recevoir les notifications par email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onCheckedChange={() => handleToggleNotification('emailAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Alertes SMS</h3>
                  <p className="text-sm text-axa-gray">Recevoir les notifications par SMS</p>
                </div>
                <Switch
                  checked={settings.notifications.smsAlerts}
                  onCheckedChange={() => handleToggleNotification('smsAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Nouveaux Leads</h3>
                  <p className="text-sm text-axa-gray">Notification immédiate pour nouveaux leads</p>
                </div>
                <Switch
                  checked={settings.notifications.newLeadAlert}
                  onCheckedChange={() => handleToggleNotification('newLeadAlert')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Échéances de Contrats</h3>
                  <p className="text-sm text-axa-gray">Rappels pour les renouvellements</p>
                </div>
                <Switch
                  checked={settings.notifications.contractExpiration}
                  onCheckedChange={() => handleToggleNotification('contractExpiration')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Maintenance Système</h3>
                  <p className="text-sm text-axa-gray">Notifications de maintenance planifiée</p>
                </div>
                <Switch
                  checked={settings.notifications.systemMaintenance}
                  onCheckedChange={() => handleToggleNotification('systemMaintenance')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Intégrations API</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Meta Business (Facebook)</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      settings.integrations.metaBusinessConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {settings.integrations.metaBusinessConnected ? 'Connecté' : 'Déconnecté'}
                    </span>
                  </div>
                  <p className="text-sm text-axa-gray mb-3">Gestion des campagnes Facebook et Instagram</p>
                  <Button size="sm" variant="outline">
                    {settings.integrations.metaBusinessConnected ? 'Reconfigurer' : 'Connecter'}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Google Ads</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      settings.integrations.googleAdsConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {settings.integrations.googleAdsConnected ? 'Connecté' : 'Déconnecté'}
                    </span>
                  </div>
                  <p className="text-sm text-axa-gray mb-3">Gestion des campagnes Google Ads</p>
                  <Button size="sm" variant="outline">
                    {settings.integrations.googleAdsConnected ? 'Reconfigurer' : 'Connecter'}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Service Email</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      settings.integrations.emailServiceConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {settings.integrations.emailServiceConnected ? 'Connecté' : 'Déconnecté'}
                    </span>
                  </div>
                  <p className="text-sm text-axa-gray mb-3">Envoi automatisé d'emails et newsletters</p>
                  <Button size="sm" variant="outline">
                    {settings.integrations.emailServiceConnected ? 'Reconfigurer' : 'Connecter'}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Google Analytics</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      settings.integrations.analyticsConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {settings.integrations.analyticsConnected ? 'Connecté' : 'Déconnecté'}
                    </span>
                  </div>
                  <p className="text-sm text-axa-gray mb-3">Suivi et analyse du trafic web</p>
                  <Button size="sm" variant="outline">
                    {settings.integrations.analyticsConnected ? 'Reconfigurer' : 'Connecter'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
