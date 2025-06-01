import React from 'react';
import { useAthleteComparison } from '../hooks/useAthleteComparison';
import { Loader2, AlertCircle, Users, BarChart } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AthleteComparisonPage: React.FC = () => {
  const { isLoading, error, archetypes, selectedArchetype, comparisonResult, compareWithArchetype } = useAthleteComparison();

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={48} aria-hidden="true" />
        <span className="sr-only">Loading comparison data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="flex items-center justify-center h-screen text-red-500">
        <AlertCircle className="mr-2" aria-hidden="true" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Performance Comparison</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Compare your metrics with different athlete levels in your sport.
        </p>
      </header>
      
      <div className="max-w-2xl mx-auto mb-12">
        <label htmlFor="archetype-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select a profile to compare:
        </label>
        <select
          id="archetype-select"
          onChange={(e) => compareWithArchetype(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          aria-label="Select athlete profile to compare"
          aria-required="true"
        >
          <option value="">-- Choose a level --</option>
          {archetypes.map(archetype => (
            <option key={archetype.id} value={archetype.id}>
              {archetype.name} ({archetype.level})
            </option>
          ))}
        </select>
      </div>

      {selectedArchetype && comparisonResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Visual Comparison</h2>
            <Radar
              data={comparisonResult.radarChartData}
              aria-label="Performance comparison radar chart"
              role="img"
            />
            <p className="sr-only">
              Radar chart showing comparison between your metrics and {selectedArchetype.name} profile.
              Key metrics include: {comparisonResult.radarChartData.labels.join(', ')}.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users aria-hidden="true" />Comparative Analysis
              </h2>
              <p className="text-gray-600">
                You are comparing yourself with a <strong>{selectedArchetype.name}</strong> profile.
                Below are your strengths and areas for development.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-green-600">Your Strengths</h3>
              <ul aria-label="Your strengths" className="list-disc list-inside mt-2 text-gray-700">
                {comparisonResult.strengths.length > 0
                  ? comparisonResult.strengths.map(s => <li key={s}>{s}</li>)
                  : <li>No strengths identified in this comparison.</li>
                }
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-red-600">Areas to Improve</h3>
              <ul aria-label="Areas to improve" className="list-disc list-inside mt-2 text-gray-700">
                {comparisonResult.gaps.length > 0
                  ? comparisonResult.gaps.map(g => <li key={g}>{g}</li>)
                  : <li>Congratulations! You've exceeded all metrics for this profile.</li>
                }
              </ul>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-bold text-lg text-blue-600">Recommendation</h3>
              <p className="text-gray-700 mt-2">
                Focus your training on the 'Areas to Improve' to reach the next level.
                Use our training plans to target specific metrics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AthleteComparisonPage;
