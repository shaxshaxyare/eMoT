import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { MaintenanceRequest, View } from '../../types';
import { ArrowLeft, Wrench, User } from 'lucide-react';

const mockRequests: MaintenanceRequest[] = [
    { id: 'MR-001', asset: 'Traffic Light TL-105', issue: 'Red light not functioning', reportedBy: 'Citizen Report', date: '2025-11-22', status: 'Pending', assignedTo: null },
    { id: 'MR-002', asset: 'Guardrail Section GR-42', issue: 'Damaged by vehicle impact', reportedBy: 'Patrol Unit 3', date: '2025-11-21', status: 'Pending', assignedTo: null },
    { id: 'MR-003', asset: 'Vehicle MOT-V-012 (Pickup)', issue: 'Scheduled 50,000km service', reportedBy: 'Fleet Mgmt', date: '2025-11-20', status: 'In Progress', assignedTo: 'Mechanic Team A' },
];

interface MaintenanceRequestsProps {
    navigate: (view: View) => void;
}

const MaintenanceRequests: React.FC<MaintenanceRequestsProps> = ({ navigate }) => {
    const [requests, setRequests] = useState(mockRequests);
    const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(requests[0] || null);
    
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('projects')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Maintenance Requests</h1>
                    <p className="text-brand-gray-600">Triage, assign, and track maintenance tasks.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Pending Queue ({requests.length})</h2>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                            {requests.map(req => (
                                <button key={req.id} onClick={() => setSelectedRequest(req)} className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedRequest?.id === req.id ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-transparent hover:bg-brand-gray-100'}`}>
                                    <p className="font-semibold">{req.asset}</p>
                                    <p className="text-sm text-brand-gray-600 truncate">{req.issue}</p>
                                    <p className="text-xs text-brand-gray-500 mt-1">{req.date} - {req.status}</p>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    {selectedRequest ? (
                        <Card>
                             <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold">{selectedRequest.asset}</h2>
                                    <p className="text-brand-gray-500">Request #{selectedRequest.id}</p>
                                </div>
                                <div className="p-4 bg-brand-gray-50 rounded-lg">
                                    <h3 className="font-semibold text-brand-gray-800">Issue Reported</h3>
                                    <p className="text-lg">{selectedRequest.issue}</p>
                                    <p className="text-sm text-brand-gray-500 mt-1">Reported by {selectedRequest.reportedBy} on {selectedRequest.date}</p>
                                </div>
                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold mb-2">Assign & Update Status</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Assign To</label>
                                            <select className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 bg-white">
                                                <option>Unassigned</option>
                                                <option>Technician Team A</option>
                                                <option>Mechanic Team B</option>
                                                <option>Field Crew 1</option>
                                            </select>
                                        </div>
                                         <div>
                                            <label className="text-sm font-medium">Set Status</label>
                                            <select defaultValue={selectedRequest.status} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 bg-white">
                                                <option>Pending</option>
                                                <option>In Progress</option>
                                                <option>Completed</option>
                                                <option>On Hold</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t flex justify-end">
                                    <button className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-blue-700">Update Request</button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="text-center py-20">
                            <p className="text-brand-gray-500">Select a request from the queue to view details.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaintenanceRequests;