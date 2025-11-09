import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { WorkflowInstance } from '../../types';
import { Search, Filter, GitBranch, Eye, Check, AlertTriangle, ChevronsUp, User, XCircle, RefreshCw } from 'lucide-react';

const initialWorkflows: WorkflowInstance[] = [
  { id: 'wf-001', service: 'Vehicle Registration', applicant: 'Axmed Cumar', stage: 'Verification', owner: 'Jane Smith', progress: 40, slaStatus: 'Healthy' },
  { id: 'wf-002', service: 'Driver License Renewal', applicant: 'Farhiya Jaamac', stage: 'Approval', owner: 'John Doe', progress: 80, slaStatus: 'Healthy' },
  { id: 'wf-003', service: 'Ownership Transfer', applicant: 'Cabdi Ismaaciil', stage: 'Issuance', owner: 'me', progress: 95, slaStatus: 'At Risk' },
  { id: 'wf-004', service: 'Vehicle Registration', applicant: 'Xaliimo Aadan', stage: 'Intake', owner: 'Unassigned', progress: 10, slaStatus: 'Healthy' },
  { id: 'wf-005', service: 'Plate Replacement', applicant: 'Maxamed Faarax', stage: 'Verification', owner: 'Jane Smith', progress: 50, slaStatus: 'Breached' },
  { id: 'wf-006', service: 'Driver License - New', applicant: 'Aisha Yusuf', stage: 'Inspection', owner: 'Peter Williams', progress: 60, slaStatus: 'Healthy' },
  { id: 'wf-007', service: 'Vehicle Registration', applicant: 'John Doe', stage: 'Approval', owner: 'me', progress: 75, slaStatus: 'At Risk' },
];

const SummaryCard: React.FC<{ title: string; value: number; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
    <Card>
        <div className="flex items-center">
            <Icon className={`w-8 h-8 ${color}`} />
            <div className="ml-4">
                <p className="text-sm text-brand-gray-500">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
        </div>
    </Card>
);

const Workflows: React.FC = () => {
    const [workflows, setWorkflows] = useState(initialWorkflows);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [filters, setFilters] = useState({ search: '', stage: 'All', owner: 'All', sla: 'All' });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const filteredWorkflows = useMemo(() => {
        return workflows.filter(wf => {
            const searchMatch = wf.applicant.toLowerCase().includes(filters.search.toLowerCase()) || wf.service.toLowerCase().includes(filters.search.toLowerCase());
            const stageMatch = filters.stage === 'All' || wf.stage === filters.stage;
            const ownerMatch = filters.owner === 'All' || wf.owner === filters.owner;
            const slaMatch = filters.sla === 'All' || wf.slaStatus === filters.sla;
            return searchMatch && stageMatch && ownerMatch && slaMatch;
        });
    }, [workflows, filters]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedItems(filteredWorkflows.map(wf => wf.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id: string) => {
        setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    
    const stages = ['All', 'Intake', 'Verification', 'Inspection', 'Approval', 'Issuance'];
    const owners = ['All', 'me', 'Jane Smith', 'John Doe', 'Peter Williams', 'Unassigned'];

    const getSlaBadge = (status: 'Healthy' | 'At Risk' | 'Breached') => {
        switch (status) {
            case 'Healthy': return <Badge variant="success">Healthy</Badge>;
            case 'At Risk': return <Badge variant="warning">At Risk</Badge>;
            case 'Breached': return <Badge variant="danger">Breached</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Workflows</h1>
                <p className="text-brand-gray-600">Live view of workflow instances across services.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="Active Workflows" value={workflows.length} icon={GitBranch} color="text-brand-blue-500" />
                <SummaryCard title="In Review" value={workflows.filter(w => w.stage === 'Verification' || w.stage === 'Inspection').length} icon={Eye} color="text-amber-500" />
                <SummaryCard title="Pending Approval" value={workflows.filter(w => w.stage === 'Approval').length} icon={Check} color="text-green-500" />
                <SummaryCard title="SLA at Risk" value={workflows.filter(w => w.slaStatus === 'At Risk' || w.slaStatus === 'Breached').length} icon={AlertTriangle} color="text-red-500" />
            </div>

            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-auto md:flex-grow max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" name="search" placeholder="Search applicant or service" value={filters.search} onChange={handleFilterChange} className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-brand-gray-500"/>
                        <select name="stage" value={filters.stage} onChange={handleFilterChange} className="bg-white border border-brand-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm">
                            {stages.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <select name="owner" value={filters.owner} onChange={handleFilterChange} className="bg-white border border-brand-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm">
                            {owners.map(o => <option key={o}>{o}</option>)}
                        </select>
                         <select name="sla" value={filters.sla} onChange={handleFilterChange} className="bg-white border border-brand-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm">
                            <option>All</option><option>Healthy</option><option>At Risk</option><option>Breached</option>
                        </select>
                    </div>
                </div>

                {selectedItems.length > 0 && (
                    <div className="mt-4 p-3 bg-brand-blue-50 border border-brand-blue-200 rounded-lg flex justify-between items-center">
                        <p className="text-sm font-semibold text-brand-blue-800">{selectedItems.length} item(s) selected</p>
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><ChevronsUp className="w-4 h-4 mr-1.5"/> Escalate</button>
                            <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><User className="w-4 h-4 mr-1.5"/> Reassign</button>
                            <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><XCircle className="w-4 h-4 mr-1.5"/> Close</button>
                            <button onClick={() => setSelectedItems([])} className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><RefreshCw className="w-4 h-4 mr-1.5"/> Clear</button>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="p-3 w-8"><input type="checkbox" onChange={handleSelectAll} checked={filteredWorkflows.length > 0 && selectedItems.length === filteredWorkflows.length} className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500" /></th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Applicant</th>
                                <th className="px-4 py-3">Stage</th>
                                <th className="px-4 py-3">Owner</th>
                                <th className="px-4 py-3">Progress</th>
                                <th className="px-4 py-3">SLA Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredWorkflows.map(wf => (
                                <tr key={wf.id} className="border-b">
                                    <td className="p-3"><input type="checkbox" checked={selectedItems.includes(wf.id)} onChange={() => handleSelectItem(wf.id)} className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500" /></td>
                                    <td className="px-4 py-3 font-medium">{wf.service}</td>
                                    <td className="px-4 py-3">{wf.applicant}</td>
                                    <td className="px-4 py-3"><Badge variant="default">{wf.stage}</Badge></td>
                                    <td className="px-4 py-3">{wf.owner}</td>
                                    <td className="px-4 py-3">
                                        <div className="w-full bg-brand-gray-200 rounded-full h-2.5">
                                            <div className="bg-brand-blue-600 h-2.5 rounded-full" style={{ width: `${wf.progress}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{getSlaBadge(wf.slaStatus)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Workflows;