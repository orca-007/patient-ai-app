import React, { useState } from 'react';

const PastMedicalHistory = ({ onSave }) => {
  const [hasHistory, setHasHistory] = useState(false);
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      hasHistory,
      details: hasHistory ? details : 'No past history'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-4 max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold">Past Medical History</h2>

      <div className="flex items-center gap-4">
        <span>Any Past Medical History?</span>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hasHistory}
            onChange={() => setHasHistory(!hasHistory)}
            className="w-4 h-4"
          />
          <span>{hasHistory ? "Yes" : "No"}</span>
        </label>
      </div>

      {hasHistory && (
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="E.g., Hypertension, Diabetes, Asthma..."
          className="w-full border rounded-lg px-3 py-2"
          rows={3}
          required
        />
      )}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Save & Continue
      </button>
    </form>
  );
};

export default PastMedicalHistory;
