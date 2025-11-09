
import React from 'react';
import { View } from '../../types';
import { Card } from '../../components/ui/Card';
import { Banknote, FileCog, DollarSign, Wallet, ShoppingCart, BarChart, Clock, CheckCircle } from 'lucide-react';

interface PayrollProps {
    navigate: (view: View) => void;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
    <Card className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100`}><Icon className={`w-6 h-6 text-${color}-600`} /></div>
        <div className="ml-4"><p className="text-2xl font-bold">{value}</p><p className="text-sm text-brand-gray-500">{title}</p></div>
    </Card>
);

const recentActivities = [
    { id: 1, text: 'Wallet top-up of $50.00 by A. Johnson approved.', timestamp: '2 mins ago', icon: Wallet },
    { id: 2, text: 'Procurement request #PR-088 for IT equipment submitted.', timestamp: '1 hour ago', icon: ShoppingCart },
    { id: 3, text: 'Q4 Road Tax payments batch processed.', timestamp: '4 hours ago', icon: DollarSign },
];

const Payroll: React.FC<PayrollProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Finance & Administration</h1>
        <p className="text-brand-gray-600">Monitor financial operations, manage fees, and oversee procurement.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Revenue (Today)" value="$1,250" icon={DollarSign} color="green" />
          <StatCard title="Pending Wallet Approvals" value="3" icon={Wallet} color="blue" />
          <StatCard title="Open Procurement Requests" value="5" icon={ShoppingCart} color="amber" />
      </div>

      <Card>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('fee-management')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><FileCog size={20} /><span>Fee Management</span></button>
              <button onClick={() => navigate('wallet-management')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><Wallet size={20} /><span>Wallet Top-Up Approvals</span></button>
              <button onClick={() => navigate('procurement')} className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg font-medium hover:bg-amber-100 flex items-center space-x-2"><ShoppingCart size={20} /><span>Procurement Requests</span></button>
              <button onClick={() => navigate('budget-revenue')} className="bg-purple-50 text-purple-700 px-4 py-3 rounded-lg font-medium hover:bg-purple-100 flex items-center space-x-2"><BarChart size={20} /><span>Budget & Revenue</span></button>
          </div>
      </Card>

      <Card>
          <h2 className="text-lg font-semibold mb-4">Recent Financial Activities</h2>
          <ul className="space-y-3">
              {recentActivities.map(act => (
                  <li key={act.id} className="flex items-center p-2">
                      <div className="p-2 bg-brand-gray-100 rounded-full mr-3"><act.icon className="w-5 h-5 text-brand-gray-600"/></div>
                      <div className="flex-grow"><p className="text-sm">{act.text}</p></div>
                      <div className="text-xs text-brand-gray-500">{act.timestamp}</div>
                  </li>
              ))}
          </ul>
      </Card>
    </div>
  );
};

export default Payroll;
