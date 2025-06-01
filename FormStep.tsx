import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface FormStepProps {
  title: string;
  icon: React.ReactNode;
}

export const FormStep: React.FC<PropsWithChildren<FormStepProps>> = ({ title, icon, children }) => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
      {icon}
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </motion.div>
);
