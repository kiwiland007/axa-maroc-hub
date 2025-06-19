
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarketingManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Marketing Digital</h2>
        <p className="text-axa-gray">Gestion des campagnes et marketing automation</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Module en développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-axa-gray">
            Ce module intégrera Meta Business, la gestion des campagnes publicitaires, 
            les landing pages personnalisables et l'email marketing automatisé.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingManager;
