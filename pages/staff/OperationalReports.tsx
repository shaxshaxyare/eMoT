import React from 'react';
import { View } from '../../types';
import { Card } from '../../components/ui/Card';
import { BarChart2, DollarSign, BookOpen, Clock, Users, BarChart } from 'lucide-react';

interface OperationalReportsProps {
    navigate: (view: View) => void;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <Card className="flex items-center">
        <Icon className="w-8 h-8 text-brand-blue-500" />
        <div className="ml-4">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-brand-gray-500">{title}</p>
        </div>
    </Card>
);

const applicationData = [
    { name: 'Vehicles', count: 125 },
    { name: 'Licensing', count: 210 },
    { name: 'Road Tax', count: 450 },
    { name: 'Engineering', count: 30 },
];

const Bar: React.FC<{ label: string; value: number; maxValue: number }> = ({ label, value, maxValue }) => (
    <div className="flex items-center">
        <div className="w-32 text-sm text-brand-gray-600 shrink-0">{label}</div>
        <div className="flex-grow bg-brand-gray-200 rounded-full h-6 mr-2">
            <div className="bg-brand-blue-500 h-6 rounded-full text-white text-xs flex items-center justify-end pr-2" style={{ width: `${(value / maxValue) * 100}%` }}>
                {value}
            </div>
        </div>
    </div>
);


const OperationalReports: React.FC<OperationalReportsProps> = ({ navigate }) => {
    const maxCount = Math.max(...applicationData.map(d => d.count));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-brand-gray-600">View and export statistics and dashboards.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Applications (Month)" value="815" icon={BarChart2} />
          <StatCard title="Avg. Processing Time" value="3.2 days" icon={Clock} />
          <StatCard title="Active Staff Users" value="28" icon={Users} />
          <StatCard title="SLA Success Rate" value="98.5%" icon={BarChart} />
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => navigate('financial-reports')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><DollarSign size={20} /><span>Financial Reports</span></button>
          <button onClick={() => navigate('exports')} className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg font-medium hover:bg-amber-100 flex items-center space-x-2"><BookOpen size={20} /><span>Data Exports</span></button>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Applications Processed by Department (Last 30 Days)</h2>
        <div className="space-y-4">
            {applicationData.map(data => (
                <Bar key={data.name} label={data.name} value={data.count} maxValue={maxCount} />
            ))}
        </div>
      </Card>
    </div>
  );
};

export default OperationalReports;