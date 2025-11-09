import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LicenseRecord, View } from '../../types';
import { Calendar, Clock, RefreshCw, Send, Filter, ArrowLeft } from 'lucide-react';

const mockLicenses: LicenseRecord[] = [
    { id: 'lr-001', holder: { name: 'Alex Johnson', id: '9823-44' }, licenseNumber: 'JNSN-5521-88', licenseClass: 'B, C', issueDate: '2021-12-21', expiryDate: '2025-12-21', status: 'Active', renewalStatus: 'Not Started' },
    { id: 'lr-002', holder: { name: 'Jane Doe', id: '1234-56' }, licenseNumber: 'DOEJ-1122-33', licenseClass: 'B', issueDate: '2022-01-15', expiryDate: new Date(new Date().getTime() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Active', renewalStatus: 'Pending' },
    { id: 'lr-003', holder: { name: 'John Smith', id: '7890-12' }, licenseNumber: 'SMTH-4455-66', licenseClass: 'A', issueDate: '2022-02-01', expiryDate: new Date(new Date().getTime() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Active', renewalStatus: 'Not Started' },
    { id: 'lr-004', holder: { name: 'Emily White', id: '3456-78' }, licenseNumber: 'WHTE-7788-99', licenseClass: 'C', issueDate: '2022-03-10', expiryDate: new Date(new Date().getTime() + 80 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Active', renewalStatus: 'Not Started' },
    { id: 'lr-005', holder: { name: 'Michael Brown', id: '9012-34' }, licenseNumber: 'BRWN-1234-56', licenseClass: 'B', issueDate: '2020-11-30', expiryDate: '2024-11-30', status: 'Expired', renewalStatus: 'Pending' },
];

const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
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

interface RenewalsExpiryProps {
    navigate: (view: View) => void;
}

const RenewalsExpiry: React.FC<RenewalsExpiryProps> = ({ navigate }) => {
    const [licenses, setLicenses] = useState(mockLicenses);
    const [filter, setFilter] = useState(30);

    const filteredLicenses = useMemo(() => {
        const now = new Date();
        const futureDate = new Date(now.getTime() + filter * 24 * 60 * 60 * 1000);
        return licenses.filter(lic => {
            const expiry = new Date(lic.expiryDate);
            return lic.status !== 'Expired' && expiry > now && expiry <= futureDate;
        });
    }, [licenses, filter]);

    const stats = {
        next30: licenses.filter(l => new Date(l.expiryDate) > new Date() && new Date(l.expiryDate) <= new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)).length,
        renewalsPending: licenses.filter(l => l.renewalStatus === 'Pending').length,
        expiredUnrenewed: licenses.filter(l => l.status === 'Expired').length,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('licensing-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Renewals & Expiry Management</h1>
                    <p className="text-brand-gray-600">Track expiring licenses and manage renewal communications.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Expiring in 30 Days" value={stats.next30} icon={Calendar} color="amber" />
                <StatCard title="Renewals in Progress" value={stats.renewalsPending} icon={RefreshCw} color="blue" />
                <StatCard title="Expired & Unrenewed" value={stats.expiredUnrenewed} icon={Clock} color="red" />
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-brand-gray-500" />
                        <label className="text-sm font-medium">Expiring in next:</label>
                        <select value={filter} onChange={e => setFilter(Number(e.target.value))} className="bg-white border border-brand-gray-300 rounded-lg py-1 pl-2 pr-8 text-sm">
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                        </select>
                    </div>
                    <button className="flex items-center bg-brand-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg text-sm hover:bg-brand-blue-700"><Send className="w-4 h-4 mr-1.5"/> Send Batch Reminders</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">License Holder</th>
                                <th className="px-4 py-3">License Number</th>
                                <th className="px-4 py-3">Expiry Date</th>
                                <th className="px-4 py-3">Renewal Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLicenses.map(lic => (
                                <tr key={lic.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{lic.holder.name}</td>
                                    <td className="px-4 py-3">{lic.licenseNumber}</td>
                                    <td className="px-4 py-3">{new Date(lic.expiryDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-3"><Badge variant={lic.renewalStatus === 'Pending' ? 'info' : 'default'}>{lic.renewalStatus}</Badge></td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="text-sm font-medium text-brand-blue-600 hover:underline">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default RenewalsExpiry;