import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LicenseRecord, DisciplinaryAction, View } from '../../types';
import { Search, User, X, ShieldOff, ShieldCheck, ArrowLeft } from 'lucide-react';

const mockLicenses: LicenseRecord[] = [
    { id: 'lr-001', holder: { name: 'Alex Johnson', id: '9823-44' }, licenseNumber: 'JNSN-5521-88', licenseClass: 'B, C', issueDate: '2021-12-21', expiryDate: '2025-12-21', status: 'Active' },
    { id: 'lr-002', holder: { name: 'Jane Doe', id: '1234-56' }, licenseNumber: 'DOEJ-1122-33', licenseClass: 'B', issueDate: '2022-01-15', expiryDate: '2026-01-15', status: 'Suspended' },
    { id: 'lr-003', holder: { name: 'John Smith', id: '7890-12' }, licenseNumber: 'SMTH-4455-66', licenseClass: 'A', issueDate: '2022-02-01', expiryDate: '2026-02-01', status: 'Revoked' },
    { id: 'lr-004', holder: { name: 'Emily White', id: '3456-78' }, licenseNumber: 'WHTE-7788-99', licenseClass: 'C', issueDate: '2022-03-10', expiryDate: '2026-03-10', status: 'Active' },
];

const mockActions: DisciplinaryAction[] = [
    { id: 'da-001', license: mockLicenses[1], actionType: 'Suspension', reason: 'Multiple speeding violations', effectiveDate: '2025-10-01', endDate: '2026-01-01' },
    { id: 'da-002', license: mockLicenses[2], actionType: 'Revocation', reason: 'DUI conviction', effectiveDate: '2025-09-15' },
];

const ActionModal: React.FC<{ license: LicenseRecord, action: 'Suspend' | 'Revoke' | 'Reinstate', onClose: () => void, onSave: (licId: string, action: string, reason: string, duration?: number) => void }> = ({ license, action, onClose, onSave }) => {
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState(30);

    const handleSubmit = () => {
        onSave(license.id, action, reason, duration);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{action} License</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p>Applying action to <strong>{license.holder.name}</strong> ({license.licenseNumber})</p>
                    {action !== 'Reinstate' && (
                        <div>
                            <label className="text-sm font-medium">Reason for {action}</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" rows={3}></textarea>
                        </div>
                    )}
                    {action === 'Suspend' && (
                         <div>
                            <label className="text-sm font-medium">Suspension Duration (days)</label>
                            <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                    )}
                     {action === 'Reinstate' && (
                         <p>Are you sure you want to reinstate this license?</p>
                    )}
                </div>
                <div className="p-4 bg-brand-gray-50 border-t flex justify-end">
                    <button onClick={handleSubmit} className="bg-brand-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Confirm {action}</button>
                </div>
            </div>
        </div>
    );
};

interface DisciplinaryProps {
    navigate: (view: View) => void;
}

const Disciplinary: React.FC<DisciplinaryProps> = ({ navigate }) => {
    const [licenses, setLicenses] = useState(mockLicenses);
    const [actions, setActions] = useState(mockActions);
    const [search, setSearch] = useState('');
    const [selectedLicense, setSelectedLicense] = useState<LicenseRecord | null>(null);
    const [modalAction, setModalAction] = useState<'Suspend' | 'Revoke' | 'Reinstate' | null>(null);

    const searchResults = useMemo(() => {
        if (!search) return [];
        return licenses.filter(l => l.holder.name.toLowerCase().includes(search.toLowerCase()) || l.licenseNumber.includes(search));
    }, [search, licenses]);

    const handleSaveAction = (licId: string, action: string, reason: string, duration?: number) => {
        const newStatus = action === 'Reinstate' ? 'Active' : action === 'Suspend' ? 'Suspended' : 'Revoked';
        setLicenses(prev => prev.map(l => l.id === licId ? {...l, status: newStatus as any} : l));
        setModalAction(null);
        setSelectedLicense(null);
        setSearch('');
    };

    return (
        <>
            {modalAction && selectedLicense && <ActionModal license={selectedLicense} action={modalAction} onClose={() => setModalAction(null)} onSave={handleSaveAction} />}
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate('licensing-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                        <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Disciplinary Actions</h1>
                        <p className="text-brand-gray-600">Manage license suspensions, revocations, and reinstatements.</p>
                    </div>
                </div>

                <Card>
                    <h2 className="text-lg font-semibold mb-4">Find License Holder</h2>
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or license number..." className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
                    </div>
                    {search && (
                        <div className="mt-4 border-t pt-4">
                            {searchResults.map(lic => (
                                <div key={lic.id} className="p-3 bg-brand-gray-50 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{lic.holder.name}</p>
                                        <p className="text-xs text-brand-gray-500">{lic.licenseNumber}</p>
                                    </div>
                                    <button onClick={() => setSelectedLicense(lic)} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm hover:bg-brand-gray-100">Select</button>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
                
                {selectedLicense && (
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Manage: {selectedLicense.holder.name}</h2>
                        <div className="p-3 bg-brand-gray-50 rounded-lg grid grid-cols-2 gap-4">
                            <div><p className="text-xs">Status</p><Badge variant={selectedLicense.status === 'Active' ? 'success' : 'danger'}>{selectedLicense.status}</Badge></div>
                             <div><p className="text-xs">License #</p><p className="font-medium">{selectedLicense.licenseNumber}</p></div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                             <button onClick={() => setModalAction('Suspend')} className="flex-1 bg-amber-500 text-white font-semibold p-2 rounded-lg flex items-center justify-center"><ShieldOff size={16} className="mr-2"/> Suspend</button>
                             <button onClick={() => setModalAction('Revoke')} className="flex-1 bg-red-600 text-white font-semibold p-2 rounded-lg flex items-center justify-center"><X size={16} className="mr-2"/> Revoke</button>
                             <button onClick={() => setModalAction('Reinstate')} disabled={selectedLicense.status === 'Active'} className="flex-1 bg-green-600 text-white font-semibold p-2 rounded-lg flex items-center justify-center disabled:bg-green-300"><ShieldCheck size={16} className="mr-2"/> Reinstate</button>
                        </div>
                    </Card>
                )}

                <Card>
                    <h2 className="text-lg font-semibold mb-4">Active Disciplinary Actions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                                <tr>
                                    <th className="px-4 py-3">License Holder</th>
                                    <th className="px-4 py-3">Action</th>
                                    <th className="px-4 py-3">Reason</th>
                                    <th className="px-4 py-3">Effective Date</th>
                                    <th className="px-4 py-3">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actions.map(action => (
                                    <tr key={action.id} className="border-b">
                                        <td className="px-4 py-3 font-medium">{action.license.holder.name}</td>
                                        <td className="px-4 py-3"><Badge variant={action.actionType === 'Suspension' ? 'warning' : 'danger'}>{action.actionType}</Badge></td>
                                        <td className="px-4 py-3">{action.reason}</td>
                                        <td className="px-4 py-3">{action.effectiveDate}</td>
                                        <td className="px-4 py-3">{action.endDate || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Disciplinary;