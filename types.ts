import React from 'react';

export type View = 
  // Citizen Portal
  | 'landing' | 'signin' | 'signup' | 'dashboard' | 'applications' | 'vehicles' 
  | 'licenses' | 'transfers' | 'tremistrale' | 'payments' | 'start-new-app' 
  | 'add-vehicle' | 'vehicle-registration'
  // Staff Portal
  | 'staff-dashboard'
  | 'tasks'
  | 'task-detail'
  | 'workflows'
  | 'notifications'
  // Vehicle Registration
  | 'staff-applications'
  | 'verification'
  | 'inspections'
  | 'approvals'
  | 'certificates'
  | 'vehicle-registry'
  | 'ownership-transfer'
  | 'plate-management'
  // Driver Licensing
  | 'licensing-applications'
  | 'licensing-verification'
  | 'testing'
  | 'results-decisions'
  | 'license-issuance'
  | 'renewals-expiry'
  | 'disciplinary'
  // Tremistrale (Road Tax)
  | 'tax-dashboard'
  | 'invoices'
  | 'payment-verification'
  | 'compliance'
  // Engineering
  | 'projects'
  | 'maintenance-requests'
  | 'assets-equipment'
  // Meteorology
  | 'data-entry'
  | 'forecasts-alerts'
  // Planning & Policy
  | 'annual-plans'
  | 'policy-docs'
  // Finance & Administration
  | 'payroll'
  | 'procurement'
  | 'budget-revenue'
  | 'wallet-management'
  // Documents & Certificates
  | 'document-generator'
  | 'e-signatures'
  // Users & Access
  | 'user-management'
  | 'roles-permissions'
  | 'activity-logs'
  // Reports & Analytics
  | 'operational-reports'
  | 'financial-reports'
  | 'exports'
  // System
  | 'settings'
  | 'integrations'
  | 'backups-audit'
  | 'fee-management';

export type UserType = 'citizen' | 'staff';

export interface NavItem {
  name: string;
  view: View;
  // FIX: Use React.ReactElement instead of JSX.Element to avoid issues with JSX namespace resolution.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface Task {
  id: string;
  applicantName: string;
  service: string;
  submittedDate: string;
  dueDate: string;
  status: 'in-progress' | 'available' | 'team' | 'completed';
  assignee: string;
  nextStep: string;
}

export interface WorkflowInstance {
  id: string;
  service: string;
  applicant: string;
  stage: 'Intake' | 'Verification' | 'Inspection' | 'Approval' | 'Issuance';
  owner: string;
  progress: number;
  slaStatus: 'Healthy' | 'At Risk' | 'Breached';
}

export interface VehicleApplication {
  id: string;
  applicant: {
    name: string;
    id: string;
    avatarUrl: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    vin: string;
  };
  service: 'New Registration' | 'Ownership Transfer' | 'Plate Replacement';
  submitted: string; // date string
  status: 'Pending Verification' | 'Pending Inspection' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Needs Info';
  assignee: string | null; // staff member name or null if unassigned
  slaDaysLeft: number;
  documents: { name: string; type: string; url: string }[];
}

export interface Notification {
    id: string;
    type: 'SLA' | 'New Task' | 'Mention' | 'Approval';
    message: string;
    context: string; // e.g., Application ID or User Name
    timestamp: string;
    isRead: boolean;
}

export interface LicenseApplication {
  id: string;
  applicant: {
    name: string;
    id: string;
    avatarUrl: string;
  };
  type: 'New' | 'Renewal' | 'Upgrade';
  licenseClass: 'A' | 'B' | 'C' | 'D' | 'E';
  submitted: string;
  status: 'Pending Verification' | 'Pending Test' | 'Pending Decision' | 'Approved' | 'Rejected' | 'Issued';
  assignee: string | null;
  slaDaysLeft: number;
  documents: { name: string; type: 'ID' | 'Medical' | 'Photo' | 'Residency'; url: string }[];
  testResults?: {
    theory: 'Pass' | 'Fail' | 'Pending';
    practical: 'Pass' | 'Fail' | 'Pending';
  };
}

export interface DrivingTest {
  id: string;
  applicant: {
    name: string;
    id: string;
    appId: string;
  };
  testType: 'Theory' | 'Practical';
  licenseClass: 'A' | 'B' | 'C' | 'D' | 'E';
  scheduledTime: string; // ISO string for datetime
  status: 'Scheduled' | 'Completed';
  result: 'Pass' | 'Fail' | null;
  score: number | null;
  examiner: string;
}

export interface LicenseRecord {
  id: string;
  holder: {
    name: string;
    id: string;
  };
  licenseNumber: string;
  licenseClass: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Suspended' | 'Revoked';
  renewalStatus?: 'Pending' | 'Not Started' | 'Completed';
}

export interface DisciplinaryAction {
  id: string;
  license: LicenseRecord;
  actionType: 'Suspension' | 'Revocation' | 'Reinstatement' | 'Points Added';
  reason: string;
  effectiveDate: string;
  endDate?: string; // only for suspension
  points?: number;
}

export interface RoadTaxInvoice {
  id: string;
  vehicle: {
    plate: string;
    make: string;
    model: string;
  };
  owner: {
    name: string;
    id: string;
  };
  period: string; // e.g., 'Q1 2026'
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Overdue';
  paymentDate?: string;
  isCancelled?: boolean;
}

export interface TaxPaymentRecord {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: 'EVC' | 'eDahab' | 'Zaad';
  transactionId: string;
  timestamp: string;
  status: 'Pending Verification' | 'Verified' | 'Failed';
}

export interface WalletTopUpRequest {
  id: string;
  user: {
    name: string;
    id: string;
  };
  amount: number;
  paymentMethod: string;
  submittedDate: string;
  transactionId: string;
  proofUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface EngineeringProject {
  id: string;
  name: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  startDate: string;
  endDate: string;
  manager: string;
  progress: number;
}

export interface MaintenanceRequest {
  id: string;
  asset: string; // Could be asset ID
  issue: string;
  reportedBy: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string | null;
}

export interface MinistryAsset {
  id: string;
  name: string;
  type: 'Vehicle' | 'Building' | 'Equipment';
  location: string;
  status: 'Operational' | 'Under Maintenance' | 'Decommissioned';
  lastMaintenance: string;
}

export interface WeatherDataPoint {
  id: string;
  date: string;
  temperature: number; // Celsius
  humidity: number; // Percentage
  windSpeed: number; // km/h
  precipitation: number; // mm
  recordedBy: string;
}

export interface WeatherForecast {
  id: string;
  date: string;
  title: string;
  summary: string;
  issuedBy: string;
  status: 'Draft' | 'Published' | 'Archived';
  severity?: 'Low' | 'Moderate' | 'High' | 'Severe'; // For alerts
}

export interface AnnualPlan {
  id: string;
  year: number;
  title: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Active';
  progress: number;
  objectives: { id: string; text: string; completed: boolean }[];
}

export interface PolicyDocument {
  id: string;
  title: string;
  version: string;
  status: 'Draft' | 'In Review' | 'Published' | 'Archived';
  lastUpdated: string;
  author: string;
}

export interface ProcurementRequest {
  id: string;
  department: 'Engineering' | 'IT' | 'Admin' | 'Meteorology';
  item: string;
  quantity: number;
  requestor: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled';
}

export interface BudgetLineItem {
  department: 'Engineering' | 'Licensing' | 'Admin' | 'IT' | 'Road Tax';
  budget: number;
  spent: number;
}

export interface TemplateElement {
  id: string;
  type: 'text' | 'field' | 'logo' | 'signature' | 'stamp' | 'qrcode';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string; // Text content, field name (e.g., {{Owner Name}}), or image URL
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  fontFamily: string;
  color: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface DocumentTemplate {
  id: string;
  name: string;
  category: 'Vehicle' | 'License' | 'Official';
  elements: TemplateElement[];
  page: {
    width: number;
    height: number;
    backgroundImage?: string;
    backgroundOpacity?: number;
  };
}


export interface SignatureRequest {
  id: string;
  documentName: string;
  requestor: string;
  date: string;
  status: 'Pending' | 'Signed' | 'Rejected';
}

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  userType: 'Citizen' | 'Staff';
  lastLogin: string;
}

export interface AccessRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface ActivityLog {
  id: string;
  user: {
    name: string;
    id: string;
  };
  action: string;
  target: string; // e.g., 'Application APP-VR-001'
  timestamp: string;
  ipAddress: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'Payment Gateway' | 'SMS Provider' | 'ID Verification';
  status: 'Connected' | 'Disconnected' | 'Error';
}

export interface BackupJob {
  id: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'In Progress';
  size: string; // e.g., '2.5 GB'
  type: 'Automatic' | 'Manual';
}

export interface Report {
  id: string;
  name: string;
  generatedBy: string;
  date: string;
  format: 'PDF' | 'CSV';
}

export interface ExportJob {
  id: string;
  dataset: string;
  status: 'In Progress' | 'Completed' | 'Failed';
  requestedBy: string;
  date: string;
  format: 'CSV' | 'XLSX' | 'PDF';
}