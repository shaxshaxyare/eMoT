
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProcurementRequest, View } from '../../types';
import { ArrowLeft, Search, Plus } from 'lucide-react';

interface ProcurementProps {
    navigate: (view: View) => void;
}

const mockRequests: ProcurementRequest[] = [
    { id: 'PR-088', department: 'IT', item: 'Laptop Computers', quantity: 10, requestor: 'A. Hassan', date: '2025-11-22', status: 'Pending' },
    { id: 'PR-087', department: 'Engineering', item: 'Road Cones', quantity: 200, requestor: 'E. Fatima', date: '2025-11-21', status: 'Approved' },
    { id: 'PR-086', department: 'Admin', item: 'Office Stationery', quantity: 1, requestor: 'S. Ali', date: '2025-11-20', status: 'Fulfilled' },
    { id: 'PR-085', department: 'Meteorology', item: 'Weather Balloons', quantity: 50, requestor: 'M. Omar', date: '2025-11-19', status: 'Rejected' },
];

const Procurement: React.FC<ProcurementProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('payroll')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Procurement</h1>
                    <p className="text-brand-gray-600">Manage departmental requests, bids, and approvals.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" /><input type="text" placeholder="Search by item or dept..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm" /></div>
                    <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> New Request</button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Request ID</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3">Item</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRequests.map(req => (
                                <tr key={req.id} className="border-b">
                                    <td className="px-4 py-3 font-mono text-xs">{req.id}</td>
                                    <td className="px-4 py-3">{req.department}</td>
                                    <td className="px-4 py-3 font-medium">{req.item} (x{req.quantity})</td>
                                    <td className="px-4 py-3">{req.date}</td>
                                    <td className="px-4 py-3"><Badge variant={req.status === 'Fulfilled' ? 'success' : req.status === 'Approved' ? 'info' : req.status === 'Rejected' ? 'danger' : 'warning'}>{req.status}</Badge></td>
                                    <td className="px-4 py-3 text-right"><button className="font-medium text-brand-blue-600 hover:underline">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Procurement;
