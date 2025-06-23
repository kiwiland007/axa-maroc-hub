import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Download,
  Send,
  Calculator,
  Clock,
  CheckCircle,
  XCircle,
  Car,
  Home,
  Heart,
  Shield,
  PiggyBank,
  Briefcase
} from 'lucide-react';
import { toast } from 'sonner';
import { useContentStore } from '@/hooks/useContentStore';

interface Quote {
  id: string;
  clientNom: string;
  clientPrenom: string;
  clientEmail: string;
  clientTelephone: string;
  typeAssurance: string;
  statut: 'brouillon' | 'envoye' | 'accepte' | 'refuse' | 'expire';
  dateCreation: string;
  dateValidite: string;
  montantTotal: number;
  details: any;
  notes: string;
}

const QuotesManager = () => {
  const { content } = useContentStore();
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      clientNom: 'Benali',
      clientPrenom: 'Ahmed',
      clientEmail: 'ahmed.benali@email.com',
      clientTelephone: '+212 661234567',
      typeAssurance: 'Auto',
      statut: 'envoye',
      dateCreation: '2024-01-15',
      dateValidite: '2024-02-15',
      montantTotal: 3500,
      details: {
        vehicule: {
          marque: 'Toyota',
          modele: 'Corolla',
          annee: 2020,
          valeur: 180000
        },
        garanties: ['Tous risques', 'Vol', 'Incendie', 'Bris de glace']
      },
      notes: 'Client intéressé par une formule complète'
    },
    {
      id: '2',
      clientNom: 'El Mansouri',
      clientPrenom: 'Fatima',
      clientEmail: 'fatima.elmansouri@email.com',
      clientTelephone: '+212 662345678',
      typeAssurance: 'Habitation',
      statut: 'brouillon',
      dateCreation: '2024-01-16',
      dateValidite: '2024-02-16',
      montantTotal: 2200,
      details: {
        logement: {
          type: 'Villa',
          surface: 200,
          valeur: 800000,
          adresse: 'Casablanca'
        },
        garanties: ['Incendie', 'Vol', 'Dégâts des eaux', 'Responsabilité civile']
      },
      notes: 'Demande de réduction pour client fidèle'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const statusOptions = [
    { value: 'brouillon', label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
    { value: 'envoye', label: 'Envoyé', color: 'bg-blue-100 text-blue-800' },
    { value: 'accepte', label: 'Accepté', color: 'bg-green-100 text-green-800' },
    { value: 'refuse', label: 'Refusé', color: 'bg-red-100 text-red-800' },
    { value: 'expire', label: 'Expiré', color: 'bg-orange-100 text-orange-800' }
  ];

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getProductIcon = (type: string) => {
    const icons = {
      'Auto': Car,
      'Habitation': Home,
      'Santé': Heart,
      'Prévoyance': Shield,
      'Épargne': PiggyBank,
      'Professionnelle': Briefcase
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.clientNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.clientPrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || quote.statut === statusFilter;
    const matchesType = typeFilter === 'all' || quote.typeAssurance === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowQuoteModal(true);
  };

  const handleEditQuote = (quote: Quote) => {
    setEditingQuote({ ...quote });
    setShowEditModal(true);
  };

  const handleSaveQuote = () => {
    if (!editingQuote) return;

    setQuotes(quotes.map(quote => 
      quote.id === editingQuote.id ? editingQuote : quote
    ));
    setShowEditModal(false);
    setEditingQuote(null);
    toast.success('Devis mis à jour avec succès');
  };

  const handleDownloadQuote = (quote: Quote) => {
    // Simulation du téléchargement
    const content = `DEVIS ${quote.id}\n\nClient: ${quote.clientPrenom} ${quote.clientNom}\nEmail: ${quote.clientEmail}\nType: ${quote.typeAssurance}\nMontant: ${quote.montantTotal} DHS\n\nDétails:\n${JSON.stringify(quote.details, null, 2)}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devis_${quote.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Devis téléchargé');
  };

  const createNewQuote = (productType: string) => {
    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      clientNom: '',
      clientPrenom: '',
      clientEmail: '',
      clientTelephone: '',
      typeAssurance: productType,
      statut: 'brouillon',
      dateCreation: new Date().toISOString().split('T')[0],
      dateValidite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      montantTotal: 0,
      details: {},
      notes: ''
    };

    setQuotes([newQuote, ...quotes]);
    setEditingQuote(newQuote);
    setShowEditModal(true);
    toast.success(`Nouveau devis ${productType} créé`);
  };

  const sendQuote = (quoteId: string) => {
    setQuotes(quotes.map(quote =>
      quote.id === quoteId ? { ...quote, statut: 'envoye' as Quote['statut'] } : quote
    ));
    toast.success('Devis envoyé au client');
  };

  const duplicateQuote = (quote: Quote) => {
    const duplicatedQuote: Quote = {
      ...quote,
      id: `quote-${Date.now()}`,
      dateCreation: new Date().toISOString().split('T')[0],
      dateValidite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      statut: 'brouillon'
    };

    setQuotes([duplicatedQuote, ...quotes]);
    toast.success('Devis dupliqué');
  };

  const totalQuotes = quotes.length;
  const quotesBrouillon = quotes.filter(q => q.statut === 'brouillon').length;
  const quotesEnvoyes = quotes.filter(q => q.statut === 'envoye').length;
  const quotesAcceptes = quotes.filter(q => q.statut === 'accepte').length;

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{totalQuotes}</div>
                <div className="text-sm text-gray-600">Total Devis</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{quotesBrouillon}</div>
                <div className="text-sm text-gray-600">Brouillons</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Send className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{quotesEnvoyes}</div>
                <div className="text-sm text-gray-600">Envoyés</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{quotesAcceptes}</div>
                <div className="text-sm text-gray-600">Acceptés</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Créer un Nouveau Devis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {content.products.map((product) => {
              const IconComponent = getProductIcon(product.title.replace('Assurance ', ''));
              return (
                <Button
                  key={product.id}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-red-50 hover:border-red-200"
                  onClick={() => createNewQuote(product.title.replace('Assurance ', ''))}
                >
                  <IconComponent className="h-6 w-6 text-red-600" />
                  <span className="text-xs text-center">{product.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gestion des devis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Gestion des Devis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtres */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statusOptions.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {content.products.map(product => (
                    <SelectItem key={product.id} value={product.title.replace('Assurance ', '')}>
                      {product.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Liste des devis */}
          <div className="space-y-4">
            {filteredQuotes.map((quote) => {
              const IconComponent = getProductIcon(quote.typeAssurance);
              return (
                <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <IconComponent className="h-5 w-5 text-red-600" />
                        <h3 className="font-semibold text-lg">
                          Devis #{quote.id.slice(-6).toUpperCase()}
                        </h3>
                        <Badge className={getStatusColor(quote.statut)}>
                          {statusOptions.find(s => s.value === quote.statut)?.label}
                        </Badge>
                        <Badge variant="outline">{quote.typeAssurance}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                        <div>
                          <strong>Client:</strong> {quote.clientPrenom} {quote.clientNom}
                        </div>
                        <div>
                          <strong>Email:</strong> {quote.clientEmail}
                        </div>
                        <div>
                          <strong>Téléphone:</strong> {quote.clientTelephone}
                        </div>
                        <div>
                          <strong>Créé le:</strong> {new Date(quote.dateCreation).toLocaleDateString('fr-FR')}
                        </div>
                        <div>
                          <strong>Valide jusqu'au:</strong> {new Date(quote.dateValidite).toLocaleDateString('fr-FR')}
                        </div>
                        <div>
                          <strong>Montant:</strong> <span className="text-green-600 font-semibold">{quote.montantTotal.toLocaleString()} DHS</span>
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <strong>Notes:</strong> {quote.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewQuote(quote)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditQuote(quote)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadQuote(quote)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      {quote.statut === 'brouillon' && (
                        <Button 
                          size="sm"
                          onClick={() => sendQuote(quote.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Envoyer
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => duplicateQuote(quote)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredQuotes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun devis trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de visualisation */}
      <Dialog open={showQuoteModal} onOpenChange={setShowQuoteModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails du Devis</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Informations Client</h3>
                  <p><strong>Nom:</strong> {selectedQuote.clientPrenom} {selectedQuote.clientNom}</p>
                  <p><strong>Email:</strong> {selectedQuote.clientEmail}</p>
                  <p><strong>Téléphone:</strong> {selectedQuote.clientTelephone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Informations Devis</h3>
                  <p><strong>Type:</strong> {selectedQuote.typeAssurance}</p>
                  <p><strong>Statut:</strong> 
                    <Badge className={getStatusColor(selectedQuote.statut)} style={{marginLeft: '8px'}}>
                      {statusOptions.find(s => s.value === selectedQuote.statut)?.label}
                    </Badge>
                  </p>
                  <p><strong>Montant:</strong> {selectedQuote.montantTotal.toLocaleString()} DHS</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Détails</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <pre>{JSON.stringify(selectedQuote.details, null, 2)}</pre>
                </div>
              </div>
              {selectedQuote.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    {selectedQuote.notes}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal d'édition */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Devis</DialogTitle>
          </DialogHeader>
          {editingQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prénom</label>
                  <Input
                    value={editingQuote.clientPrenom}
                    onChange={(e) => setEditingQuote({...editingQuote, clientPrenom: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <Input
                    value={editingQuote.clientNom}
                    onChange={(e) => setEditingQuote({...editingQuote, clientNom: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    value={editingQuote.clientEmail}
                    onChange={(e) => setEditingQuote({...editingQuote, clientEmail: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <Input
                    value={editingQuote.clientTelephone}
                    onChange={(e) => setEditingQuote({...editingQuote, clientTelephone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Montant Total (DHS)</label>
                  <Input
                    type="number"
                    value={editingQuote.montantTotal}
                    onChange={(e) => setEditingQuote({...editingQuote, montantTotal: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Statut</label>
                  <select
                    value={editingQuote.statut}
                    onChange={(e) => setEditingQuote({...editingQuote, statut: e.target.value as Quote['statut']})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={editingQuote.notes}
                  onChange={(e) => setEditingQuote({...editingQuote, notes: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveQuote} className="bg-blue-600 hover:bg-blue-700">
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
    </div>
  );
};

export default QuotesManager;
