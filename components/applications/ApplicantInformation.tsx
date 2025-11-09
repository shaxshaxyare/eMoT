import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowLeft, HelpCircle, Save, CheckCircle2, AlertCircle } from 'lucide-react';

type ApplicationView = 'list' | 'start-new' | 'form';

interface ApplicantInformationProps {
    setView: (view: ApplicationView) => void;
}

const InputField: React.FC<{ label: string; value: string; disabled?: boolean }> = ({ label, value, disabled }) => (
    <div>
        <label className="text-sm font-medium text-brand-gray-700">{label}</label>
        <input type="text" defaultValue={value} disabled={disabled} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-brand-gray-50/50 focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none disabled:bg-brand-gray-100" />
    </div>
);

const ApplicantInformation: React.FC<ApplicantInformationProps> = ({ setView }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Applicant Information</h1>
                <button onClick={() => setView('start-new')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back
                </button>
            </div>
            
            {/* Stepper */}
            <div className="w-full">
                <ol className="flex items-center w-full text-sm font-medium text-center text-brand-gray-500">
                    <li className="flex md:w-full items-center text-brand-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-blue-100 after:border-4 after:inline-block">
                        <span className="flex items-center justify-center w-10 h-10 bg-brand-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                        </span>
                    </li>
                    <li className="flex md:w-full items-center text-brand-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-gray-200 after:border-4 after:inline-block">
                        <span className="flex items-center justify-center w-10 h-10 bg-brand-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0 ring-4 ring-brand-blue-500/30">
                           <span className="text-lg">2</span>
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="flex items-center justify-center w-10 h-10 bg-brand-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                           <span className="text-lg">3</span>
                        </span>
                    </li>
                </ol>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Personal details</h2>
                                <p className="text-sm text-brand-gray-500">Pre-filled from your profile. Update if needed.</p>
                            </div>
                            <p className="text-sm font-semibold text-brand-gray-500">Step 2 of 3</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Full name" value="Alex Johnson" disabled />
                            <InputField label="Date of birth" value="1980-05-14" disabled />
                            <InputField label="Citizen ID" value="# 9823-44" disabled />
                            <InputField label="Email" value="alex.johnson@email.gov" />
                            <InputField label="Mobile phone" value="+1 (555) 010-7788" />
                            <InputField label="Preferred contact" value="Email" />
                        </div>
                        <hr className="my-6" />
                        <h2 className="text-lg font-semibold mb-4">Addresses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <InputField label="Residential address" value="742 Evergreen Terrace, Springfield" />
                             <InputField label="Mailing address" value="Same as residential" />
                        </div>
                        <hr className="my-6" />
                         <h2 className="text-lg font-semibold">Eligibility & declarations</h2>
                         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-brand-gray-50 p-3 rounded-lg"><p className="text-sm">No outstanding fines</p><Badge variant="success">Confirmed</Badge></div>
                            <div className="bg-brand-gray-50 p-3 rounded-lg"><p className="text-sm">Medical conditions</p><Badge variant="default">None declared</Badge></div>
                         </div>
                         <button className="text-sm text-brand-blue-700 hover:underline mt-4 flex items-center"><HelpCircle className="w-4 h-4 mr-1"/> Why we ask this</button>
                    </Card>
                    <div className="flex justify-between items-center">
                         <button onClick={() => setView('start-new')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Back
                        </button>
                        <button className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                            Review & Continue
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="sticky top-24">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Application summary</h2>
                            <Badge variant="info">Auto-saved</Badge>
                        </div>
                        <p className="text-sm text-brand-gray-500 mb-4">Selected service and key info</p>
                        <div className="space-y-2 text-sm">
                             <div className="flex justify-between"><span className="text-brand-gray-500">Service</span><span className="font-medium">License Renewal</span></div>
                             <div className="flex justify-between"><span className="text-brand-gray-500">License #</span><span className="font-medium">JNSN-5521-88</span></div>
                             <div className="flex justify-between"><span className="text-brand-gray-500">Status</span><Badge variant="success">Active</Badge></div>
                             <div className="flex justify-between"><span className="text-brand-gray-500">Expiration</span><span className="font-medium">May 14, 2027</span></div>
                             <div className="flex justify-between"><span className="text-brand-gray-500">Eligibility</span><Badge variant="info">Renewal eligible in 180 days</Badge></div>
                        </div>
                        <div className="mt-4 bg-amber-100 text-amber-800 p-3 rounded-lg text-sm flex items-start">
                            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                            Ensure your contact details are accurate to receive updates.
                        </div>
                         <button className="mt-4 w-full bg-white border border-brand-gray-300 text-brand-gray-700 text-sm py-2 rounded-lg hover:bg-brand-gray-50 flex items-center justify-center">
                            <Save className="w-4 h-4 mr-2" /> Save draft (PDF)
                        </button>
                    </Card>
                </div>
            </div>
            
            <Card>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Required documents</h2>
                        <p className="text-sm text-brand-gray-500">Upload on the next step</p>
                    </div>
                    <button className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100">
                        View Checklist
                    </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex justify-between items-center bg-brand-gray-50 p-3 rounded-lg"><p className="font-medium text-sm">Proof of identity</p><Badge variant="danger">Required</Badge></div>
                    <div className="flex justify-between items-center bg-brand-gray-50 p-3 rounded-lg"><p className="font-medium text-sm">Proof of address</p><Badge variant="danger">Required</Badge></div>
                    <div className="flex justify-between items-center bg-brand-gray-50 p-3 rounded-lg"><p className="font-medium text-sm">Recent photo</p><Badge variant="warning">If updating</Badge></div>
                    <div className="flex justify-between items-center bg-brand-gray-50 p-3 rounded-lg"><p className="font-medium text-sm">Medical form</p><Badge variant="info">If applicable</Badge></div>
                </div>
            </Card>
        </div>
    );
};

export default ApplicantInformation;
