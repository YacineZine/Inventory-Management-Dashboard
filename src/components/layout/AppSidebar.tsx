import {
  Home,
  Users,
  Shield,
  Package,
  Layers,
  ShoppingCart,
  ShoppingBag,
  FileText,
  BarChart3,
  HelpCircle,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useTranslation } from 'react-i18next';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { t } = useTranslation();

  const menuItems = [
    { title: t('dashboard'), url: '/', icon: Home },
    { title: t('manageSuppliers'), url: '/suppliers', icon: Users },
    { title: t('manageCustomers'), url: '/customers', icon: Shield },
    { title: t('manageUnits'), url: '/units', icon: Package },
    { title: t('manageCategory'), url: '/categories', icon: Layers },
    { title: t('manageProduct'), url: '/products', icon: ShoppingBag },
    { title: t('managePurchase'), url: '/purchases', icon: ShoppingCart },
    { title: t('manageInvoice'), url: '/invoices', icon: FileText },
    { title: t('manageStock'), url: '/stock', icon: BarChart3 },
    { title: t('support'), url: '/support', icon: HelpCircle },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="p-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-muted-foreground uppercase text-xs font-semibold">
            {t('menu')}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
