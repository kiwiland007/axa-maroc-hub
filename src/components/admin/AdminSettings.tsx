
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Paramètres</h2>
        <p className="text-axa-gray">Configuration de la console d'administration</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Module en développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-axa-gray">
            Ce module permettra de configurer les utilisateurs, les permissions, 
            les intégrations API et les paramètres généraux de l'application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
