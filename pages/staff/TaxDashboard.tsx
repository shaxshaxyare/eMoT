import React from 'react';
import { View } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DollarSign, Clock, CheckCircle, FileText, Banknote, UserCheck } from 'lucide-react';

interface TaxDashboardProps {
    navigate: (view: View) => void;
}

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ElementType, color: string }> = ({ title, value, icon: Icon, color }) => (
    <Card className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-brand-gray-500">{title}</p>
        </div>
    </Card>
);

const recentPayments = [
    { id: 'PAY-001', owner: 'Axmed Cumar', plate: 'ABC-4821', amount: 75.00, date: '2025-11-20' },
    { id: 'PAY-002', owner: 'Farhiya Jaamac', plate: 'TRK-9023', amount: 120.00, date: '2025-11-20' },
    { id: 'PAY-003', owner: 'Xaliimo Aadan', plate: 'VAN-3312', amount: 90.00, date: '2025-11-19' },
];

const TaxDashboard: React.FC<TaxDashboardProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Road Tax (Tremistrale) Dashboard</h1>
        <p className="text-brand-gray-600">Monitor revenue, overdue payments, and compliance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Revenue (This Quarter)" value="$12,450" icon={DollarSign} color="green" />
        <StatCard title="Overdue Invoices" value={82} icon={Clock} color="amber" />
        <StatCard title="Payments to Verify" value={12} icon={CheckCircle} color="blue" />
      </div>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Task Queues</h2>
        <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('invoices')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><FileText size={20} /><span>Invoice Management</span></button>
            <button onClick={() => navigate('payment-verification')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><Banknote size={20} /><span>Payment Verification</span></button>
            <button onClick={() => navigate('compliance')} className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg font-medium hover:bg-amber-100 flex items-center space-x-2"><UserCheck size={20} /><span>Compliance Check</span></button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Recently Paid Invoices</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Owner</th>
                        <th className="px-4 py-3">Vehicle Plate</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentPayments.map(p => (
                        <tr key={p.id} className="border-b">
                            <td className="px-4 py-3 font-medium">{p.owner}</td>
                            <td className="px-4 py-3">{p.plate}</td>
                            <td className="px-4 py-3">${p.amount.toFixed(2)}</td>
                            <td className="px-4 py-3">{p.date}</td>
                            <td className="px-4 py-3"><Badge variant="success">Paid</Badge></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default TaxDashboard;
