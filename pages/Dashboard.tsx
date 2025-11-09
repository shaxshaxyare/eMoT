
import React from 'react';
import { View } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, ArrowRight } from 'lucide-react';


interface DashboardProps {
  navigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  
  const quickLinks = [
    { text: 'Update Profile' },
    { text: 'View Wallet & Pay' },
    { text: 'New Application' },
  ];

  const recentActivity = [
      {title: "Renewal initiated", status: "In progress", time: "Today at 09:20"},
      {title: "Identity verified", status: "Success", time: "Today at 09:25"},
      {title: "Documents auto-synced", status: "No action", time: "Yesterday"},
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-brand-gray-600">Welcome back, Alex</p>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => navigate('start-new-app')} className="bg-white border border-brand-gray-300 text-brand-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-100 flex items-center">
                <Plus className="w-4 h-4 mr-2"/>
                Start Application
            </button>
            <button onClick={() => navigate('start-new-app')} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
                Start Renewal
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm text-brand-gray-500">Active License</p>
          <p className="text-xl font-semibold mt-1">Driver • Valid</p>
          <p className="text-sm text-brand-gray-500 mt-1">Expires 21 Dec 2025</p>
        </Card>
        <Card>
          <p className="text-sm text-brand-gray-500">Open Applications</p>
          <p className="text-xl font-semibold mt-1">1 in Review</p>
          <p className="text-sm text-brand-gray-500 mt-1">Commercial upgrade</p>
        </Card>
        <Card>
          <p className="text-sm text-brand-gray-500">Outstanding Balance</p>
          <p className="text-xl font-semibold mt-1">$395.00</p>
          <p className="text-sm text-brand-gray-500 mt-1">3 items due</p>
        </Card>
        <Card>
          <p className="text-sm text-brand-gray-500">Upcoming</p>
          <p className="text-xl font-semibold mt-1">Medical Check</p>
          <p className="text-sm text-brand-gray-500 mt-1">Schedule within 14 days</p>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Licenses & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">Your Licenses</h2>
                    <a href="#" className="text-sm text-brand-blue-700 hover:underline">Overview and quick actions</a>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-brand-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">DL-092344-A</p>
                            <p className="text-sm text-brand-gray-600">Driver License</p>
                        </div>
                        <Badge variant="success">Eligible</Badge>
                        <div className="flex space-x-2">
                            <button className="bg-white border border-brand-gray-300 p-2 rounded-lg hover:bg-brand-gray-100">View</button>
                            <button className="bg-brand-blue-700 text-white p-2 rounded-lg hover:bg-brand-blue-800">Start Renewal</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-brand-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">CDL-773221</p>
                            <p className="text-sm text-brand-gray-600">Commercial</p>
                        </div>
                        <Badge variant="warning">Under review</Badge>
                        <div className="flex space-x-2">
                            <button className="bg-white border border-brand-gray-300 p-2 rounded-lg hover:bg-brand-gray-100">View</button>
                            <button className="bg-white border border-brand-gray-300 p-2 rounded-lg hover:bg-brand-gray-100">Track</button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">Recent Activity</h2>
                    <a href="#" className="text-sm text-brand-gray-500">Last 30 days</a>
                </div>
                <div className="space-y-3">
                    {recentActivity.map((activity, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-xs text-brand-gray-500">{activity.time}</p>
                            </div>
                            <Badge variant={activity.status === "Success" ? "success" : activity.status === "In progress" ? "info" : "default"}>
                                {activity.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* Renewal Progress & Quick Links */}
        <div className="space-y-6">
             <Card>
                <h2 className="font-semibold mb-2">Renewal Progress</h2>
                <p className="text-sm text-brand-gray-500 mb-4">Driver License DL-092344-A</p>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 text-xs">✓</div>
                        <span className="font-medium">Verify Identity</span>
                        <Badge variant="success" className="ml-auto">Completed</Badge>
                    </li>
                    <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full border-2 border-brand-blue-600 mr-3"></div>
                        <span className="font-medium text-brand-gray-800">Medical Check</span>
                        <span className="text-sm text-brand-gray-500 ml-auto">Next</span>
                    </li>
                </ul>
                <button className="mt-4 w-full bg-white border border-brand-gray-300 text-brand-gray-700 text-sm py-2 rounded-lg hover:bg-brand-gray-50">
                    Schedule Medical
                </button>
             </Card>
             <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">Quick Links</h2>
                    <a href="#" className="text-sm text-brand-gray-500">Common actions</a>
                </div>
                 <ul className="space-y-2">
                    {quickLinks.map((link, i) => (
                        <li key={i}>
                            <a href="#" className="flex justify-between items-center p-3 rounded-lg hover:bg-brand-gray-100 -m-3">
                                <span className="text-sm font-medium">{link.text}</span>
                                <ArrowRight className="w-4 h-4 text-brand-gray-400" />
                            </a>
                        </li>
                    ))}
                </ul>
             </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;