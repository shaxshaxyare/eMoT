import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { VehicleApplication, View } from '../../types';
import { Check, X, Info, FileText, ArrowLeft } from 'lucide-react';

const mockApplications: VehicleApplication[] = [
    { id: 'APP-VR-001', applicant: { name: 'Axmed Cumar', id: 'AC-9876-54', avatarUrl: '...' }, vehicle: { make: 'Toyota', model: 'Land Cruiser', year: 2023, vin: 'JTDKR...' }, service: 'New Registration', submitted: '2025-11-20', status: 'Pending Verification', assignee: null, slaDaysLeft: 5, documents: [{name: 'National_ID.pdf', type: 'ID', url: '#'}, {name: 'Proof_of_Sale.pdf', type: 'Ownership', url: '#'}] },
    { id: 'APP-OT-008', applicant: { name: 'Sahra Cali', id: 'SC-1234-56', avatarUrl: '...' }, vehicle: { make: 'Mercedes', model: 'C-Class', year: 2019, vin: 'WDD205...' }, service: 'Ownership Transfer', submitted: '2025-11-21', status: 'Pending Verification', assignee: null, slaDaysLeft: 4, documents: [{name: 'Transfer_Form.pdf', type: 'Transfer', url: '#'}, {name: 'Seller_ID.pdf', type: 'ID', url: '#'}] },
];

interface VerificationProps {
    navigate: (view: View) => void;
}

const Verification: React.FC<VerificationProps> = ({ navigate }) => {
    const [applications, setApplications] = useState(mockApplications);
    const [selectedApp, setSelectedApp] = useState<VehicleApplication | null>(applications[0] || null);
    
    const handleAction = (appId: string, action: 'approve' | 'reject' | 'requestInfo') => {
        setApplications(apps => apps.filter(app => app.id !== appId));
        if (selectedApp?.id === appId) {
            setSelectedApp(applications.find(app => app.id !== appId) || null);
        }
        // In a real app, you'd update the application status and send notifications
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('staff-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Verification Queue</h1>
                    <p className="text-brand-gray-600">Review and verify documents for new applications.</p>
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
                                    <p className="text-sm text-brand-gray-600">{app.service}</p>
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
                                            <p className="text-brand-gray-500">{selectedApp.service} - #{selectedApp.id}</p>
                                        </div>
                                        <Badge variant={selectedApp.slaDaysLeft <= 2 ? 'warning' : 'info'}>SLA: {selectedApp.slaDaysLeft} days left</Badge>
                                    </div>
                                    <div className="mt-4 p-3 bg-brand-gray-50 rounded-lg grid grid-cols-2 gap-4 text-sm">
                                        <div><p className="text-brand-gray-500">Vehicle</p><p className="font-medium">{selectedApp.vehicle.year} {selectedApp.vehicle.make} {selectedApp.vehicle.model}</p></div>
                                        <div><p className="text-brand-gray-500">VIN</p><p className="font-medium">{selectedApp.vehicle.vin}</p></div>
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
                                        <label className="flex items-center p-2 bg-brand-gray-50 rounded-md"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 mr-3"/> Proof of ownership is valid and signed.</label>
                                        <label className="flex items-center p-2 bg-brand-gray-50 rounded-md"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 mr-3"/> VIN on documents matches system records.</label>
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
                            <p className="text-brand-gray-500">Select an application from the queue to begin verification.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Verification;