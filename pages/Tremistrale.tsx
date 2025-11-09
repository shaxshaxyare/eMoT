
import React from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Download, Search, Filter, Calendar, DollarSign, ChevronRight } from 'lucide-react';

interface TremistraleProps {
  navigate: (view: View) => void;
}

const paymentHistory = [
    { period: 'Q1 2026', plate: 'ABC-4821', amount: 75.00, date: 'N/A', status: 'Due' },
    { period: 'Q1 2026', plate: 'TRK-9023', amount: 120.00, date: 'N/A', status: 'Due' },
    { period: 'Q4 2025', plate: 'ABC-4821', amount: 75.00, date: 'Oct 05, 2025', status: 'Paid', receipt: '#INV-2025-Q4-1' },
    { period: 'Q3 2025', plate: 'ABC-4821', amount: 75.00, date: 'Jul 02, 2025', status: 'Paid', receipt: '#INV-2025-Q3-1' },
    { period: 'Q2 2025', plate: 'ABC-4821', amount: 75.00, date: 'Apr 04, 2025', status: 'Paid', receipt: '#INV-2025-Q2-1' },
    { period: 'Q1 2025', plate: 'ABC-4821', amount: 75.00, date: 'Jan 08, 2025', status: 'Paid', receipt: '#INV-2025-Q1-1' },
    { period: 'Q4 2025', plate: 'TRK-9023', amount: 120.00, date: 'Oct 05, 2025', status: 'Paid', receipt: '#INV-2025-Q4-2' },
];

const Tremistrale: React.FC<TremistraleProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-brand-gray-500">Dashboard / Tremistrale</p>
          <h1 className="text-2xl font-bold">Tremistrale / Quarterly Road Tax</h1>
          <p className="text-brand-gray-600">View and manage your quarterly vehicle tax payments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-brand-gray-500">Next Payment Due</p>
                    <p className="text-xl font-semibold mt-1">Jan 15, 2026</p>
                </div>
                <Calendar className="w-6 h-6 text-brand-gray-400"/>
            </div>
            <p className="text-sm text-brand-gray-500 mt-1">For Q1 2026</p>
        </Card>
         <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-brand-gray-500">Total Amount Due</p>
                    <p className="text-xl font-semibold mt-1">$195.00</p>
                </div>
                <DollarSign className="w-6 h-6 text-brand-gray-400"/>
            </div>
             <p className="text-sm text-brand-gray-500 mt-1">For 2 vehicles</p>
        </Card>
        <Card className="bg-brand-blue-700 text-white">
             <h3 className="font-semibold">Pay for Q1 2026</h3>
             <p className="text-sm text-brand-blue-200 mt-1">Settle your upcoming road tax for all registered vehicles.</p>
             <button onClick={() => navigate('payments')} className="mt-4 w-full bg-white text-brand-blue-700 font-semibold py-2 rounded-lg hover:bg-brand-blue-50 flex items-center justify-center">
                Pay Now <ChevronRight className="w-4 h-4 ml-1"/>
             </button>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
            <input type="text" placeholder="Search by plate or receipt #" className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Filter className="w-4 h-4 mr-1.5"/> Filter by year</button>
            <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100">Export CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
              <tr>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Vehicle Plate</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 font-medium">{item.period}</td>
                  <td className="px-4 py-3">{item.plate}</td>
                  <td className="px-4 py-3">${item.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <Badge variant={item.status === 'Paid' ? 'success' : 'warning'}>{item.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {item.status === 'Paid' ? (
                        <button className="font-medium text-brand-blue-700 hover:underline flex items-center justify-end w-full">
                           <Download className="w-4 h-4 mr-1.5" /> Receipt
                        </button>
                    ) : (
                        <button onClick={() => navigate('payments')} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md hover:bg-brand-gray-100">Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="flex justify-end mt-4">
            <p className="text-xs text-brand-gray-500">Displaying 7 of 20 records.</p>
        </div>
      </Card>
    </div>
  );
};

export default Tremistrale;