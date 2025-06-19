
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, TrendingUp, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Leads ce mois', value: '127', change: '+12%', icon: Mail, color: 'text-blue-600' },
    { title: 'Nouveaux clients', value: '23', change: '+8%', icon: Users, color: 'text-green-600' },
    { title: 'Devis en cours', value: '45', change: '+15%', icon: FileText, color: 'text-orange-600' },
    { title: 'CA mensuel', value: '156 000 DH', change: '+22%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const recentLeads = [
    { name: 'Ahmed Benali', email: 'ahmed@email.com', type: 'Auto', status: 'Nouveau', time: '2h' },
    { name: 'Fatima Zahra', email: 'fatima@email.com', type: 'Habitation', status: 'Contacté', time: '4h' },
    { name: 'Mohamed Alami', email: 'mohamed@email.com', type: 'Santé', status: 'Devis envoyé', time: '6h' },
  ];

  const upcomingTasks = [
    { task: 'Rappel client M. Bennani', type: 'call', time: '14:30' },
    { task: 'RDV Mme Alaoui', type: 'meeting', time: '16:00' },
    { task: 'Suivi devis auto', type: 'follow', time: '17:30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Tableau de Bord</h2>
        <p className="text-axa-gray">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-axa-gray mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-axa-gray-dark">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Leads Récents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-axa-gray-dark">{lead.name}</p>
                    <p className="text-sm text-axa-gray">{lead.email}</p>
                    <p className="text-xs text-axa-gray">{lead.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {lead.status}
                    </span>
                    <p className="text-xs text-axa-gray mt-1">il y a {lead.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Tâches à Venir</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-axa-red rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-axa-gray-dark">{task.task}</p>
                  </div>
                  <span className="text-sm text-axa-gray">{task.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            <span>Alertes & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-orange-800">• 3 contrats arrivent à échéance ce mois</p>
            <p className="text-sm text-orange-800">• 5 devis en attente de réponse depuis plus de 7 jours</p>
            <p className="text-sm text-orange-800">• Nouvelle campagne Facebook génère 15% de leads en plus</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
