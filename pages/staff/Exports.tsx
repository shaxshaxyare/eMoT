import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ExportJob, View } from '../../types';
import { ArrowLeft, Plus, Download } from 'lucide-react';

interface ExportsProps {
    navigate: (view: View) => void;
}

const mockExports: ExportJob[] = [
    { id: 'EXP-001', dataset: 'All Vehicle Registrations (2025)', status: 'Completed', requestedBy: 'Admin', date: '2025-11-20', format: 'CSV' },
    { id: 'EXP-002', dataset: 'All Licensing Applications (Q4 2025)', status: 'In Progress', requestedBy: 'J. Smith', date: '2025-11-22', format: 'XLSX' },
    { id: 'EXP-003', dataset: 'Road Tax Payment History (2025)', status: 'Failed', requestedBy: 'Admin', date: '2025-11-19', format: 'PDF' },
];

const Exports: React.FC<ExportsProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button onClick={() => navigate('operational-reports')} className="p-2 rounded-full hover:bg-brand-gray-100">
            <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Data Exports</h1>
          <p className="text-brand-gray-600">Create and download raw data exports.</p>
        </div>
      </div>

       <Card>
            <h2 className="text-lg font-semibold mb-4">Create New Export Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                    <label className="text-sm font-medium">Select Dataset</label>
                    <select className="mt-1 w-full border p-2 rounded bg-white">
                        <option>All Vehicle Registrations</option>
                        <option>All Licensing Applications</option>
                        <option>All User Accounts</option>
                        <option>Road Tax Payment History</option>
                    </select>
                </div>
                 <div>
                    <label className="text-sm font-medium">Date Range</label>
                    <input type="date" className="mt-1 w-full border p-2 rounded"/>
                </div>
                 <div>
                    <button className="w-full bg-brand-blue-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center"><Plus size={16} className="mr-2"/> Start Export</button>
                </div>
            </div>
        </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Export Jobs</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Dataset</th>
                        <th className="px-4 py-3">Requested By</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockExports.map(job => (
                        <tr key={job.id} className="border-b">
                            <td className="px-4 py-3 font-medium">{job.dataset}</td>
                            <td className="px-4 py-3">{job.requestedBy}</td>
                            <td className="px-4 py-3">{job.date}</td>
                            <td className="px-4 py-3"><Badge variant={job.status === 'Completed' ? 'success' : job.status === 'Failed' ? 'danger' : 'info'}>{job.status}</Badge></td>
                            <td className="px-4 py-3 text-right">
                                {job.status === 'Completed' && (
                                    <button className="font-medium text-brand-blue-600 hover:underline flex items-center ml-auto">
                                        <Download size={14} className="mr-1.5"/> Download {job.format}
                                    </button>
                                )}
                                {job.status === 'Failed' && <button className="font-medium text-red-600 hover:underline">Retry</button>}
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

export default Exports;