
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Search, Phone, Mail, FileText, UserPlus, Download, Eye, Edit } from 'lucide-react';
import { toast } from 'sonner';

const ClientsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    policies: [] as string[],
    notes: ''
  });

  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Ahmed Benali', 
      email: 'ahmed.benali@email.com', 
      phone: '+212 661-234-567',
      address: 'Casablanca, Maroc',
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
      address: 'Rabat, Maroc',
      policies: ['Santé', 'Prévoyance'], 
      status: 'Actif', 
      totalPremium: 8950,
      joinDate: '2022-08-20',
      lastContact: '2024-01-10',
      renewalDate: '2024-08-20',
      notes: 'Famille de 4 personnes'
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

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      status: 'Prospect',
      totalPremium: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setClients(prev => [...prev, client]);
    setNewClient({ name: '', email: '', phone: '', address: '', policies: [], notes: '' });
    setIsAddDialogOpen(false);
    toast.success('Client ajouté avec succès!');
  };

  const handleEditClient = () => {
    if (!selectedClient) return;
    
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id 
        ? { ...selectedClient, lastContact: new Date().toISOString().split('T')[0] }
        : c
    ));
    setIsEditDialogOpen(false);
    toast.success('Client modifié avec succès!');
  };

  const handleView = (client: any) => {
    setSelectedClient(client);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (client: any) => {
    setSelectedClient({ ...client });
    setIsEditDialogOpen(true);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Clients</h2>
          <p className="text-axa-gray">Base de données clients et historique des polices</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => toast.success('Export en cours...')} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-axa-red hover:bg-axa-red/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Nouveau Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un Nouveau Client</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom Complet *</Label>
                  <Input 
                    value={newClient.name}
                    onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nom et prénom"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input 
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label>Téléphone *</Label>
                  <Input 
                    value={newClient.phone}
                    onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+212 6XX-XXX-XXX"
                  />
                </div>
                <div>
                  <Label>Adresse</Label>
                  <Input 
                    value={newClient.address}
                    onChange={(e) => setNewClient(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Ville, Maroc"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Polices d'Intérêt</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Auto', 'Habitation', 'Santé', 'Prévoyance', 'Épargne', 'Professionnelle'].map(policy => (
                      <Button
                        key={policy}
                        type="button"
                        variant={newClient.policies.includes(policy) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setNewClient(prev => ({
                            ...prev,
                            policies: prev.policies.includes(policy)
                              ? prev.policies.filter(p => p !== policy)
                              : [...prev.policies, policy]
                          }));
                        }}
                      >
                        {policy}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <Label>Notes</Label>
                  <Textarea 
                    value={newClient.notes}
                    onChange={(e) => setNewClient(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Informations complémentaires..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddClient} className="bg-axa-red hover:bg-axa-red/90">
                  Ajouter le Client
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                      <Button size="sm" variant="outline" onClick={() => handleView(client)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(client)}>
                        <Edit className="h-4 w-4" />
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

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Client</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nom Complet</Label>
                <Input 
                  value={selectedClient.name}
                  onChange={(e) => setSelectedClient(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  value={selectedClient.email}
                  onChange={(e) => setSelectedClient(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input 
                  value={selectedClient.phone}
                  onChange={(e) => setSelectedClient(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label>Adresse</Label>
                <Input 
                  value={selectedClient.address || ''}
                  onChange={(e) => setSelectedClient(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <Label>Notes</Label>
                <Textarea 
                  value={selectedClient.notes}
                  onChange={(e) => setSelectedClient(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditClient} className="bg-axa-red hover:bg-axa-red/90">
              Sauvegarder
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de visualisation */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails du Client</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4">Informations Personnelles</h3>
                  <div className="space-y-2">
                    <p><strong>Nom:</strong> {selectedClient.name}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                    <p><strong>Téléphone:</strong> {selectedClient.phone}</p>
                    <p><strong>Adresse:</strong> {selectedClient.address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Informations Contrat</h3>
                  <div className="space-y-2">
                    <p><strong>Statut:</strong> <Badge className={getStatusColor(selectedClient.status)}>{selectedClient.status}</Badge></p>
                    <p><strong>Client depuis:</strong> {selectedClient.joinDate}</p>
                    <p><strong>Dernier contact:</strong> {selectedClient.lastContact}</p>
                    <p><strong>Renouvellement:</strong> {selectedClient.renewalDate}</p>
                    <p><strong>Prime totale:</strong> {selectedClient.totalPremium.toLocaleString()} DH/an</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Polices d'Assurance</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.policies.map((policy: string, index: number) => (
                    <Badge key={index} variant="outline">{policy}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Notes</h3>
                <p className="bg-gray-50 p-4 rounded-lg">{selectedClient.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsManager;
