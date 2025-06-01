import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { AnamnesisFormData } from '../lib/validations/anamnesis';

interface HistoricalAssessment {
  created_at: string;
  metrics: AnamnesisFormData;
}

interface EvolutionChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    yAxisID?: string;
  }[];
}

export const useUserProfile = () => {
  const [assessments, setAssessments] = useState<HistoricalAssessment[]>([]);
  const [evolutionData, setEvolutionData] = useState<EvolutionChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error: historyError } = await supabase
          .from('anamnesis')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (historyError) throw historyError;
        
        const formattedAssessments: HistoricalAssessment[] = data.map(item => ({
          created_at: item.created_at,
          metrics: item as AnamnesisFormData
        }));
        setAssessments(formattedAssessments);
        
        if (formattedAssessments.length > 1) {
          const labels = formattedAssessments.map(a => new Date(a.created_at).toLocaleDateString());
          const weightData = formattedAssessments.map(a => parseFloat(a.metrics.weight ?? "0") || 0);
          const bmiData = formattedAssessments.map(a => {
            const heightM = parseFloat(a.metrics.height ?? "0") / 100;
            return parseFloat(a.metrics.weight ?? "0") / (heightM * heightM);
          });
          const bodyFatData = formattedAssessments.map(a => parseFloat(a.metrics.body_fat ?? "0") || 0);
          
          setEvolutionData({
            labels,
            datasets: [
              { label: 'Weight (kg)', data: weightData, borderColor: '#3b82f6' },
              { label: 'BMI', data: bmiData, borderColor: '#10b981', yAxisID: 'y1' },
              { label: 'Body Fat %', data: bodyFatData, borderColor: '#ef4444', yAxisID: 'y1' }
            ]
          });
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch history");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);
  
  const submitDailyFeedback = useCallback(async (feedback: { exertion: number, fatigue: number, notes?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const { error } = await supabase.from('daily_feedback').insert({
      user_id: user.id,
      workout_date: new Date(),
      perceived_exertion: feedback.exertion,
      fatigue_level: feedback.fatigue,
      notes: feedback.notes
    });
    
    if (error) throw error;
  }, []);

  return { isLoading, error, assessments, evolutionData, submitDailyFeedback };
};
