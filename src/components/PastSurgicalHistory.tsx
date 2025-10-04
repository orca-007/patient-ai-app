import React from 'react';

interface PastSurgicalHistoryProps {
  pastSurgicalHistory: string[];
  onSave: (history: string[]) => void;
}

const PastSurgicalHistory: React.FC<PastSurgicalHistoryProps> = ({ pastSurgicalHistory, onSave }) => {

  const textValue = pastSurgicalHistory.join('\n');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        List any past surgical procedures (one per line).
      </label>
      <textarea
        value={textValue}
        onChange={(e) => onSave(e.target.value.split('\n'))}
        placeholder="E.g., Appendectomy (2010)"
        className="w-full border dark:border-gray-600 bg-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
        rows={3}
      />
    </div>
  );
};

export default PastSurgicalHistory;
