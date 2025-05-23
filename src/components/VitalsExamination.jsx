import React, { useState, useEffect } from "react";

// This default structure should ideally match INITIAL_EXAMINATION_DATA.vitals from App.jsx
// For now, we'll keep the detailed structure here. A more robust solution might involve sharing this.
const DEFAULT_VITALS_STATE = {
  bloodPressureRightArm: "",
  bloodPressureLeftArm: "",
  bloodPressureBothLegs: "",
  posturalDrop: false,
  cbg: "",
  spO2: "",
  pulseRate: "",
  pulseRhythm: "",
  pulseVolume: "",
  pulseCharacter: "",
  pulseWallThickening: false,
  radioRadialDelay: false,
  radioFemoralDelay: false,
  peripheralPulses: false,
  respirationRate: "",
  respirationType: "",
  accessoryMusclesUsage: false,
  jugularVenousPressure: "",
  temperature: "",
  pain: "",
};

const VitalsExamination = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(DEFAULT_VITALS_STATE);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(DEFAULT_VITALS_STATE); 
    }
  }, [initialData]);
    bloodPressureRightArm: "",
    bloodPressureLeftArm: "",
    bloodPressureBothLegs: "",
    posturalDrop: false,
    cbg: "",
    spO2: "",
    pulseRate: "",
    pulseRhythm: "",
    pulseVolume: "",
    pulseCharacter: "",
    pulseWallThickening: false,
    radioRadialDelay: false,
    radioFemoralDelay: false,
    peripheralPulses: false,
    respirationRate: "",
    respirationType: "",
    accessoryMusclesUsage: false,
    jugularVenousPressure: "",
    temperature: "",
    pain: "",
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
    if (onSave) {
      onSave(formData);
    } else {
      console.log("Vitals Form Data Submitted (no onSave prop):", formData);
    }
  };

  return (
    <div className="vitals-examination">
      <h2>Vitals Examination</h2>
      <form onSubmit={handleSubmit}>
        {/* Blood Pressure Section */}
        <div className="section">
          <h3>Blood Pressure</h3>
          <label>
            Right Arm:
            <input
              type="text"
              name="bloodPressureRightArm"
              value={formData.bloodPressureRightArm}
              onChange={handleChange}
            />
          </label>
          <label>
            Left Arm:
            <input
              type="text"
              name="bloodPressureLeftArm"
              value={formData.bloodPressureLeftArm}
              onChange={handleChange}
            />
          </label>
          <label>
            Both Legs:
            <input
              type="text"
              name="bloodPressureBothLegs"
              value={formData.bloodPressureBothLegs}
              onChange={handleChange}
            />
          </label>
          <label>
            Postural Drop:
            <input
              type="checkbox"
              name="posturalDrop"
              checked={formData.posturalDrop}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Capillary Blood Glucose (CBG) Section */}
        <div className="section">
          <h3>Capillary Blood Glucose (CBG)</h3>
          <label>
            CBG (mg/dL):
            <input
              type="text"
              name="cbg"
              value={formData.cbg}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Pulse Oximetry (SpO2) Section */}
        <div className="section">
          <h3>Pulse Oximetry (SpO2)</h3>
          <label>
            SpO2 (%):
            <input
              type="text"
              name="spO2"
              value={formData.spO2}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Pulse Section */}
        <div className="section">
          <h3>Pulse</h3>
          <label>
            Rate:
            <input
              type="text"
              name="pulseRate"
              value={formData.pulseRate}
              onChange={handleChange}
            />
          </label>
          <label>
            Rhythm:
            <input
              type="text"
              name="pulseRhythm"
              value={formData.pulseRhythm}
              onChange={handleChange}
            />
          </label>
          <label>
            Volume:
            <input
              type="text"
              name="pulseVolume"
              value={formData.pulseVolume}
              onChange={handleChange}
            />
          </label>
          <label>
            Character:
            <input
              type="text"
              name="pulseCharacter"
              value={formData.pulseCharacter}
              onChange={handleChange}
            />
          </label>
          <label>
            Vessel Wall Thickening:
            <input
              type="checkbox"
              name="pulseWallThickening"
              checked={formData.pulseWallThickening}
              onChange={handleChange}
            />
          </label>
          <label>
            Radio-radial Delay:
            <input
              type="checkbox"
              name="radioRadialDelay"
              checked={formData.radioRadialDelay}
              onChange={handleChange}
            />
          </label>
          <label>
            Radio-femoral Delay:
            <input
              type="checkbox"
              name="radioFemoralDelay"
              checked={formData.radioFemoralDelay}
              onChange={handleChange}
            />
          </label>
          <label>
            Peripheral Pulses:
            <input
              type="checkbox"
              name="peripheralPulses"
              checked={formData.peripheralPulses}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Respiration Section */}
        <div className="section">
          <h3>Respiration</h3>
          <label>
            Rate:
            <input
              type="text"
              name="respirationRate"
              value={formData.respirationRate}
              onChange={handleChange}
            />
          </label>
          <label>
            Type (Abdominothoracic/Thoracoabdominal):
            <input
              type="text"
              name="respirationType"
              value={formData.respirationType}
              onChange={handleChange}
            />
          </label>
          <label>
            Usage of Accessory Muscles:
            <input
              type="checkbox"
              name="accessoryMusclesUsage"
              checked={formData.accessoryMusclesUsage}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Jugular Venous Pressure Section */}
        <div className="section">
          <h3>Jugular Venous Pressure</h3>
          <label>
            JVP:
            <input
              type="text"
              name="jugularVenousPressure"
              value={formData.jugularVenousPressure}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Temperature Section */}
        <div className="section">
          <h3>Temperature</h3>
          <label>
            Temperature (°C or °F):
            <input
              type="text"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Pain Section */}
        <div className="section">
          <h3>Pain</h3>
          <label>
            Pain (Scale 1-10):
            <input
              type="text"
              name="pain"
              value={formData.pain}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VitalsExamination;
