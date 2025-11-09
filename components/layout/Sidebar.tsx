
import React from 'react';
import { View, NavItem } from '../../types';
import { LayoutDashboard, FileText, Car, ArrowRightLeft, Contact, DownloadCloud, Wallet, LifeBuoy, Receipt } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  navigate: (view: View) => void;
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { name: 'Applications', view: 'applications', icon: FileText },
  { name: 'Vehicles', view: 'vehicles', icon: Car },
  { name: 'Transfers', view: 'transfers', icon: ArrowRightLeft },
  { name: 'Licenses', view: 'licenses', icon: Contact },
  { name: 'Tremistrale', view: 'tremistrale', icon: DownloadCloud },
  { name: 'Wallet', view: 'payments', icon: Wallet },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, navigate }) => {
  const isApplicationsActive = currentView === 'applications' || currentView === 'start-new-app';
  
  return (
    <aside className="w-64 bg-white border-r border-brand-gray-200 flex flex-col">
      <div className="p-4 border-b border-brand-gray-200">
        <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-brand-blue-700" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            <span className="font-bold text-lg text-brand-gray-800">Ministry of Transportation</span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        <p className="px-4 text-xs font-semibold text-brand-gray-500 uppercase tracking-wider">Portal</p>
        <ul className="mt-2">
          {navigationItems.map((item) => (
            <li key={item.name} className="px-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigate(item.view); }}
                className={`flex items-center px-4 py-2.5 my-1 text-sm font-medium rounded-lg transition-colors ${
                  (item.view === 'applications' ? isApplicationsActive : currentView === item.view)
                    ? 'bg-brand-blue-100 text-brand-blue-700'
                    : 'text-brand-gray-600 hover:bg-brand-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-brand-gray-200">
        <div className="bg-brand-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
                <LifeBuoy className="w-5 h-5 text-brand-gray-600 mr-2" />
                <h3 className="font-semibold text-sm">Support</h3>
            </div>
            <p className="text-xs text-brand-gray-500 mb-4">Need help with renewals?</p>
            <button className="w-full bg-white border border-brand-gray-300 text-brand-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-brand-gray-50">
                Contact Helpdesk
            </button>
        </div>
        <div className="flex items-center mt-4 pt-4 border-t border-brand-gray-200">
            <img src="https://picsum.photos/id/237/40/40" alt="User" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
                <p className="font-semibold text-sm">Alex Johnson</p>
                <p className="text-xs text-brand-gray-500">Citizen ID: 9823-44</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;