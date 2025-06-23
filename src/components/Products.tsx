
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Car, Home, Heart, Shield, PiggyBank, Briefcase } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import QuoteModal from './QuoteModal';

const Products = () => {
  const { content } = useContentStore();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const iconMap = {
    Car: Car,
    Home: Home,
    Heart: Heart,
    Shield: Shield,
    PiggyBank: PiggyBank,
    Briefcase: Briefcase,
  };

  const handleQuoteRequest = (productId: string) => {
    setSelectedProduct(productId);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <section id="produits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Solutions d'Assurance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des produits adaptés à vos besoins avec plus de 20 ans d'expertise au Maroc
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.products.map((product) => {
              const IconComponent = iconMap[product.icon as keyof typeof iconMap] || Shield;
              
              return (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 bg-red-100 rounded-full">
                        <IconComponent className="h-6 w-6 text-red-600" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {product.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                        onClick={() => handleQuoteRequest(product.id)}
                      >
                        Demander un Devis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        onClick={() => window.open(`/produits/${product.id}`, '_blank')}
                      >
                        En savoir plus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productType={selectedProduct}
      />
    </>
  );
};

export default Products;
