import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowLeft, Car, User, Info, FileText, Save, Search, Upload, Download, FileCheck2, PlusCircle, X, File, CheckCircle, AlertTriangle, RefreshCw, Loader2, Hourglass } from 'lucide-react';
import { ApplicationView } from '../../pages/Applications';
import { jsPDF } from "jspdf";

interface VehicleOwnershipTransferProps {
    setView: (view: ApplicationView) => void;
}

const InputField: React.FC<{ label: string; placeholder: string; value?: string; disabled?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, placeholder, value, disabled, onChange }) => (
    <div>
        <label className="text-sm font-medium text-brand-gray-700">{label}</label>
        <input type="text" placeholder={placeholder} value={value || ''} disabled={disabled} onChange={onChange} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none disabled:bg-brand-gray-100" />
    </div>
);

const AdvancedUploadField: React.FC<{ label: string }> = ({ label }) => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'application/pdf') {
                setError('Only PDF files are allowed.');
                return;
            }
            setError('');
            setFile(selectedFile);
            setIsUploading(true);
            setIsComplete(false);
            setProgress(0);

            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        setIsComplete(true);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 150);
        }
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
        setIsUploading(false);
        setIsComplete(false);
        setError('');
    };
    
    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div>
            <label className="text-sm font-medium text-brand-gray-700 block mb-1">{label}</label>
            {!file ? (
                <>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-brand-gray-300 border-dashed rounded-lg cursor-pointer bg-brand-gray-50 hover:bg-brand-gray-100">
                    <div className="flex flex-col items-center justify-center">
                        <Upload className="w-8 h-8 text-brand-gray-500"/>
                        <p className="text-xs text-brand-gray-500 mt-1"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                         <p className="text-xs text-brand-gray-400">PDF only</p>
                    </div>
                    <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                </label>
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                </>
            ) : (
                <div className="p-3 border rounded-lg bg-white">
                    <div className="flex items-center space-x-3">
                         <File className="w-8 h-8 text-brand-blue-500 shrink-0"/>
                         <div className="flex-grow">
                             <p className="text-sm font-medium truncate">{file.name}</p>
                             <p className="text-xs text-brand-gray-500">{formatBytes(file.size)}</p>
                         </div>
                         {isComplete ? (
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                         ) : (
                            <button onClick={removeFile} className="p-1 rounded-full hover:bg-brand-gray-100"><X className="w-4 h-4 text-brand-gray-500"/></button>
                         )}
                    </div>
                    {isUploading && (
                        <div className="w-full bg-brand-gray-200 rounded-full h-1.5 mt-2">
                            <div className="bg-brand-blue-600 h-1.5 rounded-full" style={{width: `${progress}%`}}></div>
                        </div>
                    )}
                    {isComplete && <p className="text-xs text-green-600 font-medium mt-1">Upload complete</p>}
                </div>
            )}
        </div>
    );
};


const mockBuyers = [
    { id: 'usr_123', name: 'Axmed Cumar', citizenId: 'AC-9876-54', email: 'axmed.c@example.com', phone: '+252 61 555 1111', address: '123 Wadada Maka Al Mukarama, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=usr_123' },
    { id: 'usr_456', name: 'Farhiya Jaamac', citizenId: 'FJ-5432-10', email: 'farhiya.j@example.com', phone: '+252 61 555 2222', address: '456 Jidka Warshadaha, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=usr_456' },
    { id: 'usr_789', name: 'Cabdi Ismaaciil', citizenId: 'CI-1122-33', email: 'cabdi.i@example.com', phone: '+252 61 555 3333', address: '789 Laamiga Taleex, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=usr_789' },
    { id: 'usr_101', name: 'Xaliimo Aadan', citizenId: 'XA-2468-10', email: 'xaliimo.a@example.com', phone: '+252 61 555 4444', address: '246 Wadada Wadnaha, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=usr_101' },
    { id: 'usr_102', name: 'Maxamed Faarax', citizenId: 'MF-1357-91', email: 'maxamed.f@example.com', phone: '+252 61 555 5555', address: '135 Jidka Zoppe, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=usr_102' },
];

type Buyer = typeof mockBuyers[0] | null;
type Witness = { name: string; phone: string };
type Status = 'pending' | 'in-progress' | 'completed';

const VehicleOwnershipTransfer: React.FC<VehicleOwnershipTransferProps> = ({ setView }) => {
    const [step, setStep] = useState(1);
    const [selectedVehicle, setSelectedVehicle] = useState('ABC-4821');
    const [buyerSearchQuery, setBuyerSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<typeof mockBuyers>([]);
    const [selectedBuyer, setSelectedBuyer] = useState<Buyer>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [submittedQuery, setSubmittedQuery] = useState('');

    const [transferType, setTransferType] = useState('Sale');
    const [dateOfSale, setDateOfSale] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [odometer, setOdometer] = useState('');

    const [witnesses, setWitnesses] = useState<Witness[]>([
        { name: '', phone: '' },
        { name: '', phone: '' },
        { name: '', phone: '' },
    ]);
    
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentMobileNumber, setPaymentMobileNumber] = useState('');
    const applicationID = `TRN-${Date.now().toString().slice(-6)}`;

    const [paymentStatus, setPaymentStatus] = useState<Status>('pending');
    const [reviewStatus, setReviewStatus] = useState<Status>('pending');
    const [approvalStatus, setApprovalStatus] = useState<Status>('pending');

    const paymentMethods = {
        evc: { name: 'EVC Plus', shortcode: `*712*615130906*50#`, logo: 'https://i.imgur.com/8Q6Q2hG.png' },
        edahab: { name: 'eDahab', shortcode: `*110*625130906*50#`, logo: 'https://i.imgur.com/k2x2L0W.png' },
        zaad: { name: 'Zaad', shortcode: `*712*615130906*50#`, logo: 'https://i.imgur.com/n9w5jJ3.png' }
    };

    const handleWitnessChange = (index: number, field: keyof Witness, value: string) => {
        const newWitnesses = [...witnesses];
        newWitnesses[index][field] = value;
        setWitnesses(newWitnesses);
    };

    const addWitness = () => {
        setWitnesses([...witnesses, { name: '', phone: '' }]);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = buyerSearchQuery.trim();
        if (!query) return;
        setIsSearching(true);
        setSubmittedQuery(query);
        setTimeout(() => {
            const results = mockBuyers.filter(buyer =>
                buyer.name.toLowerCase().includes(query.toLowerCase()) ||
                buyer.citizenId.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
            setIsSearching(false);
        }, 500);
    };
    
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuyerSearchQuery(e.target.value);
        if (submittedQuery) setSubmittedQuery('');
    };

    const handleSelectBuyer = (buyer: typeof mockBuyers[0]) => {
        setSelectedBuyer(buyer);
        setSearchResults([]);
        setBuyerSearchQuery('');
        setSubmittedQuery('');
    };

    const clearSelection = () => setSelectedBuyer(null);

    const handleSubmitAndPay = () => {
        setStep(4);
        setPaymentStatus('in-progress');
        setTimeout(() => {
            setPaymentStatus('completed');
            setReviewStatus('in-progress');
        }, 2500);
        setTimeout(() => {
            setReviewStatus('completed');
            setApprovalStatus('in-progress');
        }, 4500);
        setTimeout(() => {
            setApprovalStatus('completed');
        }, 6500);
    };

    const generatePdf = (docType: 'acknowledgement' | 'invoice') => {
        const doc = new jsPDF();
        
        if(docType === 'acknowledgement') {
            doc.setFontSize(18);
            doc.text("Vehicle Transfer Acknowledgement", 14, 22);
            doc.setFontSize(11);
            doc.text("This document acknowledges the legal transfer of the vehicle specified below.", 14, 35);
            // ... (rest of acknowledgement PDF generation)
            doc.save("transfer_acknowledgement.pdf");
        } else {
             doc.setFontSize(22);
            doc.text("INVOICE", 14, 22);
            doc.setFontSize(10);
            doc.text(`Invoice #: ${applicationID}`, 14, 30);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 35);
            
            doc.text("Ministry of Transportation", 150, 22);
            doc.text("123 Civic Avenue, Capital City", 150, 27);

            doc.text("Bill To:", 14, 50);
            doc.text("Alex Johnson", 14, 55);
            doc.text("Citizen ID: 9823-44", 14, 60);

            doc.line(14, 70, 196, 70);
            doc.text("Description", 14, 77);
            doc.text("Amount", 180, 77);
            doc.line(14, 80, 196, 80);

            doc.text("Application Fee", 14, 87);
            doc.text("$50.00", 180, 87);
            
            doc.line(14, 110, 196, 110);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text("Total Due:", 150, 117);
            doc.text("$50.00", 180, 117);
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text("Please pay this invoice to proceed with your application.", 14, 140);
            doc.text("Payment can be made via EVC Plus, eDahab, or Zaad.", 14, 145);

            doc.save(`invoice_${applicationID}.pdf`);
        }
    };

    const step1Content = (
      <>
        <Card>
            <h2 className="text-lg font-semibold flex items-center"><Car className="w-5 h-5 mr-2 text-brand-blue-700"/> Select Vehicle</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Choose the vehicle you wish to transfer.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VehicleRadioCard id="ABC-4821" make="Toyota Camry" selected={selectedVehicle} setSelected={setSelectedVehicle} />
                <VehicleRadioCard id="TRK-9023" make="Ford F-150" selected={selectedVehicle} setSelected={setSelectedVehicle} />
            </div>
        </Card>
        <Card>
            <h2 className="text-lg font-semibold flex items-center"><User className="w-5 h-5 mr-2 text-brand-blue-700"/> Buyer Information</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Search for and select the new owner.</p>
            {selectedBuyer ? (
                <div>
                    <div className="p-4 bg-brand-blue-50 border border-brand-blue-200 rounded-lg">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <img src={selectedBuyer.avatarUrl} alt={selectedBuyer.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                                <div>
                                    <p className="font-bold text-lg text-brand-blue-900">{selectedBuyer.name}</p>
                                    <p className="text-sm text-brand-blue-800">ID: {selectedBuyer.citizenId}</p>
                                </div>
                            </div>
                            <button onClick={clearSelection} className="text-sm text-brand-blue-700 hover:underline font-semibold">Change Buyer</button>
                        </div>
                        <hr className="my-3 border-brand-blue-200" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-brand-blue-900">
                            <div><span className="font-medium text-brand-blue-700">Email:</span> {selectedBuyer.email}</div>
                            <div><span className="font-medium text-brand-blue-700">Phone:</span> {selectedBuyer.phone}</div>
                            <div className="sm:col-span-2"><span className="font-medium text-brand-blue-700">Address:</span> {selectedBuyer.address}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                            <input type="text" value={buyerSearchQuery} onChange={handleQueryChange} placeholder="Search by name or Citizen ID..." className="w-full border border-brand-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none" />
                        </div>
                        <button type="submit" disabled={isSearching} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-400">{isSearching ? 'Searching...' : 'Search'}</button>
                    </form>
                    {searchResults.length > 0 && (
                        <div className="mt-4 border-t pt-4">
                            <h3 className="text-sm font-semibold mb-2">Search Results ({searchResults.length})</h3>
                            <ul className="space-y-2 max-h-48 overflow-y-auto">{searchResults.map(buyer => (<li key={buyer.id} className="p-3 bg-brand-gray-50 rounded-lg flex justify-between items-center"><div className="flex items-center space-x-3"><img src={buyer.avatarUrl} alt={buyer.name} className="w-10 h-10 rounded-full" /><div><p className="font-medium">{buyer.name}</p><p className="text-xs text-brand-gray-500">{buyer.citizenId}</p></div></div><button onClick={() => handleSelectBuyer(buyer)} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm hover:bg-brand-gray-100">Select</button></li>))}</ul>
                        </div>
                    )}
                    {!isSearching && submittedQuery && searchResults.length === 0 && (<div className="mt-4 text-center p-4 bg-brand-gray-50 rounded-lg"><p className="text-sm text-brand-gray-600">No users found for "{submittedQuery}".</p></div>)}
                </div>
            )}
        </Card>
        <Card>
            <h2 className="text-lg font-semibold flex items-center"><Info className="w-5 h-5 mr-2 text-brand-blue-700"/> Transfer Information</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Provide information about the transfer.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-brand-gray-700">Transfer Type</label>
                    <select value={transferType} onChange={(e) => setTransferType(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none">
                        <option>Sale</option>
                        <option>Gift</option>
                        <option>Inheritance</option>
                    </select>
                </div>
                {transferType === 'Sale' && <InputField label="Date of Sale" placeholder="YYYY-MM-DD" value={dateOfSale} onChange={e => setDateOfSale(e.target.value)} />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {transferType === 'Sale' && <InputField label="Sale Price ($)" placeholder="e.g., 15000" value={salePrice} onChange={e => setSalePrice(e.target.value)} />}
                <InputField label="Odometer Reading at Transfer" placeholder="e.g., 50123" value={odometer} onChange={e => setOdometer(e.target.value)} />
            </div>
        </Card>
        <Card>
            <h2 className="text-lg font-semibold flex items-center"><FileText className="w-5 h-5 mr-2 text-brand-blue-700"/> Transfer Supporting Documents</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Upload the required legal documents in PDF format.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdvancedUploadField label="Seller Proof of Ownership (Notary)"/>
                <AdvancedUploadField label="Transfer Agreement Document"/>
            </div>
            <hr className="my-6 border-t" />
            <div>
                <h3 className="text-md font-semibold mb-2">Transfer Witnesses</h3>
                <p className="text-sm text-brand-gray-500 mb-4">Provide details for at least three witnesses.</p>
                <div className="space-y-4">
                    {witnesses.map((witness, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 border-l-2 border-brand-gray-200">
                            <InputField label={`Witness ${index + 1} Full Name`} placeholder="Enter full name" value={witness.name} onChange={(e) => handleWitnessChange(index, 'name', e.target.value)} />
                            <InputField label={`Witness ${index + 1} Phone Number`} placeholder="Enter phone number" value={witness.phone} onChange={(e) => handleWitnessChange(index, 'phone', e.target.value)} />
                        </div>
                    ))}
                </div>
                <button onClick={addWitness} className="mt-4 text-sm font-medium text-brand-blue-700 hover:underline flex items-center">
                    <PlusCircle className="w-4 h-4 mr-1" /> Add Another Witness
                </button>
            </div>
        </Card>
      </>
    );

    const step2Content = (
        <Card>
            <h2 className="text-lg font-semibold flex items-center"><FileCheck2 className="w-5 h-5 mr-2 text-brand-blue-700"/> Generate & Sign Acknowledgement</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Download the legal document, have both parties sign it, and upload the final copy.</p>
            <div className="p-6 bg-brand-gray-50 rounded-lg border border-brand-gray-200">
                <h3 className="font-semibold">1. Download Your Document</h3>
                <p className="text-sm text-brand-gray-600 my-2">A "Transfer Acknowledgement" document has been generated. Download the PDF, print it, and have it signed by both the seller (you) and the buyer.</p>
                <button onClick={() => generatePdf('acknowledgement')} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 flex items-center">
                    <Download className="w-4 h-4 mr-2"/> Download Acknowledgement (PDF)
                </button>
            </div>
            <div className="p-6 bg-brand-gray-50 rounded-lg border border-brand-gray-200 mt-4">
                <h3 className="font-semibold">2. Upload Signed Document</h3>
                <p className="text-sm text-brand-gray-600 my-2">Once signed, please scan or take a clear photo of the entire document and upload the PDF here.</p>
                <AdvancedUploadField label="Upload Signed Acknowledgement"/>
            </div>
        </Card>
    );
    
    const step3Content = (
      <Card>
        <h2 className="text-lg font-semibold">Payment</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Complete the payment to finalize your application.</p>
        
        <h3 className="font-semibold mb-2 text-md">1. Select Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(paymentMethods).map(([key, { name, logo }]) => (
                <button 
                    key={key} 
                    onClick={() => setPaymentMethod(key)}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === key ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-brand-gray-200 hover:border-brand-blue-400'}`}
                >
                    <img src={logo} alt={name} className="h-10"/>
                    <p className="text-sm font-semibold">{name}</p>
                </button>
            ))}
        </div>

        {paymentMethod && (
            <div className="mt-6">
                <h3 className="font-semibold text-md mb-2">2. Enter Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg bg-white">
                        <div className="space-y-4">
                            <InputField 
                                label="Mobile Number for Payment" 
                                placeholder="e.g., 61XXXXXXX"
                                value={paymentMobileNumber}
                                onChange={(e) => setPaymentMobileNumber(e.target.value)}
                            />
                            <InputField label="Description" value={`Application ID: ${applicationID}`} disabled={true} />
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-brand-gray-50 border">
                        <h4 className="font-semibold text-sm mb-2">Manual Payment Instructions</h4>
                        <p className="text-xs text-brand-gray-600 mb-3">To complete payment, dial the following code from the mobile number you entered.</p>
                        <div className="flex items-center space-x-2">
                           <img src={paymentMethods[paymentMethod].logo} alt={paymentMethods[paymentMethod].name} className="h-6"/>
                           <p className="font-mono text-lg font-bold text-brand-gray-800 bg-white px-3 py-1 rounded-md border">{paymentMethods[paymentMethod].shortcode}</p>
                        </div>
                         <p className="text-xs text-brand-gray-500 mt-2">The total amount is <span className="font-bold">$50.00</span>.</p>
                    </div>
                </div>
            </div>
        )}

        <hr className="my-6"/>
        <div className="p-4 bg-brand-gray-50 rounded-lg">
             <div className="space-y-2 text-sm">
                <div className="flex justify-between font-bold pt-2 mt-2"><span >Total Payable</span><span>$50.00</span></div>
            </div>
        </div>
      </Card>
    );

    const StatusItem: React.FC<{status: Status, text: string}> = ({ status, text }) => {
        const statusConfig = {
            'in-progress': { icon: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />, textClass: 'text-blue-600', label: 'In Progress' },
            'completed': { icon: <CheckCircle className="w-5 h-5 text-green-500" />, textClass: 'text-green-600', label: 'Completed' },
            'pending': { icon: <Hourglass className="w-5 h-5 text-brand-gray-400" />, textClass: 'text-brand-gray-500', label: 'Pending' }
        };
        const current = statusConfig[status];
        return (
            <div className="flex items-center space-x-3 p-3 bg-brand-gray-50 rounded-lg">
                <div className="flex-shrink-0">{current.icon}</div>
                <p className="flex-grow font-semibold text-brand-gray-700">{text}</p>
                <p className={`text-sm font-bold ${current.textClass}`}>{current.label}</p>
            </div>
        )
    }

    const step4Content = (
        <Card className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4">Application Submitted</h2>
            <p className="text-brand-gray-600 mt-2">Your application is pending for payment verification. Once the payment is verified, your application will be reviewed and approved.</p>
            
            <div className="mt-8 text-left max-w-md mx-auto space-y-4">
                <StatusItem status={paymentStatus} text="Payment Verification" />
                <StatusItem status={reviewStatus} text="Application Review" />
                <StatusItem status={approvalStatus} text="Application Approved" />
            </div>

            {approvalStatus === 'completed' && (
                <div className="mt-8 p-4 bg-green-50 text-green-800 rounded-lg">
                    <h3 className="font-semibold">Approval Complete!</h3>
                    <p className="text-sm">You will receive an official confirmation via your preferred contact method shortly.</p>
                </div>
            )}

            <button 
                onClick={() => setView('list')}
                disabled={approvalStatus !== 'completed'}
                className="mt-8 bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-300 disabled:cursor-not-allowed"
            >
                Return to Applications
            </button>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Vehicle Ownership Transfer</h1>
                    <p className="text-brand-gray-600">Step {step} of 4</p>
                </div>
                {step < 4 && <button onClick={() => setView('list')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                    <X className="w-4 h-4 mr-2"/> Cancel
                </button>}
            </div>
            
            <div className="space-y-6">
                {step === 1 && step1Content}
                {step === 2 && step2Content}
                {step === 3 && step3Content}
                {step === 4 && step4Content}
            </div>
             
            {step < 4 && <div className="flex justify-between items-center">
                <button 
                    onClick={() => setStep(s => s - 1)} 
                    className={`bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center ${step === 1 ? 'invisible' : 'visible'}`}
                >
                    <ArrowLeft className="w-4 h-4 mr-2"/>Back
                </button>
                <div className="flex space-x-2">
                    {step < 3 && <button onClick={() => generatePdf('invoice')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-50">Save as Draft & Get Invoice</button>}
                    {step < 3 && <button onClick={() => setStep(s => s + 1)} className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-400" disabled={step === 1 && !selectedBuyer}>
                        Continue
                    </button>}
                    {step === 3 && <button onClick={handleSubmitAndPay} className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                        Submit & Pay $50.00
                    </button>}
                </div>
            </div>}
        </div>
    );
};

const VehicleRadioCard: React.FC<{id: string, make: string, selected: string, setSelected: (id: string) => void}> = ({ id, make, selected, setSelected }) => (
    <label className={`p-4 border rounded-lg cursor-pointer transition-all ${selected === id ? 'bg-brand-blue-50 border-brand-blue-500' : 'border-brand-gray-200 hover:border-brand-gray-300'}`}>
        <div className="flex items-center justify-between">
            <p className="font-semibold">{make}</p>
            <input
                type="radio"
                name="vehicleSelection"
                value={id}
                checked={selected === id}
                onChange={() => setSelected(id)}
                className="h-4 w-4 text-brand-blue-600 border-brand-gray-300 focus:ring-brand-blue-500"
            />
        </div>
        <p className="text-sm text-brand-gray-600 mt-1">{id}</p>
    </label>
);

export default VehicleOwnershipTransfer;