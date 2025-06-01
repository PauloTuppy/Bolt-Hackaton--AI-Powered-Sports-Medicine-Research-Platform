import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Supplement {
  name: string;
  dosage: string;
  purpose: string;
}

interface Meal {
  time: string;
  description: string;
}

interface DailyTraining {
  focus: string;
  exercises: {
    name: string;
    sets: string;
  }[];
}

interface GeneratedPlan {
  supplementPlan: Supplement[];
  dietPlan: {
    [mealTime: string]: Meal;
  };
  trainingPlan: {
    [day: string]: DailyTraining;
  };
}

const MOCK_AI_RESPONSE: GeneratedPlan = {
  supplementPlan: [
    { name: 'Creatine Monohydrate', dosage: '5g daily', purpose: 'Strength and performance' },
    { name: 'Whey Protein Isolate', dosage: '30g post-workout', purpose: 'Recovery and protein synthesis' },
    { name: 'Fish Oil', dosage: '2000mg EPA/DHA daily', purpose: 'Joint health and anti-inflammatory' },
  ],
  dietPlan: {
    "Breakfast": { time: "07:00", description: "Scrambled eggs with spinach and oatmeal with berries" },
    "Lunch": { time: "12:30", description: "Grilled chicken breast, brown rice, broccoli, and green salad" },
    "Snack": { time: "16:00", description: "Greek yogurt with nuts and honey" },
    "Dinner": { time: "19:30", description: "Baked salmon with sweet potato and asparagus" }
  },
  trainingPlan: {
    "Monday": { focus: "Chest and Triceps", exercises: [{ name: "Bench Press", sets: "4x 8-10" }, { name: "Tricep Pushdown", sets: "3x 12-15" }] },
    "Tuesday": { focus: "Back and Biceps", exercises: [{ name: "Pull-ups", sets: "4x to failure" }, { name: "Barbell Curl", sets: "3x 10-12" }] },
    "Wednesday": { focus: "Legs (Quad Focus)", exercises: [{ name: "Squats", sets: "5x 5" }, { name: "Leg Extensions", sets: "4x 15" }] },
    "Thursday": { focus: "Active Rest", exercises: [{ name: "Light Walk or Yoga", sets: "30-45 min" }] },
    "Friday": { focus: "Shoulders and Core", exercises: [{ name: "Military Press", sets: "4x 8" }, { name: "Plank", sets: "3x 60s" }] },
  }
};

export const useTrainingPlanGenerator = () => {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePlan = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await new Promise(res => setTimeout(res, 1000));
        await new Promise(res => setTimeout(res, 3000));
        setPlan(MOCK_AI_RESPONSE);
      } catch (err: any) {
        setError("Could not generate your plan. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    generatePlan();
  }, []);

  return { plan, isLoading, error };
};