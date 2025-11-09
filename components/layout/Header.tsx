
import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white border-b border-brand-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
        <input
          type="text"
          placeholder="Search licenses, categories, penalties"
          className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-brand-gray-100">
          <Bell className="w-6 h-6 text-brand-gray-600" />
        </button>
        <div className="relative">
          <button className="flex items-center">
            <img src="https://picsum.photos/id/237/40/40" alt="User" className="w-10 h-10 rounded-full" />
          </button>
          {/* Dropdown menu can be added here */}
        </div>
        <button onClick={onLogout} className="text-sm text-brand-gray-600 hover:text-brand-blue-700">Logout</button>
      </div>
    </header>
  );
};

export default Header;