import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ApplicationView } from '../../pages/Applications';
import { ArrowLeft, Check, User, FileText, Upload, Info, ChevronRight, CheckCircle, Loader2, Hourglass, X } from 'lucide-react';

interface DrivingLicenseApplicationProps {
    setView: (view: ApplicationView) => void;
}

const DrivingLicenseApplication: React.FC<DrivingLicenseApplicationProps> = ({ setView }) => {
    // In a real app, this would be a more complex state management
    const [step, setStep] = useState(1);
    const [applicationType, setApplicationType] = useState('New');
    const [licenseClass, setLicenseClass] = useState('B');

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1 applicationType={applicationType} setApplicationType={setApplicationType} licenseClass={licenseClass} setLicenseClass={setLicenseClass} />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            case 4: return <Step4 />;
            default: return <Step1 applicationType={applicationType} setApplicationType={setApplicationType} licenseClass={licenseClass} setLicenseClass={setLicenseClass} />;
        }
    }
    
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Driving License Application</h1>
                    <p className="text-brand-gray-600">Step {step} of 4</p>
                </div>
                {step < 4 && <button onClick={() => setView('list')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                    <X className="w-4 h-4 mr-2"/> Cancel Application
                </button>}
            </div>

            {renderStep()}

            {step < 4 ? (
                <div className="flex justify-between items-center pt-4 border-t">
                    <button onClick={prevStep} disabled={step === 1} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center disabled:opacity-50">
                        <ArrowLeft className="w-4 h-4 mr-2"/> Back
                    </button>
                    <button onClick={nextStep} className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                        {step === 3 ? 'Proceed to Payment' : 'Continue'}
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

const Step1 = ({ applicationType, setApplicationType, licenseClass, setLicenseClass }) => (
    <Card>
        <h2 className="text-lg font-semibold">1. Application Details</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Select the type of application and license class.</p>
        <div className="space-y-4">
             <div>
                <label className="text-sm font-medium text-brand-gray-700">Application Type</label>
                <select value={applicationType} onChange={e => setApplicationType(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 outline-none">
                    <option>New</option>
                    <option>Renewal</option>
                    <option>Upgrade</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-medium text-brand-gray-700">License Class</label>
                 <select value={licenseClass} onChange={e => setLicenseClass(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 outline-none">
                    <option value="A">Class A - Motorcycle</option>
                    <option value="B">Class B - Passenger Car</option>
                    <option value="C">Class C - Light Truck</option>
                    <option value="D">Class D - Bus</option>
                    <option value="E">Class E - Heavy Truck</option>
                </select>
            </div>
            <div className="p-4 bg-brand-gray-50 rounded-lg border">
                <h3 className="font-semibold text-sm">Personal Information</h3>
                <p className="text-xs text-brand-gray-500 mb-2">Pre-filled from your profile. Please ensure it's correct.</p>
                <div className="text-sm space-y-1">
                    <p><strong>Name:</strong> Alex Johnson</p>
                    <p><strong>Citizen ID:</strong> 9823-44</p>
                    <p><strong>Address:</strong> 742 Evergreen Terrace, Springfield</p>
                </div>
            </div>
        </div>
    </Card>
);

const Step2 = () => (
    <Card>
        <h2 className="text-lg font-semibold">2. Document Upload</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Upload required documents. Max 5MB per file.</p>
        <div className="space-y-4">
            <UploadField label="Medical Fitness Certificate" required/>
            <UploadField label="Vision Test Results" required/>
            <UploadField label="Recent Passport-size Photo" required/>
        </div>
    </Card>
);

const UploadField = ({label, required}) => (
    <div>
        <label className="text-sm font-medium text-brand-gray-700 block mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="flex flex-col items-center justify-center w-full h-24 border-2 border-brand-gray-300 border-dashed rounded-lg cursor-pointer bg-brand-gray-50 hover:bg-brand-gray-100">
            <Upload className="w-8 h-8 text-brand-gray-500"/>
            <p className="text-xs text-brand-gray-500 mt-1">Click to upload or drag & drop</p>
        </div>
    </div>
);


const Step3 = () => (
    <Card>
        <h2 className="text-lg font-semibold">3. Payment Summary</h2>
        <p className="text-sm text-brand-gray-500 mb-4">Review the fees and proceed to payment.</p>
        <div className="p-4 bg-brand-gray-50 rounded-lg border">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray-600">Application Fee</span><span>$50.00</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Knowledge Test Fee</span><span>$20.00</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-600">Road Test Fee</span><span>$30.00</span></div>
                <div className="flex justify-between font-bold pt-2 border-t mt-2"><span >Total Payable</span><span>$100.00</span></div>
            </div>
        </div>
         <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Payment Method</h3>
            <p className="text-sm text-brand-gray-500 mb-2">You will be redirected to the payments page to complete this transaction.</p>
            <label className="flex items-start">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-2 mt-1"/>
                <span className="text-sm">I acknowledge that all fees are non-refundable.</span>
            </label>
        </div>
    </Card>
);


const Step4 = () => (
    <Card className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Application Submitted Successfully</h2>
        <p className="text-brand-gray-600 mt-2 max-w-md mx-auto">Your application is now under review. You will receive notifications about scheduling your tests and next steps.</p>
        <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg border max-w-sm mx-auto">
            <p className="font-semibold">Reference ID: <span className="font-mono bg-white px-2 py-1 rounded">DL-APP-77812</span></p>
            <p className="text-sm text-brand-gray-600 mt-2">Keep this ID for your records.</p>
        </div>
    </Card>
);

export default DrivingLicenseApplication;
