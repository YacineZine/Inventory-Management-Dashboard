// types/index.ts
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
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