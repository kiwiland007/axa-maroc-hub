
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, TrendingUp, Mail, Phone, Calendar, AlertCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Leads ce mois', value: '127', change: '+12%', icon: Mail, color: 'text-blue-600', trend: 'up' },
    { title: 'Nouveaux clients', value: '23', change: '+8%', icon: Users, color: 'text-green-600', trend: 'up' },
    { title: 'Devis en cours', value: '45', change: '+15%', icon: FileText, color: 'text-orange-600', trend: 'up' },
    { title: 'CA mensuel', value: '156 000 DH', change: '+22%', icon: TrendingUp, color: 'text-purple-600', trend: 'up' },
  ]);

  const [recentLeads, setRecentLeads] = useState([
    { id: 1, name: 'Ahmed Benali', email: 'ahmed@email.com', type: 'Auto', status: 'Nouveau', time: '2h', phone: '+212 661-234-567' },
    { id: 2, name: 'Fatima Zahra', email: 'fatima@email.com', type: 'Habitation', status: 'Contacté', time: '4h', phone: '+212 662-345-678' },
    { id: 3, name: 'Mohamed Alami', email: 'mohamed@email.com', type: 'Santé', status: 'Devis envoyé', time: '6h', phone: '+212 663-456-789' },
    { id: 4, name: 'Aicha Bennani', email: 'aicha@email.com', type: 'Prévoyance', status: 'Nouveau', time: '1h', phone: '+212 664-567-890' },
    { id: 5, name: 'Youssef Alaoui', email: 'youssef@email.com', type: 'Auto', status: 'Suivi', time: '8h', phone: '+212 665-678-901' },
  ]);

  const [upcomingTasks] = useState([
    { id: 1, task: 'Rappel client M. Bennani', type: 'call', time: '14:30', priority: 'high' },
    { id: 2, task: 'RDV Mme Alaoui', type: 'meeting', time: '16:00', priority: 'medium' },
    { id: 3, task: 'Suivi devis auto', type: 'follow', time: '17:30', priority: 'low' },
    { id: 4, task: 'Présentation produits entreprise', type: 'meeting', time: '09:00', priority: 'high' },
  ]);

  const handleContactLead = (leadId: number, method: 'call' | 'email') => {
    const lead = recentLeads.find(l => l.id === leadId);
    if (lead) {
      if (method === 'call') {
        toast.success(`Appel vers ${lead.name} - ${lead.phone}`);
      } else {
        toast.success(`Email envoyé à ${lead.name}`);
      }
      
      // Mettre à jour le statut
      setRecentLeads(prev => 
        prev.map(l => 
          l.id === leadId 
            ? { ...l, status: method === 'call' ? 'Contacté' : 'Email envoyé' }
            : l
        )
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800';
      case 'Contacté': return 'bg-green-100 text-green-800';
      case 'Devis envoyé': return 'bg-orange-100 text-orange-800';
      case 'Email envoyé': return 'bg-purple-100 text-purple-800';
      case 'Suivi': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Tableau de Bord</h2>
          <p className="text-axa-gray">Vue d'ensemble de votre activité</p>
        </div>
        <Button 
          onClick={() => window.open('/', '_blank')}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Eye className="h-4 w-4" />
          <span>Voir le site public</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-axa-gray mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-axa-gray-dark">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
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
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-axa-gray-dark">{lead.name}</p>
                    <p className="text-sm text-axa-gray">{lead.email}</p>
                    <p className="text-xs text-axa-gray">{lead.type} • {lead.phone}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <p className="text-xs text-axa-gray">il y a {lead.time}</p>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactLead(lead.id, 'call')}
                        className="px-2 py-1 h-6"
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactLead(lead.id, 'email')}
                        className="px-2 py-1 h-6"
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
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
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-axa-gray-dark">{task.task}</p>
                    <p className="text-xs text-axa-gray capitalize">Priorité: {task.priority}</p>
                  </div>
                  <span className="text-sm text-axa-gray font-medium">{task.time}</span>
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
            <p className="text-sm text-orange-800">• Rappel: Formation produits AXA demain à 14h</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
