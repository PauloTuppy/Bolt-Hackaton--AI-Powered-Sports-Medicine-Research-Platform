import React from 'react';
import { Heart, Activity, Dumbbell, Scale, AlertCircle, Loader2 } from 'lucide-react';
import useAnamnesisForm from '../hooks/useAnamnesisForm';
import FormStep from '../components/FormStep';
import TextInput from '../components/TextInput';
import CheckboxGroup from '../components/CheckboxGroup';
import SelectInput from '../components/SelectInput';

const MEDICAL_CONDITIONS = ['Hypertension', 'Diabetes', 'Asthma', 'Heart Disease', 'Other'] as const;
const FITNESS_GOALS = ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'Sports Performance'] as const;
const EXERCISE_FREQUENCY = [
  { value: 'rarely', label: 'Rarely' },
  { value: '1-2 times/week', label: '1-2 times/week' },
  { value: '3-4 times/week', label: '3-4 times/week' },
  { value: '5+ times/week', label: '5+ times/week' },
] as const;

const SLEEP_OPTIONS = [
  { value: '<6', label: 'Less than 6 hours' },
  { value: '6-7', label: '6-7 hours' },
  { value: '7-8', label: '7-8 hours' },
  { value: '8+', label: 'More than 8 hours' },
] as const;

const AnamnesisPage: React.FC = () => {
  const {
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
  } = useAnamnesisForm();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Health & Fitness Profile</h2>
            <p className="text-gray-500 mt-2">
              Step {currentStep} of 4: Help us understand your background
            </p>
          </div>

          <div className="mb-8 min-h-[300px]">
            {currentStep === 1 && (
              <FormStep title="Personal Information" icon={<Activity className="text-blue-500" />}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TextInput
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    aria-required="true"
                    aria-invalid={!formData.age}
                  />
                  <TextInput
                    label="Weight (kg)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    aria-required="true"
                    aria-invalid={!formData.weight}
                  />
                  <TextInput
                    label="Height (cm)"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    aria-required="true"
                    aria-invalid={!formData.height}
                  />
                </div>
              </FormStep>
            )}

            {currentStep === 2 && (
              <FormStep title="Medical History" icon={<Heart className="text-red-500" />}>
                <CheckboxGroup
                  label="Do you have any medical conditions?"
                  options={MEDICAL_CONDITIONS}
                  selectedOptions={formData.medical_history}
                  onChange={(value) => {
                    if (Array.isArray(value)) {
                      value.forEach(v => handleCheckboxGroupChange('medical_history', v));
                    }
                  }}
                />
                <TextInput
                  label="Current Medications (comma-separated)"
                  value={Array.isArray(formData.current_medications) ? formData.current_medications.join(', ') : formData.current_medications}
                  onChange={(e) =>
                    handleInputChange(
                      'current_medications',
                      e.target.value.split(',').map(s => s.trim())
                    )
                  }
                  aria-describedby="medications-help"
                />
                <div id="medications-help" className="sr-only">
                  Enter medications separated by commas
                </div>
                <TextInput
                  label="Allergies (comma-separated)"
                  value={Array.isArray(formData.allergies) ? formData.allergies.join(', ') : formData.allergies}
                  onChange={(e) =>
                    handleInputChange(
                      'allergies',
                      e.target.value.split(',').map(s => s.trim())
                    )
                  }
                  aria-describedby="allergies-help"
                />
                <div id="allergies-help" className="sr-only">
                  Enter allergies separated by commas
                </div>
              </FormStep>
            )}

            {currentStep === 3 && (
              <FormStep title="Fitness Goals" icon={<Dumbbell className="text-green-500" />}>
                <CheckboxGroup
                  label="Select Your Goals"
                  options={FITNESS_GOALS}
                  selectedOptions={formData.fitness_goals}
                  onChange={(value) => {
                    if (Array.isArray(value)) {
                      value.forEach(v => handleCheckboxGroupChange('fitness_goals', v));
                    }
                  }}
                />
                <SelectInput
                  label="Exercise Frequency"
                  value={formData.exercise_frequency}
                  onChange={(e) => handleInputChange('exercise_frequency', e.target.value)}
                  options={EXERCISE_FREQUENCY}
                />
              </FormStep>
            )}

            {currentStep === 4 && (
              <FormStep title="Lifestyle" icon={<Scale className="text-purple-500" />}>
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-700">Habits</label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.lifestyle.smoking}
                        onChange={(e) => handleLifestyleChange('smoking', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        aria-labelledby="smoking-label"
                        id="smoking-checkbox"
                      />
                      <span id="smoking-label" className="ml-3">Smoking</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.lifestyle.alcohol}
                        onChange={(e) => handleLifestyleChange('alcohol', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        aria-labelledby="alcohol-label"
                        id="alcohol-checkbox"
                      />
                      <span id="alcohol-label" className="ml-3">Regular Alcohol Consumption</span>
                    </label>
                  </div>
                  <SelectInput
                    label="Average Sleep"
                    value={formData.lifestyle.sleep}
                    onChange={(e) => handleLifestyleChange('sleep', e.target.value)}
                    options={SLEEP_OPTIONS}
                  />
                </div>
              </FormStep>
            )}
          </div>

          {(error || validationErrors.length > 0) && (
            <div
              role="alert"
              aria-live="assertive"
              className="my-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-center gap-2"
            >
              <AlertCircle size={20} />
              <span>{error || validationErrors[0]?.message}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1 || isLoading}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              aria-label="Previous step"
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                aria-label="Next step"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2"
                aria-live="polite"
                aria-busy={isLoading}
              >
                {isLoading && <Loader2 className="animate-spin" size={20} />}
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnamnesisPage;
