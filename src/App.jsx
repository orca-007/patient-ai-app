import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import ChiefComplaints from './components/ChiefComplaints';
import PastMedicalHistory from './components/PastMedicalHistory';
import PastSurgicalHistory from './components/PastSurgicalHistory';
import FamilyHistory from './components/FamilyHistory';
import DrugHistory from './components/DrugHistory';
import Allergies from './components/Allergies';
import VitalsExamination from './components/VitalsExamination';
import CardiovascularSystem from './components/CardiovascularSystem';
import RespiratorySystem from './components/RespiratorySystem';
import GastrointestinalSystem from './components/GastrointestinalSystem';
import NeurologicalSystem from './components/NeurologicalSystem';
import OtherSystemicExamination from './components/OtherSystemicExamination';
import Imaging from './components/Imaging';
import Labs from './components/Labs';
import DiagnosisSummary from './components/DiagnosisSummary';

function App() {
  const [patientInfo, setPatientInfo] = useState({ name: '', age: '', sex: '', economicStatus: '' });
  const [historyData, setHistoryData] = useState({
    chiefComplaints: [],
    pastMedicalHistory: [],
    pastSurgicalHistory: [],
  });
  const [activeTab, setActiveTab] = useState('history');

  const tabOrder = ['history', 'examination', 'investigation', 'summary'];
  const currentIndex = tabOrder.indexOf(activeTab);

  const goNext = () => {
    if (currentIndex < tabOrder.length - 1) setActiveTab(tabOrder[currentIndex + 1]);
  };

  const goPrev = () => {
    if (currentIndex > 0) setActiveTab(tabOrder[currentIndex - 1]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Sidebar: Patient Info */}
        <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-center md:text-left text-blue-800">
            AI Patient Management System
          </h1>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="examination">Examination</TabsTrigger>
              <TabsTrigger value="investigation">Investigation</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <div className="space-y-4">
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Chief Complaints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChiefComplaints onSave={(data) => setHistoryData((prev) => ({ ...prev, chiefComplaints: data }))} />
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Past Medical & Surgical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PastMedicalHistory onSave={(data) => setHistoryData((prev) => ({ ...prev, pastMedicalHistory: data }))} />
                    <PastSurgicalHistory onSave={(data) => setHistoryData((prev) => ({ ...prev, pastSurgicalHistory: data }))} />
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Family History & Allergies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FamilyHistory />
                    <Allergies />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examination">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vitals</CardTitle>
                  </CardHeader>
                  <CardContent><VitalsExamination /></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Systems Examination</CardTitle></CardHeader>
                  <CardContent>
                    <Card className="mb-4 p-4">
                      <CardHeader>
                        <CardTitle>Cardiovascular</CardTitle>
                      </CardHeader>
                      <CardContent><CardiovascularSystem /></CardContent>
                    </Card>
                    <Card className="mb-4 p-4">
                      <CardHeader><CardTitle>Respiratory</CardTitle></CardHeader>
                      <CardContent><RespiratorySystem /></CardContent>
                    </Card>
                    <Card className="mb-4 p-4">
                      <CardHeader><CardTitle>Gastrointestinal</CardTitle></CardHeader>
                      <CardContent><GastrointestinalSystem /></CardContent>
                    </Card>
                    <Card className="mb-4 p-4">
                      <CardHeader><CardTitle>Neurological</CardTitle></CardHeader>
                      <CardContent><NeurologicalSystem /></CardContent>
                    </Card>
                    <OtherSystemicExamination />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="investigation">
              <div className="space-y-4">
                <Imaging />
                <Labs />
              </div>
            </TabsContent>

            <TabsContent value="summary">
              <DiagnosisSummary />
            </TabsContent>
          </Tabs>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" disabled={currentIndex === 0} onClick={goPrev}>
              Previous
            </Button>
            <Button onClick={goNext} disabled={currentIndex === tabOrder.length - 1}>
              {currentIndex === tabOrder.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
