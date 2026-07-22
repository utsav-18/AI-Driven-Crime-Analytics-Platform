import React from 'react';
import { Card } from '../common/Card';
import { Sparkles } from 'lucide-react';

export const InsightsPanel = ({ insights }) => {
    if (!insights || insights.length === 0) {
        return (
            <Card className="p-4 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 border-none">
                <span className="text-indigo-400">Generating insights...</span>
            </Card>
        );
    }

    return (
        <Card className="p-0 overflow-hidden bg-gradient-to-br from-navy-900 to-indigo-900 border-none h-full shadow-lg">
            <div className="p-4 border-b border-white/10 flex items-center">
                <div className="p-2 bg-white/10 rounded-lg mr-3 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-0.5">AI Insights</h3>
                    <p className="text-xs text-indigo-200">Dynamically generated observations</p>
                </div>
            </div>
            
            <div className="p-4 flex-1">
                <div className="space-y-4">
                    {insights.map((insight, idx) => (
                        <div key={idx} className="flex items-start bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mr-3 mt-0.5">
                                {idx + 1}
                            </div>
                            <p className="text-sm text-indigo-100 leading-relaxed font-medium">
                                {insight}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};
