import React, { useState } from 'react';
import { z } from 'zod';
import { respiratorySystemSchema } from '../schemas/RespiratorySystem';

type RespiratorySystemData = z.infer<typeof respiratorySystemSchema>;

interface RespiratorySystemProps {
  onSave: (data: RespiratorySystemData) => void;
  initialData: RespiratorySystemData;
}

// Helper function to create labels from camelCase keys
const formatLabel = (key: string): string => {
    if (!key) return '';
    if (key === 'bmi') return 'BMI';
    if (key === 'pnd') return 'PND';
    if (key === 'dm') return 'DM';
    if (key === 'htn') return 'HTN';
    if (key === 'ihd') return 'IHD';
    if (key === 'spo2') return 'SpO2';
    if (key === 'gpala') return 'G/P/L/A';
    if (key === 'tApRatio') return 'T:AP Ratio';

    const result = key.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

// Helper to safely get nested values for display
const getNestedValue = (obj: any, pathArray: string[]): any => {
    return pathArray.reduce((acc: any, key: string) => (acc && acc[key] !== undefined) ? acc[key] : '', obj);
};


const RespiratorySystem: React.FC<RespiratorySystemProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<RespiratorySystemData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData((prev: RespiratorySystemData) => {
      const newState = JSON.parse(JSON.stringify(prev));
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
             current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  // Helper function to render simple input/textarea fields
  const renderFields = (sectionPath: string, fieldKeys: string[], inputType = 'text') => {
    return fieldKeys.map((key) => {
      const fullPath = key ? `${sectionPath}.${key}`: sectionPath;
      const displayValue = getNestedValue(formData, fullPath.split('.')) ?? '';
      const label = formatLabel(key);

      return (
        <div key={fullPath} className="mb-2">
         {label && <label className="block text-sm font-medium text-gray-700 capitalize">{label}</label> }
          {inputType === 'textarea' ? (
             <textarea
                name={fullPath}
                value={displayValue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={2}
             />
          ) : (
             <input
                type={inputType}
                name={fullPath}
                value={displayValue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
           )}
        </div>
      );
    });
  };

  // Helper function to render R/L fields for specific areas (like inspection/palpation movements)
  const renderMovementLRFields = (basePath: string, areaKeys: string[]) => {
     return areaKeys.map(areaKey => {
        const fullPath = `${basePath}.${areaKey}`;
        const valueR = getNestedValue(formData, `${fullPath}.right`.split('.'));
        const valueL = getNestedValue(formData, `${fullPath}.left`.split('.'));
        const label = formatLabel(areaKey);

        return (
            <div key={fullPath} className="mb-2 p-2 border border-gray-200 rounded">
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{label}</label>
                <div className="flex space-x-2">
                    <div className="flex-1">
                         <span className="text-xs text-gray-500">Right</span>
                        <input type="text" name={`${fullPath}.right`} value={valueR} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm mt-0.5" placeholder="R findings"/>
                    </div>
                    <div className="flex-1">
                         <span className="text-xs text-gray-500">Left</span>
                        <input type="text" name={`${fullPath}.left`} value={valueL} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm mt-0.5" placeholder="L findings"/>
                    </div>
                </div>
            </div>
        );
     });
  };

  // Helper function to render R/L fields for standardized areas (VF, Perc, Ausc)
  const renderStandardAreaLRFields = (basePath: string, labelPrefix = '') => {
      const areas = [
          'supraClavicular', 'clavicular', 'infraClavicular', 'mammary',
          'axillary', 'infraAxillary', 'supraScapular', 'interScapular', 'infraScapular'
      ];
      return areas.map(areaKey => {
        const fullPath = `${basePath}.${areaKey}`;
        const valueR = getNestedValue(formData, `${fullPath}.right`.split('.'));
        const valueL = getNestedValue(formData, `${fullPath}.left`.split('.'));
        const label = `${labelPrefix} ${formatLabel(areaKey)}`;

        return (
            <div key={fullPath} className="mb-2 grid grid-cols-3 items-center gap-x-2">
                 <label className="text-sm font-medium text-gray-700 capitalize col-span-1 justify-self-start">{label}</label>
                 <input type="text" name={`${fullPath}.right`} value={valueR} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm col-span-1" placeholder="Right"/>
                 <input type="text" name={`${fullPath}.left`} value={valueL} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm col-span-1" placeholder="Left"/>
            </div>
        );
      });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Respiratory Data:", formData);
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg my-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Respiratory System</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <section className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-cyan-700">History</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chief Complaints (chronological order)</label>
            <textarea name="chiefComplaints" value={formData.chiefComplaints} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows={3}/>
          </div>

          <div className="mt-4 space-y-4">
            <h4 className="font-semibold text-lg text-gray-700">History of Present Illness</h4>
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Cough</h5>
                {renderFields('historyOfPresentIllness.cough', ['duration', 'onset', 'progression', 'variation', 'diurnalVariation', 'seasonalVariation', 'posturalVariation', 'aggravatingFactors', 'relievingFactors'])}
             </div>
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Expectoration</h5>
                {renderFields('historyOfPresentIllness.expectoration', ['duration', 'onset', 'progression', 'variation', 'diurnalVariation', 'seasonalVariation', 'positionalVariation', 'aggravatingRelievingFactors', 'quantity', 'colour', 'smell', 'bloodTinged', 'howOftenBlood', 'quantityBlood', 'freshOrAlteredBlood'])}
             </div>
              <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Dyspnea</h5>
                {renderFields('historyOfPresentIllness.dyspnea', ['duration', 'onset', 'grade', 'progression', 'aggravatingFactors', 'relievingFactors', 'orthopnea', 'trepopnea', 'platypnea', 'pnd', 'associatedRespComplaints', 'wheeze', 'coughWithExpectoration'])}
             </div>
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Chest Pain</h5>
                {renderFields('historyOfPresentIllness.chestPain', ['duration', 'onset', 'site', 'type', 'radiation', 'diurnalVariationNocturnal', 'variationWithRespiration', 'aggravatingFactors', 'relievingFactors', 'associatedSymptoms', 'nauseaVomitingSweating', 'dyspepsia', 'localTenderness'])}
             </div>
              <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Wheeze</h5>
                {renderFields('historyOfPresentIllness.wheeze', ['duration', 'onset', 'progression', 'episodicOrContinuous', 'variation', 'allergy', 'skinRashes', 'aggravatingRelievingFactors'])}
             </div>
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Fever</h5>
                {renderFields('historyOfPresentIllness.fever', ['episodicOrContinuous', 'grade', 'chillRigors', 'aggravatingFactors', 'relievingFactors', 'variation', 'diurnalVariation'])}
             </div>
              <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">History of</h5>
                {renderFields('historyOfPresentIllness.historyOf', ['nasalDischarge', 'recurrentColdEpistaxis', 'recurrentHeadaches', 'weightLoss', 'anorexia', 'eveningRiseTemp', 'smoking', 'belching', 'regurgitationFood', 'hoarsenessVoice'])}
             </div>
          </div>

          <div className="mt-4 space-y-4">
             <h4 className="font-semibold text-lg text-gray-700">General History</h4>
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Past History</h5>
                {renderFields('pastHistory', ['asthma', 'copd', 'tuberculosis', 'tbContact', 'dm', 'htn', 'ihd', 'seizureDisorder'])}
                {renderFields('pastHistory', ['other'], 'textarea')}
             </div>
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Family History (Note pedigree chart separately)</h5>
                {renderFields('familyHistory', [''], 'textarea')}
             </div>
              <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                 <h5 className="font-medium text-md text-gray-600">Personal History</h5>
                 {renderFields('personalHistory', ['bowelHabits', 'bladderHabits', 'appetite', 'weightLoss', 'occupationalExposure', 'sleep', 'dietaryHabitsTaboo', 'foodAllergies', 'smokingIndexPackYears', 'alcoholHistory'])}
                 {renderFields('personalHistory', ['other'], 'textarea')}
             </div>
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                 <h5 className="font-medium text-md text-gray-600">Menstrual & Obstetric History</h5>
                 {renderFields('menstrualObstetricHistory', ['gpala', 'ageMenarche', 'menopauseAge', 'flowDetails'])}
                 {renderFields('menstrualObstetricHistory', ['other'], 'textarea')}
             </div>
          </div>
        </section>

        <section className="border p-4 rounded-lg shadow-sm mt-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Examination</h3>

            <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">Systemic Examination (Respiratory)</h4>

                 <div className="pl-4 border-l-2 border-sky-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Upper Respiratory Tract</h5>
                     {renderFields('systemicExamination.upperRespiratoryTract', ['nostrils', 'nasalSeptum', 'nasalPolyps', 'sinusTenderness', 'tonsils', 'postPharyngealWall'])}
                 </div>

                <div className="mt-4">
                    <h5 className="font-semibold text-md text-gray-600 mb-2">Lower Respiratory Tract</h5>

                    <div className="pl-4 border-l-2 border-indigo-200 space-y-3 mb-4 pb-3">
                        <h6 className="font-medium text-base text-gray-700">Inspection</h6>
                        {renderFields('systemicExamination.lowerRespiratoryTract.inspection', ['shapeSymmetry', 'spine', 'subcostalAngle', 'trachea', 'apexBeat', 'visiblePulsationsSinusScars'])}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Movements</label>
                            {renderMovementLRFields('systemicExamination.lowerRespiratoryTract.inspection.movements', ['upperAnterior', 'lowerAnterior', 'upperPosterior', 'lowerPosterior'])}
                        </div>
                    </div>

                     <div className="pl-4 border-l-2 border-indigo-200 space-y-3 mb-4 pb-3">
                        <h6 className="font-medium text-base text-gray-700">Palpation</h6>
                        {renderFields('systemicExamination.lowerRespiratoryTract.palpation', ['spinePositionTenderness', 'tracheaPosition', 'apexLocation'])}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Movements (Palpated)</label>
                            {renderMovementLRFields('systemicExamination.lowerRespiratoryTract.palpation.movements', ['supraClavicular', 'infraClavicular', 'mammary', 'supraScapular', 'infraScapular'])}
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions/Measurements</label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                {renderFields('systemicExamination.lowerRespiratoryTract.palpation.dimensions', ['transverseDiameter', 'apDiameter', 'tApRatio', 'chestCircumferenceExp', 'chestCircumferenceInsp', 'rightHemithoraxExp', 'rightHemithoraxInsp', 'leftHemithoraxExp', 'leftHemithoraxInsp', 'chestExpansionRight', 'chestExpansionLeft', 'spinoScapularDistanceRight', 'spinoScapularDistanceLeft', 'spinoAcromialDistanceRight', 'spinoAcromialDistanceLeft'])}
                             </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vocal Fremitus</label>
                            {renderStandardAreaLRFields('systemicExamination.lowerRespiratoryTract.palpation.vocalFremitus')}
                        </div>
                        {renderFields('systemicExamination.lowerRespiratoryTract.palpation', ['tactileFremitus', 'frictionFremitus', 'tenderness', 'subcutaneousEmphysema', 'ribCrowding', 'bonyTenderness'])}
                    </div>

                    <div className="pl-4 border-l-2 border-indigo-200 space-y-3 mb-4 pb-3">
                         <h6 className="font-medium text-base text-gray-700">Percussion</h6>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Percussion Note by Area</label>
                            {renderStandardAreaLRFields('systemicExamination.lowerRespiratoryTract.percussion.areas')}
                        </div>
                         {renderFields('systemicExamination.lowerRespiratoryTract.percussion', ['shiftingDullness', 'tidalPercussion', 'traubesSpace', 'kronigsIsthmus', 'liverDullnessLevel', 'liverSpan', 'heartBorderRight', 'heartBorderLeft'])}
                    </div>

                    <div className="pl-4 border-l-2 border-indigo-200 space-y-3 mb-4 pb-3">
                         <h6 className="font-medium text-base text-gray-700">Auscultation</h6>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Breath Sounds by Area</label>
                            {renderStandardAreaLRFields('systemicExamination.lowerRespiratoryTract.auscultation.breathSounds')}
                            {renderFields('systemicExamination.lowerRespiratoryTract.auscultation', ['breathSoundsComment'], 'textarea')}
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vocal Resonance by Area</label>
                            {renderStandardAreaLRFields('systemicExamination.lowerRespiratoryTract.auscultation.vocalResonance')}
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adventitious Sounds</label>
                            {renderFields('systemicExamination.lowerRespiratoryTract.auscultation.adventitiousSounds', ['crepitations', 'rhonchi', 'rubs'], 'textarea')}
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Tests</label>
                            {renderFields('systemicExamination.lowerRespiratoryTract.auscultation.additionalTests', ['coinTest', 'bronchophony', 'egophony', 'whisperedPectoriloquy', 'succussionSplash', 'postTussiveCrepts'])}
                         </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="border p-4 rounded-lg shadow-sm mt-6">
             <h3 className="text-xl font-semibold mb-4 text-teal-700">Other Systems & Diagnosis</h3>
             <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Other Systems Review (Brief Summary)</h4>
                 {renderFields('otherSystemsReview', ['cardiovascular', 'gastrointestinal', 'nervousSystem'], 'textarea')}
             </div>
             <div className="mt-6">
                 <h4 className="font-semibold text-lg text-gray-700">Diagnosis Summary</h4>
                 <p className="text-sm text-gray-500 mb-2">Format: Anatomical (Lung/Lobe/Pleura) -&gt; Pathological (Consolidation/Fibrosis/Effusion/etc.) -&gt; Etiological (TB/Malignancy/Smoking/etc.) -&gt; Complications (Resp Failure/Cor Pulmonale).</p>
                 <textarea
                    name="diagnosisSummary"
                    value={formData.diagnosisSummary}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows={5}
                    placeholder="Enter formatted diagnosis summary here..."
                 />
             </div>
        </section>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Save Respiratory Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default RespiratorySystem;