import React from 'react';
import { Filter } from 'lucide-react';

export const FilterDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-slate-500 flex items-center gap-1 hidden sm:flex">
        <Filter className="w-4 h-4" />
        {label}:
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-slate-200 rounded-lg bg-white px-3 py-1.5 text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent outline-none"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
