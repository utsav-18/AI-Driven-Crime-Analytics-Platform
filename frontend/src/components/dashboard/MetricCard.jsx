import React from 'react';
import { Card } from '../common/Card';

export const MetricCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-3xl font-bold text-navy-900 mt-2">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-dark">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-4">
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </span>
          <span className="text-sm text-slate-400 ml-2">from last month</span>
        </div>
      )}
    </Card>
  );
};
