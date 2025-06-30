import React, { useState, useEffect } from 'react';
import { Globe, TrendingUp, AlertTriangle, Filter, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const VariantTracker = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [isLoading, setIsLoading] = useState(false);

  const regions = [
    { id: 'global', name: 'Global' },
    { id: 'north-america', name: 'North America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' }
  ];

  const timeframes = [
    { id: '1month', name: 'Last Month' },
    { id: '3months', name: 'Last 3 Months' },
    { id: '6months', name: 'Last 6 Months' },
    { id: '1year', name: 'Last Year' }
  ];

  const [variantTrends] = useState([
    { date: '2024-01', 'BA.5': 45.2, 'XBB.1.5': 23.1, 'BQ.1.1': 18.7, 'Others': 13.0 },
    { date: '2024-02', 'BA.5': 42.8, 'XBB.1.5': 26.3, 'BQ.1.1': 17.2, 'Others': 13.7 },
    { date: '2024-03', 'BA.5': 38.9, 'XBB.1.5': 29.8, 'BQ.1.1': 15.8, 'Others': 15.5 },
    { date: '2024-04', 'BA.5': 35.2, 'XBB.1.5': 32.1, 'BQ.1.1': 14.3, 'Others': 18.4 },
    { date: '2024-05', 'BA.5': 31.7, 'XBB.1.5': 34.6, 'BQ.1.1': 12.9, 'Others': 20.8 },
    { date: '2024-06', 'BA.5': 28.3, 'XBB.1.5': 37.2, 'BQ.1.1': 11.5, 'Others': 23.0 }
  ]);

  const [currentVariants] = useState([
    {
      name: 'XBB.1.5',
      prevalence: 37.2,
      change: '+2.6',
      trend: 'up',
      countries: 89,
      keyMutations: ['F486P', 'S486P', 'F456L'],
      riskLevel: 'medium'
    },
    {
      name: 'BA.5',
      prevalence: 28.3,
      change: '-3.4',
      trend: 'down',
      countries: 156,
      keyMutations: ['L452R', 'F486V'],
      riskLevel: 'low'
    },
    {
      name: 'BQ.1.1',
      prevalence: 11.5,
      change: '-1.4',
      trend: 'down',
      countries: 67,
      keyMutations: ['K444T', 'L452R', 'N460K'],
      riskLevel: 'medium'
    },
    {
      name: 'BA.2.75',
      prevalence: 8.7,
      change: '+0.8',
      trend: 'up',
      countries: 43,
      keyMutations: ['K147E', 'W152R', 'F157L'],
      riskLevel: 'high'
    }
  ]);

  const [emergingVariants] = useState([
    {
      name: 'XBB.1.16',
      firstDetected: '2024-05-15',
      countries: 12,
      sequences: 847,
      growthRate: '+45%',
      keyMutations: ['E180V', 'T478K'],
      status: 'monitoring'
    },
    {
      name: 'CH.1.1',
      firstDetected: '2024-04-22',
      countries: 8,
      sequences: 523,
      growthRate: '+32%',
      keyMutations: ['L452R', 'F486S'],
      status: 'investigating'
    }
  ]);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeframes.map((timeframe) => (
                  <option key={timeframe.id} value={timeframe.id}>
                    {timeframe.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Variant Trends Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Variant Prevalence Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={variantTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="BA.5" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="XBB.1.5" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="BQ.1.1" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="Others" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Current Variants */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Circulating Variants</h2>
        <div className="space-y-4">
          {currentVariants.map((variant, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{variant.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    variant.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                    variant.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {variant.riskLevel} risk
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{variant.prevalence}%</p>
                    <p className={`text-sm flex items-center ${
                      variant.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`h-3 w-3 mr-1 ${
                        variant.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      {variant.change}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Countries detected</p>
                  <p className="font-medium">{variant.countries}</p>
                </div>
                <div>
                  <p className="text-gray-600">Key mutations</p>
                  <p className="font-medium font-mono">{variant.keyMutations.join(', ')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Global prevalence</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${variant.prevalence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emerging Variants */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Emerging Variants</h2>
          <div className="flex items-center text-sm text-orange-600">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Under surveillance
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergingVariants.map((variant, index) => (
            <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{variant.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  variant.status === 'investigating' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {variant.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">First detected:</span>
                  <span className="font-medium">{variant.firstDetected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Countries:</span>
                  <span className="font-medium">{variant.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sequences:</span>
                  <span className="font-medium">{variant.sequences}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth rate:</span>
                  <span className="font-medium text-orange-600">{variant.growthRate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Key mutations:</span>
                  <p className="font-medium font-mono">{variant.keyMutations.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Geographic Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { region: 'North America', dominant: 'XBB.1.5', percentage: 42.1 },
            { region: 'Europe', dominant: 'BA.5', percentage: 38.7 },
            { region: 'Asia', dominant: 'XBB.1.5', percentage: 35.9 },
            { region: 'Africa', dominant: 'BA.5', percentage: 41.3 },
            { region: 'South America', dominant: 'BQ.1.1', percentage: 29.8 },
            { region: 'Oceania', dominant: 'XBB.1.5', percentage: 44.2 }
          ].map((region, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{region.region}</h3>
              <p className="text-sm text-gray-600">Dominant variant:</p>
              <p className="font-semibold text-blue-600">{region.dominant}</p>
              <p className="text-sm text-gray-600 mt-1">{region.percentage}% prevalence</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantTracker;