import React from 'react';
import { Card } from '../ui/Card';
import { View } from '../../types';
import { ArrowLeft } from 'lucide-react';

interface GenericPlaceholderProps {
  title: string;
  description: string;
  quickActions: { name: string; onClick?: () => void }[];
  navigate?: (view: View) => void;
  backView?: View;
}

const GenericPlaceholder: React.FC<GenericPlaceholderProps> = ({ title, description, quickActions, navigate, backView }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        {navigate && backView && (
            <button onClick={() => navigate(backView)} className="p-2 rounded-full hover:bg-brand-gray-100">
                <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
            </button>
        )}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-brand-gray-600">{description}</p>
        </div>
      </div>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          {quickActions.map(action => (
            <button
              key={action.name}
              onClick={action.onClick}
              className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100"
            >
              {action.name}
            </button>
          ))}
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Content Area</h2>
        <div className="text-center py-12 bg-brand-gray-50 rounded-lg">
          <p className="text-brand-gray-500">Implementation for "{title}" page is pending.</p>
        </div>
      </Card>
    </div>
  );
};

export default GenericPlaceholder;