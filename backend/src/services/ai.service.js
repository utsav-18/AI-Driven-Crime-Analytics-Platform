const aiRepository = require('../repositories/ai.repository');

class AIService {
    
    async getSummary() {
        const stats = await aiRepository.getSummaryStats();
        const categories = await aiRepository.getCrimeCategoryStats();
        const riskData = await this.getRiskScores();
        
        let highestRiskDistrict = 'N/A';
        if (riskData && riskData.length > 0) {
            highestRiskDistrict = riskData[0].district_name;
        }

        let topCategory = 'N/A';
        if (categories && categories.length > 0) {
            topCategory = categories[0].crime_name;
        }

        return {
            totalCrimes: Number(stats.total_crimes),
            activeCases: Number(stats.active_cases),
            totalDistricts: Number(stats.total_districts),
            highestRiskDistrict,
            topCategory
        };
    }

    async getPredictions() {
        const historical = await aiRepository.getMonthlyCrimeCounts();
        if (historical.length === 0) return [];

        const data = historical.map(row => ({
            month: row.month_year,
            actual: Number(row.total_crimes),
            predicted: null
        }));

        // Simple 3-period moving average for the next month prediction
        let sum = 0;
        let count = 0;
        for (let i = Math.max(0, data.length - 3); i < data.length; i++) {
            sum += data[i].actual;
            count++;
        }
        
        const forecastValue = count > 0 ? Math.round(sum / count) : 0;
        
        // Predict for the next month
        const lastMonthStr = data[data.length - 1].month;
        const [year, month] = lastMonthStr.split('-');
        let nextDate = new Date(Number(year), Number(month), 1); // JS months are 0-indexed, so passing `month` gets next month
        let nextMonthStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`;

        data.push({
            month: nextMonthStr,
            actual: null,
            predicted: forecastValue,
            isForecast: true
        });

        return data;
    }

    async getRiskScores() {
        const rawData = await aiRepository.getDistrictRiskData();
        if (rawData.length === 0) return [];

        // 1. Calculate raw scores based on requested formula weights
        // Weights: 40% Total, 30% Violent, 20% Repeat, 10% Active
        // Since the scales differ (e.g. Total crimes is much larger than repeat offenders),
        // we first normalize each metric to 0-1 before applying weights, 
        // or we just apply weights to raw numbers and then normalize the final score.
        // Let's normalize each metric to a 0-1 scale first to be statistically sound.

        const maxTotal = Math.max(...rawData.map(d => Number(d.total_crimes)), 1);
        const maxViolent = Math.max(...rawData.map(d => Number(d.violent_crimes)), 1);
        const maxRepeat = Math.max(...rawData.map(d => Number(d.repeat_offender_count)), 1);
        const maxActive = Math.max(...rawData.map(d => Number(d.active_cases)), 1);

        const scoredData = rawData.map(d => {
            const normTotal = Number(d.total_crimes) / maxTotal;
            const normViolent = Number(d.violent_crimes) / maxViolent;
            const normRepeat = Number(d.repeat_offender_count) / maxRepeat;
            const normActive = Number(d.active_cases) / maxActive;

            const rawScore = (normTotal * 0.40) + (normViolent * 0.30) + (normRepeat * 0.20) + (normActive * 0.10);
            
            return {
                districtId: d.district_id,
                districtName: d.district_name,
                totalCrimes: Number(d.total_crimes),
                rawScore
            };
        });

        // 2. Normalize final score between 0 and 100
        const maxRaw = Math.max(...scoredData.map(d => d.rawScore), 0.0001);
        
        return scoredData.map(d => {
            const finalScore = Math.round((d.rawScore / maxRaw) * 100);
            let riskLevel = 'Low';
            if (finalScore >= 75) riskLevel = 'Critical';
            else if (finalScore >= 50) riskLevel = 'High';
            else if (finalScore >= 25) riskLevel = 'Medium';

            return {
                districtName: d.districtName,
                totalCrimes: d.totalCrimes,
                riskScore: finalScore,
                riskLevel
            };
        }).sort((a, b) => b.riskScore - a.riskScore);
    }

    async getRepeatOffenders() {
        return await aiRepository.getRepeatOffenders();
    }

    async getCrimeCategoryAnalysis() {
        const categories = await aiRepository.getCrimeCategoryStats();
        const total = categories.reduce((sum, c) => sum + Number(c.count), 0);
        
        return categories.map(c => ({
            category: c.crime_name,
            count: Number(c.count),
            percentage: total > 0 ? ((Number(c.count) / total) * 100).toFixed(1) : 0
        }));
    }

    async getInsights() {
        const insights = [];
        
        const riskData = await this.getRiskScores();
        if (riskData.length > 0) {
            const highest = riskData[0];
            insights.push(`${highest.districtName} has the highest calculated risk score (${highest.riskScore}/100).`);
        }

        const categories = await this.getCrimeCategoryAnalysis();
        if (categories.length > 0) {
            insights.push(`${categories[0].category} is the most common crime category, accounting for ${categories[0].percentage}% of all crimes.`);
        }

        const repeatOffenders = await this.getRepeatOffenders();
        if (repeatOffenders.length > 0) {
            insights.push(`${repeatOffenders[0].name} is a top repeat offender, appearing in ${repeatOffenders[0].connected_cases} different cases.`);
        }

        const predictions = await this.getPredictions();
        if (predictions.length > 0) {
            const forecast = predictions[predictions.length - 1];
            if (forecast.isForecast) {
                insights.push(`Crime forecast generated using a 3-period moving average predicts ${forecast.predicted} cases for the upcoming month.`);
            }
        }

        return insights;
    }
}

module.exports = new AIService();
