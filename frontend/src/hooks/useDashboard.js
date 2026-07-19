import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { districtsService } from '../services/districts.service';
import { victimsService } from '../services/victims.service';
import { accusedService } from '../services/accused.service';
import { unitsService } from '../services/units.service';

export const useDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [
                metrics,
                districts,
                units,
                victims,
                accused
            ] = await Promise.all([
                dashboardService.getMetrics(),
                districtsService.getAll(),
                unitsService.getAll(),
                victimsService.getAll(),
                accusedService.getAll()
            ]);

            // Calculate active vs closed cases from status distribution
            const caseStatus = metrics.caseStatusDistribution || [];
            let activeCases = 0;
            let closedCases = 0;

            caseStatus.forEach(statusRow => {
                const count = parseInt(statusRow.total_cases, 10);
                if (statusRow.status?.toLowerCase() === 'closed') {
                    closedCases += count;
                } else {
                    activeCases += count;
                }
            });

            setData({
                metrics,
                kpi: {
                    totalCrimes: metrics.totalCrimes?.total || 0,
                    totalDistricts: districts?.length || 0,
                    totalUnits: units?.length || 0,
                    totalVictims: victims?.length || 0,
                    totalAccused: accused?.length || 0,
                    activeCases,
                    closedCases
                }
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return { data, loading, error, refetch: fetchDashboardData };
};
