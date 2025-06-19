
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Plus, Download, Eye, Edit, Send, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const QuotesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [quotes, setQuotes] = useState([
    {
      id: 'DEV-2024-001',
      clientName: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      type: 'Auto',
      amount: 4500,
      status: 'En attente',
      createdDate: '2024-01-15',
      validUntil: '2024-02-15',
      lastUpdate: '2024-01-15',
      notes: 'Citroën C3 - Tous risques'
    },
    {
      id: 'DEV-2024-002',
      clientName: 'Fatima Zahra',
      email: 'fatima.zahra@email.com',
      type: 'Habitation',
      amount: 2800,
      status: 'Accepté',
      createdDate: '2024-01-12',
      validUntil: '2024-02-12',
      lastUpdate: '2024-01-18',
      notes: 'Appartement 120m² Casablanca'
    },
    {
      id: 'DEV-2024-003',
      clientName: 'Mohamed Alami',
      email: 'mohamed.alami@email.com',
      type: 'Professionnelle',
      amount: 12500,
      status: 'En négociation',
      createdDate: '2024-01-10',
      validUntil: '2024-02-10',
      lastUpdate: '2024-01-19',
      notes: 'Bureau 500m² + responsabilité civile'
    },
    {
      id: 'DEV-2024-004',
      clientName: 'Aicha Bennani',
      email: 'aicha.bennani@email.com',
      type: 'Santé',
      amount: 8900,
      status: 'Refusé',
      createdDate: '2024-01-08',
      validUntil: '2024-02-08',
      lastUpdate: '2024-01-20',
      notes: 'Famille 4 personnes - formule premium'
    },
    {
      id: 'DEV-2024-005',
      clientName: 'Youssef Alaoui',
      email: 'youssef.alaoui@email.com',
      type: 'Auto',
      amount: 6200,
      status: 'Brouillon',
      createdDate: '2024-01-20',
      validUntil: '2024-02-20',
      lastUpdate: '2024-01-20',
      notes: 'Mercedes Classe A - En cours de finalisation'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
      case 'En attente': return 'bg-blue-100 text-blue-800';
      case 'En négociation': return 'bg-orange-100 text-orange-800';
      case 'Accepté': return 'bg-green-100 text-green-800';
      case 'Refusé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (quoteId: string, newStatus: string) => {
    setQuotes(prev => 
      prev.map(quote => 
        quote.id === quoteId 
          ? { ...quote, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0] }
          : quote
      )
    );
    toast.success('Statut du devis mis à jour');
  };

  const handleSendQuote = (quote: any) => {
    toast.success(`Devis ${quote.id} envoyé à ${quote.clientName}`);
    setQuotes(prev => 
      prev.map(q => 
        q.id === quote.id 
          ? { ...q, status: 'En attente', lastUpdate: new Date().toISOString().split('T')[0] }
          : q
      )
    );
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    const matchesType = typeFilter === 'all' || quote.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const createNewQuote = () => {
    toast.success('Nouveau devis créé');
  };

  const exportQuotes = () => {
    toast.success('Export des devis en cours...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Devis & Contrats</h2>
          <p className="text-axa-gray">Génération de devis et gestion des contrats</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportQuotes} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={createNewQuote} className="bg-axa-red hover:bg-axa-red/90">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Devis
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-axa-gray-dark">{quotes.length}</div>
            <div className="text-sm text-axa-gray">Total Devis</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{quotes.filter(q => q.status === 'En attente').length}</div>
            <div className="text-sm text-axa-gray">En Attente</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{quotes.filter(q => q.status === 'Accepté').length}</div>
            <div className="text-sm text-axa-gray">Acceptés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{quotes.filter(q => q.status === 'En négociation').length}</div>
            <div className="text-sm text-axa-gray">En Négociation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-axa-red">{quotes.reduce((sum, q) => sum + q.amount, 0).toLocaleString()} DH</div>
            <div className="text-sm text-axa-gray">Valeur Totale</div>
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
                  placeholder="Rechercher par client, email ou numéro de devis..."
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
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="En négociation">En négociation</SelectItem>
                <SelectItem value="Accepté">Accepté</SelectItem>
                <SelectItem value="Refusé">Refusé</SelectItem>
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
                <SelectItem value="Professionnelle">Professionnelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des devis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Devis ({filteredQuotes.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-axa-gray-dark">{quote.id}</h3>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                      <Badge variant="outline">{quote.type}</Badge>
                      <span className="text-lg font-bold text-axa-red">{quote.amount.toLocaleString()} DH</span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-2 text-sm text-axa-gray mb-3">
                      <div>👤 {quote.clientName}</div>
                      <div>📧 {quote.email}</div>
                      <div>📅 Créé: {quote.createdDate}</div>
                      <div>⏰ Valide jusqu'au: {quote.validUntil}</div>
                      <div>🔄 Mis à jour: {quote.lastUpdate}</div>
                      <div className="md:col-span-3">💬 {quote.notes}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSendQuote(quote)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Select 
                      value={quote.status} 
                      onValueChange={(value) => handleStatusChange(quote.id, value)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brouillon">Brouillon</SelectItem>
                        <SelectItem value="En attente">En attente</SelectItem>
                        <SelectItem value="En négociation">En négociation</SelectItem>
                        <SelectItem value="Accepté">Accepté</SelectItem>
                        <SelectItem value="Refusé">Refusé</SelectItem>
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

export default QuotesManager;
