import React, { PropsWithChildren } from 'react';

interface AuthContainerProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const AuthContainer: React.FC<PropsWithChildren<AuthContainerProps>> = ({
  title,
  description,
  icon,
  children
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {icon}
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
