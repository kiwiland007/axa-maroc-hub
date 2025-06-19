
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  Clock
} from 'lucide-react';

const LeadsManager = () => {
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  
  const leads = [
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      phone: '+212 6XX-XXX-XXX',
      type: 'Assurance Auto',
      source: 'Facebook',
      status: 'Nouveau',
      score: 85,
      created: '2024-01-15',
      lastContact: null,
      notes: 'Intéressé par une assurance tous risques pour BMW Série 3'
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      email: 'fatima.zahra@email.com',
      phone: '+212 6XX-XXX-XXX',
      type: 'Assurance Habitation',
      source: 'Site Web',
      status: 'Contacté',
      score: 92,
      created: '2024-01-14',
      lastContact: '2024-01-15',
      notes: 'Propriétaire d\'un appartement de 120m² à Casablanca'
    },
    {
      id: 3,
      name: 'Mohamed Alami',
      email: 'mohamed.alami@email.com',
      phone: '+212 6XX-XXX-XXX',
      type: 'Assurance Santé',
      source: 'Instagram',
      status: 'Devis envoyé',
      score: 78,
      created: '2024-01-13',
      lastContact: '2024-01-14',
      notes: 'Famille de 4 personnes, cherche couverture complète'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800';
      case 'Contacté': return 'bg-yellow-100 text-yellow-800';
      case 'Devis envoyé': return 'bg-purple-100 text-purple-800';
      case 'Converti': return 'bg-green-100 text-green-800';
      case 'Perdu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Leads & CRM</h2>
          <p className="text-axa-gray">Gérez vos prospects et votre pipeline de vente</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button className="bg-axa-red hover:bg-axa-red/90">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Lead
          </Button>
        </div>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList>
          <TabsTrigger value="leads">Tous les Leads</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="facebook">Import Facebook</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          {/* Filtres */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-axa-gray" />
                  <input
                    type="text"
                    placeholder="Rechercher un lead..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red">
                  <option value="">Tous les statuts</option>
                  <option value="nouveau">Nouveau</option>
                  <option value="contacte">Contacté</option>
                  <option value="devis">Devis envoyé</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-axa-red">
                  <option value="">Toutes les sources</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="site">Site Web</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres avancés
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des leads */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leads Récents ({leads.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div 
                        key={lead.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedLead === lead.id ? 'border-axa-red bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedLead(lead.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-axa-gray-dark">{lead.name}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                              <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                                {lead.score}%
                              </span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-axa-gray mb-2">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-axa-gray">{lead.type} • {lead.source}</span>
                          <span className="text-axa-gray">Créé le {lead.created}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails du lead sélectionné */}
            <div>
              {selectedLead ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Détails du Lead</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const lead = leads.find(l => l.id === selectedLead);
                      if (!lead) return null;
                      
                      return (
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg">{lead.name}</h3>
                            <p className="text-axa-gray">{lead.type}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-axa-gray" />
                              <span className="text-sm">{lead.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-axa-gray" />
                              <span className="text-sm">{lead.phone}</span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Notes</label>
                            <p className="text-sm text-axa-gray bg-gray-50 p-3 rounded">
                              {lead.notes}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Button className="w-full bg-axa-red hover:bg-axa-red/90">
                              <Phone className="h-4 w-4 mr-2" />
                              Appeler
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Mail className="h-4 w-4 mr-2" />
                              Envoyer Email
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-axa-gray mx-auto mb-4" />
                    <p className="text-axa-gray">Sélectionnez un lead pour voir les détails</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline de Vente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-axa-gray">Vue Kanban du pipeline de vente en développement...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facebook">
          <Card>
            <CardHeader>
              <CardTitle>Intégration Facebook/Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-axa-gray mb-4">
                Connectez votre compte Meta Business pour importer automatiquement vos leads.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Connecter Meta Business
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics des Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-axa-gray">Statistiques et analyses des performances des leads...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadsManager;
