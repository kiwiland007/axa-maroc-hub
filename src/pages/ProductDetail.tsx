
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, Shield, Check } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
            <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas.</p>
            <Button onClick={() => navigate('/')} className="bg-red-500 hover:bg-red-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-red-500" />
                    <span>Avantages inclus</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                  onClick={() => navigate('/formulaires/affaire-nouvelle')}
                >
                  Demander un Devis Gratuit
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center space-x-2"
                    onClick={() => window.open(`tel:${content.contact.phone}`)}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Appeler</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center space-x-2"
                    onClick={() => window.open(`mailto:${content.contact.email}`)}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Pourquoi choisir notre {product.title.toLowerCase()} ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Expertise Reconnue</h3>
                    <p className="text-gray-600">Plus de 20 ans d'expérience dans l'assurance au Maroc</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Service 24h/24</h3>
                    <p className="text-gray-600">Assistance disponible à tout moment pour vos urgences</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Satisfaction Garantie</h3>
                    <p className="text-gray-600">98% de nos clients sont satisfaits de nos services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
