import React, { useState } from 'react';

function ObstetricHistory({ onSave }) {
  const [formData, setFormData] = useState({
    gravida: '',
    term: '',
    preterm: '',
    abortions: '',
    livingChildren: '',
    contraception: '',
    ageAtMenarche: '',
    periodDuration: '',
    periodFlow: '',
    padsChanged: '',
    clots: '',
    lmp: '',
    llmp: '',
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
      gravida: '',
      term: '',
      preterm: '',
      abortions: '',
      livingChildren: '',
      contraception: '',
      ageAtMenarche: '',
      periodDuration: '',
      periodFlow: '',
      padsChanged: '',
      clots: '',
      lmp: '',
      llmp: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md my-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Obstetric History</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* GTPAL System */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label>Gravida (No. of Pregnancies)</label>
            <input
              type="number"
              name="gravida"
              value={formData.gravida}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label>Term (No. of Full-Term Deliveries)</label>
            <input
              type="number"
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label>Preterm (No. of Preterm Deliveries)</label>
            <input
              type="number"
              name="preterm"
              value={formData.preterm}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label>Abortions (No. of Abortions)</label>
            <input
              type="number"
              name="abortions"
              value={formData.abortions}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label>Living Children</label>
            <input
              type="number"
              name="livingChildren"
              value={formData.livingChildren}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Contraception History */}
        <div>
          <label>Contraceptive Methods Used</label>
          <input
            type="text"
            name="contraception"
            value={formData.contraception}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="E.g., Pill, IUD, Condom, etc."
          />
        </div>

        {/* Menstrual History */}
        <div>
          <h3 className="text-lg font-medium mt-4 mb-2">Menstrual History</h3>
          <label>Age at Menarche</label>
          <input
            type="number"
            name="ageAtMenarche"
            value={formData.ageAtMenarche}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Period Duration (days)</label>
            <input
              type="number"
              name="periodDuration"
              value={formData.periodDuration}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label>Period Flow (Light, Normal, Heavy)</label>
            <input
              type="text"
              name="periodFlow"
              value={formData.periodFlow}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Pads Changed per Day</label>
            <input
              type="number"
              name="padsChanged"
              value={formData.padsChanged}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label>Clots (Present/Absent)</label>
            <input
              type="text"
              name="clots"
              value={formData.clots}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Last Menstrual Period (LMP)</label>
            <input
              type="date"
              name="lmp"
              value={formData.lmp}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label>Last LMP (if known)</label>
            <input
              type="date"
              name="llmp"
              value={formData.llmp}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
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

export default ObstetricHistory;
