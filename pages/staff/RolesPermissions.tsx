
import React from 'react';
import { Card } from '../../components/ui/Card';
import { AccessRole, View } from '../../types';
import { ArrowLeft, Shield, Plus, Key } from 'lucide-react';

interface RolesPermissionsProps {
    navigate: (view: View) => void;
}

const mockRoles: AccessRole[] = [
    { id: 'role-admin', name: 'Administrator', description: 'Full access to all system functions.', permissions: ['manage_users', 'manage_settings', 'view_all_reports', 'override_workflows'] },
    { id: 'role-verifier', name: 'Verification Officer', description: 'Can view and process applications in the verification queue.', permissions: ['view_verification_queue', 'update_app_status', 'request_info'] },
    { id: 'role-approver', name: 'Approval Officer', description: 'Can give final approval or rejection for applications.', permissions: ['view_approval_queue', 'approve_application', 'reject_application'] },
    { id: 'role-citizen', name: 'Citizen', description: 'Standard access to the public portal.', permissions: ['submit_application', 'view_own_records', 'make_payment'] },
];

const RolesPermissions: React.FC<RolesPermissionsProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('user-management')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Roles & Permissions</h1>
                    <p className="text-brand-gray-600">Manage Role-Based Access Control (RBAC) policies.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Defined Roles</h2>
                    <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> Create New Role</button>
                </div>
                <div className="space-y-4">
                    {mockRoles.map(role => (
                        <div key={role.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg flex items-center"><Shield size={18} className="mr-2 text-brand-blue-600"/>{role.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                                </div>
                                <button className="text-sm font-medium text-brand-blue-600 hover:underline">Edit</button>
                            </div>
                            <div className="mt-3 pt-3 border-t">
                                <h4 className="text-sm font-semibold mb-2">Permissions:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {role.permissions.map(p => <span key={p} className="text-xs bg-brand-gray-100 text-brand-gray-700 px-2 py-1 rounded-md flex items-center"><Key size={12} className="mr-1.5"/>{p}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default RolesPermissions;
