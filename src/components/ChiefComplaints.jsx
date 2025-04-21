import React, { useState } from 'react';

const ChiefComplaints = ({ onSave }) => {
  const [complaints, setComplaints] = useState(['']);

  const handleChange = (index, value) => {
    const updated = [...complaints];
    updated[index] = value;
    setComplaints(updated);
  };

  const handleAdd = () => {
    if (complaints.length < 4) {
      setComplaints([...complaints, '']);
    }
  };

  const handleRemove = (index) => {
    const updated = complaints.filter((_, i) => i !== index);
    setComplaints(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = complaints.filter(c => c.trim() !== '');
    onSave(filtered); // Pass up to parent
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 mt-6 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Chief Complaints</h2>

      {complaints.map((complaint, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={complaint}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder={`Complaint ${index + 1}`}
            required
          />
          {complaints.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:text-red-800"
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAdd}
          disabled={complaints.length >= 4}
          className="text-blue-600 hover:text-blue-800"
        >
          ➕ Add Complaint
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Complaints
        </button>
      </div>
    </form>
  );
};

export default ChiefComplaints;
