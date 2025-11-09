import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { VehicleApplication, View } from '../../types';
import { Calendar, Car, Check, X, Upload, ArrowLeft } from 'lucide-react';

const mockApplications: VehicleApplication[] = [
    { id: 'APP-VR-002', applicant: { name: 'Xaliimo Aadan', id: 'XA-2468-10', avatarUrl: '...' }, vehicle: { make: 'Nissan', model: 'Patrol', year: 2022, vin: 'JN1TA...' }, service: 'New Registration', submitted: '2025-11-20', status: 'Pending Inspection', assignee: 'Jane Smith', slaDaysLeft: 3, documents: [] },
    { id: 'APP-VR-009', applicant: { name: 'Ibrahim Ali', id: 'IA-9876-54', avatarUrl: '...' }, vehicle: { make: 'Land Rover', model: 'Defender', year: 2023, vin: 'SALVA...' }, service: 'New Registration', submitted: '2025-11-22', status: 'Pending Inspection', assignee: 'me', slaDaysLeft: 5, documents: [] },
];

const InspectionModal: React.FC<{ app: VehicleApplication; onClose: () => void; onComplete: (appId: string, result: 'Pass' | 'Fail') => void }> = ({ app, onClose, onComplete }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Record Inspection for {app.vehicle.make}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <p className="text-sm font-medium">Inspection Report</p>
                        <button className="mt-1 w-full flex items-center justify-center space-x-2 border-2 border-dashed border-brand-gray-300 rounded-lg p-6 text-sm bg-white hover:bg-brand-gray-50">
                            <Upload className="w-5 h-5 text-brand-gray-500"/>
                            <span>Upload Report PDF/Images</span>
                        </button>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Inspector Notes</label>
                        <textarea className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" rows={3} placeholder="e.g., All checks passed. Minor scratch on rear bumper noted."></textarea>
                    </div>
                </div>
                <div className="p-4 bg-brand-gray-50 border-t flex justify-end space-x-2">
                    <button onClick={() => onComplete(app.id, 'Fail')} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><X size={16} className="mr-2"/> Fail Inspection</button>
                    <button onClick={() => onComplete(app.id, 'Pass')} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Check size={16} className="mr-2"/> Pass Inspection</button>
                </div>
            </div>
        </div>
    );
};

interface InspectionsProps {
    navigate: (view: View) => void;
}

const Inspections: React.FC<InspectionsProps> = ({ navigate }) => {
    const [applications, setApplications] = useState(mockApplications);
    const [inspectingApp, setInspectingApp] = useState<VehicleApplication | null>(null);

    const handleCompleteInspection = (appId: string, result: 'Pass' | 'Fail') => {
        setApplications(apps => apps.filter(app => app.id !== appId));
        setInspectingApp(null);
    };

    return (
        <>
            {inspectingApp && <InspectionModal app={inspectingApp} onClose={() => setInspectingApp(null)} onComplete={handleCompleteInspection} />}
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate('staff-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                        <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Inspection Queue</h1>
                        <p className="text-brand-gray-600">Manage scheduled inspections and record outcomes.</p>
                    </div>
                </div>
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Awaiting Inspection ({applications.length})</h2>
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Calendar className="w-4 h-4 mr-1.5"/> Schedule New</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Vehicle</th>
                                    <th className="px-4 py-3">Applicant</th>
                                    <th className="px-4 py-3">Assignee</th>
                                    <th className="px-4 py-3">SLA Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(app => (
                                    <tr key={app.id} className="border-b">
                                        <td className="px-4 py-3 font-medium">{app.vehicle.year} {app.vehicle.make} {app.vehicle.model}</td>
                                        <td className="px-4 py-3">{app.applicant.name}</td>
                                        <td className="px-4 py-3"><Badge variant="default">{app.assignee}</Badge></td>
                                        <td className="px-4 py-3"><Badge variant={app.slaDaysLeft <= 2 ? 'warning' : 'success'}>{app.slaDaysLeft} days left</Badge></td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => setInspectingApp(app)} className="bg-brand-blue-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-brand-blue-700">Record Result</button>
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

export default Inspections;