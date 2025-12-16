import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { date: '2025-06-14', orders: 0 },
  { date: '2025-06-15', orders: 1 },
  { date: '2025-06-16', orders: 2 },
  { date: '2025-06-17', orders: 2.5 },
  { date: '2025-06-18', orders: 4 },
  { date: '2025-06-19', orders: 3 },
  { date: '2025-06-20', orders: 2 },
  { date: '2025-06-21', orders: 3.5 },
  { date: '2025-06-22', orders: 2.5 },
  { date: '2025-06-23', orders: 4 },
  { date: '2025-06-24', orders: 5 },
  { date: '2025-06-25', orders: 3.7 },
];

export function OrdersChart() {
  const { t } = useTranslation();

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem'
            }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            name={t('numberOrders')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
