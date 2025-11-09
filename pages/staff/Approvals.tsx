import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { VehicleApplication, View } from '../../types';
import { Check, X, User, Car, ArrowLeft } from 'lucide-react';

const mockApplications: VehicleApplication[] = [
    { id: 'APP-OT-003', applicant: { name: 'Cabdi Ismaaciil', id: 'CI-1122-33', avatarUrl: '...' }, vehicle: { make: 'Toyota', model: 'Camry', year: 2020, vin: '4T1B1...' }, service: 'Ownership Transfer', submitted: '2025-11-19', status: 'Pending Approval', assignee: 'John Doe', slaDaysLeft: 1, documents: [] },
    { id: 'APP-VR-010', applicant: { name: 'Fatima Ahmed', id: 'FA-5555-44', avatarUrl: '...' }, vehicle: { make: 'BMW', model: 'X5', year: 2021, vin: '5UXCR...' }, service: 'New Registration', submitted: '2025-11-18', status: 'Pending Approval', assignee: 'Jane Smith', slaDaysLeft: 2, documents: [] },
];


const RejectModal: React.FC<{ app: VehicleApplication; onClose: () => void; onReject: (appId: string, reason: string) => void }> = ({ app, onClose, onReject }) => {
    const [reason, setReason] = useState('');
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Reject Application</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p>Provide a reason for rejecting the application for <strong>{app.applicant.name}</strong>.</p>
                     <div>
                        <label className="text-sm font-medium">Reason for Rejection</label>
                        <textarea value={reason} onChange={e => setReason(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" rows={4} placeholder="e.g., Mismatch in ownership documents..."></textarea>
                    </div>
                </div>
                <div className="p-4 bg-brand-gray-50 border-t flex justify-end">
                    <button disabled={!reason} onClick={() => onReject(app.id, reason)} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center disabled:bg-red-300">
                        <X size={16} className="mr-2"/> Confirm Rejection
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ApprovalsProps {
    navigate: (view: View) => void;
}

const Approvals: React.FC<ApprovalsProps> = ({ navigate }) => {
    const [applications, setApplications] = useState(mockApplications);
    const [rejectingApp, setRejectingApp] = useState<VehicleApplication | null>(null);

    const handleApprove = (appId: string) => {
        setApplications(apps => apps.filter(app => app.id !== appId));
    };
    
    const handleReject = (appId: string, reason: string) => {
        console.log(`Rejecting ${appId} for reason: ${reason}`);
        setApplications(apps => apps.filter(app => app.id !== appId));
        setRejectingApp(null);
    };

    return (
        <>
            {rejectingApp && <RejectModal app={rejectingApp} onClose={() => setRejectingApp(null)} onReject={handleReject} />}
            <div className="space-y-6">
                 <div className="flex items-center space-x-3">
                    <button onClick={() => navigate('staff-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                        <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Approval Queue</h1>
                        <p className="text-brand-gray-600">Review and grant final approval for verified applications.</p>
                    </div>
                </div>
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Pending Final Approval ({applications.length})</h2>
                    <div className="space-y-4">
                        {applications.map(app => (
                            <div key={app.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-grow space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-brand-gray-500" />
                                        <div>
                                            <p className="font-bold">{app.applicant.name}</p>
                                            <p className="text-sm text-brand-gray-500">{app.service}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Car className="w-5 h-5 text-brand-gray-500" />
                                        <div>
                                            <p className="font-semibold">{app.vehicle.year} {app.vehicle.make} {app.vehicle.model}</p>
                                            <p className="text-sm text-brand-gray-500">VIN: {app.vehicle.vin}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 shrink-0">
                                     <Badge variant={app.slaDaysLeft <= 1 ? 'danger' : 'warning'}>SLA: {app.slaDaysLeft} day left</Badge>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => setRejectingApp(app)} className="bg-white border border-brand-gray-300 text-brand-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-brand-gray-100 flex items-center"><X size={16} className="mr-2"/> Reject</button>
                                        <button onClick={() => handleApprove(app.id)} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"><Check size={16} className="mr-2"/> Approve</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Approvals;