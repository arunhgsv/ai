import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, Database, AlertTriangle, Activity, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSequences: 15847392,
    activeVariants: 247,
    countriesTracked: 195,
    lastUpdate: new Date().toISOString()
  });

  const [variantData] = useState([
    { name: 'BA.5', value: 35.2, color: '#3b82f6' },
    { name: 'XBB.1.5', value: 28.7, color: '#10b981' },
    { name: 'BQ.1.1', value: 15.3, color: '#f59e0b' },
    { name: 'BA.2.75', value: 12.1, color: '#ef4444' },
    { name: 'Others', value: 8.7, color: '#8b5cf6' }
  ]);

  const [mutationTrends] = useState([
    { date: '2024-01', mutations: 145, severity: 'low' },
    { date: '2024-02', mutations: 167, severity: 'medium' },
    { date: '2024-03', mutations: 189, severity: 'medium' },
    { date: '2024-04', mutations: 203, severity: 'high' },
    { date: '2024-05', mutations: 234, severity: 'high' },
    { date: '2024-06', mutations: 256, severity: 'critical' }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'New Spike Mutation Detected',
      description: 'L452R mutation showing increased prevalence in European samples',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Weekly Surveillance Report',
      description: 'Global variant distribution analysis completed',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'critical',
      title: 'Potential Immune Escape Variant',
      description: 'New combination of mutations detected in Asian lineages',
      timestamp: '3 days ago'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sequences</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSequences.toLocaleString()}</p>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">From GISAID & NCBI</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Variants</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeVariants}</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Currently circulating</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Countries Tracked</p>
              <p className="text-2xl font-bold text-gray-900">{stats.countriesTracked}</p>
            </div>
            <Globe className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Global surveillance</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Level</p>
              <p className="text-2xl font-bold text-orange-600">Medium</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Current assessment</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mutation Trends */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mutation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mutationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mutations" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Variant Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Variant Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={variantData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {variantData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${
                  alert.type === 'critical' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Source Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'GISAID', status: 'online', lastSync: '5 min ago' },
            { name: 'NCBI', status: 'online', lastSync: '12 min ago' },
            { name: 'UniProt', status: 'online', lastSync: '8 min ago' },
            { name: 'PDB', status: 'online', lastSync: '15 min ago' }
          ].map((source) => (
            <div key={source.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{source.name}</p>
                <p className="text-xs text-gray-500">{source.lastSync}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                source.status === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;