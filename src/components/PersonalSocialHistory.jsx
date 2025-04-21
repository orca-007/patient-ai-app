import React, { useState } from 'react';

function PersonalSocialHistory({ onSave }) {
  const [formData, setFormData] = useState({
    smoking: '',
    alcohol: '',
    drugUse: '',
    exercise: '',
    diet: '',
    stressLevels: '',
    sleepHabits: ''
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
      smoking: '',
      alcohol: '',
      drugUse: '',
      exercise: '',
      diet: '',
      stressLevels: '',
      sleepHabits: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md my-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Personal/Social History</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Smoking */}
        <div>
          <label>Smoking</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="never">Never</option>
            <option value="current">Current</option>
            <option value="former">Former</option>
          </select>
        </div>

        {/* Alcohol */}
        <div>
          <label>Alcohol Consumption</label>
          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="occasional">Occasional</option>
            <option value="regular">Regular</option>
          </select>
        </div>

        {/* Drug Use */}
        <div>
          <label>Recreational Drug Use</label>
          <select
            name="drugUse"
            value={formData.drugUse}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="current">Current</option>
            <option value="former">Former</option>
          </select>
        </div>

        {/* Exercise */}
        <div>
          <label>Exercise</label>
          <select
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="occasional">Occasional</option>
            <option value="regular">Regular</option>
          </select>
        </div>

        {/* Diet */}
        <div>
          <label>Diet</label>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {/* Stress Levels */}
        <div>
          <label>Stress Levels</label>
          <select
            name="stressLevels"
            value={formData.stressLevels}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sleep Habits */}
        <div>
          <label>Sleep Habits</label>
          <select
            name="sleepHabits"
            value={formData.sleepHabits}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
            <option value="variable">Variable</option>
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

export default PersonalSocialHistory;
