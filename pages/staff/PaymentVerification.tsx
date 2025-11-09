import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TaxPaymentRecord, View } from '../../types';
import { Check, X, ArrowLeft } from 'lucide-react';
import { mockPayments, mockInvoices } from '../../data/taxData';

interface PaymentVerificationProps {
    navigate: (view: View) => void;
}

const PaymentVerification: React.FC<PaymentVerificationProps> = ({ navigate }) => {
    const [payments, setPayments] = useState(mockPayments);
    const [selectedPayment, setSelectedPayment] = useState<TaxPaymentRecord | null>(payments[0] || null);
    
    const handleAction = (paymentId: string, action: 'verify' | 'reject') => {
        const paymentToProcess = payments.find(p => p.id === paymentId);
        if (!paymentToProcess) return;

        if (action === 'verify') {
            // Find the corresponding invoice in the shared data and update its status
            const invoiceIndex = mockInvoices.findIndex(inv => inv.id === paymentToProcess.invoiceId);
            if (invoiceIndex !== -1) {
                mockInvoices[invoiceIndex].status = 'Paid';
                mockInvoices[invoiceIndex].paymentDate = new Date().toISOString().split('T')[0];
            }
        }
        
        // Remove payment from the local queue state
        const updatedPayments = payments.filter(payment => payment.id !== paymentId);
        setPayments(updatedPayments);

        if (selectedPayment?.id === paymentId) {
            setSelectedPayment(updatedPayments[0] || null);
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('tax-dashboard')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Payment Verification Queue</h1>
                    <p className="text-brand-gray-600">Verify and reconcile incoming tax payments.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Pending Queue ({payments.length})</h2>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                            {payments.map(p => (
                                <button key={p.id} onClick={() => setSelectedPayment(p)} className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedPayment?.id === p.id ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-transparent hover:bg-brand-gray-100'}`}>
                                    <p className="font-semibold">{p.invoiceId}</p>
                                    <p className="text-sm text-brand-gray-600">${p.amount.toFixed(2)} via {p.paymentMethod}</p>
                                    <p className="text-xs text-brand-gray-500 mt-1">{p.timestamp}</p>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    {selectedPayment ? (
                        <Card>
                             <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold">Transaction Details</h2>
                                    <p className="text-brand-gray-500">Invoice #{selectedPayment.invoiceId}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="p-3 bg-brand-gray-50 rounded-lg">
                                        <p className="text-brand-gray-500">Amount Paid</p>
                                        <p className="font-bold text-lg">${selectedPayment.amount.toFixed(2)}</p>
                                    </div>
                                     <div className="p-3 bg-brand-gray-50 rounded-lg">
                                        <p className="text-brand-gray-500">Payment Method</p>
                                        <p className="font-bold text-lg">{selectedPayment.paymentMethod}</p>
                                    </div>
                                    <div className="p-3 bg-brand-gray-50 rounded-lg col-span-2">
                                        <p className="text-brand-gray-500">Provider Transaction ID</p>
                                        <p className="font-mono text-md">{selectedPayment.transactionId}</p>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold mb-2">Invoice Details</h3>
                                     <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="p-3 bg-white border rounded-lg">
                                            <p className="text-brand-gray-500">Invoice Amount</p>
                                            <p className="font-bold text-lg">${selectedPayment.amount.toFixed(2)}</p>
                                        </div>
                                         <div className="p-3 bg-white border rounded-lg">
                                            <p className="text-brand-gray-500">Vehicle</p>
                                            <p className="font-bold text-lg">{mockInvoices.find(inv => inv.id === selectedPayment.invoiceId)?.vehicle.plate || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t flex justify-end space-x-2">
                                    <button onClick={() => handleAction(selectedPayment.id, 'reject')} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 flex items-center"><X size={16} className="mr-2"/> Reject Payment</button>
                                    <button onClick={() => handleAction(selectedPayment.id, 'verify')} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"><Check size={16} className="mr-2"/> Verify Payment</button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                         <Card className="text-center py-20">
                            <p className="text-brand-gray-500">Select a payment from the queue to verify.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentVerification;
