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
import { Textarea } from '@/components/ui/textarea';
import type { Category } from '@/types';
import { toast } from 'sonner';

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
    onSave: (data: Omit<Category, 'id' | 'productCount' | 'totalStock'>) => void;
}

export function CategoryDialog({
    open,
    onOpenChange,
    category,
    onSave,
}: CategoryDialogProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active' as 'active' | 'inactive',
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description,
                status: category.status,
            });
        } else {
            setFormData({
                name: '',
                description: '',
                status: 'active',
            });
        }
    }, [category, open]);

    const handleSave = () => {
        if (!formData.name) {
            toast.error(t('categoryNameRequired'));
            return;
        }
        onSave(formData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {category ? t('editCategory') : t('addCategory')}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="category-name">{t('categoryName')} *</Label>
                        <Input
                            id="category-name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t('enterCategoryName')}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category-desc">{t('description')}</Label>
                        <Textarea
                            id="category-desc"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder={t('enterDescription')}
                            className="resize-none"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category-status">{t('status')}</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: 'active' | 'inactive') =>
                                setFormData({ ...formData, status: value })
                            }
                        >
                            <SelectTrigger id="category-status">
                                <SelectValue placeholder={t('selectStatus')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">{t('active')}</SelectItem>
                                <SelectItem value="inactive">{t('inactive')}</SelectItem>
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
