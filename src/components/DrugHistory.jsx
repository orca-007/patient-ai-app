import React, { useState } from "react";

const DrugHistory = ({ data, onChange }) => {
  const [drugHistory, setDrugHistory] = useState(data || "");

  const handleChange = (e) => {
    const value = e.target.value;
    setDrugHistory(value);
    onChange(value);
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Drug History</h2>
      <textarea
        style={{ width: "100%", minHeight: "100px", padding: "0.5rem", borderRadius: "4px" }}
        placeholder="Enter previous/current drug use including OTC, herbal, etc."
        value={drugHistory}
        onChange={handleChange}
      />
    </div>
  );
};

export default DrugHistory;
