import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { mapService } from '../services/map.service';
import { crimeCategoriesService } from '../services/crimeCategories.service';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { FilterDropdown } from '../components/common/FilterDropdown';
import { Card } from '../components/common/Card';
import { ShieldAlert, MapPin, AlertTriangle, CheckCircle2, Filter } from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Derive a colour based on crime count intensity */
const getMarkerColor = (count, max) => {
  if (max === 0) return '#94a3b8';
  const ratio = count / max;
  if (ratio >= 0.75) return '#dc2626'; // red   – high
  if (ratio >= 0.45) return '#f97316'; // orange – medium
  if (ratio >= 0.15) return '#eab308'; // yellow – low
  return '#22c55e';                     // green  – minimal
};

/** Derive radius based on crime count intensity */
const getMarkerRadius = (count, max) => {
  if (max === 0) return 10;
  const ratio = count / max;
  return Math.max(10, Math.min(40, 10 + ratio * 30));
};

// ─── Sub-component: fly-to on filter change ───────────────────────────────────
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true, duration: 1.2 });
  }, [center, map]);
  return null;
};

// ─── Legend ───────────────────────────────────────────────────────────────────
const MapLegend = () => (
  <div className="absolute bottom-8 right-4 z-[1000] bg-white rounded-xl shadow-md p-3 text-xs space-y-1.5 border border-slate-200">
    <p className="font-semibold text-navy-900 mb-2">Crime Intensity</p>
    {[
      { color: '#dc2626', label: 'High' },
      { color: '#f97316', label: 'Medium' },
      { color: '#eab308', label: 'Low' },
      { color: '#22c55e', label: 'Minimal' },
    ].map(({ color, label }) => (
      <div key={label} className="flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-slate-600">{label}</span>
      </div>
    ))}
  </div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-navy-900 leading-tight">{value}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const KARNATAKA_CENTER = [15.3173, 75.7139];
const KARNATAKA_ZOOM  = 7;

const STATUS_OPTIONS = [
  { label: 'Open',               value: 'Open' },
  { label: 'Under Investigation', value: 'Under Investigation' },
  { label: 'Charge Sheeted',     value: 'Charge Sheeted' },
  { label: 'Closed',             value: 'Closed' },
];

const YEAR_OPTIONS = ['2023', '2024', '2025'].map(y => ({ label: y, value: y }));

export const CrimeMap = () => {
  const [districts, setDistricts]   = useState([]);
  const [_categories, setCategories] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  // Filters
  const [districtFilter, setDistrictFilter]   = useState('');
  const [categoryFilter, setCategoryFilter]   = useState('');
  const [statusFilter, setStatusFilter]       = useState('');
  const [yearFilter, setYearFilter]           = useState('');
  const [showFilters, setShowFilters]         = useState(false);

  // Load district map data + categories on mount
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [districtData, categoryData] = await Promise.all([
        mapService.getDistrictMapData(),
        crimeCategoriesService.getAll(),
      ]);
      setDistricts(districtData || []);
      setCategories(categoryData || []);
    } catch (err) {
      setError(err.message || 'Failed to load map data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Client-side filter: district name, category (top crime), status is not per-district so we skip status/year here
  // (status/year filters apply to the case-point layer when added in future)
  const filteredDistricts = useMemo(() => {
    return districts.filter(d => {
      if (districtFilter && d.districtName !== districtFilter) return false;
      if (categoryFilter && d.topCrimeCategory !== categoryFilter) return false;
      return true;
    });
  }, [districts, districtFilter, categoryFilter]);

  const maxCrimes = useMemo(
    () => Math.max(...districts.map(d => d.totalCrimes), 1),
    [districts]
  );

  // Aggregate stats
  const totalCrimes  = filteredDistricts.reduce((s, d) => s + d.totalCrimes, 0);
  const activeCases  = filteredDistricts.reduce((s, d) => s + d.activeCases, 0);
  const closedCases  = filteredDistricts.reduce((s, d) => s + d.closedCases, 0);

  const districtOptions  = districts.map(d => ({ label: d.districtName, value: d.districtName }));
  const categoryOptions  = [...new Set(districts.map(d => d.topCrimeCategory).filter(Boolean))]
    .map(c => ({ label: c, value: c }));

  if (loading) return <Loader text="Loading crime map…" />;
  if (error)   return <ErrorMessage message={error} retry={fetchData} />;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Crime Map</h1>
          <p className="text-sm text-slate-500 mt-0.5">Interactive district-level crime visualisation — Karnataka</p>
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Filter className="w-4 h-4" />
          Filters {showFilters ? '▲' : '▼'}
        </button>
      </div>

      {/* ── Filter bar ─────────────────────────────────── */}
      {showFilters && (
        <Card className="p-4 flex flex-wrap gap-4 items-center">
          <FilterDropdown
            label="District"
            value={districtFilter}
            onChange={setDistrictFilter}
            options={districtOptions}
          />
          <FilterDropdown
            label="Crime Type"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categoryOptions}
          />
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_OPTIONS}
          />
          <FilterDropdown
            label="Year"
            value={yearFilter}
            onChange={setYearFilter}
            options={YEAR_OPTIONS}
          />
          {(districtFilter || categoryFilter || statusFilter || yearFilter) && (
            <button
              onClick={() => {
                setDistrictFilter('');
                setCategoryFilter('');
                setStatusFilter('');
                setYearFilter('');
              }}
              className="text-sm text-red-500 hover:underline font-medium"
            >
              Clear all
            </button>
          )}
        </Card>
      )}

      {/* ── KPI strip ──────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={MapPin}       label="Districts Shown" value={filteredDistricts.length} color="bg-blue-100 text-blue-dark" />
        <StatCard icon={ShieldAlert}  label="Total Crimes"    value={totalCrimes}              color="bg-red-100 text-red-600" />
        <StatCard icon={AlertTriangle} label="Active Cases"   value={activeCases}              color="bg-amber-100 text-amber-600" />
        <StatCard icon={CheckCircle2} label="Closed Cases"    value={closedCases}              color="bg-emerald-100 text-emerald-600" />
      </div>

      {/* ── Map ────────────────────────────────────────── */}
      <Card className="relative flex-1 min-h-[480px] overflow-hidden p-0">
        <MapContainer
          center={KARNATAKA_CENTER}
          zoom={KARNATAKA_ZOOM}
          style={{ width: '100%', height: '100%', minHeight: '480px' }}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredDistricts.map(district => (
            <CircleMarker
              key={`district-${district.districtId}`}
              center={[district.lat, district.lng]}
              radius={getMarkerRadius(district.totalCrimes, maxCrimes)}
              pathOptions={{
                fillColor:   getMarkerColor(district.totalCrimes, maxCrimes),
                fillOpacity: 0.82,
                color:       '#fff',
                weight:      2,
              }}
            >
              <Popup maxWidth={260} className="crime-popup">
                <div className="text-navy-900 space-y-2 py-1">
                  <h3 className="font-bold text-base border-b pb-1">{district.districtName}</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-slate-500">Total Crimes</span>
                    <span className="font-semibold">{district.totalCrimes}</span>
                    <span className="text-slate-500">Active Cases</span>
                    <span className="font-semibold text-amber-600">{district.activeCases}</span>
                    <span className="text-slate-500">Closed Cases</span>
                    <span className="font-semibold text-emerald-600">{district.closedCases}</span>
                    <span className="text-slate-500">Top Category</span>
                    <span className="font-semibold text-blue-dark">{district.topCrimeCategory}</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Fly to selected district */}
          {districtFilter && filteredDistricts.length === 1 && (
            <MapController center={[filteredDistricts[0].lat, filteredDistricts[0].lng]} />
          )}
        </MapContainer>

        <MapLegend />
      </Card>

      {/* ── District table ─────────────────────────────── */}
      {filteredDistricts.length > 0 && (
        <Card className="p-0 overflow-x-auto">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="text-base font-semibold text-navy-900">District Summary</h3>
          </div>
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Total Crimes</th>
                <th className="px-6 py-3">Active</th>
                <th className="px-6 py-3">Closed</th>
                <th className="px-6 py-3">Top Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDistricts.map(d => (
                <tr key={`row-${d.districtId}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-navy-900">{d.districtName}</td>
                  <td className="px-6 py-3 font-bold">{d.totalCrimes}</td>
                  <td className="px-6 py-3 text-amber-600">{d.activeCases}</td>
                  <td className="px-6 py-3 text-emerald-600">{d.closedCases}</td>
                  <td className="px-6 py-3 text-blue-dark">{d.topCrimeCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
