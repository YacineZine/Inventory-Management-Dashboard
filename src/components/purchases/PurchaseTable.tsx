import { Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Purchase } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PurchaseTableProps {
    purchases: Purchase[];
    onEdit: (purchase: Purchase) => void;
    onDelete: (purchase: Purchase) => void;
}

export function PurchaseTable({ purchases, onEdit, onDelete }: PurchaseTableProps) {
    const { t } = useTranslation();

    const getStatusBadgeVariant = (status: Purchase['status']) => {
        switch (status) {
            case 'completed':
                return 'default'; // or a success color if customized
            case 'pending':
                return 'secondary'; // warning color often better but default to secondary
            case 'cancelled':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start">{t('poNumber')}</TableHead>
                        <TableHead className="text-start">{t('date')}</TableHead>
                        <TableHead className="text-start">{t('supplier')}</TableHead>
                        <TableHead className="text-start">{t('product')}</TableHead>
                        <TableHead className="text-start">{t('quantity')}</TableHead>
                        <TableHead className="text-start">{t('totalCost')}</TableHead>
                        <TableHead className="text-start">{t('status')}</TableHead>
                        <TableHead className="text-start">{t('actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {purchases.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                {t('noPurchasesFound')}
                            </TableCell>
                        </TableRow>
                    ) : (
                        purchases.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell className="font-medium">{purchase.purchaseOrderNumber}</TableCell>
                                <TableCell>{purchase.date}</TableCell>
                                <TableCell>{purchase.supplier}</TableCell>
                                <TableCell>{purchase.product}</TableCell>
                                <TableCell className="text-right">{purchase.quantity}</TableCell>
                                <TableCell className="text-right">${purchase.totalCost.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(purchase.status)}>
                                        {t(purchase.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(purchase)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => onDelete(purchase)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
