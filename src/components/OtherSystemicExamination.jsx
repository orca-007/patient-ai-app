import React, { useState } from "react";

const OtherSystemicExamination = () => {
  const [formData, setFormData] = useState({
    skinColor: "",
    skinTemperature: "",
    skinTexture: "",
    nailClubbing: false,
    thyroidGoiter: false,
    thyroidTenderness: false,
    diabetesSigns: "",
    lymphadenopathy: "",
    splenomegaly: false,
    bleedingSigns: false,
    deformities: "",
    jointSwelling: "",
    muscleTone: "",
    rangeOfMotion: "",
    renalEdema: false,
    bladderDistension: false,
    urineExamination: "",
    genitalAbnormalities: "",
    pelvicExamination: "",
    breastExamination: "",
    mentalStatus: "",
    hydrationStatus: "",
    tendonReflexes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="other-systemic-examination">
      <h2>Other Systemic Examination</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Integumentary System</h3>
          <label>
            Skin Color:
            <input
              type="text"
              name="skinColor"
              value={formData.skinColor}
              onChange={handleChange}
            />
          </label>
          <label>
            Skin Temperature:
            <input
              type="text"
              name="skinTemperature"
              value={formData.skinTemperature}
              onChange={handleChange}
            />
          </label>
          <label>
            Skin Texture:
            <input
              type="text"
              name="skinTexture"
              value={formData.skinTexture}
              onChange={handleChange}
            />
          </label>
          <label>
            Nail Clubbing:
            <input
              type="checkbox"
              name="nailClubbing"
              checked={formData.nailClubbing}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Endocrine System</h3>
          <label>
            Goiter (Enlarged Thyroid):
            <input
              type="checkbox"
              name="thyroidGoiter"
              checked={formData.thyroidGoiter}
              onChange={handleChange}
            />
          </label>
          <label>
            Tenderness of Thyroid:
            <input
              type="checkbox"
              name="thyroidTenderness"
              checked={formData.thyroidTenderness}
              onChange={handleChange}
            />
          </label>
          <label>
            Signs of Diabetes:
            <input
              type="text"
              name="diabetesSigns"
              value={formData.diabetesSigns}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Hematologic System</h3>
          <label>
            Lymphadenopathy:
            <input
              type="text"
              name="lymphadenopathy"
              value={formData.lymphadenopathy}
              onChange={handleChange}
            />
          </label>
          <label>
            Splenomegaly:
            <input
              type="checkbox"
              name="splenomegaly"
              checked={formData.splenomegaly}
              onChange={handleChange}
            />
          </label>
          <label>
            Bleeding Signs (Petechiae, Purpura, Ecchymosis):
            <input
              type="checkbox"
              name="bleedingSigns"
              checked={formData.bleedingSigns}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Musculoskeletal System</h3>
          <label>
            Deformities:
            <input
              type="text"
              name="deformities"
              value={formData.deformities}
              onChange={handleChange}
            />
          </label>
          <label>
            Joint Swelling:
            <input
              type="text"
              name="jointSwelling"
              value={formData.jointSwelling}
              onChange={handleChange}
            />
          </label>
          <label>
            Muscle Tone:
            <input
              type="text"
              name="muscleTone"
              value={formData.muscleTone}
              onChange={handleChange}
            />
          </label>
          <label>
            Range of Motion:
            <input
              type="text"
              name="rangeOfMotion"
              value={formData.rangeOfMotion}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Renal/Urinary System</h3>
          <label>
            Renal Edema:
            <input
              type="checkbox"
              name="renalEdema"
              checked={formData.renalEdema}
              onChange={handleChange}
            />
          </label>
          <label>
            Bladder Distension:
            <input
              type="checkbox"
              name="bladderDistension"
              checked={formData.bladderDistension}
              onChange={handleChange}
            />
          </label>
          <label>
            Urine Examination (Protein, Blood, Glucose, pH):
            <input
              type="text"
              name="urineExamination"
              value={formData.urineExamination}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Reproductive System</h3>
          <label>
            Genital Abnormalities:
            <input
              type="text"
              name="genitalAbnormalities"
              value={formData.genitalAbnormalities}
              onChange={handleChange}
            />
          </label>
          <label>
            Pelvic Examination:
            <input
              type="text"
              name="pelvicExamination"
              value={formData.pelvicExamination}
              onChange={handleChange}
            />
          </label>
          <label>
            Breast Examination:
            <input
              type="text"
              name="breastExamination"
              value={formData.breastExamination}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Psychiatric/Mental Health</h3>
          <label>
            Mental Status Examination:
            <input
              type="text"
              name="mentalStatus"
              value={formData.mentalStatus}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="section">
          <h3>Special Tests/ Miscellaneous</h3>
          <label>
            Hydration Status:
            <input
              type="text"
              name="hydrationStatus"
              value={formData.hydrationStatus}
              onChange={handleChange}
            />
          </label>
          <label>
            Tendon Reflexes:
            <input
              type="text"
              name="tendonReflexes"
              value={formData.tendonReflexes}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OtherSystemicExamination;
