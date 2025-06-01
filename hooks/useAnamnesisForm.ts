import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { anamnesisSchema, type AnamnesisFormData } from '../lib/validations/anamnesis';

interface ValidationError {
  path: string[];
  message: string;
}

const INITIAL_STATE: AnamnesisFormData = {
  age: '',
  weight: '',
  height: '',
  medical_history: [],
  current_medications: [],
  allergies: [],
  previous_injuries: [],
  exercise_frequency: '',
  exercise_intensity: 'moderate',
  fitness_goals: [],
  lifestyle: {
    smoking: false,
    alcohol: false,
    sleep: '7-8',
    stress: 'moderate',
  },
};

export const useAnamnesisForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AnamnesisFormData>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const validateStep = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          anamnesisSchema.pick({ age: true, weight: true, height: true }).parse(formData);
          break;
        case 2:
          anamnesisSchema.pick({ 
            medical_history: true, 
            current_medications: true, 
            allergies: true, 
            previous_injuries: true 
          }).parse(formData);
          break;
        case 3:
          anamnesisSchema.pick({ 
            exercise_frequency: true, 
            fitness_goals: true 
          }).parse(formData);
          break;
        case 4:
          anamnesisSchema.pick({ lifestyle: true }).parse(formData);
          break;
      }
      setValidationErrors([]);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setValidationErrors([{
          path: ['form'],
          message: err.message
        }]);
      }
      return false;
    }
  };

  const handleInputChange = (
    field: keyof Omit<AnamnesisFormData, 'lifestyle'>,
    value: string | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors([]);
  };

  const handleLifestyleChange = (
    field: keyof AnamnesisFormData['lifestyle'],
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      lifestyle: { ...prev.lifestyle, [field]: value },
    }));
    setValidationErrors([]);
  };

  const handleCheckboxGroupChange = (field: 'medical_history' | 'fitness_goals', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
    setValidationErrors([]);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(4, prev + 1));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to submit the form.');

      const validatedData = anamnesisSchema.parse(formData);

      const { error: submissionError } = await supabase
        .from('anamnesis')
        .insert([{
          user_id: user.id,
          ...validatedData
        }]);

      if (submissionError) throw submissionError;

      navigate('/sport-selection');
    } catch (err: any) {
      console.error('Error saving anamnesis:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    formData,
    isLoading,
    error,
    validationErrors,
    handleInputChange,
    handleLifestyleChange,
    handleCheckboxGroupChange,
    nextStep,
    prevStep,
    handleSubmit,
  };
};

export default useAnamnesisForm;
