
import React from 'react';
import { Card } from '../../components/ui/Card';
import { ActivityLog, View } from '../../types';
import { ArrowLeft, Search, Filter } from 'lucide-react';

interface ActivityLogsProps {
    navigate: (view: View) => void;
}

const mockLogs: ActivityLog[] = [
    { id: 'log-001', user: { name: 'Demo Staff', id: 'user-002' }, action: 'Approved', target: 'Application APP-OT-003', timestamp: '2025-11-22 14:25:10', ipAddress: '192.168.1.10' },
    { id: 'log-002', user: { name: 'Jane Smith', id: 'user-003' }, action: 'Passed Verification', target: 'Application APP-VR-002', timestamp: '2025-11-22 13:55:02', ipAddress: '192.168.1.12' },
    { id: 'log-003', user: { name: 'Alex Johnson', id: 'user-001' }, action: 'Submitted', target: 'Application for Road Tax', timestamp: '2025-11-22 10:06:45', ipAddress: '203.0.113.55' },
    { id: 'log-004', user: { name: 'Demo Staff', id: 'user-002' }, action: 'Updated Fee', target: 'Service "Driver License - Renewal"', timestamp: '2025-11-21 16:30:00', ipAddress: '192.168.1.10' },
    { id: 'log-005', user: { name: 'System', id: 'system' }, action: 'Sent Reminder', target: 'License Renewal for 5 users', timestamp: '2025-11-21 09:00:00', ipAddress: 'N/A' },
];

const ActivityLogs: React.FC<ActivityLogsProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('user-management')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Activity Logs</h1>
                    <p className="text-brand-gray-600">Audit trail of all significant actions within the portal.</p>
                </div>
            </div>
            
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" /><input type="text" placeholder="Search by user, action, or target..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm" /></div>
                    <div className="flex items-center space-x-2">
                        <input type="date" className="bg-white border border-brand-gray-300 rounded-lg py-1.5 px-3 text-sm"/>
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm"><Filter className="w-4 h-4 mr-1.5"/> Action Type</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Timestamp</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Action</th>
                                <th className="px-4 py-3">Target</th>
                                <th className="px-4 py-3">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLogs.map(log => (
                                <tr key={log.id} className="border-b">
                                    <td className="px-4 py-3 font-mono text-xs">{log.timestamp}</td>
                                    <td className="px-4 py-3 font-medium">{log.user.name}</td>
                                    <td className="px-4 py-3"><span className="font-semibold text-brand-blue-700">{log.action}</span></td>
                                    <td className="px-4 py-3">{log.target}</td>
                                    <td className="px-4 py-3">{log.ipAddress}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ActivityLogs;
