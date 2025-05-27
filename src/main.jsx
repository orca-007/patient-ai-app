import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './lib/auth';
import PatientSelectorView from './components/PatientSelectorView.jsx'; // Import PatientSelectorView

// AppManager Component
const AppManager = () => {
  const [currentView, setCurrentView] = useState('patientSelector'); // 'patientSelector' or 'patientDetail'
  const [activePatientId, setActivePatientId] = useState(null);

  const handleSelectPatient = (patientId) => {
    setActivePatientId(patientId);
    setCurrentView('patientDetail');
  };

  const handleCreateNewPatient = () => {
    setActivePatientId(null); // No ID for a new patient yet
    setCurrentView('patientDetail');
  };

  const handleBackToPatientList = () => {
    setActivePatientId(null);
    setCurrentView('patientSelector');
  };

  if (currentView === 'patientSelector') {
    return (
      <PatientSelectorView 
        onSelectPatient={handleSelectPatient} 
        onCreateNewPatient={handleCreateNewPatient} 
      />
    );
  }

  if (currentView === 'patientDetail') {
    return (
      <App 
        key={activePatientId || 'new'} // Ensures re-mount when patient changes or for new patient
        selectedPatientId={activePatientId} 
        onBackToPatientList={handleBackToPatientList} 
      />
    );
  }

  return null; // Should not happen
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppManager /> 
    </AuthProvider>
  </React.StrictMode>,
);
