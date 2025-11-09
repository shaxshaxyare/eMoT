
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { View } from '../../types';

interface PortalLayoutProps {
  children: React.ReactNode;
  currentView: View;
  navigate: (view: View) => void;
  onLogout: () => void;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children, currentView, navigate, onLogout }) => {
  return (
    <div className="bg-brand-gray-50 min-h-screen flex text-brand-gray-800">
      <Sidebar currentView={currentView} navigate={navigate} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={onLogout} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;