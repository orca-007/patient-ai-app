import React, { useState } from 'react';
import ChiefComplaints from './components/ChiefComplaints';
import PastMedicalHistory from './components/PastMedicalHistory';
import PastSurgicalHistory from './components/PastSurgicalHistory';
import FamilyHistory from './components/FamilyHistory';
import DrugHistory from './components/DrugHistory';
import Allergies from './components/Allergies';
import CardiovascularSystem from './components/CardiovascularSystem';
import RespiratorySystem from './components/RespiratorySystem';
import OtherSystemicExamination from './components/OtherSystemicExamination';
import VitalsExamination from './components/VitalsExamination';
import Imaging from './components/Imaging';
import Labs from './components/Labs';
import DiagnosisSummary from './components/DiagnosisSummary';

function App() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    sex: '',
    economicStatus: ''
  });

  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [pastMedicalHistory, setPastMedicalHistory] = useState([]);
  const [pastSurgicalHistory, setPastSurgicalHistory] = useState([]);

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Info:', patientInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6 drop-shadow-sm">
          🧠 AI Patient Management System
        </h1>

        {/* Patient Info Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">👤 Patient Information</h2>
          <form onSubmit={handlePatientSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={patientInfo.age}
              onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <select
              value={patientInfo.sex}
              onChange={(e) => setPatientInfo({ ...patientInfo, sex: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select
              value={patientInfo.economicStatus}
              onChange={(e) => setPatientInfo({ ...patientInfo, economicStatus: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Economic Status</option>
              <option value="low">Low</option>
              <option value="middle">Middle</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-md"
            >
              Save & Continue →
            </button>
          </form>
        </div>

        {/* Components Section */}
        <div className="space-y-6">
          <ChiefComplaints onSave={(complaints) => setChiefComplaints(complaints)} />
          <PastMedicalHistory onSave={(data) => setPastMedicalHistory(data)} />
          <PastSurgicalHistory onSave={(data) => setPastSurgicalHistory(data)} />
          <FamilyHistory />
          <DrugHistory />
          <Allergies />
          <VitalsExamination />
          <CardiovascularSystem />
          <RespiratorySystem />
          <OtherSystemicExamination />
          <Imaging />
          <Labs />
          <DiagnosisSummary />
        </div>
      </div>
    </div>
  );
}

export default App;