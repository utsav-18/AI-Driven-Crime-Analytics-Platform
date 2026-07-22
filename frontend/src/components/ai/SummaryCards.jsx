import React from 'react';
import { Card } from '../common/Card';
import { ShieldAlert, TrendingUp, MapPin, Activity } from 'lucide-react';

export const SummaryCards = ({ summary }) => {
    if (!summary) return null;

    const cards = [
        {
            title: "Total Active Cases",
            value: summary.activeCases.toLocaleString(),
            subtitle: `Out of ${summary.totalCrimes.toLocaleString()} total`,
            icon: Activity,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: "Highest Risk District",
            value: summary.highestRiskDistrict,
            subtitle: "Based on composite risk score",
            icon: MapPin,
            color: "text-red-500",
            bg: "bg-red-50"
        },
        {
            title: "Most Common Crime",
            value: summary.topCategory,
            subtitle: "By total occurrences",
            icon: TrendingUp,
            color: "text-purple-500",
            bg: "bg-purple-50"
        },
        {
            title: "Monitored Districts",
            value: summary.totalDistricts,
            subtitle: "Total administrative regions",
            icon: ShieldAlert,
            color: "text-green-500",
            bg: "bg-green-50"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((c, idx) => (
                <Card key={idx} className="flex items-center p-4">
                    <div className={`p-3 rounded-xl ${c.bg} mr-4`}>
                        <c.icon className={`w-6 h-6 ${c.color}`} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">{c.title}</p>
                        <h3 className="text-xl font-bold text-navy-900 mt-1">{c.value}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{c.subtitle}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};
