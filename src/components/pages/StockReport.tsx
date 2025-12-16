import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
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
import { initialStockData } from '@/data/stockData';
import type { StockData } from '@/types';

const StockReport = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const StockData: StockData[] = initialStockData;
  const filteredData = StockData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.supplier.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.product.toLowerCase().includes(query)
    );
  });

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
            <Input
              placeholder={t('search')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-start'>{t('id')}</TableHead>
                  <TableHead className='text-start'>{t('supplierName')}</TableHead>
                  <TableHead className='text-start'>{t('category')}</TableHead>
                  <TableHead className='text-start'>{t('productName')}</TableHead>
                  <TableHead className='text-center'>{t('inQty')}</TableHead>
                  <TableHead className='text-center'>{t('outQty')}</TableHead>
                  <TableHead className='text-center'>{t('stock')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
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
    </div >
  );
};

export default StockReport;
