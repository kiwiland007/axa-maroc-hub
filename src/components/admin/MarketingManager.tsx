
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Play, Pause, Eye, Edit, Trash2, Plus, Mail, Target, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const MarketingManager = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Assurance Auto - Hiver 2024',
      type: 'Facebook Ads',
      status: 'Actif',
      budget: 5000,
      spent: 3200,
      impressions: 125000,
      clicks: 2850,
      leads: 127,
      cost_per_lead: 25.2,
      startDate: '2024-01-01',
      endDate: '2024-02-29'
    },
    {
      id: 2,
      name: 'Habitation - Campagne Printemps',
      type: 'Google Ads',
      status: 'Actif',
      budget: 3500,
      spent: 2100,
      impressions: 89000,
      clicks: 1950,
      leads: 89,
      cost_per_lead: 23.6,
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    },
    {
      id: 3,
      name: 'Santé Famille - Promo',
      type: 'Facebook Ads',
      status: 'Pause',
      budget: 2000,
      spent: 1800,
      impressions: 45000,
      clicks: 980,
      leads: 42,
      cost_per_lead: 42.9,
      startDate: '2023-12-01',
      endDate: '2024-01-31'
    }
  ]);

  const [emailCampaigns, setEmailCampaigns] = useState([
    {
      id: 1,
      name: 'Newsletter Janvier 2024',
      type: 'Newsletter',
      status: 'Envoyé',
      recipients: 2500,
      opened: 625,
      clicked: 87,
      open_rate: 25,
      click_rate: 3.5,
      sentDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Rappel Renouvellement Auto',
      type: 'Automation',
      status: 'Actif',
      recipients: 450,
      opened: 180,
      clicked: 54,
      open_rate: 40,
      click_rate: 12,
      sentDate: '2024-01-20'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Pause': return 'bg-orange-100 text-orange-800';
      case 'Terminé': return 'bg-gray-100 text-gray-800';
      case 'Envoyé': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCampaignAction = (campaignId: number, action: string) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: action === 'pause' ? 'Pause' : 'Actif' }
          : campaign
      )
    );
    toast.success(`Campagne ${action === 'pause' ? 'mise en pause' : 'activée'}`);
  };

  const createCampaign = () => {
    toast.success('Nouvelle campagne créée');
  };

  const sendNewsletter = () => {
    toast.success('Newsletter programmée pour envoi');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Marketing Digital</h2>
          <p className="text-axa-gray">Gestion des campagnes et marketing automation</p>
        </div>
        <Button onClick={createCampaign} className="bg-axa-red hover:bg-axa-red/90">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Campagne
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campagnes Pub</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="landing">Landing Pages</TabsTrigger>
          <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Stats globales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-axa-gray-dark">{campaigns.length}</div>
                <div className="text-sm text-axa-gray">Campagnes Actives</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()} DH
                </div>
                <div className="text-sm text-axa-gray">Budget Dépensé</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {campaigns.reduce((sum, c) => sum + c.leads, 0)}
                </div>
                <div className="text-sm text-axa-gray">Leads Générés</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-axa-red">
                  {(campaigns.reduce((sum, c) => sum + c.spent, 0) / campaigns.reduce((sum, c) => sum + c.leads, 0)).toFixed(1)} DH
                </div>
                <div className="text-sm text-axa-gray">Coût par Lead</div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des campagnes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Campagnes Publicitaires</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-axa-gray-dark">{campaign.name}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                          <div className="space-y-1">
                            <div className="text-axa-gray">Budget / Dépensé</div>
                            <div className="font-semibold">{campaign.budget.toLocaleString()} / {campaign.spent.toLocaleString()} DH</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-axa-gray">Impressions / Clics</div>
                            <div className="font-semibold">{campaign.impressions.toLocaleString()} / {campaign.clicks.toLocaleString()}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-axa-gray">Leads / Coût par Lead</div>
                            <div className="font-semibold">{campaign.leads} / {campaign.cost_per_lead} DH</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-axa-gray">CTR</div>
                            <div className="font-semibold">{((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%</div>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-axa-red h-2 rounded-full" 
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-axa-gray mt-1">
                          {((campaign.spent / campaign.budget) * 100).toFixed(1)}% du budget utilisé
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCampaignAction(campaign.id, campaign.status === 'Actif' ? 'pause' : 'play')}
                        >
                          {campaign.status === 'Actif' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          {/* Stats email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-axa-gray-dark">
                  {emailCampaigns.reduce((sum, c) => sum + c.recipients, 0)}
                </div>
                <div className="text-sm text-axa-gray">Emails Envoyés</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {((emailCampaigns.reduce((sum, c) => sum + c.opened, 0) / emailCampaigns.reduce((sum, c) => sum + c.recipients, 0)) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-axa-gray">Taux d'Ouverture</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {((emailCampaigns.reduce((sum, c) => sum + c.clicked, 0) / emailCampaigns.reduce((sum, c) => sum + c.recipients, 0)) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-axa-gray">Taux de Clic</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-axa-red">2 950</div>
                <div className="text-sm text-axa-gray">Abonnés Newsletter</div>
              </CardContent>
            </Card>
          </div>

          {/* Campagnes email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Campagnes Email</span>
                </div>
                <Button onClick={sendNewsletter} size="sm" className="bg-axa-red hover:bg-axa-red/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Mail
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-axa-gray-dark">{campaign.name}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-axa-gray">Destinataires</div>
                            <div className="font-semibold">{campaign.recipients.toLocaleString()}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-axa-gray">Taux d'Ouverture</div>
                            <div className="font-semibold text-green-600">{campaign.open_rate}%</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-axa-gray">Taux de Clic</div>
                            <div className="font-semibold text-blue-600">{campaign.click_rate}%</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-axa-gray">Date d'Envoi</div>
                            <div className="font-semibold">{campaign.sentDate}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="landing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Landing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-axa-gray mb-4">
                Créez et optimisez vos pages de destination pour maximiser les conversions.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Page Assurance Auto</h3>
                  <p className="text-sm text-axa-gray mb-3">Taux de conversion: 3.2%</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Page Habitation</h3>
                  <p className="text-sm text-axa-gray mb-3">Taux de conversion: 2.8%</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Réseaux Sociaux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-axa-gray mb-4">
                Planifiez et publiez vos contenus sur Facebook, Instagram et LinkedIn.
              </p>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Facebook Business</h3>
                    <Badge className="bg-blue-100 text-blue-800">Connecté</Badge>
                  </div>
                  <p className="text-sm text-axa-gray">1,250 abonnés • 15 posts ce mois</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Instagram</h3>
                    <Badge className="bg-orange-100 text-orange-800">À connecter</Badge>
                  </div>
                  <p className="text-sm text-axa-gray">Compte non connecté</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">LinkedIn</h3>
                    <Badge className="bg-blue-100 text-blue-800">Connecté</Badge>
                  </div>
                  <p className="text-sm text-axa-gray">890 connections • 8 posts ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingManager;
