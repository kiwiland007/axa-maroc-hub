
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, TrendingUp, Shield, Phone, Mail, Calendar, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Clients Actifs',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Nouveaux Leads',
      value: '89',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Contrats Actifs',
      value: '2,156',
      change: '+15%',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Primes Collectées',
      value: '12.5M DHS',
      change: '+22%',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const monthlyData = [
    { month: 'Jan', contrats: 45, primes: 980000 },
    { month: 'Fév', contrats: 52, primes: 1120000 },
    { month: 'Mar', contrats: 48, primes: 1050000 },
    { month: 'Avr', contrats: 61, primes: 1340000 },
    { month: 'Mai', contrats: 55, primes: 1200000 },
    { month: 'Juin', contrats: 67, primes: 1450000 }
  ];

  const productData = [
    { name: 'Auto', value: 35, color: '#ef4444' },
    { name: 'Habitation', value: 25, color: '#3b82f6' },
    { name: 'Santé', value: 20, color: '#10b981' },
    { name: 'Prévoyance', value: 12, color: '#f59e0b' },
    { name: 'Autres', value: 8, color: '#8b5cf6' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'lead',
      message: 'Nouveau lead: Ahmed Benali - Assurance Auto',
      time: 'Il y a 5 min',
      icon: Phone,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'contract',
      message: 'Contrat signé: Fatima El Mansouri - Habitation',
      time: 'Il y a 15 min',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'message',
      message: 'Message reçu: Demande de devis santé',
      time: 'Il y a 32 min',
      icon: Mail,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Renouvellement à venir: 15 contrats ce mois',
      time: 'Il y a 1h',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} vs mois dernier</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des contrats */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Contrats</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="contrats" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par produit */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Produit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activités récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Activités Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métriques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Taux de Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">68.5%</div>
            <p className="text-sm text-gray-600">Leads → Clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valeur Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">5,820 DHS</div>
            <p className="text-sm text-gray-600">Prime par contrat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Satisfaction Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">4.8/5</div>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
