import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface PerformanceMetrics {
  [key: string]: number;
}

interface UserData {
  id: string;
  selected_sport: string;
  performance_metrics: PerformanceMetrics | null;
}

interface Archetype {
  id: string;
  name: string;
  level: string;
  metrics: PerformanceMetrics;
  sport: string;
}

interface ComparisonResult {
  radarChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  strengths: string[];
  gaps: string[];
}

export const useAthleteComparison = () => {
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [archetypes, setArchetypes] = useState<Archetype[]>([]);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const [userRes, archetypesRes] = await Promise.all([
          supabase.from('profiles').select('id, selected_sport, performance_metrics').eq('id', user.id).single(),
          supabase.from('athlete_archetypes').select('*')
        ]);
        
        if (userRes.error) throw userRes.error;
        if (archetypesRes.error) throw archetypesRes.error;
        
        setCurrentUserData(userRes.data);
        setArchetypes(archetypesRes.data.filter(a => a.sport === userRes.data.selected_sport));
      } catch (err: any) {
        setError(err.message || "Failed to fetch comparison data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const compareWithArchetype = useCallback((archetypeId: string) => {
    const archetypeToCompare = archetypes.find(a => a.id === archetypeId);
    if (!archetypeToCompare || !currentUserData?.performance_metrics) return;
    
    setSelectedArchetype(archetypeToCompare);
    
    const userMetrics = currentUserData.performance_metrics;
    const archetypeMetrics = archetypeToCompare.metrics;
    const labels = Object.keys(archetypeMetrics);
    
    const userDataValues = labels.map(label => userMetrics[label] || 0);
    const archetypeDataValues = labels.map(label => archetypeMetrics[label]);
    
    const strengths: string[] = [];
    const gaps: string[] = [];

    labels.forEach(label => {
      const userValue = userMetrics[label] || 0;
      const archetypeValue = archetypeMetrics[label];
      if (userValue >= archetypeValue) {
        strengths.push(label);
      } else {
        gaps.push(label);
      }
    });

    setComparisonResult({
      strengths,
      gaps,
      radarChartData: {
        labels,
        datasets: [
          {
            label: 'Your Level',
            data: userDataValues,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
          },
          {
            label: archetypeToCompare.name,
            data: archetypeDataValues,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2,
          },
        ],
      },
    });
  }, [currentUserData, archetypes]);

  return { 
    isLoading, 
    error, 
    archetypes, 
    selectedArchetype, 
    comparisonResult, 
    compareWithArchetype 
  };
};