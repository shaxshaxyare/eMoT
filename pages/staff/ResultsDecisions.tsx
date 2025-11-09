import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LicenseApplication, View } from '../../types';
import { Check, X, TestTube2, ArrowLeft } from 'lucide-react';

const mockApplications: LicenseApplication[] = [
    { id: 'APP-DL-003', applicant: { name: 'Ibrahim Ali', id: 'IA-9876-54', avatarUrl: '...' }, type: 'Upgrade', licenseClass: 'E', submitted: '2025-11-19', status: 'Pending Decision', assignee: 'John Doe', slaDaysLeft: 2, documents: [], testResults: { theory: 'Pass', practical: 'Pass' } },
    { id: 'APP-DL-008', applicant: { name: 'Amina Hassan', id: 'AH-4321-98', avatarUrl: '...' }, type: 'New', licenseClass: 'B', submitted: '2025-11-18', status: 'Pending Decision', assignee: 'me', slaDaysLeft: 3, documents: [], testResults: { theory: 'Pass', practical: 'Fail' } },
    { id: 'APP-DL-009', applicant: { name: 'Omar Yusuf', id: 'OY-1122-33', avatarUrl: '...' }, type: 'New', licenseClass: 'C', submitted: '2025-11-17', status: 'Pending Decision', assignee: 'Jane Smith', slaDaysLeft: 1, documents: [], testResults: { theory: 'Fail', practical: 'Pending' } },
];

const RejectModal: React.FC<{ app: LicenseApplication, onClose: () => void, onReject: (appId: string, reason: string) => void }> = ({ app, onClose, onReject }) => {
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
                        <textarea value={reason} onChange={e => setReason(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" rows={4} placeholder="e.g., Failed practical test twice..."></textarea>
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

interface ResultsDecisionsProps {
    navigate: (view: View) => void;
}

const ResultsDecisions: React.FC<ResultsDecisionsProps> = ({ navigate }) => {
    const [applications, setApplications] = useState(mockApplications);
    const [rejectingApp, setRejectingApp] = useState<LicenseApplication | null>(null);

    const handleAction = (appId: string, action: 'approve' | 'retest') => {
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
                    <button onClick={() => navigate('licensing-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                        <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Results & Decisions Queue</h1>
                        <p className="text-brand-gray-600">Make final decisions on applications post-testing.</p>
                    </div>
                </div>
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Pending Decision ({applications.length})</h2>
                    <div className="space-y-4">
                        {applications.map(app => (
                            <div key={app.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-lg">{app.applicant.name}</p>
                                            <p className="text-sm text-brand-gray-500">{app.type} - Class {app.licenseClass}</p>
                                        </div>
                                         <Badge variant={app.slaDaysLeft <= 1 ? 'danger' : 'warning'}>SLA: {app.slaDaysLeft} day(s) left</Badge>
                                    </div>
                                     <div className="flex items-center space-x-4 mt-3">
                                        <p>Theory Test: <Badge variant={app.testResults?.theory === 'Pass' ? 'success' : 'danger'}>{app.testResults?.theory}</Badge></p>
                                        <p>Practical Test: <Badge variant={app.testResults?.practical === 'Pass' ? 'success' : app.testResults?.practical === 'Fail' ? 'danger' : 'default'}>{app.testResults?.practical}</Badge></p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                                    <button onClick={() => handleAction(app.id, 'retest')} className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 flex items-center text-sm"><TestTube2 size={16} className="mr-2"/> Schedule Retest</button>
                                    <button onClick={() => setRejectingApp(app)} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 flex items-center text-sm"><X size={16} className="mr-2"/> Reject</button>
                                    <button onClick={() => handleAction(app.id, 'approve')} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center text-sm"><Check size={16} className="mr-2"/> Approve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default ResultsDecisions;