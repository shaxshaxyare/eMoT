
import React, { useState, useCallback, Suspense } from 'react';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Vehicles from './pages/Vehicles';
import Licenses from './pages/Licenses';
import Tremistrale from './pages/Tremistrale';
import Payments from './pages/Payments';
import PortalLayout from './components/layout/PortalLayout';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { View, UserType, Task as TaskType } from './types';
import FeeManagement from './pages/FeeManagement';
import StaffPortalLayout from './components/layout/StaffPortalLayout';
import StaffDashboard from './pages/StaffDashboard';
import StaffApplications from './pages/StaffApplications';

// Import all the new staff pages
import Tasks from './pages/staff/Tasks';
import Workflows from './pages/staff/Workflows';
import Notifications from './pages/staff/Notifications';
import Verification from './pages/staff/Verification';
import Inspections from './pages/staff/Inspections';
import Approvals from './pages/staff/Approvals';
import Certificates from './pages/staff/Certificates';
import VehicleRegistry from './pages/staff/VehicleRegistry';
import OwnershipTransfer from './pages/staff/OwnershipTransfer';
import PlateManagement from './pages/staff/PlateManagement';
import LicensingApplications from './pages/staff/LicensingApplications';
import LicensingVerification from './pages/staff/LicensingVerification';
import Testing from './pages/staff/Testing';
import ResultsDecisions from './pages/staff/ResultsDecisions';
import LicenseIssuance from './pages/staff/LicenseIssuance';
import RenewalsExpiry from './pages/staff/RenewalsExpiry';
import Disciplinary from './pages/staff/Disciplinary';
import TaxDashboard from './pages/staff/TaxDashboard';
import Invoices from './pages/staff/Invoices';
import PaymentVerification from './pages/staff/PaymentVerification';
import Compliance from './pages/staff/Compliance';
import Projects from './pages/staff/Projects';
import MaintenanceRequests from './pages/staff/MaintenanceRequests';
import AssetsEquipment from './pages/staff/AssetsEquipment';
import DataEntry from './pages/staff/DataEntry';
import ForecastsAlerts from './pages/staff/ForecastsAlerts';
import AnnualPlans from './pages/staff/AnnualPlans';
import PolicyDocs from './pages/staff/PolicyDocs';
import Payroll from './pages/staff/Payroll';
import Procurement from './pages/staff/Procurement';
import BudgetRevenue from './pages/staff/BudgetRevenue';
import DocumentGenerator from './pages/staff/DocumentGenerator';
import ESignatures from './pages/staff/ESignatures';
import UserManagement from './pages/staff/UserManagement';
import RolesPermissions from './pages/staff/RolesPermissions';
import ActivityLogs from './pages/staff/ActivityLogs';
import OperationalReports from './pages/staff/OperationalReports';
import FinancialReports from './pages/staff/FinancialReports';
import Exports from './pages/staff/Exports';
const Settings = React.lazy(() => import('./pages/staff/Settings'));
import Integrations from './pages/staff/Integrations';
import BackupsAudit from './pages/staff/BackupsAudit';
import TaskDetailPage from './pages/staff/TaskDetailPage';
import WalletManagement from './pages/staff/WalletManagement';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>('citizen');
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<TaskType | null>(null);

  const handleLogin = useCallback((type: UserType) => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentView(type === 'citizen' ? 'dashboard' : 'staff-dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  }, []);

  const navigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleViewTaskDetails = useCallback((task: TaskType) => {
    setSelectedTaskForDetail(task);
    setCurrentView('task-detail');
  }, []);

  const renderCitizenView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'applications':
        return <Applications navigate={navigate} />;
      case 'start-new-app':
        return <Applications navigate={navigate} initialView="start-new" />;
      case 'vehicle-registration':
        return <Applications navigate={navigate} initialView="vehicle-registration" />;
      case 'vehicles':
        return <Vehicles navigate={navigate} />;
      case 'licenses':
        return <Licenses navigate={navigate} />;
      case 'tremistrale':
        return <Tremistrale navigate={navigate} />;
      case 'payments':
        return <Payments navigate={navigate} />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  const renderStaffView = () => {
    switch (currentView) {
        case 'staff-dashboard': return <StaffDashboard navigate={navigate} />;
        case 'tasks': return <Tasks onViewDetails={handleViewTaskDetails} />;
        case 'task-detail': 
            if (selectedTaskForDetail) {
                return <TaskDetailPage task={selectedTaskForDetail} onBack={() => navigate('tasks')} />;
            }
            return <Tasks onViewDetails={handleViewTaskDetails} />; // Fallback
        case 'workflows': return <Workflows />;
        case 'notifications': return <Notifications />;
        case 'staff-applications': return <StaffApplications navigate={navigate} />;
        case 'verification': return <Verification navigate={navigate} />;
        case 'inspections': return <Inspections navigate={navigate} />;
        case 'approvals': return <Approvals navigate={navigate} />;
        case 'certificates': return <Certificates navigate={navigate} />;
        case 'vehicle-registry': return <VehicleRegistry navigate={navigate} />;
        case 'ownership-transfer': return <OwnershipTransfer navigate={navigate} />;
        case 'plate-management': return <PlateManagement navigate={navigate} />;
        case 'licensing-applications': return <LicensingApplications navigate={navigate} />;
        case 'licensing-verification': return <LicensingVerification navigate={navigate} />;
        case 'testing': return <Testing navigate={navigate} />;
        case 'results-decisions': return <ResultsDecisions navigate={navigate} />;
        case 'license-issuance': return <LicenseIssuance navigate={navigate} />;
        case 'renewals-expiry': return <RenewalsExpiry navigate={navigate} />;
        case 'disciplinary': return <Disciplinary navigate={navigate} />;
        case 'tax-dashboard': return <TaxDashboard navigate={navigate}/>;
        case 'invoices': return <Invoices navigate={navigate} />;
        case 'payment-verification': return <PaymentVerification navigate={navigate} />;
        case 'compliance': return <Compliance navigate={navigate} />;
        case 'projects': return <Projects navigate={navigate}/>;
        case 'maintenance-requests': return <MaintenanceRequests navigate={navigate} />;
        case 'assets-equipment': return <AssetsEquipment navigate={navigate} />;
        case 'data-entry': return <DataEntry navigate={navigate}/>;
        case 'forecasts-alerts': return <ForecastsAlerts navigate={navigate} />;
        case 'annual-plans': return <AnnualPlans navigate={navigate}/>;
        case 'policy-docs': return <PolicyDocs navigate={navigate} />;
        case 'payroll': return <Payroll navigate={navigate} />;
        case 'procurement': return <Procurement navigate={navigate} />;
        case 'budget-revenue': return <BudgetRevenue navigate={navigate} />;
        case 'document-generator': return <DocumentGenerator navigate={navigate} />;
        case 'e-signatures': return <ESignatures navigate={navigate} />;
        case 'user-management': return <UserManagement navigate={navigate} />;
        case 'roles-permissions': return <RolesPermissions navigate={navigate} />;
        case 'activity-logs': return <ActivityLogs navigate={navigate} />;
        case 'operational-reports': return <OperationalReports navigate={navigate}/>;
        case 'financial-reports': return <FinancialReports navigate={navigate} />;
        case 'exports': return <Exports navigate={navigate} />;
        case 'settings': 
            return (
                <Suspense fallback={<div>Loading...</div>}>
                    <Settings navigate={navigate} />
                </Suspense>
            );
        case 'integrations': return <Integrations navigate={navigate} />;
        case 'backups-audit': return <BackupsAudit navigate={navigate} />;
        case 'fee-management': return <FeeManagement navigate={navigate} />;
        case 'wallet-management': return <WalletManagement navigate={navigate} />;
        default: return <StaffDashboard navigate={navigate} />;
    }
  };

  if (!isAuthenticated) {
    switch (currentView) {
      case 'signin':
        return <SignIn navigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignUp navigate={navigate} onSignUp={() => handleLogin('citizen')} />;
      default:
        return <LandingPage navigate={navigate} />;
    }
  }
  
  if (userType === 'staff') {
    return (
        <StaffPortalLayout currentView={currentView} navigate={navigate} onLogout={handleLogout}>
            {renderStaffView()}
        </StaffPortalLayout>
    );
  }

  return (
    <PortalLayout currentView={currentView} navigate={navigate} onLogout={handleLogout}>
      {renderCitizenView()}
    </PortalLayout>
  );
};

export default App;