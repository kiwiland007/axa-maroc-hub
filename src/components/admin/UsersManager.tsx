import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  Settings,
  Mail,
  Phone,
  Calendar,
  Key,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'agent' | 'manager' | 'viewer';
  statut: 'actif' | 'inactif' | 'suspendu';
  dateCreation: string;
  dernierAccess: string;
  permissions: string[];
}

const UsersManager = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      nom: 'Admin',
      prenom: 'Système',
      email: 'admin@moumentechnique.ma',
      telephone: '+212 5XX-XXX-XXX',
      role: 'admin',
      statut: 'actif',
      dateCreation: '2023-01-01',
      dernierAccess: '2024-01-20',
      permissions: ['all']
    },
    {
      id: '2',
      nom: 'Benali',
      prenom: 'Mohamed',
      email: 'mohamed.benali@moumentechnique.ma',
      telephone: '+212 661234567',
      role: 'agent',
      statut: 'actif',
      dateCreation: '2023-06-15',
      dernierAccess: '2024-01-19',
      permissions: ['clients', 'leads', 'quotes']
    },
    {
      id: '3',
      nom: 'El Fassi',
      prenom: 'Aicha',
      email: 'aicha.elfassi@moumentechnique.ma',
      telephone: '+212 662345678',
      role: 'manager',
      statut: 'actif',
      dateCreation: '2023-03-10',
      dernierAccess: '2024-01-18',
      permissions: ['clients', 'leads', 'quotes', 'analytics', 'users']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'agent' as User['role'],
    permissions: [] as string[]
  });

  const roles = [
    { value: 'admin', label: 'Administrateur', color: 'bg-red-100 text-red-800' },
    { value: 'manager', label: 'Manager', color: 'bg-purple-100 text-purple-800' },
    { value: 'agent', label: 'Agent', color: 'bg-blue-100 text-blue-800' },
    { value: 'viewer', label: 'Lecteur', color: 'bg-gray-100 text-gray-800' }
  ];

  const statusOptions = [
    { value: 'actif', label: 'Actif', color: 'bg-green-100 text-green-800' },
    { value: 'inactif', label: 'Inactif', color: 'bg-gray-100 text-gray-800' },
    { value: 'suspendu', label: 'Suspendu', color: 'bg-red-100 text-red-800' }
  ];

  const permissions = [
    { id: 'clients', label: 'Gestion clients', description: 'Créer, modifier et supprimer des clients' },
    { id: 'leads', label: 'Gestion leads', description: 'Gérer les prospects et leads' },
    { id: 'quotes', label: 'Devis et contrats', description: 'Créer et gérer les devis' },
    { id: 'content', label: 'Gestion contenu', description: 'Modifier le contenu du site' },
    { id: 'analytics', label: 'Analytics', description: 'Accès aux rapports et statistiques' },
    { id: 'users', label: 'Gestion utilisateurs', description: 'Gérer les comptes utilisateurs' },
    { id: 'settings', label: 'Paramètres', description: 'Configuration système' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.statut === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    return roles.find(r => r.value === role)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const handleAddUser = () => {
    if (!newUser.nom || !newUser.prenom || !newUser.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      statut: 'actif',
      dateCreation: new Date().toISOString().split('T')[0],
      dernierAccess: '',
      permissions: newUser.permissions
    };

    setUsers([...users, user]);
    setNewUser({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      role: 'agent' as User['role'],
      permissions: []
    });
    setShowAddForm(false);
    toast.success('Utilisateur ajouté avec succès');
  };

  const updateUserStatus = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, statut: newStatus as User['statut'] } : user
    ));
    toast.success('Statut utilisateur mis à jour');
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Utilisateur supprimé');
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="text-sm text-gray-600">Total utilisateurs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.statut === 'actif').length}
                </div>
                <div className="text-sm text-gray-600">Utilisateurs actifs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === 'admin' || u.role === 'manager').length}
                </div>
                <div className="text-sm text-gray-600">Administrateurs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.statut === 'suspendu').length}
                </div>
                <div className="text-sm text-gray-600">Comptes suspendus</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gestion des utilisateurs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Gestion des Utilisateurs</span>
            </CardTitle>
            <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Nouvel utilisateur
            </Button>
          </div>
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
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Tous les rôles</option>
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
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

          {/* Liste des utilisateurs */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {user.prenom} {user.nom}
                      </h3>
                      <Badge className={getRoleColor(user.role)}>
                        {roles.find(r => r.value === user.role)?.label}
                      </Badge>
                      <Badge className={getStatusColor(user.statut)}>
                        {statusOptions.find(s => s.value === user.statut)?.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{user.telephone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Créé le {new Date(user.dateCreation).toLocaleDateString('fr-FR')}</span>
                      </div>
                      {user.dernierAccess && (
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>Dernier accès: {new Date(user.dernierAccess).toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {user.permissions.includes('all') ? (
                        <Badge variant="outline" className="text-xs">Toutes permissions</Badge>
                      ) : (
                        user.permissions.map(perm => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {permissions.find(p => p.id === perm)?.label}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Key className="h-4 w-4" />
                    </Button>
                    {user.role !== 'admin' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteUser(user.id)}
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
        </CardContent>
      </Card>

      {/* Formulaire d'ajout d'utilisateur */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvel utilisateur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  value={newUser.prenom}
                  onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  value={newUser.nom}
                  onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={newUser.telephone}
                  onChange={(e) => setNewUser({...newUser, telephone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="role">Rôle</Label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as User['role']})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {permissions.map(permission => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id={permission.id}
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
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor={permission.id} className="font-medium text-sm">
                        {permission.label}
                      </label>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                Créer l'utilisateur
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UsersManager;
