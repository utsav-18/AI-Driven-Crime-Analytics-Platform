import React from 'react';
import { Card } from '../common/Card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = [
  'var(--color-chart-1)', 
  'var(--color-chart-2)', 
  'var(--color-chart-3)', 
  'var(--color-chart-5)', 
  'var(--color-navy-700)'
];

export const PieChartCard = ({ title, data }) => {
  return (
    <Card className="p-5 flex flex-col h-[350px]">
      <h3 className="text-lg font-semibold text-navy-900 mb-4">{title}</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`pie-${entry.name}-${entry.value}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
