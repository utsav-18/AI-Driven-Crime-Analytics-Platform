import React from 'react';
import { X } from 'lucide-react';

export const DetailsPanel = ({ node, onClose }) => {
    if (!node) return null;

    const { data } = node;

    const renderMetadata = () => {
        const skipKeys = ['id', 'label', 'type', 'connectedCases'];
        const metadataKeys = Object.keys(data).filter(k => !skipKeys.includes(k));

        if (metadataKeys.length === 0) return null;

        return (
            <div className="mt-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Metadata</h4>
                <div className="space-y-2">
                    {metadataKeys.map(key => (
                        <div key={key} className="text-sm flex flex-col">
                            <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium text-navy-900">{data[key] || 'N/A'}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full lg:w-80 bg-white border-l border-slate-200 shadow-xl flex flex-col h-full absolute right-0 top-0 z-20 transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="font-bold text-navy-900 truncate pr-2">Node Details</h2>
                <button 
                    onClick={onClose}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-navy-900"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="mb-6">
                    <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-dark text-xs font-semibold rounded-full mb-3">
                        {data.type}
                    </span>
                    <h3 className="text-xl font-bold text-navy-900 leading-tight">{data.label}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="block text-xs text-slate-500 mb-1">Connections</span>
                        <span className="text-lg font-bold text-navy-900">{data.connectedCases || 0}</span>
                    </div>
                    {/* Add more metric blocks if needed */}
                </div>

                {renderMetadata()}
            </div>
        </div>
    );
};
