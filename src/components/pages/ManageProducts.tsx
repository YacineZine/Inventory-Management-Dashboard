import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  status: 'active' | 'inactive';
}

const categories = ['Electronics', 'Clothing', 'Food & Beverages', 'Home & Garden', 'Sports', 'Other'];

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro 15"',
    sku: 'ELEC-001',
    category: 'Electronics',
    price: 1299.99,
    costPrice: 950.00,
    stockQuantity: 45,
    minStockLevel: 10,
    status: 'active',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    sku: 'ELEC-002',
    category: 'Electronics',
    price: 29.99,
    costPrice: 15.00,
    stockQuantity: 8,
    minStockLevel: 20,
    status: 'active',
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    sku: 'CLTH-001',
    category: 'Clothing',
    price: 24.99,
    costPrice: 10.00,
    stockQuantity: 150,
    minStockLevel: 30,
    status: 'active',
  },
  {
    id: 4,
    name: 'Organic Coffee Beans',
    sku: 'FOOD-001',
    category: 'Food & Beverages',
    price: 18.99,
    costPrice: 8.50,
    stockQuantity: 5,
    minStockLevel: 15,
    status: 'active',
  },
  {
    id: 5,
    name: 'Garden Hose 50ft',
    sku: 'HOME-001',
    category: 'Home & Garden',
    price: 45.00,
    costPrice: 22.00,
    stockQuantity: 0,
    minStockLevel: 5,
    status: 'inactive',
  },
  {
    id: 6,
    name: 'Running Shoes',
    sku: 'SPRT-001',
    category: 'Sports',
    price: 89.99,
    costPrice: 45.00,
    stockQuantity: 35,
    minStockLevel: 10,
    status: 'active',
  },
];

const ManageProducts = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    costPrice: '',
    stockQuantity: '',
    minStockLevel: '',
    status: 'active' as 'active' | 'inactive',
  });

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        costPrice: product.costPrice.toString(),
        stockQuantity: product.stockQuantity.toString(),
        minStockLevel: product.minStockLevel.toString(),
        status: product.status,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        sku: '',
        category: '',
        price: '',
        costPrice: '',
        stockQuantity: '',
        minStockLevel: '',
        status: 'active',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.sku || !formData.category || !formData.price) {
      toast.error(t('fillRequiredFields'));
      return;
    }

    const productData = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      costPrice: parseFloat(formData.costPrice) || 0,
      stockQuantity: parseInt(formData.stockQuantity) || 0,
      minStockLevel: parseInt(formData.minStockLevel) || 0,
      status: formData.status,
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        )
      );
      toast.success(t('productUpdated'));
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...productData,
      };
      setProducts((prev) => [...prev, newProduct]);
      toast.success(t('productAdded'));
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      toast.success(t('productDeleted'));
    }
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const getStockBadge = (product: Product) => {
    if (product.stockQuantity === 0) {
      return <Badge variant="destructive">{t('outOfStock')}</Badge>;
    }
    if (product.stockQuantity < product.minStockLevel) {
      return (
        <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-3 w-3 me-1" />
          {t('lowStock')}
        </Badge>
      );
    }
    return <Badge variant="default">{t('inStock')}</Badge>;
  };

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>{t('manageProduct')}</CardTitle>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                className="ps-10 w-full sm:w-auto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={t('category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 me-2" />
              {t('addProduct')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('sku')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('productName')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('category')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('price')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('costPrice')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('stockQuantity')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('stockStatus')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('status')}</TableHead>
                  <TableHead className={`${isRTL ? 'text-start' : 'text-end'}`}>{t('action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      {t('noProductsFound')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell dir="ltr">${product.price.toFixed(2)}</TableCell>
                      <TableCell dir="ltr">${product.costPrice.toFixed(2)}</TableCell>
                      <TableCell>{product.stockQuantity}</TableCell>
                      <TableCell>{getStockBadge(product)}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {t(product.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? t('editProduct') : t('addProduct')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('productName')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">{t('sku')} *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">{t('category')} *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">{t('price')} *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  dir="ltr"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="costPrice">{t('costPrice')}</Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                  dir="ltr"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stockQuantity">{t('stockQuantity')}</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  dir="ltr"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minStockLevel">{t('minStockLevel')}</Label>
                <Input
                  id="minStockLevel"
                  type="number"
                  value={formData.minStockLevel}
                  onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
                  dir="ltr"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">{t('status')}</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive') =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('active')}</SelectItem>
                  <SelectItem value="inactive">{t('inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSave}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteProductConfirmation', { name: productToDelete?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageProducts;
