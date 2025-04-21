import React, { useState } from 'react';

// Helper function to create labels from camelCase keys
const formatLabel = (key) => {
  if (!key) return '';
  // Handle specific acronyms or edge cases if needed
  if (key === 'bmi') return 'BMI';
  if (key === 'jvp') return 'JVP';
  if (key === 'spo2') return 'SpO2';
  if (key === 'gpala') return 'G/P/L/A';
  if (key === 'dm') return 'Diabetes Mellitus (DM)';
  if (key === 'htn') return 'Hypertension (HTN)';
  if (key === 'ihd') return 'Ischemic Heart Disease (IHD)';
  if (key === 'ugIbleed') return 'Upper GI Bleed';
  if (key === 'nasH') return 'NASH';
  if (key === 'aclD') return 'ACLD';

  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Helper to safely get nested values for display
const getNestedValue = (obj, pathArray) => {
    return pathArray.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : '', obj);
};


function GastrointestinalSystem({ onSave }) {
  const initialFormData = {
    // --- HISTORY ---
    chiefComplaints: '',
    historyOfPresentIllness: {
      abdominalDistention: {
        duration: '',
        onset: '',
        progression: '',
        aggravatingFactors: '',
        relievingFactors: '',
        associatedSymptoms: '',
        relationToPedalEdema: '', // Preceded by or followed by pedal edema?
      },
      pedalEdema: { // Note: Repeated from CVS, but relevant in GI context too (esp. liver)
        duration: '',
        onset: '',
        progression: '',
        aggravatingFactors: '',
        relievingFactors: '',
        relationToFacialPuffiness: '', // Preceded by or followed by facial puffiness?
      },
      abdominalPain: {
        onset: '',
        site: '',
        type: '',
        radiation: '',
        aggravatingFactors: '',
        relievingFactors: '',
        associatedSymptoms: '',
      },
      nauseaVomiting: {
        episodes: '',
        contents: '',
        bloodTinged: '', // Yes/No or description
        timingRelativeToFood: '', // Hours after food
        associatedWithPain: '', // Yes/No
        nonPainCausesSuspected: '', // Metabolic, Neurologic, Drug, Psychogenic
      },
      otherSymptoms: {
        heartburnFlatulenceWaterbrash: '',
        hematemesisMelena: '',
        dysphagia: '',
        constipationDiarrhea: '',
      },
      alteredBowelHabit: {
        stoolColor: '',
        stoolOdor: '',
        stoolFrequency: '',
        bloodOrMelena: '', // Yes/No or description
      },
      others: {
        jaundiceItchingUrineColor: '',
        fever: '',
        weightLoss: '',
        painOralCavity: '',
        halitosis: '',
        hiccups: '',
        otherRelevantHistory: '',
      },
    },
    // Common History Sections (reuse structure)
    pastHistory: {
      asthma: '', copd: '', tuberculosis: '', tbContact: '', dm: '', htn: '',
      ihd: '', seizureDisorder: '', other: '',
    },
    familyHistory: '', // Text area for description + pedigree mention
    personalHistory: {
      bowelHabits: '', bladderHabits: '', appetite: '', weightLoss: '', occupationalExposure: '',
      sleep: '', dietaryHabitsTaboo: '', foodAllergies: '', smokingIndexPackYears: '', alcoholHistory: '', other: '', // Specify units/grams for alcohol
    },
    menstrualObstetricHistory: {
      gpala: '', ageMenarche: '', menopauseAge: '', flowDetails: '', other: '',
    },

    // --- EXAMINATION ---
    generalExamination: { // Reused structure + GI specifics
        patientState: { conscious: '', oriented: '', cooperative: '', obeyingCommands: '' },
        anthropometry: { weightKg: '', heightM: '', bmi: '', armSpan: '', upperLowerSegmentRatio: '' },
        vitals: {
            pulseRate: '', pulseRhythm: '', pulseVolume: '', pulseCharacter: '', vesselWall: '', radioRadialDelay: '', radioFemoralDelay: '', peripheralPulses: '',
            bpRightArm: '', bpLeftArm: '', bpLegs: '', posturalDropBp: '',
            respRate: '', respPattern: '', accessoryMuscles: '', jvpWaveform: '', jvpCm: '', temperatureC: '', temperatureSite: '', spo2: '', painScore: '',
        },
        physicalExam: { pallor: '', icterus: '', cyanosis: '', clubbing: '', lymphadenopathy: '', edema: '' },
        // GI Specific General Signs
        signsOfChronicLiverFailure: {
            alopecia: '', fetorHepaticus: '', jaundiceSeverity: '', parotidSwelling: '', gynecomastia: '',
            testicularAtrophy: '', lossSecondarySexualChars: '', spiderNeviLocationCount: '', palmarErythema: '',
            dupuytrensContracture: '', asterixis: '', xanthelasma: '', cholestasisScratchMarks: '', other: '',
        }
    },
    systemicExamination: {
        inspection: {
            spine: '', shapeDistention: '', flanks: '', skin: '', symmetry: '', umbilicus: '',
            movementsWithRespiration: '', dilatedVeinsDescription: '', visibleMass: '', visiblePulsations: '',
            visiblePeristalsis: '', scarsSinuses: '', divaricationRecti: '',
        },
        auscultation: {
            bowelSoundsFrequencyCharacter: '', succussionSplash: '', bruitLocation: '', venousHumLocation: '', frictionRubLocation: '',
        },
        palpation: {
            superficial: { warmth: '', tendernessLocationGrade: '', guarding: '', rigidity: '' },
            deep: {
                liver: { palpable: '', sizeCmBelowCostalMarginMCL: '', shape: '', borderEdge: '', surface: '', tenderness: '', consistency: '', movementWithRespiration: '', pulsation: '' },
                spleen: { palpable: '', location: '', sizeHackettGrade: '', shape: '', consistency: '', surface: '', edgeNotch: '', tenderness: '', movementWithRespiration: '' },
                gallbladder: { palpableMurphysSign: '' },
                kidneys: { // Using R/L structure
                    rightPalpable: '', rightSize: '', rightShape: '', rightConsistency: '', rightSurface: '', rightEdge: '', rightTenderness: '', rightMovement: '', rightBallotable: '',
                    leftPalpable: '', leftSize: '', leftShape: '', leftConsistency: '', leftSurface: '', leftEdge: '', leftTenderness: '', leftMovement: '', leftBallotable: '',
                },
                otherMass: { location: '', size: '', shape: '', consistency: '', surface: '', mobility: '', tenderness: '', pulsation: '' },
                dippingMethodFindings: '',
                herniaOrifices: { inguinalR: '', inguinalL: '', femoralR: '', femoralL: '', umbilical: '', incisional: '', other: '' },
                veinFlowDirection: '', // Describe test and result if veins dilated
                measurements: { abdominalGirthCm: '', spinoUmbilicalDistanceCm: '', xiphiUmbilicalDistanceCm: '', umbilicoPubicDistanceCm: '', xyRatio: '' },
            }
        },
        percussion: {
            liverSpanCmMCL: '', spleenDullnessLocation: '', traubesSpace: '', // Resonant/Dull
            fluidTests: { shiftingDullness: '', fluidThrill: '', puddleSign: '' },
            generalPercussionNote: '', // Tympanitic, dull patches, etc.
        },
    },
    otherExaminations: {
        scrotum: '',
        spineTendernessDeformity: '',
        supraclavicularFossaNodes: '', // Virchow's node
        perRectalFindings: '', // Requires specific subfields if detailed (tone, mass, stool, tenderness, etc.) - keeping simple for now
        perVaginalFindings: '', // Requires specific subfields if detailed - keeping simple for now
    },
    // --- OTHER SYSTEMS & DIAGNOSIS ---
    otherSystemsReview: { // Brief summary fields
      respiratory: '',
      cardiovascular: '',
      nervousSystem: '',
    },
    diagnosisSummary: '', // Text area for formatted diagnosis (esp. for Liver Disease)
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        // Create nested object if it doesn't exist (safer for complex forms)
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

  // Helper function to render input fields for a subsection
  const renderFields = (sectionPath, fieldKeys, inputType = 'text') => {
    return fieldKeys.map((key) => {
      const fullPath = `${sectionPath}.${key}`;
      const displayValue = getNestedValue(formData, fullPath.split('.')) ?? '';

      return (
        <div key={fullPath} className="mb-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">{formatLabel(key)}</label>
          {inputType === 'textarea' ? (
             <textarea
                name={fullPath}
                value={displayValue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="2"
             />
          ) : (
             <input
                type={inputType} // Allow specifying number, date etc. if needed
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

  // Simplified renderLRFields for this context (mostly single findings per side for kidneys)
  const renderKidneyFields = (basePath, fieldKeys) => {
    const sides = ['Right', 'Left'];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {sides.map(side => (
          <div key={side}>
            <h6 className="font-medium text-sm text-gray-600 mt-1 mb-1">{side} Kidney</h6>
            {fieldKeys.map(key => {
              const fullPath = `${basePath}.${side.toLowerCase()}${key.charAt(0).toUpperCase() + key.slice(1)}`; // e.g., .rightPalpable
              const displayValue = getNestedValue(formData, fullPath.split('.')) ?? '';
               return (
                  <div key={fullPath} className="mb-1">
                    <label className="block text-xs font-medium text-gray-600 capitalize">{formatLabel(key)}</label>
                    <input
                      type="text"
                      name={fullPath}
                      value={displayValue}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-0.5 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
               );
            })}
          </div>
        ))}
      </div>
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Gastrointestinal Data:", formData);
    onSave(formData);
    setFormData(initialFormData); // Reset form
  };

  // --- Component Return (JSX) ---
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg my-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Gastrointestinal System</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* --- HISTORY SECTION --- */}
        <section className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-green-700">History</h3>

          {/* Chief Complaints */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chief Complaints (chronological order)</label>
            <textarea name="chiefComplaints" value={formData.chiefComplaints} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="3"/>
          </div>

          {/* History of Present Illness */}
          <div className="mt-4 space-y-4">
            <h4 className="font-semibold text-lg text-gray-700">History of Present Illness</h4>
            {/* Map through HPI sections */}
            <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Abdominal Distention</h5>
               {renderFields('historyOfPresentIllness.abdominalDistention', ['duration', 'onset', 'progression', 'aggravatingFactors', 'relievingFactors', 'associatedSymptoms', 'relationToPedalEdema'])}
            </div>
             <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Pedal Edema</h5>
               {renderFields('historyOfPresentIllness.pedalEdema', ['duration', 'onset', 'progression', 'aggravatingFactors', 'relievingFactors', 'relationToFacialPuffiness'])}
            </div>
            <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Abdominal Pain</h5>
               {renderFields('historyOfPresentIllness.abdominalPain', ['onset', 'site', 'type', 'radiation', 'aggravatingFactors', 'relievingFactors', 'associatedSymptoms'])}
            </div>
            <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Nausea and Vomiting</h5>
               {renderFields('historyOfPresentIllness.nauseaVomiting', ['episodes', 'contents', 'bloodTinged', 'timingRelativeToFood', 'associatedWithPain', 'nonPainCausesSuspected'])}
            </div>
             <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Other Symptoms</h5>
               {renderFields('historyOfPresentIllness.otherSymptoms', ['heartburnFlatulenceWaterbrash', 'hematemesisMelena', 'dysphagia', 'constipationDiarrhea'])}
            </div>
            <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Altered Bowel Habit</h5>
               {renderFields('historyOfPresentIllness.alteredBowelHabit', ['stoolColor', 'stoolOdor', 'stoolFrequency', 'bloodOrMelena'])}
            </div>
            <div className="pl-4 border-l-2 border-green-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Others</h5>
               {renderFields('historyOfPresentIllness.others', ['jaundiceItchingUrineColor', 'fever', 'weightLoss', 'painOralCavity', 'halitosis', 'hiccups'], 'text')}
               {renderFields('historyOfPresentIllness.others', ['otherRelevantHistory'], 'textarea')}
            </div>
          </div>

          {/* Common History Sections */}
           <div className="mt-4 space-y-4">
             <h4 className="font-semibold text-lg text-gray-700">General History</h4>
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Past History</h5>
                {renderFields('pastHistory', ['asthma', 'copd', 'tuberculosis', 'tbContact', 'dm', 'htn', 'ihd', 'seizureDisorder'])}
                {renderFields('pastHistory', ['other'], 'textarea')}
             </div>
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Family History (Note pedigree chart separately)</h5>
                {renderFields('familyHistory', [''], 'textarea')} {/* Empty key targets the section itself */}
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


        {/* --- EXAMINATION SECTION --- */}
        <section className="border p-4 rounded-lg shadow-sm mt-6">
            <h3 className="text-xl font-semibold mb-4 text-yellow-700">Examination</h3>

            {/* General Examination */}
            <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">General Examination</h4>
                 <div className="pl-4 border-l-2 border-yellow-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Patient State, Anthropometry, Vitals, Physical</h5>
                    {/* Condensing these as they are standard */}
                    {renderFields('generalExamination.patientState', ['conscious', 'oriented', 'cooperative', 'obeyingCommands'])}
                    {renderFields('generalExamination.anthropometry', ['weightKg', 'heightM', 'bmi', 'armSpan', 'upperLowerSegmentRatio'])}
                    {/* Consider a sub-component for Vitals if too long */}
                    {renderFields('generalExamination.vitals', [
                         'pulseRate', 'pulseRhythm', 'pulseVolume', 'pulseCharacter', 'vesselWall', /*... less common vitals omitted for brevity ...*/ 'bpRightArm', 'bpLeftArm', 'posturalDropBp',
                         'respRate', 'respPattern', /* ... */ 'jvpCm', 'temperatureC', 'spo2', 'painScore'
                    ])}
                    {renderFields('generalExamination.physicalExam', ['pallor', 'icterus', 'cyanosis', 'clubbing', 'lymphadenopathy', 'edema'])}

                    <h5 className="font-medium text-md text-gray-600 mt-3">Signs of Chronic Liver Failure</h5>
                     {renderFields('generalExamination.signsOfChronicLiverFailure', [
                        'alopecia', 'fetorHepaticus', 'jaundiceSeverity', 'parotidSwelling', 'gynecomastia', 'testicularAtrophy',
                        'lossSecondarySexualChars', 'spiderNeviLocationCount', 'palmarErythema', 'dupuytrensContracture',
                        'asterixis', 'xanthelasma', 'cholestasisScratchMarks', 'other'
                     ])}
                 </div>
            </div>

             {/* Systemic Examination (GI) */}
             <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Systemic Examination (Abdomen)</h4>
                 {/* Inspection */}
                 <div className="pl-4 border-l-2 border-orange-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Inspection</h5>
                    {renderFields('systemicExamination.inspection', [
                        'spine', 'shapeDistention', 'flanks', 'skin', 'symmetry', 'umbilicus', 'movementsWithRespiration',
                        'dilatedVeinsDescription', 'visibleMass', 'visiblePulsations', 'visiblePeristalsis', 'scarsSinuses', 'divaricationRecti'
                    ])}
                 </div>
                 {/* Auscultation */}
                 <div className="pl-4 border-l-2 border-orange-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Auscultation</h5>
                     {renderFields('systemicExamination.auscultation', ['bowelSoundsFrequencyCharacter', 'succussionSplash', 'bruitLocation', 'venousHumLocation', 'frictionRubLocation'])}
                 </div>
                 {/* Palpation */}
                 <div className="pl-4 border-l-2 border-orange-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Palpation</h5>
                     <div>
                         <h6 className="font-normal text-sm text-gray-500">Superficial:</h6>
                         {renderFields('systemicExamination.palpation.superficial', ['warmth', 'tendernessLocationGrade', 'guarding', 'rigidity'])}
                     </div>
                     <div className="mt-2">
                         <h6 className="font-normal text-sm text-gray-500">Deep:</h6>
                         <div className="pl-4 space-y-2">
                            <div>
                                <h6 className="font-medium text-sm text-gray-600 mt-1">Liver</h6>
                                {renderFields('systemicExamination.palpation.deep.liver', ['palpable', 'sizeCmBelowCostalMarginMCL', 'shape', 'borderEdge', 'surface', 'tenderness', 'consistency', 'movementWithRespiration', 'pulsation'])}
                            </div>
                             <div>
                                <h6 className="font-medium text-sm text-gray-600 mt-1">Spleen</h6>
                                {renderFields('systemicExamination.palpation.deep.spleen', ['palpable', 'location', 'sizeHackettGrade', 'shape', 'consistency', 'surface', 'edgeNotch', 'tenderness', 'movementWithRespiration'])}
                            </div>
                            {renderFields('systemicExamination.palpation.deep.gallbladder', ['palpableMurphysSign'])}
                             <div>
                                <h6 className="font-medium text-sm text-gray-600 mt-1">Kidneys (Bimanual)</h6>
                                {renderKidneyFields('systemicExamination.palpation.deep.kidneys', ['palpable', 'size', 'shape', 'consistency', 'surface', 'edge', 'tenderness', 'movement', 'ballotable'])}
                             </div>
                             <div>
                                <h6 className="font-medium text-sm text-gray-600 mt-1">Other Palpable Mass</h6>
                                {renderFields('systemicExamination.palpation.deep.otherMass', ['location', 'size', 'shape', 'consistency', 'surface', 'mobility', 'tenderness', 'pulsation'])}
                            </div>
                            {renderFields('systemicExamination.palpation.deep', ['dippingMethodFindings'])}
                             <div>
                                <h6 className="font-medium text-sm text-gray-600 mt-1">Hernia Orifices</h6>
                                {renderFields('systemicExamination.palpation.deep.herniaOrifices', ['inguinalR', 'inguinalL', 'femoralR', 'femoralL', 'umbilical', 'incisional', 'other'])}
                            </div>
                            {renderFields('systemicExamination.palpation.deep', ['veinFlowDirection'])}
                             <div>
                                <h6 className="font-medium text-sm text-gray-600 mt-1">Measurements</h6>
                                {renderFields('systemicExamination.palpation.deep.measurements', ['abdominalGirthCm', 'spinoUmbilicalDistanceCm', 'xiphiUmbilicalDistanceCm', 'umbilicoPubicDistanceCm', 'xyRatio'])}
                            </div>
                         </div>
                     </div>
                 </div>
                 {/* Percussion */}
                 <div className="pl-4 border-l-2 border-orange-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Percussion</h5>
                     {renderFields('systemicExamination.percussion', ['liverSpanCmMCL', 'spleenDullnessLocation', 'traubesSpace', 'generalPercussionNote'])}
                     <div>
                         <h6 className="font-normal text-sm text-gray-500">Fluid Tests:</h6>
                         {renderFields('systemicExamination.percussion.fluidTests', ['shiftingDullness', 'fluidThrill', 'puddleSign'])}
                     </div>
                 </div>
             </div>

              {/* Other Examinations */}
            <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">Other Examinations</h4>
                 <div className="pl-4 border-l-2 border-yellow-200 space-y-3">
                     {renderFields('otherExaminations', ['scrotum', 'spineTendernessDeformity', 'supraclavicularFossaNodes'])}
                     {renderFields('otherExaminations', ['perRectalFindings', 'perVaginalFindings'], 'textarea')}
                 </div>
            </div>
        </section>

        {/* --- OTHER SYSTEMS & DIAGNOSIS --- */}
        <section className="border p-4 rounded-lg shadow-sm mt-6">
             <h3 className="text-xl font-semibold mb-4 text-teal-700">Other Systems & Diagnosis</h3>
             <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Other Systems Review (Brief Summary)</h4>
                 {renderFields('otherSystemsReview', ['respiratory', 'cardiovascular', 'nervousSystem'], 'textarea')}
             </div>
             <div className="mt-6">
                 <h4 className="font-semibold text-lg text-gray-700">Diagnosis Summary</h4>
                 <p className="text-sm text-gray-500 mb-2">Follow suggested format, esp. for liver disease (e.g., stage, compensation, etiology, complications).</p>
                 <textarea
                    name="diagnosisSummary"
                    value={formData.diagnosisSummary}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows="6"
                    placeholder="Enter formatted diagnosis summary here..."
                 />
             </div>
        </section>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Save Gastrointestinal Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default GastrointestinalSystem;