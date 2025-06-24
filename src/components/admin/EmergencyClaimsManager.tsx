
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Phone, 
  Clock, 
  MapPin, 
  FileText, 
  Camera,
  Save,
  Edit,
  Eye,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface EmergencyClaim {
  id: string;
  clientName: string;
  clientPhone: string;
  claimType: 'auto' | 'habitation' | 'sante' | 'autre';
  urgencyLevel: 'faible' | 'moyenne' | 'haute' | 'critique';
  description: string;
  location?: string;
  status: 'nouveau' | 'en_cours' | 'resolu' | 'ferme';
  dateCreation: string;
  assignedTo?: string;
  images?: string[];
  actions: Array<{
    id: string;
    description: string;
    timestamp: string;
    userId: string;
  }>;
}

const EmergencyClaimsManager = () => {
  const [claims, setClaims] = useState<EmergencyClaim[]>([
    {
      id: 'SIN-2023-001',
      clientName: 'Ahmed Benali',
      clientPhone: '+212 661234567',
      claimType: 'auto',
      urgencyLevel: 'haute',
      description: 'Accident de la route sur l\'autoroute Casablanca-Rabat. Véhicule immobilisé.',
      location: 'Autoroute A1, sortie Temara',
      status: 'en_cours',
      dateCreation: '2023-12-15T14:30:00',
      assignedTo: 'agent1',
      actions: [
        {
          id: '1',
          description: 'Sinistre déclaré par téléphone',
          timestamp: '2023-12-15T14:30:00',
          userId: 'system'
        },
        {
          id: '2',
          description: 'Expert assigné et en route',
          timestamp: '2023-12-15T14:45:00',
          userId: 'agent1'
        }
      ]
    }
  ]);

  const [emergencyConfig, setEmergencyConfig] = useState({
    phoneNumber: '+212 5XX-XXX-XXX',
    email: 'urgence@moumentechnique.ma',
    workingHours: '24h/24 - 7j/7',
    responseTime: '< 30 minutes',
    instructions: 'En cas d\'urgence, appelez immédiatement le numéro ci-dessus. Un expert sera dépêché sur place dans les plus brefs délais.'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [newClaim, setNewClaim] = useState({
    clientName: '',
    clientPhone: '',
    claimType: 'auto' as const,
    urgencyLevel: 'moyenne' as const,
    description: '',
    location: ''
  });

  const claimTypes = [
    { id: 'auto', name: 'Automobile', color: 'bg-blue-100 text-blue-800' },
    { id: 'habitation', name: 'Habitation', color: 'bg-green-100 text-green-800' },
    { id: 'sante', name: 'Santé', color: 'bg-red-100 text-red-800' },
    { id: 'autre', name: 'Autre', color: 'bg-gray-100 text-gray-800' }
  ];

  const urgencyLevels = [
    { id: 'faible', name: 'Faible', color: 'bg-green-100 text-green-800' },
    { id: 'moyenne', name: 'Moyenne', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'haute', name: 'Haute', color: 'bg-orange-100 text-orange-800' },
    { id: 'critique', name: 'Critique', color: 'bg-red-100 text-red-800' }
  ];

  const getUrgencyColor = (level: string) => {
    const urgency = urgencyLevels.find(u => u.id === level);
    return urgency?.color || 'bg-gray-100 text-gray-800';
  };

  const getClaimTypeColor = (type: string) => {
    const claimType = claimTypes.find(c => c.id === type);
    return claimType?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'resolu': return 'bg-green-100 text-green-800';
      case 'ferme': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveConfig = () => {
    setIsEditing(false);
    toast.success('Configuration d\'urgence mise à jour !');
  };

  const handleCreateClaim = () => {
    if (!newClaim.clientName || !newClaim.clientPhone || !newClaim.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const claim: EmergencyClaim = {
      id: `SIN-${new Date().getFullYear()}-${String(claims.length + 1).padStart(3, '0')}`,
      ...newClaim,
      status: 'nouveau',
      dateCreation: new Date().toISOString(),
      actions: [
        {
          id: '1',
          description: 'Sinistre créé manuellement',
          timestamp: new Date().toISOString(),
          userId: 'admin'
        }
      ]
    };

    setClaims([...claims, claim]);
    setNewClaim({
      clientName: '',
      clientPhone: '',
      claimType: 'auto',
      urgencyLevel: 'moyenne',
      description: '',
      location: ''
    });
    setShowClaimForm(false);
    toast.success('Sinistre créé avec succès');
  };

  const updateClaimStatus = (claimId: string, newStatus: EmergencyClaim['status']) => {
    setClaims(claims.map(claim => 
      claim.id === claimId 
        ? { 
            ...claim, 
            status: newStatus,
            actions: [
              ...claim.actions,
              {
                id: Date.now().toString(),
                description: `Statut changé vers: ${newStatus}`,
                timestamp: new Date().toISOString(),
                userId: 'admin'
              }
            ]
          }
        : claim
    ));
    toast.success('Statut du sinistre mis à jour');
  };

  const claimsByUrgency = {
    critique: claims.filter(c => c.urgencyLevel === 'critique').length,
    haute: claims.filter(c => c.urgencyLevel === 'haute').length,
    moyenne: claims.filter(c => c.urgencyLevel === 'moyenne').length,
    faible: claims.filter(c => c.urgencyLevel === 'faible').length
  };

  return (
    <div className="space-y-6">
      {/* Statistiques d'urgence */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <div className="text-xl font-bold text-red-600">{claimsByUrgency.critique}</div>
                <div className="text-xs text-red-700">Critiques</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <div>
                <div className="text-xl font-bold text-orange-600">{claimsByUrgency.haute}</div>
                <div className="text-xs text-orange-700">Haute Priorité</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-500" />
              <div>
                <div className="text-xl font-bold">{claimsByUrgency.moyenne}</div>
                <div className="text-xs text-gray-600">Priorité Moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-green-500" />
              <div>
                <div className="text-xl font-bold">{claims.length}</div>
                <div className="text-xs text-gray-600">Total Sinistres</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Urgence Sinistre */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Bloc Urgence Sinistre - Configuration</span>
            </CardTitle>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSaveConfig} className="bg-red-500 hover:bg-red-600">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-red-500 hover:bg-red-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium mb-2">Numéro d'urgence</Label>
              {isEditing ? (
                <Input
                  value={emergencyConfig.phoneNumber}
                  onChange={(e) => setEmergencyConfig({
                    ...emergencyConfig,
                    phoneNumber: e.target.value
                  })}
                  className="mt-1"
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-800">{emergencyConfig.phoneNumber}</span>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2">Email d'urgence</Label>
              {isEditing ? (
                <Input
                  value={emergencyConfig.email}
                  onChange={(e) => setEmergencyConfig({
                    ...emergencyConfig,
                    email: e.target.value
                  })}
                  className="mt-1"
                />
              ) : (
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <span className="text-gray-800">{emergencyConfig.email}</span>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2">Horaires de service</Label>
              {isEditing ? (
                <Input
                  value={emergencyConfig.workingHours}
                  onChange={(e) => setEmergencyConfig({
                    ...emergencyConfig,
                    workingHours: e.target.value
                  })}
                  className="mt-1"
                />
              ) : (
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <span className="text-gray-800">{emergencyConfig.workingHours}</span>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2">Temps de réponse</Label>
              {isEditing ? (
                <Input
                  value={emergencyConfig.responseTime}
                  onChange={(e) => setEmergencyConfig({
                    ...emergencyConfig,
                    responseTime: e.target.value
                  })}
                  className="mt-1"
                />
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="font-medium text-green-800">{emergencyConfig.responseTime}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2">Instructions d'urgence</Label>
            {isEditing ? (
              <Textarea
                value={emergencyConfig.instructions}
                onChange={(e) => setEmergencyConfig({
                  ...emergencyConfig,
                  instructions: e.target.value
                })}
                rows={3}
                className="mt-1"
              />
            ) : (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">{emergencyConfig.instructions}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gestion des sinistres */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Gestion des Sinistres d'Urgence</span>
            </CardTitle>
            <Button onClick={() => setShowClaimForm(true)} className="bg-red-500 hover:bg-red-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Sinistre
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{claim.id}</h3>
                    <Badge className={getUrgencyColor(claim.urgencyLevel)}>
                      {urgencyLevels.find(u => u.id === claim.urgencyLevel)?.name}
                    </Badge>
                    <Badge className={getClaimTypeColor(claim.claimType)}>
                      {claimTypes.find(c => c.id === claim.claimType)?.name}
                    </Badge>
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={claim.status}
                      onChange={(e) => updateClaimStatus(claim.id, e.target.value as EmergencyClaim['status'])}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="nouveau">Nouveau</option>
                      <option value="en_cours">En cours</option>
                      <option value="resolu">Résolu</option>
                      <option value="ferme">Fermé</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="space-y-2 text-sm">
                      <div><strong>Client:</strong> {claim.clientName}</div>
                      <div><strong>Téléphone:</strong> {claim.clientPhone}</div>
                      {claim.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{claim.location}</span>
                        </div>
                      )}
                      <div><strong>Description:</strong> {claim.description}</div>
                      <div className="text-xs text-gray-500">
                        Créé le {new Date(claim.dateCreation).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm">
                      <strong>Actions récentes:</strong>
                      <div className="mt-2 space-y-1">
                        {claim.actions.slice(-3).map((action) => (
                          <div key={action.id} className="text-xs bg-gray-50 p-2 rounded">
                            <div>{action.description}</div>
                            <div className="text-gray-500">
                              {new Date(action.timestamp).toLocaleString('fr-FR')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {claims.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun sinistre d'urgence enregistré
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal création sinistre */}
      {showClaimForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Nouveau Sinistre d'Urgence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nom du client *</Label>
                  <Input
                    id="clientName"
                    value={newClaim.clientName}
                    onChange={(e) => setNewClaim({...newClaim, clientName: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone">Téléphone *</Label>
                  <Input
                    id="clientPhone"
                    value={newClaim.clientPhone}
                    onChange={(e) => setNewClaim({...newClaim, clientPhone: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="claimType">Type de sinistre *</Label>
                  <select
                    id="claimType"
                    value={newClaim.claimType}
                    onChange={(e) => setNewClaim({...newClaim, claimType: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    {claimTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="urgencyLevel">Niveau d'urgence *</Label>
                  <select
                    id="urgencyLevel"
                    value={newClaim.urgencyLevel}
                    onChange={(e) => setNewClaim({...newClaim, urgencyLevel: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Lieu du sinistre</Label>
                <Input
                  id="location"
                  value={newClaim.location}
                  onChange={(e) => setNewClaim({...newClaim, location: e.target.value})}
                  placeholder="Adresse ou description du lieu"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description du sinistre *</Label>
                <Textarea
                  id="description"
                  value={newClaim.description}
                  onChange={(e) => setNewClaim({...newClaim, description: e.target.value})}
                  rows={4}
                  className="mt-1"
                  placeholder="Décrivez le sinistre en détail..."
                />
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button onClick={handleCreateClaim} className="bg-red-500 hover:bg-red-600">
                  Créer le Sinistre
                </Button>
                <Button variant="outline" onClick={() => setShowClaimForm(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmergencyClaimsManager;
