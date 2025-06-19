
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Analytics & Rapports</h2>
        <p className="text-axa-gray">KPIs business et analyse des performances</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Module en développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-axa-gray">
            Ce module proposera des tableaux de bord avancés avec KPIs, 
            analyse des sources de leads, performance commerciale et rapports exportables.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
