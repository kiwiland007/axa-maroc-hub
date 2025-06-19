
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, FileText, Calendar, Download } from 'lucide-react';
import { toast } from 'sonner';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('last6months');

  const kpiData = [
    { title: 'Revenus Mensuels', value: '156 000 DH', change: '+22%', trend: 'up', icon: DollarSign },
    { title: 'Nouveaux Clients', value: '23', change: '+8%', trend: 'up', icon: Users },
    { title: 'Taux de Conversion', value: '18.5%', change: '+2.3%', trend: 'up', icon: TrendingUp },
    { title: 'Devis Générés', value: '127', change: '+15%', trend: 'up', icon: FileText }
  ];

  const monthlyRevenue = [
    { month: 'Juil', revenue: 125000, contracts: 18, leads: 95 },
    { month: 'Août', revenue: 142000, contracts: 22, leads: 110 },
    { month: 'Sept', revenue: 138000, contracts: 20, leads: 105 },
    { month: 'Oct', revenue: 155000, contracts: 25, leads: 125 },
    { month: 'Nov', revenue: 148000, contracts: 21, leads: 115 },
    { month: 'Déc', revenue: 162000, contracts: 28, leads: 140 },
    { month: 'Jan', revenue: 156000, contracts: 23, leads: 127 }
  ];

  const productPerformance = [
    { name: 'Auto', value: 45, revenue: 85000, color: '#dc2626' },
    { name: 'Habitation', value: 25, revenue: 52000, color: '#ea580c' },
    { name: 'Santé', value: 15, revenue: 38000, color: '#d97706' },
    { name: 'Prévoyance', value: 10, revenue: 25000, color: '#ca8a04' },
    { name: 'Professionnelle', value: 5, revenue: 15000, color: '#65a30d' }
  ];

  const leadSources = [
    { source: 'Site Web', leads: 45, conversion: 22 },
    { source: 'Facebook Ads', leads: 38, conversion: 18 },
    { source: 'Google Ads', leads: 25, conversion: 25 },
    { source: 'Référencement', leads: 19, conversion: 35 },
    { source: 'Bouche-à-oreille', leads: 15, conversion: 40 }
  ];

  const exportReport = () => {
    toast.success('Rapport analytique exporté avec succès');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-axa-gray-dark mb-2">Analytics & Rapports</h2>
          <p className="text-axa-gray">KPIs business et analyse des performances</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30days">30 derniers jours</SelectItem>
              <SelectItem value="last3months">3 derniers mois</SelectItem>
              <SelectItem value="last6months">6 derniers mois</SelectItem>
              <SelectItem value="lastyear">Dernière année</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-axa-gray mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-axa-gray-dark">{kpi.value}</p>
                  <p className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </p>
                </div>
                <kpi.icon className="h-8 w-8 text-axa-red" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Évolution des revenus */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `${(value as number).toLocaleString()} DH` : value,
                  name === 'revenue' ? 'Revenus' : 'Contrats'
                ]} />
                <Line type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={3} />
                <Line type="monotone" dataKey="contracts" stroke="#ea580c" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance par produit */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Produit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {productPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Part de marché']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sources de leads */}
      <Card>
        <CardHeader>
          <CardTitle>Performance des Sources de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadSources}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#dc2626" name="Leads générés" />
              <Bar dataKey="conversion" fill="#ea580c" name="Taux conversion %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tableaux détaillés */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Produits par Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productPerformance.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: product.color }}></div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{product.revenue.toLocaleString()} DH</div>
                    <div className="text-sm text-gray-600">{product.value}% du total</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion par Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{source.source}</span>
                  <div className="text-right">
                    <div className="font-semibold">{source.leads} leads</div>
                    <div className="text-sm text-green-600">{source.conversion}% conversion</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes et insights */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <TrendingUp className="h-5 w-5" />
            <span>Insights & Recommandations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-800">
            <p>📈 <strong>Croissance exceptionnelle</strong> : +22% de revenus ce mois vs le mois dernier</p>
            <p>🎯 <strong>Opportunité</strong> : Le taux de conversion Google Ads (25%) est excellent, considérez augmenter le budget</p>
            <p>⚠️ <strong>Attention</strong> : Les leads Facebook Ads baissent (-5%), vérifiez les campagnes</p>
            <p>🏆 <strong>Performance</strong> : Le bouche-à-oreille a le meilleur taux de conversion (40%)</p>
            <p>📊 <strong>Prévision</strong> : Objectif mensuel de 170K DH atteignable avec la tendance actuelle</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
