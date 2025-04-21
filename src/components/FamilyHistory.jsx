import React, { useState } from 'react';

const FamilyHistory = ({ onSave }) => {
  const [history, setHistory] = useState('');
  
  const handleSave = () => {
    if (onSave) onSave(history);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Family History</h2>
      <textarea
        placeholder="E.g. Diabetes in father, hypertension in mother..."
        value={history}
        onChange={(e) => setHistory(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 h-24"
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Save & Continue
      </button>
    </div>
  );
};

export default FamilyHistory;
