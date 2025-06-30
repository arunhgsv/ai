import React, { useState } from 'react';
import { Database, Globe, CheckCircle, AlertCircle, RefreshCw, ExternalLink, Download } from 'lucide-react';

const DataSources = () => {
  const [refreshing, setRefreshing] = useState({});

  const dataSources = [
    {
      id: 'gisaid',
      name: 'GISAID',
      description: 'Global Initiative on Sharing All Influenza Data',
      url: 'https://gisaid.org',
      status: 'online',
      lastSync: '2 minutes ago',
      totalRecords: '15,847,392',
      todayUpdates: '12,847',
      dataTypes: ['Genomic sequences', 'Metadata', 'Phylogenetic trees'],
      coverage: 'Global',
      updateFrequency: 'Real-time',
      apiStatus: 'Connected'
    },
    {
      id: 'ncbi',
      name: 'NCBI GenBank',
      description: 'National Center for Biotechnology Information',
      url: 'https://ncbi.nlm.nih.gov',
      status: 'online',
      lastSync: '5 minutes ago',
      totalRecords: '2,847,392',
      todayUpdates: '3,247',
      dataTypes: ['Nucleotide sequences', 'Protein sequences', 'Literature'],
      coverage: 'Global',
      updateFrequency: 'Daily',
      apiStatus: 'Connected'
    },
    {
      id: 'uniprot',
      name: 'UniProt',
      description: 'Universal Protein Resource',
      url: 'https://uniprot.org',
      status: 'online',
      lastSync: '8 minutes ago',
      totalRecords: '847,392',
      todayUpdates: '1,247',
      dataTypes: ['Protein sequences', 'Functional annotations', 'Structural data'],
      coverage: 'Global',
      updateFrequency: 'Weekly',
      apiStatus: 'Connected'
    },
    {
      id: 'pdb',
      name: 'Protein Data Bank',
      description: 'Repository of 3D structural data',
      url: 'https://rcsb.org',
      status: 'online',
      lastSync: '12 minutes ago',
      totalRecords: '1,247',
      todayUpdates: '3',
      dataTypes: ['3D structures', 'Experimental data', 'Validation reports'],
      coverage: 'Global',
      updateFrequency: 'Weekly',
      apiStatus: 'Connected'
    },
    {
      id: 'outbreak',
      name: 'outbreak.info',
      description: 'COVID-19 and SARS-CoV-2 data portal',
      url: 'https://outbreak.info',
      status: 'online',
      lastSync: '3 minutes ago',
      totalRecords: '5,079,251',
      todayUpdates: '8,947',
      dataTypes: ['Variant tracking', 'Mutation prevalence', 'Epidemiological data'],
      coverage: 'Global',
      updateFrequency: 'Real-time',
      apiStatus: 'Connected'
    },
    {
      id: 'alphafold',
      name: 'AlphaFold DB',
      description: 'AI-predicted protein structures',
      url: 'https://alphafold.ebi.ac.uk',
      status: 'online',
      lastSync: '15 minutes ago',
      totalRecords: '200M+',
      todayUpdates: '0',
      dataTypes: ['Predicted structures', 'Confidence scores', 'Structural annotations'],
      coverage: 'Proteome-wide',
      updateFrequency: 'Quarterly',
      apiStatus: 'Connected'
    }
  ];

  const [apiKeys] = useState([
    {
      service: 'GISAID',
      status: 'configured',
      lastUsed: '2 minutes ago',
      requestsToday: '1,247',
      rateLimit: '1000/hour',
      remaining: '753'
    },
    {
      service: 'NCBI E-utilities',
      status: 'public',
      lastUsed: '5 minutes ago',
      requestsToday: '347',
      rateLimit: '3/second',
      remaining: 'Unlimited'
    },
    {
      service: 'outbreak.info',
      status: 'configured',
      lastUsed: '3 minutes ago',
      requestsToday: '847',
      rateLimit: '500/hour',
      remaining: '453'
    }
  ]);

  const refreshDataSource = async (sourceId) => {
    setRefreshing(prev => ({ ...prev, [sourceId]: true }));
    
    // Simulate API call
    setTimeout(() => {
      setRefreshing(prev => ({ ...prev, [sourceId]: false }));
    }, 2000);
  };

  const downloadData = (sourceId) => {
    console.log(`Downloading data from ${sourceId}`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sources</p>
              <p className="text-2xl font-bold text-green-600">{dataSources.length}</p>
            </div>
            <Database className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-blue-600">24.8M+</p>
            </div>
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Updates</p>
              <p className="text-2xl font-bold text-purple-600">26,331</p>
            </div>
            <RefreshCw className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Calls Today</p>
              <p className="text-2xl font-bold text-orange-600">2,441</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dataSources.map((source) => (
          <div key={source.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  source.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
                  <p className="text-sm text-gray-600">{source.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => refreshDataSource(source.id)}
                  disabled={refreshing[source.id]}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing[source.id] ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => downloadData(source.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="font-semibold text-gray-900">{source.totalRecords}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Updates</p>
                <p className="font-semibold text-green-600">+{source.todayUpdates}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="font-semibold text-gray-900">{source.lastSync}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Update Frequency</p>
                <p className="font-semibold text-gray-900">{source.updateFrequency}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Data Types</p>
              <div className="flex flex-wrap gap-2">
                {source.dataTypes.map((type, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-600">API Status: {source.apiStatus}</span>
              </div>
              <span className="text-sm text-gray-500">Coverage: {source.coverage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Used</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Requests Today</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Rate Limit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((api, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{api.service}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      api.status === 'configured' ? 'bg-green-100 text-green-800' :
                      api.status === 'public' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {api.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{api.lastUsed}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{api.requestsToday}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{api.rateLimit}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{api.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Integration Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Data Integration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">GISAID Sync</p>
                <p className="text-sm text-gray-600">Continuous synchronization active</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">Active</p>
              <p className="text-xs text-gray-500">Next sync: 30 seconds</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">outbreak.info Tracking</p>
                <p className="text-sm text-gray-600">Variant prevalence monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600">Running</p>
              <p className="text-xs text-gray-500">Updated 3 min ago</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Structure Updates</p>
                <p className="text-sm text-gray-600">PDB and AlphaFold monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-purple-600">Scheduled</p>
              <p className="text-xs text-gray-500">Weekly updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSources;