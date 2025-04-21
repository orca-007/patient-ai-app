import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const medicationSchema = z.object({
  name: z.string().min(1, { message: "Medication name is required" }),
  dosage: z.string().min(1, { message: "Dosage is required" }),
  frequency: z.string().min(1, { message: "Frequency is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  notes: z.string().optional(),
});

function Medications({ onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      notes: ''
    }
  });

  const onSubmit = (data) => {
    if (onSave) {
      onSave(data);
    }
    reset();
  };

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-md my-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Medications & Prescriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
            <input
              {...register('name')}
              className={`w-full border rounded-lg px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter medication name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
              <input
                {...register('dosage')}
                className={`w-full border rounded-lg px-3 py-2 ${errors.dosage ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 500mg"
              />
              {errors.dosage && <p className="text-red-500 text-xs mt-1">{errors.dosage.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <input
                {...register('frequency')}
                className={`w-full border rounded-lg px-3 py-2 ${errors.frequency ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Twice daily"
              />
              {errors.frequency && <p className="text-red-500 text-xs mt-1">{errors.frequency.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                {...register('duration')}
                className={`w-full border rounded-lg px-3 py-2 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 7 days"
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              {...register('notes')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px]"
              placeholder="Additional instructions or notes"
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Medication
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Prescription Preview</h3>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-sm text-gray-600 italic">Prescription will be generated based on added medications</p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => {/* Generate prescription logic */}}
            >
              Generate Prescription
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Medications;
