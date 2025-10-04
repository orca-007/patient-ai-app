import React, { useState } from "react";

interface ImagingTest {
  type: string;
  findings: string;
}

interface ImagingProps {
  onSave: (tests: ImagingTest[]) => void;
}

const Imaging: React.FC<ImagingProps> = ({ onSave }) => {
  const [imagingTests, setImagingTests] = useState<ImagingTest[]>([
    { type: "", findings: "" },
  ]);

  const handleChange = (index: number, field: keyof ImagingTest, value: string) => {
    const updatedTests = [...imagingTests];
    updatedTests[index][field] = value;
    setImagingTests(updatedTests);
    onSave(updatedTests);
  };

  const handleAddTest = () => {
    setImagingTests([...imagingTests, { type: "", findings: "" }]);
  };

  return (
    <div className="space-y-4">
      {imagingTests.map((test, index) => (
        <div key={index} className="border p-4 rounded-xl space-y-2">
          <input
            type="text"
            placeholder="Imaging Type (e.g., X-ray Chest)"
            value={test.type}
            onChange={(e) => handleChange(index, "type", e.target.value)}
            className="w-full border rounded-xl px-4 py-2"
          />
          <textarea
            placeholder="Findings"
            value={test.findings}
            onChange={(e) => handleChange(index, "findings", e.target.value)}
            className="w-full border rounded-xl px-4 py-2"
            rows={3}
          />
        </div>
      ))}
      <button
        onClick={handleAddTest}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        + Add Imaging
      </button>
    </div>
  );
}

export default Imaging;