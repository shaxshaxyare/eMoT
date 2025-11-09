
import React from 'react';
import { Card } from '../../components/ui/Card';
import { SignatureRequest, View } from '../../types';
import { ArrowLeft, Edit } from 'lucide-react';

interface ESignaturesProps {
    navigate: (view: View) => void;
}

const mockRequests: SignatureRequest[] = [
    { id: 'SIG-001', documentName: 'Vehicle Registration - APP-VR-004', requestor: 'Admin', date: '2025-11-18', status: 'Pending' },
    { id: 'SIG-002', documentName: 'Ownership Transfer - APP-OT-003', requestor: 'John Doe', date: '2025-11-19', status: 'Pending' },
    { id: 'SIG-003', documentName: 'Official Notice - NTC-105', requestor: 'A. Hassan', date: '2025-11-22', status: 'Signed' },
];

const ESignatures: React.FC<ESignaturesProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
             <div className="flex items-center space-x-3">
                <button onClick={() => navigate('document-generator')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">E-Signatures</h1>
                    <p className="text-brand-gray-600">Manage signature profiles and sign pending documents.</p>
                </div>
            </div>
            
            <Card>
                <h2 className="text-lg font-semibold mb-4">Pending Signature Queue</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Document Name</th>
                                <th className="px-4 py-3">Requestor</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRequests.filter(r => r.status === 'Pending').map(req => (
                                <tr key={req.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{req.documentName}</td>
                                    <td className="px-4 py-3">{req.requestor}</td>
                                    <td className="px-4 py-3">{req.date}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="bg-green-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-700 flex items-center ml-auto">
                                            <Edit size={14} className="mr-1.5"/> Sign Document
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ESignatures;
