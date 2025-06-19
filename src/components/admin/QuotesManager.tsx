
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuotesManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Devis & Contrats</h2>
        <p className="text-axa-gray">Génération de devis et gestion des contrats</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Module en développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-axa-gray">
            Ce module inclura le générateur de devis automatisé, 
            les templates de contrats, le workflow de validation et la signature électronique.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotesManager;
