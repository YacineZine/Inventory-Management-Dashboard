import type { Purchase } from '../types';

export const mockPurchases: Purchase[] = [
    {
        id: '1',
        purchaseOrderNumber: 'PO-2023-001',
        supplier: 'Tech Solutions Ltd.',
        product: 'Laptop Pro 15"',
        quantity: 10,
        unitCost: 950.00,
        totalCost: 9500.00,
        date: '2023-10-25',
        status: 'completed'
    },
    {
        id: '2',
        purchaseOrderNumber: 'PO-2023-002',
        supplier: 'Fashion Hub',
        product: 'Cotton T-Shirt',
        quantity: 50,
        unitCost: 10.00,
        totalCost: 500.00,
        date: '2023-10-28',
        status: 'pending'
    },
    {
        id: '3',
        purchaseOrderNumber: 'PO-2023-003',
        supplier: 'Global Imports',
        product: 'Wireless Mouse',
        quantity: 25,
        unitCost: 15.00,
        totalCost: 375.00,
        date: '2023-11-02',
        status: 'completed'
    },
    {
        id: '4',
        purchaseOrderNumber: 'PO-2023-004',
        supplier: 'Office Depot',
        product: 'Office Chair',
        quantity: 5,
        unitCost: 120.00,
        totalCost: 600.00,
        date: '2023-11-05',
        status: 'cancelled'
    },
    {
        id: '5',
        purchaseOrderNumber: 'PO-2023-005',
        supplier: 'Tech Solutions Ltd.',
        product: 'Monitor 27"',
        quantity: 15,
        unitCost: 200.00,
        totalCost: 3000.00,
        date: '2023-11-10',
        status: 'completed'
    }
];
