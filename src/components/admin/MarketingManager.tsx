
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Calendar,
  Plus,
  Send,
  BarChart3,
  Target,
  Eye,
  MousePointer
} from 'lucide-react';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social';
  status: 'draft' | 'active' | 'completed';
  audience: string;
  sentDate?: string;
  openRate?: number;
  clickRate?: number;
  conversions?: number;
}

interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin';
  content: string;
  scheduledDate: string;
  status: 'scheduled' | 'published';
  engagement?: number;
}

const MarketingManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Campagne Assurance Auto - Printemps 2024',
      type: 'email',
      status: 'completed',
      audience: 'Prospects Auto',
      sentDate: '2024-03-15',
      openRate: 24.5,
      clickRate: 3.2,
      conversions: 18
    },
    {
      id: '2',
      name: 'Promotion Assurance Habitation',
      type: 'sms',
      status: 'active',
      audience: 'Clients existants',
      sentDate: '2024-06-01',
      openRate: 89.3,
      clickRate: 12.1,
      conversions: 45
    }
  ]);

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: '1',
      platform: 'facebook',
      content: 'Protégez votre véhicule avec notre assurance auto complète ! 🚗 Devis gratuit en 2 minutes.',
      scheduledDate: '2024-06-25T10:00',
      status: 'scheduled',
      engagement: 0
    },
    {
      id: '2',
      platform: 'instagram',
      content: 'Votre maison mérite la meilleure protection 🏠 Découvrez notre assurance habitation.',
      scheduledDate: '2024-06-20T14:30',
      status: 'published',
      engagement: 156
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email' as 'email' | 'sms' | 'social',
    audience: '',
    subject: '',
    content: ''
  });

  const [newPost, setNewPost] = useState({
    platform: 'facebook' as 'facebook' | 'instagram' | 'linkedin',
    content: '',
    scheduledDate: ''
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.audience || !newCampaign.content) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      type: newCampaign.type,
      status: 'draft',
      audience: newCampaign.audience
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: '', type: 'email', audience: '', subject: '', content: '' });
    toast.success('Campagne créée avec succès !');
  };

  const handleSchedulePost = () => {
    if (!newPost.content || !newPost.scheduledDate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const post: SocialPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      scheduledDate: newPost.scheduledDate,
      status: 'scheduled',
      engagement: 0
    };

    setSocialPosts([...socialPosts, post]);
    setNewPost({ platform: 'facebook', content: '', scheduledDate: '' });
    toast.success('Publication programmée avec succès !');
  };

  const launchCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, status: 'active', sentDate: new Date().toISOString().split('T')[0] } : c
    ));
    toast.success('Campagne lancée avec succès !');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'linkedin': return '💼';
      default: return '📱';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Digital</h2>
        <p className="text-gray-600">Gérez vos campagnes marketing et votre présence sur les réseaux sociaux</p>
      </div>

      {/* Dashboard Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600">Campagnes actives</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">28.4%</div>
                <div className="text-sm text-gray-600">Taux d'ouverture</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MousePointer className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">5.8%</div>
                <div className="text-sm text-gray-600">Taux de clic</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">143</div>
                <div className="text-sm text-gray-600">Conversions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campagnes Email/SMS</TabsTrigger>
          <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Create New Campaign */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Nouvelle Campagne</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom de la campagne *</Label>
                  <Input
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    placeholder="Ex: Promotion Été 2024"
                  />
                </div>
                <div>
                  <Label>Type de campagne</Label>
                  <Select value={newCampaign.type} onValueChange={(value: 'email' | 'sms' | 'social') => setNewCampaign({...newCampaign, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="social">Réseaux Sociaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Audience cible *</Label>
                <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign({...newCampaign, audience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospects-auto">Prospects Auto</SelectItem>
                    <SelectItem value="prospects-habitation">Prospects Habitation</SelectItem>
                    <SelectItem value="clients-existants">Clients existants</SelectItem>
                    <SelectItem value="leads-recents">Leads récents</SelectItem>
                    <SelectItem value="tous">Tous les contacts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newCampaign.type === 'email' && (
                <div>
                  <Label>Sujet de l'email</Label>
                  <Input
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                    placeholder="Objet de votre email"
                  />
                </div>
              )}

              <div>
                <Label>Contenu du message *</Label>
                <Textarea
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                  rows={4}
                  placeholder="Rédigez votre message..."
                />
              </div>

              <Button onClick={handleCreateCampaign} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Créer la campagne
              </Button>
            </CardContent>
          </Card>

          {/* Campaigns List */}
          <Card>
            <CardHeader>
              <CardTitle>Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">Audience: {campaign.audience}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {campaign.status === 'draft' ? 'Brouillon' : 
                           campaign.status === 'active' ? 'Active' : 'Terminée'}
                        </span>
                        {campaign.status === 'draft' && (
                          <Button size="sm" onClick={() => launchCampaign(campaign.id)}>
                            <Send className="h-4 w-4 mr-1" />
                            Lancer
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {campaign.status !== 'draft' && (
                      <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{campaign.openRate}%</div>
                          <div className="text-sm text-gray-600">Ouvertures</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{campaign.clickRate}%</div>
                          <div className="text-sm text-gray-600">Clics</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{campaign.conversions}</div>
                          <div className="text-sm text-gray-600">Conversions</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {/* Schedule New Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Programmer une Publication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Plateforme</Label>
                <Select value={newPost.platform} onValueChange={(value: 'facebook' | 'instagram' | 'linkedin') => setNewPost({...newPost, platform: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">📘 Facebook</SelectItem>
                    <SelectItem value="instagram">📷 Instagram</SelectItem>
                    <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Contenu de la publication</Label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={3}
                  placeholder="Rédigez votre publication..."
                />
              </div>

              <div>
                <Label>Date et heure de publication</Label>
                <Input
                  type="datetime-local"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({...newPost, scheduledDate: e.target.value})}
                />
              </div>

              <Button onClick={handleSchedulePost} className="bg-purple-500 hover:bg-purple-600">
                <Calendar className="h-4 w-4 mr-2" />
                Programmer la publication
              </Button>
            </CardContent>
          </Card>

          {/* Social Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Publications Programmées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getPlatformIcon(post.platform)}</span>
                        <div>
                          <div className="font-medium capitalize">{post.platform}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(post.scheduledDate).toLocaleString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(post.status)}`}>
                        {post.status === 'scheduled' ? 'Programmée' : 'Publiée'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    
                    {post.status === 'published' && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>❤️ {post.engagement} interactions</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Performances Marketing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Campagnes Email</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Taux d'ouverture moyen</span>
                      <span className="font-bold text-blue-600">28.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Taux de clic moyen</span>
                      <span className="font-bold text-green-600">5.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Taux de conversion</span>
                      <span className="font-bold text-orange-600">2.1%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Réseaux Sociaux</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Publications ce mois</span>
                      <span className="font-bold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engagement total</span>
                      <span className="font-bold text-purple-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nouveaux followers</span>
                      <span className="font-bold text-blue-600">+89</span>
                    </div>
                  </div>
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
