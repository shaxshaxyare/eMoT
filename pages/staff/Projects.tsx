import React from 'react';
import { View, EngineeringProject } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Briefcase, Wrench, Package, Clock } from 'lucide-react';

interface ProjectsProps {
    navigate: (view: View) => void;
}

const mockProjects: EngineeringProject[] = [
    { id: 'PROJ-001', name: 'Capital City Highway Expansion', status: 'In Progress', startDate: '2025-06-01', endDate: '2026-12-31', manager: 'Eng. Hassan', progress: 65 },
    { id: 'PROJ-002', name: 'Regional Airport Runway Resurfacing', status: 'Planning', startDate: '2026-02-01', endDate: '2026-08-31', manager: 'Eng. Fatima', progress: 10 },
    { id: 'PROJ-003', name: 'National Traffic Light System Upgrade', status: 'Completed', startDate: '2024-01-15', endDate: '2025-10-30', manager: 'Eng. Omar', progress: 100 },
    { id: 'PROJ-004', name: 'Coastal Road Maintenance Initiative', status: 'In Progress', startDate: '2025-09-01', endDate: '2026-03-01', manager: 'Eng. Aisha', progress: 40 },
    { id: 'PROJ-005', name: 'Bridge Integrity Assessment Program', status: 'On Hold', startDate: '2025-07-15', endDate: '2025-12-15', manager: 'Eng. Hassan', progress: 25 },
];

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ElementType, color: string }> = ({ title, value, icon: Icon, color }) => (
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

const Projects: React.FC<ProjectsProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Engineering Dashboard</h1>
        <p className="text-brand-gray-600">Oversee projects, maintenance requests, and assets.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value={mockProjects.filter(p => p.status === 'In Progress').length} icon={Briefcase} color="blue" />
        <StatCard title="Overdue Tasks" value={3} icon={Clock} color="amber" />
        <StatCard title="Assets Under Maintenance" value={8} icon={Wrench} color="red" />
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('maintenance-requests')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><Wrench size={20} /><span>Maintenance Requests</span></button>
            <button onClick={() => navigate('assets-equipment')} className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 flex items-center space-x-2"><Package size={20} /><span>Assets & Equipment</span></button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Current Projects</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Project Name</th>
                        <th className="px-4 py-3">Manager</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Progress</th>
                        <th className="px-4 py-3">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {mockProjects.map(p => (
                        <tr key={p.id} className="border-b">
                            <td className="px-4 py-3 font-medium">{p.name}</td>
                            <td className="px-4 py-3">{p.manager}</td>
                            <td className="px-4 py-3"><Badge variant={p.status === 'Completed' ? 'success' : p.status === 'In Progress' ? 'info' : 'default'}>{p.status}</Badge></td>
                            <td className="px-4 py-3">
                                <div className="w-full bg-brand-gray-200 rounded-full h-2.5">
                                    <div className="bg-brand-blue-600 h-2.5 rounded-full" style={{ width: `${p.progress}%` }}></div>
                                </div>
                            </td>
                            <td className="px-4 py-3">{p.endDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default Projects;