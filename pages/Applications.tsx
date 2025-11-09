
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, Plus, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import StartNewApplication from '../components/applications/StartNewApplication';
import ApplicantInformation from '../components/applications/ApplicantInformation';
import VehicleOwnershipTransfer from '../components/applications/VehicleOwnershipTransfer';
import VehicleRegistration from '../components/applications/VehicleRegistration';
import DrivingLicenseApplication from '../components/applications/DrivingLicenseApplication';
import RoadTaxPayment from '../components/applications/RoadTaxPayment';
import ReplacementLostCard from '../components/applications/ReplacementLostCard';
import ReplacementVehicleCertificate from '../components/applications/ReplacementVehicleCertificate';
import ReplacementVehiclePlate from '../components/applications/ReplacementVehiclePlate';

interface ApplicationsProps {
  navigate: (view: View) => void;
  initialView?: ApplicationView;
}

const applicationData = [
  { application: 'DL Renewal', type: 'License', status: 'In progress', updated: 'Today 09:25', reference: '#RN-48215', action: 'View' },
  { application: 'Commercial Upgrade', type: 'License', status: 'Under review', updated: 'Yesterday', reference: '#CU-33091', action: 'Track' },
  { application: 'New Plate Issue', type: 'Vehicle', status: 'Pending docs', updated: 'Aug 18', reference: '#NP-11822', action: 'Upload' },
  { application: 'Permit Renewal', type: 'Permit', status: 'Approved', updated: 'Aug 02', reference: '#PR-90214', action: 'Download' },
];

export type ApplicationView = 
    'list' | 'start-new' | 'form' | 'transfer-form' | 'vehicle-registration' |
    'driving-license-form' | 'road-tax-form' | 'replacement-lost-card-form' |
    'replacement-vehicle-certificate-form' | 'replacement-vehicle-plate-form';


const ApplicationListView: React.FC<{ setView: (view: ApplicationView) => void }> = ({ setView }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-brand-gray-500">Dashboard / Applications</p>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-brand-gray-600">Overview of your submissions: 4 total</p>
      </div>
      <div className="flex space-x-2">
          <button onClick={() => setView('start-new')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
              <Plus className="w-4 h-4 mr-2"/>
              Start Application
          </button>
          <button onClick={() => setView('start-new')} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
              Start Renewal
          </button>
      </div>
    </div>

    <Card>
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
              <input type="text" placeholder="Search by name or reference" className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
          </div>
          <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Filter className="w-4 h-4 mr-1.5"/> Filter</button>
              <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">In Progress <ChevronDown className="w-4 h-4 ml-1.5"/></button>
              <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Approved <ChevronDown className="w-4 h-4 ml-1.5"/></button>
              <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Renewals</button>
              <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Export</button>
              <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Columns</button>
          </div>
      </div>

      <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                  <tr>
                      <th className="px-4 py-3">Application</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Updated</th>
                      <th className="px-4 py-3">Reference</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {applicationData.map((item, index) => (
                      <tr key={index} className="border-b">
                          <td className="px-4 py-3 font-medium">{item.application}</td>
                          <td className="px-4 py-3">{item.type}</td>
                          <td className="px-4 py-3">
                              <Badge variant={
                                  item.status === 'In progress' ? 'info' :
                                  item.status === 'Under review' ? 'warning' :
                                  item.status === 'Pending docs' ? 'warning' :
                                  item.status === 'Approved' ? 'success' : 'default'
                              }>{item.status}</Badge>
                          </td>
                          <td className="px-4 py-3">{item.updated}</td>
                          <td className="px-4 py-3 text-brand-gray-500">{item.reference}</td>
                          <td className="px-4 py-3 flex justify-end space-x-2">
                              <button className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md hover:bg-brand-gray-100">{item.action}</button>
                              <button className="bg-brand-blue-700 text-white p-1.5 rounded-md hover:bg-brand-blue-800"><ChevronRight className="w-4 h-4"/></button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </Card>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
          <Card>
              <h2 className="text-lg font-semibold mb-4">Start a New Application</h2>
              <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                      <p className="font-medium">Driving License</p>
                      <button onClick={() => setView('start-new')} className="bg-brand-blue-700 text-white px-4 py-1.5 rounded-md text-sm">Start</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                      <p className="font-medium">Vehicle Registration</p>
                      <button onClick={() => setView('start-new')} className="bg-white border border-brand-gray-300 px-4 py-1.5 rounded-md text-sm">Begin</button>
                  </div>
                    <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                      <p className="font-medium">Vehicle Ownership Transfer</p>
                      <button onClick={() => setView('start-new')} className="bg-white border border-brand-gray-300 px-4 py-1.5 rounded-md text-sm">Begin</button>
                  </div>
                    <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                      <p className="font-medium">Road Tax (Tremistrale)</p>
                      <button onClick={() => setView('start-new')} className="bg-white border border-brand-gray-300 px-4 py-1.5 rounded-md text-sm">Begin</button>
                  </div>
              </div>
          </Card>
      </div>
      <div className="space-y-6">
            <Card>
              <h3 className="text-md font-semibold mb-2">Tips & Guidance</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start"><span className="mr-2 mt-1">✓</span> Use your legal name as it appears on your ID.</li>
                  <li className="flex items-start"><span className="mr-2 mt-1">✓</span> Sensitive data is protected at rest and in transit.</li>
                  <li className="flex items-start"><span className="mr-2 mt-1">✓</span> Save progress and resume anytime.</li>
              </ul>
              <p className="text-sm mt-4">Need assistance? <a href="#" className="text-brand-blue-700 hover:underline">Chat now</a></p>
          </Card>
            <Card>
              <div className="flex justify-between text-center">
                  <div><p className="text-xl font-bold">2</p><p className="text-sm text-brand-gray-500">Active</p></div>
                  <div><p className="text-xl font-bold">1</p><p className="text-sm text-brand-gray-500">Awaiting docs</p></div>
                  <div><p className="text-xl font-bold">3d</p><p className="text-sm text-brand-gray-500">Avg. time</p></div>
              </div>
          </Card>
      </div>
    </div>
  </div>
);

const Applications: React.FC<ApplicationsProps> = ({ navigate, initialView }) => {
  const [view, setView] = useState<ApplicationView>(initialView || 'list');

  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);

  switch (view) {
    case 'start-new':
      return <StartNewApplication setView={setView} />;
    case 'form':
      return <ApplicantInformation setView={setView} />;
    case 'transfer-form':
      return <VehicleOwnershipTransfer setView={setView} />;
    case 'vehicle-registration':
      return <VehicleRegistration setView={setView} />;
    case 'driving-license-form':
        return <DrivingLicenseApplication setView={setView} />;
    case 'road-tax-form':
        return <RoadTaxPayment setView={setView} />;
    case 'replacement-lost-card-form':
        return <ReplacementLostCard setView={setView} />;
    case 'replacement-vehicle-certificate-form':
        return <ReplacementVehicleCertificate setView={setView} />;
    case 'replacement-vehicle-plate-form':
        return <ReplacementVehiclePlate setView={setView} />;
    case 'list':
    default:
      return <ApplicationListView setView={setView} />;
  }
};

export default Applications;