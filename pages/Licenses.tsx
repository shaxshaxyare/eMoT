
import React, { useState } from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, ArrowRight, Download, X } from 'lucide-react';

interface LicensesProps {
  navigate: (view: View) => void;
}

const applicationHistory = [
    { app: 'APP-99124', type: 'License Renewal', submitted: 'Oct 02, 2025', status: 'In Review', action: 'Open' },
    { app: 'APP-97410', type: 'Address Update', submitted: 'Aug 12, 2025', status: 'Completed', action: 'View' },
    { app: 'APP-96002', type: 'Replacement', submitted: 'Jun 25, 2025', status: 'Rejected', action: 'Details' },
];

const Licenses: React.FC<LicensesProps> = ({ navigate }) => {
  const [showDigitalCard, setShowDigitalCard] = useState(false);

  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  };

  const licenseDetails = {
    name: "ALEX JOHNSON",
    licenseNumber: "JNSN-5521-88",
    status: "Active",
    expiration: formatDate("May 14, 2027"),
    issued: formatDate("May 15, 2019"),
    endorsements: "Motorcycle (M)",
    dob: "1980-05-14",
    photoUrl: "https://picsum.photos/id/237/200/200",
    nationality: "MALAYSIA",
    class: "C, M",
    address: "NO. 742, EVERGREEN TERRACE,\nSPRINGFIELD, 12345,\nUNITED STATES",
  };
  
  const DetailItem: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div className="flex flex-col">
        <p className="font-semibold text-gray-500 text-[8px] sm:text-[10px] transform scale-90 origin-left">{label}</p>
        <p className="font-bold text-black text-[10px] sm:text-xs tracking-wider -mt-1">{value}</p>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-brand-gray-500">Dashboard / Licenses</p>
            <h1 className="text-2xl font-bold">Licenses</h1>
          </div>
          <div className="flex space-x-2">
              <button className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100">
                  Back to Dashboard
              </button>
              <button className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800 flex items-center">
                  <Plus className="w-4 h-4 mr-2"/>
                  Start New Application
              </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
              <Card>
                  <div className="flex justify-between items-start">
                      <div>
                          <h2 className="text-lg font-semibold">Primary License</h2>
                          <p className="text-sm text-brand-gray-500">Your current driver license details</p>
                      </div>
                      <div className="flex space-x-2">
                          <Badge variant="default">REAL ID</Badge>
                          <Badge variant="default">Class C</Badge>
                      </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <InfoItem label="Name" value={licenseDetails.name} />
                      <InfoItem label="License #" value={licenseDetails.licenseNumber} />
                      <InfoItem label="Status" value={licenseDetails.status} isBadge={true} />
                      <InfoItem label="Expiration" value={licenseDetails.expiration} />
                      <InfoItem label="Issued" value={licenseDetails.issued} />
                      <InfoItem label="Endorsements" value={licenseDetails.endorsements} />
                  </div>
                  
                  <div className="mt-6 bg-amber-100 text-amber-800 p-3 rounded-lg text-sm">
                      Renewal window opens in 180 days. You'll receive a reminder.
                  </div>

                  <div className="mt-6 flex space-x-4">
                      <button onClick={() => setShowDigitalCard(true)} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex-1 hover:bg-brand-gray-100">View Digital Card</button>
                      <button className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex-1 hover:bg-brand-blue-800">Renew License</button>
                  </div>
              </Card>
          </div>
          <div>
              <Card>
                  <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                  <p className="text-sm text-brand-gray-500 mb-4">Manage your license</p>
                  <ul className="space-y-2">
                      <ActionItem text="Replace lost/stolen license" />
                      <ActionItem text="Update address" />
                      <ActionItem text="Update photo" />
                      <ActionItem text="View driving record (MVR)" />
                  </ul>
                  <button className="mt-4 w-full bg-white border border-brand-gray-300 text-brand-gray-700 text-sm py-2 rounded-lg hover:bg-brand-gray-50 flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                  </button>
              </Card>
          </div>
        </div>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Applications</h2>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                      <tr>
                          <th className="px-4 py-3">Application</th>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3">Submitted</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {applicationHistory.map((item, index) => (
                          <tr key={index} className="border-b">
                              <td className="px-4 py-3 font-medium">{item.app}</td>
                              <td className="px-4 py-3">{item.type}</td>
                              <td className="px-4 py-3">{item.submitted}</td>
                              <td className="px-4 py-3">
                                  <Badge variant={
                                      item.status === 'In Review' ? 'info' :
                                      item.status === 'Completed' ? 'success' :
                                      item.status === 'Rejected' ? 'danger' : 'default'
                                  }>{item.status}</Badge>
                              </td>
                              <td className="px-4 py-3 text-right">
                                  <button className="font-medium text-brand-blue-700 hover:underline">{item.action}</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <h2 className="text-lg font-semibold mb-2">Restrictions & Points</h2>
              <p className="text-sm text-brand-gray-500 mb-4">Driving record summary</p>
              <div className="space-y-3">
                  <RecordItem label="Points on record" value="2" />
                  <RecordItem label="Night driving restriction" value="None" />
                  <RecordItem label="Alcohol-related violations" value="0" />
              </div>
          </Card>
          <Card>
              <h2 className="text-lg font-semibold mb-2">Correspondence</h2>
              <p className="text-sm text-brand-gray-500 mb-4">Notices and reminders</p>
              <div className="space-y-3">
                  <RecordItem label="Renewal reminder" value="Scheduled for Nov 15, 2026" />
                  <RecordItem label="Address confirmation sent" value="Aug 12, 2025" />
              </div>
          </Card>
        </div>
      </div>

      {showDigitalCard && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" 
          aria-labelledby="digital-license-title" 
          role="dialog" 
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all" role="document">
            <div className="p-5 border-b flex justify-between items-center">
              <h2 id="digital-license-title" className="text-lg font-semibold text-brand-gray-800">Digital Driver License</h2>
              <button 
                onClick={() => setShowDigitalCard(false)} 
                className="p-1 rounded-full hover:bg-brand-gray-100 text-brand-gray-500"
                aria-label="Close digital license view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-brand-gray-100">
                <div 
                    className="relative font-sans text-black bg-gradient-to-br from-[#fceeda] to-[#fde5e5] aspect-[85.6/54] w-full rounded-xl p-3 sm:p-4 overflow-hidden shadow-lg border border-gray-200"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                >
                    <div 
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 C 25 25, 75 75, 100 50 M-50 50 C -25 25, 25 75, 50 50' stroke='%23000' stroke-width='1' fill='none'/%3E%3C/svg%3E\")" }}
                    ></div>
                     <div className="absolute -right-1/4 -top-1/4 w-3/5 h-3/5 bg-radial-gradient-yellow opacity-20 rounded-full" style={{backgroundImage: 'radial-gradient(circle, rgba(255,223,0,0.5) 0%, rgba(255,223,0,0) 70%)'}}></div>

                    <header className="flex justify-between items-start">
                        <div className="flex items-start space-x-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Coat_of_arms_of_Malaysia.svg/120px-Coat_of_arms_of_Malaysia.svg.png" alt="Coat of Arms" className="h-10 sm:h-12"/>
                            <div>
                                <p className="font-bold text-sm sm:text-base tracking-wide">LESEN MEMANDU</p>
                                <p className="text-xs sm:text-sm font-semibold tracking-wide">DRIVING LICENCE</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="relative inline-block group">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/150px-Flag_of_Malaysia.svg.png" alt="Malaysian Flag" className="h-6 sm:h-8"/>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/50 via-pink-400/50 to-yellow-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
                            </div>
                            <p className="font-black text-2xl sm:text-3xl text-[#0033A0] tracking-wider mt-1">MALAYSIA</p>
                        </div>
                    </header>

                    <main className="flex mt-2 sm:mt-4 space-x-3 sm:space-x-4">
                        <div className="w-1/4 flex-shrink-0">
                             <img src={licenseDetails.photoUrl} alt="Alex Johnson" className="w-full border-2 border-white/50 rounded-md" />
                        </div>
                        <div className="flex-1 relative -mt-1">
                            <p className="font-bold text-[11px] sm:text-base leading-tight uppercase">{licenseDetails.name}</p>
                            <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 mt-1">
                                <DetailItem label="Warganegara / Nationality" value={licenseDetails.nationality} />
                                <DetailItem label="No. Pengenalan / Identity No." value={licenseDetails.licenseNumber} />
                                <DetailItem label="Kelas / Class" value={licenseDetails.class} />
                                <DetailItem label="Tempoh / Validity" value={`${licenseDetails.issued} - ${licenseDetails.expiration}`} />
                            </div>
                             <div className="mt-1">
                                <p className="font-semibold text-gray-500 text-[8px] sm:text-[10px] transform scale-90 origin-left">Alamat / Address</p>
                                <p className="font-bold uppercase text-[9px] sm:text-[11px] leading-snug whitespace-pre-line -mt-1">{licenseDetails.address}</p>
                            </div>
                            <img src="https://api.iconify.design/mdi:flower-hibiscus.svg?color=%238c5a2b" alt="Hibiscus" className="absolute -bottom-1 -right-1 h-8 sm:h-12 opacity-30"/>
                        </div>
                    </main>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const InfoItem: React.FC<{label: string, value: string, isBadge?: boolean}> = ({label, value, isBadge}) => (
    <>
        <p className="text-brand-gray-500">{label}</p>
        <div className="text-right">
            {isBadge ? <Badge variant="success">{value}</Badge> : <p className="font-medium">{value}</p>}
        </div>
    </>
)

const ActionItem: React.FC<{text: string}> = ({text}) => (
    <li>
        <a href="#" className="flex justify-between items-center p-3 rounded-lg hover:bg-brand-gray-100 -m-3">
            <span className="text-sm font-medium">{text}</span>
            <ArrowRight className="w-4 h-4 text-brand-gray-400" />
        </a>
    </li>
)

const RecordItem: React.FC<{label: string, value: string | number}> = ({label, value}) => (
    <div className="flex justify-between items-center bg-brand-gray-50 p-3 rounded-lg text-sm">
        <p className="text-brand-gray-600">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
)

export default Licenses;