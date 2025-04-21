import React, { useState } from 'react';

function GeneralExamination({ onSave }) {
  const [formData, setFormData] = useState({
    generalAppearance: '',
    posture: '',
    nutrition: '',
    distress: '',
    hygiene: '',
    skinColor: '',
    bodyBuilt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      generalAppearance: '',
      posture: '',
      nutrition: '',
      distress: '',
      hygiene: '',
      skinColor: '',
      bodyBuilt: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md my-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">General Examination</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Appearance */}
        <div>
          <label>General Appearance</label>
          <select
            name="generalAppearance"
            value={formData.generalAppearance}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="well">Well</option>
            <option value="ill">Ill</option>
            <option value="malnourished">Malnourished</option>
          </select>
        </div>

        {/* Posture */}
        <div>
          <label>Posture</label>
          <select
            name="posture"
            value={formData.posture}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="stooped">Stooped</option>
            <option value="rigid">Rigid</option>
          </select>
        </div>

        {/* Nutrition */}
        <div>
          <label>Nutrition</label>
          <select
            name="nutrition"
            value={formData.nutrition}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
          </select>
        </div>

        {/* Distress */}
        <div>
          <label>Distress</label>
          <select
            name="distress"
            value={formData.distress}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="mild">Mild</option>
            <option value="severe">Severe</option>
          </select>
        </div>

        {/* Hygiene */}
        <div>
          <label>Hygiene</label>
          <select
            name="hygiene"
            value={formData.hygiene}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        {/* Skin Color */}
        <div>
          <label>Skin Color</label>
          <select
            name="skinColor"
            value={formData.skinColor}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="pale">Pale</option>
            <option value="cyanotic">Cyanotic</option>
            <option value="jaundiced">Jaundiced</option>
          </select>
        </div>

        {/* Body Built */}
        <div>
          <label>Body Built</label>
          <select
            name="bodyBuilt"
            value={formData.bodyBuilt}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="overweight">Overweight</option>
            <option value="underweight">Underweight</option>
            <option value="obese">Obese</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}

export default GeneralExamination;
