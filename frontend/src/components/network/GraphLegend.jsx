import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const LEGEND_ITEMS = [
    { type: 'Case', color: '#3b82f6', shape: 'Rectangle' },
    { type: 'Accused', color: '#ef4444', shape: 'Circle' },
    { type: 'Victim', color: '#22c55e', shape: 'Circle' },
    { type: 'Complainant', color: '#06b6d4', shape: 'Triangle' },
    { type: 'District', color: '#f97316', shape: 'Hexagon' },
    { type: 'Crime Category', color: '#a855f7', shape: 'Diamond' },
];

export const GraphLegend = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 w-48">
            <div 
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Legend</h3>
                {isCollapsed ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </div>
            
            {!isCollapsed && (
                <div className="space-y-2">
                    {LEGEND_ITEMS.map(item => (
                        <div key={item.type} className="flex items-center gap-2 text-xs">
                            <span 
                                className="w-3 h-3 inline-block shadow-sm"
                                style={{ 
                                    backgroundColor: item.color, 
                                    borderRadius: item.shape === 'Circle' ? '50%' : item.shape === 'Rectangle' ? '2px' : '0' 
                                }}
                            />
                            <span className="text-slate-600 font-medium">{item.type}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
