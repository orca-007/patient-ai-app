import React, { useState } from 'react';
import { z } from 'zod';
import { otherSystemicExaminationSchema } from '../schemas/OtherSystemicExamination';

type OtherSystemicExaminationData = z.infer<typeof otherSystemicExaminationSchema>;

interface OtherSystemicExaminationProps {
  onSave: (data: OtherSystemicExaminationData) => void;
  initialData: OtherSystemicExaminationData;
}

const OtherSystemicExamination: React.FC<OtherSystemicExaminationProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<OtherSystemicExaminationData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: OtherSystemicExaminationData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg my-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Other Systemic Examination</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="other-systemic-summary" className="block text-sm font-medium text-gray-700">
                    Other Systemic Examination Summary
                </label>
                <textarea
                    id="other-systemic-summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter findings for other systems (e.g., musculoskeletal, dermatological, endocrine, etc.)..."
                />
            </div>
            <div className="mt-8 flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                    Save Other Systems Data
                </button>
            </div>
        </form>
    </div>
  );
};

export default OtherSystemicExamination;