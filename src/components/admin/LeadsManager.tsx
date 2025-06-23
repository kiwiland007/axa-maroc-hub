import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typeAssurance: string;
  statut: 'nouveau' | 'contacte' | 'en_cours' | 'convertit' | 'perdu';
  source: string;
  dateCreation: string;
  dernierContact: string;
  assigneA: string;
  notes: string;
  priorite: 'basse' | 'moyenne' | 'haute';
  valeurEstimee: number;
}

const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      nom: 'Benali',
      prenom: 'Ahmed',
      email: 'ahmed.benali@email.com',
      telephone: '+212 661234567',
      typeAssurance: 'Auto',
      statut: 'nouveau',
      source: 'Site web',
      dateCreation: '2024-01-15',
      dernierContact: '2024-01-15',
      assigneA: 'agent1',
      notes: 'Intéressé par assurance auto complète',
      priorite: 'haute',
      valeurEstimee: 3500
    },
    {
      id: '2',
      nom: 'El Mansouri',
      prenom: 'Fatima',
      email: 'fatima.elmansouri@email.com',
      telephone: '+212 662345678',
      typeAssurance: 'Habitation',
      statut: 'contacte',
      source: 'Référencement',
      dateCreation: '2024-01-14',
      dernierContact: '2024-01-16',
      assigneA: 'agent2',
      notes: 'Villa 200m² à assurer',
      priorite: 'moyenne',
      valeurEstimee: 2200
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const agents = [
    { id: 'agent1', name: 'Agent Commercial 1' },
    { id: 'agent2', name: 'Agent Commercial 2' },
    { id: 'agent3', name: 'Agent Commercial 3' }
  ];

  const statusOptions = [
    { value: 'nouveau', label: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
    { value: 'contacte', label: 'Contacté', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'en_cours', label: 'En cours', color: 'bg-orange-100 text-orange-800' },
    { value: 'convertit', label: 'Converti', color: 'bg-green-100 text-green-800' },
    { value: 'perdu', label: 'Perdu', color: 'bg-red-100 text-red-800' }
  ];

  const priorityOptions = [
    { value: 'basse', label: 'Basse', color: 'bg-gray-100 text-gray-800' },
    { value: 'moyenne', label: 'Moyenne', color: 'bg-blue-100 text-blue-800' },
    { value: 'haute', label: 'Haute', color: 'bg-red-100 text-red-800' }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.telephone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || lead.statut === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    return priorityOptions.find(p => p.value === priority)?.color || 'bg-gray-100 text-gray-800';
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadModal(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead({ ...lead });
    setShowEditModal(true);
  };

  const handleSaveLead = () => {
    if (!editingLead) return;

    setLeads(leads.map(lead => 
      lead.id === editingLead.id ? editingLead : lead
    ));
    setShowEditModal(false);
    setEditingLead(null);
    toast.success('Lead mis à jour avec succès');
  };

  const updateLeadStatus = (leadId: string, newStatus: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, statut: newStatus as Lead['statut'], dernierContact: new Date().toISOString().split('T')[0] }
        : lead
    ));
    toast.success('Statut mis à jour');
  };

  const addNote = (leadId: string, note: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, notes: lead.notes + '\n' + new Date().toLocaleDateString() + ': ' + note }
        : lead
    ));
    toast.success('Note ajoutée');
  };

  const deleteLead = (leadId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce lead ?')) {
      setLeads(leads.filter(l => l.id !== leadId));
      toast.success('Lead supprimé');
    }
  };

  const convertToClient = (leadId: string) => {
    updateLeadStatus(leadId, 'convertit');
    toast.success('Lead converti en client !');
  };

  const totalLeads = leads.length;
  const nouveauxLeads = leads.filter(l => l.statut === 'nouveau').length;
  const leadsEnCours = leads.filter(l => l.statut === 'en_cours').length;
  const tauxConversion = Math.round((leads.filter(l => l.statut === 'convertit').length / totalLeads) * 100);

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{totalLeads}</div>
                <div className="text-sm text-gray-600">Total Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{nouveauxLeads}</div>
                <div className="text-sm text-gray-600">Nouveaux</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{leadsEnCours}</div>
                <div className="text-sm text-gray-600">En cours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{tauxConversion}%</div>
                <div className="text-sm text-gray-600">Taux conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gestion des leads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Gestion des Leads</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtres et recherche */}
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
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Liste des leads */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {lead.prenom} {lead.nom}
                      </h3>
                      <Badge className={getStatusColor(lead.statut)}>
                        {statusOptions.find(s => s.value === lead.statut)?.label}
                      </Badge>
                      <Badge className={getPriorityColor(lead.priorite)}>
                        {priorityOptions.find(p => p.value === lead.priorite)?.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{lead.telephone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Créé le {new Date(lead.dateCreation).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {lead.typeAssurance}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {lead.source}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {lead.valeurEstimee} DHS
                      </span>
                      {lead.assigneA && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {agents.find(a => a.id === lead.assigneA)?.name}
                        </span>
                      )}
                    </div>

                    {lead.notes && (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <strong>Notes:</strong> {lead.notes.split('\n').slice(-1)[0]}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewLead(lead)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditLead(lead)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => convertToClient(lead.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteLead(lead.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun lead trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de visualisation */}
      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Lead</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom complet</Label>
                  <p className="font-semibold">{selectedLead.prenom} {selectedLead.nom}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedLead.email}</p>
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <p>{selectedLead.telephone}</p>
                </div>
                <div>
                  <Label>Type d'assurance</Label>
                  <p>{selectedLead.typeAssurance}</p>
                </div>
                <div>
                  <Label>Statut</Label>
                  <Badge className={getStatusColor(selectedLead.statut)}>
                    {statusOptions.find(s => s.value === selectedLead.statut)?.label}
                  </Badge>
                </div>
                <div>
                  <Label>Priorité</Label>
                  <Badge className={getPriorityColor(selectedLead.priorite)}>
                    {priorityOptions.find(p => p.value === selectedLead.priorite)?.label}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <div className="bg-gray-50 p-3 rounded mt-1">
                  {selectedLead.notes || 'Aucune note'}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal d'édition */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Lead</DialogTitle>
          </DialogHeader>
          {editingLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prénom</Label>
                  <Input
                    value={editingLead.prenom}
                    onChange={(e) => setEditingLead({...editingLead, prenom: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Nom</Label>
                  <Input
                    value={editingLead.nom}
                    onChange={(e) => setEditingLead({...editingLead, nom: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={editingLead.email}
                    onChange={(e) => setEditingLead({...editingLead, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input
                    value={editingLead.telephone}
                    onChange={(e) => setEditingLead({...editingLead, telephone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Statut</Label>
                  <select
                    value={editingLead.statut}
                    onChange={(e) => setEditingLead({...editingLead, statut: e.target.value as Lead['statut']})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Priorité</Label>
                  <select
                    value={editingLead.priorite}
                    onChange={(e) => setEditingLead({...editingLead, priorite: e.target.value as Lead['priorite']})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {priorityOptions.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={editingLead.notes}
                  onChange={(e) => setEditingLead({...editingLead, notes: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveLead} className="bg-blue-600 hover:bg-blue-700">
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Lead
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email de masse
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Campagne d'appels
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Rapport leads
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManager;
