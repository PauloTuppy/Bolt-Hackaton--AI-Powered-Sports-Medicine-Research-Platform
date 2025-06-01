import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AnamnesisForm from './pages/AnamnesisForm';
import SportSelectionPage from './pages/SportSelectionPage';
import MedicalDashboardPage from './pages/MedicalDashboardPage';
import AthleteComparisonPage from './pages/AthleteComparisonPage';
import TrainingPlanPage from './pages/TrainingPlanPage';
import UserProfilePage from './pages/UserProfilePage';
import DoctorPortalPage from './pages/DoctorPortalPage';
import UserSchedulePage from './pages/UserSchedulePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/anamnesis" element={<AnamnesisForm />} />
        <Route path="/sport-selection" element={<SportSelectionPage />} />
        <Route path="/medical-dashboard" element={<MedicalDashboardPage />} />
        <Route path="/athlete-comparison" element={<AthleteComparisonPage />} />
        <Route path="/training-plan" element={<TrainingPlanPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/doctor" element={<DoctorPortalPage />} />
        <Route path="/schedule" element={<UserSchedulePage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
