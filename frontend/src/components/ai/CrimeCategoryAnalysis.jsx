import React from 'react';
import { Card } from '../common/Card';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

export const CrimeCategoryAnalysis = ({ categories }) => {
    if (!categories || categories.length === 0) {
        return (
            <Card className="p-4 flex items-center justify-center">
                <span className="text-slate-400">No category data available.</span>
            </Card>
        );
    }

    const topCategories = categories.slice(0, 7);

    return (
        <Card className="p-4 flex flex-col h-full">
            <h3 className="font-bold text-navy-900 mb-4">Crime Category Breakdown</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {/* Pie Chart */}
                <div className="h-64 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={topCategories}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="count"
                                nameKey="category"
                                stroke="none"
                            >
                                {topCategories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ fontSize: '13px', fontWeight: '600' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-2xl font-bold text-navy-900">{topCategories[0]?.percentage}%</span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">{topCategories[0]?.category}</span>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={topCategories}
                            layout="vertical"
                            margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="category" 
                                type="category" 
                                axisLine={false} 
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b' }}
                                width={90}
                            />
                            <Tooltip 
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={12}>
                                {topCategories.map((entry, index) => (
                                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};
