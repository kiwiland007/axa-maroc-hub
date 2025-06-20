
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Save, Upload, Image as ImageIcon, Type, Globe, Plus, Trash2, Eye } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { toast } from 'sonner';

const ContentManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { content, updateContent, updateProduct, addProduct, removeProduct } = useContentStore();
  const [editingContent, setEditingContent] = useState(content);

  const handleSave = () => {
    // Update all sections
    updateContent('hero', editingContent.hero);
    updateContent('about', editingContent.about);
    updateContent('contact', editingContent.contact);
    
    // Update products
    editingContent.products.forEach(product => {
      updateProduct(product.id, product);
    });

    setIsEditing(false);
    toast.success('Contenu mis à jour avec succès !');
    
    // Refresh the page to show changes
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCancel = () => {
    setEditingContent(content);
    setIsEditing(false);
  };

  const handleImageUpload = (section: string, field: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Simulate image upload - in real app, you'd upload to a service
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setEditingContent(prev => ({
            ...prev,
            [section]: {
              ...prev[section as keyof typeof prev],
              [field]: imageUrl
            }
          }));
          toast.success('Image uploadée avec succès !');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addNewProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      title: 'Nouveau Produit',
      description: 'Description du nouveau produit',
      icon: 'Package',
      features: ['Fonctionnalité 1', 'Fonctionnalité 2']
    };
    setEditingContent(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const removeProductFromEdit = (productId: string) => {
    setEditingContent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion du Contenu</h2>
          <p className="text-axa-gray">Modifiez le contenu et les images du site public en temps réel</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Aperçu du Site</span>
          </Button>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-axa-red hover:bg-axa-red/90">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-axa-gray-dark hover:bg-axa-gray-dark/90">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Section Héro</TabsTrigger>
          <TabsTrigger value="about">À Propos</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Section Héro - Page d'Accueil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2">Titre Principal</Label>
                {isEditing ? (
                  <Input
                    value={editingContent.hero.title}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value }
                    }))}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-lg font-semibold text-axa-gray-dark mt-2 p-3 bg-gray-50 rounded-lg">{content.hero.title}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Sous-titre</Label>
                {isEditing ? (
                  <Textarea
                    value={editingContent.hero.subtitle}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value }
                    }))}
                    rows={3}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-axa-gray mt-2 p-3 bg-gray-50 rounded-lg">{content.hero.subtitle}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Image de fond</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <img 
                    src={editingContent.hero.backgroundImage} 
                    alt="Background" 
                    className="w-40 h-24 object-cover rounded-lg border"
                  />
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleImageUpload('hero', 'backgroundImage')}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Changer l'image</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section À Propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">Titre</Label>
                  {isEditing ? (
                    <Input
                      value={editingContent.about.title}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        about: { ...prev.about, title: e.target.value }
                      }))}
                      className="mt-2"
                    />
                  ) : (
                    <p className="font-semibold mt-2 p-3 bg-gray-50 rounded-lg">{content.about.title}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2">Sous-titre</Label>
                  {isEditing ? (
                    <Input
                      value={editingContent.about.subtitle}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        about: { ...prev.about, subtitle: e.target.value }
                      }))}
                      className="mt-2"
                    />
                  ) : (
                    <p className="text-axa-red mt-2 p-3 bg-gray-50 rounded-lg">{content.about.subtitle}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Description</Label>
                {isEditing ? (
                  <Textarea
                    value={editingContent.about.description}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      about: { ...prev.about, description: e.target.value }
                    }))}
                    rows={4}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-axa-gray mt-2 p-3 bg-gray-50 rounded-lg">{content.about.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['experience', 'clients', 'satisfaction', 'response'].map((field) => (
                  <div key={field}>
                    <Label className="text-sm font-medium mb-2 capitalize">{field}</Label>
                    {isEditing ? (
                      <Input
                        value={editingContent.about[field as keyof typeof editingContent.about]}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          about: { ...prev.about, [field]: e.target.value }
                        }))}
                        className="mt-2"
                      />
                    ) : (
                      <p className="text-2xl font-bold mt-2 p-3 bg-gray-50 rounded-lg">{content.about[field as keyof typeof content.about]}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gestion des Produits</span>
                {isEditing && (
                  <Button onClick={addNewProduct} className="bg-axa-red hover:bg-axa-red/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un Produit
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {editingContent.products.map((product, index) => (
                  <div key={product.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Produit {index + 1}</h4>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeProductFromEdit(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2">Titre</Label>
                        {isEditing ? (
                          <Input
                            value={product.title}
                            onChange={(e) => setEditingContent(prev => ({
                              ...prev,
                              products: prev.products.map(p => 
                                p.id === product.id ? { ...p, title: e.target.value } : p
                              )
                            }))}
                            className="mt-2"
                          />
                        ) : (
                          <p className="mt-2 p-3 bg-gray-50 rounded-lg">{product.title}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2">Description</Label>
                        {isEditing ? (
                          <Input
                            value={product.description}
                            onChange={(e) => setEditingContent(prev => ({
                              ...prev,
                              products: prev.products.map(p => 
                                p.id === product.id ? { ...p, description: e.target.value } : p
                              )
                            }))}
                            className="mt-2"
                          />
                        ) : (
                          <p className="mt-2 p-3 bg-gray-50 rounded-lg">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(editingContent.contact).map(([key, value]) => (
                  <div key={key}>
                    <Label className="text-sm font-medium mb-2 capitalize">{key}</Label>
                    {isEditing ? (
                      key === 'address' ? (
                        <Textarea
                          value={value}
                          onChange={(e) => setEditingContent(prev => ({
                            ...prev,
                            contact: { ...prev.contact, [key]: e.target.value }
                          }))}
                          rows={2}
                          className="mt-2"
                        />
                      ) : (
                        <Input
                          value={value}
                          onChange={(e) => setEditingContent(prev => ({
                            ...prev,
                            contact: { ...prev.contact, [key]: e.target.value }
                          }))}
                          className="mt-2"
                        />
                      )
                    ) : (
                      <p className="text-axa-gray mt-2 p-3 bg-gray-50 rounded-lg">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditing && (
        <Card className="border-axa-red/20 bg-axa-red/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-axa-red">
              <Edit className="h-5 w-5" />
              <p className="font-medium">Mode Édition Actif</p>
            </div>
            <p className="text-sm text-axa-gray mt-2">
              Vous êtes en train de modifier le contenu. Cliquez sur "Sauvegarder" pour appliquer les changements sur le site public.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentManager;
