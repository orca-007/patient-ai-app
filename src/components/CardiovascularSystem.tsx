import React, { useState } from 'react';

interface CardiovascularSystemData {
  chiefComplaints: string;
  dyspnea: {
    duration: string;
    onset: string;
    grade: string;
    progression: string;
    aggravatingFactors: string;
    relievingFactors: string;
    orthopnea: string;
    trepopnea: string;
    platypnea: string;
    bendopnea: string;
    paroxysmalNocturnalDyspnea: string;
    associatedSymptoms: string;
  };
  chestPain: {
    duration: string;
    onset: string;
    site: string;
    type: string;
    radiation: string;
    nocturnalAngina: string;
    aggravatingFactors: string;
    relievingFactors: string;
    associatedSymptoms: string;
  };
  palpitations: {
    duration: string;
    onset: string;
    fastOrSlow: string;
    regularOrIrregular: string;
    precipitatingFactors: string;
    associatedSymptoms: string;
  };
  syncope: {
    duration: string;
    onset: string;
    numberOfAttacks: string;
    awareness: string;
    precipitatingFactors: string;
    associatedSymptoms: string;
  };
  pedalEdema: {
    duration: string;
    onset: string;
    progression: string;
    aggravatingFactors: string;
    relievingFactors: string;
    facialPuffiness: string;
  };
  pastHistory: string;
  familyHistory: string;
  personalHistory: string;
  treatmentHistory: string;
  menstrualObstetricHistory: string;
}

interface CardiovascularSystemProps {
  onSave: (data: CardiovascularSystemData) => void;
}

const CardiovascularSystem: React.FC<CardiovascularSystemProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<CardiovascularSystemData>({
    chiefComplaints: '',
    dyspnea: {
      duration: '',
      onset: '',
      grade: '',
      progression: '',
      aggravatingFactors: '',
      relievingFactors: '',
      orthopnea: '',
      trepopnea: '',
      platypnea: '',
      bendopnea: '',
      paroxysmalNocturnalDyspnea: '',
      associatedSymptoms: '',
    },
    chestPain: {
      duration: '',
      onset: '',
      site: '',
      type: '',
      radiation: '',
      nocturnalAngina: '',
      aggravatingFactors: '',
      relievingFactors: '',
      associatedSymptoms: '',
    },
    palpitations: {
      duration: '',
      onset: '',
      fastOrSlow: '',
      regularOrIrregular: '',
      precipitatingFactors: '',
      associatedSymptoms: '',
    },
    syncope: {
      duration: '',
      onset: '',
      numberOfAttacks: '',
      awareness: '',
      precipitatingFactors: '',
      associatedSymptoms: '',
    },
    pedalEdema: {
      duration: '',
      onset: '',
      progression: '',
      aggravatingFactors: '',
      relievingFactors: '',
      facialPuffiness: '',
    },
    pastHistory: '',
    familyHistory: '',
    personalHistory: '',
    treatmentHistory: '',
    menstrualObstetricHistory: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = <T extends keyof CardiovascularSystemData>(
    section: T,
    field: keyof CardiovascularSystemData[T],
    value: string
  ) => {
    setFormData(prev => {
      const sectionData = prev[section];
      if (typeof sectionData === 'object' && sectionData !== null) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: value,
          },
        };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md my-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cardiovascular System (CVS)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chief Complaints */}
        <div>
          <label>Chief Complaints (describe in chronological order)</label>
          <textarea
            name="chiefComplaints"
            value={formData.chiefComplaints}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />
        </div>

        {/* Dyspnea Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Dyspnea</h3>
          {(Object.keys(formData.dyspnea) as Array<keyof typeof formData.dyspnea>).map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.dyspnea[field]}
                onChange={(e) => handleNestedChange('dyspnea', field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Chest Pain Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Chest Pain</h3>
          {(Object.keys(formData.chestPain) as Array<keyof typeof formData.chestPain>).map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.chestPain[field]}
                onChange={(e) => handleNestedChange('chestPain', field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Palpitations Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Palpitations</h3>
          {(Object.keys(formData.palpitations) as Array<keyof typeof formData.palpitations>).map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.palpitations[field]}
                onChange={(e) => handleNestedChange('palpitations', field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Syncope Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Syncope</h3>
          {(Object.keys(formData.syncope) as Array<keyof typeof formData.syncope>).map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.syncope[field]}
                onChange={(e) => handleNestedChange('syncope', field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Pedal Edema Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Pedal Edema</h3>
          {(Object.keys(formData.pedalEdema) as Array<keyof typeof formData.pedalEdema>).map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.pedalEdema[field]}
                onChange={(e) => handleNestedChange('pedalEdema', field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Additional History */}
        <div className="space-y-2">
          <label>Past History</label>
          <textarea
            name="pastHistory"
            value={formData.pastHistory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label>Family History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />
        </div>


        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default CardiovascularSystem;