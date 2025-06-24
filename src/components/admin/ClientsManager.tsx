import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  produit: string;
  dateCreation: string;
  status: 'actif' | 'inactif' | 'prospect';
  polices: string[];
}

const ClientsManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newClient, setNewClient] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    produit: '', // Nouveau champ pour le produit
    dateCreation: new Date().toISOString().split('T')[0],
    status: 'actif' as const
  });

  const produitsDisponibles = [
    { value: 'auto', label: 'Assurance Auto' },
    { value: 'habitation', label: 'Assurance Habitation' },
    { value: 'sante', label: 'Assurance Santé' },
    { value: 'prevoyance', label: 'Prévoyance' },
    { value: 'epargne', label: 'Épargne & Retraite' },
    { value: 'professionnelle', label: 'Assurance Professionnelle' },
  ];

  const exportToPDF = () => {
    try {
      // Création du contenu PDF simple
      const content = `
        LISTE DES CLIENTS - MOUMEN TECHNIQUE ET PREVOYANCE
        ================================================
        
        Date d'export: ${new Date().toLocaleDateString('fr-FR')}
        
        ${clients.map((client, index) => `
        ${index + 1}. ${client.prenom} ${client.nom}
           Email: ${client.email}
           Téléphone: ${client.telephone}
           Ville: ${client.ville}
           Produit: ${client.produit || 'Non spécifié'}
           Status: ${client.status}
        `).join('\n')}
        
        Total: ${clients.length} clients
      `;

      // Créer un blob et télécharger
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `clients_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Export réussi !');
    } catch (error) {
      console.error('Erreur export PDF:', error);
      toast.error('Erreur lors de l\'export');
    }
  };

  const handleAddClient = () => {
    if (!newClient.nom || !newClient.prenom || !newClient.email || !newClient.produit) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const client = {
      id: `client-${Date.now()}`,
      ...newClient,
      polices: []
    };

    setClients(prev => [client, ...prev]);
    setNewClient({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      ville: '',
      produit: '',
      dateCreation: new Date().toISOString().split('T')[0],
      status: 'actif' as const
    });
    setShowAddForm(false);
    toast.success('Client ajouté avec succès !');
  };

  const handleStatusChange = (id: string, newStatus: 'actif' | 'inactif' | 'prospect') => {
    setClients(prev =>
      prev.map(client =>
        client.id === id ? { ...client, status: newStatus } : client
      )
    );
  };

  const filteredClients = clients.filter(client => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      client.nom.toLowerCase().includes(searchTermLower) ||
      client.prenom.toLowerCase().includes(searchTermLower) ||
      client.email.toLowerCase().includes(searchTermLower) ||
      client.telephone.toLowerCase().includes(searchTermLower) ||
      client.ville.toLowerCase().includes(searchTermLower);

    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;

    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestion des Clients</h2>
          <p className="text-gray-600">Gérez votre portefeuille client</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportToPDF} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="bg-red-500 hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Client
          </Button>
        </div>
      </div>

      {/* Formulaire d'ajout de client */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un Nouveau Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Nom *</Label>
                <Input
                  value={newClient.nom}
                  onChange={(e) => setNewClient(prev => ({ ...prev, nom: e.target.value }))}
                  placeholder="Nom du client"
                />
              </div>
              <div>
                <Label>Prénom *</Label>
                <Input
                  value={newClient.prenom}
                  onChange={(e) => setNewClient(prev => ({ ...prev, prenom: e.target.value }))}
                  placeholder="Prénom du client"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input
                  value={newClient.telephone}
                  onChange={(e) => setNewClient(prev => ({ ...prev, telephone: e.target.value }))}
                  placeholder="+212 6XX XXX XXX"
                />
              </div>
              <div>
                <Label>Ville</Label>
                <Input
                  value={newClient.ville}
                  onChange={(e) => setNewClient(prev => ({ ...prev, ville: e.target.value }))}
                  placeholder="Ville de résidence"
                />
              </div>
              <div>
                <Label>Produit d'assurance *</Label>
                <select
                  value={newClient.produit}
                  onChange={(e) => setNewClient(prev => ({ ...prev, produit: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Sélectionner un produit</option>
                  {produitsDisponibles.map(produit => (
                    <option key={produit.value} value={produit.value}>
                      {produit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <Label>Adresse</Label>
              <Textarea
                value={newClient.adresse}
                onChange={(e) => setNewClient(prev => ({ ...prev, adresse: e.target.value }))}
                placeholder="Adresse complète"
                rows={2}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddClient} className="bg-red-500 hover:bg-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le Client
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Barre de recherche et filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="search"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">Tous les status</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="prospect">Prospect</option>
        </select>
        <div></div> {/* Espace réservé pour alignement */}
      </div>

      {/* Liste des clients */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ville
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.nom} {client.prenom}</div>
                  <div className="text-sm text-gray-500">Créé le {new Date(client.dateCreation).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.telephone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.ville}</div>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {produitsDisponibles.find(p => p.value === client.produit)?.label || 'Non défini'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={client.status}
                    onChange={(e) => handleStatusChange(client.id, e.target.value as 'actif' | 'inactif' | 'prospect')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsManager;
