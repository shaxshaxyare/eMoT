
import React, { useState } from 'react';
import { View, PortalUser } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Users, Shield, Book, Plus, Search, Filter } from 'lucide-react';

interface UserManagementProps {
    navigate: (view: View) => void;
}

const mockUsers: PortalUser[] = [
    { id: 'user-001', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Citizen', status: 'Active', userType: 'Citizen', lastLogin: '2025-11-22 10:05' },
    { id: 'user-002', name: 'Demo Staff', email: 'staff@mot.gov', role: 'Administrator', status: 'Active', userType: 'Staff', lastLogin: '2025-11-22 14:20' },
    { id: 'user-003', name: 'Jane Smith', email: 'jane.s@mot.gov', role: 'Verification Officer', status: 'Active', userType: 'Staff', lastLogin: '2025-11-22 13:50' },
    { id: 'user-004', name: 'Axmed Cumar', email: 'axmed.c@example.com', role: 'Citizen', status: 'Active', userType: 'Citizen', lastLogin: '2025-11-21 08:15' },
    { id: 'user-005', name: 'John Doe', email: 'john.d@mot.gov', role: 'Approval Officer', status: 'Inactive', userType: 'Staff', lastLogin: '2025-10-30 11:00' },
];

const UserManagement: React.FC<UserManagementProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Users & Access</h1>
                <p className="text-brand-gray-600">Manage portal accounts, roles, permissions, and audit logs.</p>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => navigate('roles-permissions')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><Shield size={20} /><span>Roles & Permissions</span></button>
                    <button onClick={() => navigate('activity-logs')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><Book size={20} /><span>Activity Logs</span></button>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" /><input type="text" placeholder="Search by name or email..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm" /></div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm"><Filter className="w-4 h-4 mr-1.5"/> Role</button>
                        <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> Add User</button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Last Login</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockUsers.map(user => (
                                <tr key={user.id} className="border-b">
                                    <td className="px-4 py-3"><p className="font-medium">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></td>
                                    <td className="px-4 py-3">{user.role}</td>
                                    <td className="px-4 py-3"><Badge variant={user.status === 'Active' ? 'success' : 'default'}>{user.status}</Badge></td>
                                    <td className="px-4 py-3">{user.lastLogin}</td>
                                    <td className="px-4 py-3 text-right"><button className="font-medium text-brand-blue-600 hover:underline">Manage</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UserManagement;
