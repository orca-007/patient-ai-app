import React from 'react';

interface ChiefComplaintsProps {
  chiefComplaints: string[];
  onSave: (complaints: string[]) => void;
}

const ChiefComplaints: React.FC<ChiefComplaintsProps> = ({ chiefComplaints, onSave }) => {

  const handleChange = (index: number, value: string) => {
    const updated = [...chiefComplaints];
    updated[index] = value;
    onSave(updated);
  };

  const handleAdd = () => {
    if (chiefComplaints.length < 4) {
      onSave([...chiefComplaints, '']);
    }
  };

  const handleRemove = (index: number) => {
    const updated = chiefComplaints.filter((_, i) => i !== index);
    onSave(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = chiefComplaints.filter(c => c.trim() !== '');
    onSave(filtered);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {chiefComplaints.map((complaint, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={complaint}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
            placeholder={`Complaint ${index + 1}`}
          />
          {chiefComplaints.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAdd}
          disabled={chiefComplaints.length >= 4}
          className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
        >
          + Add Complaint
        </button>
      </div>
    </form>
  );
};

export default ChiefComplaints;
