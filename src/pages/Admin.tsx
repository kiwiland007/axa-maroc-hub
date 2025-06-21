
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, BarChart3, Settings, Edit, Image, MessageSquare, Calendar, MapPin, UserCog } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ContentManager from '@/components/admin/ContentManager';
import LeadsManager from '@/components/admin/LeadsManager';
import ClientsManager from '@/components/admin/ClientsManager';
import QuotesManager from '@/components/admin/QuotesManager';
import Analytics from '@/components/admin/Analytics';
import MarketingManager from '@/components/admin/MarketingManager';
import LocationManager from '@/components/admin/LocationManager';
import UsersManager from '@/components/admin/UsersManager';
import AdminSettings from '@/components/admin/AdminSettings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3, component: AdminDashboard },
    { id: 'content', label: 'Gestion Contenu', icon: Edit, component: ContentManager },
    { id: 'leads', label: 'Leads & CRM', icon: MessageSquare, component: LeadsManager },
    { id: 'clients', label: 'Clients', icon: Users, component: ClientsManager },
    { id: 'quotes', label: 'Devis & Contrats', icon: FileText, component: QuotesManager },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: Analytics },
    { id: 'marketing', label: 'Marketing', icon: Image, component: MarketingManager },
    { id: 'location', label: 'Localisation', icon: MapPin, component: LocationManager },
    { id: 'users', label: 'Utilisateurs', icon: UserCog, component: UsersManager },
    { id: 'settings', label: 'Paramètres', icon: Settings, component: AdminSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="MOUMEN TECHNIQUE" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-axa-gray-dark">Console d'Administration</h1>
                <p className="text-sm text-axa-gray">MOUMEN TECHNIQUE ET PREVOYANCE</p>
              </div>
            </div>
            <div className="text-sm text-axa-gray">
              Connecté en tant qu'Administrateur
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-10 gap-1 h-auto p-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex flex-col items-center p-3 space-y-1 text-xs"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:block">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <tab.component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
