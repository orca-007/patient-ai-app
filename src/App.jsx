import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Sun, Moon } from 'lucide-react';

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
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const [patientInfo, setPatientInfo] = useState({ name: '', age: '', sex: '', economicStatus: '' });
  const [historyData, setHistoryData] = useState({ chiefComplaints: [], pastMedicalHistory: [], pastSurgicalHistory: [] });
  const [activeTab, setActiveTab] = useState('history');

  const tabOrder = ['history', 'examination', 'investigation', 'summary'];
  const currentIndex = tabOrder.indexOf(activeTab);

  const goNext = () => currentIndex < tabOrder.length - 1 && setActiveTab(tabOrder[currentIndex + 1]);
  const goPrev = () => currentIndex > 0 && setActiveTab(tabOrder[currentIndex - 1]);

  const progress = ((currentIndex + 1) / tabOrder.length) * 100;

  return (
    <div className="dark:bg-gray-900 min-h-screen bg-gray-100 p-6 transition-colors duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-4">
        <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200">
          AI Patient Management System
        </h1>
        <Button variant="outline" onClick={toggleTheme} className="rounded-full p-2">
          {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
      </div>

      <div className="max-w-7xl mx-auto mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
          {tabOrder.map((tab, idx) => (
            <span key={tab} className={idx <= currentIndex ? 'font-semibold' : ''}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Name', 'Age'].map((field) => (
                <input
                  key={field}
                  type={field === 'Age' ? 'number' : 'text'}
                  placeholder={field}
                  value={patientInfo[field.toLowerCase()]}
                  onChange={(e) => setPatientInfo({ ...patientInfo, [field.toLowerCase()]: e.target.value })}
                  className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                  required
                />
              ))}
              {['sex', 'economicStatus'].map((key) => (
                <select
                  key={key}
                  value={patientInfo[key]}
                  onChange={(e) => setPatientInfo({ ...patientInfo, [key]: e.target.value })}
                  className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                  required
                >
                  <option value="">{key === 'sex' ? 'Select Sex' : 'Economic Status'}</option>
                  {(key === 'sex' ? ['male', 'female', 'other'] : ['low', 'middle', 'high']).map((opt) => (
                    <option key={opt} value={opt} className="capitalize">
                      {opt}
                    </option>
                  ))}
                </select>
              ))}
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              {tabOrder.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="history">
              <div className="space-y-4">
                <Card className="p-4 dark:bg-gray-800">
                  <CardHeader><CardTitle className="text-gray-800 dark:text-gray-100">Chief Complaints</CardTitle></CardHeader>
                  <CardContent>
                    <ChiefComplaints onSave={(data) => setHistoryData((prev) => ({ ...prev, chiefComplaints: data }))} />
                  </CardContent>
                </Card>
                <Card className="p-4 dark:bg-gray-800">
                  <CardHeader><CardTitle className="text-gray-800 dark:text-gray-100">Past Medical & Surgical History</CardTitle></CardHeader>
                  <CardContent>
                    <PastMedicalHistory onSave={(data) => setHistoryData((prev) => ({ ...prev, pastMedicalHistory: data }))} />
                    <PastSurgicalHistory onSave={(data) => setHistoryData((prev) => ({ ...prev, pastSurgicalHistory: data }))} />
                  </CardContent>
                </Card>
                <Card className="p-4 dark:bg-gray-800">
                  <CardHeader><CardTitle className="text-gray-800 dark:text-gray-100">Family History & Allergies</CardTitle></CardHeader>
                  <CardContent>
                    <FamilyHistory />
                    <Allergies />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examination">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="dark:bg-gray-800">
                  <CardHeader><CardTitle className="text-gray-800 dark:text-gray-100">Vitals</CardTitle></CardHeader>
                  <CardContent><VitalsExamination /></CardContent>
                </Card>
                <Card className="dark:bg-gray-800">
                  <CardHeader><CardTitle className="text-gray-800 dark:text-gray-100">Systems Examination</CardTitle></CardHeader>
                  <CardContent>
                    {[{ title: 'Cardiovascular', Comp: CardiovascularSystem },
                      { title: 'Respiratory', Comp: RespiratorySystem },
                      { title: 'Gastrointestinal', Comp: GastrointestinalSystem },
                      { title: 'Neurological', Comp: NeurologicalSystem }
                    ].map(({ title, Comp }) => (
                      <Card key={title} className="mb-4 p-4 dark:bg-gray-700">
                        <CardHeader><CardTitle className="text-gray-800 dark:text-gray-100">{title}</CardTitle></CardHeader>
                        <CardContent><Comp /></CardContent>
                      </Card>
                    ))}
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

          <div className="flex justify-between mt-6">
            <Button variant="outline" disabled={currentIndex === 0} onClick={goPrev}>Previous</Button>
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
