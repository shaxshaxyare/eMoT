
import React, { useState } from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, X, Upload, Search, FileDown, Columns, RefreshCw, ChevronRight, ShieldCheck, AlertTriangle, MessageSquare } from 'lucide-react';

interface VehiclesProps {
  navigate: (view: View) => void;
}

const VehicleListView: React.FC<{ onAddVehicle: () => void }> = ({ onAddVehicle }) => {
    const vehiclesData = [
        { make: 'Toyota Camry', plate: 'ABC-4821', registration: 'Active', insurance: 'Valid', vin: '4T1BTH1HK3U123456', status: 'view' },
        { make: 'Ford F-150', plate: 'TRK-9023', registration: 'Expiring 12 days', insurance: 'Valid', vin: '1FTEW1EGHKE78901', status: 'remind' },
        { make: 'Honda Odyssey', plate: 'VAN-3312', registration: 'Expired', insurance: 'Verify', vin: '5FNRL5H60FB055321', status: 'upload' },
    ];

    const quickActions = [
        { name: 'Registration Renewal', action: 'Start' },
        { name: 'Replace Plate', action: 'Begin' },
        { name: 'Report Sold/Disposed', action: 'Begin' },
        { name: 'Update Insurance', action: 'Upload' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-brand-gray-500">Dashboard / Vehicles</p>
                    <h1 className="text-2xl font-bold">Your Vehicles</h1>
                    <p className="text-brand-gray-600">Manage registrations, plates, and insurance: 3 vehicles</p>
                </div>
                <div className="flex space-x-2">
                    <button onClick={onAddVehicle} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                        <Plus className="w-4 h-4 mr-2"/>
                        Add Vehicle
                    </button>
                    <button className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Renew Registration
                    </button>
                </div>
            </div>

            <Card>
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                        <input type="text" placeholder="Search by plate, VIN, or nickname" className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-2"/> Insured</label>
                        <label className="flex items-center text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-2"/> Expiring soon</label>
                         <label className="flex items-center text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-2"/> Needs action</label>
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><FileDown className="w-4 h-4 mr-1.5"/> Export</button>
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Columns className="w-4 h-4 mr-1.5"/> Columns</button>
                    </div>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Vehicle</th>
                                <th className="px-4 py-3">Plate</th>
                                <th className="px-4 py-3">Registration</th>
                                <th className="px-4 py-3">Insurance</th>
                                <th className="px-4 py-3">VIN</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiclesData.map((v, i) => (
                                <tr key={i} className="border-b">
                                    <td className="px-4 py-3 font-medium flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 mr-4"/> {v.make}</td>
                                    <td className="px-4 py-3">{v.plate}</td>
                                    <td className="px-4 py-3"><Badge variant={v.registration.includes('Expiring') ? 'warning' : v.registration === 'Expired' ? 'danger' : 'success'}>{v.registration}</Badge></td>
                                    <td className="px-4 py-3"><Badge variant={v.insurance === 'Valid' ? 'success' : 'warning'}>{v.insurance}</Badge></td>
                                    <td className="px-4 py-3 text-brand-gray-500">{v.vin}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md hover:bg-brand-gray-100 text-xs">View</button>
                                        <button className="bg-brand-blue-700 text-white px-3 py-1 rounded-md hover:bg-brand-blue-800 ml-2 text-xs">Renew</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                    <p className="text-sm text-brand-gray-500 mb-4">Vehicle services</p>
                    <div className="space-y-2">
                        {quickActions.map((item, i) => (
                             <div key={i} className="flex justify-between items-center p-2 bg-brand-gray-50 rounded-lg">
                                <p className="font-medium text-sm">{item.name}</p>
                                <button className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm">{item.action}</button>
                            </div>
                        ))}
                    </div>
                </Card>
                 <Card>
                    <h2 className="text-lg font-semibold mb-2">Vehicle Details Snapshot</h2>
                     <p className="text-sm text-brand-gray-500 mb-4">Selected: Toyota Camry</p>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-brand-gray-500">Owner</span><span className="font-medium">Alex Johnson</span></div>
                        <div className="flex justify-between"><span className="text-brand-gray-500">Plate</span><span className="font-medium">ABC-4821</span></div>
                        <div className="flex justify-between"><span className="text-brand-gray-500">Registration</span><Badge variant="success">Active</Badge></div>
                        <div className="flex justify-between"><span className="text-brand-gray-500">Insurance</span><Badge variant="success">Valid</Badge></div>
                        <div className="flex justify-between"><span className="text-brand-gray-500">Next Renewal</span><span className="font-medium">Jan 18, 2026</span></div>
                     </div>
                     <p className="text-xs text-brand-gray-500 mt-4">Need help? <a href="#" className="text-brand-blue-700">Chat now</a></p>
                </Card>
                 <Card>
                    <div className="space-y-3">
                        <div className="flex justify-between text-center p-2">
                            <div><p className="text-xl font-bold">2</p><p className="text-sm text-brand-gray-500">Active regs</p></div>
                            <div><p className="text-xl font-bold">1</p><p className="text-sm text-brand-gray-500">Expiring</p></div>
                        </div>
                        <div className="flex justify-between text-center p-2">
                            <div><p className="text-xl font-bold">3</p><p className="text-sm text-brand-gray-500">Insured</p></div>
                            <div><p className="text-xl font-bold">8m</p><p className="text-sm text-brand-gray-500">Avg. renewal</p></div>
                        </div>
                    </div>
                 </Card>
            </div>
            
            <Card>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Start Renewal</h2>
                        <p className="text-sm text-brand-gray-500">Choose a vehicle to renew</p>
                    </div>
                    <div className="flex items-center text-sm font-medium text-brand-gray-600 space-x-4">
                        <p><span className="text-brand-blue-700 font-bold">1</span> Select Vehicle</p>
                        <p>2 Confirm Details</p>
                        <p>3 Payment</p>
                        <p>4 Receipt</p>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button className="p-4 border-2 border-brand-blue-500 bg-brand-blue-50 rounded-lg text-left">
                            <p className="font-semibold">Toyota Camry</p>
                            <p className="text-sm text-brand-gray-600">ABC-4821</p>
                            <Badge variant="success" className="mt-2">Active</Badge>
                        </button>
                        <button className="p-4 border border-brand-gray-200 rounded-lg text-left hover:border-brand-blue-500 hover:bg-brand-blue-50">
                            <p className="font-semibold">Ford F-150</p>
                            <p className="text-sm text-brand-gray-600">TRK-9023</p>
                            <Badge variant="warning" className="mt-2">15d left</Badge>
                        </button>
                        <button className="p-4 border border-brand-gray-200 rounded-lg text-left text-brand-gray-400" disabled>
                            <p className="font-semibold">Honda Odyssey</p>
                            <p className="text-sm">VAN-3312</p>
                             <Badge variant="danger" className="mt-2">Expired</Badge>
                        </button>
                    </div>
                    <div className="bg-brand-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold">Summary</h3>
                        <div className="text-sm space-y-2 mt-2">
                             <div className="flex justify-between"><span className="text-brand-gray-600">Renewal fee</span><span>$68.00</span></div>
                             <div className="flex justify-between"><span className="text-brand-gray-600">Taxes</span><span>$2.00</span></div>
                             <div className="flex justify-between font-bold pt-2 border-t mt-2"><span >Total</span><span>$70.00</span></div>
                        </div>
                         <button className="w-full bg-brand-blue-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 mt-4 flex items-center justify-center">Continue <ChevronRight className="w-4 h-4 ml-1"/></button>
                    </div>
                </div>
            </Card>

        </div>
    )
}


const Vehicles: React.FC<VehiclesProps> = ({ navigate }) => {
    const [isAdding, setIsAdding] = useState(false);

    if (!isAdding) {
        return <VehicleListView onAddVehicle={() => setIsAdding(true)} />
    }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-brand-gray-500">Dashboard / Vehicles</p>
          <h1 className="text-2xl font-bold">Add a New Vehicle</h1>
          <p className="text-brand-gray-600">Enter details below to register a vehicle.</p>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => setIsAdding(false)} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                <X className="w-4 h-4 mr-2"/>
                Cancel
            </button>
            <button onClick={() => setIsAdding(false)} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                Save Vehicle
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <h2 className="text-lg font-semibold mb-1">Vehicle Information</h2>
                <p className="text-sm text-brand-gray-500 mb-4">Required fields</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Make" placeholder="Enter vehicle make" />
                    <InputField label="Model" placeholder="Enter vehicle model" />
                    <InputField label="Year" placeholder="e.g., 2019" />
                    <InputField label="Body Type" placeholder="Sedan, SUV, Truck..." />
                    <InputField label="Color" placeholder="Primary color" />
                    <InputField label="VIN" placeholder="17-character VIN" value="WBA..." description="Will validate format automatically"/>
                    <InputField label="License Plate" placeholder="Assign or leave blank to request new" />
                    <InputField label="Registration State/Region" placeholder="Select issuing region" />
                    <InputField label="Odometer" placeholder="Current mileage" />
                    <InputField label="Owner Type" placeholder="Personal / Commercial" />
                    <InputField label="Usage" placeholder="Private, Rideshare, Delivery..." />
                </div>
            </Card>
        </div>
        <div>
            <Card>
                <h2 className="text-lg font-semibold mb-1">Documents</h2>
                <p className="text-sm text-brand-gray-500 mb-4">Proofs and certificates</p>
                <div className="space-y-4">
                    <UploadField label="Proof of Ownership" description="Upload title / bill of sale" />
                    <UploadField label="Insurance Policy" description="Upload insurance proof" />
                    <UploadField label="Emissions Certificate" description="Upload certificate" />
                </div>
            </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <h2 className="text-lg font-semibold mb-1">Preview</h2>
                <p className="text-sm text-brand-gray-500 mb-4">Summary of entered data</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p className="text-brand-gray-500">Vehicle</p><p className="font-medium text-right">Make / Model / Year</p>
                    <p className="text-brand-gray-500">VIN</p><p className="font-medium text-right">...</p>
                    <p className="text-brand-gray-500">Plate</p><p className="font-medium text-right">To be assigned</p>
                    <p className="text-brand-gray-500">Owner Type</p><p className="font-medium text-right">Personal</p>
                </div>
            </Card>
        </div>
        <div>
            <Card>
                <h2 className="text-lg font-semibold mb-1">Next steps</h2>
                <p className="text-sm text-brand-gray-500 mb-4">After saving</p>
                <div className="space-y-2">
                    <button className="w-full flex justify-between items-center text-left bg-brand-gray-50 p-3 rounded-lg hover:bg-brand-gray-100"><span>Pay registration fee</span><span className="font-semibold text-brand-blue-700">→ Proceed</span></button>
                    <button className="w-full flex justify-between items-center text-left bg-brand-gray-50 p-3 rounded-lg hover:bg-brand-gray-100"><span>Add insurance details</span><span className="font-semibold text-brand-blue-700">→ Update</span></button>
                    <button className="w-full flex justify-between items-center text-left bg-brand-gray-50 p-3 rounded-lg hover:bg-brand-gray-100"><span>Request new plates</span><span className="font-semibold text-brand-blue-700">→ Start</span></button>
                </div>
            </Card>
        </div>
      </div>

       <Card>
        <h2 className="text-lg font-semibold mb-4">Existing vehicles</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Vehicle</th>
                        <th className="px-4 py-3">Plate</th>
                        <th className="px-4 py-3">Registration</th>
                        <th className="px-4 py-3">Insurance</th>
                        <th className="px-4 py-3">Last Updated</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { makeModel: 'Honda Accord', plate: 'ABC-123', registration: 'Valid • Expires Jan 12, 2026', insurance: 'Active', updated: 'Today 10:24'},
                        { makeModel: 'Ford F-150', plate: 'JDK-1182', registration: 'Due • Dec 14, 2025', insurance: 'Active', updated: 'Nov 2'},
                    ].map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-3 font-medium">{item.makeModel}</td>
                            <td className="px-4 py-3">{item.plate}</td>
                            <td className="px-4 py-3">{item.registration}</td>
                            <td className="px-4 py-3"><Badge variant="success">{item.insurance}</Badge></td>
                            <td className="px-4 py-3">{item.updated}</td>
                            <td className="px-4 py-3 text-right">
                                <button className="font-medium text-brand-blue-700 hover:underline">View</button>
                                <button className="font-medium text-brand-blue-700 hover:underline ml-4">Renew</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};


const InputField: React.FC<{label: string, placeholder: string, value?: string, description?: string}> = ({label, placeholder, value, description}) => (
    <div>
        <label className="text-sm font-medium text-brand-gray-700">{label}</label>
        <input type="text" placeholder={placeholder} defaultValue={value} className="mt-1 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none" />
        {description && <p className="text-xs text-brand-gray-500 mt-1">{description}</p>}
    </div>
)

const UploadField: React.FC<{label: string, description: string}> = ({label, description}) => (
    <div>
        <label className="text-sm font-medium text-brand-gray-700">{label}</label>
        <button className="mt-1 flex items-center space-x-2 w-full border border-brand-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:bg-brand-gray-50">
            <Upload className="w-5 h-5 text-brand-gray-500"/>
            <span className="text-brand-gray-500">{description}</span>
        </button>
    </div>
)

export default Vehicles;