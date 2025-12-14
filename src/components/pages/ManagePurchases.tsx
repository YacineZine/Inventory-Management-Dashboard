import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import type { Purchase } from '@/types';
import { mockPurchases } from '@/data/mockPurchases';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PurchaseTable } from '@/components/purchases/PurchaseTable';
import { PurchaseDialog } from '@/components/purchases/PurchaseDialog';
import { DeletePurchaseAlert } from '@/components/purchases/DeletePurchaseAlert';
import { toast } from 'sonner';

const ManagePurchases = () => {
    const { t } = useTranslation();
    const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Dialog states
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

    // Delete alert states
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [purchaseToDelete, setPurchaseToDelete] = useState<Purchase | null>(null);

    const filteredPurchases = purchases.filter((purchase) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            purchase.purchaseOrderNumber.toLowerCase().includes(query) ||
            purchase.supplier.toLowerCase().includes(query) ||
            purchase.product.toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleAddPurchase = () => {
        setEditingPurchase(null);
        setIsDialogOpen(true);
    };

    const handleEditPurchase = (purchase: Purchase) => {
        setEditingPurchase(purchase);
        setIsDialogOpen(true);
    };

    const handleDeletePurchase = (purchase: Purchase) => {
        setPurchaseToDelete(purchase);
        setIsDeleteAlertOpen(true);
    };

    const handleSavePurchase = (data: Omit<Purchase, 'id' | 'totalCost'>) => {
        const totalCost = data.quantity * data.unitCost;

        if (editingPurchase) {
            // Update existing
            setPurchases(purchases.map((p) =>
                p.id === editingPurchase.id
                    ? { ...p, ...data, totalCost }
                    : p
            ));
            toast.success(t('purchaseUpdated'));
        } else {
            // Add new
            const newPurchase: Purchase = {
                id: Math.random().toString(36).substr(2, 9),
                ...data,
                totalCost,
            };
            setPurchases([...purchases, newPurchase]);
            toast.success(t('purchaseAdded'));
        }
        setIsDialogOpen(false);
    };

    const confirmDeletePurchase = () => {
        if (purchaseToDelete) {
            setPurchases(purchases.filter((p) => p.id !== purchaseToDelete.id));
            toast.success(t('purchaseDeleted'));
            setPurchaseToDelete(null);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <CardTitle>{t('managePurchases')}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('searchPurchases')}
                                className="ps-10 w-full sm:w-auto"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder={t('status')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('allStatus')}</SelectItem>
                                <SelectItem value="completed">{t('completed')}</SelectItem>
                                <SelectItem value="pending">{t('pending')}</SelectItem>
                                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAddPurchase}>
                            <Plus className="h-4 w-4 me-2" />
                            {t('addPurchase')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <PurchaseTable
                        purchases={filteredPurchases}
                        onEdit={handleEditPurchase}
                        onDelete={handleDeletePurchase}
                    />
                </CardContent>
            </Card>

            <PurchaseDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                purchase={editingPurchase}
                onSave={handleSavePurchase}
            />

            <DeletePurchaseAlert
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDeletePurchase}
                poNumber={purchaseToDelete?.purchaseOrderNumber}
            />
        </div>
    );
};

export default ManagePurchases;
