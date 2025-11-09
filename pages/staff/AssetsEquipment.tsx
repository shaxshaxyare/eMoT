import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MinistryAsset, View } from '../../types';
import { ArrowLeft, Package, Search, Plus } from 'lucide-react';

const mockAssets: MinistryAsset[] = [
    { id: 'MOT-V-001', name: 'Toyota Hilux', type: 'Vehicle', location: 'Capital City Garage', status: 'Operational', lastMaintenance: '2025-10-15' },
    { id: 'MOT-V-012', name: 'Ford Ranger', type: 'Vehicle', location: 'Field Team B', status: 'Under Maintenance', lastMaintenance: '2025-11-20' },
    { id: 'MOT-E-055', name: 'Traffic Light Controller', type: 'Equipment', location: 'Intersection 5A', status: 'Operational', lastMaintenance: '2025-08-01' },
    { id: 'MOT-B-001', name: 'Main Office Building', type: 'Building', location: 'Capital City', status: 'Operational', lastMaintenance: '2025-09-30' },
    { id: 'MOT-E-102', name: 'Road Line Painter', type: 'Equipment', location: 'Central Warehouse', status: 'Operational', lastMaintenance: '2025-11-05' },
];

interface AssetsEquipmentProps {
    navigate: (view: View) => void;
}

const AssetsEquipment: React.FC<AssetsEquipmentProps> = ({ navigate }) => {
    const [assets, setAssets] = useState(mockAssets);

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('projects')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Assets & Equipment</h1>
                    <p className="text-brand-gray-600">Master registry for all ministry assets.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" placeholder="Search by asset name or ID..." className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm" />
                    </div>
                    <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> Register New Asset</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Asset ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Last Maintenance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map(asset => (
                                <tr key={asset.id} className="border-b">
                                    <td className="px-4 py-3 font-mono text-xs">{asset.id}</td>
                                    <td className="px-4 py-3 font-medium">{asset.name}</td>
                                    <td className="px-4 py-3">{asset.type}</td>
                                    <td className="px-4 py-3">{asset.location}</td>
                                    <td className="px-4 py-3"><Badge variant={asset.status === 'Operational' ? 'success' : 'warning'}>{asset.status}</Badge></td>
                                    <td className="px-4 py-3">{asset.lastMaintenance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AssetsEquipment;