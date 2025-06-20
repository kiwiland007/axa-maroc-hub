
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Search, Plus, Download, Eye, Edit, Send, Calculator, X } from 'lucide-react';
import { toast } from 'sonner';

const QuotesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const [newQuote, setNewQuote] = useState({
    clientName: '',
    email: '',
    phone: '',
    type: '',
    amount: '',
    notes: ''
  });

  const [quotes, setQuotes] = useState([
    {
      id: 'DEV-2024-001',
      clientName: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      phone: '+212 661-234-567',
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
      phone: '+212 662-345-678',
      type: 'Habitation',
      amount: 2800,
      status: 'Accepté',
      createdDate: '2024-01-12',
      validUntil: '2024-02-12',
      lastUpdate: '2024-01-18',
      notes: 'Appartement 120m² Casablanca'
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

  const handleAddQuote = () => {
    if (!newQuote.clientName || !newQuote.email || !newQuote.type) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const quote = {
      id: `DEV-2024-${String(quotes.length + 1).padStart(3, '0')}`,
      ...newQuote,
      amount: parseInt(newQuote.amount) || 0,
      status: 'Brouillon',
      createdDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    setQuotes(prev => [...prev, quote]);
    setNewQuote({ clientName: '', email: '', phone: '', type: '', amount: '', notes: '' });
    setIsAddDialogOpen(false);
    toast.success('Devis créé avec succès!');
  };

  const handleEditQuote = () => {
    if (!selectedQuote) return;
    
    setQuotes(prev => prev.map(q => 
      q.id === selectedQuote.id 
        ? { ...selectedQuote, lastUpdate: new Date().toISOString().split('T')[0] }
        : q
    ));
    setIsEditDialogOpen(false);
    toast.success('Devis modifié avec succès!');
  };

  const handlePreview = (quote: any) => {
    setSelectedQuote(quote);
    setIsPreviewDialogOpen(true);
  };

  const handleEdit = (quote: any) => {
    setSelectedQuote({ ...quote });
    setIsEditDialogOpen(true);
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

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    const matchesType = typeFilter === 'all' || quote.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Gestion des Devis & Contrats</h2>
          <p className="text-axa-gray">Génération de devis et gestion des contrats</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => toast.success('Export en cours...')} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-axa-red hover:bg-axa-red/90">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Devis
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un Nouveau Devis</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom du Client *</Label>
                  <Input 
                    value={newQuote.clientName}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input 
                    type="email"
                    value={newQuote.email}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input 
                    value={newQuote.phone}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+212 6XX-XXX-XXX"
                  />
                </div>
                <div>
                  <Label>Type d'Assurance *</Label>
                  <Select value={newQuote.type} onValueChange={(value) => setNewQuote(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Auto">Auto</SelectItem>
                      <SelectItem value="Habitation">Habitation</SelectItem>
                      <SelectItem value="Santé">Santé</SelectItem>
                      <SelectItem value="Prévoyance">Prévoyance</SelectItem>
                      <SelectItem value="Professionnelle">Professionnelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Montant (DH)</Label>
                  <Input 
                    type="number"
                    value={newQuote.amount}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Notes</Label>
                  <Textarea 
                    value={newQuote.notes}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Détails du devis..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddQuote} className="bg-axa-red hover:bg-axa-red/90">
                  Créer le Devis
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                      <Button size="sm" variant="outline" onClick={() => handlePreview(quote)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(quote)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.success(`Devis ${quote.id} envoyé à ${quote.clientName}`)}
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

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Devis {selectedQuote?.id}</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nom du Client</Label>
                <Input 
                  value={selectedQuote.clientName}
                  onChange={(e) => setSelectedQuote(prev => ({ ...prev, clientName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  value={selectedQuote.email}
                  onChange={(e) => setSelectedQuote(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input 
                  value={selectedQuote.phone || ''}
                  onChange={(e) => setSelectedQuote(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label>Montant (DH)</Label>
                <Input 
                  type="number"
                  value={selectedQuote.amount}
                  onChange={(e) => setSelectedQuote(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="col-span-2">
                <Label>Notes</Label>
                <Textarea 
                  value={selectedQuote.notes}
                  onChange={(e) => setSelectedQuote(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditQuote} className="bg-axa-red hover:bg-axa-red/90">
              Sauvegarder
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog d'aperçu */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Aperçu du Devis {selectedQuote?.id}</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="bg-white p-8 border rounded-lg">
              <div className="text-center mb-8">
                <img 
                  src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                  alt="Logo" 
                  className="h-16 mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold">DEVIS D'ASSURANCE</h1>
                <p className="text-gray-600">Numéro: {selectedQuote.id}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold mb-4">Informations Client</h3>
                  <p><strong>Nom:</strong> {selectedQuote.clientName}</p>
                  <p><strong>Email:</strong> {selectedQuote.email}</p>
                  <p><strong>Téléphone:</strong> {selectedQuote.phone}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Détails du Devis</h3>
                  <p><strong>Type:</strong> {selectedQuote.type}</p>
                  <p><strong>Montant:</strong> {selectedQuote.amount.toLocaleString()} DH</p>
                  <p><strong>Valide jusqu'au:</strong> {selectedQuote.validUntil}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-bold mb-4">Notes</h3>
                <p>{selectedQuote.notes}</p>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p>MOUMEN TECHNIQUE ET PREVOYANCE - Agent Général AXA</p>
                <p>Ce devis est valable 30 jours à compter de sa date d'émission</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotesManager;
