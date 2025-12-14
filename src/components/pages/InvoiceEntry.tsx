import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const InvoiceEntry = () => {
  const { t } = useTranslation();


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('invoiceEntry')}</CardTitle>
          <Button>{t('add')}</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-start'>{t('category')}</TableHead>
                  <TableHead className='text-start'>{t('productName')}</TableHead>
                  <TableHead className='text-start'>{t('pscKg')}</TableHead>
                  <TableHead className='text-start'>{t('unitPrice')}</TableHead>
                  <TableHead className='text-start'>{t('totalPrice')}</TableHead>
                  <TableHead className='text-start'>{t('action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Select defaultValue="laptops">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laptops">Laptops</SelectItem>
                        <SelectItem value="smartphones">Smartphones</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select defaultValue="dell">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dell">Dell Inspiron 15 3520</SelectItem>
                        <SelectItem value="apple">Apple MacBook Air M2</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue="100" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue="1000" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value="100000" readOnly />
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t('discount')}</Label>
              <Input type="number" defaultValue="500" />
            </div>
            <div className="space-y-2">
              <Label>{t('grandTotal')}</Label>
              <Input type="number" value="100000" readOnly />
            </div>
            <div className="space-y-2">
              <Label>{t('totalAfterDiscount')}</Label>
              <Input type="number" value="99500" readOnly />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('description')}</Label>
            <Textarea
              defaultValue="profit = (1000 - 600) * 100 - 500 buy - sell * qty - discount"
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('paidStatus')}</Label>
              <Select defaultValue="paid">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">{t('paid')}</SelectItem>
                  <SelectItem value="unpaid">{t('unpaid')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('customerName')}</Label>
              <Select defaultValue="john">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="jane">Jane Doe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full md:w-auto bg-success hover:bg-success/90">
            {t('invoiceStore')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceEntry;
