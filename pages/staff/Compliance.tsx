import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RoadTaxInvoice, View } from '../../types';
import { ArrowLeft, Search } from 'lucide-react';
import { mockInvoices } from '../../data/taxData';


interface ComplianceProps {
    navigate: (view: View) => void;
}

const Compliance: React.FC<ComplianceProps> = ({ navigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [vehicleHistory, setVehicleHistory] = useState<RoadTaxInvoice[]>([]);
    const [searchedPlate, setSearchedPlate] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const plate = searchQuery.trim().toUpperCase();
        if (plate) {
            const history = mockInvoices
                .filter(inv => inv.vehicle.plate.toUpperCase() === plate)
                .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
            setVehicleHistory(history);
            setSearchedPlate(plate);
        }
    };

    const complianceStatus = useMemo(() => {
        if (!searchedPlate) return null;
        const unpaid = vehicleHistory.some(h => h.status === 'Due' || h.status === 'Overdue');
        return unpaid ? 'Non-Compliant' : 'Compliant';
    }, [searchedPlate, vehicleHistory]);

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('tax-dashboard')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Compliance Check</h1>
                    <p className="text-brand-gray-600">Check a vehicle's road tax compliance status.</p>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSearch} className="flex space-x-2">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter vehicle plate number..." className="w-full border border-brand-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none" />
                    </div>
                    <button type="submit" className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">Check Status</button>
                </form>
            </Card>

            {searchedPlate && (
                <Card>
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold">{searchedPlate}</h2>
                            <p className="text-brand-gray-500">{vehicleHistory[0]?.vehicle.make} {vehicleHistory[0]?.vehicle.model} - {vehicleHistory[0]?.owner.name}</p>
                        </div>
                        <div>
                             <p className="text-sm text-brand-gray-500 text-right">Current Status</p>
                             <Badge variant={complianceStatus === 'Compliant' ? 'success' : 'danger'}>{complianceStatus}</Badge>
                        </div>
                    </div>
                    {vehicleHistory.length > 0 ? (
                        <div className="mt-4 pt-4 border-t">
                            <h3 className="text-lg font-semibold mb-2">Payment History</h3>
                            <div className="overflow-x-auto">
                                 <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                                        <tr>
                                            <th className="px-4 py-3">Period</th>
                                            <th className="px-4 py-3">Due Date</th>
                                            <th className="px-4 py-3">Payment Date</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicleHistory.map(h => (
                                            <tr key={h.id} className="border-b">
                                                <td className="px-4 py-3 font-medium">{h.period}</td>
                                                <td className="px-4 py-3">{h.dueDate}</td>
                                                <td className="px-4 py-3">{h.paymentDate || 'N/A'}</td>
                                                <td className="px-4 py-3">${h.amount.toFixed(2)}</td>
                                                <td className="px-4 py-3"><Badge variant={h.status === 'Paid' ? 'success' : h.status === 'Overdue' ? 'danger' : 'warning'}>{h.status}</Badge></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 pt-4 border-t text-center py-8">
                            <p className="text-brand-gray-500">No invoice history found for this vehicle plate.</p>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default Compliance;
