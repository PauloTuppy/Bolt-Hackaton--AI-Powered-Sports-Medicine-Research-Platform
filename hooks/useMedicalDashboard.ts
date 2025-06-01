import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  selected_sport: string;
  anamnesis: any;
}

interface Specialist {
  type: string;
  reason: string;
  icon: string;
}

const getSpecialistRecommendations = (profile: UserProfile): Specialist[] => {
  const recommendations: Specialist[] = [];
  const { anamnesis, selected_sport } = profile;

  if (!anamnesis) return [];

  // Age-based recommendations
  if (parseInt(anamnesis.age) > 40) {
    recommendations.push({
      type: 'Cardiologist',
      reason: 'Routine check-up due to age',
      icon: '❤️'
    });
  }

  // BMI-based recommendations
  const heightInMeters = parseInt(anamnesis.height) / 100;
  const weight = parseInt(anamnesis.weight);
  const bmi = weight / (heightInMeters * heightInMeters);
  
  if (bmi > 25) {
    recommendations.push({
      type: 'Nutritionist',
      reason: 'Dietary guidance for optimal performance',
      icon: '🍎'
    });
  }

  // Sport-specific recommendations
  if (['football', 'mma'].includes(selected_sport)) {
    recommendations.push({
      type: 'Sports Medicine Specialist',
      reason: 'Injury prevention and performance optimization',
      icon: '🏃'
    });
  }

  return recommendations;
};

export const useMedicalDashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Specialist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not found');

        const { data, error: profileError } = await supabase
          .from('anamnesis')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;

        const userProfile = {
          id: user.id,
          selected_sport: data.selected_sport,
          anamnesis: data
        };

        setProfile(userProfile);
        setRecommendations(getSpecialistRecommendations(userProfile));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const searchForSpecialist = useCallback((specialistType: string) => {
    const query = encodeURIComponent(`${specialistType} near me`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }, []);

  return {
    profile,
    recommendations,
    isLoading,
    error,
    searchForSpecialist
  };
};