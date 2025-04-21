import React, { useState } from 'react';

function CardiovascularSystem({ onSave }) {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDyspneaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dyspnea: {
        ...prev.dyspnea,
        [name]: value,
      },
    }));
  };

  const handleChestPainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      chestPain: {
        ...prev.chestPain,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
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
            rows="3"
          />
        </div>

        {/* Dyspnea Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Dyspnea</h3>
          {['duration', 'onset', 'grade', 'progression', 'aggravatingFactors', 'relievingFactors', 'orthopnea', 'trepopnea', 'platypnea', 'bendopnea', 'paroxysmalNocturnalDyspnea', 'associatedSymptoms'].map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.dyspnea[field]}
                onChange={handleDyspneaChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Chest Pain Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Chest Pain</h3>
          {['duration', 'onset', 'site', 'type', 'radiation', 'nocturnalAngina', 'aggravatingFactors', 'relievingFactors', 'associatedSymptoms'].map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.chestPain[field]}
                onChange={handleChestPainChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Palpitations Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Palpitations</h3>
          {['duration', 'onset', 'fastOrSlow', 'regularOrIrregular', 'precipitatingFactors', 'associatedSymptoms'].map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.palpitations[field]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Syncope Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Syncope</h3>
          {['duration', 'onset', 'numberOfAttacks', 'awareness', 'precipitatingFactors', 'associatedSymptoms'].map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.syncope[field]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Pedal Edema Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">Pedal Edema</h3>
          {['duration', 'onset', 'progression', 'aggravatingFactors', 'relievingFactors', 'facialPuffiness'].map((field) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData.pedalEdema[field]}
                onChange={handleChange}
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
            rows="3"
          />
        </div>

        <div className="space-y-2">
          <label>Family History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
          />
        </div>

        <div className="space-y-2">
          <label>Personal History</label>
          <textarea
            name="personalHistory"
            value={formData.personalHistory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
          />
        </div>

        <div className="space-y-2">
          <label>Treatment History</label>
          <textarea
            name="treatmentHistory"
            value={formData.treatmentHistory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
          />
        </div>

        <div className="space-y-2">
          <label>Menstrual & Obstetric History</label>
          <textarea
            name="menstrualObstetricHistory"
            value={formData.menstrualObstetricHistory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
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
}

export default CardiovascularSystem;
