import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ApplicationView } from '../../pages/Applications';
import { ArrowLeft, CheckCircle, X, Car } from 'lucide-react';

interface RoadTaxPaymentProps {
    setView: (view: ApplicationView) => void;
}

const RoadTaxPayment: React.FC<RoadTaxPaymentProps> = ({ setView }) => {
    const [step, setStep] = useState(1);
    const [selectedVehicle, setSelectedVehicle] = useState('ABC-4821');
    const taxAmount = 75.00;

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1 selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} taxAmount={taxAmount} />;
            case 2: return <Step2 taxAmount={taxAmount}/>;
            case 3: return <Step3 />;
            default: return <Step1 selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} taxAmount={taxAmount} />;
        }
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Road Tax (Tremistrale) Payment</h1>
                    <p className="text-brand-gray-600">Step {step} of 3</p>
                </div>
                {step < 3 && <button onClick={() => setView('list')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                    <X className="w-4 h-4 mr-2"/> Cancel Payment
                </button>}
            </div>

            {renderStep()}

            {step < 3 ? (
                <div className="flex justify-between items-center pt-4 border-t">
                    <button onClick={prevStep} disabled={step === 1} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center disabled:opacity-50">
                        <ArrowLeft className="w-4 h-4 mr-2"/> Back
                    </button>
                    <button onClick={nextStep} className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                        {step === 2 ? `Pay $${taxAmount.toFixed(2)}` : 'Continue'}
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

const Step1 = ({ selectedVehicle, setSelectedVehicle, taxAmount }) => {
    const vehicles = [
        { make: 'Toyota Camry', plate: 'ABC-4821', status: 'Due' },
        { make: 'Ford F-150', plate: 'TRK-9023', status: 'Due' },
        { make: 'Honda Odyssey', plate: 'VAN-3312', status: 'Paid' },
    ];

    return (
        <Card>
            <h2 className="text-lg font-semibold">1. Select Vehicle</h2>
            <p className="text-sm text-brand-gray-500 mb-4">Choose the vehicle for which you want to pay the road tax.</p>
            <div className="space-y-3">
                {vehicles.map(v => (
                    <label key={v.plate} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedVehicle === v.plate ? 'bg-brand-blue-50 border-brand-blue-500' : 'border-brand-gray-200 hover:border-brand-gray-300'}`}>
                        <input
                            type="radio"
                            name="vehicle"
                            value={v.plate}
                            checked={selectedVehicle === v.plate}
                            onChange={() => setSelectedVehicle(v.plate)}
                            disabled={v.status === 'Paid'}
                            className="h-4 w-4 text-brand-blue-600 border-brand-gray-300 focus:ring-brand-blue-500 disabled:bg-brand-gray-200"
                        />
                        <Car className="w-6 h-6 text-brand-gray-600 mx-4" />
                        <div className="flex-grow">
                            <p className="font-semibold">{v.make}</p>
                            <p className="text-sm text-brand-gray-600">{v.plate}</p>
                        </div>
                        <Badge variant={v.status === 'Paid' ? 'success' : 'warning'}>{v.status}</Badge>
                    </label>
                ))}
            </div>
        </Card>
    );
};

const Step2 = ({taxAmount}) => (
     <Card>
        <h2 className="text-lg font-semibold">2. Confirm and Pay</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Review the details before making the payment.</p>
        <div className="p-4 bg-brand-gray-50 rounded-lg border">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray-600">Vehicle</span><span className="font-medium">Toyota Camry (ABC-4821)</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Tax Period</span><span className="font-medium">Jan 1, 2026 - Dec 31, 2026</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Base Tax</span><span>${(taxAmount - 5).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Service Fee</span><span>$5.00</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span >Total Amount</span><span>${taxAmount.toFixed(2)}</span></div>
            </div>
        </div>
         <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Payment Method</h3>
            <p className="text-sm text-brand-gray-500">Payment will be processed through the portal's secure gateway.</p>
        </div>
    </Card>
);

const Step3 = () => (
     <Card className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Payment Successful</h2>
        <p className="text-brand-gray-600 mt-2 max-w-md mx-auto">The road tax for your vehicle has been paid successfully. A receipt has been sent to your registered email.</p>
        <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg border max-w-sm mx-auto">
            <p className="font-semibold">Transaction ID: <span className="font-mono bg-white px-2 py-1 rounded">TAX-PMT-19445</span></p>
            <p className="text-sm text-brand-gray-600 mt-2">Vehicle: Toyota Camry (ABC-4821)</p>
        </div>
    </Card>
);


export default RoadTaxPayment;
