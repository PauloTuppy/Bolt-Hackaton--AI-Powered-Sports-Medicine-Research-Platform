import React from 'react';
import { Utensils } from 'lucide-react';

interface Meal {
  time: string;
  description: string;
}

interface DietPlanProps {
  dietPlan: {
    [mealTime: string]: Meal;
  };
}

export const DietPlan: React.FC<DietPlanProps> = ({ dietPlan }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Utensils className="text-green-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Daily Nutrition Plan</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(dietPlan).map(([mealName, meal]) => (
          <div key={mealName} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{mealName}</h3>
              <span className="text-gray-500 text-sm">{meal.time}</span>
            </div>
            <p className="text-gray-600">{meal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
