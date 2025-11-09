
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BackupJob, View } from '../../types';
import { ArrowLeft, Database, Plus } from 'lucide-react';

interface BackupsAuditProps {
    navigate: (view: View) => void;
}

const mockJobs: BackupJob[] = [
    { id: 'bk-001', timestamp: '2025-11-23 02:00:00', status: 'Success', size: '2.5 GB', type: 'Automatic' },
    { id: 'bk-002', timestamp: '2025-11-22 15:30:00', status: 'Success', size: '512 MB', type: 'Manual' },
    { id: 'bk-003', timestamp: '2025-11-22 02:00:00', status: 'Success', size: '2.4 GB', type: 'Automatic' },
    { id: 'bk-004', timestamp: '2025-11-21 02:00:00', status: 'Failed', size: 'N/A', type: 'Automatic' },
];

const BackupsAudit: React.FC<BackupsAuditProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('settings')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Backups & Audit</h1>
                    <p className="text-brand-gray-600">Manage backup jobs, restore points, and high-level audits.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Backup Jobs</h2>
                    <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> Initiate Manual Backup</button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Timestamp</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Size</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockJobs.map(job => (
                                <tr key={job.id} className="border-b">
                                    <td className="px-4 py-3 font-mono text-xs">{job.timestamp}</td>
                                    <td className="px-4 py-3">{job.type}</td>
                                    <td className="px-4 py-3">{job.size}</td>
                                    <td className="px-4 py-3"><Badge variant={job.status === 'Success' ? 'success' : 'danger'}>{job.status}</Badge></td>
                                    <td className="px-4 py-3 text-right"><button className="font-medium text-brand-blue-600 hover:underline">Restore</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default BackupsAudit;
