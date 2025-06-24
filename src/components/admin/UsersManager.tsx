import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  UserCog, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Key,
  Shield,
  Mail,
  Phone,
  Calendar,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import PasswordGenerator from './PasswordGenerator';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: 'admin' | 'agent' | 'manager' | 'viewer';
  statut: 'actif' | 'inactif' | 'suspendu';
  dateCreation: string;
  derniereConnexion?: string;
  permissions: string[];
}

const UsersManager = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      nom: 'Admin',
      prenom: 'Super',
      email: 'admin@moumentechnique.ma',
      telephone: '+212 661234567',
      role: 'admin',
      statut: 'actif',
      dateCreation: '2023-01-15',
      derniereConnexion: '2023-12-15T10:30:00',
      permissions: ['all']
    },
    {
      id: '2',
      nom: 'Alami',
      prenom: 'Hassan',
      email: 'h.alami@moumentechnique.ma',
      telephone: '+212 662345678',
      role: 'agent',
      statut: 'actif',
      dateCreation: '2023-03-10',
      derniereConnexion: '2023-12-14T16:45:00',
      permissions: ['leads', 'clients', 'quotes']
    },
    {
      id: '3',
      nom: 'Bennani',
      prenom: 'Aicha',
      email: 'a.bennani@moumentechnique.ma',
      role: 'manager',
      statut: 'actif',
      dateCreation: '2023-02-20',
      derniereConnexion: '2023-12-13T14:20:00',
      permissions: ['leads', 'clients', 'quotes', 'analytics']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [newUser, setNewUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'agent' as User['role'],
    permissions: [] as string[]
  });

  const roles = [
    { id: 'admin', name: 'Administrateur', color: 'bg-red-100 text-red-800' },
    { id: 'manager', name: 'Manager', color: 'bg-purple-100 text-purple-800' },
    { id: 'agent', name: 'Agent Commercial', color: 'bg-blue-100 text-blue-800' },
    { id: 'viewer', name: 'Observateur', color: 'bg-gray-100 text-gray-800' }
  ];

  const availablePermissions = [
    { id: 'leads', name: 'Gestion des Leads' },
    { id: 'clients', name: 'Gestion des Clients' },
    { id: 'quotes', name: 'Gestion des Devis' },
    { id: 'content', name: 'Gestion du Contenu' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'users', name: 'Gestion des Utilisateurs' },
    { id: 'settings', name: 'Paramètres Système' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.id === role);
    return roleData?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-gray-100 text-gray-800';
      case 'suspendu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateUser = () => {
    if (!newUser.nom || !newUser.prenom || !newUser.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      statut: 'actif',
      dateCreation: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      role: 'agent',
      permissions: []
    });
    setShowCreateForm(false);
    toast.success('Utilisateur créé avec succès');
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setShowEditForm(false);
    setEditingUser(null);
    toast.success('Utilisateur modifié avec succès');
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    }
  };

  const updateUserStatus = (userId: string, newStatus: User['statut']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, statut: newStatus } : user
    ));
    toast.success('Statut utilisateur mis à jour');
  };

  const resetUserPassword = (userId: string) => {
    setSelectedUser(users.find(u => u.id === userId) || null);
    setShowPasswordGenerator(true);
  };

  const usersByRole = {
    admin: users.filter(u => u.role === 'admin').length,
    manager: users.filter(u => u.role === 'manager').length,
    agent: users.filter(u => u.role === 'agent').length,
    viewer: users.filter(u => u.role === 'viewer').length
  };

  const updatePermissions = (userId: string, permissions: string[]) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, permissions } : user
    ));
    toast.success('Permissions mises à jour');
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCog className="h-6 w-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{users.length}</div>
                <div className="text-xs text-gray-600">Total Utilisateurs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-red-500" />
              <div>
                <div className="text-xl font-bold">{usersByRole.admin}</div>
                <div className="text-xs text-gray-600">Administrateurs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCog className="h-6 w-6 text-purple-500" />
              <div>
                <div className="text-xl font-bold">{usersByRole.manager}</div>
                <div className="text-xs text-gray-600">Managers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCog className="h-6 w-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{usersByRole.agent}</div>
                <div className="text-xs text-gray-600">Agents</div>
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
              <UserCog className="h-5 w-5" />
              <span>Gestion des Utilisateurs</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Nouvel Utilisateur
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
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Tous les rôles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Liste des utilisateurs */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {user.prenom} {user.nom}
                      </h3>
                      <Badge className={getRoleColor(user.role)}>
                        {roles.find(r => r.id === user.role)?.name}
                      </Badge>
                      <Badge className={getStatusColor(user.statut)}>
                        {user.statut}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.telephone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{user.telephone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Créé le {new Date(user.dateCreation).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    {user.derniereConnexion && (
                      <div className="text-xs text-gray-500">
                        Dernière connexion: {new Date(user.derniereConnexion).toLocaleString('fr-FR')}
                      </div>
                    )}
                    <div className="mt-2">
                      <div className="text-xs text-gray-600 mb-1">Permissions:</div>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.includes('all') ? (
                          <Badge variant="outline" className="text-xs">Toutes les permissions</Badge>
                        ) : (
                          user.permissions.map(permission => {
                            const permissionData = availablePermissions.find(p => p.id === permission);
                            return (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permissionData?.name || permission}
                              </Badge>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setEditingUser({ ...user });
                        setShowEditForm(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => resetUserPassword(user.id)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <select
                      value={user.statut}
                      onChange={(e) => updateUserStatus(user.id, e.target.value as User['statut'])}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                      <option value="suspendu">Suspendu</option>
                    </select>
                    {user.role !== 'admin' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun utilisateur trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal générateur de mot de passe */}
      {showPasswordGenerator && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Changer le mot de passe - {selectedUser.prenom} {selectedUser.nom}</CardTitle>
              </CardHeader>
              <CardContent>
                <PasswordGenerator 
                  onPasswordGenerated={(password) => {
                    console.log(`Nouveau mot de passe généré pour ${selectedUser.email}: ${password}`);
                  }}
                />
                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowPasswordGenerator(false);
                      setSelectedUser(null);
                    }}
                  >
                    Fermer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Modal création utilisateur */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Créer un Nouvel Utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={newUser.prenom}
                    onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={newUser.nom}
                    onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={newUser.telephone}
                    onChange={(e) => setNewUser({...newUser, telephone: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="role">Rôle *</Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value as User['role']})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map(permission => (
                    <label key={permission.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newUser.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewUser({
                              ...newUser,
                              permissions: [...newUser.permissions, permission.id]
                            });
                          } else {
                            setNewUser({
                              ...newUser,
                              permissions: newUser.permissions.filter(p => p !== permission.id)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button onClick={handleCreateUser} className="bg-blue-600 hover:bg-blue-700">
                  Créer l'Utilisateur
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal détails utilisateur */}
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Détails de l'Utilisateur - {selectedUser.prenom} {selectedUser.nom}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowDetails(false)}>
                  Fermer
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informations Personnelles</h3>
                  <div className="space-y-2">
                    <div><strong>Nom complet:</strong> {selectedUser.prenom} {selectedUser.nom}</div>
                    <div><strong>Email:</strong> {selectedUser.email}</div>
                    {selectedUser.telephone && <div><strong>Téléphone:</strong> {selectedUser.telephone}</div>}
                    <div><strong>Rôle:</strong> <Badge className={getRoleColor(selectedUser.role)}>{roles.find(r => r.id === selectedUser.role)?.name}</Badge></div>
                    <div><strong>Statut:</strong> <Badge className={getStatusColor(selectedUser.statut)}>{selectedUser.statut}</Badge></div>
                    <div><strong>Date de création:</strong> {new Date(selectedUser.dateCreation).toLocaleDateString('fr-FR')}</div>
                    {selectedUser.derniereConnexion && <div><strong>Dernière connexion:</strong> {new Date(selectedUser.derniereConnexion).toLocaleString('fr-FR')}</div>}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Permissions</h3>
                  <div className="space-y-2">
                    {selectedUser.permissions.includes('all') ? (
                      <Badge variant="outline">Toutes les permissions</Badge>
                    ) : (
                      selectedUser.permissions.map(permission => {
                        const permissionData = availablePermissions.find(p => p.id === permission);
                        return (
                          <Badge key={permission} variant="outline">{permissionData?.name || permission}</Badge>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 pt-4 border-t">
                <Button onClick={() => {
                  setEditingUser({ ...selectedUser });
                  setShowEditForm(true);
                }} className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline" onClick={() => resetUserPassword(selectedUser.id)}>
                  <Key className="h-4 w-4 mr-2" />
                  Réinitialiser le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal édition utilisateur */}
      {showEditForm && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Modifier l'Utilisateur - {editingUser.prenom} {editingUser.nom}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editPrenom">Prénom</Label>
                  <Input
                    id="editPrenom"
                    value={editingUser.prenom}
                    onChange={(e) => setEditingUser({...editingUser, prenom: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="editNom">Nom</Label>
                  <Input
                    id="editNom"
                    value={editingUser.nom}
                    onChange={(e) => setEditingUser({...editingUser, nom: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="editTelephone">Téléphone</Label>
                  <Input
                    id="editTelephone"
                    value={editingUser.telephone || ''}
                    onChange={(e) => setEditingUser({...editingUser, telephone: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="editRole">Rôle</Label>
                  <select
                    id="editRole"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value as User['role']})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map(permission => (
                    <label key={permission.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingUser.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditingUser({
                              ...editingUser,
                              permissions: [...editingUser.permissions, permission.id]
                            });
                          } else {
                            setEditingUser({
                              ...editingUser,
                              permissions: editingUser.permissions.filter(p => p !== permission.id)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button onClick={handleEditUser} className="bg-blue-600 hover:bg-blue-700">
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setEditingUser(null)}>
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

export default UsersManager;
