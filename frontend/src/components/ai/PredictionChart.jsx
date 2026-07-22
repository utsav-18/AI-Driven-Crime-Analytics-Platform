import React from 'react';
import { Card } from '../common/Card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Info } from 'lucide-react';

export const PredictionChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Card className="p-4 h-80 flex items-center justify-center">
                <span className="text-slate-400">No historical data available for prediction.</span>
            </Card>
        );
    }

    // Split data into actual and forecast for visual differentiation
    const chartData = data.map(d => ({
        month: d.month,
        Actual: d.actual,
        Forecast: d.predicted
    }));

    return (
        <Card className="p-4 flex flex-col h-full">
            <h3 className="font-bold text-navy-900 mb-1">Crime Trend Prediction</h3>
            <p className="text-xs text-slate-500 mb-4 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                Forecast generated using a 3-period moving average of historical data.
            </p>
            
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}
                            itemStyle={{ fontSize: '13px', fontWeight: '600' }}
                        />
                        
                        <Line 
                            type="monotone" 
                            dataKey="Actual" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            connectNulls
                        />
                        
                        <Line 
                            type="monotone" 
                            dataKey="Forecast" 
                            stroke="#f59e0b" 
                            strokeWidth={3} 
                            strokeDasharray="5 5"
                            dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
