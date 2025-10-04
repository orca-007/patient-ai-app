import React, { useState } from 'react';
import { z } from 'zod';
import { neurologicalSystemSchema } from '../schemas/NeurologicalSystem';

type NeurologicalSystemData = z.infer<typeof neurologicalSystemSchema>;

interface NeurologicalSystemProps {
  onSave: (data: NeurologicalSystemData) => void;
  initialData: NeurologicalSystemData;
}

// Helper function to create labels from camelCase keys
const formatLabel = (key: string): string => {
  if (!key) return '';
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Helper to safely get nested values for display
const getNestedValue = (obj: any, pathArray: string[]): any => {
    return pathArray.reduce((acc: any, key: string) => (acc && acc[key] !== undefined) ? acc[key] : '', obj);
};

const NeurologicalSystem: React.FC<NeurologicalSystemProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<NeurologicalSystemData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const keys = name.split('.');
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev: NeurologicalSystemData) => {
      const newState = JSON.parse(JSON.stringify(prev));
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
             current[keys[i]] = {};
        }
        current = current[keys[i]];
        if (!current) {
          console.error("Invalid path in form data:", name);
          return prev;
        }
      }
      current[keys[keys.length - 1]] = val;
      return newState;
    });
  };

  // Helper function to render simple input fields for a subsection
  const renderFields = (sectionPath: string, fieldKeys: string[]) => {
    return fieldKeys.map((key) => {
      const fullPath = `${sectionPath}.${key}`;
      const displayValue = getNestedValue(formData, fullPath.split('.')) ?? '';

      return (
        <div key={fullPath} className="mb-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">{formatLabel(key)}</label>
          <input
            type="text"
            name={fullPath}
            value={displayValue}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      );
    });
  };

    // Helper for fields with R/L SUFFIXES (e.g., acuityR, acuityL)
    const renderLRFieldsSuffix = (basePath: string, fieldBaseName: string, labelOverride: string | null = null) => {
        const nameR = `${basePath}.${fieldBaseName}R`;
        const nameL = `${basePath}.${fieldBaseName}L`;
        const valueR = getNestedValue(formData, nameR.split('.'));
        const valueL = getNestedValue(formData, nameL.split('.'));
        const label = labelOverride || formatLabel(fieldBaseName);

        return (
            <div key={basePath + fieldBaseName} className="mb-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">{label}</label>
                <div className="flex space-x-2 mt-1">
                    <div className="flex-1">
                         <span className="text-xs text-gray-500">Right</span>
                        <input
                            type="text" name={nameR} value={valueR} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="R"
                        />
                    </div>
                    <div className="flex-1">
                         <span className="text-xs text-gray-500">Left</span>
                        <input
                            type="text" name={nameL} value={valueL} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="L"
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Helper for fields with right/left SUB-PROPERTIES (e.g., { right: 'val', left: 'val' })
    const renderLRFieldsSubprop = (basePath: string, label: string) => {
        const nameR = `${basePath}.right`;
        const nameL = `${basePath}.left`;
        const valueR = getNestedValue(formData, nameR.split('.'));
        const valueL = getNestedValue(formData, nameL.split('.'));

        return (
            <div key={basePath} className="mb-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">{label}</label>
                <div className="flex space-x-2 mt-1">
                    <div className="flex-1">
                        <span className="text-xs text-gray-500">Right</span>
                        <input
                            type="text" name={nameR} value={valueR} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="R"
                        />
                    </div>
                    <div className="flex-1">
                        <span className="text-xs text-gray-500">Left</span>
                        <input
                            type="text" name={nameL} value={valueL} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="L"
                        />
                    </div>
                </div>
            </div>
        );
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Neurological Data:", formData);
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg my-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Neurological System</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <section className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-purple-700">Examination</h3>
            <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">Nervous System Examination</h4>
                 {renderFields('nervousSystemExamination', ['handedness', 'education'])}

                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                      <h5 className="font-medium text-md text-gray-600">Higher Mental Functions</h5>
                      {renderFields('nervousSystemExamination.higherMentalFunctions', [
                         'consciousnessGlasgowScale', 'orientationTimePlacePerson', 'memoryImmediate', 'memoryRecent', 'memoryRemote',
                         'intelligence', 'moodEmotion', 'concentrationCalculation',
                         'speechSpontaneousComprehension', 'speechFluency', 'speechRepetition', 'speechReading', 'speechWriting', 'speechNaming', 'speechPhonation', 'speechAphasia', 'speechDysarthria',
                         'apraxias', 'hemineglect', 'hallucinationsDelusions'
                      ])}
                 </div>

                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Cranial Nerves</h5>
                     {renderLRFieldsSubprop('nervousSystemExamination.cranialNerves.olfactoryI', 'I - Olfactory (Smell)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.opticII', 'acuity', 'II - Optic (Acuity)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.opticII', 'field', 'II - Optic (Field)')}
                     {renderFields('nervousSystemExamination.cranialNerves.opticII', ['colorVision'])}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.opticII', 'fundus', 'II - Optic (Fundus)')}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">III, IV, VI - Oculomotor, Trochlear, Abducens:</h6>
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'eyelidsPtosis', 'Eyelids (Ptosis)')}
                     {renderFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', ['positionRest', 'eomSaccadic', 'eomPursuit', 'eomReflex', 'ophthalmoplegiaComment'])}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'eomUniocular', 'Uniocular Movements')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'pupilSize', 'Pupil Size (mm)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'pupilShape', 'Pupil Shape')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'directReflex', 'Pupil Direct Reflex')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'consensualReflex', 'Pupil Consensual Reflex')}
                     {renderFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', ['accommodation', 'nystagmus'])}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">V - Trigeminal:</h6>
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.trigeminalV', 'sensoryTouch', 'Sensory (Touch)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.trigeminalV', 'sensoryPain', 'Sensory (Pain)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.trigeminalV', 'sensoryTemp', 'Sensory (Temperature)')}
                     {renderFields('nervousSystemExamination.cranialNerves.trigeminalV', ['motorJawDeviation', 'motorHollowing', 'motorClenching', 'motorOpenMouthResistance', 'motorSideToSide'])}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.trigeminalV', 'reflexCorneal', 'Reflex (Corneal)')}
                     {renderFields('nervousSystemExamination.cranialNerves.trigeminalV', ['reflexJawJerk'])}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">VII - Facial:</h6>
                     {renderFields('nervousSystemExamination.cranialNerves.facialVII', ['facialAsymmetry', 'bellsPhenomenon', 'sensoryTasteAnterior23', 'lacrimation', 'hyperacusis', 'emotionalFibers'])}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.facialVII', 'motorFrontalis', 'Motor (Frontalis - Raise Eyebrows)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.facialVII', 'motorOrbicularisOculi', 'Motor (Orbicularis Oculi - Shut Eyes)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.facialVII', 'motorBuccinator', 'Motor (Buccinator - Show Teeth/Smile)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.facialVII', 'motorOrbicularisOris', 'Motor (Orbicularis Oris - Close Lips/Pout)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.facialVII', 'motorPlatysma', 'Motor (Platysma - Pull Mouth Corners Down)')}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">VIII - Vestibulocochlear:</h6>
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.vestibulocochlearVIII', 'hearingScreen', 'Hearing Screen (Rub Fingers)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.vestibulocochlearVIII', 'rinne', "Rinne's Test (AC/BC)")}
                     {renderFields('nervousSystemExamination.cranialNerves.vestibulocochlearVIII', ['weber', 'caloricTest'])}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">IX, X - Glossopharyngeal, Vagus:</h6>
                     {renderFields('nervousSystemExamination.cranialNerves.glossopharyngealVagusIXX', ['swallowingEatingVoice', 'uvulaPosition', 'uvulaMovement', 'tastePosterior13'])}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.glossopharyngealVagusIXX', 'gagReflex', 'Gag Reflex')}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">XI - Spinal Accessory:</h6>
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.spinalAccessoryXI', 'scm', 'Sternocleidomastoid (Head Turn)')}
                     {renderLRFieldsSuffix('nervousSystemExamination.cranialNerves.spinalAccessoryXI', 'trapezius', 'Trapezius (Shoulder Shrug)')}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">XII - Hypoglossal:</h6>
                     {renderFields('nervousSystemExamination.cranialNerves.hypoglossalXII', ['inspectionSizeSymmetryWasting', 'inspectionFasciculations', 'inspectionDeviation', 'inspectionTremors', 'palpationTone', 'palpationPower', 'speechImpact'])}

                 </div>

                <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Motor System</h5>
                    {renderFields('nervousSystemExamination.motorSystem', ['attitudeUpperLimb', 'attitudeLowerLimb'])}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bulk (Inspection Notes)</label>
                        <textarea name="nervousSystemExamination.motorSystem.bulkInspection" value={getNestedValue(formData, ['nervousSystemExamination', 'motorSystem', 'bulkInspection'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows={2}/>
                    </div>
                    {renderLRFieldsSuffix('nervousSystemExamination.motorSystem', 'bulkMeasurementArm', 'Bulk Measurement Arm (cm)')}
                    {renderLRFieldsSuffix('nervousSystemExamination.motorSystem', 'bulkMeasurementForearm', 'Bulk Measurement Forearm (cm)')}
                    {renderLRFieldsSuffix('nervousSystemExamination.motorSystem', 'bulkMeasurementThigh', 'Bulk Measurement Thigh (cm)')}
                    {renderLRFieldsSuffix('nervousSystemExamination.motorSystem', 'bulkMeasurementLeg', 'Bulk Measurement Leg (cm)')}

                    {renderLRFieldsSuffix('nervousSystemExamination.motorSystem', 'toneUpperLimb', 'Tone Upper Limb')}
                    {renderLRFieldsSuffix('nervousSystemExamination.motorSystem', 'toneLowerLimb', 'Tone Lower Limb')}
                    {renderFields('nervousSystemExamination.motorSystem', ['toneComment'])}

                    <h6 className="font-normal text-sm text-gray-500 mt-2">Power (MRC Scale 0-5)</h6>
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.neckFlexors', 'Neck Flexors')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.neckExtensors', 'Neck Extensors')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.shoulderAbduction', 'Shoulder Abduction')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.shoulderAdduction', 'Shoulder Adduction')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.shoulderFlexion', 'Shoulder Flexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.shoulderExtension', 'Shoulder Extension')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.elbowFlexion', 'Elbow Flexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.elbowExtension', 'Elbow Extension')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.wristFlexion', 'Wrist Flexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.wristExtension', 'Wrist Extension')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.handGrip', 'Hand Grip')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.smallMusclesHand', 'Small Muscles Hand')}
                        {renderFields('nervousSystemExamination.motorSystem.power.trunk', ['elevation', 'beevorsSign', 'intercostalBinding', 'diaphragmaticBinding'])}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.hipFlexion', 'Hip Flexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.hipExtension', 'Hip Extension')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.hipAbduction', 'Hip Abduction')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.hipAdduction', 'Hip Adduction')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.kneeFlexion', 'Knee Flexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.kneeExtension', 'Knee Extension')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.anklePlantarFlexion', 'Ankle Plantar Flexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.ankleDorsiflexion', 'Ankle Dorsiflexion')}
                        {renderLRFieldsSubprop('nervousSystemExamination.motorSystem.power.smallMusclesFootEhl', 'Small Muscles Foot / EHL')}
                </div>
            </div>
        </section>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Save Neurological Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default NeurologicalSystem;