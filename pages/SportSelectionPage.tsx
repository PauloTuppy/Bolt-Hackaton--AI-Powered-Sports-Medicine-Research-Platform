import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { sportsData } from '../src/config/sports';

const SportSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) navigate('/login');
      } catch (err) {
        console.error('Auth check failed:', err);
        navigate('/login');
      } finally {
        setIsInitializing(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSportSelection = async (sportId: string) => {
    setIsLoading(true);
    setSelectedId(sportId);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found.');

      const { error: updateError } = await supabase
        .from('anamnesis')
        .update({ 
          selected_sport: sportId,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;
      
      navigate('/training-plan');
    } catch (err: any) {
      console.error('Error selecting sport:', err);
      setError(err.message || 'Could not save your choice. Please try again.');
      setIsLoading(false);
      setSelectedId(null);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={64} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Select Your Primary Activity
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Your choice will help us personalize your metrics, recommendations, and analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {sportsData.map((sport) => (
          <SportCard
            key={sport.id}
            sport={sport}
            isLoading={isLoading && selectedId === sport.id}
            isDisabled={isLoading}
            onSelect={() => handleSportSelection(sport.id)}
          />
        ))}
      </div>

      {error && (
        <motion.p 
          className="mt-8 text-red-600 font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

interface SportCardProps {
  sport: typeof sportsData[0];
  isLoading: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

const SportCard: React.FC<SportCardProps> = ({ 
  sport, 
  isLoading, 
  isDisabled, 
  onSelect 
}) => {
  return (
    <motion.div
      onClick={isDisabled ? undefined : onSelect}
      className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-2'
      } ${isLoading ? 'border-blue-500' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      role="button"
      aria-label={`Select ${sport.name} as primary activity`}
      aria-disabled={isDisabled}
    >
      <div className="flex items-center justify-center mb-6">
        {isLoading ? (
          <Loader2 size={48} className="text-blue-500 animate-spin" />
        ) : (
          <div className={sport.color}>
            <sport.icon size={48} />
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
        {sport.name}
      </h3>
      <p className="text-center text-gray-600 mb-6 h-12">
        {sport.description}
      </p>
      
      <ul className="space-y-2 text-gray-700">
        {sport.benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SportSelectionPage;
