
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Home, Heart, Shield, PiggyBank, Building2, ArrowRight, Users, Clock, Award } from 'lucide-react';
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
      description: 'Protection complète pour votre véhicule : responsabilité civile, tous risques, vol, incendie et assistance 24h/24.',
      features: ['Assistance 24h/7j', 'Véhicule de remplacement', 'Protection du conducteur'],
      color: 'from-red-500 to-red-600',
      popular: true,
      image: getProductById('auto')?.image || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'habitation',
      icon: Home,
      title: 'Assurance Habitation',
      description: 'Protégez votre logement contre tous les risques : incendie, dégâts des eaux, vol, catastrophes naturelles.',
      features: ['Responsabilité civile vie privée', 'Assistance habitation', 'Garantie mobilier'],
      color: 'from-green-500 to-green-600',
      image: getProductById('habitation')?.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sante',
      icon: Heart,
      title: 'Assurance Santé',
      description: 'Couverture médicale complète pour vous et votre famille avec remboursements rapides et réseau de soins étendu.',
      features: ['Médecine générale', 'Hospitalisation', 'Dentaire et optique'],
      color: 'from-blue-500 to-blue-600',
      image: getProductById('sante')?.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'prevoyance',
      icon: Shield,
      title: 'Prévoyance',
      description: 'Protégez vos proches en cas d\'accidents de la vie : décès, invalidité, incapacité de travail.',
      features: ['Capital décès', 'Rente invalidité', 'Indemnités journalières'],
      color: 'from-purple-500 to-purple-600',
      image: getProductById('prevoyance')?.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'epargne',
      icon: PiggyBank,
      title: 'Épargne & Retraite',
      description: 'Constituez et valorisez votre patrimoine pour préparer sereinement votre avenir et votre retraite.',
      features: ['Épargne disponible', 'Retraite complémentaire', 'Transmission patrimoine'],
      color: 'from-yellow-500 to-yellow-600',
      image: getProductById('epargne')?.image || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'professionnelle',
      icon: Building2,
      title: 'Assurance Professionnelle',
      description: 'Solutions sur-mesure pour protéger votre activité professionnelle et vos locaux contre tous les risques.',
      features: ['Responsabilité civile pro', 'Multirisque professionnelle', 'Protection juridique'],
      color: 'from-indigo-500 to-indigo-600',
      image: getProductById('professionnelle')?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const handleLearnMore = (productId: string) => {
    navigate(`/produits/${productId}`);
  };

  const handleCompareOffers = () => {
    navigate('/comparateur');
  };

  return (
    <section id="produits" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nos Solutions d'Assurance
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de produits adaptés à tous vos besoins. 
            Protection, sérénité et expertise à votre service depuis plus de 20 ans.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Award className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <div className="text-4xl font-bold text-gray-800 mb-3">20+</div>
            <div className="text-gray-600 text-lg">Années d'expérience</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Users className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <div className="text-4xl font-bold text-gray-800 mb-3">5000+</div>
            <div className="text-gray-600 text-lg">Clients satisfaits</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Clock className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <div className="text-4xl font-bold text-gray-800 mb-3">24h/7j</div>
            <div className="text-gray-600 text-lg">Service client</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border-0 ${
                product.popular ? 'ring-2 ring-red-500 ring-offset-4' : ''
              }`}
            >
              {product.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-bold z-10 rounded-bl-2xl shadow-lg">
                  ⭐ Populaire
                </div>
              )}
              
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-2xl bg-gradient-to-r ${product.color} flex items-center justify-center shadow-2xl border-4 border-white`}>
                  <product.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <CardHeader className="pb-4 pt-6">
                <CardTitle className="text-2xl text-gray-800 font-bold group-hover:text-red-600 transition-colors">
                  {product.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {product.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleLearnMore(product.id)}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-red-600 hover:to-orange-600 text-white group transition-all duration-300 py-3 text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleCompareOffers}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Comparer nos Offres
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
