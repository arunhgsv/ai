import React, { useState } from 'react';
import { Upload, Play, Download, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const SequenceAnalyzer = () => {
  const [sequence, setSequence] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedModel, setSelectedModel] = useState('esm2');

  const sampleSequence = `MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNPVLPFNDGVYFASTEKSNIIRGWIFGTTLDSKTQSLLIVNNATNVVIKVCEFQFCNDPFLGVYYHKNNKSWMESEFRVYSSANNCTFEYVSQPFLMDLEGKQGNFKNLREFVFKNIDGYFKIYSKHTPINLVRDLPQGFSALEPLVDLPIGINITRFQTLLALHRSYLTPGDSSSGWTAGAAAYYVGYLQPRTFLLKYNENGTITDAVDCALDPLSETKCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIADYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPCNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVNFNFNGLTGTGVLTESNKKFLPFQQFGRDIADTTDAVRDPQTLEILDITPCSFGGVSVITPGTNTSNQVAVLYQDVNCTEVPVAIHADQLTPTWRVYSTGSNVFQTRAGCLIGAEHVNNSYECDIPIGAGICASYQTQTNSPRRARSVASQSIIAYTMSLGAENSVAYSNNSIAIPTNFTISVTTEILPVSMTKTSVDCTMYICGDSTECSNLLLQYGSFCTQLNRALTGIAVEQDKNTQEVFAQVKQIYKTPPIKDFGGFNFSQILPDPSKPSKRSFIEDLLFNKVTLADAGFIKQYGDCLGDIAARDLICAQKFNGLTVLPPLLTDEMIAQYTSALLAGTITSGWTFGAGAALQIPFAMQMAYRFNGIGVTQNVLYENQKLIANQFNSAIGKIQDSLSSTASALGKLQDVVNQNAQALNTLVKQLSSNFGAISSVLNDILSRLDKVEAEVQIDRLITGRLQSLQTYVTQQLIRAAEIRASANLAATKMSECVLGQSKRVDFCGKGYHLMSFPQSAPHGVVFLHVTYVPAQEKNFTTAPAICHDGKAHFPREGVFVSNGTHWFVTQRNFYEPQIITTDNTFVSGNCDVVIGIVNNTVYDPLQPELDSFKEELDKYFKNHTSPDVDLGDISGINASVVNIQKEIDRLNEVAKNLNESLIDLQELGKYEQYIKWPWYIWLGFIAGLIAIVMVTIMLCCMTSCCSCLKGCCSCGSCCKFDEDDSEPVLKGVKLHYT`;

  const models = [
    { id: 'esm2', name: 'ESM-2 (Meta)', description: 'Protein language model for mutation prediction' },
    { id: 'alphafold', name: 'AlphaFold', description: 'Structure-based analysis' },
    { id: 'custom', name: 'Custom Model', description: 'Fine-tuned for SARS-CoV-2' }
  ];

  const handleAnalyze = async () => {
    if (!sequence.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockResults = {
        mutations: [
          { position: 452, original: 'L', mutated: 'R', probability: 0.87, impact: 'high' },
          { position: 484, original: 'E', mutated: 'K', probability: 0.73, impact: 'medium' },
          { position: 501, original: 'N', mutated: 'Y', probability: 0.91, impact: 'high' },
          { position: 614, original: 'D', mutated: 'G', probability: 0.95, impact: 'critical' }
        ],
        summary: {
          totalMutations: 4,
          highRisk: 2,
          mediumRisk: 1,
          lowRisk: 1,
          overallRisk: 'High'
        },
        structuralImpact: {
          receptorBinding: 'Increased affinity',
          immuneEscape: 'Moderate escape potential',
          stability: 'Maintained'
        }
      };
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const loadSample = () => {
    setSequence(sampleSequence);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sequence Input</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SARS-CoV-2 Spike Protein Sequence
            </label>
            <textarea
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Paste your spike protein sequence here (FASTA format supported)..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={loadSample}
              className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Load Sample Sequence
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <Upload className="h-4 w-4 mr-1" />
              Or upload FASTA file
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Model</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedModel === model.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium text-gray-900">{model.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{model.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Run Analysis</h2>
            <p className="text-sm text-gray-600 mt-1">
              Predict mutations and assess their impact on protein function
            </p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!sequence.trim() || isAnalyzing}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{results.summary.totalMutations}</p>
                <p className="text-sm text-gray-600">Total Mutations</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{results.summary.highRisk}</p>
                <p className="text-sm text-gray-600">High Risk</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{results.summary.mediumRisk}</p>
                <p className="text-sm text-gray-600">Medium Risk</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{results.summary.lowRisk}</p>
                <p className="text-sm text-gray-600">Low Risk</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              results.summary.overallRisk === 'High' ? 'bg-red-50 border border-red-200' :
              results.summary.overallRisk === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-green-50 border border-green-200'
            }`}>
              <div className="flex items-center">
                <AlertCircle className={`h-5 w-5 mr-2 ${
                  results.summary.overallRisk === 'High' ? 'text-red-600' :
                  results.summary.overallRisk === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`} />
                <span className="font-medium">Overall Risk Assessment: {results.summary.overallRisk}</span>
              </div>
            </div>
          </div>

          {/* Detailed Mutations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Predicted Mutations</h2>
              <button className="flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Change</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Probability</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Impact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.mutations.map((mutation, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono">{mutation.position}</td>
                      <td className="py-3 px-4 font-mono">
                        {mutation.original} → {mutation.mutated}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${mutation.probability * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{(mutation.probability * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          mutation.impact === 'critical' ? 'bg-red-100 text-red-800' :
                          mutation.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                          mutation.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {mutation.impact}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Structural Impact */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Structural Impact Assessment</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Receptor Binding</h3>
                <p className="text-sm text-gray-600">{results.structuralImpact.receptorBinding}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Immune Escape</h3>
                <p className="text-sm text-gray-600">{results.structuralImpact.immuneEscape}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Protein Stability</h3>
                <p className="text-sm text-gray-600">{results.structuralImpact.stability}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SequenceAnalyzer;