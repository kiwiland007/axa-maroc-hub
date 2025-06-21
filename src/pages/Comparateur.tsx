
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Comparateur = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = [
    {
      id: 'auto-essentiel',
      category: 'Auto',
      name: 'Auto Essentiel',
      price: '2500 DHS/an',
      features: [
        'Responsabilité civile',
        'Vol et incendie',
        'Bris de glace',
        'Assistance dépannage',
        'Protection conducteur'
      ],
      notIncluded: [
        'Tous risques',
        'Véhicule de remplacement'
      ],
      popular: false
    },
    {
      id: 'auto-premium',
      category: 'Auto',
      name: 'Auto Premium',
      price: '4200 DHS/an',
      features: [
        'Tous risques',
        'Vol et incendie',
        'Bris de glace',
        'Assistance dépannage 24h/7j',
        'Protection conducteur renforcée',
        'Véhicule de remplacement',
        'Garantie valeur à neuf'
      ],
      notIncluded: [],
      popular: true
    },
    {
      id: 'habitation-base',
      category: 'Habitation',
      name: 'Habitation Base',
      price: '1800 DHS/an',
      features: [
        'Incendie et explosion',
        'Dégâts des eaux',
        'Vol et vandalisme',
        'Responsabilité civile',
        'Bris de glace'
      ],
      notIncluded: [
        'Catastrophes naturelles',
        'Assistance habitation'
      ],
      popular: false
    },
    {
      id: 'habitation-confort',
      category: 'Habitation',
      name: 'Habitation Confort',
      price: '2800 DHS/an',
      features: [
        'Incendie et explosion',
        'Dégâts des eaux',
        'Vol et vandalisme',
        'Responsabilité civile',
        'Bris de glace',
        'Catastrophes naturelles',
        'Assistance habitation 24h/7j',
        'Garantie mobilier'
      ],
      notIncluded: [],
      popular: true
    },
    {
      id: 'sante-famille',
      category: 'Santé',
      name: 'Santé Famille',
      price: '6500 DHS/an',
      features: [
        'Consultations médicales',
        'Hospitalisation',
        'Pharmacie',
        'Analyses et radios',
        'Dentaire (soins courants)',
        'Optique (montures)',
        'Maternité'
      ],
      notIncluded: [
        'Médecines douces',
        'Prothèses dentaires'
      ],
      popular: true
    }
  ];

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : prev.length < 3 ? [...prev, productId] : prev
    );
  };

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Comparateur d'Assurances
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comparez nos différentes offres et trouvez la protection qui vous correspond le mieux. 
            Sélectionnez jusqu'à 3 produits pour les comparer.
          </p>
        </div>

        {selectedProducts.length === 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <Card 
                key={product.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  product.popular ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => toggleProductSelection(product.id)}
              >
                {product.popular && (
                  <div className="bg-red-500 text-white text-center py-2 text-sm font-semibold">
                    ⭐ Recommandé
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {product.category}
                      </Badge>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-500">
                        {product.price}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {product.features.length > 4 && (
                      <div className="text-sm text-gray-500">
                        +{product.features.length - 4} autres avantages
                      </div>
                    )}
                  </div>
                  <Button className="w-full mt-4">
                    Sélectionner pour comparer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Comparaison de vos sélections ({selectedProducts.length}/3)
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setSelectedProducts([])}
              >
                Réinitialiser
              </Button>
            </div>

            <div className="grid gap-6" style={{gridTemplateColumns: `repeat(${selectedProducts.length}, 1fr)`}}>
              {selectedProductsData.map((product) => (
                <Card key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    onClick={() => toggleProductSelection(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  {product.popular && (
                    <div className="bg-red-500 text-white text-center py-2 text-sm font-semibold">
                      ⭐ Recommandé
                    </div>
                  )}
                  
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <div className="text-3xl font-bold text-red-500">
                      {product.price}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-3">✓ Inclus</h4>
                        <div className="space-y-2">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {product.notIncluded.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-red-700 mb-3">✗ Non inclus</h4>
                          <div className="space-y-2">
                            {product.notIncluded.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-sm text-gray-500">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      onClick={() => navigate('/formulaires/affaire-nouvelle')}
                    >
                      Choisir cette offre
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedProducts.length < 3 && (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    Ajoutez {3 - selectedProducts.length} produit{3 - selectedProducts.length > 1 ? 's' : ''} de plus pour une comparaison complète
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products
                      .filter(p => !selectedProducts.includes(p.id))
                      .map((product) => (
                        <Button
                          key={product.id}
                          variant="outline"
                          onClick={() => toggleProductSelection(product.id)}
                          className="h-auto p-4"
                        >
                          <div>
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.price}</div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Comparateur;
