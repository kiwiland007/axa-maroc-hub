
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  UserPlus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typeAssurance: string;
  message: string;
  statut: 'nouveau' | 'contacte' | 'qualifie' | 'converti' | 'perdu';
  dateCreation: string;
  assignedTo?: string;
  source: string;
  priority: 'faible' | 'moyenne' | 'haute';
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
      message: 'Je souhaite une assurance pour ma nouvelle voiture',
      statut: 'nouveau',
      dateCreation: '2023-12-15',
      source: 'Site web',
      priority: 'haute',
      assignedTo: 'agent1'
    },
    {
      id: '2',
      nom: 'El Mansouri',
      prenom: 'Fatima',
      email: 'fatima.elmansouri@email.com',
      telephone: '+212 662345678',
      typeAssurance: 'Habitation',
      message: 'Demande de devis pour assurance habitation',
      statut: 'contacte',
      dateCreation: '2023-12-14',
      source: 'Recommandation',
      priority: 'moyenne',
      assignedTo: 'agent2'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const agents = [
    { id: 'agent1', name: 'Agent Commercial 1' },
    { id: 'agent2', name: 'Agent Commercial 2' },
    { id: 'agent3', name: 'Agent Commercial 3' }
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
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'contacte': return 'bg-yellow-100 text-yellow-800';
      case 'qualifie': return 'bg-purple-100 text-purple-800';
      case 'converti': return 'bg-green-100 text-green-800';
      case 'perdu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['statut']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, statut: newStatus } : lead
    ));
    toast.success('Statut mis à jour avec succès');
  };

  const assignLead = (leadId: string, agentId: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, assignedTo: agentId } : lead
    ));
    toast.success('Lead assigné avec succès');
  };

  const deleteLead = (leadId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce lead ?')) {
      setLeads(leads.filter(lead => lead.id !== leadId));
      toast.success('Lead supprimé avec succès');
    }
  };

  const callLead = (phone: string) => {
    window.open(`tel:${phone}`);
    toast.info('Appel initié');
  };

  const emailLead = (email: string) => {
    window.open(`mailto:${email}`);
    toast.info('Client email ouvert');
  };

  const convertToClient = (leadId: string) => {
    updateLeadStatus(leadId, 'converti');
    toast.success('Lead converti en client !');
  };

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Nom,Prénom,Email,Téléphone,Type Assurance,Statut,Date Création,Priorité\n" +
      filteredLeads.map(lead => 
        `${lead.nom},${lead.prenom},${lead.email},${lead.telephone},${lead.typeAssurance},${lead.statut},${lead.dateCreation},${lead.priority}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const leadsByStatus = {
    nouveau: leads.filter(l => l.statut === 'nouveau').length,
    contacte: leads.filter(l => l.statut === 'contacte').length,
    qualifie: leads.filter(l => l.statut === 'qualifie').length,
    converti: leads.filter(l => l.statut === 'converti').length,
    perdu: leads.filter(l => l.statut === 'perdu').length
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{leadsByStatus.nouveau}</div>
                <div className="text-xs text-gray-600">Nouveaux</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-500" />
              <div>
                <div className="text-xl font-bold">{leadsByStatus.contacte}</div>
                <div className="text-xs text-gray-600">Contactés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-6 w-6 text-purple-500" />
              <div>
                <div className="text-xl font-bold">{leadsByStatus.qualifie}</div>
                <div className="text-xs text-gray-600">Qualifiés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <div className="text-xl font-bold">{leadsByStatus.converti}</div>
                <div className="text-xs text-gray-600">Convertis</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trash2 className="h-6 w-6 text-red-500" />
              <div>
                <div className="text-xl font-bold">{leadsByStatus.perdu}</div>
                <div className="text-xs text-gray-600">Perdus</div>
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
              <MessageSquare className="h-5 w-5" />
              <span>Gestion des Leads</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={exportLeads}>
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
                <option value="nouveau">Nouveaux</option>
                <option value="contacte">Contactés</option>
                <option value="qualifie">Qualifiés</option>
                <option value="converti">Convertis</option>
                <option value="perdu">Perdus</option>
              </select>
            </div>
          </div>

          {/* Liste des leads */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {lead.prenom} {lead.nom}
                      </h3>
                      <Badge className={getStatusColor(lead.statut)}>
                        {lead.statut}
                      </Badge>
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority}
                      </Badge>
                      {lead.assignedTo && (
                        <Badge variant="outline">
                          {agents.find(a => a.id === lead.assignedTo)?.name || 'Non assigné'}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
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
                        <span>{new Date(lead.dateCreation).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Type:</span> {lead.typeAssurance} | 
                      <span className="font-medium ml-2">Source:</span> {lead.source}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 italic">{lead.message}</p>
                  </div>
                  
                  {/* Actions rapides */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => callLead(lead.telephone)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => emailLead(lead.email)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <select
                      value={lead.statut}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['statut'])}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="nouveau">Nouveau</option>
                      <option value="contacte">Contacté</option>
                      <option value="qualifie">Qualifié</option>
                      <option value="converti">Converti</option>
                      <option value="perdu">Perdu</option>
                    </select>
                    {lead.statut !== 'converti' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => convertToClient(lead.id)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
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

      {/* Modal détails lead */}
      {showDetails && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Détails du Lead - {selectedLead.prenom} {selectedLead.nom}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom complet</Label>
                  <p className="font-medium">{selectedLead.prenom} {selectedLead.nom}</p>
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
                    {selectedLead.statut}
                  </Badge>
                </div>
                <div>
                  <Label>Priorité</Label>
                  <Badge className={getPriorityColor(selectedLead.priority)}>
                    {selectedLead.priority}
                  </Badge>
                </div>
                <div>
                  <Label>Source</Label>
                  <p>{selectedLead.source}</p>
                </div>
                <div>
                  <Label>Date de création</Label>
                  <p>{new Date(selectedLead.dateCreation).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <p className="bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
              </div>
              <div>
                <Label>Assigner à un agent</Label>
                <select
                  value={selectedLead.assignedTo || ''}
                  onChange={(e) => assignLead(selectedLead.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Non assigné</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button onClick={() => callLead(selectedLead.telephone)} className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
                <Button onClick={() => emailLead(selectedLead.email)} variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button onClick={() => convertToClient(selectedLead.id)} className="bg-purple-600 hover:bg-purple-700">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Convertir
                </Button>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
