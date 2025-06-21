
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Home, Heart, Shield, PiggyBank, Building2, ArrowRight } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { content } = useContentStore();
  const navigate = useNavigate();
  
  // Helper function to find product by ID
  const getProductById = (id: string) => {
    return content.products.find(product => product.id === id);
  };
  
  const products = [
    {
      id: 'auto',
      icon: Car,
      title: 'Assurance Auto',
      description: 'Protection complète pour votre véhicule : responsabilité civile, tous risques, vol, incendie.',
      features: ['Assistance 24h/7j', 'Véhicule de remplacement', 'Protection du conducteur'],
      color: 'from-red-500 to-red-600',
      popular: true,
      image: getProductById('auto')?.image || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'habitation',
      icon: Home,
      title: 'Assurance Habitation',
      description: 'Protégez votre logement contre les risques : incendie, dégâts des eaux, vol, catastrophes naturelles.',
      features: ['Responsabilité civile vie privée', 'Assistance habitation', 'Garantie mobilier'],
      color: 'from-green-500 to-green-600',
      image: getProductById('habitation')?.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sante',
      icon: Heart,
      title: 'Assurance Santé',
      description: 'Couverture médicale complète pour vous et votre famille. Remboursements rapides.',
      features: ['Médecine générale', 'Hospitalisation', 'Dentaire et optique'],
      color: 'from-orange-500 to-orange-600',
      image: getProductById('sante')?.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'prevoyance',
      icon: Shield,
      title: 'Prévoyance',
      description: 'Protégez vos proches en cas d\'accident de la vie : décès, invalidité, incapacité.',
      features: ['Capital décès', 'Rente invalidité', 'Indemnités journalières'],
      color: 'from-purple-500 to-purple-600',
      image: getProductById('prevoyance')?.image
    },
    {
      id: 'epargne',
      icon: PiggyBank,
      title: 'Épargne & Retraite',
      description: 'Constituez et valorisez votre patrimoine pour préparer sereinement votre avenir.',
      features: ['Épargne disponible', 'Retraite complémentaire', 'Transmission patrimoine'],
      color: 'from-yellow-500 to-yellow-600',
      image: getProductById('epargne')?.image
    },
    {
      id: 'professionnelle',
      icon: Building2,
      title: 'Assurance Professionnelle',
      description: 'Solutions sur-mesure pour protéger votre activité professionnelle et vos locaux.',
      features: ['Responsabilité civile pro', 'Multirisque professionnelle', 'Protection juridique'],
      color: 'from-indigo-500 to-indigo-600',
      image: getProductById('professionnelle')?.image
    }
  ];

  const handleLearnMore = (productId: string) => {
    navigate(`/produits/${productId}`);
  };

  const handleCompareOffers = () => {
    navigate('/comparateur');
  };

  return (
    <section id="produits" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nos Solutions d'Assurance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de produits AXA adaptés à tous vos besoins. 
            Protection, sérénité et expertise à votre service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white ${
                product.popular ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {product.popular && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium z-10 rounded-bl-lg">
                  Populaire
                </div>
              )}
              
              {product.image && (
                <div className="h-32 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${product.color} flex items-center justify-center mb-4 ${product.image ? 'relative -mt-8 z-10 border-4 border-white shadow-lg' : ''}`}>
                  <product.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">{product.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleLearnMore(product.id)}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white group transition-all"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={handleCompareOffers}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
          >
            Comparer nos Offres
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
