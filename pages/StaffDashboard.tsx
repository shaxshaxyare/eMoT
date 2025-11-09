import React from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { FileText, Receipt, Users, CheckSquare, BarChart2 } from 'lucide-react';

interface StaffDashboardProps {
  navigate: (view: View) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Staff Dashboard</h1>
          <p className="text-brand-gray-600">Snapshot of workload, payments, and quick links.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-brand-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-brand-gray-500">New Applications</p>
              <p className="text-2xl font-semibold mt-1">12</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-brand-gray-500">SLA Breaches</p>
              <p className="text-2xl font-semibold mt-1">3</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <Receipt className="w-8 h-8 text-amber-500" />
            <div className="ml-4">
              <p className="text-sm text-brand-gray-500">Payments Today</p>
              <p className="text-2xl font-semibold mt-1">$4,250</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <BarChart2 className="w-8 h-8 text-indigo-500" />
            <div className="ml-4">
              <p className="text-sm text-brand-gray-500">Reports Ready</p>
              <p className="text-2xl font-semibold mt-1">5</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <button
                onClick={() => navigate('staff-applications')}
                className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100"
            >
                View Intake Queue
            </button>
            <button
                onClick={() => navigate('tasks')}
                className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200"
            >
                Go to My Tasks
            </button>
            <button
                onClick={() => navigate('workflows')}
                className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200"
            >
                Monitor Workflows
            </button>
             <button
                onClick={() => navigate('operational-reports')}
                className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200"
            >
                Generate Report
            </button>
          </div>
      </Card>
    </div>
  );
};

export default StaffDashboard;