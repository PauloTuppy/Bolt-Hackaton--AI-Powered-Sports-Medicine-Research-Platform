import React from 'react';

interface CheckboxGroupProps<T extends readonly string[]> {
  label: string;
  options: T;
  selectedOptions: string[];
  onChange: (value: string[] | string) => void;
}

const CheckboxGroup = <T extends readonly string[]>({
  label,
  options,
  selectedOptions,
  onChange
}: CheckboxGroupProps<T>) => {
  const handleChange = (option: string, isChecked: boolean) => {
    const newSelection = isChecked
      ? [...selectedOptions, option]
      : selectedOptions.filter(item => item !== option);
    onChange(Array.isArray(selectedOptions) ? newSelection : newSelection[0]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={(e) => handleChange(option, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-3 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;