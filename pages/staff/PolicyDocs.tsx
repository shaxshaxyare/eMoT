
import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PolicyDocument, View } from '../../types';
import { ArrowLeft, Search, Plus, Upload, Send } from 'lucide-react';

interface PolicyDocsProps {
    navigate: (view: View) => void;
}

const mockDocs: PolicyDocument[] = [
    { id: 'POL-001', title: 'Vehicle Importation Regulations', version: 'v2.1', status: 'Published', lastUpdated: '2025-10-15', author: 'Admin' },
    { id: 'POL-002', title: 'Driver License Testing Standards', version: 'v1.3', status: 'In Review', lastUpdated: '2025-11-20', author: 'J. Smith' },
    { id: 'POL-003', title: 'Road Tax Compliance and Enforcement', version: 'v3.0', status: 'Published', lastUpdated: '2025-09-01', author: 'Admin' },
    { id: 'POL-004', title: 'Data Privacy and Security Policy', version: 'v1.0', status: 'Draft', lastUpdated: '2025-11-22', author: 'A. Hassan' },
    { id: 'POL-005', title: 'Staff Code of Conduct', version: 'v1.8', status: 'Archived', lastUpdated: '2024-05-10', author: 'Admin' },
];

const PolicyDocs: React.FC<PolicyDocsProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('annual-plans')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Policy Documents</h1>
                    <p className="text-brand-gray-600">Manage the lifecycle of official ministry documents.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" /><input type="text" placeholder="Search documents..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm" /></div>
                    <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> Draft New Policy</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Version</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Last Updated</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockDocs.map(doc => (
                                <tr key={doc.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{doc.title}</td>
                                    <td className="px-4 py-3">{doc.version}</td>
                                    <td className="px-4 py-3"><Badge variant={doc.status === 'Published' ? 'success' : doc.status === 'In Review' ? 'info' : 'default'}>{doc.status}</Badge></td>
                                    <td className="px-4 py-3">{doc.lastUpdated}</td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button className="font-medium text-brand-blue-600 hover:underline">View</button>
                                        {doc.status === 'Draft' && <button className="font-medium text-amber-600 hover:underline">Submit for Review</button>}
                                        {doc.status === 'In Review' && <button className="font-medium text-green-600 hover:underline">Publish</button>}
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

export default PolicyDocs;
