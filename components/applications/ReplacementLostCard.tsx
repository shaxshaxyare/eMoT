import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ApplicationView } from '../../pages/Applications';
import { ArrowLeft, CheckCircle, X, Upload, ShieldCheck } from 'lucide-react';

interface ReplacementLostCardProps {
    setView: (view: ApplicationView) => void;
}

const ReplacementLostCard: React.FC<ReplacementLostCardProps> = ({ setView }) => {
    const [step, setStep] = useState(1);
    const [reason, setReason] = useState('Lost');
    const fee = 25.00;

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

     const renderStep = () => {
        switch(step) {
            case 1: return <Step1 reason={reason} setReason={setReason} />;
            case 2: return <Step2 fee={fee} />;
            case 3: return <Step3 />;
            default: return <Step1 reason={reason} setReason={setReason} />;
        }
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Replacement License Card</h1>
                    <p className="text-brand-gray-600">Step {step} of 3</p>
                </div>
                 {step < 3 && <button onClick={() => setView('list')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                    <X className="w-4 h-4 mr-2"/> Cancel
                </button>}
            </div>

            {renderStep()}

            {step < 3 ? (
                 <div className="flex justify-between items-center pt-4 border-t">
                    <button onClick={prevStep} disabled={step === 1} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center disabled:opacity-50">
                        <ArrowLeft className="w-4 h-4 mr-2"/> Back
                    </button>
                    <button onClick={nextStep} className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                        {step === 2 ? `Pay $${fee.toFixed(2)}` : 'Continue'}
                    </button>
                </div>
            ) : (
                <div className="flex justify-end items-center pt-4 border-t">
                     <button onClick={() => setView('list')} className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                        Back to Applications
                    </button>
                </div>
            )}
        </div>
    );
};


const Step1 = ({ reason, setReason }) => (
    <Card>
        <h2 className="text-lg font-semibold">1. Reason for Replacement</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Please select the reason you need a new license card.</p>
        <div className="space-y-4">
             <div>
                <label className="text-sm font-medium text-brand-gray-700">Reason</label>
                <select value={reason} onChange={e => setReason(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 outline-none">
                    <option>Lost</option>
                    <option>Stolen</option>
                    <option>Damaged</option>
                    <option>Never Received</option>
                </select>
            </div>

            {reason === 'Stolen' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="font-semibold text-sm text-amber-900">Police Report Required</h3>
                    <p className="text-xs text-amber-800 my-2">For stolen cards, you must upload a copy of the police report. This is a legal requirement.</p>
                    <div className="flex flex-col items-center justify-center w-full h-24 border-2 border-brand-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-brand-gray-50">
                        <Upload className="w-8 h-8 text-brand-gray-500"/>
                        <p className="text-xs text-brand-gray-500 mt-1">Upload Police Report (PDF, JPG, PNG)</p>
                    </div>
                </div>
            )}
            
            <label className="flex items-start pt-4 border-t">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-3 mt-1"/>
                <span className="text-sm">I declare under penalty of perjury that the information provided is true and correct, and that my previous card is no longer in my possession (unless damaged).</span>
            </label>
        </div>
    </Card>
);


const Step2 = ({fee}) => (
    <Card>
        <h2 className="text-lg font-semibold">2. Confirm and Pay</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Review the details and fee for your replacement card.</p>
         <div className="p-4 bg-brand-gray-50 rounded-lg border">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray-600">Applicant</span><span className="font-medium">Alex Johnson (DL-092344-A)</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Reason</span><span className="font-medium">Lost</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Service Fee</span><span>$5.00</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span >Total Amount</span><span>${fee.toFixed(2)}</span></div>
            </div>
        </div>
        <div className="mt-4 flex items-center p-3 bg-brand-blue-50 text-brand-blue-800 rounded-lg">
            <ShieldCheck className="w-5 h-5 mr-2 shrink-0" />
            <p className="text-sm">Your new card will be mailed to your registered address within 7-10 business days. Your old card will be invalidated immediately.</p>
        </div>
    </Card>
);

const Step3 = () => (
     <Card className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Replacement Request Submitted</h2>
        <p className="text-brand-gray-600 mt-2 max-w-md mx-auto">Your request has been successfully processed. Please allow 7-10 business days for your new card to arrive.</p>
        <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg border max-w-sm mx-auto">
            <p className="font-semibold">Confirmation ID: <span className="font-mono bg-white px-2 py-1 rounded">RPLC-LC-53199</span></p>
        </div>
    </Card>
);

export default ReplacementLostCard;
