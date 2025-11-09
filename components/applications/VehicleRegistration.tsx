import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { ApplicationView } from '../../pages/Applications';
import { ArrowLeft, Check, User, Car, FileText, Upload, Info, ChevronRight, CheckCircle, Loader2, Hourglass, File, X, Edit2, Search, PlusCircle } from 'lucide-react';
import { jsPDF } from "jspdf";

interface VehicleRegistrationProps {
    setView: (view: ApplicationView) => void;
}

type Status = 'pending' | 'in-progress' | 'completed';

const steps = [
    { id: 1, name: 'Owner & Contact' },
    { id: 2, name: 'Vehicle Details' },
    { id: 3, name: 'Registration & Insurance' },
    { id: 4, name: 'Attachments' },
    { id: 5, 'name': 'Payment & Submission' },
];

const mockSellers = [
    { id: 'sel_123', name: 'Axmed Cumar', citizenId: 'AC-9876-54', email: 'axmed.c@example.com', phone: '+252 61 555 1111', address: '123 Wadada Maka Al Mukarama, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=sel_123' },
    { id: 'sel_456', name: 'Farhiya Jaamac', citizenId: 'FJ-5432-10', email: 'farhiya.j@example.com', phone: '+252 61 555 2222', address: '456 Jidka Warshadaha, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=sel_456' },
    { id: 'sel_789', name: 'Cabdi Ismaaciil', citizenId: 'CI-1122-33', email: 'cabdi.i@example.com', phone: '+252 61 555 3333', address: '789 Laamiga Taleex, Muqdisho', avatarUrl: 'https://i.pravatar.cc/150?u=sel_789' },
];
type Seller = typeof mockSellers[0] | null;


const InputField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, error?: string, type?: string, pattern?: string, title?: string, helpText?: string, placeholder?: string, disabled?: boolean }> =
({ label, name, value, onChange, required, error, type = "text", pattern, title, helpText, placeholder, disabled }) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-brand-gray-700 flex items-center">{label} {required && <span className="text-red-500 ml-1">*</span>}
        {helpText && <Info size={14} className="ml-1 text-gray-400" title={helpText}/>}
        </label>
        <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} pattern={pattern} title={title} placeholder={placeholder} disabled={disabled}
            className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue-500 ${error ? 'border-red-500' : 'border-brand-gray-300'} ${disabled ? 'bg-brand-gray-100' : 'bg-white'}`} />
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
);


const SelectField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, required?: boolean, children: React.ReactNode, error?: string, disabled?: boolean }> = 
({ label, name, value, onChange, required, children, error, disabled }) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-brand-gray-700">{label} {required && <span className="text-red-500 ml-1">*</span>}</label>
        <select id={name} name={name} value={value} onChange={onChange} required={required} disabled={disabled}
            className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-brand-blue-500 ${error ? 'border-red-500' : 'border-brand-gray-300'} ${disabled ? 'bg-brand-gray-100 cursor-not-allowed' : ''}`}>
            {children}
        </select>
         {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
);

const AdvancedUploadField: React.FC<{ label: string, helpText?: string, required?: boolean }> = ({ label, helpText, required }) => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(selectedFile.type)) {
                setError('Only PDF, JPG, or PNG files are allowed.');
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
            <label className="text-sm font-medium text-brand-gray-700 block mb-1">{label} {required && <span className="text-red-500 ml-1">*</span>}</label>
            {!file ? (
                <>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-brand-gray-300 border-dashed rounded-lg cursor-pointer bg-brand-gray-50 hover:bg-brand-gray-100">
                    <div className="flex flex-col items-center justify-center">
                        <Upload className="w-8 h-8 text-brand-gray-500"/>
                        <p className="text-xs text-brand-gray-500 mt-1"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                         <p className="text-xs text-brand-gray-400">{helpText || 'PDF, PNG, JPG up to 5MB'}</p>
                    </div>
                    <input type="file" className="hidden" accept="application/pdf,image/png,image/jpeg" onChange={handleFileChange} />
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


const StatusItem: React.FC<{ status: Status, text: string }> = ({ status, text }) => {
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
};

const StatusFeedbackScreen: React.FC<{ paymentStatus: Status, reviewStatus: Status, approvalStatus: Status, setView: (view: ApplicationView) => void }> = 
({ paymentStatus, reviewStatus, approvalStatus, setView }) => (
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
            onClick={() => setView('applications')}
            disabled={approvalStatus !== 'completed'}
            className="mt-8 bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-300 disabled:cursor-not-allowed"
        >
            Return to Applications
        </button>
    </Card>
);


const VehicleRegistration: React.FC<VehicleRegistrationProps> = ({ setView }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        fullName: 'Alex Johnson',
        nationalId: '9823-44',
        tin: '',
        dob: '1980-05-14',
        phone: '+252 61 555 1234',
        email: 'alex.johnson@email.gov',
        addressRegion: 'Banadir',
        addressDistrict: 'Hamar Weyne',
        addressStreet: '742 Evergreen Terrace',
        authRepName: 'Alex Johnson',
        // Step 2
        vehicleType: '',
        usageCategory: 'Private',
        make: '',
        model: '',
        modelYear: '',
        vin: '',
        engineNumber: '',
        fuelType: '',
        color: '',
        // Step 3
        registrationType: 'New',
        plateClass: 'Standard',
        issuingOffice: '',
        insuranceProvider: '',
        policyNumber: '',
        policyValidFrom: '',
        policyValidTo: '',
        // Step 5
        declaration1: false,
        declaration2: false,
    });
    const [errors, setErrors] = useState({
        vin: '',
    });
    
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentMobileNumber, setPaymentMobileNumber] = useState('');
    const applicationID = `REG-${Date.now().toString().slice(-6)}`;
    const [paymentStatus, setPaymentStatus] = useState<Status>('pending');
    const [reviewStatus, setReviewStatus] = useState<Status>('pending');
    const [approvalStatus, setApprovalStatus] = useState<Status>('pending');

    const [registrationFor, setRegistrationFor] = useState('myself');
    const [isEditingMyInfo, setIsEditingMyInfo] = useState(false);
    
    const [sellerSearchQuery, setSellerSearchQuery] = useState('');
    const [sellerSearchResults, setSellerSearchResults] = useState<typeof mockSellers>([]);
    const [selectedSeller, setSelectedSeller] = useState<Seller>(null);
    const [isSearchingSeller, setIsSearchingSeller] = useState(false);
    const [submittedSellerQuery, setSubmittedSellerQuery] = useState('');

    useEffect(() => {
        if (registrationFor === 'myself') {
            setFormData(prev => ({ ...prev, usageCategory: 'Private', plateClass: 'Standard' }));
        } else if (registrationFor === 'company') {
            setFormData(prev => ({ ...prev, usageCategory: 'Commercial', plateClass: 'Commercial' }));
        } else if (registrationFor === 'government') {
            setFormData(prev => ({ ...prev, usageCategory: 'Government', plateClass: 'Government' }));
        }
    }, [registrationFor]);

    const paymentMethods: { [key: string]: { name: string; shortcode: string; logo: string } } = {
        evc: { name: 'EVC Plus', shortcode: `*712*615130906*200#`, logo: 'https://i.imgur.com/8Q6Q2hG.png' },
        edahab: { name: 'eDahab', shortcode: `*110*625130906*200#`, logo: 'https://i.imgur.com/k2x2L0W.png' },
        zaad: { name: 'Zaad', shortcode: `*712*615130906*200#`, logo: 'https://i.imgur.com/n9w5jJ3.png' }
    };

    const handleRegistrationForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRegistrationFor(value);
        setIsEditingMyInfo(false); // Reset editing state
    
        if (value === 'myself') {
            setFormData(prev => ({
                ...prev,
                fullName: 'Alex Johnson',
                nationalId: '9823-44',
                dob: '1980-05-14',
                authRepName: 'Alex Johnson',
                tin: '',
            }));
        } else if (value === 'company') {
            setFormData(prev => ({
                ...prev,
                fullName: '', // Clear for company name input
                nationalId: '',
                dob: '',
                authRepName: 'Alex Johnson', // Pre-fill rep name
            }));
        } else if (value === 'government') {
            setFormData(prev => ({
                ...prev,
                fullName: '', // Clear for entity name input
                nationalId: '',
                dob: '',
                authRepName: 'Alex Johnson',
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue : string | boolean = value;

        if (type === 'checkbox') {
          finalValue = (e.target as HTMLInputElement).checked
        }

        if (name === 'vin') {
            let upperValue = value.toUpperCase();
            if (upperValue.length > 17) {
                upperValue = upperValue.substring(0, 17);
            }
            finalValue = upperValue;
            
            const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
            if (upperValue && !vinRegex.test(upperValue)) {
                setErrors(prev => ({ ...prev, vin: 'VIN must be 17 valid characters (no I, O, Q).' }));
            } else {
                setErrors(prev => ({ ...prev, vin: '' }));
            }
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSellerSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = sellerSearchQuery.trim();
        if (!query) return;
        setIsSearchingSeller(true);
        setSubmittedSellerQuery(query);
        setTimeout(() => {
            const results = mockSellers.filter(seller =>
                seller.name.toLowerCase().includes(query.toLowerCase()) ||
                seller.citizenId.toLowerCase().includes(query.toLowerCase())
            );
            setSellerSearchResults(results);
            setIsSearchingSeller(false);
        }, 500);
    };
    
    const handleSellerQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSellerSearchQuery(e.target.value);
        if (submittedSellerQuery) setSubmittedSellerQuery('');
    };

    const handleSelectSeller = (seller: typeof mockSellers[0]) => {
        setSelectedSeller(seller);
        setSellerSearchResults([]);
        setSellerSearchQuery('');
        setSubmittedSellerQuery('');
    };

    const clearSellerSelection = () => setSelectedSeller(null);
    
    const generatePdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("INVOICE", 14, 22);
        doc.setFontSize(10);
        doc.text(`Invoice #: ${applicationID}`, 14, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 35);
        
        doc.text("Ministry of Transportation", 150, 22);
        doc.text("123 Civic Avenue, Capital City", 150, 27);

        doc.text("Bill To:", 14, 50);
        doc.text(formData.fullName || "Valued Citizen", 14, 55);
        
        doc.line(14, 70, 196, 70);
        doc.text("Description", 14, 77);
        doc.text("Amount", 180, 77);
        doc.line(14, 80, 196, 80);

        doc.text("Base Registration Fee", 14, 87);
        doc.text("$150.00", 180, 87);
        doc.text("Plate Fee", 14, 94);
        doc.text("$50.00", 180, 94);
        
        doc.line(14, 110, 196, 110);
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text("Total Due:", 150, 117);
        doc.text("$200.00", 180, 117);
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text("Please pay this invoice to proceed with your application.", 14, 140);

        doc.save(`invoice_${applicationID}.pdf`);
    };

    const handleSubmitAndPay = () => {
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

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const renderStepContent = () => {
        if (paymentStatus !== 'pending') {
            return <StatusFeedbackScreen paymentStatus={paymentStatus} reviewStatus={reviewStatus} approvalStatus={approvalStatus} setView={setView}/>
        }
        
        switch (currentStep) {
            case 1: return <Step1 
                                formData={formData} 
                                handleChange={handleChange} 
                                errors={errors} 
                                registrationFor={registrationFor}
                                setRegistrationFor={handleRegistrationForChange}
                                isEditingMyInfo={isEditingMyInfo}
                                setIsEditingMyInfo={setIsEditingMyInfo}
                           />;
            case 2: return <Step2 formData={formData} handleChange={handleChange} errors={errors} />;
            case 3: return <Step3 
                                formData={formData} 
                                handleChange={handleChange} 
                                errors={errors} 
                                sellerSearchQuery={sellerSearchQuery}
                                handleSellerQueryChange={handleSellerQueryChange}
                                handleSellerSearch={handleSellerSearch}
                                isSearchingSeller={isSearchingSeller}
                                sellerSearchResults={sellerSearchResults}
                                submittedSellerQuery={submittedSellerQuery}
                                handleSelectSeller={handleSelectSeller}
                                selectedSeller={selectedSeller}
                                clearSellerSelection={clearSellerSelection}
                           />;
            case 4: return <Step4 formData={formData} handleChange={handleChange} errors={errors} />;
            case 5: return <Step5 
                            formData={formData} 
                            handleChange={handleChange} 
                            errors={errors} 
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            paymentMobileNumber={paymentMobileNumber}
                            setPaymentMobileNumber={setPaymentMobileNumber}
                            applicationID={applicationID}
                            paymentMethodsConfig={paymentMethods}
                          />;
            default: return <div>Unknown Step</div>;
        }
    };
    
    return (
        <div className="space-y-6">
            {paymentStatus === 'pending' && <h1 className="text-2xl font-bold">New Vehicle Registration</h1> }
            
             <div className="w-full bg-white p-2 rounded-lg border border-brand-gray-200 shadow-sm">
                <div className="flex items-center justify-start overflow-x-auto">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex items-center p-2 shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentStep > step.id && paymentStatus === 'pending') {
                                            setCurrentStep(step.id);
                                        }
                                    }}
                                    disabled={currentStep <= step.id || paymentStatus !== 'pending'}
                                    className="flex items-center rounded-md transition-colors disabled:cursor-default enabled:hover:bg-brand-gray-50"
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0
                                        ${currentStep > step.id ? 'bg-brand-blue-100 text-brand-blue-700' : ''}
                                        ${currentStep === step.id ? 'bg-brand-blue-600 text-white' : ''}
                                        ${currentStep < step.id ? 'bg-brand-gray-200 text-brand-gray-500' : ''}
                                    `}>
                                        {currentStep > step.id ? <Check size={16} /> : step.id}
                                    </div>
                                    <span className={`ml-3 text-sm 
                                        ${currentStep === step.id ? 'font-bold text-brand-blue-700' : 'font-medium text-brand-gray-600'}
                                        ${currentStep < step.id ? 'text-brand-gray-500' : ''}
                                        ${currentStep > step.id ? 'group-hover:text-brand-blue-700' : ''}
                                    `}>
                                        {step.name}
                                    </span>
                                </button>
                            </div>
                            {index < steps.length - 1 && (
                                 <ChevronRight className="w-5 h-5 text-brand-gray-300 shrink-0 mx-2" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="pt-2">
                {renderStepContent()}
            </div>
            
            {paymentStatus === 'pending' && (
                <div className="flex justify-between pt-6 border-t">
                    {currentStep > 1 ? (
                        <button onClick={prevStep} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2"/> Back
                        </button>
                    ) : <div/>}
                    <div className="flex items-center space-x-2">
                        {currentStep < steps.length && (
                            <>
                                <button className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-50">Save Draft</button>
                                <button onClick={nextStep} className="bg-brand-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                                    Continue
                                </button>
                            </>
                        )}
                        {currentStep === steps.length && (
                             <>
                                <button onClick={generatePdf} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-50">Save as Draft & Get Invoice</button>
                                <button 
                                    onClick={handleSubmitAndPay} 
                                    disabled={!formData.declaration1 || !formData.declaration2 || !paymentMethod}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-brand-gray-300 disabled:cursor-not-allowed">
                                    Submit & Pay $200.00
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const somaliRegions = [
    "Awdal", "Bakool", "Banadir", "Bari", "Bay", "Galguduud", "Gedo", "Hiiraan",
    "Jubbada Dhexe", "Jubbada Hoose", "Mudug", "Nugaal", "Sanaag", "Shabeellaha Dhexe",
    "Shabeellaha Hoose", "Sool", "Togdheer"
];

const Step1 = ({ formData, handleChange, errors, registrationFor, setRegistrationFor, isEditingMyInfo, setIsEditingMyInfo }) => {

    const renderFullForm = () => {
        const isEntity = registrationFor === 'company' || registrationFor === 'government';
        const entityType = registrationFor === 'company' ? 'Company' : 'Government';

        return (
         <div className="space-y-4">
            {registrationFor === 'myself' && (
                <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    <InputField label="National ID" name="nationalId" value={formData.nationalId} onChange={handleChange} required />
                    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                </div>
            )}
             {isEntity && (
                <div className="space-y-4">
                    <InputField label={`${entityType} Name`} name="fullName" value={formData.fullName} onChange={handleChange} required />
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label={entityType === 'Company' ? "TIN" : "Entity ID"} name="tin" value={formData.tin} onChange={handleChange} required />
                    </div>
                    <h3 className="text-md font-semibold pt-4 border-t">Authorized Representative</h3>
                     <div className="grid md:grid-cols-2 gap-4">
                         <InputField label="Representative Name" name="authRepName" value={formData.authRepName} onChange={handleChange} required disabled />
                         <AdvancedUploadField label="Letter of Authorization" required />
                     </div>
                </div>
            )}
            
             <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                 <InputField label={isEntity ? "Entity Phone Number" : "Phone Number"} name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+252 61..." required pattern="^\+252[0-9]{8,9}$" title="Enter a valid Somali phone number (e.g., +25261...)" />
                 <InputField label={isEntity ? "Entity Email" : "Email"} name="email" type="email" value={formData.email} onChange={handleChange} required />
             </div>
             <div className="pt-4 border-t">
                 <h3 className="text-md font-semibold text-brand-gray-800">{isEntity ? "Entity Address" : "Address"}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <SelectField label="Region" name="addressRegion" value={formData.addressRegion} onChange={handleChange} required>
                        <option value="">Select a region</option>
                        {somaliRegions.map(region => <option key={region} value={region}>{region}</option>)}
                    </SelectField>
                    <InputField label="District" name="addressDistrict" placeholder="District" value={formData.addressDistrict} onChange={handleChange} required />
                    <div className="md:col-span-2">
                        <InputField label="Street / Village" name="addressStreet" placeholder="Street / Village" value={formData.addressStreet} onChange={handleChange} required />
                    </div>
                 </div>
             </div>
        </div>
    )};

    return (
        <Card>
            <h2 className="text-xl font-bold mb-4">Owner & Contact Information</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-brand-gray-700">Who is this registration for?</label>
                    <div className="mt-2 grid sm:grid-cols-3 gap-4">
                        <label className={`flex items-center p-3 border rounded-lg cursor-pointer flex-1 ${registrationFor === 'myself' ? 'bg-brand-blue-50 border-brand-blue-500' : 'border-brand-gray-200'}`}>
                            <input type="radio" name="registrationFor" value="myself" checked={registrationFor === 'myself'} onChange={setRegistrationFor} className="h-4 w-4 text-brand-blue-600 border-gray-300 focus:ring-brand-blue-500" />
                            <span className="ml-3 text-sm font-medium">Myself</span>
                        </label>
                        <label className={`flex items-center p-3 border rounded-lg cursor-pointer flex-1 ${registrationFor === 'company' ? 'bg-brand-blue-50 border-brand-blue-500' : 'border-brand-gray-200'}`}>
                            <input type="radio" name="registrationFor" value="company" checked={registrationFor === 'company'} onChange={setRegistrationFor} className="h-4 w-4 text-brand-blue-600 border-gray-300 focus:ring-brand-blue-500" />
                            <span className="ml-3 text-sm font-medium">A Company</span>
                        </label>
                         <label className={`flex items-center p-3 border rounded-lg cursor-pointer flex-1 ${registrationFor === 'government' ? 'bg-brand-blue-50 border-brand-blue-500' : 'border-brand-gray-200'}`}>
                            <input type="radio" name="registrationFor" value="government" checked={registrationFor === 'government'} onChange={setRegistrationFor} className="h-4 w-4 text-brand-blue-600 border-gray-300 focus:ring-brand-blue-500" />
                            <span className="ml-3 text-sm font-medium">A Government</span>
                        </label>
                    </div>
                </div>

                {registrationFor === 'myself' ? (
                    <div>
                         <div className="p-4 bg-brand-blue-50 border border-brand-blue-200 rounded-lg">
                             <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                     <img src="https://picsum.photos/id/237/40/40" alt="User" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <h3 className="font-semibold text-lg text-brand-blue-900">Your Information</h3>
                                        <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-brand-blue-800">
                                            <span>{formData.fullName}</span>
                                            <span className="hidden sm:inline">|</span>
                                            <span>{formData.email}</span>
                                             <span className="hidden sm:inline">|</span>
                                            <span>{formData.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsEditingMyInfo(!isEditingMyInfo)} className="flex items-center text-sm font-medium text-brand-blue-700 hover:underline shrink-0">
                                    <Edit2 size={14} className="mr-1" /> {isEditingMyInfo ? 'Close Form' : 'Edit Information'}
                                </button>
                            </div>
                            
                            {isEditingMyInfo && (
                                <div className="mt-4 pt-4 border-t border-brand-blue-200">{renderFullForm()}</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 pt-4 border-t">
                        {renderFullForm()}
                    </div>
                )}
            </div>
        </Card>
    )
};

const Step2 = ({ formData, handleChange, errors }) => (
    <Card>
        <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>
        <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
                 <SelectField label="Vehicle Type" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required><option value="">Select Type</option><option>Car</option><option>SUV</option><option>Bus</option><option>Truck</option><option>Motorcycle</option></SelectField>
                 <SelectField label="Usage Category" name="usageCategory" value={formData.usageCategory} onChange={handleChange} required disabled><option value="">Select Usage</option><option>Private</option><option>Commercial</option><option>Government</option></SelectField>
                 <InputField label="Make" name="make" value={formData.make} onChange={handleChange} required />
                 <InputField label="Model" name="model" value={formData.model} onChange={handleChange} required />
                 <InputField label="Model Year" name="modelYear" type="number" value={formData.modelYear} onChange={handleChange} required />
                 <SelectField label="Fuel Type" name="fuelType" value={formData.fuelType} onChange={handleChange} required><option value="">Select Fuel</option><option>Petrol</option><option>Diesel</option><option>Electric</option></SelectField>
            </div>
             <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                 <InputField label="VIN / Chassis Number" name="vin" value={formData.vin} onChange={handleChange} required helpText="Must be 17 characters, excluding I, O, Q." error={errors.vin} />
                 <InputField label="Engine Number" name="engineNumber" value={formData.engineNumber} onChange={handleChange} required />
             </div>
             <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <InputField label="Primary Color" name="color" value={formData.color} onChange={handleChange} required />
                 <InputField label="Odometer Reading (km)" name="odometer" type="number" value={formData.odometer} onChange={handleChange} />
             </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-gray-200">
            <h3 className="text-lg font-semibold text-brand-gray-800">Next Steps</h3>
            <p className="text-sm text-brand-gray-500 mt-1 mb-4">After completing this section, you will be asked to:</p>
            <div className="space-y-3">
                <div className="flex items-start p-3 bg-brand-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-100 text-brand-blue-700 font-bold text-xs shrink-0 mr-3">3</div>
                    <div>
                        <p className="font-medium text-sm text-brand-gray-800">Add insurance details</p>
                        <p className="text-xs text-brand-gray-500">Provide your policy number and provider information.</p>
                    </div>
                </div>
                <div className="flex items-start p-3 bg-brand-gray-50 rounded-lg">
                     <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-100 text-brand-blue-700 font-bold text-xs shrink-0 mr-3">4</div>
                    <div>
                        <p className="font-medium text-sm text-brand-gray-800">Upload documents</p>
                        <p className="text-xs text-brand-gray-500">Attach proof of ownership and other required files.</p>
                    </div>
                </div>
                 <div className="flex items-start p-3 bg-brand-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-100 text-brand-blue-700 font-bold text-xs shrink-0 mr-3">5</div>
                    <div>
                        <p className="font-medium text-sm text-brand-gray-800">Pay registration fee</p>
                        <p className="text-xs text-brand-gray-500">Finalize your application with payment.</p>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

const Step3 = ({ formData, handleChange, errors, sellerSearchQuery, handleSellerQueryChange, handleSellerSearch, isSearchingSeller, sellerSearchResults, submittedSellerQuery, handleSelectSeller, selectedSeller, clearSellerSelection }) => (
    <Card>
        <h2 className="text-xl font-bold mb-4">Registration & Insurance</h2>
         <div className="space-y-4">
            <SelectField label="Registration Type" name="registrationType" value={formData.registrationType} onChange={handleChange} required>
                <option>New</option><option>Transfer</option><option>Re-registration (imported)</option>
            </SelectField>
            {formData.registrationType === 'Transfer' && (
                <div className="p-4 border border-brand-gray-200 rounded-lg bg-brand-gray-50 space-y-4">
                    <h3 className="font-semibold text-md">Seller Information</h3>
                    {selectedSeller ? (
                         <div>
                            <div className="p-4 bg-brand-blue-50 border border-brand-blue-200 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-4">
                                        <img src={selectedSeller.avatarUrl} alt={selectedSeller.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                                        <div>
                                            <p className="font-bold text-lg text-brand-blue-900">{selectedSeller.name}</p>
                                            <p className="text-sm text-brand-blue-800">ID: {selectedSeller.citizenId}</p>
                                        </div>
                                    </div>
                                    <button onClick={clearSellerSelection} className="text-sm text-brand-blue-700 hover:underline font-semibold">Change Seller</button>
                                </div>
                                <hr className="my-3 border-brand-blue-200" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-brand-blue-900">
                                    <div><span className="font-medium text-brand-blue-700">Email:</span> {selectedSeller.email}</div>
                                    <div><span className="font-medium text-brand-blue-700">Phone:</span> {selectedSeller.phone}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={handleSellerSearch} className="flex space-x-2">
                                <div className="relative flex-grow">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                                    <input type="text" value={sellerSearchQuery} onChange={handleSellerQueryChange} placeholder="Search seller by name or Citizen ID..." className="w-full border border-brand-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none" />
                                </div>
                                <button type="submit" disabled={isSearchingSeller} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 disabled:bg-brand-gray-400">{isSearchingSeller ? 'Searching...' : 'Search'}</button>
                            </form>
                            {sellerSearchResults.length > 0 && (
                                <div className="mt-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold mb-2">Search Results ({sellerSearchResults.length})</h3>
                                    <ul className="space-y-2 max-h-48 overflow-y-auto">{sellerSearchResults.map(seller => (<li key={seller.id} className="p-3 bg-white rounded-lg flex justify-between items-center border"><div className="flex items-center space-x-3"><img src={seller.avatarUrl} alt={seller.name} className="w-10 h-10 rounded-full" /><div><p className="font-medium">{seller.name}</p><p className="text-xs text-brand-gray-500">{seller.citizenId}</p></div></div><button onClick={() => handleSelectSeller(seller)} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm hover:bg-brand-gray-100">Select</button></li>))}</ul>
                                </div>
                            )}
                            {!isSearchingSeller && submittedSellerQuery && sellerSearchResults.length === 0 && (<div className="mt-4 text-center p-4 bg-white rounded-lg border"><p className="text-sm text-brand-gray-600">No sellers found for "{submittedSellerQuery}".</p></div>)}
                        </div>
                    )}
                </div>
            )}
             <div className="grid md:grid-cols-2 gap-4">
                <SelectField label="Plate Class" name="plateClass" value={formData.plateClass} onChange={handleChange} required disabled><option value="">Select Class</option><option>Standard</option><option>Commercial</option><option>Government</option></SelectField>
                <SelectField label="Preferred Issuing Office" name="issuingOffice" value={formData.issuingOffice} onChange={handleChange} required>
                    <option value="">Select Office</option>
                    <option>Dusmareb</option>
                    <option>Galkayo</option>
                    <option>Adado</option>
                    <option>Abudwak</option>
                </SelectField>
             </div>
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                  <SelectField label="Insurance Provider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} required><option value="">Select Provider</option><option>Takaful Insurance</option><option>Somali Insurance Co.</option></SelectField>
                  <InputField label="Policy Number" name="policyNumber" value={formData.policyNumber} onChange={handleChange} required />
                   <InputField label="Policy Expiry Date" name="policyValidTo" type="date" value={formData.policyValidTo} onChange={handleChange} required />
              </div>
        </div>
    </Card>
);

const Step4 = ({ formData, handleChange, errors }) => (
    <Card>
        <h2 className="text-xl font-bold mb-4">Attachments</h2>
         <p className="text-sm text-brand-gray-500 mb-4">Upload all required documents. One file per category.</p>
        <div className="grid md:grid-cols-2 gap-6">
            <AdvancedUploadField label="Notorized Proof of Ownership" required />
            <AdvancedUploadField label="Notorized Transfer Agreement" required />
            <AdvancedUploadField label="Vehicle photo (front side)" required />
        </div>
    </Card>
);

const Step5 = ({ formData, handleChange, errors, paymentMethod, setPaymentMethod, paymentMobileNumber, setPaymentMobileNumber, applicationID, paymentMethodsConfig }) => {
    return (
    <Card>
        <h2 className="text-xl font-bold mb-4">Payment & Submission</h2>
        <div className="space-y-6">
            <div className="p-4 border border-brand-blue-200 rounded-lg bg-brand-blue-50">
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-900">Review Details</h3>
                <p className="text-sm text-brand-blue-800">Please review all information carefully before submitting.</p>
                <div className="mt-4 grid grid-cols-2 text-sm gap-2">
                    <div className="text-brand-blue-700">Owner Name:</div> <div className="font-medium text-brand-blue-900">{formData.fullName || 'N/A'}</div>
                    <div className="text-brand-blue-700">Vehicle:</div> <div className="font-medium text-brand-blue-900">{formData.modelYear} {formData.make} {formData.model}</div>
                     <div className="text-brand-blue-700">VIN:</div> <div className="font-medium text-brand-blue-900">{formData.vin || 'N/A'}</div>
                </div>
            </div>
             <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Financials & Fees</h3>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-brand-gray-600">Base Registration Fee</span><span>$150.00</span></div>
                    <div className="flex justify-between"><span className="text-brand-gray-600">Plate Fee</span><span>$50.00</span></div>
                    <div className="flex justify-between font-bold pt-2 border-t mt-2"><span >Total Payable</span><span>$200.00</span></div>
                </div>
            </div>

            <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Select Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(paymentMethodsConfig).map(([key, value]) => {
                        const { name, logo } = value as { name: string; logo: string };
                        return (
                            <button 
                                key={key} 
                                onClick={() => setPaymentMethod(key)}
                                className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === key ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-brand-gray-200 hover:border-brand-blue-400'}`}
                            >
                                <img src={logo} alt={name} className="h-10"/>
                                <p className="text-sm font-semibold">{name}</p>
                            </button>
                        );
                    })}
                </div>
                {paymentMethod && (
                    <div className="mt-6">
                        <h4 className="font-semibold text-md mb-2">Enter Payment Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 border rounded-lg bg-white">
                                <div className="space-y-4">
                                    <InputField 
                                        label="Mobile Number for Payment" 
                                        placeholder="e.g., 61XXXXXXX"
                                        value={paymentMobileNumber}
                                        onChange={(e) => setPaymentMobileNumber(e.target.value)}
                                        name="paymentMobile"
                                    />
                                    <InputField label="Description" name="description" value={`Application ID: ${applicationID}`} onChange={() => {}} disabled={true} />
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-brand-gray-50 border">
                                <h4 className="font-semibold text-sm mb-2">Manual Payment Instructions</h4>
                                <p className="text-xs text-brand-gray-600 mb-3">To complete payment, dial the following code from the mobile number you entered.</p>
                                <div className="flex items-center space-x-2">
                                   <img src={paymentMethodsConfig[paymentMethod]?.logo} alt={paymentMethodsConfig[paymentMethod]?.name} className="h-6"/>
                                   <p className="font-mono text-lg font-bold text-brand-gray-800 bg-white px-3 py-1 rounded-md border">{paymentMethodsConfig[paymentMethod]?.shortcode}</p>
                                </div>
                                 <p className="text-xs text-brand-gray-500 mt-2">The total amount is <span className="font-bold">$200.00</span>.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

             <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Declarations & Consent</h3>
                <div className="space-y-3">
                     <label className="flex items-start">
                        <input type="checkbox" name="declaration1" checked={formData.declaration1} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-3 mt-1"/>
                        <span className="text-sm">I declare that the information provided is true and correct to the best of my knowledge. *</span>
                    </label>
                    <label className="flex items-start">
                        <input type="checkbox" name="declaration2" checked={formData.declaration2} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-3 mt-1"/>
                        <span className="text-sm">I consent to the verification of this information with insurers, customs, and payment providers as required by law. *</span>
                    </label>
                </div>
            </div>
        </div>
    </Card>
)};


export default VehicleRegistration;