import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Building2, 
  Users, 
  UserX, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

import { useDashboard } from '../hooks/useDashboard';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { EmptyState } from '../components/common/EmptyState';
import { FilterDropdown } from '../components/common/FilterDropdown';

import { MetricCard } from '../components/dashboard/MetricCard';
import { BarChartCard } from '../components/charts/BarChartCard';
import { PieChartCard } from '../components/charts/PieChartCard';
import { LineChartCard } from '../components/charts/LineChartCard';
import { AreaChartCard } from '../components/charts/AreaChartCard';
import { RecentCasesTable } from '../components/tables/RecentCasesTable';

export const Dashboard = () => {
  const { data, loading, error, refetch } = useDashboard();
  const [districtFilter, setDistrictFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  if (loading) return <Loader text="Loading dashboard data..." />;
  if (error) return <ErrorMessage message={error} retry={refetch} />;
  if (!data) return <EmptyState title="No data available" />;

  const { metrics, kpi } = data;

  // Process data for charts
  const crimesByDistrictData = (metrics.crimesByDistrict || []).map(d => ({
    name: d.district_name,
    value: parseInt(d.total_crimes, 10)
  }));

  const crimeCategoriesData = (metrics.crimeCategories || []).map(c => ({
    name: c.crime_name,
    value: parseInt(c.total_crimes, 10)
  }));

  const monthlyTrendData = (metrics.monthlyTrend || []).map(m => ({
    name: m.month,
    value: parseInt(m.total_crimes, 10)
  }));

  const yearlyTrendData = (metrics.yearlyTrend || []).map(y => ({
    name: y.year.toString(),
    value: parseInt(y.total_crimes, 10)
  }));

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Key metrics and analytical insights for Karnataka Police.</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown 
            label="District" 
            value={districtFilter} 
            onChange={setDistrictFilter} 
            options={crimesByDistrictData.map(d => ({ label: d.name, value: d.name }))} 
          />
          <FilterDropdown 
            label="Year" 
            value={yearFilter} 
            onChange={setYearFilter} 
            options={yearlyTrendData.map(y => ({ label: y.name, value: y.name }))} 
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard title="Total Crimes" value={kpi.totalCrimes} icon={ShieldAlert} />
        <MetricCard title="Total Districts" value={kpi.totalDistricts} icon={MapPin} />
        <MetricCard title="Total Units" value={kpi.totalUnits} icon={Building2} />
        <MetricCard title="Total Victims" value={kpi.totalVictims} icon={Users} />
        
        <MetricCard title="Total Accused" value={kpi.totalAccused} icon={UserX} />
        <MetricCard title="Active Cases" value={kpi.activeCases} icon={AlertTriangle} />
        <MetricCard title="Closed Cases" value={kpi.closedCases} icon={CheckCircle2} />
        
        {/* Placeholder for alignment */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <BarChartCard title="Crimes by District" data={crimesByDistrictData} />
        <PieChartCard title="Crime Categories" data={crimeCategoriesData} />
        <AreaChartCard title="Yearly Crime Trend" data={yearlyTrendData} />
        <LineChartCard title="Monthly Crime Trend" data={monthlyTrendData} />
      </div>

      {/* Recent Cases */}
      <div className="mt-6">
        <RecentCasesTable cases={metrics.recentCases || []} />
      </div>
    </div>
  );
};
