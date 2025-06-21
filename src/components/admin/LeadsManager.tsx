
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  UserPlus,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  source: string;
  status: 'nouveau' | 'contact' | 'qualifie' | 'converti' | 'perdu';
  assignedTo?: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  products: string[];
  assignedTo?: string;
  totalPremium: number;
  joinDate: string;
  status: 'actif' | 'suspendu' | 'resilie';
}

const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Mohamed Alami',
      email: 'mohamed.alami@email.com',
      phone: '+212661234567',
      product: 'Assurance Auto',
      source: 'Site web',
      status: 'nouveau',
      assignedTo: 'user1',
      createdAt: '2024-06-20',
      notes: 'Intéressé par une couverture tous risques'
    },
    {
      id: '2',
      name: 'Fatima Benali',
      email: 'fatima.benali@email.com',
      phone: '+212662345678',
      product: 'Assurance Habitation',
      source: 'Recommandation',
      status: 'contact',
      assignedTo: 'user2',
      createdAt: '2024-06-18',
      lastContact: '2024-06-21'
    }
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ahmed Hassani',
      email: 'ahmed.hassani@email.com',
      phone: '+212663456789',
      products: ['Assurance Auto', 'Assurance Habitation'],
      assignedTo: 'user1',
      totalPremium: 4500,
      joinDate: '2023-03-15',
      status: 'actif'
    },
    {
      id: '2',
      name: 'Aicha Rahmani',
      email: 'aicha.rahmani@email.com',
      phone: '+212664567890',
      products: ['Assurance Santé'],
      assignedTo: 'user2',
      totalPremium: 2800,
      joinDate: '2023-08-22',
      status: 'actif'
    }
  ]);

  const [users] = useState([
    { id: 'user1', name: 'Sarah Ouali', role: 'Conseiller Commercial' },
    { id: 'user2', name: 'Youssef Berrada', role: 'Gestionnaire Client' },
    { id: 'user3', name: 'Latifa Amrani', role: 'Responsable Ventes' }
  ]);

  const [filterStatus, setFilterStatus] = useState('tous');
  const [filterAssigned, setFilterAssigned] = useState('tous');

  const assignLead = (leadId: string, userId: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, assignedTo: userId } : lead
    ));
    const user = users.find(u => u.id === userId);
    toast.success(`Lead assigné à ${user?.name}`);
  };

  const assignClient = (clientId: string, userId: string) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, assignedTo: userId } : client
    ));
    const user = users.find(u => u.id === userId);
    toast.success(`Client assigné à ${user?.name}`);
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus, lastContact: new Date().toISOString().split('T')[0] } : lead
    ));
    toast.success('Statut du lead mis à jour');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'contact': return 'bg-yellow-100 text-yellow-800';
      case 'qualifie': return 'bg-purple-100 text-purple-800';
      case 'converti': return 'bg-green-100 text-green-800';
      case 'perdu': return 'bg-red-100 text-red-800';
      case 'actif': return 'bg-green-100 text-green-800';
      case 'suspendu': return 'bg-orange-100 text-orange-800';
      case 'resilie': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserName = (userId?: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Non assigné';
  };

  const filteredLeads = leads.filter(lead => {
    if (filterStatus !== 'tous' && lead.status !== filterStatus) return false;
    if (filterAssigned !== 'tous' && lead.assignedTo !== filterAssigned) return false;
    return true;
  });

  const filteredClients = clients.filter(client => {
    if (filterAssigned !== 'tous' && client.assignedTo !== filterAssigned) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestion des Leads & Clients</h2>
        <p className="text-gray-600">Suivez et gérez vos prospects et clients avec attribution par utilisateur</p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{leads.length}</div>
                <div className="text-sm text-gray-600">Leads actifs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{clients.length}</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((leads.filter(l => l.status === 'converti').length / leads.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Taux conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, c) => sum + c.totalPremium, 0).toLocaleString()} DH
                </div>
                <div className="text-sm text-gray-600">CA total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leads">Gestion des Leads</TabsTrigger>
          <TabsTrigger value="clients">Gestion des Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filtres</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Statut</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous les statuts</SelectItem>
                      <SelectItem value="nouveau">Nouveau</SelectItem>
                      <SelectItem value="contact">Contacté</SelectItem>
                      <SelectItem value="qualifie">Qualifié</SelectItem>
                      <SelectItem value="converti">Converti</SelectItem>
                      <SelectItem value="perdu">Perdu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assigné à</label>
                  <Select value={filterAssigned} onValueChange={setFilterAssigned}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous les utilisateurs</SelectItem>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilterStatus('tous');
                      setFilterAssigned('tous');
                    }}
                    className="w-full"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leads List */}
          <Card>
            <CardHeader>
              <CardTitle>Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{lead.name}</h4>
                        <p className="text-sm text-gray-600">{lead.product} • {lead.source}</p>
                      </div>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Créé le {new Date(lead.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Assigné à: {getUserName(lead.assignedTo)}</span>
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">{lead.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Select 
                          value={lead.status} 
                          onValueChange={(value: Lead['status']) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nouveau">Nouveau</SelectItem>
                            <SelectItem value="contact">Contacté</SelectItem>
                            <SelectItem value="qualifie">Qualifié</SelectItem>
                            <SelectItem value="converti">Converti</SelectItem>
                            <SelectItem value="perdu">Perdu</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select 
                          value={lead.assignedTo || ''} 
                          onValueChange={(value) => assignLead(lead.id, value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Assigner à..." />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map(user => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name} - {user.role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contacter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Appeler
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          {/* Client Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filtre Clients</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Gestionnaire</label>
                  <Select value={filterAssigned} onValueChange={setFilterAssigned}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous les gestionnaires</SelectItem>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterAssigned('tous')}
                    className="w-full"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clients List */}
          <Card>
            <CardHeader>
              <CardTitle>Clients ({filteredClients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div key={client.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{client.name}</h4>
                        <p className="text-sm text-gray-600">
                          {client.products.join(', ')} • {client.totalPremium.toLocaleString()} DH/an
                        </p>
                      </div>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Client depuis {new Date(client.joinDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Gestionnaire: {getUserName(client.assignedTo)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Select 
                        value={client.assignedTo || ''} 
                        onValueChange={(value) => assignClient(client.id, value)}
                      >
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="Assigner un gestionnaire..." />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} - {user.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contacter
                        </Button>
                        <Button variant="outline" size="sm">
                          Voir Détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadsManager;
