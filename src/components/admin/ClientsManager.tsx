
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClientsManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Clients</h2>
        <p className="text-axa-gray">Base de données clients et historique des polices</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Module en développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-axa-gray">
            Ce module permettra de gérer votre base de données clients, 
            l'historique des polices, les renouvellements et la segmentation clientèle.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsManager;
