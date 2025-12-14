import type { Category } from '../types';

export const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        productCount: 150,
        totalStock: 1200,
        status: 'active'
    },
    {
        id: '2',
        name: 'Clothing',
        description: 'Men and Women fashion',
        productCount: 320,
        totalStock: 5000,
        status: 'active'
    },
    {
        id: '3',
        name: 'Home & Garden',
        description: 'Furniture and home decor',
        productCount: 85,
        totalStock: 450,
        status: 'active'
    },
    {
        id: '4',
        name: 'Books',
        description: 'Fiction, Non-fiction and Educational',
        productCount: 1200,
        totalStock: 8000,
        status: 'inactive'
    },
    {
        id: '5',
        name: 'Sports',
        description: 'Sporting gear and equipment',
        productCount: 45,
        totalStock: 200,
        status: 'active'
    }
];
