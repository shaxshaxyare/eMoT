import React from 'react';
import { View } from '../../types';
import { 
    LayoutDashboard, CheckSquare, GitBranch, Car, Contact,
    DownloadCloud, Briefcase, Cloud, List, Banknote, FileText,
    Users, BarChart2, Settings
} from 'lucide-react';

interface StaffSidebarProps {
  currentView: View;
  navigate: (view: View) => void;
}

const topLevelNavItems = [
    { name: 'Dashboard', view: 'staff-dashboard', icon: LayoutDashboard },
    { name: 'Tasks', view: 'tasks', icon: CheckSquare },
    { name: 'Workflows', view: 'workflows', icon: GitBranch },
    { name: 'Vehicle Registration', view: 'staff-applications', icon: Car },
    { name: 'Driver Licensing', view: 'licensing-applications', icon: Contact },
    { name: 'Road Tax (Tremistrale)', view: 'tax-dashboard', icon: DownloadCloud },
    { name: 'Engineering', view: 'projects', icon: Briefcase },
    { name: 'Meteorology', view: 'data-entry', icon: Cloud },
    { name: 'Planning & Policy', view: 'annual-plans', icon: List },
    { name: 'Finance & Administration', view: 'payroll', icon: Banknote },
    { name: 'Documents & Certificates', view: 'document-generator', icon: FileText },
    { name: 'Users & Access', view: 'user-management', icon: Users },
    { name: 'Reports & Analytics', view: 'operational-reports', icon: BarChart2 },
    { name: 'System Settings', view: 'settings', icon: Settings },
];

const StaffSidebar: React.FC<StaffSidebarProps> = ({ currentView, navigate }) => {
  return (
    <aside className="w-64 bg-white border-r border-brand-gray-200 flex flex-col">
      <div className="p-4 border-b border-brand-gray-200">
        <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-brand-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            <span className="font-bold text-lg text-brand-gray-800">Staff Portal</span>
        </div>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-brand-gray-500 uppercase tracking-wider">Menu</p>
          <ul className="mt-2">
          {topLevelNavItems.map((item) => (
              <li key={item.name} className="px-2">
              <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate(item.view); }}
                  className={`flex items-center px-4 py-2.5 my-1 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.view
                      ? 'bg-brand-blue-100 text-brand-blue-700'
                      : 'text-brand-gray-600 hover:bg-brand-gray-100'
                  }`}
              >
                  <item.icon className="w-5 h-5 mr-3 shrink-0" />
                  <span>{item.name}</span>
              </a>
              </li>
          ))}
          </ul>
      </nav>
      <div className="p-4 border-t border-brand-gray-200 mt-auto">
        <div className="flex items-center">
            <img src="https://i.pravatar.cc/40?u=staff" alt="Staff User" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
                <p className="font-semibold text-sm">Demo Staff</p>
                <p className="text-xs text-brand-gray-500">Administrator</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default StaffSidebar;