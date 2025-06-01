import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormStepProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({ title, icon, children }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default FormStep;