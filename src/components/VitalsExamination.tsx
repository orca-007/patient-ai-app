import React from 'react';
import { Patient } from '../schemas/Patient';

interface VitalsExaminationProps {
  vitals: Patient['examination']['vitals'];
  onSave: (vitals: Patient['examination']['vitals']) => void;
}

const VitalsExamination: React.FC<VitalsExaminationProps> = ({ vitals, onSave }) => {

  const handleChange = (field: keyof typeof vitals, value: string | number) => {
    onSave({ ...vitals, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Temperature (°F)</label>
          <input
            type="number"
            value={vitals.temperature || ''}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value) || 0)}
            className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pulse (bpm)</label>
          <input
            type="number"
            value={vitals.pulse || ''}
            onChange={(e) => handleChange('pulse', parseInt(e.target.value) || 0)}
            className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Respiratory Rate</label>
          <input
            type="number"
            value={vitals.respiratoryRate || ''}
            onChange={(e) => handleChange('respiratoryRate', parseInt(e.target.value) || 0)}
            className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Pressure</label>
          <input
            type="text"
            value={vitals.bloodPressure || ''}
            onChange={(e) => handleChange('bloodPressure', e.target.value)}
            placeholder="e.g. 120/80"
            className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Oxygen Saturation (%)</label>
          <input
            type="number"
            value={vitals.oxygenSaturation || ''}
            onChange={(e) => handleChange('oxygenSaturation', parseInt(e.target.value) || 0)}
            className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default VitalsExamination;
