import React from 'react';
import { useAIAnalytics } from '../hooks/useAIAnalytics';
import { SummaryCards } from '../components/ai/SummaryCards';
import { PredictionChart } from '../components/ai/PredictionChart';
import { HotspotRanking } from '../components/ai/HotspotRanking';
import { RepeatOffendersTable } from '../components/ai/RepeatOffendersTable';
import { CrimeCategoryAnalysis } from '../components/ai/CrimeCategoryAnalysis';
import { InsightsPanel } from '../components/ai/InsightsPanel';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';

export const AIAnalytics = () => {
    const { 
        summary, 
        predictions, 
        riskScores, 
        repeatOffenders, 
        categories, 
        insights, 
        loading, 
        error 
    } = useAIAnalytics();

    if (loading) return <Loader text="Generating AI Insights..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="flex flex-col h-full gap-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-navy-900">AI Analytics Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Intelligent insights, risk scoring, and predictive analysis powered by historical crime data.
                </p>
            </div>

            {/* KPI Cards */}
            <SummaryCards summary={summary} />

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column (takes 2 parts) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Prediction Chart */}
                    <div className="h-[350px]">
                        <PredictionChart data={predictions} />
                    </div>

                    {/* Grid for Table and Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <div className="h-[400px]">
                            <HotspotRanking riskData={riskScores} />
                        </div>
                        <div className="h-[400px]">
                            <CrimeCategoryAnalysis categories={categories} />
                        </div>
                    </div>

                    {/* Repeat Offenders */}
                    <div className="h-[350px]">
                        <RepeatOffendersTable offenders={repeatOffenders} />
                    </div>
                </div>

                {/* Right Column (takes 1 part) */}
                <div className="lg:col-span-1 flex flex-col gap-6 h-full min-h-[600px]">
                    <InsightsPanel insights={insights} />
                </div>
            </div>
        </div>
    );
};
