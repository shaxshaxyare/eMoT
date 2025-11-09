import React, { useState, useMemo } from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DollarSign, Search, Filter, Download, AlertCircle, FileText, X, Plus, Loader2, CheckCircle, Wallet as WalletIcon, Upload, QrCode } from 'lucide-react';

interface PaymentsProps {
  navigate: (view: View) => void;
}

const initialOutstandingPayments = [
    { id: 'tax-q1-2026-1', type: 'Road Tax (Tremistrale)', reference: 'ABC-4821', amount: 75.00, due: 'Jan 15, 2026', category: 'fee' },
    { id: 'tax-q1-2026-2', type: 'Road Tax (Tremistrale)', reference: 'TRK-9023', amount: 120.00, due: 'Jan 15, 2026', category: 'fee' },
    { id: 'app-fee-1', type: 'Application Fee', reference: 'Comm. Upgrade', amount: 50.00, due: 'Dec 01, 2025', category: 'fee' },
    { id: 'fine-1', type: 'Fine / Penalty', reference: 'Speeding Ticket #F-99821', amount: 150.00, due: 'Dec 10, 2025', category: 'fine' },
];

const initialTransactionHistory = [
    { id: 'pmt_1', date: 'Oct 05, 2025', type: 'Payment', amount: 195.00, status: 'Completed', receipt: '#INV-2025-Q4-1', reference: 'Road Tax for ABC-4821, TRK-9023' },
    { id: 'pmt_2', date: 'Aug 12, 2025', type: 'Payment', amount: 10.00, status: 'Completed', receipt: '#INV-AU-0825-1', reference: 'Address Update Fee' },
];

interface TopUpModalProps {
    onClose: () => void;
    onTopUp: (amount: number, method: string, proof: File | null) => void;
}

const paymentMethods = {
    'evc_plus': {
        name: 'EVC Plus',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: '615 123 456',
        shortcode: '*712*615123456*{AMOUNT}#',
    },
    'edahab': {
        name: 'eDahab',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: '625 123 456',
        shortcode: '*110*625123456*{AMOUNT}#',
    },
    'jeeb': {
        name: 'Jeeb',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: 'Ministry of Transport (Jeeb)',
        shortcode: 'N/A - Use App',
    },
    'zaad': {
        name: 'Zaad',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: '634 123 456',
        shortcode: '*888*634123456*{AMOUNT}#',
    },
    'sahal': {
        name: 'Sahal',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: '907 123 456',
        shortcode: '*333*907123456*{AMOUNT}#',
    },
    'premier_wallet': {
        name: 'Premier Wallet',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: 'Ministry of Transport (PW)',
        shortcode: 'N/A - Use App',
    },
    'ebesa': {
        name: 'eBesa',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: '655 123 456',
        shortcode: '*199#',
    },
    't_pus': {
        name: 'T-Pus',
        instruction: 'Send the money to the Galmudug state - Finance Number/Account below, or simple scan the QR code for quick payment',
        account: 'Ministry of Transport (T-Pus)',
        shortcode: 'N/A - Use App',
    }
};


const TopUpModal: React.FC<TopUpModalProps> = ({ onClose, onTopUp }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('evc_plus');
    const [proof, setProof] = useState<File | null>(null);
    const [topUpState, setTopUpState] = useState<'idle' | 'processing' | 'success'>('idle');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProof(e.target.files[0]);
        } else {
            setProof(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const topUpAmount = parseFloat(amount);
        if (topUpAmount > 0) {
            setTopUpState('processing');
            setTimeout(() => {
                onTopUp(topUpAmount, paymentMethods[method].name, proof);
                setTopUpState('success');
                setTimeout(onClose, 1500);
            }, 2000);
        }
    };

    const selectedMethodDetails = paymentMethods[method];

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all" role="document">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-brand-gray-800">Top Up Wallet</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100 text-brand-gray-500"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6">
                    {topUpState === 'success' ? (
                        <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                            <h3 className="text-xl font-bold mt-4">Top Up Approved!</h3>
                            <p className="text-brand-gray-600 mt-1">${parseFloat(amount).toFixed(2)} has been added to your wallet.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-2 -mr-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Amount ($)</label>
                                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 text-sm" required min="1" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Payment Method</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                        {Object.entries(paymentMethods).map(([key, value]) => (
                                            <button type="button" key={key} onClick={() => setMethod(key)} className={`p-3 border rounded-lg text-xs font-semibold transition-colors ${method === key ? 'bg-brand-blue-50 border-brand-blue-500 ring-2 ring-brand-blue-200' : 'border-brand-gray-200 hover:border-brand-gray-300'}`}>
                                                {value.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-brand-gray-50 rounded-lg flex items-start space-x-4">
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-brand-gray-800">{selectedMethodDetails.name} Instructions</h3>
                                        <p className="text-xs text-brand-gray-600 mt-1">{selectedMethodDetails.instruction}</p>
                                        <p className="text-sm mt-2"><strong>Ministry Account:</strong> <span className="font-mono bg-white p-1 rounded text-xs">{selectedMethodDetails.account}</span></p>
                                    </div>
                                    {selectedMethodDetails.shortcode.includes('*') && (
                                        <div className="text-center">
                                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(selectedMethodDetails.shortcode.replace('{AMOUNT}', amount || 'AMOUNT'))}`} alt="QR Code" className="rounded-md" />
                                            <p className="text-[10px] text-brand-gray-500 mt-1">Scan to pay</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium">Proof of Transaction (Optional)</label>
                                    <div className="mt-1 flex items-center justify-center w-full">
                                        <label className="w-full flex flex-col items-center px-4 py-3 bg-white text-brand-blue-700 rounded-lg shadow-sm tracking-wide uppercase border border-brand-gray-300 cursor-pointer hover:bg-brand-blue-50">
                                            <Upload className="w-5 h-5" />
                                            <span className="mt-1 text-xs leading-normal">{proof ? proof.name : 'Select a file'}</span>
                                            <input type='file' className="hidden" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button type="submit" disabled={topUpState === 'processing'} className="bg-brand-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium w-full flex items-center justify-center disabled:bg-brand-gray-400">
                                    {topUpState === 'processing' ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Processing Request...</> : 'Submit Top Up Request'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};


const Payments: React.FC<PaymentsProps> = ({ navigate }) => {
    const [walletBalance, setWalletBalance] = useState(50.00);
    const [outstandingPayments, setOutstandingPayments] = useState(initialOutstandingPayments);
    const [transactionHistory, setTransactionHistory] = useState(initialTransactionHistory);
    const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
    const [filter, setFilter] = useState('all');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showTopUpModal, setShowTopUpModal] = useState(false);

    const totalOutstanding = useMemo(() => outstandingPayments.reduce((sum, item) => sum + item.amount, 0), [outstandingPayments]);
    const filteredPayments = useMemo(() => {
        if (filter === 'all') return outstandingPayments;
        if (filter === 'fines') return outstandingPayments.filter(p => p.category === 'fine');
        return outstandingPayments.filter(p => p.category === 'fee');
    }, [filter, outstandingPayments]);
    const totalSelected = useMemo(() => outstandingPayments.filter(item => selectedPayments.includes(item.id)).reduce((sum, item) => sum + item.amount, 0), [selectedPayments, outstandingPayments]);

    const handleSelectPayment = (id: string) => setSelectedPayments(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedPayments(e.target.checked ? filteredPayments.map(p => p.id) : []);

    const handlePayNow = () => {
        if (totalSelected <= 0) return;
        if (walletBalance < totalSelected) {
            alert("Insufficient wallet balance. Please top up your wallet to proceed.");
            return;
        }
        setIsProcessing(true);
        setTimeout(() => {
            const itemsPaid = outstandingPayments.filter(item => selectedPayments.includes(item.id));
            const newHistoryItems = itemsPaid.map(item => ({
                id: `pmt_${Date.now()}_${item.id}`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                type: 'Payment',
                amount: item.amount,
                status: 'Completed',
                receipt: `#INV-${Date.now().toString().slice(-6)}`,
                reference: `${item.type} - ${item.reference}`,
            }));

            setTransactionHistory(prev => [...newHistoryItems, ...prev]);
            setOutstandingPayments(prev => prev.filter(item => !selectedPayments.includes(item.id)));
            setWalletBalance(prev => prev - totalSelected);
            setSelectedPayments([]);
            setIsProcessing(false);
            setShowSuccessModal(true);
        }, 2000);
    };

    const handleTopUp = (amount: number, method: string, proof: File | null) => {
        setWalletBalance(prev => prev + amount);
        const newHistoryItem = {
            id: `topup_${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            type: 'Top Up',
            amount: amount,
            status: 'Completed',
            receipt: `#TU-${Date.now().toString().slice(-6)}`,
            reference: `From ${method}`,
        };
        setTransactionHistory(prev => [newHistoryItem, ...prev]);
    };

    return (
    <>
        {showTopUpModal && <TopUpModal onClose={() => setShowTopUpModal(false)} onTopUp={handleTopUp} />}
        {showSuccessModal && <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-xl shadow-2xl w-full max-w-sm text-center p-8"><CheckCircle className="w-16 h-16 text-green-500 mx-auto" /><h2 className="text-2xl font-bold mt-4">Payment Successful!</h2><p className="text-brand-gray-600 mt-2">You have successfully paid <strong>${totalSelected.toFixed(2)}</strong> from your wallet.</p><button onClick={() => setShowSuccessModal(false)} className="mt-6 w-full bg-brand-blue-700 text-white font-semibold py-2.5 rounded-lg hover:bg-brand-blue-800">Done</button></div></div>}
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Wallet</h1>
            
            <Card className="bg-brand-blue-50 text-brand-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                    {/* Wallet Balance */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center space-x-2">
                            <WalletIcon className="w-6 h-6 text-brand-blue-600" />
                            <p className="text-brand-blue-700 text-sm font-semibold">WALLET BALANCE</p>
                        </div>
                        <p className="text-4xl font-bold mt-2 text-brand-gray-900">${walletBalance.toFixed(2)}</p>
                        <button onClick={() => setShowTopUpModal(true)} className="mt-4 bg-brand-blue-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-brand-blue-800 flex items-center justify-center text-sm">
                            <Plus className="w-4 h-4 mr-2" /> Top Up Wallet
                        </button>
                    </div>

                    <div className="w-full sm:w-px sm:h-24 bg-brand-blue-200"></div>

                    {/* Outstanding Balance */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center space-x-2">
                            <DollarSign className="w-6 h-6 text-amber-600" />
                            <p className="text-amber-700 text-sm font-semibold">OUTSTANDING BALANCE</p>
                        </div>
                        <p className="text-4xl font-bold mt-2 text-brand-gray-900">${totalOutstanding.toFixed(2)}</p>
                        <p className="text-sm text-brand-gray-600 mt-2">Across {outstandingPayments.length} items</p>
                    </div>
                </div>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Outstanding Payments</h2>
                            <div className="flex space-x-2"><FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton><FilterButton active={filter === 'fees'} onClick={() => setFilter('fees')}>Taxes & Fees</FilterButton><FilterButton active={filter === 'fines'} onClick={() => setFilter('fines')}>Fines</FilterButton></div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-brand-gray-50 text-left text-xs uppercase text-brand-gray-500"><tr><th className="p-3 w-8"><input type="checkbox" onChange={handleSelectAll} checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0} className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500" /></th><th className="p-3">Item Description</th><th className="p-3">Due Date</th><th className="p-3 text-right">Amount</th></tr></thead>
                                <tbody>{filteredPayments.length > 0 ? filteredPayments.map(item => (<tr key={item.id} className="border-b last:border-b-0"><td className="p-3"><input type="checkbox" checked={selectedPayments.includes(item.id)} onChange={() => handleSelectPayment(item.id)} className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500"/></td><td className="p-3 flex items-center space-x-2">{item.category === 'fine' ? <AlertCircle className="w-5 h-5 text-amber-600 shrink-0"/> : <FileText className="w-5 h-5 text-brand-gray-500 shrink-0"/>}<div><p className="font-medium">{item.type}</p><p className="text-xs text-brand-gray-500">{item.reference}</p></div></td><td className="p-3 text-brand-gray-600">{item.due}</td><td className="p-3 font-semibold text-right">${item.amount.toFixed(2)}</td></tr>)) : (<tr><td colSpan={4} className="text-center p-6 text-brand-gray-500">No outstanding payments.</td></tr>)}</tbody>
                            </table>
                        </div>
                    </Card>
                </div>
                <div className="sticky top-24">
                    <Card>
                        <h2 className="text-lg font-semibold">Payment Summary</h2>
                        <p className="text-sm text-brand-gray-500 mb-4">{selectedPayments.length} item(s) selected</p>
                        <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-brand-gray-600">Subtotal</span><span>${totalSelected.toFixed(2)}</span></div><div className="flex justify-between"><span className="text-brand-gray-600">Service Fee</span><span>${(totalSelected > 0 ? 2.50 : 0).toFixed(2)}</span></div><div className="flex justify-between font-bold pt-2 border-t mt-2 text-lg"><span >Total</span><span>${(totalSelected > 0 ? totalSelected + 2.50 : 0).toFixed(2)}</span></div></div>
                        <hr className="my-4"/>
                        <div className="p-3 bg-brand-gray-50 rounded-lg text-sm"><div className="flex justify-between"><span>Current Balance</span><span className="font-medium">${walletBalance.toFixed(2)}</span></div><div className={`flex justify-between mt-1 ${walletBalance - (totalSelected > 0 ? totalSelected + 2.50 : 0) < 0 ? 'text-red-600' : ''}`}><span className="font-medium">Remaining Balance</span><span className="font-bold">${(walletBalance - (totalSelected > 0 ? totalSelected + 2.50 : 0)).toFixed(2)}</span></div></div>
                        <button onClick={handlePayNow} disabled={totalSelected === 0 || isProcessing} className="mt-6 w-full bg-brand-blue-700 text-white font-semibold py-2.5 rounded-lg hover:bg-brand-blue-800 disabled:bg-brand-gray-300 flex items-center justify-center">
                            {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : 'Pay from Wallet'}
                        </button>
                    </Card>
                </div>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div className="relative w-full max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" /><input type="text" placeholder="Search by receipt or type" className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" /></div>
                    <div className="flex items-center space-x-2"><button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Filter className="w-4 h-4 mr-1.5"/> Filter by date</button><button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Export</button></div>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Receipt</th></tr></thead>
                        <tbody>{transactionHistory.map(item => (<tr key={item.id} className="border-b"><td className="px-4 py-3">{item.date}</td><td className="px-4 py-3"><p className="font-medium">{item.type}</p><p className="text-xs text-brand-gray-500">{item.reference}</p></td><td className={`px-4 py-3 font-semibold ${item.type === 'Top Up' ? 'text-green-600' : 'text-red-600'}`}>{item.type === 'Top Up' ? '+' : '-'}${item.amount.toFixed(2)}</td><td className="px-4 py-3"><Badge variant="success">{item.status}</Badge></td><td className="px-4 py-3 text-right"><button className="font-medium text-brand-blue-700 hover:underline flex items-center justify-end w-full"><Download className="w-4 h-4 mr-1.5" /> {item.receipt}</button></td></tr>))}</tbody>
                    </table>
                </div>
            </Card>
        </div>
    </>
    );
};

const FilterButton: React.FC<{active: boolean, onClick: () => void, children: React.ReactNode}> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-3 py-1 text-sm font-medium rounded-lg ${active ? 'bg-brand-blue-600 text-white' : 'bg-white border border-brand-gray-300 text-brand-gray-700 hover:bg-brand-gray-100'}`}>
        {children}
    </button>
);

export default Payments;