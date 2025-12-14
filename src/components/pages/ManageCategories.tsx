import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import type { Category } from '@/types';
import { mockCategories } from '@/data/mockCategories';
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
import { CategoryTable } from '@/components/categories/CategoryTable';
import { CategoryDialog } from '@/components/categories/CategoryDialog';
import { DeleteCategoryAlert } from '@/components/categories/DeleteCategoryAlert';
import { toast } from 'sonner';

const ManageCategories = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Dialog states
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Delete alert states
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const filteredCategories = categories.filter((category) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            category.name.toLowerCase().includes(query) ||
            category.description.toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'all' || category.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleAddCategory = () => {
        setEditingCategory(null);
        setIsDialogOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };

    const handleDeleteCategory = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteAlertOpen(true);
    };

    const handleSaveCategory = (data: any) => {
        if (editingCategory) {
            // Update existing
            setCategories(categories.map((cat) =>
                cat.id === editingCategory.id
                    ? { ...cat, ...data }
                    : cat
            ));
            toast.success(t('categoryUpdated'));
        } else {
            // Add new
            const newCategory: Category = {
                id: Math.random().toString(36).substr(2, 9), // Simple random ID
                ...data,
                productCount: 0, // Default 0 for new category
                totalStock: 0,   // Default 0 for new category
            };
            setCategories([...categories, newCategory]);
            toast.success(t('categoryAdded'));
        }
        setIsDialogOpen(false);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
            toast.success(t('categoryDeleted'));
            setCategoryToDelete(null);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <CardTitle>{t('manageCategories')}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('searchCategories')}
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
                                <SelectItem value="active">{t('active')}</SelectItem>
                                <SelectItem value="inactive">{t('inactive')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAddCategory}>
                            <Plus className="h-4 w-4 me-2" />
                            {t('addCategory')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <CategoryTable
                        categories={filteredCategories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                    />
                </CardContent>
            </Card>

            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                category={editingCategory}
                onSave={handleSaveCategory}
            />

            <DeleteCategoryAlert
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDeleteCategory}
                categoryName={categoryToDelete?.name}
            />
        </div>
    );
};

export default ManageCategories;
