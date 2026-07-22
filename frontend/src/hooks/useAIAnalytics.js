import { useState, useEffect } from 'react';
import { aiService } from '../services/ai.service';

export const useAIAnalytics = () => {
    const [data, setData] = useState({
        summary: null,
        predictions: [],
        riskScores: [],
        repeatOffenders: [],
        categories: [],
        insights: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel for performance optimization
                const [
                    summary,
                    predictions,
                    riskScores,
                    repeatOffenders,
                    categories,
                    insights
                ] = await Promise.all([
                    aiService.getSummary(),
                    aiService.getPredictions(),
                    aiService.getRiskScores(),
                    aiService.getRepeatOffenders(),
                    aiService.getCrimeCategories(),
                    aiService.getInsights()
                ]);

                setData({
                    summary,
                    predictions,
                    riskScores,
                    repeatOffenders,
                    categories,
                    insights
                });
                setError(null);
            } catch {
                setError("Failed to load analytics data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { ...data, loading, error };
};
