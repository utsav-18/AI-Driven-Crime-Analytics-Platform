import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import {
  Dashboard,
  Cases,
  Victims,
  Accused,
  CrimeCategories,
  Districts,
  Analytics,
  Settings
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cases" element={<Cases />} />
          <Route path="victims" element={<Victims />} />
          <Route path="accused" element={<Accused />} />
          <Route path="crime-categories" element={<CrimeCategories />} />
          <Route path="districts" element={<Districts />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
