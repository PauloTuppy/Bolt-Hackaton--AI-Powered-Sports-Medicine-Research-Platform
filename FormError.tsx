import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => (
  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
    <AlertCircle size={14} />
    <span>{message}</span>
  </p>
);
