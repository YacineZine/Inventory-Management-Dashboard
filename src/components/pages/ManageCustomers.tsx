import { useState } from "react";
import type { Customer } from "@/types";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { initialCustomers } from "@/data/customerData";

const ManageCustomers = () => {
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        status: "active" as "active" | "inactive",
    });

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery);
        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleOpenDialog = (customer?: Customer) => {
        if (customer) {
            setEditingCustomer(customer);
            setFormData({
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address,
                status: customer.status,
            });
        } else {
            setEditingCustomer(null);
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
                status: "active",
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingCustomer(null);
    };

    const handleSave = () => {
        if (!formData.name || !formData.phone || !formData.email) {
            toast.error(t("fillRequiredFields"));
            return;
        }

        if (editingCustomer) {
            setCustomers(
                customers.map((c) =>
                    c.id === editingCustomer.id
                        ? { ...c, ...formData }
                        : c
                )
            );
            toast.success(t("customerUpdated"));
        } else {
            const newCustomer: Customer = {
                id: Math.max(...customers.map((c) => c.id)) + 1,
                ...formData,
                totalOrders: 0,
                totalSpent: 0,
                lastOrderDate: null,
            };
            setCustomers([...customers, newCustomer]);
            toast.success(t("customerAdded"));
        }
        handleCloseDialog();
    };

    const handleDeleteClick = (customer: Customer) => {
        setCustomerToDelete(customer);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
            toast.success(t("customerDeleted"));
        }
        setIsDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(isRTL ? "ar-SA" : "en-SA", {
            style: "currency",
            currency: "DZD",
        }).format(amount);
    };

    const formatDate = (date: string | null) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString(isRTL ? "ar-SA" : "en-SA");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-foreground">{t("manageCustomers")}</h1>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t("addCustomer")}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("customers")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                            <Input
                                placeholder={t("search")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={isRTL ? "pr-10" : "pl-10"}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder={t("filterByStatus")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t("allStatuses")}</SelectItem>
                                <SelectItem value="active">{t("active")}</SelectItem>
                                <SelectItem value="inactive">{t("inactive")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-start">{t("name")}</TableHead>
                                    <TableHead className="text-start">{t("phone")}</TableHead>
                                    <TableHead className="text-start">{t("email")}</TableHead>
                                    <TableHead className="text-start">{t("totalOrders")}</TableHead>
                                    <TableHead className="text-start">{t("totalSpent")}</TableHead>
                                    <TableHead className="text-start">{t("lastOrderDate")}</TableHead>
                                    <TableHead className="text-start">{t("status")}</TableHead>
                                    <TableHead className="text-start">{t("actions")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            {t("noCustomersFound")}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell className="font-medium">{customer.name}</TableCell>
                                            <TableCell dir="ltr">{customer.phone}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.totalOrders}</TableCell>
                                            <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                                            <TableCell>{formatDate(customer.lastOrderDate)}</TableCell>
                                            <TableCell>
                                                <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                                                    {t(customer.status)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleOpenDialog(customer)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteClick(customer)}
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingCustomer ? t("editCustomer") : t("addCustomer")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t("name")} *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">{t("phone")} *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                dir="ltr"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("email")} *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">{t("address")}</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">{t("status")}</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: "active" | "inactive") =>
                                    setFormData({ ...formData, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">{t("active")}</SelectItem>
                                    <SelectItem value="inactive">{t("inactive")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDialog}>
                            {t("cancel")}
                        </Button>
                        <Button onClick={handleSave}>{t("save")}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("deleteCustomerConfirmation", { name: customerToDelete?.name })}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>
                            {t("delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageCustomers;
