
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Share2, 
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  Send,
  Eye,
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Video,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

const MarketingManager = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      nom: 'Campagne Assurance Auto 2024',
      type: 'email',
      statut: 'active',
      dateCreation: '2024-01-15',
      destinataires: 1250,
      ouvertures: 312,
      clics: 45,
      conversions: 8
    },
    {
      id: '2',
      nom: 'Promo Habitation Printemps',
      type: 'social',
      statut: 'planifiee',
      dateCreation: '2024-01-20',
      destinataires: 3500,
      ouvertures: 0,
      clics: 0,
      conversions: 0
    }
  ]);

  const [socialPosts, setSocialPosts] = useState([
    {
      id: '1',
      contenu: 'Protégez votre véhicule avec nos formules auto complètes ! 🚗',
      plateforme: 'Facebook',
      statut: 'publie',
      datePublication: '2024-01-15',
      vues: 1250,
      interactions: 89,
      partages: 12
    },
    {
      id: '2',
      contenu: 'Votre maison mérite la meilleure protection 🏠 #AssuranceHabitation',
      plateforme: 'Instagram',
      statut: 'programme',
      datePublication: '2024-01-25',
      vues: 0,
      interactions: 0,
      partages: 0
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    nom: '',
    type: 'email',
    sujet: '',
    contenu: '',
    segment: 'tous',
    dateEnvoi: ''
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.nom || !newCampaign.sujet || !newCampaign.contenu) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const campaign = {
      id: Date.now().toString(),
      nom: newCampaign.nom,
      type: newCampaign.type,
      statut: newCampaign.dateEnvoi ? 'planifiee' : 'brouillon',
      dateCreation: new Date().toISOString().split('T')[0],
      destinataires: 0,
      ouvertures: 0,
      clics: 0,
      conversions: 0
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      nom: '',
      type: 'email',
      sujet: '',
      contenu: '',
      segment: 'tous',
      dateEnvoi: ''
    });
    toast.success('Campagne créée avec succès !');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planifiee': return 'bg-blue-100 text-blue-800';
      case 'terminee': return 'bg-gray-100 text-gray-800';
      case 'brouillon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateRate = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0';
  };

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Statistiques des campagnes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{campaigns.length}</div>
                <div className="text-sm text-gray-600">Campagnes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((acc, c) => acc + c.destinataires, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Destinataires</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">
                  {calculateRate(
                    campaigns.reduce((acc, c) => acc + c.ouvertures, 0),
                    campaigns.reduce((acc, c) => acc + c.destinataires, 0)
                  )}%
                </div>
                <div className="text-sm text-gray-600">Taux d'ouverture</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((acc, c) => acc + c.conversions, 0)}
                </div>
                <div className="text-sm text-gray-600">Conversions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Création de campagne */}
      <Card>
        <CardHeader>
          <CardTitle>Créer une nouvelle campagne</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nom de la campagne *</Label>
              <Input
                value={newCampaign.nom}
                onChange={(e) => setNewCampaign({...newCampaign, nom: e.target.value})}
                placeholder="Ex: Campagne Auto Été 2024"
              />
            </div>
            <div>
              <Label>Type de campagne</Label>
              <select
                value={newCampaign.type}
                onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="social">Réseaux sociaux</option>
              </select>
            </div>
            <div>
              <Label>Sujet/Titre *</Label>
              <Input
                value={newCampaign.sujet}
                onChange={(e) => setNewCampaign({...newCampaign, sujet: e.target.value})}
                placeholder="Sujet de votre campagne"
              />
            </div>
            <div>
              <Label>Segment cible</Label>
              <select
                value={newCampaign.segment}
                onChange={(e) => setNewCampaign({...newCampaign, segment: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="tous">Tous les contacts</option>
                <option value="clients">Clients existants</option>
                <option value="prospects">Prospects</option>
                <option value="leads">Leads actifs</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>Contenu *</Label>
              <Textarea
                value={newCampaign.contenu}
                onChange={(e) => setNewCampaign({...newCampaign, contenu: e.target.value})}
                placeholder="Rédigez le contenu de votre campagne..."
                rows={4}
              />
            </div>
            <div>
              <Label>Date d'envoi (optionnel)</Label>
              <Input
                type="datetime-local"
                value={newCampaign.dateEnvoi}
                onChange={(e) => setNewCampaign({...newCampaign, dateEnvoi: e.target.value})}
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <Button onClick={handleCreateCampaign} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer la campagne
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Aperçu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des campagnes */}
      <Card>
        <CardHeader>
          <CardTitle>Campagnes existantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{campaign.nom}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(campaign.statut)}>
                        {campaign.statut}
                      </Badge>
                      <Badge variant="outline">{campaign.type}</Badge>
                      <span className="text-sm text-gray-500">
                        Créée le {new Date(campaign.dateCreation).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-semibold text-blue-800">{campaign.destinataires.toLocaleString()}</div>
                    <div className="text-blue-600">Destinataires</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-green-800">
                      {campaign.ouvertures} ({calculateRate(campaign.ouvertures, campaign.destinataires)}%)
                    </div>
                    <div className="text-green-600">Ouvertures</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <div className="font-semibold text-orange-800">
                      {campaign.clics} ({calculateRate(campaign.clics, campaign.ouvertures)}%)
                    </div>
                    <div className="text-orange-600">Clics</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-semibold text-purple-800">
                      {campaign.conversions} ({calculateRate(campaign.conversions, campaign.clics)}%)
                    </div>
                    <div className="text-purple-600">Conversions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSocialMedia = () => (
    <div className="space-y-6">
      {/* Statistiques réseaux sociaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Share2 className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{socialPosts.length}</div>
                <div className="text-sm text-gray-600">Publications</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {socialPosts.reduce((acc, p) => acc + p.vues, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Vues totales</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">
                  {socialPosts.reduce((acc, p) => acc + p.interactions, 0)}
                </div>
                <div className="text-sm text-gray-600">Interactions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {socialPosts.reduce((acc, p) => acc + p.partages, 0)}
                </div>
                <div className="text-sm text-gray-600">Partages</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programmation de posts */}
      <Card>
        <CardHeader>
          <CardTitle>Programmer une publication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Plateforme</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                </select>
              </div>
              <div>
                <Label>Type de contenu</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Texte</option>
                  <option>Image</option>
                  <option>Vidéo</option>
                  <option>Lien</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Contenu de la publication</Label>
              <Textarea 
                placeholder="Rédigez votre publication..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date et heure de publication</Label>
                <Input type="datetime-local" />
              </div>
              <div>
                <Label>Hashtags</Label>
                <Input placeholder="#assurance #protection #maroc" />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Programmer
              </Button>
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Publier maintenant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des publications */}
      <Card>
        <CardHeader>
          <CardTitle>Publications récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-gray-800 mb-2">{post.contenu}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{post.plateforme}</Badge>
                      <Badge className={getStatusColor(post.statut)}>
                        {post.statut}
                      </Badge>
                      <span>{new Date(post.datePublication).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {post.statut === 'publie' && (
                  <div className="grid grid-cols-3 gap-4 text-sm bg-gray-50 p-3 rounded">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{post.vues.toLocaleString()}</div>
                      <div className="text-gray-600">Vues</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{post.interactions}</div>
                      <div className="text-gray-600">Interactions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">{post.partages}</div>
                      <div className="text-gray-600">Partages</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Digital</h2>
          <p className="text-gray-600">Gérez vos campagnes et votre présence digitale</p>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Campagnes Email
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'social'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Share2 className="h-4 w-4 inline mr-2" />
            Réseaux Sociaux
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'campaigns' && renderCampaigns()}
      {activeTab === 'social' && renderSocialMedia()}
    </div>
  );
};

export default MarketingManager;
