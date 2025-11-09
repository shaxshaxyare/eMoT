import { WalletTopUpRequest } from '../types';

export let mockWalletTopUps: WalletTopUpRequest[] = [
    {
        id: 'WTR-001',
        user: { name: 'Alex Johnson', id: '9823-44' },
        amount: 50.00,
        paymentMethod: 'EVC Plus',
        submittedDate: '2025-11-22 14:30',
        transactionId: 'EVC-TRN-11223344',
        proofUrl: 'https://i.imgur.com/a9N4wS4.jpeg',
        status: 'Pending',
    },
    {
        id: 'WTR-002',
        user: { name: 'Farhiya Jaamac', id: 'FJ-5432-10' },
        amount: 100.00,
        paymentMethod: 'eDahab',
        submittedDate: '2025-11-22 11:15',
        transactionId: 'EDH-TRN-55667788',
        proofUrl: 'https://i.imgur.com/a9N4wS4.jpeg',
        status: 'Pending',
    },
    {
        id: 'WTR-003',
        user: { name: 'Axmed Cumar', id: 'AC-9876-54' },
        amount: 25.50,
        paymentMethod: 'Zaad',
        submittedDate: '2025-11-21 18:00',
        transactionId: 'ZAAD-TRN-99001122',
        proofUrl: 'https://i.imgur.com/a9N4wS4.jpeg',
        status: 'Pending',
    },
];
