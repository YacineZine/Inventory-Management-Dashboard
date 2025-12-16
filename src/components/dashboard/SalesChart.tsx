import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2025-06-18', transactions: 6 },
  { date: '2025-06-19', transactions: 5 },
  { date: '2025-06-20', transactions: 2 },
  { date: '2025-06-20', transactions: 3 },
  { date: '2025-06-21', transactions: 5 },
  { date: '2025-06-22', transactions: 6 },
  { date: '2025-06-23', transactions: 7 },
  { date: '2025-06-24', transactions: 4 },
];

export function SalesChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Bar dataKey="transactions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
