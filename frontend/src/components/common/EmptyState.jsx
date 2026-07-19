import React from 'react';
import { SearchX } from 'lucide-react';

export const EmptyState = ({ title = "No data found", description = "There are no records to display at this time." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3 h-full min-h-[200px] text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
        <SearchX className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
        <p className="text-slate-500 mt-1 max-w-sm">{description}</p>
      </div>
    </div>
  );
};
