import React from 'react';
import { Dumbbell } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
}

interface DailyTraining {
  focus: string;
  exercises: Exercise[
];
}

interface TrainingScheduleProps {
  trainingPlan: {
    [day: string]: DailyTraining;
  };
}

export const TrainingSchedule: React.FC<TrainingScheduleProps> = ({ trainingPlan }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Dumbbell className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Weekly Training Schedule</h2>
      </div>

      <div className="space-y-6">
        {Object.entries(trainingPlan).map(([day, training]) => (
          <div key={day} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{day}</h3>
              <span className="text-blue-600 font-medium">{training.focus}</span>
            </div>
            
            <div className="space-y-2">
              {training.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between text-gray-600">
                  <span>{exercise.name}</span>
                  <span className="font-medium">{exercise.sets}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
