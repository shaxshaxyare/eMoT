import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LicenseApplication, View } from '../../types';
import { Printer, X, ArrowLeft } from 'lucide-react';

const mockApplications: LicenseApplication[] = [
    { id: 'APP-DL-004', applicant: { name: 'Sahra Cali', id: 'SC-1234-56', avatarUrl: '...' }, type: 'New', licenseClass: 'A', submitted: '2025-11-18', status: 'Approved', assignee: 'Admin', slaDaysLeft: 0, documents: [] },
    { id: 'APP-DL-010', applicant: { name: 'Liban Mohamed', id: 'LM-6543-21', avatarUrl: '...' }, type: 'Renewal', licenseClass: 'B', submitted: '2025-11-17', status: 'Approved', assignee: 'Admin', slaDaysLeft: 0, documents: [] },
];

const DigitalCardPreview: React.FC<{ app: LicenseApplication, onClose: () => void }> = ({ app, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-5 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Digital License Preview</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
            </div>
            <div className="p-6">
                {/* Simplified license card */}
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-6 rounded-lg border">
                    <h3 className="font-bold text-xl">{app.applicant.name}</h3>
                    <p>License #: DL-{app.applicant.id.replace('-', '')}</p>
                    <p>Class: {app.licenseClass}</p>
                    <p>Status: Active</p>
                </div>
            </div>
        </div>
    </div>
);

interface LicenseIssuanceProps {
    navigate: (view: View) => void;
}

const LicenseIssuance: React.FC<LicenseIssuanceProps> = ({ navigate }) => {
    const [applications, setApplications] = useState(mockApplications);
    const [previewingApp, setPreviewingApp] = useState<LicenseApplication | null>(null);

    const handleUpdateStatus = (appId: string, newStatus: LicenseApplication['status']) => {
        setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    };
    
    return (
        <>
            {previewingApp && <DigitalCardPreview app={previewingApp} onClose={() => setPreviewingApp(null)} />}
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate('licensing-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                        <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">License Issuance</h1>
                        <p className="text-brand-gray-600">Generate and issue licenses for approved applicants.</p>
                    </div>
                </div>
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Issuance Queue ({applications.filter(a => a.status === 'Approved').length})</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Applicant</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(app => (
                                    <tr key={app.id} className="border-b">
                                        <td className="px-4 py-3 font-medium">{app.applicant.name}</td>
                                        <td className="px-4 py-3">{app.type}</td>
                                        <td className="px-4 py-3"><Badge variant="default">Class {app.licenseClass}</Badge></td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            {app.status === 'Approved' && (
                                                <>
                                                    <button onClick={() => setPreviewingApp(app)} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm hover:bg-brand-gray-100">Preview</button>
                                                    <button onClick={() => handleUpdateStatus(app.id, 'Issued')} className="bg-brand-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-brand-blue-700 flex items-center">
                                                        <Printer size={14} className="mr-1.5"/> Send to Print
                                                    </button>
                                                </>
                                            )}
                                            {app.status === 'Issued' && (
                                                <Badge variant="success">Issued</Badge>
                                            )}
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

export default LicenseIssuance;