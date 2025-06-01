import React from 'react';

interface CheckboxGroupProps {
  label: string;
  options: readonly string[];
  selectedOptions: string[];
  onChange: (value: string) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selectedOptions, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-2 space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => onChange(option)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          <span className="ml-3 text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  </div>
);
