import React, { useState } from 'react';

function Allergies({ onSave }) {
  const [allergies, setAllergies] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(allergies);
    setAllergies('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md my-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Allergies</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Enter any known allergies (food, drugs, environmental, etc.)"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}

export default Allergies;
