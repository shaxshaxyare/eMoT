import { RoadTaxInvoice, TaxPaymentRecord } from '../types';

export let mockInvoices: RoadTaxInvoice[] = [
    { id: 'INV-Q1-001', vehicle: { plate: 'ABC-4821', make: 'Toyota', model: 'Camry' }, owner: { name: 'Axmed Cumar', id: 'AC-9876-54' }, period: 'Q1 2026', amount: 75.00, dueDate: '2026-01-15', status: 'Due' },
    { id: 'INV-Q1-002', vehicle: { plate: 'TRK-9023', make: 'Ford', model: 'F-150' }, owner: { name: 'Farhiya Jaamac', id: 'FJ-5432-10' }, period: 'Q1 2026', amount: 120.00, dueDate: '2026-01-15', status: 'Overdue' },
    { id: 'INV-Q4-001', vehicle: { plate: 'VAN-3312', make: 'Honda', model: 'Odyssey' }, owner: { name: 'Xaliimo Aadan', id: 'XA-2468-10' }, period: 'Q4 2025', amount: 90.00, dueDate: '2025-10-15', status: 'Paid', paymentDate: '2025-10-10' },
    { id: 'INV-Q4-002', vehicle: { plate: 'ABC-4821', make: 'Toyota', model: 'Camry' }, owner: { name: 'Axmed Cumar', id: 'AC-9876-54' }, period: 'Q4 2025', amount: 75.00, dueDate: '2025-10-15', status: 'Paid', paymentDate: '2025-10-08' },
];

export let mockPayments: TaxPaymentRecord[] = [
    { id: 'TP-001', invoiceId: 'INV-Q1-003', amount: 75.00, paymentMethod: 'EVC', transactionId: 'EVC-998877', timestamp: '2025-11-22 10:30', status: 'Pending Verification' },
    { id: 'TP-002', invoiceId: 'INV-Q1-004', amount: 150.00, paymentMethod: 'eDahab', transactionId: 'EDH-112233', timestamp: '2025-11-22 09:15', status: 'Pending Verification' },
];

export const registeredVehicles = [
    { plate: 'ABC-4821', make: 'Toyota', model: 'Camry', owner: { name: 'Axmed Cumar', id: 'AC-9876-54' } },
    { plate: 'TRK-9023', make: 'Ford', model: 'F-150', owner: { name: 'Farhiya Jaamac', id: 'FJ-5432-10' } },
    { plate: 'VAN-3312', make: 'Honda', model: 'Odyssey', owner: { name: 'Xaliimo Aadan', id: 'XA-2468-10' } },
];
