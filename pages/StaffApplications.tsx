import React from 'react';
import { View, VehicleApplication } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Eye, FileCheck, ShieldCheck, Clock, List, FileText, UserCheck } from 'lucide-react';

interface StaffApplicationsProps {
  navigate: (view: View) => void;
}

const mockApplications: VehicleApplication[] = [
    { id: 'APP-VR-001', applicant: { name: 'Axmed Cumar', id: 'AC-9876-54', avatarUrl: '...' }, vehicle: { make: 'Toyota', model: 'Land Cruiser', year: 2023, vin: 'JTDKR...' }, service: 'New Registration', submitted: '2025-11-20', status: 'Pending Verification', assignee: null, slaDaysLeft: 5, documents: [] },
    { id: 'APP-VR-002', applicant: { name: 'Xaliimo Aadan', id: 'XA-2468-10', avatarUrl: '...' }, vehicle: { make: 'Nissan', model: 'Patrol', year: 2022, vin: 'JN1TA...' }, service: 'New Registration', submitted: '2025-11-20', status: 'Pending Inspection', assignee: 'Jane Smith', slaDaysLeft: 3, documents: [] },
    { id: 'APP-OT-003', applicant: { name: 'Cabdi Ismaaciil', id: 'CI-1122-33', avatarUrl: '...' }, vehicle: { make: 'Toyota', model: 'Camry', year: 2020, vin: '4T1B1...' }, service: 'Ownership Transfer', submitted: '2025-11-19', status: 'Pending Approval', assignee: 'John Doe', slaDaysLeft: 1, documents: [] },
    { id: 'APP-PR-004', applicant: { name: 'Maxamed Faarax', id: 'MF-1357-91', avatarUrl: '...' }, vehicle: { make: 'Ford', model: 'F-150', year: 2021, vin: '1FTEW...' }, service: 'Plate Replacement', submitted: '2025-11-18', status: 'Approved', assignee: 'Admin', slaDaysLeft: 0, documents: [] },
    { id: 'APP-VR-005', applicant: { name: 'Aisha Yusuf', id: 'AY-6543-21', avatarUrl: '...' }, vehicle: { make: 'Hyundai', model: 'Tucson', year: 2023, vin: 'KMHCN...' }, service: 'New Registration', submitted: '2025-11-17', status: 'Rejected', assignee: 'Jane Smith', slaDaysLeft: 0, documents: [] },
];

const StatCard: React.FC<{ title: string, value: number, icon: React.ElementType, color: string }> = ({ title, value, icon: Icon, color }) => (
    <Card className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-brand-gray-500">{title}</p>
        </div>
    </Card>
);

const StaffApplications: React.FC<StaffApplicationsProps> = ({ navigate }) => {
    
    const stats = {
        verification: mockApplications.filter(a => a.status === 'Pending Verification').length,
        inspection: mockApplications.filter(a => a.status === 'Pending Inspection').length,
        approval: mockApplications.filter(a => a.status === 'Pending Approval').length,
        atRisk: mockApplications.filter(a => a.slaDaysLeft <= 2 && !['Approved', 'Rejected'].includes(a.status)).length,
    };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vehicle Registration Dashboard</h1>
        <p className="text-brand-gray-600">Overview of application queues and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pending Verification" value={stats.verification} icon={Eye} color="blue" />
        <StatCard title="Pending Inspection" value={stats.inspection} icon={FileCheck} color="amber" />
        <StatCard title="Pending Approval" value={stats.approval} icon={ShieldCheck} color="green" />
        <StatCard title="SLA at Risk" value={stats.atRisk} icon={Clock} color="red" />
      </div>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Task Queues</h2>
        <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('verification')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><Eye size={20} /><span>Go to Verification Queue</span></button>
            <button onClick={() => navigate('inspections')} className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg font-medium hover:bg-amber-100 flex items-center space-x-2"><FileCheck size={20} /><span>Go to Inspection Queue</span></button>
            <button onClick={() => navigate('approvals')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><ShieldCheck size={20} /><span>Go to Approval Queue</span></button>
        </div>
      </Card>
      
       <Card>
        <h2 className="text-lg font-semibold mb-4">Other Management Areas</h2>
        <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('vehicle-registry')} className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200 flex items-center space-x-2"><List size={20} /><span>Vehicle Registry</span></button>
            <button onClick={() => navigate('certificates')} className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200 flex items-center space-x-2"><FileText size={20} /><span>Certificate Generation</span></button>
            <button onClick={() => navigate('plate-management')} className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200 flex items-center space-x-2"><UserCheck size={20} /><span>Plate Management</span></button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Applicant</th>
                        <th className="px-4 py-3">Service</th>
                        <th className="px-4 py-3">Submitted</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Assignee</th>
                    </tr>
                </thead>
                <tbody>
                    {mockApplications.slice(0, 5).map(app => (
                        <tr key={app.id} className="border-b">
                            <td className="px-4 py-3 font-medium">{app.applicant.name}</td>
                            <td className="px-4 py-3">{app.service}</td>
                            <td className="px-4 py-3">{app.submitted}</td>
                            <td className="px-4 py-3"><Badge variant={app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'info'}>{app.status}</Badge></td>
                            <td className="px-4 py-3">{app.assignee || 'Unassigned'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default StaffApplications;
