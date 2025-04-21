import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Sun, Moon, LogOut } from 'lucide-react';
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
import Medications from './components/Medications';
import LabVisualization from './components/LabVisualization';
import { useAuth } from './lib/auth';
import { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  ResponsiveStack,
  MobileOnly,
  DesktopOnly
} from './components/ResponsiveComponents';
import { savePatient, updatePatient, saveMedicalRecord, saveMedication } from './lib/dbService';

function App() {
  const [theme, setTheme] = useState('light');
  const { currentUser, logout } = useAuth();
  
  // Patient data state
  const [patientInfo, setPatientInfo] = useState({
    name: 'John Doe',
    age: '45',
    sex: 'male',
    economicStatus: 'middle'
  });
  
  const [historyData, setHistoryData] = useState({
    chiefComplaints: ['Chest pain for 2 days', 'Shortness of breath on exertion'],
    pastMedicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    pastSurgicalHistory: ['Appendectomy (2010)']
  });
  
  const [examinationData, setExaminationData] = useState({
    vitals: {
      temperature: '98.6',
      pulse: '82',
      respiratoryRate: '18',
      bloodPressure: '138/88',
      oxygenSaturation: '97'
    }
  });
  
  const [investigationData, setInvestigationData] = useState({
    labs: {
      CBC: {
        dates: ['Jan 1', 'Feb 15', 'Mar 30', 'May 15'],
        values: {
          'Hemoglobin': [14.2, 13.8, 14.0, 14.5],
          'WBC': [7500, 8200, 7800, 7600],
          'Platelets': [250000, 240000, 260000, 255000]
        },
        referenceRanges: {
          'Hemoglobin': { min: 12, max: 16 },
          'WBC': { min: 4500, max: 11000 },
          'Platelets': { min: 150000, max: 450000 }
        }
      },
      LFT: {
        dates: ['Jan 1', 'Feb 15', 'Mar 30', 'May 15'],
        values: {
          'ALT': [25, 28, 22, 24],
          'AST': [22, 24, 20, 21],
          'Bilirubin': [0.8, 0.9, 0.7, 0.8]
        },
        referenceRanges: {
          'ALT': { min: 7, max: 55 },
          'AST': { min: 8, max: 48 },
          'Bilirubin': { min: 0.1, max: 1.2 }
        }
      }
    }
  });
  
  const [diagnosisData, setDiagnosisData] = useState({
    primaryDiagnosis: 'Stable Angina',
    secondaryDiagnoses: 'Hypertension, Type 2 Diabetes Mellitus',
    differentialDiagnoses: 'Unstable Angina, Myocardial Infarction, GERD',
    treatmentPlan: 'Aspirin 81mg daily, Metoprolol 25mg twice daily, Atorvastatin 20mg at bedtime',
    followUpPlan: 'Follow up in 2 weeks, Stress test scheduled for next week',
    additionalNotes: 'Patient advised on lifestyle modifications including diet and exercise'
  });
  
  const [medicationData, setMedicationData] = useState([
    {
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      duration: 'Indefinite',
      notes: 'Take with food'
    },
    {
      name: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      duration: '3 months',
      notes: 'Monitor heart rate and blood pressure'
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('history');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  // Theme handling
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Tab navigation
  const tabOrder = ['history', 'examination', 'investigation', 'summary'];
  const currentIndex = tabOrder.indexOf(activeTab);
  const goNext = () => currentIndex < tabOrder.length - 1 && setActiveTab(tabOrder[currentIndex + 1]);
  const goPrev = () => currentIndex > 0 && setActiveTab(tabOrder[currentIndex - 1]);
  const progress = ((currentIndex + 1) / tabOrder.length) * 100;

  // Data saving handlers
  const savePatientData = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');
    
    try {
      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving patient data:", error);
      setSaveError('Failed to save patient data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ResponsiveContainer className="dark:bg-gray-900 min-h-screen bg-gray-100 py-6 transition-colors duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-800 dark:text-blue-200">
          AI Patient Management System
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={toggleTheme} className="rounded-full p-2">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <Button variant="outline" onClick={() => {}} className="rounded-full p-2">
            <LogOut size={18} />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
          {tabOrder.map((tab, idx) => (
            <span key={tab} className={idx <= currentIndex ? 'font-semibold' : ''}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <ResponsiveStack direction="row" className="max-w-7xl mx-auto">
        <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
          <Card className="dark:bg-gray-800 border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Name', 'Age'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field}
                  </label>
                  <input
                    type={field === 'Age' ? 'number' : 'text'}
                    placeholder={field}
                    value={patientInfo[field.toLowerCase()]}
                    onChange={(e) =>
                      setPatientInfo({ ...patientInfo, [field.toLowerCase()]: e.target.value })
                    }
                    className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
              
              {['sex', 'economicStatus'].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {key === 'sex' ? 'Sex' : 'Economic Status'}
                  </label>
                  <select
                    value={patientInfo[key]}
                    onChange={(e) => setPatientInfo({ ...patientInfo, [key]: e.target.value })}
                    className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                    required
                  >
                    <option value="">
                      {key === 'sex' ? 'Select Sex' : 'Economic Status'}
                    </option>
                    {(key === 'sex'
                      ? ['male', 'female', 'other']
                      : ['low', 'middle', 'high']
                    ).map((opt) => (
                      <option key={opt} value={opt} className="capitalize">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              
              <div className="pt-2">
                {saveSuccess && (
                  <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm mb-2">
                    Patient data saved successfully!
                  </div>
                )}
                
                {saveError && (
                  <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm mb-2">
                    {saveError}
                  </div>
                )}
                
                <Button 
                  onClick={savePatientData} 
                  disabled={isSaving}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSaving ? "Saving..." : "Save Patient Data"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full md:w-auto">
              {tabOrder.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="flex-1 md:flex-none">
                  <MobileOnly>{tab.charAt(0).toUpperCase()}</MobileOnly>
                  <DesktopOnly>{tab.charAt(0).toUpperCase() + tab.slice(1)}</DesktopOnly>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="history">
              <div className="space-y-4">
                <Card className="p-4 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">Chief Complaints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChiefComplaints
                      onSave={(data) =>
                        setHistoryData((prev) => ({ ...prev, chiefComplaints: data }))
                      }
                    />
                  </CardContent>
                </Card>
                
                <Card className="p-4 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">
                      Past Medical & Surgical History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PastMedicalHistory
                      onSave={(data) =>
                        setHistoryData((prev) => ({ ...prev, pastMedicalHistory: data }))
                      }
                    />
                    <PastSurgicalHistory
                      onSave={(data) =>
                        setHistoryData((prev) => ({ ...prev, pastSurgicalHistory: data }))
                      }
                    />
                  </CardContent>
                </Card>
                
                <Card className="p-4 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">
                      Family History & Allergies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FamilyHistory 
                      onSave={(data) => 
                        setHistoryData((prev) => ({ ...prev, familyHistory: data }))
                      }
                    />
                    <Allergies 
                      onSave={(data) => 
                        setHistoryData((prev) => ({ ...prev, allergies: data }))
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="examination">
              <ResponsiveGrid cols={2} className="gap-4">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">Vitals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VitalsExamination 
                      onSave={(data) => 
                        setExaminationData((prev) => ({ ...prev, vitals: data }))
                      }
                    />
                  </CardContent>
                </Card>
                
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">
                      Systems Examination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { title: 'Cardiovascular', Comp: CardiovascularSystem },
                      { title: 'Respiratory', Comp: RespiratorySystem },
                      { title: 'Gastrointestinal', Comp: GastrointestinalSystem },
                      { title: 'Neurological', Comp: NeurologicalSystem },
                    ].map(({ title, Comp }) => (
                      <Card key={title} className="mb-4 p-4 dark:bg-gray-700">
                        <CardHeader>
                          <CardTitle className="text-gray-800 dark:text-gray-100">{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Comp 
                            onSave={(data) => 
                              setExaminationData((prev) => ({ ...prev, [title.toLowerCase()]: data }))
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                    <OtherSystemicExamination 
                      onSave={(data) => 
                        setExaminationData((prev) => ({ ...prev, otherSystems: data }))
                      }
                    />
                  </CardContent>
                </Card>
              </ResponsiveGrid>
            </TabsContent>
            
            <TabsContent value="investigation">
              <div className="space-y-4">
                <Imaging 
                  onSave={(data) => 
                    setInvestigationData((prev) => ({ ...prev, imaging: data }))
                  }
                />
                <Labs 
                  onSave={(data) => 
                    setInvestigationData((prev) => ({ ...prev, labs: data }))
                  }
                />
                <LabVisualization 
                  labData={investigationData.labs} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="space-y-4">
                <DiagnosisSummary 
                  patientInfo={patientInfo}
                  symptoms={historyData.chiefComplaints}
                  labResults={investigationData.labs}
                  examFindings={examinationData}
                  onSave={(data) => setDiagnosisData(data)}
                />
                <Medications 
                  onSave={(data) => setMedicationData([...medicationData, data])}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" disabled={currentIndex === 0} onClick={goPrev}>
              Previous
            </Button>
            <Button
              onClick={goNext}
              disabled={currentIndex === tabOrder.length - 1}
            >
              {currentIndex === tabOrder.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </main>
      </ResponsiveStack>
    </ResponsiveContainer>
  );
}

export default App;
