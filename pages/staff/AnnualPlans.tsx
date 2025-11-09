
import React, { useState } from 'react';
import { View, AnnualPlan } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { List, FileText, Plus, X } from 'lucide-react';

interface AnnualPlansProps {
    navigate: (view: View) => void;
}

const mockPlans: AnnualPlan[] = [
    { id: 'AP-2026', year: 2026, title: '2026 Ministry Strategic Plan', status: 'Draft', progress: 15, objectives: [{id: 'o1', text: 'Digitize 5 new services', completed: false}, {id: 'o2', text: 'Reduce processing times by 10%', completed: false}] },
    { id: 'AP-2025', year: 2025, title: '2025 Ministry Strategic Plan', status: 'Active', progress: 75, objectives: [{id: 'o3', text: 'Launch new public portal', completed: true}, {id: 'o4', text: 'Improve road safety campaign outreach', completed: true}, {id: 'o5', text: 'Update vehicle import regulations', completed: false}] },
    { id: 'AP-2024', year: 2024, title: '2024 Ministry Strategic Plan', status: 'Approved', progress: 100, objectives: [] },
];

const PlanModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-5 border-b flex justify-between items-center"><h2 className="text-lg font-semibold">Create New Annual Plan</h2><button onClick={onClose}><X size={20}/></button></div>
            <div className="p-6 space-y-4">
                <input placeholder="Plan Title (e.g., 2027 Ministry Strategic Plan)" className="w-full border p-2 rounded"/>
                <input type="number" placeholder="Year (e.g., 2027)" className="w-full border p-2 rounded"/>
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-end"><button className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg">Save Plan</button></div>
        </div>
    </div>
);

const AnnualPlans: React.FC<AnnualPlansProps> = ({ navigate }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
        {isModalOpen && <PlanModal onClose={() => setModalOpen(false)} />}
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Planning & Policy</h1>
                <p className="text-brand-gray-600">Manage annual plans, targets, and official policy documents.</p>
            </div>
            <Card>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => setModalOpen(true)} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><Plus size={20} /><span>Create New Annual Plan</span></button>
                    <button onClick={() => navigate('policy-docs')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><FileText size={20} /><span>Manage Policy Documents</span></button>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Strategic Annual Plans</h2>
                <div className="space-y-4">
                    {mockPlans.map(plan => (
                        <div key={plan.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{plan.title}</h3>
                                    <Badge variant={plan.status === 'Active' ? 'success' : 'default'}>{plan.status}</Badge>
                                </div>
                                <span className="text-sm font-semibold">{plan.year}</span>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-brand-gray-500">Progress</span>
                                    <span className="text-sm font-medium">{plan.progress}%</span>
                                </div>
                                <div className="w-full bg-brand-gray-200 rounded-full h-2.5"><div className="bg-brand-blue-600 h-2.5 rounded-full" style={{ width: `${plan.progress}%` }}></div></div>
                            </div>
                            {plan.objectives.length > 0 && <div className="mt-4 pt-3 border-t"><h4 className="text-sm font-semibold mb-2">Key Objectives</h4><ul className="space-y-1 text-sm">{plan.objectives.map(o => <li key={o.id} className={`${o.completed ? 'line-through text-gray-500' : ''}`}>{o.text}</li>)}</ul></div>}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
        </>
    );
};

export default AnnualPlans;
