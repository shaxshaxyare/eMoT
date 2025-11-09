
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Integration, View } from '../../types';
import { ArrowLeft, Settings } from 'lucide-react';

interface IntegrationsProps {
    navigate: (view: View) => void;
}

const mockIntegrations: Integration[] = [
    { id: 'int-01', name: 'EVC Plus Gateway', type: 'Payment Gateway', status: 'Connected' },
    { id: 'int-02', name: 'eDahab API', type: 'Payment Gateway', status: 'Connected' },
    { id: 'int-03', name: 'Twilio SMS Service', type: 'SMS Provider', status: 'Connected' },
    { id: 'int-04', name: 'National ID Database', type: 'ID Verification', status: 'Error' },
];

const Integrations: React.FC<IntegrationsProps> = ({ navigate }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('settings')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Integrations</h1>
                    <p className="text-brand-gray-600">Manage connections to third-party services.</p>
                </div>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Service Connections</h2>
                <div className="space-y-3">
                    {mockIntegrations.map(int => (
                        <div key={int.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{int.name}</p>
                                <p className="text-sm text-gray-500">{int.type}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge variant={int.status === 'Connected' ? 'success' : 'danger'}>{int.status}</Badge>
                                <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">
                                    <Settings size={14} className="mr-2"/> Configure
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Integrations;
