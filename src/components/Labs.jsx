import React, { useState } from 'react';

function Labs({ onSave }) {
  const [labs, setLabs] = useState({
    cbc: '',
    rft: '',
    lft: '',
    electrolytes: '',
    coagulation: '',
    thyroid: '',
    lipid: '',
    bloodSugar: '',
    crp: '',
    esr: '',
    dDimer: '',
    ferritin: '',
    others: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabs({ ...labs, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Labs Data:", labs);
    if (onSave) onSave(labs);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-700">🧪 Laboratory Investigations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CBC</label>
          <input name="cbc" value={labs.cbc} onChange={handleChange} placeholder="e.g., Hb 12, WBC 8000" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">RFT</label>
          <input name="rft" value={labs.rft} onChange={handleChange} placeholder="e.g., Urea 40, Creatinine 1.2" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">LFT</label>
          <input name="lft" value={labs.lft} onChange={handleChange} placeholder="e.g., SGPT 35, Bilirubin 1.0" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Electrolytes</label>
          <input name="electrolytes" value={labs.electrolytes} onChange={handleChange} placeholder="Na 138, K 4.2" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Coagulation Profile</label>
          <input name="coagulation" value={labs.coagulation} onChange={handleChange} placeholder="PT/INR, APTT" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Thyroid Panel</label>
          <input name="thyroid" value={labs.thyroid} onChange={handleChange} placeholder="TSH, T3, T4" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lipid Profile</label>
          <input name="lipid" value={labs.lipid} onChange={handleChange} placeholder="LDL, HDL, TG" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Sugar</label>
          <input name="bloodSugar" value={labs.bloodSugar} onChange={handleChange} placeholder="FBS, PPBS, HbA1c" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CRP</label>
          <input name="crp" value={labs.crp} onChange={handleChange} placeholder="C-Reactive Protein value" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ESR</label>
          <input name="esr" value={labs.esr} onChange={handleChange} placeholder="Erythrocyte Sedimentation Rate" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">D-Dimer</label>
          <input name="dDimer" value={labs.dDimer} onChange={handleChange} placeholder="D-Dimer result" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ferritin</label>
          <input name="ferritin" value={labs.ferritin} onChange={handleChange} placeholder="Ferritin value" className="mt-1 block w-full border rounded-xl px-4 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Other Tests</label>
          <textarea name="others" value={labs.others} onChange={handleChange} placeholder="Vitamin B12, Procalcitonin, HIV, etc." className="mt-1 block w-full border rounded-xl px-4 py-2"></textarea>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md"
      >
        Save Labs
      </button>
    </div>
  );
}

export default Labs;
