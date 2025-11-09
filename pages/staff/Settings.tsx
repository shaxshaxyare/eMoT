
import React, { useState } from 'react';
import { View } from '../../types';
import { Card } from '../../components/ui/Card';
import { Settings, SlidersHorizontal, Database, ToggleLeft, ToggleRight } from 'lucide-react';

interface SettingsProps {
    navigate: (view: View) => void;
}

const Settings: React.FC<SettingsProps> = ({ navigate }) => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">System Settings</h1>
                <p className="text-brand-gray-600">Configure integrations, branding, maintenance, and backups.</p>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => navigate('integrations')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><SlidersHorizontal size={20} /><span>Integrations</span></button>
                    <button onClick={() => navigate('backups-audit')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><Database size={20} /><span>Backups & Audit</span></button>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">Maintenance Mode</h3>
                        <p className="text-sm text-gray-500">Temporarily disables the citizen portal for system updates.</p>
                    </div>
                    <button onClick={() => setMaintenanceMode(!maintenanceMode)} className="flex items-center space-x-2">
                        {maintenanceMode ? <ToggleRight size={32} className="text-green-600"/> : <ToggleLeft size={32} className="text-gray-400"/>}
                        <span className={`font-semibold ${maintenanceMode ? 'text-green-600' : 'text-gray-600'}`}>{maintenanceMode ? 'Enabled' : 'Disabled'}</span>
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Settings;
