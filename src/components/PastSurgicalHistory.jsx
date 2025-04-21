import React, { useState } from 'react';

function PastSurgicalHistory({ onSave }) {
  const [surgicalEntries, setSurgicalEntries] = useState([
    { surgery: '', year: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...surgicalEntries];
    updated[index][field] = value;
    setSurgicalEntries(updated);
  };

  const handleAdd = () => {
    setSurgicalEntries([...surgicalEntries, { surgery: '', year: '' }]);
  };

  const handleRemove = (index) => {
    const updated = surgicalEntries.filter((_, i) => i !== index);
    setSurgicalEntries(updated);
  };

  const handleSave = () => {
    const filtered = surgicalEntries.filter(entry => entry.surgery.trim() !== '');
    onSave(filtered);
  };

  return (
    <div className="space-y-4">
      {surgicalEntries.map((entry, index) => (
        <div key={index} className="grid grid-cols-12 gap-4 items-center">
          <input
            type="text"
            placeholder="Surgery"
            value={entry.surgery}
            onChange={(e) => handleChange(index, 'surgery', e.target.value)}
            className="col-span-6 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Year"
            value={entry.year}
            onChange={(e) => handleChange(index, 'year', e.target.value)}
            className="col-span-4 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="col-span-2 text-red-600 hover:text-red-800 transition"
          >
            ❌
          </button>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm transition"
        >
          ➕ Add More
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          ✅ Save Surgical History
        </button>
      </div>
    </div>
  );
}

export default PastSurgicalHistory;
