
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Image as ImageIcon, 
  Calendar, 
  Send, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Hash,
  Upload,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'all';
  content: string;
  image?: string;
  hashtags: string[];
  status: 'brouillon' | 'programme' | 'publie' | 'echec';
  scheduledDate?: string;
  scheduledTime?: string;
  publishedDate?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const MarketingManager = () => {
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      platform: 'facebook',
      content: 'Protégez votre véhicule avec notre assurance auto complète ! 🚗✨ Devis gratuit en 5 minutes.',
      hashtags: ['#AssuranceAuto', '#Protection', '#Maroc', '#Casablanca'],
      status: 'publie',
      publishedDate: '2023-12-15T10:00',
      engagement: { likes: 45, comments: 8, shares: 12 }
    },
    {
      id: '2',
      platform: 'instagram',
      content: 'Votre foyer mérite la meilleure protection ! 🏠 Découvrez notre assurance habitation sur mesure.',
      hashtags: ['#AssuranceHabitation', '#Maison', '#Protection', '#Famille'],
      status: 'programme',
      scheduledDate: '2023-12-20',
      scheduledTime: '14:30'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [newPost, setNewPost] = useState({
    platform: 'facebook' as const,
    content: '',
    hashtags: '',
    scheduledDate: '',
    scheduledTime: '',
    image: ''
  });

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { id: 'all', name: 'Toutes les plateformes', icon: Send, color: 'text-gray-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'brouillon': return 'bg-gray-100 text-gray-800';
      case 'programme': return 'bg-blue-100 text-blue-800';
      case 'publie': return 'bg-green-100 text-green-800';
      case 'echec': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.id === platform);
    if (!platformData) return <Send className="h-4 w-4" />;
    const Icon = platformData.icon;
    return <Icon className={`h-4 w-4 ${platformData.color}`} />;
  };

  const handleImageUpload = (setter: (url: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setter(imageUrl);
          toast.success('Image uploadée avec succès !');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast.error('Veuillez saisir le contenu du post');
      return;
    }

    const post: SocialPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      hashtags: newPost.hashtags.split(' ').filter(h => h.startsWith('#')),
      status: newPost.scheduledDate ? 'programme' : 'brouillon',
      scheduledDate: newPost.scheduledDate || undefined,
      scheduledTime: newPost.scheduledTime || undefined,
      image: newPost.image || undefined
    };

    setPosts([...posts, post]);
    setNewPost({
      platform: 'facebook',
      content: '',
      hashtags: '',
      scheduledDate: '',
      scheduledTime: '',
      image: ''
    });
    setShowCreateForm(false);
    
    if (post.status === 'programme') {
      toast.success('Post programmé avec succès !');
    } else {
      toast.success('Brouillon créé avec succès !');
    }
  };

  const handleEditPost = () => {
    if (!editingPost) return;

    setPosts(posts.map(post => 
      post.id === editingPost.id ? editingPost : post
    ));
    setEditingPost(null);
    toast.success('Post modifié avec succès !');
  };

  const publishPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: 'publie', publishedDate: new Date().toISOString() }
        : post
    ));
    toast.success('Post publié avec succès !');
  };

  const deletePost = (postId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post supprimé avec succès');
    }
  };

  const duplicatePost = (post: SocialPost) => {
    const duplicatedPost: SocialPost = {
      ...post,
      id: Date.now().toString(),
      status: 'brouillon',
      scheduledDate: undefined,
      scheduledTime: undefined,
      publishedDate: undefined,
      engagement: undefined
    };
    setPosts([...posts, duplicatedPost]);
    toast.success('Post dupliqué avec succès !');
  };

  const postsByStatus = {
    brouillon: posts.filter(p => p.status === 'brouillon').length,
    programme: posts.filter(p => p.status === 'programme').length,
    publie: posts.filter(p => p.status === 'publie').length,
    echec: posts.filter(p => p.status === 'echec').length
  };

  const suggestedHashtags = [
    '#AssuranceMaroc', '#Protection', '#Casablanca', '#Rabat', '#Sécurité',
    '#Famille', '#Santé', '#Auto', '#Habitation', '#Prévoyance'
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-gray-500" />
              <div>
                <div className="text-xl font-bold">{postsByStatus.brouillon}</div>
                <div className="text-xs text-gray-600">Brouillons</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{postsByStatus.programme}</div>
                <div className="text-xs text-gray-600">Programmés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <div className="text-xl font-bold">{postsByStatus.publie}</div>
                <div className="text-xs text-gray-600">Publiés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <div>
                <div className="text-xl font-bold">{postsByStatus.echec}</div>
                <div className="text-xs text-gray-600">Échecs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre d'actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5" />
              <span>Programmer une Publication Réseaux Sociaux</span>
            </CardTitle>
            <Button onClick={() => setShowCreateForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Liste des posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    {getPlatformIcon(post.platform)}
                    <span className="font-medium capitalize">{post.platform}</span>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {post.status === 'brouillon' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => publishPost(post.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => duplicatePost(post)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <p className="text-sm mb-2">{post.content}</p>
                    {post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.hashtags.map((hashtag, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {post.status === 'programme' && post.scheduledDate && (
                        <div>📅 Programmé pour le {new Date(post.scheduledDate).toLocaleDateString('fr-FR')} à {post.scheduledTime}</div>
                      )}
                      {post.status === 'publie' && post.publishedDate && (
                        <div>✅ Publié le {new Date(post.publishedDate).toLocaleDateString('fr-FR')}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-20 object-cover rounded-lg border"
                      />
                    )}
                    {post.engagement && (
                      <div className="mt-2 text-xs space-y-1">
                        <div>❤️ {post.engagement.likes} J'aime</div>
                        <div>💬 {post.engagement.comments} Commentaires</div>
                        <div>📤 {post.engagement.shares} Partages</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun post créé pour le moment
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal création de post */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Nouveau Post Réseaux Sociaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="platform">Plateforme</Label>
                <select
                  id="platform"
                  value={newPost.platform}
                  onChange={(e) => setNewPost({...newPost, platform: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                >
                  {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="content">Contenu du post *</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={4}
                  className="mt-1"
                  placeholder="Rédigez votre post..."
                />
              </div>

              <div>
                <Label className="mb-2">Image (optionnelle)</Label>
                <div className="flex items-center space-x-4 mt-2">
                  {newPost.image && (
                    <img 
                      src={newPost.image} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => handleImageUpload((url) => setNewPost({...newPost, image: url}))}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Ajouter une image</span>
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost({...newPost, hashtags: e.target.value})}
                  className="mt-1"
                  placeholder="#AssuranceMaroc #Protection #Casablanca"
                />
                <div className="mt-2">
                  <Label className="text-xs text-gray-600">Suggestions:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {suggestedHashtags.map((hashtag) => (
                      <button
                        key={hashtag}
                        type="button"
                        onClick={() => {
                          const currentHashtags = newPost.hashtags;
                          const newHashtags = currentHashtags ? `${currentHashtags} ${hashtag}` : hashtag;
                          setNewPost({...newPost, hashtags: newHashtags});
                        }}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                      >
                        {hashtag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduledDate">Date de publication (optionnelle)</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({...newPost, scheduledDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledTime">Heure de publication</Label>
                  <Input
                    id="scheduledTime"
                    type="time"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost({...newPost, scheduledTime: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button onClick={handleCreatePost} className="bg-purple-600 hover:bg-purple-700">
                  {newPost.scheduledDate ? 'Programmer' : 'Créer brouillon'}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal édition de post */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Modifier le Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="editPlatform">Plateforme</Label>
                <select
                  id="editPlatform"
                  value={editingPost.platform}
                  onChange={(e) => setEditingPost({...editingPost, platform: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                >
                  {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="editContent">Contenu du post</Label>
                <Textarea
                  id="editContent"
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Hashtags</Label>
                <Input
                  value={editingPost.hashtags.join(' ')}
                  onChange={(e) => setEditingPost({
                    ...editingPost, 
                    hashtags: e.target.value.split(' ').filter(h => h.startsWith('#'))
                  })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date de publication</Label>
                  <Input
                    type="date"
                    value={editingPost.scheduledDate || ''}
                    onChange={(e) => setEditingPost({...editingPost, scheduledDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Heure de publication</Label>
                  <Input
                    type="time"
                    value={editingPost.scheduledTime || ''}
                    onChange={(e) => setEditingPost({...editingPost, scheduledTime: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button onClick={handleEditPost} className="bg-blue-600 hover:bg-blue-700">
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketingManager;
