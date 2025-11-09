import React, { useState } from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, Edit, ToggleLeft, ToggleRight, X, Search, Filter } from 'lucide-react';

interface FeeManagementProps {
  navigate: (view: View) => void;
}

type FeeStatus = 'Active' | 'Inactive';

interface Fee {
    id: number;
    serviceName: string;
    amount: number;
    status: FeeStatus;
    lastUpdated: string;
}

const initialFees: Fee[] = [
    { id: 1, serviceName: 'Vehicle Registration - Private', amount: 150.00, status: 'Active', lastUpdated: '2025-11-10' },
    { id: 2, serviceName: 'Vehicle Registration - Commercial', amount: 250.00, status: 'Active', lastUpdated: '2025-11-10' },
    { id: 3, serviceName: 'Driver License - New (Class B)', amount: 100.00, status: 'Active', lastUpdated: '2025-10-22' },
    { id: 4, serviceName: 'Driver License - Renewal', amount: 50.00, status: 'Active', lastUpdated: '2025-10-22' },
    { id: 5, serviceName: 'Vehicle Ownership Transfer', amount: 50.00, status: 'Active', lastUpdated: '2025-09-15' },
    { id: 6, serviceName: 'Replacement License Card', amount: 25.00, status: 'Active', lastUpdated: '2025-09-15' },
    { id: 7, serviceName: 'Old Paper-based Processing', amount: 20.00, status: 'Inactive', lastUpdated: '2024-01-01' },
];

const FeeModal: React.FC<{ fee: Fee | null; onClose: () => void; onSave: (fee: Fee) => void }> = ({ fee, onClose, onSave }) => {
    const [currentFee, setCurrentFee] = useState<Fee>(
        fee || { id: Date.now(), serviceName: '', amount: 0, status: 'Active', lastUpdated: new Date().toISOString().split('T')[0] }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentFee(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value as any }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...currentFee, lastUpdated: new Date().toISOString().split('T')[0] });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" role="dialog">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" role="document">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{fee ? 'Edit Fee' : 'Add New Fee'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-brand-gray-700">Service Name</label>
                            <input type="text" name="serviceName" value={currentFee.serviceName} onChange={handleChange} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-brand-gray-700">Fee Amount ($)</label>
                            <input type="number" name="amount" value={currentFee.amount} onChange={handleChange} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" required min="0" step="0.01" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-brand-gray-700">Status</label>
                            <select name="status" value={currentFee.status} onChange={handleChange} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm bg-white">
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-brand-gray-50 border-t flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100">Cancel</button>
                        <button type="submit" className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">Save Fee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FeeManagement: React.FC<FeeManagementProps> = ({ navigate }) => {
    const [fees, setFees] = useState<Fee[]>(initialFees);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFee, setEditingFee] = useState<Fee | null>(null);

    const handleOpenModal = (fee: Fee | null) => {
        setEditingFee(fee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingFee(null);
        setIsModalOpen(false);
    };

    const handleSaveFee = (feeToSave: Fee) => {
        setFees(prev => {
            const exists = prev.find(f => f.id === feeToSave.id);
            if (exists) {
                return prev.map(f => f.id === feeToSave.id ? feeToSave : f);
            }
            return [...prev, feeToSave];
        });
        handleCloseModal();
    };

    const handleToggleStatus = (feeToToggle: Fee) => {
        // FIX: Explicitly type `updatedFee` as `Fee` to ensure type safety.
        // The compiler was incorrectly inferring the `status` property as `string` instead of `FeeStatus`.
        const updatedFee: Fee = { ...feeToToggle, status: feeToToggle.status === 'Active' ? 'Inactive' : 'Active', lastUpdated: new Date().toISOString().split('T')[0] };
        handleSaveFee(updatedFee);
    };

    return (
    <>
        {isModalOpen && <FeeModal fee={editingFee} onClose={handleCloseModal} onSave={handleSaveFee} />}
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Application Fee Management</h1>
                    <p className="text-brand-gray-600">View and configure service fees for the portal.</p>
                </div>
                <button onClick={() => handleOpenModal(null)} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 flex items-center">
                    <Plus className="w-4 h-4 mr-2"/>
                    Add New Fee
                </button>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" placeholder="Search by service name..." className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Filter className="w-4 h-4 mr-1.5"/> Status</button>
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Export</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Service Name</th>
                                <th className="px-4 py-3">Fee Amount</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Last Updated</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map(fee => (
                                <tr key={fee.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{fee.serviceName}</td>
                                    <td className="px-4 py-3">${fee.amount.toFixed(2)}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={fee.status === 'Active' ? 'success' : 'default'}>{fee.status}</Badge>
                                    </td>
                                    <td className="px-4 py-3">{fee.lastUpdated}</td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button onClick={() => handleToggleStatus(fee)} title={fee.status === 'Active' ? 'Deactivate' : 'Activate'} className="p-1.5 rounded-md hover:bg-brand-gray-100">
                                            {fee.status === 'Active' ? <ToggleRight className="w-5 h-5 text-green-600" /> : <ToggleLeft className="w-5 h-5 text-brand-gray-500" />}
                                        </button>
                                        <button onClick={() => handleOpenModal(fee)} title="Edit" className="p-1.5 rounded-md hover:bg-brand-gray-100">
                                            <Edit className="w-5 h-5 text-brand-blue-700" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    </>
    );
};

export default FeeManagement;