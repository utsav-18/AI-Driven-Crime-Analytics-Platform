import React from 'react';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { cn } from '../../utils/cn';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'open':
      return 'bg-blue-100 text-blue-700';
    case 'closed':
      return 'bg-slate-100 text-slate-700';
    case 'under investigation':
      return 'bg-amber-100 text-amber-700';
    case 'charge sheeted':
      return 'bg-emerald-100 text-emerald-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const RecentCasesTable = ({ cases }) => {
  if (!cases || cases.length === 0) {
    return (
      <Card className="p-0">
        <div className="p-5 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-navy-900">Recent FIRs</h3>
        </div>
        <EmptyState title="No recent cases" description="There are no recent FIRs recorded in the system." />
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-navy-900">Recent FIRs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">FIR Number</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-navy-900">{c.fir_number}</td>
                <td className="px-6 py-4">
                  {new Date(c.occurrence_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium",
                    getStatusColor(c.status)
                  )}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
