
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter, Phone, Mail, Calendar, FileText, UserPlus, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ClientsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Ahmed Benali', 
      email: 'ahmed.benali@email.com', 
      phone: '+212 661-234-567',
      policies: ['Auto', 'Habitation'], 
      status: 'Actif', 
      totalPremium: 15420,
      joinDate: '2023-03-15',
      lastContact: '2024-01-15',
      renewalDate: '2024-03-15',
      notes: 'Client fidèle depuis 1 an'
    },
    { 
      id: 2, 
      name: 'Fatima Zahra', 
      email: 'fatima.zahra@email.com', 
      phone: '+212 662-345-678',
      policies: ['Santé', 'Prévoyance'], 
      status: 'Actif', 
      totalPremium: 8950,
      joinDate: '2022-08-20',
      lastContact: '2024-01-10',
      renewalDate: '2024-08-20',
      notes: 'Famille de 4 personnes'
    },
    { 
      id: 3, 
      name: 'Mohamed Alami', 
      email: 'mohamed.alami@email.com', 
      phone: '+212 663-456-789',
      policies: ['Auto', 'Professionnelle'], 
      status: 'À renouveler', 
      totalPremium: 22350,
      joinDate: '2021-12-05',
      lastContact: '2023-12-20',
      renewalDate: '2024-02-05',
      notes: 'Entrepreneur, flotte de véhicules'
    },
    { 
      id: 4, 
      name: 'Aicha Bennani', 
      email: 'aicha.bennani@email.com', 
      phone: '+212 664-567-890',
      policies: ['Habitation', 'Épargne'], 
      status: 'Actif', 
      totalPremium: 12800,
      joinDate: '2023-06-10',
      lastContact: '2024-01-18',
      renewalDate: '2024-06-10',
      notes: 'Villa à Rabat'
    },
    { 
      id: 5, 
      name: 'Youssef Alaoui', 
      email: 'youssef.alaoui@email.com', 
      phone: '+212 665-678-901',
      policies: ['Auto'], 
      status: 'Suspendu', 
      totalPremium: 5600,
      joinDate: '2023-09-12',
      lastContact: '2023-11-15',
      renewalDate: '2024-09-12',
      notes: 'Retard de paiement'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'À renouveler': return 'bg-orange-100 text-orange-800';
      case 'Suspendu': return 'bg-red-100 text-red-800';
      case 'Prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (clientId: number, newStatus: string) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId 
          ? { ...client, status: newStatus, lastContact: new Date().toISOString().split('T')[0] }
          : client
      )
    );
    toast.success('Statut client mis à jour');
  };

  const handleContact = (client: any, method: 'call' | 'email') => {
    if (method === 'call') {
      toast.success(`Appel vers ${client.name} - ${client.phone}`);
    } else {
      toast.success(`Email envoyé à ${client.name}`);
    }
    
    setClients(prev => 
      prev.map(c => 
        c.id === client.id 
          ? { ...c, lastContact: new Date().toISOString().split('T')[0] }
          : c
      )
    );
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesType = typeFilter === 'all' || client.policies.some(policy => policy === typeFilter);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const exportClients = () => {
    toast.success('Export de la base clients en cours...');
  };

  const addNewClient = () => {
    toast.success('Formulaire d\'ajout de client ouvert');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Clients</h2>
          <p className="text-axa-gray">Base de données clients et historique des polices</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportClients} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={addNewClient} className="bg-axa-red hover:bg-axa-red/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau Client
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-axa-gray-dark">{clients.length}</div>
            <div className="text-sm text-axa-gray">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{clients.filter(c => c.status === 'Actif').length}</div>
            <div className="text-sm text-axa-gray">Clients Actifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{clients.filter(c => c.status === 'À renouveler').length}</div>
            <div className="text-sm text-axa-gray">À Renouveler</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-axa-red">{clients.reduce((sum, c) => sum + c.totalPremium, 0).toLocaleString()} DH</div>
            <div className="text-sm text-axa-gray">Primes Totales</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="À renouveler">À renouveler</SelectItem>
                <SelectItem value="Suspendu">Suspendu</SelectItem>
                <SelectItem value="Prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par police" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les polices</SelectItem>
                <SelectItem value="Auto">Auto</SelectItem>
                <SelectItem value="Habitation">Habitation</SelectItem>
                <SelectItem value="Santé">Santé</SelectItem>
                <SelectItem value="Prévoyance">Prévoyance</SelectItem>
                <SelectItem value="Épargne">Épargne</SelectItem>
                <SelectItem value="Professionnelle">Professionnelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des clients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Clients ({filteredClients.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-axa-gray-dark">{client.name}</h3>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                      {client.policies.map((policy, index) => (
                        <Badge key={index} variant="outline">{policy}</Badge>
                      ))}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-2 text-sm text-axa-gray mb-3">
                      <div>📧 {client.email}</div>
                      <div>📞 {client.phone}</div>
                      <div>💰 {client.totalPremium.toLocaleString()} DH/an</div>
                      <div>📅 Client depuis: {client.joinDate}</div>
                      <div>🔄 Dernier contact: {client.lastContact}</div>
                      <div>📋 Renouvellement: {client.renewalDate}</div>
                      <div className="md:col-span-3">💬 {client.notes}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContact(client, 'call')}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContact(client, 'email')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Select 
                      value={client.status} 
                      onValueChange={(value) => handleStatusChange(client.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Actif">Actif</SelectItem>
                        <SelectItem value="À renouveler">À renouveler</SelectItem>
                        <SelectItem value="Suspendu">Suspendu</SelectItem>
                        <SelectItem value="Prospect">Prospect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsManager;
