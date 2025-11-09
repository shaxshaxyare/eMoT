import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RoadTaxInvoice, View } from '../../types';
import { ArrowLeft, Search, Filter, Send, DollarSign, X, Edit, Trash2 } from 'lucide-react';
import { mockInvoices, registeredVehicles } from '../../data/taxData';

interface InvoicesProps {
    navigate: (view: View) => void;
}

const InvoiceModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (invoice: RoadTaxInvoice) => void;
    invoice: RoadTaxInvoice | null;
}> = ({ isOpen, onClose, onSave, invoice }) => {
    const [currentInvoice, setCurrentInvoice] = useState<RoadTaxInvoice | null>(invoice);

    React.useEffect(() => {
        setCurrentInvoice(invoice);
    }, [invoice]);

    if (!isOpen || !currentInvoice) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentInvoice(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSave = () => {
        if (currentInvoice) {
            onSave(currentInvoice);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Edit Invoice #{currentInvoice.id}</h2>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <input name="amount" value={currentInvoice.amount} onChange={handleChange} type="number" className="w-full border p-2 rounded" />
                    <input name="dueDate" value={currentInvoice.dueDate} onChange={handleChange} type="date" className="w-full border p-2 rounded" />
                </div>
                <div className="p-4 bg-gray-50 border-t flex justify-end">
                    <button onClick={handleSave} className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const GenerateInvoiceModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (quarter: string, year: string, dueDate: string) => void;
}> = ({ isOpen, onClose, onGenerate }) => {
    const [quarter, setQuarter] = useState('Q1');
    const [year, setYear] = useState('2026');
    const [dueDate, setDueDate] = useState('');

    if(!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Generate New Quarter Invoices</h2>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label>Quarter</label>
                        <select value={quarter} onChange={e => setQuarter(e.target.value)} className="w-full border p-2 rounded bg-white">
                            <option>Q1</option>
                            <option>Q2</option>
                            <option>Q3</option>
                            <option>Q4</option>
                        </select>
                    </div>
                    <div>
                        <label>Year</label>
                        <input value={year} onChange={e => setYear(e.target.value)} type="text" className="w-full border p-2 rounded" />
                    </div>
                     <div>
                        <label>Due Date</label>
                        <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" className="w-full border p-2 rounded" />
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex justify-end">
                    <button onClick={() => onGenerate(quarter, year, dueDate)} className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg">Generate Invoices</button>
                </div>
            </div>
        </div>
    )
}


const Invoices: React.FC<InvoicesProps> = ({ navigate }) => {
    const [invoices, setInvoices] = useState<RoadTaxInvoice[]>(mockInvoices);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isGenerateModalOpen, setGenerateModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<RoadTaxInvoice | null>(null);

    const handleEdit = (invoice: RoadTaxInvoice) => {
        setSelectedInvoice(invoice);
        setEditModalOpen(true);
    };
    
    const handleSave = (updatedInvoice: RoadTaxInvoice) => {
        const newInvoices = invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv);
        setInvoices(newInvoices);
        // also update the shared mock data
        const index = mockInvoices.findIndex(inv => inv.id === updatedInvoice.id);
        if (index !== -1) mockInvoices[index] = updatedInvoice;
        setEditModalOpen(false);
    };

    const handleCancelInvoice = (invoiceId: string) => {
        if (window.confirm("Are you sure you want to cancel this invoice? This cannot be undone.")) {
            const newInvoices = invoices.map(inv => inv.id === invoiceId ? { ...inv, status: 'Paid', isCancelled: true } : inv);
            setInvoices(newInvoices);
            const index = mockInvoices.findIndex(inv => inv.id === invoiceId);
            if (index !== -1) mockInvoices[index] = { ...mockInvoices[index], status: 'Paid', isCancelled: true };
        }
    };

    const handleGenerate = (quarter: string, year: string, dueDate: string) => {
        const period = `${quarter} ${year}`;
        const newInvoices = registeredVehicles.map(v => ({
            id: `INV-${quarter}-${Date.now().toString().slice(-4)}-${v.plate.slice(-4)}`,
            vehicle: { plate: v.plate, make: v.make, model: v.model },
            owner: v.owner,
            period,
            amount: v.make === 'Ford' ? 120.00 : 75.00, // Example logic
            dueDate,
            status: 'Due' as 'Due'
        }));
        
        setInvoices(prev => [...prev, ...newInvoices]);
        mockInvoices.push(...newInvoices);
        setGenerateModalOpen(false);
    };

    const displayInvoices = useMemo(() => invoices.filter(inv => !inv.isCancelled), [invoices]);

  return (
    <>
        <InvoiceModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} onSave={handleSave} invoice={selectedInvoice} />
        <GenerateInvoiceModal isOpen={isGenerateModalOpen} onClose={() => setGenerateModalOpen(false)} onGenerate={handleGenerate} />
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('tax-dashboard')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Invoice Management</h1>
                    <p className="text-brand-gray-600">Search, filter, and manage all road tax invoices.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                     <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" placeholder="Search by plate, owner, or invoice #" className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Filter className="w-4 h-4 mr-1.5"/> Status</button>
                        <button onClick={() => setGenerateModalOpen(true)} className="flex items-center bg-brand-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-brand-blue-700">Generate New Quarter</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Invoice #</th>
                                <th className="px-4 py-3">Vehicle Plate</th>
                                <th className="px-4 py-3">Owner</th>
                                <th className="px-4 py-3">Period</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayInvoices.map(inv => (
                                <tr key={inv.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{inv.id}</td>
                                    <td className="px-4 py-3">{inv.vehicle.plate}</td>
                                    <td className="px-4 py-3">{inv.owner.name}</td>
                                    <td className="px-4 py-3">{inv.period}</td>
                                    <td className="px-4 py-3">${inv.amount.toFixed(2)}</td>
                                    <td className="px-4 py-3"><Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Overdue' ? 'danger' : 'warning'}>{inv.status}</Badge></td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button className="p-1.5 rounded-md hover:bg-brand-gray-100" title="Resend Invoice"><Send size={16} /></button>
                                        <button className="p-1.5 rounded-md hover:bg-brand-gray-100" title="View Payment"><DollarSign size={16} /></button>
                                        {inv.status !== 'Paid' && <button onClick={() => handleEdit(inv)} className="p-1.5 rounded-md hover:bg-brand-gray-100" title="Edit"><Edit size={16} /></button>}
                                        {inv.status !== 'Paid' && <button onClick={() => handleCancelInvoice(inv.id)} className="p-1.5 rounded-md hover:bg-brand-gray-100" title="Cancel Invoice"><Trash2 size={16} className="text-red-500" /></button>}
                                    </td>
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

export default Invoices;
