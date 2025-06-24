
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Car,
  Home,
  Heart,
  Shield,
  Edit,
  Trash2,
  Eye,
  Download,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  FileImage,
  Printer
} from 'lucide-react';
import { toast } from 'sonner';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Quote {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  insuranceType: string;
  status: 'brouillon' | 'envoye' | 'accepte' | 'refuse' | 'expire';
  dateCreation: string;
  dateExpiration: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  assignedTo?: string;
}

const QuotesManager = () => {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 'DEV-2023-001',
      clientName: 'Ahmed Benali',
      clientEmail: 'ahmed.benali@email.com',
      clientPhone: '+212 661234567',
      insuranceType: 'Auto',
      status: 'envoye',
      dateCreation: '2023-12-15',
      dateExpiration: '2024-01-15',
      subtotal: 3000,
      tax: 300,
      total: 3300,
      notes: 'Devis pour véhicule Dacia Logan',
      assignedTo: 'agent1',
      items: [
        {
          id: '1',
          description: 'Assurance Tous Risques',
          quantity: 1,
          unitPrice: 3000,
          total: 3000
        }
      ]
    },
    {
      id: 'DEV-2023-002',
      clientName: 'Fatima El Mansouri',
      clientEmail: 'fatima.elmansouri@email.com',
      clientPhone: '+212 662345678',
      insuranceType: 'Habitation',
      status: 'brouillon',
      dateCreation: '2023-12-14',
      dateExpiration: '2024-01-14',
      subtotal: 2200,
      tax: 220,
      total: 2420,
      notes: 'Devis assurance habitation appartement 80m²',
      assignedTo: 'agent2',
      items: [
        {
          id: '1',
          description: 'Assurance Habitation - Appartement',
          quantity: 1,
          unitPrice: 2200,
          total: 2200
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

  const [newQuote, setNewQuote] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    insuranceType: '',
    dateExpiration: '',
    notes: '',
    assignedTo: ''
  });

  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const agents = [
    { id: 'agent1', name: 'Agent Commercial 1' },
    { id: 'agent2', name: 'Agent Commercial 2' },
    { id: 'agent3', name: 'Agent Commercial 3' }
  ];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'brouillon': return 'bg-gray-100 text-gray-800';
      case 'envoye': return 'bg-blue-100 text-blue-800';
      case 'accepte': return 'bg-green-100 text-green-800';
      case 'refuse': return 'bg-red-100 text-red-800';
      case 'expire': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsuranceIcon = (type: string) => {
    switch (type) {
      case 'Auto': return <Car className="h-4 w-4" />;
      case 'Habitation': return <Home className="h-4 w-4" />;
      case 'Santé': return <Heart className="h-4 w-4" />;
      case 'Prévoyance': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const addItemToQuote = () => {
    if (!newItem.description || newItem.unitPrice <= 0) {
      toast.error('Veuillez remplir tous les champs de l\'item');
      return;
    }

    const item: QuoteItem = {
      id: Date.now().toString(),
      ...newItem,
      total: newItem.quantity * newItem.unitPrice
    };

    setQuoteItems([...quoteItems, item]);
    setNewItem({ description: '', quantity: 1, unitPrice: 0 });
    toast.success('Item ajouté au devis');
  };

  const removeItemFromQuote = (itemId: string) => {
    setQuoteItems(quoteItems.filter(item => item.id !== itemId));
    toast.success('Item supprimé du devis');
  };

  const calculateQuoteTotal = () => {
    const subtotal = quoteItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleCreateQuote = () => {
    if (!newQuote.clientName || !newQuote.clientEmail || !newQuote.insuranceType || quoteItems.length === 0) {
      toast.error('Veuillez remplir tous les champs obligatoires et ajouter au moins un item');
      return;
    }

    const totals = calculateQuoteTotal();
    const quote: Quote = {
      id: `DEV-${new Date().getFullYear()}-${String(quotes.length + 1).padStart(3, '0')}`,
      ...newQuote,
      status: 'brouillon',
      dateCreation: new Date().toISOString().split('T')[0],
      items: quoteItems,
      ...totals
    };

    setQuotes([...quotes, quote]);
    setNewQuote({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      insuranceType: '',
      dateExpiration: '',
      notes: '',
      assignedTo: ''
    });
    setQuoteItems([]);
    setShowCreateForm(false);
    toast.success('Devis créé avec succès');
  };

  const updateQuoteStatus = (quoteId: string, newStatus: Quote['status']) => {
    setQuotes(quotes.map(quote => 
      quote.id === quoteId ? { ...quote, status: newStatus } : quote
    ));
    toast.success('Statut du devis mis à jour');
  };

  const deleteQuote = (quoteId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      setQuotes(quotes.filter(quote => quote.id !== quoteId));
      toast.success('Devis supprimé avec succès');
    }
  };

  const generatePDF = (quote: Quote) => {
    // Simulation de génération PDF
    const pdfContent = `
      DEVIS ${quote.id}
      
      Client: ${quote.clientName}
      Email: ${quote.clientEmail}
      Téléphone: ${quote.clientPhone}
      Type d'assurance: ${quote.insuranceType}
      
      Date de création: ${new Date(quote.dateCreation).toLocaleDateString('fr-FR')}
      Date d'expiration: ${new Date(quote.dateExpiration).toLocaleDateString('fr-FR')}
      
      Items:
      ${quote.items.map(item => 
        `- ${item.description}: ${item.quantity} x ${item.unitPrice} DHS = ${item.total} DHS`
      ).join('\n')}
      
      Sous-total: ${quote.subtotal} DHS
      TVA (10%): ${quote.tax} DHS
      Total: ${quote.total} DHS
      
      Notes: ${quote.notes || 'Aucune note'}
    `;

    // Créer un blob et le télécharger
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devis_${quote.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Devis téléchargé en format PDF');
  };

  const sendQuote = (quote: Quote) => {
    updateQuoteStatus(quote.id, 'envoye');
    toast.success(`Devis envoyé à ${quote.clientEmail}`);
  };

  const quotesByStatus = {
    brouillon: quotes.filter(q => q.status === 'brouillon').length,
    envoye: quotes.filter(q => q.status === 'envoye').length,
    accepte: quotes.filter(q => q.status === 'accepte').length,
    refuse: quotes.filter(q => q.status === 'refuse').length,
    expire: quotes.filter(q => q.status === 'expire').length
  };

  const totalQuoteValue = quotes.reduce((sum, quote) => sum + quote.total, 0);

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{quotes.length}</div>
                <div className="text-xs text-gray-600">Total Devis</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-gray-500" />
              <div>
                <div className="text-xl font-bold">{quotesByStatus.brouillon}</div>
                <div className="text-xs text-gray-600">Brouillons</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-6 w-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{quotesByStatus.envoye}</div>
                <div className="text-xs text-gray-600">Envoyés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <div className="text-xl font-bold">{quotesByStatus.accepte}</div>
                <div className="text-xs text-gray-600">Acceptés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <div>
                <div className="text-xl font-bold">{quotesByStatus.refuse}</div>
                <div className="text-xs text-gray-600">Refusés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-purple-500" />
              <div>
                <div className="text-lg font-bold">{totalQuoteValue.toLocaleString()} DHS</div>
                <div className="text-xs text-gray-600">Valeur Totale</div>
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
              <FileText className="h-5 w-5" />
              <span>Gestion des Devis & Contrats</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Devis
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
                  placeholder="Rechercher par nom client, email ou numéro..."
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
                <option value="brouillon">Brouillons</option>
                <option value="envoye">Envoyés</option>
                <option value="accepte">Acceptés</option>
                <option value="refuse">Refusés</option>
                <option value="expire">Expirés</option>
              </select>
            </div>
          </div>

          {/* Liste des devis */}
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{quote.id}</h3>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getInsuranceIcon(quote.insuranceType)}
                        <span className="text-sm">{quote.insuranceType}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                      <div><strong>Client:</strong> {quote.clientName}</div>
                      <div><strong>Email:</strong> {quote.clientEmail}</div>
                      <div><strong>Téléphone:</strong> {quote.clientPhone}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div><strong>Création:</strong> {new Date(quote.dateCreation).toLocaleDateString('fr-FR')}</div>
                      <div><strong>Expiration:</strong> {new Date(quote.dateExpiration).toLocaleDateString('fr-FR')}</div>
                      <div><strong>Montant:</strong> {quote.total.toLocaleString()} DHS</div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => generatePDF(quote)}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    {quote.status === 'brouillon' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => sendQuote(quote)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <select
                      value={quote.status}
                      onChange={(e) => updateQuoteStatus(quote.id, e.target.value as Quote['status'])}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="brouillon">Brouillon</option>
                      <option value="envoye">Envoyé</option>
                      <option value="accepte">Accepté</option>
                      <option value="refuse">Refusé</option>
                      <option value="expire">Expiré</option>
                    </select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteQuote(quote.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuotes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun devis trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal création de devis */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <CardTitle>Créer un Nouveau Devis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informations client */}
              <div>
                <h3 className="font-semibold mb-4">Informations Client</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Nom du client *</Label>
                    <Input
                      id="clientName"
                      value={newQuote.clientName}
                      onChange={(e) => setNewQuote({...newQuote, clientName: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Email *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={newQuote.clientEmail}
                      onChange={(e) => setNewQuote({...newQuote, clientEmail: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Téléphone</Label>
                    <Input
                      id="clientPhone"
                      value={newQuote.clientPhone}
                      onChange={(e) => setNewQuote({...newQuote, clientPhone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceType">Type d'assurance *</Label>
                    <select
                      id="insuranceType"
                      value={newQuote.insuranceType}
                      onChange={(e) => setNewQuote({...newQuote, insuranceType: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    >
                      <option value="">Sélectionner</option>
                      <option value="Auto">Auto</option>
                      <option value="Habitation">Habitation</option>
                      <option value="Santé">Santé</option>
                      <option value="Prévoyance">Prévoyance</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="dateExpiration">Date d'expiration</Label>
                    <Input
                      id="dateExpiration"
                      type="date"
                      value={newQuote.dateExpiration}
                      onChange={(e) => setNewQuote({...newQuote, dateExpiration: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="assignedTo">Assigné à</Label>
                    <select
                      id="assignedTo"
                      value={newQuote.assignedTo}
                      onChange={(e) => setNewQuote({...newQuote, assignedTo: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    >
                      <option value="">Non assigné</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Items du devis */}
              <div>
                <h3 className="font-semibold mb-4">Items du Devis</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label htmlFor="itemDescription">Description</Label>
                    <Input
                      id="itemDescription"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      placeholder="Ex: Assurance Tous Risques"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemQuantity">Quantité</Label>
                    <Input
                      id="itemQuantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemPrice">Prix unitaire (DHS)</Label>
                    <Input
                      id="itemPrice"
                      type="number"
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addItemToQuote} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>

                {/* Liste des items */}
                {quoteItems.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <div className="space-y-2">
                      {quoteItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex-1">
                            <span className="font-medium">{item.description}</span>
                            <span className="text-sm text-gray-600 ml-2">
                              {item.quantity} x {item.unitPrice} DHS = {item.total} DHS
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItemFromQuote(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Sous-total:</span>
                          <span>{calculateQuoteTotal().subtotal.toLocaleString()} DHS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TVA (10%):</span>
                          <span>{calculateQuoteTotal().tax.toLocaleString()} DHS</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>{calculateQuoteTotal().total.toLocaleString()} DHS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newQuote.notes}
                  onChange={(e) => setNewQuote({...newQuote, notes: e.target.value})}
                  rows={3}
                  className="mt-1"
                  placeholder="Notes additionnelles pour ce devis..."
                />
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button onClick={handleCreateQuote} className="bg-green-600 hover:bg-green-700">
                  Créer le Devis
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal détails devis */}
      {showDetails && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Devis {selectedQuote.id}</CardTitle>
                <div className="flex space-x-2">
                  <Button onClick={() => generatePDF(selectedQuote)} variant="outline">
                    <FileImage className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button onClick={() => setShowDetails(false)} variant="outline">
                    Fermer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Informations Client</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nom:</strong> {selectedQuote.clientName}</div>
                    <div><strong>Email:</strong> {selectedQuote.clientEmail}</div>
                    <div><strong>Téléphone:</strong> {selectedQuote.clientPhone}</div>
                    <div><strong>Type d'assurance:</strong> {selectedQuote.insuranceType}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Détails du Devis</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Statut:</strong> <Badge className={getStatusColor(selectedQuote.status)}>{selectedQuote.status}</Badge></div>
                    <div><strong>Date de création:</strong> {new Date(selectedQuote.dateCreation).toLocaleDateString('fr-FR')}</div>
                    <div><strong>Date d'expiration:</strong> {new Date(selectedQuote.dateExpiration).toLocaleDateString('fr-FR')}</div>
                    <div><strong>Assigné à:</strong> {agents.find(a => a.id === selectedQuote.assignedTo)?.name || 'Non assigné'}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Items du Devis</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3">Description</th>
                        <th className="text-right p-3">Qté</th>
                        <th className="text-right p-3">Prix unitaire</th>
                        <th className="text-right p-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedQuote.items.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-3">{item.description}</td>
                          <td className="p-3 text-right">{item.quantity}</td>
                          <td className="p-3 text-right">{item.unitPrice.toLocaleString()} DHS</td>
                          <td className="p-3 text-right font-medium">{item.total.toLocaleString()} DHS</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t">
                      <tr>
                        <td colSpan={3} className="p-3 text-right font-medium">Sous-total:</td>
                        <td className="p-3 text-right font-medium">{selectedQuote.subtotal.toLocaleString()} DHS</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-3 text-right">TVA (10%):</td>
                        <td className="p-3 text-right">{selectedQuote.tax.toLocaleString()} DHS</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-3 text-right font-bold">Total:</td>
                        <td className="p-3 text-right font-bold text-lg">{selectedQuote.total.toLocaleString()} DHS</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {selectedQuote.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Notes</h3>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedQuote.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuotesManager;
