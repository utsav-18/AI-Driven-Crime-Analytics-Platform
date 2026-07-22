import React from 'react';
import { Card } from '../common/Card';
import { Info } from 'lucide-react';

const getRiskBadge = (level) => {
    switch (level) {
        case 'Critical': return <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-200"><span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>🔴 Critical</span>;
        case 'High': return <span className="flex items-center text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-200"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1.5"></span>🟠 High</span>;
        case 'Medium': return <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></span>🟡 Medium</span>;
        default: return <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200"><span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>🟢 Low</span>;
    }
};

const getProgressBarColor = (score) => {
    if (score >= 75) return 'bg-red-500';
    if (score >= 50) return 'bg-orange-500';
    if (score >= 25) return 'bg-yellow-500';
    return 'bg-green-500';
};

export const HotspotRanking = ({ riskData }) => {
    if (!riskData || riskData.length === 0) {
        return (
            <Card className="p-4 flex items-center justify-center">
                <span className="text-slate-400">No risk data available.</span>
            </Card>
        );
    }

    return (
        <Card className="p-0 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-navy-900 mb-1">Hotspot Risk Analysis</h3>
                <p className="text-xs text-slate-500 flex items-center">
                    <Info className="w-3 h-3 mr-1" />
                    Score = 40% Total Crimes + 30% Violent + 20% Repeat + 10% Active. Normalized to 0-100.
                </p>
            </div>
            
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-4 py-3">Rank</th>
                            <th className="px-4 py-3">District</th>
                            <th className="px-4 py-3 text-right">Crimes</th>
                            <th className="px-4 py-3">Risk Score</th>
                            <th className="px-4 py-3">Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {riskData.map((row, idx) => (
                            <tr key={row.districtName} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-slate-400">#{idx + 1}</td>
                                <td className="px-4 py-3 font-medium text-navy-900">{row.districtName}</td>
                                <td className="px-4 py-3 text-right text-slate-600">{row.totalCrimes}</td>
                                <td className="px-4 py-3 w-48">
                                    <div className="flex items-center">
                                        <span className="w-8 text-right mr-2 font-bold text-navy-900">{row.riskScore}</span>
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${getProgressBarColor(row.riskScore)}`} 
                                                style={{ width: `${row.riskScore}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {getRiskBadge(row.riskLevel)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
