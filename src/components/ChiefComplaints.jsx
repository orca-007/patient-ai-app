import React, { useState, useEffect, useCallback } from 'react';
import { getChartingAssistance } from '../../lib/aiService'; // Adjust path if needed
import debounce from 'lodash.debounce';

const createNewComplaint = (text = '') => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // More unique ID
  text,
  aiSuggestions: null,
  isLoadingAi: false,
  aiError: null,
});

const ChiefComplaints = ({ initialData, onSave }) => {
  const [complaints, setComplaints] = useState([createNewComplaint()]);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      // Ensure initialData conforms to the new structure
      const structuredData = initialData.map(item => {
        if (typeof item === 'string') { // Handle old string array format
          return createNewComplaint(item);
        }
        // Ensure all necessary fields are present for object format
        return {
          id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
          text: item.text || '',
          aiSuggestions: item.aiSuggestions || null,
          isLoadingAi: item.isLoadingAi || false,
          aiError: item.aiError || null,
        };
      });
      setComplaints(structuredData);
    } else {
      setComplaints([createNewComplaint()]); // Start with one empty if no initial data
    }
  }, [initialData]);

  const debouncedFetchAiSuggestions = useCallback(
    debounce(async (text, complaintId) => {
      if (text.trim().length < 3) {
        setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, aiSuggestions: null, isLoadingAi: false, aiError: null } : c));
        return;
      }

      setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, isLoadingAi: true, aiError: null } : c));
      try {
        const suggestions = await getChartingAssistance(text);
        setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, aiSuggestions: suggestions, isLoadingAi: false, aiError: suggestions?.error } : c));
      } catch (err) {
        console.error("Error fetching AI suggestions:", err);
        setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, isLoadingAi: false, aiError: 'Failed to fetch suggestions.' } : c));
      }
    }, 750),
    [] // No dependencies, this function itself doesn't change
  );

  const handleChange = (id, value) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === id ? { ...complaint, text: value } : complaint
      )
    );
    debouncedFetchAiSuggestions(value, id);
  };

  const handleAdd = () => {
    if (complaints.length < 4) {
      setComplaints([...complaints, createNewComplaint()]);
    }
  };

  const handleRemove = (idToRemove) => {
    setComplaints(complaints.filter(complaint => complaint.id !== idToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredComplaints = complaints.filter(c => c.text.trim() !== '');
    if (onSave) {
      onSave(filteredComplaints); // Pass up the array of complaint objects
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Chief Complaints</h2>

      {complaints.map((complaint, index) => (
        <div key={complaint.id} className="space-y-2">
          <div className="flex gap-2 items-start">
            <textarea
              value={complaint.text}
              onChange={(e) => handleChange(complaint.id, e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder={`Complaint ${index + 1}`}
              rows={2} // Allow for slightly more text
              required
            />
            {complaints.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(complaint.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 p-2 mt-1"
                title="Remove complaint"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          {/* AI Suggestions Area */}
          <div className="pl-1 text-sm">
            {complaint.isLoadingAi && (
              <p className="text-blue-500 dark:text-blue-400">Loading AI suggestions...</p>
            )}
            {complaint.aiError && (
              <p className="text-red-500 dark:text-red-400">Error: {complaint.aiError}</p>
            )}
            {complaint.aiSuggestions && !complaint.aiError && (
              <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700/50 space-y-1">
                {complaint.aiSuggestions.suggestedIcd10Code && (
                  <p><strong className="text-gray-700 dark:text-gray-300">ICD-10:</strong> {complaint.aiSuggestions.suggestedIcd10Code}</p>
                )}
                {complaint.aiSuggestions.extractedSymptoms && complaint.aiSuggestions.extractedSymptoms.length > 0 && (
                  <p><strong className="text-gray-700 dark:text-gray-300">Symptoms:</strong> {complaint.aiSuggestions.extractedSymptoms.join(', ')}</p>
                )}
                {complaint.aiSuggestions.extractedDuration && (
                  <p><strong className="text-gray-700 dark:text-gray-300">Duration:</strong> {complaint.aiSuggestions.extractedDuration}</p>
                )}
                {complaint.aiSuggestions.extractedSeverity && (
                  <p><strong className="text-gray-700 dark:text-gray-300">Severity:</strong> {complaint.aiSuggestions.extractedSeverity}</p>
                )}
                 {complaint.aiSuggestions.rawResponse && !complaint.aiSuggestions.suggestedIcd10Code && !complaint.aiSuggestions.extractedSymptoms?.length && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Raw AI: {complaint.aiSuggestions.rawResponse.substring(0,100)}...</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={complaints.length >= 4}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
        >
          ➕ Add Complaint
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Complaints
        </button>
      </div>
    </form>
  );
};

export default ChiefComplaints;
