import { ShoppingCart, TrendingUp, FileText, DollarSign, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { StatsCard } from '@/components/dashboard/StatsCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { OrdersChart } from '@/components/dashboard/OrderChart';
import { ProductsTable } from '@/components/dashboard/ProductTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { t } = useTranslation();

  const notifications = [
    'Samsung Galaxy A52 Less than 20 pieces',
    'USB-C Charging Cable Less than 20 pieces',
    'IKEA Office Chair Less than 20 pieces',
    'LED Ceiling Light Panel Less than 20 pieces',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('totalSales')}
          value="231"
          icon={ShoppingCart}
        />
        <StatsCard
          title={t('movementToday')}
          value="2"
          icon={TrendingUp}
        />
        <StatsCard
          title={t('invoiceToday')}
          value="1"
          icon={FileText}
        />
        <StatsCard
          title={t('avgProfitToday')}
          value="39500"
          icon={DollarSign}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('salesTransactions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('numberOrders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('topLowSellingProducts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('notifications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span className="text-sm">{notification}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
