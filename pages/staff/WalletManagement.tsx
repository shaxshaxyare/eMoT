import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { WalletTopUpRequest, View } from '../../types';
import { Check, X, ArrowLeft, Eye } from 'lucide-react';
import { mockWalletTopUps } from '../../data/walletData';

interface WalletManagementProps {
    navigate: (view: View) => void;
}

const ProofModal: React.FC<{ request: WalletTopUpRequest; onClose: () => void; }> = ({ request, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="p-5 border-b flex justify-between items-center flex-shrink-0">
                <h2 className="text-lg font-semibold">Transaction Proof for {request.user.name}</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
                <img src={request.proofUrl} alt={`Proof for transaction ${request.transactionId}`} className="w-full h-auto rounded-lg border" />
                <p className="text-xs text-center text-gray-500 mt-2">Sample receipt image.</p>
            </div>
             <div className="p-4 bg-brand-gray-50 border-t flex justify-end flex-shrink-0">
                <button onClick={onClose} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100">
                    Close
                </button>
            </div>
        </div>
    </div>
);

const WalletManagement: React.FC<WalletManagementProps> = ({ navigate }) => {
    const [requests, setRequests] = useState(mockWalletTopUps);
    const [selectedRequest, setSelectedRequest] = useState<WalletTopUpRequest | null>(requests[0] || null);
    const [isProofModalOpen, setProofModalOpen] = useState(false);
    
    const handleAction = (requestId: string, action: 'approve' | 'reject') => {
        const updatedRequests = requests.filter(req => req.id !== requestId);
        setRequests(updatedRequests);
        if (selectedRequest?.id === requestId) {
            setSelectedRequest(updatedRequests[0] || null);
        }
    };
    
    return (
        <>
        {isProofModalOpen && selectedRequest && <ProofModal request={selectedRequest} onClose={() => setProofModalOpen(false)} />}
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('payroll')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Wallet Top-Up Management</h1>
                    <p className="text-brand-gray-600">Review and approve pending top-up requests from citizens.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Pending Queue ({requests.length})</h2>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                            {requests.map(req => (
                                <button key={req.id} onClick={() => setSelectedRequest(req)} className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedRequest?.id === req.id ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-transparent hover:bg-brand-gray-100'}`}>
                                    <p className="font-semibold">{req.user.name}</p>
                                    <p className="text-sm text-brand-gray-600">${req.amount.toFixed(2)} via {req.paymentMethod}</p>
                                    <p className="text-xs text-brand-gray-500 mt-1">{req.submittedDate}</p>
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
                                    <h2 className="text-xl font-bold">Request Details</h2>
                                    <p className="text-brand-gray-500">Request #{selectedRequest.id}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="p-3 bg-brand-gray-50 rounded-lg">
                                        <p className="text-brand-gray-500">User</p>
                                        <p className="font-bold text-lg">{selectedRequest.user.name}</p>
                                        <p className="text-xs text-brand-gray-500">ID: {selectedRequest.user.id}</p>
                                    </div>
                                    <div className="p-3 bg-brand-gray-50 rounded-lg">
                                        <p className="text-brand-gray-500">Amount to Add</p>
                                        <p className="font-bold text-lg">${selectedRequest.amount.toFixed(2)}</p>
                                    </div>
                                    <div className="p-3 bg-brand-gray-50 rounded-lg col-span-2">
                                        <p className="text-brand-gray-500">Payment Method</p>
                                        <p className="font-bold text-lg">{selectedRequest.paymentMethod}</p>
                                    </div>
                                    <div className="p-3 bg-brand-gray-50 rounded-lg col-span-2">
                                        <p className="text-brand-gray-500">Provider Transaction ID</p>
                                        <p className="font-mono text-md">{selectedRequest.transactionId}</p>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t">
                                    <button onClick={() => setProofModalOpen(true)} className="w-full bg-white border border-brand-gray-300 text-brand-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-brand-gray-100 flex items-center justify-center">
                                        <Eye size={16} className="mr-2"/> View Transaction Proof
                                    </button>
                                </div>
                                
                                <div className="pt-4 border-t flex justify-end space-x-2">
                                    <button onClick={() => handleAction(selectedRequest.id, 'reject')} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 flex items-center"><X size={16} className="mr-2"/> Reject</button>
                                    <button onClick={() => handleAction(selectedRequest.id, 'approve')} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"><Check size={16} className="mr-2"/> Approve & Credit Wallet</button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                         <Card className="text-center py-20">
                            <p className="text-brand-gray-500">Select a top-up request from the queue to review.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default WalletManagement;
