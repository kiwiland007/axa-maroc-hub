
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Eye, Edit, Download, Trash2, Send, Calculator, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Quote {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  productType: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  amount: number;
  validUntil: string;
  createdAt: string;
  description: string;
  items: QuoteItem[];
}

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const QuotesManager = () => {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      clientName: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      phone: '+212 6XX-XXX-XXX',
      productType: 'Assurance Auto',
      status: 'sent',
      amount: 2500,
      validUntil: '2024-02-15',
      createdAt: '2024-01-15',
      description: 'Assurance tous risques pour véhicule Renault Clio 2022',
      items: [
        { id: '1', description: 'Assurance tous risques', quantity: 1, unitPrice: 2000, total: 2000 },
        { id: '2', description: 'Assistance dépannage 24h/7j', quantity: 1, unitPrice: 500, total: 500 }
      ]
    },
    {
      id: '2',
      clientName: 'Fatima Alami',
      email: 'fatima.alami@email.com',
      phone: '+212 6XX-XXX-XXX',
      productType: 'Assurance Habitation',
      status: 'draft',
      amount: 1800,
      validUntil: '2024-02-20',
      createdAt: '2024-01-18',
      description: 'Assurance multirisque habitation pour appartement 120m²',
      items: [
        { id: '1', description: 'Multirisque habitation', quantity: 1, unitPrice: 1500, total: 1500 },
        { id: '2', description: 'Garantie mobilier', quantity: 1, unitPrice: 300, total: 300 }
      ]
    }
  ]);

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isNewQuoteModalOpen, setIsNewQuoteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newQuote, setNewQuote] = useState<Partial<Quote>>({
    clientName: '',
    email: '',
    phone: '',
    productType: '',
    amount: 0,
    validUntil: '',
    description: '',
    items: []
  });

  const [newItem, setNewItem] = useState<Partial<QuoteItem>>({
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'sent': return 'Envoyé';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      default: return status;
    }
  };

  const calculateTotal = (items: QuoteItem[]) => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const addItemToNewQuote = () => {
    if (!newItem.description || !newItem.quantity || !newItem.unitPrice) {
      toast.error('Veuillez remplir tous les champs de l\'article');
      return;
    }

    const item: QuoteItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice
    };

    const updatedItems = [...(newQuote.items || []), item];
    setNewQuote({
      ...newQuote,
      items: updatedItems,
      amount: calculateTotal(updatedItems)
    });

    setNewItem({ description: '', quantity: 1, unitPrice: 0 });
    toast.success('Article ajouté au devis');
  };

  const removeItemFromNewQuote = (itemId: string) => {
    const updatedItems = (newQuote.items || []).filter(item => item.id !== itemId);
    setNewQuote({
      ...newQuote,
      items: updatedItems,
      amount: calculateTotal(updatedItems)
    });
    toast.success('Article supprimé du devis');
  };

  const createQuote = () => {
    if (!newQuote.clientName || !newQuote.email || !newQuote.productType || !newQuote.validUntil) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!newQuote.items || newQuote.items.length === 0) {
      toast.error('Veuillez ajouter au moins un article au devis');
      return;
    }

    const quote: Quote = {
      id: Date.now().toString(),
      clientName: newQuote.clientName,
      email: newQuote.email,
      phone: newQuote.phone || '',
      productType: newQuote.productType,
      status: 'draft',
      amount: newQuote.amount || 0,
      validUntil: newQuote.validUntil,
      createdAt: new Date().toISOString().split('T')[0],
      description: newQuote.description || '',
      items: newQuote.items
    };

    setQuotes([...quotes, quote]);
    setIsNewQuoteModalOpen(false);
    setNewQuote({
      clientName: '',
      email: '',
      phone: '',
      productType: '',
      amount: 0,
      validUntil: '',
      description: '',
      items: []
    });
    toast.success('Devis créé avec succès !');
  };

  const updateQuoteStatus = (quoteId: string, newStatus: Quote['status']) => {
    setQuotes(quotes.map(quote => 
      quote.id === quoteId ? { ...quote, status: newStatus } : quote
    ));
    toast.success('Statut du devis mis à jour');
  };

  const deleteQuote = (quoteId: string) => {
    setQuotes(quotes.filter(quote => quote.id !== quoteId));
    toast.success('Devis supprimé');
  };

  const sendQuote = (quoteId: string) => {
    updateQuoteStatus(quoteId, 'sent');
    toast.success('Devis envoyé au client');
  };

  const downloadQuote = (quote: Quote) => {
    // Simulation du téléchargement PDF
    toast.success(`Téléchargement du devis pour ${quote.clientName}`);
  };

  const viewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsViewModalOpen(true);
  };

  const editQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setNewQuote(quote);
    setIsEditModalOpen(true);
  };

  const stats = {
    totalQuotes: quotes.length,
    draftQuotes: quotes.filter(q => q.status === 'draft').length,
    sentQuotes: quotes.filter(q => q.status === 'sent').length,
    acceptedQuotes: quotes.filter(q => q.status === 'accepted').length,
    totalValue: quotes.reduce((sum, quote) => sum + quote.amount, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestion des Devis & Contrats</h2>
          <p className="text-gray-600">Créez, gérez et suivez vos devis d'assurance</p>
        </div>
        <Button 
          onClick={() => setIsNewQuoteModalOpen(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Devis
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Devis</p>
                <p className="text-2xl font-bold">{stats.totalQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold">{stats.draftQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Envoyés</p>
                <p className="text-2xl font-bold">{stats.sentQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Acceptés</p>
                <p className="text-2xl font-bold">{stats.acceptedQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Valeur Totale</p>
                <p className="text-2xl font-bold">{stats.totalValue.toLocaleString()} DH</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des devis */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Devis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Client</th>
                  <th className="text-left p-2">Produit</th>
                  <th className="text-left p-2">Montant</th>
                  <th className="text-left p-2">Statut</th>
                  <th className="text-left p-2">Validité</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{quote.clientName}</p>
                        <p className="text-sm text-gray-600">{quote.email}</p>
                      </div>
                    </td>
                    <td className="p-2">{quote.productType}</td>
                    <td className="p-2 font-semibold">{quote.amount.toLocaleString()} DH</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(quote.status)}>
                        {getStatusLabel(quote.status)}
                      </Badge>
                    </td>
                    <td className="p-2">{quote.validUntil}</td>
                    <td className="p-2">
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewQuote(quote)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editQuote(quote)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadQuote(quote)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {quote.status === 'draft' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendQuote(quote.id)}
                            className="text-blue-600"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteQuote(quote.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Nouveau Devis */}
      <Dialog open={isNewQuoteModalOpen} onOpenChange={setIsNewQuoteModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un Nouveau Devis</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nom du client *</Label>
                <Input
                  value={newQuote.clientName || ''}
                  onChange={(e) => setNewQuote({ ...newQuote, clientName: e.target.value })}
                  placeholder="Nom complet du client"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newQuote.email || ''}
                  onChange={(e) => setNewQuote({ ...newQuote, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Téléphone</Label>
                <Input
                  value={newQuote.phone || ''}
                  onChange={(e) => setNewQuote({ ...newQuote, phone: e.target.value })}
                  placeholder="+212 6XX-XXX-XXX"
                />
              </div>
              <div>
                <Label>Type de produit *</Label>
                <Select onValueChange={(value) => setNewQuote({ ...newQuote, productType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un produit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Assurance Auto">Assurance Auto</SelectItem>
                    <SelectItem value="Assurance Habitation">Assurance Habitation</SelectItem>
                    <SelectItem value="Assurance Santé">Assurance Santé</SelectItem>
                    <SelectItem value="Prévoyance">Prévoyance</SelectItem>
                    <SelectItem value="Épargne & Retraite">Épargne & Retraite</SelectItem>
                    <SelectItem value="Assurance Professionnelle">Assurance Professionnelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Valide jusqu'au *</Label>
              <Input
                type="date"
                value={newQuote.validUntil || ''}
                onChange={(e) => setNewQuote({ ...newQuote, validUntil: e.target.value })}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={newQuote.description || ''}
                onChange={(e) => setNewQuote({ ...newQuote, description: e.target.value })}
                placeholder="Description du devis..."
                rows={3}
              />
            </div>

            {/* Ajouter des articles */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Articles du devis</h4>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <Label>Description</Label>
                  <Input
                    value={newItem.description || ''}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Description de l'article"
                  />
                </div>
                <div>
                  <Label>Quantité</Label>
                  <Input
                    type="number"
                    value={newItem.quantity || 1}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label>Prix unitaire (DH)</Label>
                  <Input
                    type="number"
                    value={newItem.unitPrice || 0}
                    onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) })}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addItemToNewQuote} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>

              {/* Liste des articles */}
              {newQuote.items && newQuote.items.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium">Articles ajoutés:</h5>
                  {newQuote.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x {item.unitPrice.toLocaleString()} DH = {item.total.toLocaleString()} DH
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItemFromNewQuote(item.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      Total: {newQuote.amount?.toLocaleString()} DH
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewQuoteModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={createQuote} className="bg-red-500 hover:bg-red-600">
                Créer le Devis
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Visualisation */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Devis</DialogTitle>
          </DialogHeader>
          
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client</Label>
                  <p className="font-medium">{selectedQuote.clientName}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedQuote.email}</p>
                </div>
                <div>
                  <Label>Produit</Label>
                  <p>{selectedQuote.productType}</p>
                </div>
                <div>
                  <Label>Statut</Label>
                  <Badge className={getStatusColor(selectedQuote.status)}>
                    {getStatusLabel(selectedQuote.status)}
                  </Badge>
                </div>
              </div>

              {selectedQuote.description && (
                <div>
                  <Label>Description</Label>
                  <p>{selectedQuote.description}</p>
                </div>
              )}

              <div>
                <Label>Articles</Label>
                <div className="space-y-2">
                  {selectedQuote.items.map((item) => (
                    <div key={item.id} className="flex justify-between bg-gray-50 p-2 rounded">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-600">{item.quantity} x {item.unitPrice.toLocaleString()} DH</p>
                      </div>
                      <p className="font-medium">{item.total.toLocaleString()} DH</p>
                    </div>
                  ))}
                  <div className="text-right">
                    <p className="text-lg font-bold">Total: {selectedQuote.amount.toLocaleString()} DH</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotesManager;
