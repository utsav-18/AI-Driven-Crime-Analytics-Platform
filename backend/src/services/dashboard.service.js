const dashboardRepository = require('../repositories/dashboard.repository');

class DashboardService {
    async getDashboardMetrics() {
        const [
            totalCrimes,
            crimesByDistrict,
            crimeCategories,
            monthlyTrend,
            yearlyTrend,
            recentCases,
            caseStatusDistribution
        ] = await Promise.all([
            dashboardRepository.getTotalCrimes(),
            dashboardRepository.getCrimesByDistrict(),
            dashboardRepository.getCrimeCategories(),
            dashboardRepository.getMonthlyTrend(),
            dashboardRepository.getYearlyTrend(),
            dashboardRepository.getRecentCases(),
            dashboardRepository.getCaseStatusDistribution()
        ]);

        return {
            totalCrimes,
            crimesByDistrict,
            crimeCategories,
            monthlyTrend,
            yearlyTrend,
            recentCases,
            caseStatusDistribution
        };
    }
}

module.exports = new DashboardService();
