import React from "react";

function DiagnosisSummary({ diagnosisData }) {
  if (!diagnosisData) return null;

  const { differentials, advice, prescription, summary } = diagnosisData;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">
        🧠 AI Diagnosis Summary
      </h2>

      <div className="space-y-4">
        {/* Provisional Diagnosis / D/Ds */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600">
            📋 Differential Diagnoses
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {differentials.map((ddx, index) => (
              <li key={index}>{ddx}</li>
            ))}
          </ul>
        </div>

        {/* IPD Advice or OPD Rx */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600">
            💡 Advice / Prescription
          </h3>
          <p className="text-gray-800 mt-2 whitespace-pre-wrap">{advice || prescription}</p>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600">📄 Summary</h3>
          <p className="text-gray-800 mt-2 whitespace-pre-wrap">{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisSummary;
