import React, { useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { Line } from 'react-chartjs-2';
import { Loader2, AlertCircle, TrendingUp, History, Plus } from 'lucide-react';
import DailyFeedbackModal from '../components/DailyFeedbackModal';

const UserProfilePage: React.FC = () => {
  const { isLoading, error, assessments, evolutionData, submitDailyFeedback } = useUserProfile();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin" size={48} /></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500"><AlertCircle className="mr-2"/> {error}</div>;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen p-8 relative">
      <button 
        onClick={() => setIsFeedbackModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg z-10 hover:bg-blue-700 transition"
      >
        <Plus size={24}/>
      </button>
      {isFeedbackModalOpen && (
        <DailyFeedbackModal 
          onClose={() => setIsFeedbackModalOpen(false)} 
          onSubmit={submitDailyFeedback} 
        />
      )}

      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Evolution Profile</h1>
        <p className="mt-4 text-lg text-gray-600">Track your progress, review past assessments, and log your daily effort.</p>
      </header>
      
      <main className="max-w-7xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <TrendingUp/> Metric Evolution
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {evolutionData ? (
              <Line 
                data={evolutionData}
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>You need at least two assessments to visualize your progress. Keep up the good work!</p>
            )}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <History/> Assessment History
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-200">
            {assessments.map((assessment, index) => (
              <div key={index} className="relative pl-10">
                <div className="absolute left-0 top-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg ml-4">
                  <p className="font-bold text-lg text-gray-900">
                    Assessment from {new Date(assessment.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Weight: {assessment.metrics.weight}kg | Height: {assessment.metrics.height}cm
                  </p>
                  <button className="text-sm text-blue-600 hover:underline mt-2">
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfilePage;
