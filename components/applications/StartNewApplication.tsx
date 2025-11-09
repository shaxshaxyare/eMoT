import React, { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { X, User, FileText, Car, CreditCard, Check, Shield, File, ListChecks } from 'lucide-react';
import { ApplicationView } from '../../pages/Applications';

interface StartNewApplicationProps {
    setView: (view: ApplicationView) => void;
}

const applicationTypes = [
    { id: 'vehicle-registration', title: 'Vehicle Registration', description: 'Register a new vehicle or import one.', time: '8-10 min' },
    { id: 'ownership-transfer', title: 'Vehicle Ownership Transfer', description: 'Transfer ownership of a registered vehicle.', time: '10-15 min' },
    { id: 'driving-license', title: 'Driving License', description: 'Apply for a new driving license or renew an existing one.', time: '12-15 min' },
    { id: 'road-tax', title: 'Road Tax (Tremistrale)', description: 'Pay your annual road tax for your vehicle.', time: '3-5 min' },
    { id: 'vehicle-inspection', title: 'Vehicle Inspection', description: 'Schedule and manage vehicle inspection appointments.', time: '5-8 min' },
    { id: 'lost-card', title: 'Replacement / Lost Card', description: 'Request a replacement for a lost, stolen, or damaged license card.', time: '5-7 min' },
    { id: 'replacement-cert', title: 'Replacement / Vehicle Registration Certificate', description: 'Get a new copy of your vehicle registration certificate.', time: '5-7 min' },
    { id: 'replacement-plate', title: 'Replacement / Vehicle Plate', description: 'Request a new set of vehicle plates.', time: '7-10 min' },
];

interface ApplicationRequirement {
    title: string;
    time: string;
    needs: Array<{ item: string; status: 'Ready' | 'Required' | 'May be required' | 'No dues'; icon: React.ElementType }>;
}

const applicationRequirements: Record<string, ApplicationRequirement> = {
    'vehicle-registration': {
        title: "Vehicle Registration",
        time: "8-10 min",
        needs: [
            { item: 'Government ID', status: 'Ready', icon: User },
            { item: 'Proof of Ownership', status: 'Required', icon: File },
            { item: 'Customs Clearance', status: 'Required', icon: ListChecks },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'ownership-transfer': {
        title: "Vehicle Ownership Transfer",
        time: "10-15 min",
        needs: [
            { item: 'Government ID (Buyer & Seller)', status: 'Ready', icon: User },
            { item: 'Signed Transfer Form', status: 'Required', icon: FileText },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'driving-license': {
        title: "Driving License Application",
        time: "12-15 min",
        needs: [
            { item: 'Government ID', status: 'Ready', icon: User },
            { item: 'Medical certificate', status: 'May be required', icon: FileText },
            { item: 'Recent Photo', status: 'Required', icon: File },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'road-tax': {
        title: "Road Tax (Tremistrale)",
        time: "3-5 min",
        needs: [
            { item: 'Vehicle Plate Number', status: 'Ready', icon: Car },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'vehicle-inspection': {
        title: "Vehicle Inspection",
        time: "5-8 min",
        needs: [
            { item: 'Vehicle Plate Number', status: 'Ready', icon: Car },
            { item: 'Current Registration', status: 'Ready', icon: FileText },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'lost-card': {
        title: "Replacement / Lost License Card",
        time: "5-7 min",
        needs: [
            { item: 'Government ID', status: 'Ready', icon: User },
            { item: 'Police Report (if stolen)', status: 'May be required', icon: Shield },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'replacement-cert': {
        title: "Replacement / Vehicle Certificate",
        time: "5-7 min",
        needs: [
            { item: 'Government ID', status: 'Ready', icon: User },
            { item: 'Vehicle Plate Number', status: 'Ready', icon: Car },
            { item: 'Payment method', status: 'No dues', icon: CreditCard },
        ]
    },
    'replacement-plate': {
        title: "Replacement / Vehicle Plate",
        time: "7-10 min",
        needs: [
            { item: 'Government ID', status: 'Ready', icon: User },
            { item: 'Police Report (if stolen)', status: 'May be required', icon: Shield },
            { item: 'Damaged Plates (if applicable)', status: 'Required', icon: Car },
        ]
    },
};


const StartNewApplication: React.FC<StartNewApplicationProps> = ({ setView }) => {
    const [selectedType, setSelectedType] = useState<string | null>('vehicle-registration');

    const handleContinue = () => {
        switch (selectedType) {
            case 'ownership-transfer':
                setView('transfer-form');
                break;
            case 'vehicle-registration':
                setView('vehicle-registration');
                break;
            case 'driving-license':
                setView('driving-license-form');
                break;
            case 'road-tax':
                setView('road-tax-form');
                break;
            case 'vehicle-inspection':
                setView('form');
                break;
            case 'lost-card':
                setView('replacement-lost-card-form');
                break;
            case 'replacement-cert':
                setView('replacement-vehicle-certificate-form');
                break;
            case 'replacement-plate':
                setView('replacement-vehicle-plate-form');
                break;
            default:
                setView('form');
        }
    };

    const currentRequirements = useMemo(() => {
        return selectedType ? applicationRequirements[selectedType] : null;
    }, [selectedType]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Start New Application</h1>
                    <p className="text-brand-gray-600">Step 1 of 3: Choose Application Type</p>
                </div>
                <button onClick={() => setView('list')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                    <X className="w-4 h-4 mr-2"/>
                    Cancel
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-lg font-semibold">Choose application type</h2>
                        <p className="text-sm text-brand-gray-500 mb-4">Select one to proceed</p>

                        <div className="space-y-3">
                            {applicationTypes.map((type) => (
                                <label key={type.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedType === type.id ? 'bg-brand-blue-50 border-brand-blue-500 ring-2 ring-brand-blue-200' : 'border-brand-gray-200 hover:border-brand-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="applicationType"
                                        value={type.id}
                                        checked={selectedType === type.id}
                                        onChange={() => setSelectedType(type.id)}
                                        className="h-4 w-4 text-brand-blue-600 border-brand-gray-300 focus:ring-brand-blue-500"
                                    />
                                    <div className="ml-4 flex-grow">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{type.title}</p>
                                            <p className="text-xs font-medium bg-brand-gray-100 text-brand-gray-600 px-2 py-0.5 rounded-full">{type.time}</p>
                                        </div>
                                        <p className="text-sm text-brand-gray-600 mt-1">{type.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <p className="text-sm text-brand-gray-600">You can save and resume later.</p>
                            <div className="flex items-center space-x-2">
                                <button className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-50">Save Draft</button>
                                <button onClick={handleContinue} disabled={!selectedType} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-300">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card className="sticky top-24">
                        <h2 className="text-lg font-semibold">{currentRequirements?.title || "Summary & requirements"}</h2>
                        <p className="text-sm text-brand-gray-500 mb-4">{currentRequirements?.time ? `Estimated ${currentRequirements.time}` : "Context from your profile"}</p>
                        
                        <div className="p-3 bg-brand-blue-50 rounded-lg">
                            <p className="font-semibold">Alex Johnson</p>
                            <p className="text-sm text-brand-gray-600">Citizen ID: 9823-44</p>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                             <div className="flex justify-between"><span className="text-brand-gray-500">Current license</span><span className="font-medium">Driver • DL-092344-A</span></div>
                             <div className="flex justify-between"><span className="text-brand-gray-500">Status</span><Badge variant="success">Valid • Expires 21 Dec 2025</Badge></div>
                             <div className="flex justify-between"><span className="text-brand-gray-500">Open applications</span><span className="font-medium">1 • Commercial upgrade</span></div>
                        </div>

                        <hr className="my-4"/>

                        <h3 className="font-semibold">What you'll need</h3>
                        
                        <ul className="space-y-3 mt-3">
                            {currentRequirements?.needs.map((req, index) => {
                                const badgeVariant = req.status === 'Ready' || req.status === 'No dues' ? 'success' : req.status === 'Required' ? 'danger' : 'warning';
                                const Icon = req.icon;
                                return (
                                    <li key={index} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center">
                                            <Icon className="w-4 h-4 text-brand-gray-500 mr-2" />
                                            <span>{req.item}</span>
                                        </div>
                                        <Badge variant={badgeVariant}>{req.status}</Badge>
                                    </li>
                                );
                            })}
                        </ul>

                         <div className="mt-6">
                            <a href="#" className="text-sm text-brand-blue-700 hover:underline">View application guidelines</a>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <button onClick={() => setView('list')} className="w-full bg-white border border-brand-gray-300 text-brand-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-50">Back</button>
                                <button onClick={handleContinue} disabled={!selectedType} className="w-full bg-brand-blue-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-300 flex items-center justify-center">
                                    <Check className="w-4 h-4 mr-1"/> Start
                                </button>
                            </div>
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StartNewApplication;