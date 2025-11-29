export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  path?: string;
}

export interface StatsCard {
  label: string;
  value: number | string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

export interface Product {
  id: number;
  name: string;
  category: string;
  soldQty: number;
  inStock: number;
}