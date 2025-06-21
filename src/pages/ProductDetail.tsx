
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, CheckCircle, Phone, Mail } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h1>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const benefits = {
    auto: [
      'Assistance dépannage 24h/24 et 7j/7',
      'Véhicule de remplacement pendant les réparations',
      'Protection du conducteur et des passagers',
      'Couverture vol et incendie',
      'Indemnisation rapide en cas de sinistre'
    ],
    habitation: [
      'Couverture incendie, dégâts des eaux, vol',
      'Responsabilité civile vie privée',
      'Assistance habitation 24h/24',
      'Garantie mobilier et objets de valeur',
      'Protection juridique incluse'
    ],
    sante: [
      'Remboursement rapide des frais médicaux',
      'Réseau de soins conventionnés étendu',
      'Couverture hospitalisation et chirurgie',
      'Prise en charge dentaire et optique',
      'Assistance médicale internationale'
    ],
    prevoyance: [
      'Capital décès pour protéger vos proches',
      'Rente en cas d\'invalidité permanente',
      'Indemnités journalières en cas d\'arrêt de travail',
      'Couverture accidents de la vie privée',
      'Assistance psychologique incluse'
    ],
    epargne: [
      'Rendement attractif et sécurisé',
      'Disponibilité des fonds selon vos besoins',
      'Avantages fiscaux optimisés',
      'Transmission facilitée du patrimoine',
      'Conseil personnalisé de nos experts'
    ],
    professionnelle: [
      'Responsabilité civile professionnelle',
      'Protection des locaux et du matériel',
      'Couverture perte d\'exploitation',
      'Protection juridique métier',
      'Assistance en cas de sinistre'
    ]
  };

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

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {product.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-red-500" />
                Avantages inclus
              </h2>
              
              <div className="space-y-4">
                {(benefits[productId as keyof typeof benefits] || []).map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                onClick={() => navigate('/formulaires/affaire-nouvelle')}
              >
                Demander un Devis Gratuit
              </Button>
              
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Nous Appeler
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Nous Écrire
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Pourquoi choisir Moumen Technique et Prévoyance ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">20+</div>
                <div className="text-gray-700">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">5000+</div>
                <div className="text-gray-700">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">98%</div>
                <div className="text-gray-700">Taux de satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
