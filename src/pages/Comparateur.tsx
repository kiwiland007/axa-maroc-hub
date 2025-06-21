
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Comparateur = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = [
    {
      id: 'auto',
      name: 'Assurance Auto',
      price: 'À partir de 1,200 DH/an',
      features: [
        'Responsabilité civile',
        'Vol et incendie',
        'Tous risques',
        'Assistance 24h/24',
        'Véhicule de remplacement',
        'Protection conducteur'
      ],
      notIncluded: ['Franchise 0 DH']
    },
    {
      id: 'habitation',
      name: 'Assurance Habitation',
      price: 'À partir de 800 DH/an',
      features: [
        'Incendie explosion',
        'Dégâts des eaux',
        'Vol vandalisme',
        'Bris de glace',
        'Responsabilité civile',
        'Assistance habitation'
      ],
      notIncluded: ['Piscine', 'Dépendances']
    },
    {
      id: 'sante',
      name: 'Assurance Santé',
      price: 'À partir de 2,500 DH/an',
      features: [
        'Consultations',
        'Hospitalisation',
        'Pharmacie',
        'Analyses',
        'Radiologie',
        'Dentaire'
      ],
      notIncluded: ['Cure thermale', 'Prothèses']
    }
  ];

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id));

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Comparateur d'Assurances
            </h1>
            <p className="text-xl text-gray-600">
              Comparez nos différentes offres et trouvez celle qui vous convient
            </p>
          </div>

          {/* Product Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sélectionnez les produits à comparer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {products.map(product => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={product.id}
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                    <label htmlFor={product.id} className="font-medium cursor-pointer">
                      {product.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          {selectedProductsData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Critères</th>
                    {selectedProductsData.map(product => (
                      <th key={product.id} className="px-6 py-4 text-center font-semibold">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Prix</td>
                    {selectedProductsData.map(product => (
                      <td key={product.id} className="px-6 py-4 text-center text-green-600 font-semibold">
                        {product.price}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Features comparison */}
                  {Array.from(new Set(selectedProductsData.flatMap(p => p.features))).map(feature => (
                    <tr key={feature} className="border-b">
                      <td className="px-6 py-4">{feature}</td>
                      {selectedProductsData.map(product => (
                        <td key={product.id} className="px-6 py-4 text-center">
                          {product.features.includes(feature) ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedProductsData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Sélectionnez au moins un produit pour commencer la comparaison
              </p>
            </div>
          )}

          {/* CTA */}
          {selectedProductsData.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/formulaires/affaire-nouvelle')}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg"
              >
                Demander un Devis Personnalisé
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Comparateur;
