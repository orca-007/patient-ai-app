import React from 'react';

interface AllergiesProps {
  allergies: string[];
  onSave: (allergies: string[]) => void;
}

const Allergies: React.FC<AllergiesProps> = ({ allergies, onSave }) => {

  const textValue = allergies.join('\n');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        List any known allergies (one per line).
      </label>
      <textarea
        value={textValue}
        onChange={(e) => onSave(e.target.value.split('\n'))}
        placeholder="E.g., Penicillin, Peanuts"
        className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
        rows={3}
      />
    </div>
  );
};

export default Allergies;
