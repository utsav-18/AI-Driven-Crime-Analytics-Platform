import React from 'react';
export { Dashboard } from './Dashboard';
export { CrimeMap } from './CrimeMap';

const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full min-h-[500px]">
    <h1 className="text-3xl font-bold text-slate-400">{title}</h1>
  </div>
);
export const Cases = () => <Placeholder title="Cases Page" />;
export const Victims = () => <Placeholder title="Victims Page" />;
export const Accused = () => <Placeholder title="Accused Page" />;
export const CrimeCategories = () => <Placeholder title="Crime Categories Page" />;
export const Districts = () => <Placeholder title="Districts Page" />;
export const Analytics = () => <Placeholder title="Analytics Page" />;
export const Settings = () => <Placeholder title="Settings Page" />;
