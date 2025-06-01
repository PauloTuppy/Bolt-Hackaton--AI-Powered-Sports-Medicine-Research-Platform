import React from 'react';
import { Beaker } from 'lucide-react';

interface Supplement {
  name: string;
  dosage: string;
  purpose: string;
}

interface SupplementProtocolProps {
  supplementPlan: Supplement[];
}

export const SupplementProtocol: React.FC<SupplementProtocolProps> = ({ supplementPlan }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Beaker className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Supplement Protocol</h2>
      </div>

      <div className="space-y-4">
        {supplementPlan.map((supplement, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <h3 className="font-semibold text-gray-800 mb-1">{supplement.name}</h3>
            <div className="text-sm">
              <p className="text-gray-600">Dosage: {supplement.dosage}</p>
              <p className="text-gray-500 mt-1">{supplement.purpose}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
