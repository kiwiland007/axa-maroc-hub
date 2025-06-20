
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Search, Phone, Mail, Calendar, UserPlus, Download, X } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  source: string;
  date: string;
  lastContact: string;
  notes: string;
}

const LeadsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isNewLeadDialogOpen, setIsNewLeadDialogOpen] = useState(false);
  
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    source: '',
    notes: ''
  });

  const [leads, setLeads] = useState<Lead[]>([
    { 
      id: 1, 
      name: 'Ahmed Benali', 
      email: 'ahmed.benali@email.com', 
      phone: '+212 661-234-567',
      type: 'Auto', 
      status: 'Nouveau', 
      source: 'Site Web',
      date: '2024-01-15',
      lastContact: '2024-01-15',
      notes: 'Intéressé par assurance auto complète'
    },
    { 
      id: 2, 
      name: 'Fatima Zahra', 
      email: 'fatima.zahra@email.com', 
      phone: '+212 662-345-678',
      type: 'Habitation', 
      status: 'Contacté', 
      source: 'Facebook',
      date: '2024-01-14',
      lastContact: '2024-01-16',
      notes: 'Villa à Rabat, devis en cours'
    },
    { 
      id: 3, 
      name: 'Mohamed Alami', 
      email: 'mohamed.alami@email.com', 
      phone: '+212 663-456-789',
      type: 'Santé', 
      status: 'Devis envoyé', 
      source: 'Référence',
      date: '2024-01-12',
      lastContact: '2024-01-17',
      notes: 'Famille de 4 personnes'
    },
    { 
      id: 4, 
      name: 'Aicha Bennani', 
      email: 'aicha.bennani@email.com', 
      phone: '+212 664-567-890',
      type: 'Prévoyance', 
      status: 'Qualifié', 
      source: 'Google Ads',
      date: '2024-01-13',
      lastContact: '2024-01-18',
      notes: 'Cadre supérieur, prévoyance dirigeant'
    },
    { 
      id: 5, 
      name: 'Youssef Alaoui', 
      email: 'youssef.alaoui@email.com', 
      phone: '+212 665-678-901',
      type: 'Auto', 
      status: 'Suivi', 
      source: 'Site Web',
      date: '2024-01-11',
      lastContact: '2024-01-19',
      notes: 'Flotte de 3 véhicules'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800';
      case 'Contacté': return 'bg-yellow-100 text-yellow-800';
      case 'Qualifié': return 'bg-green-100 text-green-800';
      case 'Devis envoyé': return 'bg-orange-100 text-orange-800';
      case 'Suivi': return 'bg-purple-100 text-purple-800';
      case 'Fermé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (leadId: number, newStatus: string) => {
    setLeads(prev => 
      prev.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus, lastContact: new Date().toISOString().split('T')[0] }
          : lead
      )
    );
    toast.success('Statut mis à jour');
  };

  const handleContact = (lead: Lead, method: 'call' | 'email') => {
    if (method === 'call') {
      toast.success(`Appel vers ${lead.name} - ${lead.phone}`);
    } else {
      toast.success(`Email envoyé à ${lead.name}`);
    }
    
    setLeads(prev => 
      prev.map(l => 
        l.id === lead.id 
          ? { ...l, lastContact: new Date().toISOString().split('T')[0] }
          : l
      )
    );
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newLead.name || !newLead.email || !newLead.phone || !newLead.type || !newLead.source) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const lead: Lead = {
      id: Math.max(...leads.map(l => l.id)) + 1,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      type: newLead.type,
      status: 'Nouveau',
      source: newLead.source,
      date: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: newLead.notes || 'Nouveau lead ajouté manuellement'
    };

    setLeads(prev => [lead, ...prev]);
    setNewLead({ name: '', email: '', phone: '', type: '', source: '', notes: '' });
    setIsNewLeadDialogOpen(false);
    toast.success('Nouveau lead ajouté avec succès !');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesType = typeFilter === 'all' || lead.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const exportLeads = () => {
    toast.success('Export des leads en cours...');
    // Export functionality would be implemented here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Leads</h2>
          <p className="text-axa-gray">CRM et suivi des prospects</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportLeads} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          
          <Dialog open={isNewLeadDialogOpen} onOpenChange={setIsNewLeadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-axa-red hover:bg-axa-red/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Nouveau Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-red-500" />
                  <span>Ajouter un Nouveau Lead</span>
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleAddLead} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={newLead.name}
                      onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Ahmed Benali"
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Ex: +212 661-234-567"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Ex: ahmed.benali@email.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type d'assurance *</Label>
                    <Select value={newLead.type} onValueChange={(value) => setNewLead(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Auto">Auto</SelectItem>
                        <SelectItem value="Habitation">Habitation</SelectItem>
                        <SelectItem value="Santé">Santé</SelectItem>
                        <SelectItem value="Prévoyance">Prévoyance</SelectItem>
                        <SelectItem value="Épargne">Épargne</SelectItem>
                        <SelectItem value="Professionnelle">Professionnelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="source">Source *</Label>
                    <Select value={newLead.source} onValueChange={(value) => setNewLead(prev => ({ ...prev, source: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner la source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Site Web">Site Web</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                        <SelectItem value="Référence">Référence</SelectItem>
                        <SelectItem value="Appel direct">Appel direct</SelectItem>
                        <SelectItem value="Visite bureau">Visite bureau</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newLead.notes}
                    onChange={(e) => setNewLead(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Informations supplémentaires sur le lead..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsNewLeadDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Ajouter le Lead
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
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
                <SelectItem value="Nouveau">Nouveau</SelectItem>
                <SelectItem value="Contacté">Contacté</SelectItem>
                <SelectItem value="Qualifié">Qualifié</SelectItem>
                <SelectItem value="Devis envoyé">Devis envoyé</SelectItem>
                <SelectItem value="Suivi">Suivi</SelectItem>
                <SelectItem value="Fermé">Fermé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
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

      {/* Leads list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Leads ({filteredLeads.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-axa-gray-dark">{lead.name}</h3>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                      <Badge variant="outline">{lead.type}</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-axa-gray mb-3">
                      <div>📧 {lead.email}</div>
                      <div>📞 {lead.phone}</div>
                      <div>📅 Lead: {lead.date}</div>
                      <div>🔄 Dernier contact: {lead.lastContact}</div>
                      <div>📈 Source: {lead.source}</div>
                      <div className="md:col-span-2">💬 {lead.notes}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContact(lead, 'call')}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContact(lead, 'email')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Select 
                      value={lead.status} 
                      onValueChange={(value) => handleStatusChange(lead.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nouveau">Nouveau</SelectItem>
                        <SelectItem value="Contacté">Contacté</SelectItem>
                        <SelectItem value="Qualifié">Qualifié</SelectItem>
                        <SelectItem value="Devis envoyé">Devis envoyé</SelectItem>
                        <SelectItem value="Suivi">Suivi</SelectItem>
                        <SelectItem value="Fermé">Fermé</SelectItem>
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

export default LeadsManager;
