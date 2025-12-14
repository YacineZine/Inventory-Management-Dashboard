import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const topProducts = [
  { name: 'Apple MacBook Air M2', qty: 110 },
  { name: 'Dell Inspiron 15 3520', qty: 100 },
  { name: 'USB-C Charging Cable', qty: 10 },
  { name: 'Samsung Galaxy A52', qty: 5 },
  { name: 'LED Ceiling Light Panel', qty: 4 },
];

const lowProducts = [
  { name: 'IKEA Office Chair', qty: 2 },
  { name: 'LED Ceiling Light Panel', qty: 4 },
  { name: 'Samsung Galaxy A52', qty: 5 },
  { name: 'USB-C Charging Cable', qty: 10 },
  { name: 'Dell Inspiron 15 3520', qty: 100 },
];

export function ProductsTable() {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ArrowUp className="h-5 w-5 text-success" />
          <h3 className="font-semibold">{t('topSelling')}</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-success/10">
              <TableHead className="text-start">{t('product')}</TableHead>
              <TableHead className="text-start">{t('soldQty')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="text-start">{product.name}</TableCell>
                <TableCell className="text-start">{product.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <ArrowDown className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold">{t('lowSelling')}</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-destructive/10">
              <TableHead className="text-start">{t('product')}</TableHead>
              <TableHead className="text-start">{t('soldQty')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="text-start">{product.name}</TableCell>
                <TableCell className="text-start">{product.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
