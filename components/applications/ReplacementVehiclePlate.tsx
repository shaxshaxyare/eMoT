import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ApplicationView } from '../../pages/Applications';
import { ArrowLeft, CheckCircle, X, Car, Upload } from 'lucide-react';

interface ReplacementVehiclePlateProps {
    setView: (view: ApplicationView) => void;
}

const ReplacementVehiclePlate: React.FC<ReplacementVehiclePlateProps> = ({ setView }) => {
    const [step, setStep] = useState(1);
    const [selectedVehicle, setSelectedVehicle] = useState('ABC-4821');
    const [reason, setReason] = useState('Damaged');
    const fee = 40.00;

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1 selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} reason={reason} setReason={setReason} />;
            case 2: return <Step2 fee={fee} />;
            case 3: return <Step3 />;
            default: return <Step1 selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} reason={reason} setReason={setReason} />;
        }
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Replacement Vehicle Plate</h1>
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

const Step1 = ({ selectedVehicle, setSelectedVehicle, reason, setReason }) => {
    const vehicles = [
        { make: 'Toyota Camry', plate: 'ABC-4821' },
        { make: 'Ford F-150', plate: 'TRK-9023' },
        { make: 'Honda Odyssey', plate: 'VAN-3312'},
    ];
    return (
        <Card>
            <h2 className="text-lg font-semibold">1. Select Vehicle & Reason</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Choose the vehicle and provide the reason for plate replacement.</p>
            <div className="space-y-3">
                {vehicles.map(v => (
                    <label key={v.plate} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedVehicle === v.plate ? 'bg-brand-blue-50 border-brand-blue-500' : 'border-brand-gray-200 hover:border-brand-gray-300'}`}>
                        <input
                            type="radio"
                            name="vehicle"
                            value={v.plate}
                            checked={selectedVehicle === v.plate}
                            onChange={() => setSelectedVehicle(v.plate)}
                            className="h-4 w-4 text-brand-blue-600 border-brand-gray-300 focus:ring-brand-blue-500"
                        />
                        <Car className="w-6 h-6 text-brand-gray-600 mx-4" />
                        <div className="flex-grow">
                            <p className="font-semibold">{v.make}</p>
                            <p className="text-sm text-brand-gray-600">{v.plate}</p>
                        </div>
                    </label>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t">
                <label className="text-sm font-medium text-brand-gray-700">Reason for Replacement</label>
                <select value={reason} onChange={e => setReason(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 outline-none">
                    <option>Damaged</option>
                    <option>Lost</option>
                    <option>Stolen</option>
                </select>
            </div>
             {reason === 'Stolen' && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="font-semibold text-sm text-amber-900">Police Report Required</h3>
                    <div className="mt-2 flex flex-col items-center justify-center w-full h-24 border-2 border-brand-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-brand-gray-50">
                        <Upload className="w-8 h-8 text-brand-gray-500"/>
                        <p className="text-xs text-brand-gray-500 mt-1">Upload Police Report</p>
                    </div>
                </div>
            )}
        </Card>
    );
};

const Step2 = ({fee}) => (
    <Card>
        <h2 className="text-lg font-semibold">2. Confirm and Pay</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Review the details and fee for your replacement plates.</p>
         <div className="p-4 bg-brand-gray-50 rounded-lg border">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray-600">Vehicle</span><span className="font-medium">Toyota Camry (ABC-4821)</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Reason</span><span className="font-medium">Damaged</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Plates to issue</span><span className="font-medium">1 Pair (Front & Rear)</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span >Total Fee</span><span>${fee.toFixed(2)}</span></div>
            </div>
        </div>
        <p className="text-sm text-brand-gray-500 mt-4">You will be notified when your new plates are ready for pickup at your selected service center.</p>
    </Card>
);

const Step3 = () => (
     <Card className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Request Submitted</h2>
        <p className="text-brand-gray-600 mt-2 max-w-md mx-auto">Your request for replacement plates has been processed. You will receive an SMS and email when they are ready for pickup.</p>
        <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg border max-w-sm mx-auto">
            <p className="font-semibold">Confirmation ID: <span className="font-mono bg-white px-2 py-1 rounded">RPLC-VP-41120</span></p>
        </div>
    </Card>
);


export default ReplacementVehiclePlate;
