import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { getUserPatients } from '../lib/dbService';
import { Button } from './ui/button';

const PatientSelectorView = ({ onSelectPatient, onCreateNewPatient }) => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserPatients(currentUser.uid)
        .then(fetchedPatients => {
          setPatients(fetchedPatients);
        })
        .catch(err => {
          console.error("Error fetching patients:", err);
          setError("Failed to load patients. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setError("Please log in to view and manage patients.");
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading patients...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Select Patient</h1>
          <Button onClick={onCreateNewPatient} className="bg-green-600 hover:bg-green-700 text-white">
            Create New Patient
          </Button>
        </div>

        {patients.length === 0 ? (
          <div className="text-center p-10 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-300">No patients found for your account.</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Click "Create New Patient" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {patients.map(patient => (
              <div 
                key={patient.id} 
                onClick={() => onSelectPatient(patient.id)}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-150 ease-in-out"
              >
                <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{patient.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Age: {patient.age || 'N/A'} - Sex: {patient.sex || 'N/A'}
                </p>
                {/* Optionally, display a snippet of other info if available and useful */}
                {/* For example: <p className="text-xs text-gray-500 dark:text-gray-500">Last Visit: {patient.lastVisit || 'N/A'}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSelectorView;
