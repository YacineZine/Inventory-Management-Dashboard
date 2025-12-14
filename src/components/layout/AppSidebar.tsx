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
import { useLanguage } from '@/hooks/useLanguage';
import { CustomSidebar } from './CustomSidebar';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

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
    <CustomSidebar side={isRTL ? "right" : "left"}>
      <div className={cn(
        "h-full flex flex-col",
        isRTL && "items-end"
      )}>
        <div className={cn(
          "p-6 flex items-center gap-3 w-full",
          isRTL && "flex-row-reverse justify-end"
        )}>
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>

        <div className={cn(
          "flex-1 px-3 w-full",
          isRTL && "flex flex-col items-end"
        )}>
          <div className={cn(
            "px-3 mb-2 w-full",
            isRTL && "text-right"
          )}>
            <p className="text-muted-foreground uppercase text-xs font-semibold">
              {t('menu')}
            </p>
          </div>
          <nav className={cn(
            "space-y-1 w-full",
            isRTL && "flex flex-col items-end"
          )}>
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full",
                  isRTL && "flex-row justify-start text-right"
                )}
                activeClassName="bg-sidebar-accent text-primary font-medium"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>      
        </div>
      </div>
    </CustomSidebar>
  );
}