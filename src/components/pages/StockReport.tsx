import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const stockData = [
  {
    id: 1,
    supplier: 'EastAsia Electronics Co.',
    category: 'Smartphones',
    product: 'Samsung Galaxy A52',
    inQty: 5,
    outQty: 5,
    stock: 0,
  },
  {
    id: 2,
    supplier: 'EastAsia Electronics Co.',
    category: 'Accessories',
    product: 'USB-C Charging Cable',
    inQty: 10,
    outQty: 10,
    stock: 0,
  },
  {
    id: 3,
    supplier: 'Nordic Trade Solutions',
    category: 'Furniture',
    product: 'IKEA Office Chair',
    inQty: 2,
    outQty: 2,
    stock: 0,
  },
  {
    id: 4,
    supplier: 'Nordic Trade Solutions',
    category: 'Lighting',
    product: 'LED Ceiling Light Panel',
    inQty: 4,
    outQty: 4,
    stock: 0,
  },
  {
    id: 5,
    supplier: 'Fusion Global Exports',
    category: 'Laptops',
    product: 'Apple MacBook Air M2',
    inQty: 300,
    outQty: 110,
    stock: 190,
  },
  {
    id: 6,
    supplier: 'Al Nour Supplies',
    category: 'Laptops',
    product: 'Dell Inspiron 15 3520',
    inQty: 500,
    outQty: 100,
    stock: 400,
  },
];

const StockReport = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('stockReport')}</CardTitle>
          <Button variant="default">
            {t('stockReportPrint')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('search')} className="pl-10" />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('id')}</TableHead>
                  <TableHead>{t('supplierName')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('productName')}</TableHead>
                  <TableHead className="text-center">{t('inQty')}</TableHead>
                  <TableHead className="text-center">{t('outQty')}</TableHead>
                  <TableHead className="text-center">{t('stock')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-success/10 text-success border-success">
                        {item.inQty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                        {item.outQty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={item.stock === 0 ? 'bg-destructive/10 text-destructive border-destructive' : 'bg-warning/10 text-warning border-warning'}
                      >
                        {item.stock}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button variant="default">{t('addReturns')}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockReport;
