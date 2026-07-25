import React from 'react';
import { Filter } from 'lucide-react';

export const FilterDropdown = ({ label, options, value, onChange, disabled = false }) => {
  return (
    <div className="flex items-center gap-2">
      <label className={`text-sm font-medium flex items-center gap-1 hidden sm:flex ${disabled ? 'text-slate-400' : 'text-slate-500'}`}>
        <Filter className="w-4 h-4" />
        {label}:
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent outline-none ${
          disabled 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-white text-navy-900'
        }`}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
