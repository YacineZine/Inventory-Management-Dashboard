import type { Supplier } from '@/types';

export const initialSuppliers: Supplier[] = [
    {
        id: 1,
        name: "Tech Solutions Inc.",
        contactPerson: "John Doe",
        phone: "+1 234 567 890",
        email: "contact@techsolutions.com",
        address: "123 Tech Park, Silicon Valley, CA",
        status: "active"
    },
    {
        id: 2,
        name: "Global Traders Ltd",
        contactPerson: "Jane Smith",
        phone: "+44 20 7123 4567",
        email: "info@globaltraders.co.uk",
        address: "45 Business Ave, London, UK",
        status: "active"
    },
    {
        id: 3,
        name: "Office Supplies Co",
        contactPerson: "Mike Johnson",
        phone: "+1 555 987 6543",
        email: "sales@officesupplies.com",
        address: "789 Market St, New York, NY",
        status: "inactive"
    }
];
