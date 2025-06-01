import React from 'react';
import { useTrainingPlanGenerator } from '../hooks/useTrainingPlanGenerator';
import { Loader2, AlertCircle } from 'lucide-react';
import { TrainingSchedule } from '../TrainingSchedule';
import { DietPlan } from '../DietPlan';
import { SupplementProtocol } from '../SupplementProtocol';

const PlanGeneratorLoadingState = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl shadow-lg">
    <Loader2 size={48} className="text-blue-600 animate-spin" />
    <h2 className="text-2xl font-bold mt-6 text-gray-800">Building your plan...</h2>
    <p className="text-gray-600 mt-2">Our AI is analyzing your profile, exams, and goals to create a fully personalized performance plan.</p>
  </div>
);

const TrainingPlanPage: React.FC = () => {
  const { plan, isLoading, error } = useTrainingPlanGenerator();

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Performance Plan</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">An integrated training, diet, and supplementation plan, generated just for you.</p>
      </header>
      
      <div className="max-w-7xl mx-auto">
        {isLoading && <PlanGeneratorLoadingState />}
        
        {error && (
          <div className="flex items-center justify-center p-6 bg-red-100 text-red-700 rounded-lg">
            <AlertCircle className="mr-3" /> {error}
          </div>
        )}

        {!isLoading && plan && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            <div className="lg:col-span-2">
              <TrainingSchedule trainingPlan={plan.trainingPlan} />
            </div>
            <div className="space-y-8">
              <SupplementProtocol supplementPlan={plan.supplementPlan} />
              <DietPlan dietPlan={plan.dietPlan} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingPlanPage;
