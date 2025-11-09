import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ApplicationView } from '../../pages/Applications';
import { ArrowLeft, CheckCircle, X, Car } from 'lucide-react';

interface ReplacementVehicleCertificateProps {
    setView: (view: ApplicationView) => void;
}

const ReplacementVehicleCertificate: React.FC<ReplacementVehicleCertificateProps> = ({ setView }) => {
    const [step, setStep] = useState(1);
    const [selectedVehicle, setSelectedVehicle] = useState('ABC-4821');
    const fee = 15.00;

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1 selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />;
            case 2: return <Step2 fee={fee} />;
            case 3: return <Step3 />;
            default: return <Step1 selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />;
        }
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Replacement Vehicle Certificate</h1>
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

const Step1 = ({ selectedVehicle, setSelectedVehicle }) => {
    const vehicles = [
        { make: 'Toyota Camry', plate: 'ABC-4821' },
        { make: 'Ford F-150', plate: 'TRK-9023' },
        { make: 'Honda Odyssey', plate: 'VAN-3312'},
    ];

    return (
        <Card>
            <h2 className="text-lg font-semibold">1. Select Vehicle</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Choose the vehicle for which you need a replacement certificate.</p>
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
            <label className="flex items-start pt-4 mt-4 border-t">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-3 mt-1"/>
                <span className="text-sm">I declare that the original certificate for the selected vehicle is lost, stolen, or destroyed.</span>
            </label>
        </Card>
    );
};

const Step2 = ({fee}) => (
    <Card>
        <h2 className="text-lg font-semibold">2. Confirm and Pay</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Review the details and fee for your replacement certificate.</p>
         <div className="p-4 bg-brand-gray-50 rounded-lg border">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray-600">Vehicle</span><span className="font-medium">Toyota Camry (ABC-4821)</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Document</span><span className="font-medium">Vehicle Registration Certificate</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span >Total Fee</span><span>${fee.toFixed(2)}</span></div>
            </div>
        </div>
    </Card>
);

const Step3 = () => (
     <Card className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Request Submitted</h2>
        <p className="text-brand-gray-600 mt-2 max-w-md mx-auto">Your request for a replacement certificate has been processed. You can download the digital copy from your portal documents section.</p>
        <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg border max-w-sm mx-auto">
            <p className="font-semibold">Confirmation ID: <span className="font-mono bg-white px-2 py-1 rounded">RPLC-VC-82114</span></p>
        </div>
    </Card>
);


export default ReplacementVehicleCertificate;
