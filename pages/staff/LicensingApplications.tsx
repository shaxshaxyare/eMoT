import React from 'react';
import { View, LicenseApplication } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Eye, TestTube2, ClipboardCheck, Clock, FileText, UserCheck, Trash2 } from 'lucide-react';

interface LicensingApplicationsProps {
  navigate: (view: View) => void;
}

const mockApplications: LicenseApplication[] = [
    { id: 'APP-DL-001', applicant: { name: 'Farhiya Jaamac', id: 'FJ-5432-10', avatarUrl: '...' }, type: 'Renewal', licenseClass: 'B', submitted: '2025-11-21', status: 'Pending Verification', assignee: 'Jane Smith', slaDaysLeft: 4, documents: [] },
    { id: 'APP-DL-002', applicant: { name: 'Aisha Yusuf', id: 'AY-6543-21', avatarUrl: '...' }, type: 'New', licenseClass: 'C', submitted: '2025-11-20', status: 'Pending Test', assignee: 'me', slaDaysLeft: 8, documents: [] },
    { id: 'APP-DL-003', applicant: { name: 'Ibrahim Ali', id: 'IA-9876-54', avatarUrl: '...' }, type: 'Upgrade', licenseClass: 'E', submitted: '2025-11-19', status: 'Pending Decision', assignee: 'John Doe', slaDaysLeft: 2, documents: [] },
    { id: 'APP-DL-004', applicant: { name: 'Sahra Cali', id: 'SC-1234-56', avatarUrl: '...' }, type: 'New', licenseClass: 'A', submitted: '2025-11-18', status: 'Approved', assignee: 'Admin', slaDaysLeft: 0, documents: [] },
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

const LicensingApplications: React.FC<LicensingApplicationsProps> = ({ navigate }) => {
    const stats = {
        verification: mockApplications.filter(a => a.status === 'Pending Verification').length,
        testing: mockApplications.filter(a => a.status === 'Pending Test').length,
        decision: mockApplications.filter(a => a.status === 'Pending Decision').length,
        atRisk: mockApplications.filter(a => a.slaDaysLeft <= 2 && !['Approved', 'Rejected'].includes(a.status)).length,
    };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Driver Licensing Dashboard</h1>
        <p className="text-brand-gray-600">Manage license applications, testing, and issuance workflows.</p>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pending Verification" value={stats.verification} icon={Eye} color="blue" />
        <StatCard title="Pending Testing" value={stats.testing} icon={TestTube2} color="amber" />
        <StatCard title="Pending Decision" value={stats.decision} icon={ClipboardCheck} color="purple" />
        <StatCard title="SLA at Risk" value={stats.atRisk} icon={Clock} color="red" />
      </div>

       <Card>
        <h2 className="text-lg font-semibold mb-4">Task Queues</h2>
        <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('licensing-verification')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><Eye size={20} /><span>Verification Queue</span></button>
            <button onClick={() => navigate('testing')} className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg font-medium hover:bg-amber-100 flex items-center space-x-2"><TestTube2 size={20} /><span>Testing Schedule</span></button>
            <button onClick={() => navigate('results-decisions')} className="bg-purple-50 text-purple-700 px-4 py-3 rounded-lg font-medium hover:bg-purple-100 flex items-center space-x-2"><ClipboardCheck size={20} /><span>Results & Decisions</span></button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Other Management Areas</h2>
        <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('license-issuance')} className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200 flex items-center space-x-2"><FileText size={20} /><span>License Issuance</span></button>
            <button onClick={() => navigate('renewals-expiry')} className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200 flex items-center space-x-2"><UserCheck size={20} /><span>Renewals & Expiry</span></button>
            <button onClick={() => navigate('disciplinary')} className="bg-brand-gray-100 text-brand-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-gray-200 flex items-center space-x-2"><Trash2 size={20} /><span>Disciplinary Actions</span></button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Applicant</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Class</th>
                        <th className="px-4 py-3">Submitted</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockApplications.map(app => (
                        <tr key={app.id} className="border-b">
                            <td className="px-4 py-3 font-medium">{app.applicant.name}</td>
                            <td className="px-4 py-3">{app.type}</td>
                            <td className="px-4 py-3"><Badge variant="default">Class {app.licenseClass}</Badge></td>
                            <td className="px-4 py-3">{app.submitted}</td>
                            <td className="px-4 py-3"><Badge variant={app.status === 'Approved' ? 'success' : 'info'}>{app.status}</Badge></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default LicensingApplications;
