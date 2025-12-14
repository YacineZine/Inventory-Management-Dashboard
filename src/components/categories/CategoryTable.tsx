import { Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Category } from '@/types';
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

interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

const isRTL = localStorage.getItem('language') === 'ar';
console.log(isRTL)

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    const { t } = useTranslation();

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('categoryName')}</TableHead>
                        <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('description')}</TableHead>
                        <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('products')}</TableHead>
                        <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('totalStock')}</TableHead>
                        <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('status')}</TableHead>
                        <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                {t('noCategoriesFound')}
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell className="max-w-[300px] truncate" title={category.description}>
                                    {category.description}
                                </TableCell>
                                <TableCell className="text-start">{category.productCount}</TableCell>
                                <TableCell className="text-start">{category.totalStock}</TableCell>
                                <TableCell>
                                    <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                                        {t(category.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-start">
                                    <div className="flex justify-start gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(category)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => onDelete(category)}
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
