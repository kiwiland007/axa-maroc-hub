
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar,
  Car,
  Home,
  Heart,
  Shield,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface Client {
  id: string;
  civilite: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  ville: string;
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'prospect';
  assurances: Array<{
    type: string;
    numeroPolice: string;
    dateDebut: string;
    dateFin: string;
    prime: number;
  }>;
  assignedTo?: string;
}

const ClientsManager = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      civilite: 'M.',
      prenom: 'Ahmed',
      nom: 'Benali',
      email: 'ahmed.benali@email.com',
      telephone: '+212 661234567',
      dateNaissance: '1985-03-15',
      adresse: '123 Rue Mohammed V, Casablanca',
      ville: 'Casablanca',
      dateInscription: '2023-01-15',
      statut: 'actif',
      assignedTo: 'agent1',
      assurances: [
        {
          type: 'Auto',
          numeroPolice: 'AUTO-2023-001',
          dateDebut: '2023-01-15',
          dateFin: '2024-01-15',
          prime: 3500
        },
        {
          type: 'Habitation',
          numeroPolice: 'HAB-2023-001',
          dateDebut: '2023-02-01',
          dateFin: '2024-02-01',
          prime: 2200
        }
      ]
    },
    {
      id: '2',
      civilite: 'Mme',
      prenom: 'Fatima',
      nom: 'El Mansouri',
      email: 'fatima.elmansouri@email.com',
      telephone: '+212 662345678',
      dateNaissance: '1990-07-22',
      adresse: '456 Avenue Hassan II, Rabat',
      ville: 'Rabat',
      dateInscription: '2023-03-10',
      statut: 'actif',
      assignedTo: 'agent2',
      assurances: [
        {
          type: 'Santé',
          numeroPolice: 'SANTE-2023-002',
          dateDebut: '2023-03-10',
          dateFin: '2024-03-10',
          prime: 4800
        }
      ]
    },
    {
      id: '3',
      civilite: 'M.',
      prenom: 'Youssef',
      nom: 'Tazi',
      email: 'youssef.tazi@email.com',
      telephone: '+212 663456789',
      dateNaissance: '1978-11-05',
      adresse: '789 Boulevard Zerktouni, Marrakech',
      ville: 'Marrakech',
      dateInscription: '2023-05-20',
      statut: 'prospect',
      assignedTo: 'agent1',
      assurances: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClient, setNewClient] = useState({
    civilite: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    adresse: '',
    ville: '',
    assignedTo: ''
  });

  const agents = [
    { id: 'agent1', name: 'Agent Commercial 1' },
    { id: 'agent2', name: 'Agent Commercial 2' },
    { id: 'agent3', name: 'Agent Commercial 3' }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || client.statut === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getAssuranceIcon = (type: string) => {
    switch (type) {
      case 'Auto': return <Car className="h-4 w-4" />;
      case 'Habitation': return <Home className="h-4 w-4" />;
      case 'Santé': return <Heart className="h-4 w-4" />;
      case 'Prévoyance': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-gray-100 text-gray-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddClient = () => {
    if (!newClient.nom || !newClient.prenom || !newClient.email || !newClient.telephone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      dateInscription: new Date().toISOString().split('T')[0],
      statut: 'prospect',
      assurances: []
    };

    setClients([...clients, client]);
    setNewClient({
      civilite: '',
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      dateNaissance: '',
      adresse: '',
      ville: '',
      assignedTo: ''
    });
    setShowAddForm(false);
    toast.success('Client ajouté avec succès');
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(clients.filter(c => c.id !== clientId));
      toast.success('Client supprimé avec succès');
    }
  };

  const exportClients = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Nom,Prénom,Email,Téléphone,Ville,Statut,Date d'inscription\n" +
      filteredClients.map(client => 
        `${client.nom},${client.prenom},${client.email},${client.telephone},${client.ville},${client.statut},${client.dateInscription}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPrimes = clients.reduce((total, client) => {
    return total + client.assurances.reduce((clientTotal, assurance) => clientTotal + assurance.prime, 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{clients.length}</div>
                <div className="text-sm text-gray-600">Total Clients</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{clients.filter(c => c.statut === 'actif').length}</div>
                <div className="text-sm text-gray-600">Clients Actifs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{clients.filter(c => c.statut === 'prospect').length}</div>
                <div className="text-sm text-gray-600">Prospects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{totalPrimes.toLocaleString()} DHS</div>
                <div className="text-sm text-gray-600">Primes Totales</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre d'actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Gestion des Clients</span>
            </CardTitle>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Nouveau Client
              </Button>
              <Button variant="outline" onClick={exportClients}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="actif">Actifs</option>
                <option value="prospect">Prospects</option>
                <option value="inactif">Inactifs</option>
              </select>
            </div>
          </div>

          {/* Liste des clients */}
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {client.civilite} {client.prenom} {client.nom}
                      </h3>
                      <Badge className={getStatusColor(client.statut)}>
                        {client.statut}
                      </Badge>
                      {client.assignedTo && (
                        <Badge variant="outline">
                          {agents.find(a => a.id === client.assignedTo)?.name || 'Non assigné'}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{client.telephone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Inscrit le {new Date(client.dateInscription).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div>
                        <span>{client.ville}</span>
                      </div>
                    </div>
                    {client.assurances.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-2">Assurances:</div>
                        <div className="flex flex-wrap gap-2">
                          {client.assurances.map((assurance, index) => (
                            <div key={index} className="flex items-center space-x-1 bg-gray-100 rounded-md px-2 py-1 text-xs">
                              {getAssuranceIcon(assurance.type)}
                              <span>{assurance.type}</span>
                              <span className="text-gray-500">({assurance.prime} DHS)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun client trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulaire d'ajout de client */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouveau Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="civilite">Civilité *</Label>
                <select
                  id="civilite"
                  value={newClient.civilite}
                  onChange={(e) => setNewClient({...newClient, civilite: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                >
                  <option value="">Sélectionner</option>
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>
              <div>
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  value={newClient.prenom}
                  onChange={(e) => setNewClient({...newClient, prenom: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  value={newClient.nom}
                  onChange={(e) => setNewClient({...newClient, nom: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  value={newClient.telephone}
                  onChange={(e) => setNewClient({...newClient, telephone: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  value={newClient.dateNaissance}
                  onChange={(e) => setNewClient({...newClient, dateNaissance: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  value={newClient.adresse}
                  onChange={(e) => setNewClient({...newClient, adresse: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ville">Ville</Label>
                <Input
                  id="ville"
                  value={newClient.ville}
                  onChange={(e) => setNewClient({...newClient, ville: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="assignedTo">Assigné à</Label>
                <select
                  id="assignedTo"
                  value={newClient.assignedTo}
                  onChange={(e) => setNewClient({...newClient, assignedTo: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                >
                  <option value="">Non assigné</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <Button onClick={handleAddClient} className="bg-blue-600 hover:bg-blue-700">
                Ajouter le Client
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientsManager;
