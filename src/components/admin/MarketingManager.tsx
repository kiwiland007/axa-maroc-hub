
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Facebook, Instagram, Linkedin, Twitter, Image as ImageIcon, Send, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface SocialPost {
  id: string;
  content: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter';
  scheduledDate: string;
  scheduledTime: string;
  status: 'draft' | 'scheduled' | 'published';
  image?: string;
  hashtags: string[];
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  platform: string;
  reach: number;
  clicks: number;
}

const MarketingManager = () => {
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      content: 'Protégez votre véhicule avec notre assurance auto tous risques. Devis gratuit en ligne !',
      platform: 'facebook',
      scheduledDate: '2024-02-15',
      scheduledTime: '10:00',
      status: 'scheduled',
      hashtags: ['#AssuranceAuto', '#Maroc', '#Protection']
    },
    {
      id: '2',
      content: 'Votre habitation mérite la meilleure protection. Découvrez nos solutions personnalisées.',
      platform: 'instagram',
      scheduledDate: '2024-02-16',
      scheduledTime: '14:30',
      status: 'draft',
      hashtags: ['#AssuranceHabitation', '#Sécurité', '#Maison']
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Campagne Assurance Auto 2024',
      description: 'Promotion spéciale pour les nouvelles souscriptions d\'assurance auto',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 5000,
      status: 'active',
      platform: 'Facebook & Instagram',
      reach: 15420,
      clicks: 892
    }
  ]);

  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    content: '',
    platform: 'facebook',
    scheduledDate: '',
    scheduledTime: '',
    hashtags: []
  });

  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    platform: 'Facebook'
  });

  const [hashtagInput, setHashtagInput] = useState('');

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'scheduled': return 'Programmé';
      case 'published': return 'Publié';
      case 'active': return 'Active';
      case 'paused': return 'En pause';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const addHashtag = () => {
    if (hashtagInput.trim() && !newPost.hashtags?.includes(hashtagInput.trim())) {
      setNewPost({
        ...newPost,
        hashtags: [...(newPost.hashtags || []), hashtagInput.trim()]
      });
      setHashtagInput('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setNewPost({
      ...newPost,
      hashtags: (newPost.hashtags || []).filter(h => h !== hashtag)
    });
  };

  const createPost = () => {
    if (!newPost.content || !newPost.platform || !newPost.scheduledDate || !newPost.scheduledTime) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const post: SocialPost = {
      id: Date.now().toString(),
      content: newPost.content,
      platform: newPost.platform as 'facebook' | 'instagram' | 'linkedin' | 'twitter',
      scheduledDate: newPost.scheduledDate,
      scheduledTime: newPost.scheduledTime,
      status: 'scheduled',
      hashtags: newPost.hashtags || [],
      image: newPost.image
    };

    setPosts([...posts, post]);
    setIsNewPostModalOpen(false);
    setNewPost({
      content: '',
      platform: 'facebook',
      scheduledDate: '',
      scheduledTime: '',
      hashtags: []
    });
    toast.success('Publication programmée avec succès !');
  };

  const createCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate || !newCampaign.budget) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      description: newCampaign.description || '',
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      budget: newCampaign.budget,
      status: 'active',
      platform: newCampaign.platform || 'Facebook',
      reach: 0,
      clicks: 0
    };

    setCampaigns([...campaigns, campaign]);
    setIsNewCampaignModalOpen(false);
    setNewCampaign({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: 0,
      platform: 'Facebook'
    });
    toast.success('Campagne créée avec succès !');
  };

  const publishPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'published' } : post
    ));
    toast.success('Publication publiée immédiatement !');
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.success('Publication supprimée');
  };

  const viewPost = (post: SocialPost) => {
    setSelectedPost(post);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setNewPost({ ...newPost, image: imageUrl });
          toast.success('Image ajoutée avec succès');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Digital</h2>
          <p className="text-gray-600">Gérez vos campagnes et publications sur les réseaux sociaux</p>
        </div>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Publications Réseaux Sociaux</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes Publicitaires</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Publications Programmées</h3>
            <Button 
              onClick={() => setIsNewPostModalOpen(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Publication
            </Button>
          </div>

          <div className="grid gap-6">
            {posts.map((post) => {
              const PlatformIcon = platformIcons[post.platform];
              return (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <PlatformIcon className="h-5 w-5 text-blue-600" />
                          <span className="font-medium capitalize">{post.platform}</span>
                          <Badge className={getStatusColor(post.status)}>
                            {getStatusLabel(post.status)}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-800 mb-3">{post.content}</p>
                        
                        {post.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.hashtags.map((hashtag, index) => (
                              <span key={index} className="text-blue-600 text-sm">
                                {hashtag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.scheduledDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.scheduledTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      {post.image && (
                        <div className="ml-4">
                          <img 
                            src={post.image} 
                            alt="Post image" 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewPost(post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {post.status === 'scheduled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => publishPost(post.id)}
                          className="text-green-600"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePost(post.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Campagnes Publicitaires</h3>
            <Button 
              onClick={() => setIsNewCampaignModalOpen(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Campagne
            </Button>
          </div>

          <div className="grid gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <Badge className={getStatusColor(campaign.status)}>
                          {getStatusLabel(campaign.status)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{campaign.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Plateforme</p>
                          <p className="font-medium">{campaign.platform}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Budget</p>
                          <p className="font-medium">{campaign.budget.toLocaleString()} DH</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Portée</p>
                          <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Clics</p>
                          <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Du {campaign.startDate} au {campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h3 className="text-lg font-semibold">Statistiques Marketing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">1,250</p>
                  <p className="text-sm text-gray-600">Impressions cette semaine</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">89</p>
                  <p className="text-sm text-gray-600">Clics cette semaine</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">7.1%</p>
                  <p className="text-sm text-gray-600">Taux de clic (CTR)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">12</p>
                  <p className="text-sm text-gray-600">Nouvelles demandes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Nouvelle Publication */}
      <Dialog open={isNewPostModalOpen} onOpenChange={setIsNewPostModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Programmer une Nouvelle Publication</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label>Plateforme *</Label>
              <Select 
                value={newPost.platform} 
                onValueChange={(value) => setNewPost({ ...newPost, platform: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une plateforme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Contenu de la publication *</Label>
              <Textarea
                value={newPost.content || ''}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Rédigez votre publication..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de publication *</Label>
                <Input
                  type="date"
                  value={newPost.scheduledDate || ''}
                  onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                />
              </div>
              <div>
                <Label>Heure de publication *</Label>
                <Input
                  type="time"
                  value={newPost.scheduledTime || ''}
                  onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Hashtags</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  placeholder="#hashtag"
                  onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                />
                <Button onClick={addHashtag} variant="outline">
                  Ajouter
                </Button>
              </div>
              {newPost.hashtags && newPost.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newPost.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeHashtag(hashtag)}>
                      {hashtag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Image (optionnel)</Label>
              <div className="flex items-center space-x-4">
                <Button onClick={handleImageUpload} variant="outline">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Ajouter une image
                </Button>
                {newPost.image && (
                  <img src={newPost.image} alt="Preview" className="w-16 h-16 object-cover rounded" />
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewPostModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={createPost} className="bg-red-500 hover:bg-red-600">
                Programmer la Publication
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Nouvelle Campagne */}
      <Dialog open={isNewCampaignModalOpen} onOpenChange={setIsNewCampaignModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une Nouvelle Campagne</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label>Nom de la campagne *</Label>
              <Input
                value={newCampaign.name || ''}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                placeholder="Nom de votre campagne"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={newCampaign.description || ''}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                placeholder="Description de la campagne..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de début *</Label>
                <Input
                  type="date"
                  value={newCampaign.startDate || ''}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>Date de fin *</Label>
                <Input
                  type="date"
                  value={newCampaign.endDate || ''}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Budget (DH) *</Label>
                <Input
                  type="number"
                  value={newCampaign.budget || 0}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: parseFloat(e.target.value) })}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <Label>Plateforme</Label>
                <Select 
                  value={newCampaign.platform} 
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une plateforme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="Facebook & Instagram">Facebook & Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewCampaignModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={createCampaign} className="bg-red-500 hover:bg-red-600">
                Créer la Campagne
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingManager;
