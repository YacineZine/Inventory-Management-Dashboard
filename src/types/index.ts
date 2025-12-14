export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  path?: string;
}

export interface Product {
  id: number;
  category: string;
  name: string;
  inQty: number;
  outQty: number;
  stock: number;
  supplier: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  totalStock: number;
  status: 'active' | 'inactive';
}

export interface Purchase {
  id: string;
  purchaseOrderNumber: string;
  supplier: string;
  product: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface InvoiceItem {
  id: number;
  category: string;
  productName: string;
  unit: 'PSC' | 'KG';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Customer {
  name: string;
  email: string;
}

export interface Stats {
  totalSales: number;
  movementToday: number;
  invoiceToday: number;
  avgProfitToday: number;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  dir: 'ltr' | 'rtl';
}

export interface StatsCard {
  label: string;
  value: number;
  icon: string;
  color: string;
}