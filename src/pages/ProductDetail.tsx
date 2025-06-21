
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Phone, Mail, Star } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { content } = useContentStore();
  
  const product = content.products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h1>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const getDeepFeatures = (productId: string) => {
    switch (productId) {
      case 'auto':
        return [
          'Responsabilité civile obligatoire',
          'Défense et recours',
          'Vol, incendie, bris de glace',
          'Dommages tous accidents',
          'Catastrophes naturelles',
          'Assistance dépannage 24h/24',
          'Véhicule de remplacement',
          'Protection du conducteur',
          'Accessoires et aménagements',
          'Valeur à neuf jusqu\'à 2 ans'
        ];
      case 'habitation':
        return [
          'Incendie, explosion, foudre',
          'Dégâts des eaux',
          'Vol, tentative de vol, vandalisme',
          'Bris de glace',
          'Catastrophes naturelles',
          'Responsabilité civile vie privée',
          'Défense et recours',
          'Assistance habitation 24h/24',
          'Remboursement à la valeur de reconstruction',
          'Frais de relogement'
        ];
      case 'sante':
        return [
          'Consultations médicales générales',
          'Consultations spécialisées',
          'Hospitalisation médicale et chirurgicale',
          'Pharmacie et médicaments',
          'Analyses et examens',
          'Radiologie et imagerie',
          'Soins dentaires',
          'Optique et audioprothèse',
          'Maternité et pédiatrie',
          'Médecines douces'
        ];
      case 'prevoyance':
        return [
          'Capital décès toutes causes',
          'Rente conjoint survivant',
          'Rente d\'éducation enfants',
          'Capital invalidité permanente',
          'Indemnités journalières maladie',
          'Indemnités journalières accident',
          'Assistance psychologique',
          'Capital obsèques',
          'Rente de survie',
          'Exonération des cotisations'
        ];
      case 'epargne':
        return [
          'Épargne programmée',
          'Versements libres',
          'Garantie du capital',
          'Participation aux bénéfices',
          'Rente viagère',
          'Avantages fiscaux',
          'Transmission du capital',
          'Rachat partiel possible',
          'Arbitrages gratuits',
          'Gestion pilotée'
        ];
      case 'professionnelle':
        return [
          'Responsabilité civile exploitation',
          'Responsabilité civile produits',
          'Responsabilité civile après livraison',
          'Dommages aux locaux',
          'Vol, vandalisme',
          'Bris de machines',
          'Perte d\'exploitation',
          'Protection juridique',
          'Cyber-risques',
          'Responsabilité dirigeants'
        ];
      default:
        return product.features;
    }
  };

  const handleQuoteRequest = () => {
    if (productId === 'habitation') {
      navigate('/formulaires/mrh');
    } else if (productId === 'sante') {
      navigate('/formulaires/sehassur');
    } else {
      navigate('/formulaires/affaire-nouvelle');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour aux produits</span>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-6">
              {product.image && (
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24h</div>
                  <div className="text-sm text-gray-600">Réponse rapide</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">20+</div>
                  <div className="text-sm text-gray-600">Ans d'expérience</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.detailedDescription || product.description}
                </p>
              </div>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>Garanties incluses</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {getDeepFeatures(productId!).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={handleQuoteRequest}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-lg"
                >
                  Demander un Devis Gratuit
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Nous appeler</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Nous écrire</span>
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Pourquoi choisir AXA ?</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• 1er assureur mondial</li>
                  <li>• Présent au Maroc depuis plus de 100 ans</li>
                  <li>• Réseau de 100+ agences au Maroc</li>
                  <li>• Service client disponible 7j/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
