import React from 'react';

const NODE_TYPES = ['Case', 'Accused', 'Victim', 'Complainant', 'District', 'Crime Category'];

export const GraphFilters = ({ visibleTypes, toggleTypeVisibility }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {NODE_TYPES.map(type => {
                const isActive = visibleTypes[type];
                return (
                    <button
                        key={type}
                        onClick={() => toggleTypeVisibility(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                            isActive 
                                ? 'bg-navy-900 text-white border-navy-900' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
};
