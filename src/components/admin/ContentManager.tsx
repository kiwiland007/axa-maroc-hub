
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Save, Upload, Eye, Plus, Trash2, Package } from 'lucide-react';
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
      const existingProduct = content.products.find(p => p.id === product.id);
      if (existingProduct) {
        updateProduct(product.id, product);
      } else {
        addProduct(product);
      }
    });

    // Remove products that were deleted
    content.products.forEach(product => {
      const stillExists = editingContent.products.find(p => p.id === product.id);
      if (!stillExists) {
        removeProduct(product.id);
      }
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
      id: `product-${Date.now()}`,
      title: 'Nouveau Produit',
      description: 'Description du nouveau produit d\'assurance',
      icon: 'Package',
      features: ['Nouvelle fonctionnalité 1', 'Nouvelle fonctionnalité 2', 'Nouvelle fonctionnalité 3']
    };
    setEditingContent(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
    toast.success('Nouveau produit ajouté !');
  };

  const removeProductFromEdit = (productId: string) => {
    setEditingContent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
    toast.success('Produit supprimé !');
  };

  const updateProductInEdit = (productId: string, field: string, value: any) => {
    setEditingContent(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId ? { ...p, [field]: value } : p
      )
    }));
  };

  const updateProductFeature = (productId: string, featureIndex: number, newValue: string) => {
    setEditingContent(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId 
          ? { ...p, features: p.features.map((f, i) => i === featureIndex ? newValue : f) }
          : p
      )
    }));
  };

  const addFeatureToProduct = (productId: string) => {
    setEditingContent(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId 
          ? { ...p, features: [...p.features, 'Nouvelle fonctionnalité'] }
          : p
      )
    }));
  };

  const removeFeatureFromProduct = (productId: string, featureIndex: number) => {
    setEditingContent(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId 
          ? { ...p, features: p.features.filter((_, i) => i !== featureIndex) }
          : p
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestion du Contenu</h2>
          <p className="text-gray-600">Modifiez le contenu et les images du site public en temps réel</p>
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
              <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-gray-800 hover:bg-gray-700">
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
              <CardTitle>Section Héro - Page d'Accueil</CardTitle>
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
                  <p className="text-lg font-semibold text-gray-800 mt-2 p-3 bg-gray-50 rounded-lg">{content.hero.title}</p>
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
                  <p className="text-gray-600 mt-2 p-3 bg-gray-50 rounded-lg">{content.hero.subtitle}</p>
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
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Gestion Complète des Produits</span>
                </div>
                {isEditing && (
                  <Button onClick={addNewProduct} className="bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un Produit
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {editingContent.products.map((product, index) => (
                  <div key={product.id} className="border-2 border-gray-200 rounded-xl p-6 space-y-6 hover:border-red-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xl text-gray-800">Produit {index + 1}: {product.title}</h4>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeProductFromEdit(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium mb-2">Titre du Produit</Label>
                        {isEditing ? (
                          <Input
                            value={product.title}
                            onChange={(e) => updateProductInEdit(product.id, 'title', e.target.value)}
                            className="mt-2"
                            placeholder="Ex: Assurance Auto"
                          />
                        ) : (
                          <p className="mt-2 p-3 bg-gray-50 rounded-lg font-semibold">{product.title}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2">Description</Label>
                        {isEditing ? (
                          <Input
                            value={product.description}
                            onChange={(e) => updateProductInEdit(product.id, 'description', e.target.value)}
                            className="mt-2"
                            placeholder="Description courte du produit"
                          />
                        ) : (
                          <p className="mt-2 p-3 bg-gray-50 rounded-lg">{product.description}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2">Icône (nom Lucide)</Label>
                      {isEditing ? (
                        <Input
                          value={product.icon}
                          onChange={(e) => updateProductInEdit(product.id, 'icon', e.target.value)}
                          className="mt-2"
                          placeholder="Ex: Car, Home, Heart, Shield"
                        />
                      ) : (
                        <p className="mt-2 p-3 bg-gray-50 rounded-lg font-mono">{product.icon}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-sm font-medium">Fonctionnalités du Produit</Label>
                        {isEditing && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addFeatureToProduct(product.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter
                          </Button>
                        )}
                      </div>
                      <div className="space-y-3">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            {isEditing ? (
                              <>
                                <Input
                                  value={feature}
                                  onChange={(e) => updateProductFeature(product.id, featureIndex, e.target.value)}
                                  className="flex-1"
                                  placeholder="Fonctionnalité du produit"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeFeatureFromProduct(product.id, featureIndex)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg w-full">
                                <span className="text-green-600">✓</span>
                                <span>{feature}</span>
                              </div>
                            )}
                          </div>
                        ))}
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
                      <p className="text-gray-600 mt-2 p-3 bg-gray-50 rounded-lg">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditing && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <Edit className="h-5 w-5" />
              <p className="font-medium">Mode Édition Actif</p>
            </div>
            <p className="text-sm text-red-700 mt-2">
              Vous êtes en train de modifier le contenu. Cliquez sur "Sauvegarder" pour appliquer les changements sur le site public.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentManager;
