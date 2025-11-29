import { MenuItem, StatsCard, Product } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    active: true,
    path: '/'
  },
  {
    id: 'manageSuppliers',
    label: 'Manage Suppliers',
    icon: 'Users',
    active: false,
    path: '/suppliers'
  },
  // ... more menu items
];

export const statsData: StatsCard[] = [
  {
    label: 'totalSales',
    value: 231,
    icon: 'TrendingUp',
    color: 'blue'
  },
  // ... more stats
];