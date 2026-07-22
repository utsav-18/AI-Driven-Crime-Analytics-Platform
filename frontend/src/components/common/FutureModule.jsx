import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { ArrowLeft, BrainCircuit, CheckCircle2 } from 'lucide-react';

export const FutureModule = ({ title, icon: Icon, features }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full justify-center p-4">
            <Card className="p-8 md:p-12 text-center border-slate-200 shadow-sm relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-slate-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-navy-900" />
                    </div>

                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200 mb-4 tracking-wide uppercase">
                        Planned for Version 2
                    </span>

                    <h1 className="text-3xl font-bold text-navy-900 mb-3">{title} Module</h1>
                    
                    <p className="text-slate-500 max-w-md mx-auto mb-8">
                        This operational module is reserved for future law enforcement workflows and is not included in the current hackathon prototype.
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left w-full max-w-lg mb-10 shadow-sm">
                        <h4 className="text-sm font-bold text-navy-900 mb-4 flex items-center uppercase tracking-wide">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" />
                            Planned Features
                        </h4>
                        <ul className="space-y-3">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-slate-600 font-medium">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 shrink-0"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center justify-center w-full sm:w-auto px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Return to Dashboard
                        </button>
                        <button 
                            onClick={() => navigate('/ai-analytics')}
                            className="flex items-center justify-center w-full sm:w-auto px-6 py-2.5 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-1 transition-all shadow-sm"
                        >
                            Explore AI Insights
                            <BrainCircuit className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
