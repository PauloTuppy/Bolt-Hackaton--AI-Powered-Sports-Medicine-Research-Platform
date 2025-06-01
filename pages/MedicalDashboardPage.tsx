import React from 'react';
import { useMedicalDashboard } from '../hooks/useMedicalDashboard';
import { Loader2, AlertCircle, Stethoscope, Search, Activity, Calendar } from 'lucide-react';

const SpecialistCard: React.FC<{ specialist: any; onSearch: () => void }> = ({ specialist, onSearch }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{specialist.type}</h3>
        <p className="text-gray-600 text-sm mt-1">{specialist.reason}</p>
      </div>
      <span className="text-3xl">{specialist.icon}</span>
    </div>
    <button 
      onClick={onSearch}
      className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
    >
      <Search size={16} />
      Find Specialist
    </button>
  </div>
);

const ExamCard: React.FC<{ exam: any }> = ({ exam }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{exam.name}</h3>
        <p className="text-gray-600 text-sm">{exam.description}</p>
      </div>
      <Activity className="text-blue-500" size={24} />
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">Recommended frequency:</span>
      <span className="font-medium text-gray-700">{exam.frequency}</span>
    </div>
  </div>
);

const TimelineEvent: React.FC<{ event: any }> = ({ event }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
      <Calendar className="text-blue-600" size={20} />
    </div>
    <div>
      <h4 className="font-medium text-gray-900">{event.title}</h4>
      <p className="text-sm text-gray-600">{event.description}</p>
      <time className="text-xs text-gray-500">{event.date}</time>
    </div>
  </div>
);

const MedicalDashboardPage: React.FC = () => {
  const { profile, recommendations, isLoading, error, searchForSpecialist } = useMedicalDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <AlertCircle className="mr-2" size={24} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Medical Dashboard</h1>
        <p className="text-xl text-gray-600 mt-2">
          Recommendations based on your profile and sport: 
          <span className="font-bold text-blue-600 ml-2">{profile?.selected_sport}</span>
        </p>
      </header>
      
      {/* Recommended Specialists Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Stethoscope size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Recommended Specialists</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((spec) => (
            <SpecialistCard 
              key={spec.type} 
              specialist={spec} 
              onSearch={() => searchForSpecialist(spec.type)} 
            />
          ))}
        </div>
      </section>

      {/* Suggested Exams Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Activity size={32} className="text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Suggested Exams</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Complete Blood Count',
              description: 'Essential for assessing overall health status',
              frequency: 'Every 6 months'
            },
            {
              name: 'Exercise Stress Test',
              description: 'Evaluates heart function during physical activity',
              frequency: 'Annually'
            }
          ].map((exam) => (
            <ExamCard key={exam.name} exam={exam} />
          ))}
        </div>
      </section>

      {/* Medical Timeline Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Calendar size={32} className="text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-800">Medical Timeline</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-8">
            {[
              {
                title: 'Initial Assessment',
                description: 'Completed health profile and sport selection',
                date: new Date().toLocaleDateString()
              },
              {
                title: 'Upcoming Check-up',
                description: 'Schedule your first consultation with recommended specialists',
                date: 'Next steps'
              }
            ].map((event) => (
              <TimelineEvent key={event.title} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicalDashboardPage;
