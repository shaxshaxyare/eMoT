
import React from 'react';
import { Card } from '../../components/ui/Card';
import { BudgetLineItem, View } from '../../types';
import { ArrowLeft, DollarSign } from 'lucide-react';

interface BudgetRevenueProps {
    navigate: (view: View) => void;
}

const budgetData: BudgetLineItem[] = [
    { department: 'Licensing', budget: 500000, spent: 375000 },
    { department: 'Road Tax', budget: 250000, spent: 150000 },
    { department: 'Engineering', budget: 1200000, spent: 950000 },
    { department: 'Admin', budget: 300000, spent: 280000 },
    { department: 'IT', budget: 450000, spent: 400000 },
];

const BudgetBar: React.FC<{ item: BudgetLineItem }> = ({ item }) => {
    const percentage = (item.spent / item.budget) * 100;
    const barColor = percentage > 90 ? 'bg-red-500' : percentage > 75 ? 'bg-amber-500' : 'bg-green-500';
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{item.department}</span>
                <span className="text-sm text-brand-gray-500">${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}</span>
            </div>
            <div className="w-full bg-brand-gray-200 rounded-full h-4"><div className={`${barColor} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div></div>
        </div>
    );
};

const BudgetRevenue: React.FC<BudgetRevenueProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('payroll')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Budget & Revenue</h1>
                    <p className="text-brand-gray-600">Monitor departmental allocations, spending, and revenue.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Total Revenue Collected (YTD)</h2>
                    <p className="text-4xl font-bold text-green-600">$4,850,230.00</p>
                </Card>
                 <Card>
                    <h2 className="text-lg font-semibold mb-4">Total Budget Spent (YTD)</h2>
                    <p className="text-4xl font-bold text-red-600">$2,155,000.00</p>
                </Card>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Departmental Budget Usage</h2>
                <div className="space-y-6">
                    {budgetData.map(item => <BudgetBar key={item.department} item={item} />)}
                </div>
            </Card>
        </div>
    );
};

export default BudgetRevenue;
