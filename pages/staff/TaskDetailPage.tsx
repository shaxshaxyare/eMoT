import React from 'react';
import { Task } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, CheckCircle, XCircle, Briefcase, MessageSquare, FileText, User, Car, DollarSign, Clock, Paperclip, Shield, Mail, Phone, Calendar } from 'lucide-react';

interface TaskDetailPageProps {
    task: Task;
    onBack: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
    <div className={fullWidth ? 'col-span-1 md:col-span-2' : ''}>
        <p className="text-sm text-brand-gray-500">{label}</p>
        <div className="text-md font-medium text-brand-gray-800 break-words">{value}</div>
    </div>
);


const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; }> = ({ title, icon: Icon, children }) => (
    <Card>
        <h2 className="text-lg font-bold mb-4 flex items-center">
            <Icon className="w-6 h-6 mr-3 text-brand-blue-700" />
            {title}
        </h2>
        <div className="space-y-4">
            {children}
        </div>
    </Card>
);

const AttachmentItem: React.FC<{ name: string, size: string, type: string }> = ({ name, size, type }) => (
     <li className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-brand-gray-500"/>
            <div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-brand-gray-500">{type} • {size}</p>
            </div>
        </div>
        <button className="text-sm font-medium text-brand-blue-700 hover:underline">View</button>
    </li>
);

// Specific Detail Views
const VehicleRegistrationDetail: React.FC = () => (
    <>
        <SectionCard title="Step 1: Owner & Contact Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Registration For" value="Myself" />
                <DetailItem label="Full Name" value="Axmed Cumar" />
                <DetailItem label="National ID" value="AC-9876-54" />
                <DetailItem label="Date of Birth" value="1982-03-15" />
                <DetailItem label="Phone Number" value="+252 61 555 1111" />
                <DetailItem label="Email" value="axmed.c@example.com" />
                <DetailItem label="Region" value="Banadir" />
                <DetailItem label="District" value="Hamar Weyne" />
                <DetailItem label="Street / Village" value="123 Wadada Maka Al Mukarama" fullWidth />
            </div>
        </SectionCard>
        <SectionCard title="Step 2: Vehicle Details" icon={Car}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Vehicle Type" value="SUV" />
                <DetailItem label="Usage Category" value="Private" />
                <DetailItem label="Make" value="Toyota" />
                <DetailItem label="Model" value="Land Cruiser" />
                <DetailItem label="Model Year" value="2023" />
                <DetailItem label="Fuel Type" value="Petrol" />
                <DetailItem label="VIN / Chassis Number" value="JTDKR...B45678" />
                <DetailItem label="Engine Number" value="EN987654321" />
                <DetailItem label="Primary Color" value="White" />
                <DetailItem label="Odometer Reading (km)" value="15,000" />
            </div>
        </SectionCard>
        <SectionCard title="Step 3: Registration & Insurance" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Registration Type" value="New" />
                <DetailItem label="Plate Class" value="Standard" />
                <DetailItem label="Preferred Issuing Office" value="Dusmareb" />
                <DetailItem label="Insurance Provider" value="Takaful Insurance" />
                <DetailItem label="Policy Number" value="POL-987654" />
                <DetailItem label="Policy Expiry Date" value="2026-11-20" />
            </div>
        </SectionCard>
        <SectionCard title="Step 4: Attachments" icon={Paperclip}>
            <ul className="space-y-2">
                <AttachmentItem name="notarized_ownership.pdf" size="1.2MB" type="Proof of Ownership" />
                <AttachmentItem name="transfer_agreement.pdf" size="850KB" type="Transfer Agreement" />
                <AttachmentItem name="vehicle_front.jpg" size="3.1MB" type="Vehicle Photo" />
            </ul>
        </SectionCard>
    </>
);

const OwnershipTransferDetail: React.FC = () => (
    <>
        <SectionCard title="Step 1: Seller, Buyer & Vehicle" icon={User}>
            <h3 className="text-md font-semibold text-brand-gray-700">Seller Information (Current Owner)</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <DetailItem label="Full Name" value="Alex Johnson" />
                <DetailItem label="Citizen ID" value="9823-44" />
            </div>
            <hr className="my-4"/>
            <h3 className="text-md font-semibold text-brand-gray-700">Buyer Information (New Owner)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <DetailItem label="Full Name" value="Cabdi Ismaaciil" />
                <DetailItem label="Citizen ID" value="CI-1122-33" />
                <DetailItem label="Phone Number" value="+252 61 555 3333" />
                <DetailItem label="Email" value="cabdi.i@example.com" />
            </div>
             <hr className="my-4"/>
            <h3 className="text-md font-semibold text-brand-gray-700">Vehicle Selected</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <DetailItem label="Vehicle" value="Toyota Camry" />
                <DetailItem label="Plate Number" value="ABC-4821" />
            </div>
        </SectionCard>
        <SectionCard title="Step 2: Transfer Details" icon={Car}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Transfer Type" value="Sale" />
                <DetailItem label="Date of Sale" value="2025-11-14" />
                <DetailItem label="Sale Price" value="$15,000" />
                <DetailItem label="Odometer at Transfer" value="50,123 km" />
            </div>
        </SectionCard>
         <SectionCard title="Step 3: Witnesses & Documents" icon={Paperclip}>
            <h3 className="text-md font-semibold">Witnesses</h3>
             <ul className="list-disc list-inside text-sm">
                <li>Witness 1: Cismaan Barre, +252 61 555 4444</li>
                <li>Witness 2: Sahra Cali, +252 61 555 5555</li>
                <li>Witness 3: Yuusuf Xasan, +252 61 555 6666</li>
            </ul>
            <h3 className="text-md font-semibold mt-4">Uploaded Documents</h3>
            <ul className="space-y-2 mt-2">
                <AttachmentItem name="seller_ownership_notary.pdf" size="1.1MB" type="Seller Proof of Ownership" />
                <AttachmentItem name="transfer_agreement.pdf" size="900KB" type="Transfer Agreement Document" />
            </ul>
        </SectionCard>
        <SectionCard title="Step 4: Signed Acknowledgement" icon={FileText}>
            <ul className="space-y-2">
                <AttachmentItem name="signed_acknowledgement.pdf" size="1.3MB" type="Signed Transfer Acknowledgement" />
            </ul>
        </SectionCard>
    </>
);

const DriverLicensingDetail: React.FC = () => (
     <>
        <SectionCard title="Step 1: Application Details" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Application Type" value="Renewal" />
                <DetailItem label="License Class" value="B - Passenger Car" />
            </div>
            <h3 className="text-md font-semibold pt-4 border-t mt-4">Applicant Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <DetailItem label="Full Name" value="Farhiya Jaamac" />
                <DetailItem label="Citizen ID" value="FJ-5432-10" />
                <DetailItem label="Address" value="456 Jidka Warshadaha, Muqdisho" fullWidth />
            </div>
        </SectionCard>
        <SectionCard title="Step 2: Document Upload" icon={Paperclip}>
            <ul className="space-y-2">
                <AttachmentItem name="medical_cert_2025.pdf" size="450KB" type="Medical Fitness Certificate" />
                <AttachmentItem name="vision_test.pdf" size="300KB" type="Vision Test Results" />
                <AttachmentItem name="photo_new.jpg" size="2.8MB" type="Passport-size Photo" />
            </ul>
        </SectionCard>
        <SectionCard title="Step 3: Payment Summary" icon={DollarSign}>
             <div className="p-4 bg-brand-gray-50 rounded-lg border">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-brand-gray-600">Application Fee</span><span>$50.00</span></div>
                    <div className="flex justify-between"><span className="text-brand-gray-600">Knowledge Test Fee</span><span>$20.00</span></div>
                    <div className="flex justify-between"><span className="text-brand-gray-600">Road Test Fee</span><span>$30.00</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span >Total Payable</span><span>$100.00</span></div>
                </div>
            </div>
        </SectionCard>
    </>
);

const RoadTaxDetail: React.FC = () => (
    <>
        <SectionCard title="Step 1: Vehicle Selection" icon={Car}>
            <DetailItem label="Vehicle Selected" value="Toyota Camry (ABC-4821)" />
        </SectionCard>
        <SectionCard title="Step 2: Confirmation & Payment" icon={DollarSign}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Tax Period" value="Jan 1, 2026 - Dec 31, 2026" />
                <DetailItem label="Total Amount" value="$75.00" />
            </div>
        </SectionCard>
    </>
);

const ReplacementLicenseDetail: React.FC = () => (
    <>
        <SectionCard title="Step 1: Reason for Replacement" icon={FileText}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Reason" value="Lost" />
                <DetailItem label="Declaration" value={<Badge variant="success">Confirmed</Badge>} />
            </div>
        </SectionCard>
        <SectionCard title="Step 2: Confirmation & Payment" icon={DollarSign}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Applicant" value="Alex Johnson (DL-092344-A)" />
                <DetailItem label="Total Fee" value="$25.00" />
            </div>
        </SectionCard>
    </>
);

const ReplacementCertificateDetail: React.FC = () => (
    <>
        <SectionCard title="Step 1: Vehicle Selection" icon={Car}>
            <DetailItem label="Vehicle Selected" value="Ford F-150 (TRK-9023)" />
            <DetailItem label="Declaration" value={<Badge variant="success">Confirmed</Badge>} />
        </SectionCard>
        <SectionCard title="Step 2: Confirmation & Payment" icon={DollarSign}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Document" value="Vehicle Registration Certificate" />
                <DetailItem label="Total Fee" value="$15.00" />
            </div>
        </SectionCard>
    </>
);

const ReplacementPlateDetail: React.FC = () => (
    <>
        <SectionCard title="Step 1: Vehicle & Reason" icon={Car}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Vehicle Selected" value="Toyota Camry (ABC-4821)" />
                <DetailItem label="Reason" value="Stolen" />
            </div>
        </SectionCard>
        <SectionCard title="Step 2: Attachments" icon={Paperclip}>
             <ul className="space-y-2">
                <AttachmentItem name="police_report_plates.pdf" size="250KB" type="Police Report" />
            </ul>
        </SectionCard>
        <SectionCard title="Step 3: Confirmation & Payment" icon={DollarSign}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Plates to Issue" value="1 Pair (Front & Rear)" />
                <DetailItem label="Total Fee" value="$40.00" />
            </div>
        </SectionCard>
    </>
);

const TaskDetailPage: React.FC<TaskDetailPageProps> = ({ task, onBack }) => {
    const isOverdue = (dueDate: string) => new Date(dueDate) < new Date() && task.status !== 'completed';

    const renderServiceDetails = () => {
        const service = task.service.toLowerCase();
        if (service.includes('vehicle registration')) return <VehicleRegistrationDetail />;
        if (service.includes('ownership transfer')) return <OwnershipTransferDetail />;
        if (service.includes('license')) return <DriverLicensingDetail />;
        if (service.includes('road tax')) return <RoadTaxDetail />;
        if (service.includes('replacement license')) return <ReplacementLicenseDetail />;
        if (service.includes('replacement certificate')) return <ReplacementCertificateDetail />;
        if (service.includes('plate replacement')) return <ReplacementPlateDetail />;
        
        // Fallback for other types
        return (
             <SectionCard title="Applicant Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Full Name" value={task.applicantName} />
                    <DetailItem label="Citizen ID" value={`ID-${task.id.slice(-6)}`} />
                </div>
            </SectionCard>
        );
    };

    const taskHistory = [
        { action: 'Application Submitted', user: 'System', date: task.submittedDate + ' 09:30' },
        { action: 'Assigned to team', user: 'Auto-Assigner', date: task.submittedDate + ' 09:35' },
    ];
    
    const payments = [
        { description: 'Application Fee', amount: 50.00, status: 'Paid', date: task.submittedDate },
        { description: 'Service Fee', amount: 25.00, status: 'Pending', date: null },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <button onClick={onBack} className="p-2 rounded-md hover:bg-brand-gray-100"><ArrowLeft className="w-5 h-5" /></button>
                    <div>
                        <h1 className="text-2xl font-bold">{task.service}</h1>
                        <p className="text-brand-gray-600">Task for {task.applicantName}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge variant={isOverdue(task.dueDate) ? 'danger' : 'default'}>Due: {task.dueDate}</Badge>
                    <Badge variant="info">Next Step: {task.nextStep}</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {renderServiceDetails()}
                    
                    <SectionCard title="Payments & Fees" icon={DollarSign}>
                        <table className="w-full text-sm">
                            <thead><tr className="border-b"><th className="text-left pb-2">Description</th><th className="text-left pb-2">Status</th><th className="text-right pb-2">Amount</th></tr></thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr key={p.description}>
                                        <td className="py-2">{p.description}</td>
                                        <td className="py-2"><Badge variant={p.status === 'Paid' ? 'success' : 'warning'}>{p.status}</Badge></td>
                                        <td className="py-2 text-right font-semibold">${p.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </SectionCard>
                    <SectionCard title="Task History" icon={Clock}>
                        <ul className="space-y-3">
                             {taskHistory.map((item, index) => (
                                <li key={index} className="flex items-center text-sm">
                                    <div className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center mr-3 shrink-0"><User size={16} className="text-brand-gray-500"/></div>
                                    <div><p className="font-medium">{item.action} <span className="text-brand-gray-500 font-normal">by {item.user}</span></p><p className="text-xs text-brand-gray-500">{item.date}</p></div>
                                </li>
                             ))}
                        </ul>
                    </SectionCard>
                </div>

                <div className="lg:sticky top-24 self-start">
                    <Card>
                        <h2 className="text-lg font-bold mb-4">Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 flex items-center justify-center"><CheckCircle className="w-5 h-5 mr-2"/> Approve</button>
                             <button className="w-full bg-red-600 text-white font-semibold py-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center"><XCircle className="w-5 h-5 mr-2"/> Reject</button>
                            <button className="w-full bg-white border border-brand-gray-300 text-brand-gray-700 font-semibold py-2.5 rounded-lg hover:bg-brand-gray-100 flex items-center justify-center"><Briefcase className="w-5 h-5 mr-2"/> Reassign</button>
                             <button className="w-full bg-white border border-brand-gray-300 text-brand-gray-700 font-semibold py-2.5 rounded-lg hover:bg-brand-gray-100 flex items-center justify-center"><MessageSquare className="w-5 h-5 mr-2"/> Add Note</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
