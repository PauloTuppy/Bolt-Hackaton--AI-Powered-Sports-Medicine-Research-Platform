import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => (
  <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <motion.div
      className="h-full bg-blue-600 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  </div>
);
