import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Download, Upload, Play, Pause } from 'lucide-react';

const ProteinViewer = () => {
  const [selectedStructure, setSelectedStructure] = useState('6vsb');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('cartoon');
  const [isPlaying, setIsPlaying] = useState(false);
  const viewerRef = useRef(null);

  const structures = [
    {
      id: '6vsb',
      name: 'SARS-CoV-2 Spike (Closed)',
      description: 'Cryo-EM structure of the SARS-CoV-2 spike glycoprotein',
      resolution: '2.8 Å',
      method: 'Cryo-EM'
    },
    {
      id: '6vyb',
      name: 'SARS-CoV-2 Spike (Open)',
      description: 'SARS-CoV-2 spike glycoprotein in open conformation',
      resolution: '3.2 Å',
      method: 'Cryo-EM'
    },
    {
      id: '7df4',
      name: 'Spike-ACE2 Complex',
      description: 'SARS-CoV-2 spike protein bound to ACE2 receptor',
      resolution: '2.9 Å',
      method: 'Cryo-EM'
    },
    {
      id: 'alphafold',
      name: 'AlphaFold Prediction',
      description: 'AI-predicted structure of SARS-CoV-2 spike protein',
      resolution: 'Predicted',
      method: 'AlphaFold'
    }
  ];

  const viewModes = [
    { id: 'cartoon', name: 'Cartoon', description: 'Secondary structure representation' },
    { id: 'surface', name: 'Surface', description: 'Molecular surface' },
    { id: 'spacefill', name: 'Space-fill', description: 'Van der Waals spheres' },
    { id: 'backbone', name: 'Backbone', description: 'Protein backbone only' }
  ];

  const loadStructure = async (structureId) => {
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      setSelectedStructure(structureId);
      setIsLoading(false);
    }, 2000);
  };

  const resetView = () => {
    console.log('Resetting view');
  };

  const zoomIn = () => {
    console.log('Zooming in');
  };

  const zoomOut = () => {
    console.log('Zooming out');
  };

  const downloadImage = () => {
    console.log('Downloading image');
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Structure Selection */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Structure Selection</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {structures.map((structure) => (
            <div
              key={structure.id}
              onClick={() => loadStructure(structure.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedStructure === structure.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium text-gray-900 mb-1">{structure.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{structure.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{structure.resolution}</span>
                <span>{structure.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viewer Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {viewModes.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={resetView}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset View"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={zoomIn}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={toggleAnimation}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title={isPlaying ? "Pause Animation" : "Play Animation"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={downloadImage}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download Image"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3D Structure Viewer</h2>
        
        <div className="relative">
          <div
            ref={viewerRef}
            className="w-full h-96 bg-gray-900 rounded-lg border border-gray-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Loading structure...</p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="text-white text-4xl font-bold">3D</div>
                  </div>
                </div>
                <p className="text-lg font-medium">SARS-CoV-2 Spike Protein</p>
                <p className="text-sm">Structure ID: {selectedStructure}</p>
                <p className="text-xs mt-2">Interactive 3D viewer would be rendered here</p>
              </div>
            )}
          </div>
          
          {/* Overlay Information */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
            <p className="text-sm font-medium">
              {structures.find(s => s.id === selectedStructure)?.name}
            </p>
            <p className="text-xs text-gray-300">
              View: {viewModes.find(m => m.id === viewMode)?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Structure Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Structure Details</h3>
          
          {(() => {
            const structure = structures.find(s => s.id === selectedStructure);
            return (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{structure?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium">{structure?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Resolution</p>
                    <p className="font-medium">{structure?.resolution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Method</p>
                    <p className="font-medium">{structure?.method}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Receptor Binding Domain (RBD)</h4>
              <p className="text-sm text-blue-700">Critical for ACE2 binding and viral entry</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">N-Terminal Domain (NTD)</h4>
              <p className="text-sm text-green-700">Target for neutralizing antibodies</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">Furin Cleavage Site</h4>
              <p className="text-sm text-purple-700">Enhanced pathogenicity marker</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900">Transmembrane Domain</h4>
              <p className="text-sm text-orange-700">Anchors protein to viral membrane</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Tools */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Tools</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900 mb-1">Mutation Mapping</h4>
            <p className="text-sm text-gray-600">Visualize mutations on 3D structure</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900 mb-1">Binding Site Analysis</h4>
            <p className="text-sm text-gray-600">Analyze receptor binding interfaces</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900 mb-1">Conformational Changes</h4>
            <p className="text-sm text-gray-600">Compare open vs closed states</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProteinViewer;