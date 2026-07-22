import React from 'react';
import { Card } from '../common/Card';
import { UserX } from 'lucide-react';

export const RepeatOffendersTable = ({ offenders }) => {
    if (!offenders || offenders.length === 0) {
        return (
            <Card className="p-4 flex items-center justify-center">
                <span className="text-slate-400">No repeat offenders detected.</span>
            </Card>
        );
    }

    return (
        <Card className="p-0 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-navy-900 mb-1 flex items-center">
                    <UserX className="w-4 h-4 mr-2 text-red-500" />
                    Top Repeat Offenders
                </h3>
                <p className="text-xs text-slate-500">Accused individuals appearing in multiple FIRs.</p>
            </div>
            
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3 text-center">Cases</th>
                            <th className="px-4 py-3">Districts</th>
                            <th className="px-4 py-3">Crime Categories</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {offenders.slice(0, 10).map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-navy-900">{row.name}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold text-xs">
                                        {row.connected_cases}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                    <div className="flex flex-wrap gap-1">
                                        {row.districts.filter(d => d).map((d, i) => (
                                            <span key={i} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                    <div className="flex flex-wrap gap-1">
                                        {row.crime_categories.filter(c => c).map((c, i) => (
                                            <span key={i} className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
