import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LicenseApplication, View } from '../../types';
import { Check, X, Info, FileText, ArrowLeft } from 'lucide-react';

const mockApplications: LicenseApplication[] = [
    { id: 'APP-DL-001', applicant: { name: 'Farhiya Jaamac', id: 'FJ-5432-10', avatarUrl: '...' }, type: 'Renewal', licenseClass: 'B', submitted: '2025-11-21', status: 'Pending Verification', assignee: 'Jane Smith', slaDaysLeft: 4, documents: [{name: 'Medical_Cert.pdf', type: 'Medical', url: '#'}, {name: 'Residency_Proof.pdf', type: 'Residency', url: '#'}] },
    { id: 'APP-DL-005', applicant: { name: 'Cabdullahi Nuur', id: 'CN-8877-66', avatarUrl: '...' }, type: 'New', licenseClass: 'A', submitted: '2025-11-22', status: 'Pending Verification', assignee: null, slaDaysLeft: 6, documents: [{name: 'Applicant_Photo.jpg', type: 'Photo', url: '#'}, {name: 'National_ID_Copy.pdf', type: 'ID', url: '#'}] },
];

interface LicensingVerificationProps {
    navigate: (view: View) => void;
}

const LicensingVerification: React.FC<LicensingVerificationProps> = ({ navigate }) => {
    const [applications, setApplications] = useState(mockApplications);
    const [selectedApp, setSelectedApp] = useState<LicenseApplication | null>(applications[0] || null);
    
    const handleAction = (appId: string, action: 'approve' | 'reject' | 'requestInfo') => {
        setApplications(apps => apps.filter(app => app.id !== appId));
        if (selectedApp?.id === appId) {
            setSelectedApp(applications.find(app => app.id !== appId) || null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('licensing-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Licensing Verification Queue</h1>
                    <p className="text-brand-gray-600">Verify applicant details and documents.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Intake Queue ({applications.length})</h2>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                            {applications.map(app => (
                                <button key={app.id} onClick={() => setSelectedApp(app)} className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedApp?.id === app.id ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-transparent hover:bg-brand-gray-100'}`}>
                                    <p className="font-semibold">{app.applicant.name}</p>
                                    <p className="text-sm text-brand-gray-600">{app.type} - Class {app.licenseClass}</p>
                                    <p className="text-xs text-brand-gray-500 mt-1">Submitted: {app.submitted}</p>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    {selectedApp ? (
                        <Card>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold">{selectedApp.applicant.name}</h2>
                                            <p className="text-brand-gray-500">{selectedApp.type} Application - #{selectedApp.id}</p>
                                        </div>
                                        <Badge variant={selectedApp.slaDaysLeft <= 2 ? 'warning' : 'info'}>SLA: {selectedApp.slaDaysLeft} days left</Badge>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold mb-2">Documents for Verification</h3>
                                    <ul className="space-y-2">
                                        {selectedApp.documents.map(doc => (
                                            <li key={doc.name} className="flex justify-between items-center p-2 bg-white border rounded-md">
                                                <div className="flex items-center space-x-2"><FileText size={16} className="text-brand-gray-500" /><p className="text-sm font-medium">{doc.name}</p></div>
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-blue-600 hover:underline">View</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold mb-2">Verification Checklist</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center p-2 bg-brand-gray-50 rounded-md"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 mr-3"/> National ID matches applicant details.</label>
                                        <label className="flex items-center p-2 bg-brand-gray-50 rounded-md"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 mr-3"/> Medical certificate is valid and from an approved doctor.</label>
                                        <label className="flex items-center p-2 bg-brand-gray-50 rounded-md"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 mr-3"/> Proof of residency is current (within 3 months).</label>
                                        <label className="flex items-center p-2 bg-brand-gray-50 rounded-md"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 mr-3"/> No outstanding fines or violations on record.</label>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t flex justify-end space-x-2">
                                    <button onClick={() => handleAction(selectedApp.id, 'requestInfo')} className="bg-white border border-brand-gray-300 text-brand-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-brand-gray-100 flex items-center"><Info size={16} className="mr-2"/> Request Info</button>
                                    <button onClick={() => handleAction(selectedApp.id, 'reject')} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 flex items-center"><X size={16} className="mr-2"/> Reject</button>
                                    <button onClick={() => handleAction(selectedApp.id, 'approve')} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"><Check size={16} className="mr-2"/> Pass Verification</button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="text-center py-20">
                            <p className="text-brand-gray-500">Select a license application from the queue to begin verification.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LicensingVerification;