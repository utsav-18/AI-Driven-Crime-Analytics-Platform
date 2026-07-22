import React from 'react';
import { FutureModule } from '../components/common/FutureModule';
import { 
  FileText, 
  Users, 
  UserX, 
  ShieldAlert, 
  MapPin, 
  BarChart2, 
  SettingsIcon 
} from 'lucide-react';

export { Dashboard } from './Dashboard';
export { CrimeMap } from './CrimeMap';
export { NetworkAnalysis } from './NetworkAnalysis';
export { AIAnalytics } from './AIAnalytics';

export const Cases = () => (
  <FutureModule 
    title="Cases" 
    icon={FileText} 
    features={["FIR Management", "Case Assignment", "Investigation Timeline", "Evidence Tracking"]} 
  />
);

export const Victims = () => (
  <FutureModule 
    title="Victims" 
    icon={Users} 
    features={["Victim Registry", "Medical Records", "Case Association"]} 
  />
);

export const Accused = () => (
  <FutureModule 
    title="Accused" 
    icon={UserX} 
    features={["Criminal Profiles", "Repeat Offender History", "Arrest Records"]} 
  />
);

export const CrimeCategories = () => (
  <FutureModule 
    title="Crime Categories" 
    icon={ShieldAlert} 
    features={["IPC Categories", "Crime Statistics", "Trend Analysis"]} 
  />
);

export const Districts = () => (
  <FutureModule 
    title="Districts" 
    icon={MapPin} 
    features={["District Intelligence", "Crime Density", "Officer Allocation"]} 
  />
);

export const Analytics = () => (
  <FutureModule 
    title="Analytics" 
    icon={BarChart2} 
    features={["Advanced Reports", "PDF Export", "Comparative Analytics"]} 
  />
);

export const Settings = () => (
  <FutureModule 
    title="Settings" 
    icon={SettingsIcon} 
    features={["User Preferences", "Notifications", "Security", "Role Management"]} 
  />
);
