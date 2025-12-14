import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Purchase } from '@/types';
import { toast } from 'sonner';

interface PurchaseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    purchase: Purchase | null;
    onSave: (data: Omit<Purchase, 'id' | 'totalCost'>) => void;
}

export function PurchaseDialog({
    open,
    onOpenChange,
    purchase,
    onSave,
}: PurchaseDialogProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        purchaseOrderNumber: '',
        supplier: '',
        product: '',
        quantity: '',
        unitCost: '',
        date: '',
        status: 'pending' as 'pending' | 'completed' | 'cancelled',
    });

    useEffect(() => {
        if (purchase) {
            setFormData({
                purchaseOrderNumber: purchase.purchaseOrderNumber,
                supplier: purchase.supplier,
                product: purchase.product,
                quantity: purchase.quantity.toString(),
                unitCost: purchase.unitCost.toString(),
                date: purchase.date,
                status: purchase.status,
            });
        } else {
            setFormData({
                purchaseOrderNumber: '',
                supplier: '',
                product: '',
                quantity: '',
                unitCost: '',
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
            });
        }
    }, [purchase, open]);

    const handleSave = () => {
        if (!formData.purchaseOrderNumber || !formData.supplier || !formData.product) {
            toast.error(t('fillRequiredFields'));
            return;
        }

        onSave({
            purchaseOrderNumber: formData.purchaseOrderNumber,
            supplier: formData.supplier,
            product: formData.product,
            quantity: Number(formData.quantity) || 0,
            unitCost: Number(formData.unitCost) || 0,
            date: formData.date,
            status: formData.status,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {purchase ? t('editPurchase') : t('addPurchase')}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="po-number">{t('poNumber')} *</Label>
                            <Input
                                id="po-number"
                                value={formData.purchaseOrderNumber}
                                onChange={(e) => setFormData({ ...formData, purchaseOrderNumber: e.target.value })}
                                placeholder="PO-XXXX-XXX"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">{t('date')} *</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="supplier">{t('supplier')} *</Label>
                            <Input
                                id="supplier"
                                value={formData.supplier}
                                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                placeholder={t('enterSupplier')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="product">{t('product')} *</Label>
                            <Input
                                id="product"
                                value={formData.product}
                                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                placeholder={t('enterProduct')}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">{t('quantity')} *</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="0"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="unit-cost">{t('unitCost')} *</Label>
                            <Input
                                id="unit-cost"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.unitCost}
                                onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="status">{t('status')}</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: 'pending' | 'completed' | 'cancelled') =>
                                setFormData({ ...formData, status: value })
                            }
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder={t('selectStatus')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">{t('pending')}</SelectItem>
                                <SelectItem value="completed">{t('completed')}</SelectItem>
                                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleSave}>{t('save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
