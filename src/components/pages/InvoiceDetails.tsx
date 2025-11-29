import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const InvoiceDetails = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardContent className="p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">INV-NO:7</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">DATE: 20/06/2025</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="default">
              {t('stockReportPrint')}
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-6">{t('customerInfo')}</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="font-semibold">{t('customerName')}: </span>
                <span>John Smith</span>
              </div>
              <div>
                <span className="font-semibold">{t('userEmail')}: </span>
                <span>john.smith@example.com</span>
              </div>
              <div>
                <span className="font-semibold">{t('customerAddress')}: </span>
                <span>221B Baker Street, London, UK</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-6">{t('description')}</h2>
            <p className="text-sm text-center text-muted-foreground mb-6">
              profit = (1000 - 600) * 100 - 500 buy - sell * qty - discount
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('id')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('product')}</TableHead>
                  <TableHead className="text-right">{t('qty')}</TableHead>
                  <TableHead className="text-right">{t('price')}</TableHead>
                  <TableHead className="text-right">{t('total')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>9</TableCell>
                  <TableCell>Laptops</TableCell>
                  <TableCell>Dell Inspiron 15 3520</TableCell>
                  <TableCell className="text-right">100</TableCell>
                  <TableCell className="text-right">1000.00</TableCell>
                  <TableCell className="text-right">100000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{t('totalBeforeDiscount')}</span>
                <span className="font-semibold">100000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{t('discount')}</span>
                <span className="font-semibold">500.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold">{t('totalAfterDiscount')}</span>
                <span className="font-bold">99500.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDetails;
