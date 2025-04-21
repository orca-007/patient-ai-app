import React, { useState } from 'react';

// Helper function to create labels from camelCase keys
const formatLabel = (key) => {
    if (!key) return '';
    // Specific acronyms/cases
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
const getNestedValue = (obj, pathArray) => {
    return pathArray.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : '', obj);
};


function RespiratorySystem({ onSave }) {
  const initialFormData = {
    // --- HISTORY ---
    chiefComplaints: '',
    historyOfPresentIllness: {
      cough: {
        duration: '', onset: '', progression: '', variation: '', diurnalVariation: '',
        seasonalVariation: '', posturalVariation: '', aggravatingFactors: '', relievingFactors: '',
      },
      expectoration: {
        duration: '', onset: '', progression: '', variation: '', diurnalVariation: '', seasonalVariation: '',
        positionalVariation: '', aggravatingRelievingFactors: '', quantity: '', colour: '', smell: '',
        bloodTinged: '', howOftenBlood: '', quantityBlood: '', freshOrAlteredBlood: '',
      },
      dyspnea: {
        duration: '', onset: '', grade: '', progression: '', aggravatingFactors: '', relievingFactors: '',
        orthopnea: '', trepopnea: '', platypnea: '', pnd: '', associatedRespComplaints: '', wheeze: '', coughWithExpectoration: '',
      },
      chestPain: {
        duration: '', onset: '', site: '', type: '', radiation: '', diurnalVariationNocturnal: '',
        variationWithRespiration: '', aggravatingFactors: '', relievingFactors: '', associatedSymptoms: '',
        nauseaVomitingSweating: '', dyspepsia: '', localTenderness: '',
      },
      wheeze: {
        duration: '', onset: '', progression: '', episodicOrContinuous: '', variation: '', allergy: '',
        skinRashes: '', aggravatingRelievingFactors: '',
      },
      fever: {
        episodicOrContinuous: '', grade: '', chillRigors: '', aggravatingFactors: '', relievingFactors: '',
        variation: '', diurnalVariation: '',
      },
      historyOf: {
        nasalDischarge: '', recurrentColdEpistaxis: '', recurrentHeadaches: '', weightLoss: '', anorexia: '',
        eveningRiseTemp: '', smoking: '', belching: '', regurgitationFood: '', hoarsenessVoice: '',
      },
    },
    // Common History Sections
    pastHistory: {
      asthma: '', copd: '', tuberculosis: '', tbContact: '', dm: '', htn: '', ihd: '', seizureDisorder: '', other: '',
    },
    familyHistory: '', // Text area for description + pedigree mention
    personalHistory: {
      bowelHabits: '', bladderHabits: '', appetite: '', weightLoss: '', occupationalExposure: '', sleep: '',
      dietaryHabitsTaboo: '', foodAllergies: '', smokingIndexPackYears: '', alcoholHistory: '', other: '',
    },
    menstrualObstetricHistory: {
      gpala: '', ageMenarche: '', menopauseAge: '', flowDetails: '', other: '',
    },

    // --- EXAMINATION ---
    generalExamination: {
        patientState: { conscious: '', oriented: '', cooperative: '', obeyingCommands: '' },
        anthropometry: { weightKg: '', heightM: '', bmi: '', armSpan: '', upperLowerSegmentRatio: '' },
        vitals: { // Selected vitals
            pulseRate: '', pulseRhythm: '', /* ... */ bpRightArm: '', bpLeftArm: '', posturalDropBp: '',
            respRate: '', respPattern: '', accessoryMuscles: '', jvpWaveform: '', jvpCm: '',
            temperatureC: '', temperatureSite: '', spo2: '', painScore: '',
        },
        physicalExam: { pallor: '', icterus: '', cyanosis: '', clubbing: '', lymphadenopathy: '', edema: '' },
        respiratoryHeadToToe: {
            oralCavity: '', accessoryMuscleUse: '', tbMarkers: '', malignancyMarkers: '', respFailureFeatures: '',
        }
    },
    systemicExamination: {
        upperRespiratoryTract: {
            nostrils: '', nasalSeptum: '', nasalPolyps: '', sinusTenderness: '', tonsils: '', postPharyngealWall: '',
        },
        lowerRespiratoryTract: {
            inspection: {
                shapeSymmetry: '', spine: '', subcostalAngle: '', trachea: '', apexBeat: '', visiblePulsationsSinusScars: '',
                movements: {
                    upperAnterior: { right: '', left: '' }, lowerAnterior: { right: '', left: '' },
                    upperPosterior: { right: '', left: '' }, lowerPosterior: { right: '', left: '' },
                }
            },
            palpation: {
                spinePositionTenderness: '', tracheaPosition: '', apexLocation: '',
                movements: { // Corresponding areas to inspection
                    supraClavicular: { right: '', left: '' }, infraClavicular: { right: '', left: '' },
                    mammary: { right: '', left: '' }, supraScapular: { right: '', left: '' }, infraScapular: { right: '', left: '' },
                },
                dimensions: {
                    transverseDiameter: '', apDiameter: '', tApRatio: '', chestCircumferenceExp: '', chestCircumferenceInsp: '',
                    rightHemithoraxExp: '', rightHemithoraxInsp: '', leftHemithoraxExp: '', leftHemithoraxInsp: '',
                    chestExpansionRight: '', chestExpansionLeft: '', spinoScapularDistanceRight: '', spinoScapularDistanceLeft: '',
                    spinoAcromialDistanceRight: '', spinoAcromialDistanceLeft: '',
                },
                vocalFremitus: { // Structure for areas
                    supraClavicular: { right: '', left: '' }, clavicular: { right: '', left: '' }, infraClavicular: { right: '', left: '' },
                    mammary: { right: '', left: '' }, axillary: { right: '', left: '' }, infraAxillary: { right: '', left: '' },
                    supraScapular: { right: '', left: '' }, interScapular: { right: '', left: '' }, infraScapular: { right: '', left: '' },
                },
                tactileFremitus: '', frictionFremitus: '', tenderness: '', subcutaneousEmphysema: '', ribCrowding: '', bonyTenderness: '',
            },
            percussion: {
                areas: { // Same areas as vocal fremitus
                    supraClavicular: { right: '', left: '' }, clavicular: { right: '', left: '' }, infraClavicular: { right: '', left: '' },
                    mammary: { right: '', left: '' }, axillary: { right: '', left: '' }, infraAxillary: { right: '', left: '' },
                    supraScapular: { right: '', left: '' }, interScapular: { right: '', left: '' }, infraScapular: { right: '', left: '' },
                },
                shiftingDullness: '', tidalPercussion: '', traubesSpace: '', kronigsIsthmus: '',
                liverDullnessLevel: '', liverSpan: '', heartBorderRight: '', heartBorderLeft: '',
            },
            auscultation: {
                breathSounds: { // Same areas
                    supraClavicular: { right: '', left: '' }, clavicular: { right: '', left: '' }, infraClavicular: { right: '', left: '' },
                    mammary: { right: '', left: '' }, axillary: { right: '', left: '' }, infraAxillary: { right: '', left: '' },
                    supraScapular: { right: '', left: '' }, interScapular: { right: '', left: '' }, infraScapular: { right: '', left: '' },
                },
                breathSoundsComment: '', // Vesicular/Bronchial etc. + Intensity comment
                vocalResonance: { // Same areas
                    supraClavicular: { right: '', left: '' }, clavicular: { right: '', left: '' }, infraClavicular: { right: '', left: '' },
                    mammary: { right: '', left: '' }, axillary: { right: '', left: '' }, infraAxillary: { right: '', left: '' },
                    supraScapular: { right: '', left: '' }, interScapular: { right: '', left: '' }, infraScapular: { right: '', left: '' },
                },
                adventitiousSounds: {
                    crepitations: '', // Description (location, timing, character)
                    rhonchi: '', // Description (location, timing, character - mono/polyphonic)
                    rubs: '', // Description (location, timing)
                },
                additionalTests: {
                    coinTest: '', bronchophony: '', egophony: '', whisperedPectoriloquy: '',
                    succussionSplash: '', postTussiveCrepts: '',
                }
            }
        }
    },
    // --- OTHER SYSTEMS & DIAGNOSIS ---
    otherSystemsReview: {
      cardiovascular: '',
      gastrointestinal: '',
      nervousSystem: '',
    },
    diagnosisSummary: '', // Text area for formatted diagnosis
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
        if (!current[keys[i]]) {
             current[keys[i]] = {}; // Create nested object if it doesn't exist
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

  // Helper function to render simple input/textarea fields
  const renderFields = (sectionPath, fieldKeys, inputType = 'text') => {
    return fieldKeys.map((key) => {
      const fullPath = `${sectionPath}.${key}`;
      const displayValue = getNestedValue(formData, fullPath.split('.')) ?? '';
      const label = formatLabel(key);

      // Handle case where key is empty string (for top-level textareas like familyHistory)
      const inputName = key ? fullPath : sectionPath;

      return (
        <div key={inputName} className="mb-2">
         {label && <label className="block text-sm font-medium text-gray-700 capitalize">{label}</label> }
          {inputType === 'textarea' ? (
             <textarea
                name={inputName}
                value={displayValue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="2"
             />
          ) : (
             <input
                type={inputType}
                name={inputName}
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
  const renderMovementLRFields = (basePath, areaKeys) => {
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
  const renderStandardAreaLRFields = (basePath, labelPrefix = '') => {
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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Respiratory Data:", formData);
    onSave(formData);
    setFormData(initialFormData); // Reset form
  };

  // --- Component Return (JSX) ---
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg my-6 max-w-4xl mx-auto"> {/* Increased max-width */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Respiratory System</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* --- HISTORY SECTION --- */}
        <section className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-cyan-700">History</h3>

          {/* Chief Complaints */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chief Complaints (chronological order)</label>
            <textarea name="chiefComplaints" value={formData.chiefComplaints} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="3"/>
          </div>

          {/* History of Present Illness */}
          <div className="mt-4 space-y-4">
            <h4 className="font-semibold text-lg text-gray-700">History of Present Illness</h4>
             {/* Cough */}
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Cough</h5>
                {renderFields('historyOfPresentIllness.cough', ['duration', 'onset', 'progression', 'variation', 'diurnalVariation', 'seasonalVariation', 'posturalVariation', 'aggravatingFactors', 'relievingFactors'])}
             </div>
             {/* Expectoration */}
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Expectoration</h5>
                {renderFields('historyOfPresentIllness.expectoration', ['duration', 'onset', 'progression', 'variation', 'diurnalVariation', 'seasonalVariation', 'positionalVariation', 'aggravatingRelievingFactors', 'quantity', 'colour', 'smell', 'bloodTinged', 'howOftenBlood', 'quantityBlood', 'freshOrAlteredBlood'])}
             </div>
             {/* Dyspnea */}
              <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Dyspnea</h5>
                {renderFields('historyOfPresentIllness.dyspnea', ['duration', 'onset', 'grade', 'progression', 'aggravatingFactors', 'relievingFactors', 'orthopnea', 'trepopnea', 'platypnea', 'pnd', 'associatedRespComplaints', 'wheeze', 'coughWithExpectoration'])}
             </div>
              {/* Chest Pain */}
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Chest Pain</h5>
                {renderFields('historyOfPresentIllness.chestPain', ['duration', 'onset', 'site', 'type', 'radiation', 'diurnalVariationNocturnal', 'variationWithRespiration', 'aggravatingFactors', 'relievingFactors', 'associatedSymptoms', 'nauseaVomitingSweating', 'dyspepsia', 'localTenderness'])}
             </div>
             {/* Wheeze */}
              <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Wheeze</h5>
                {renderFields('historyOfPresentIllness.wheeze', ['duration', 'onset', 'progression', 'episodicOrContinuous', 'variation', 'allergy', 'skinRashes', 'aggravatingRelievingFactors'])}
             </div>
              {/* Fever */}
             <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Fever</h5>
                {renderFields('historyOfPresentIllness.fever', ['episodicOrContinuous', 'grade', 'chillRigors', 'aggravatingFactors', 'relievingFactors', 'variation', 'diurnalVariation'])}
             </div>
             {/* History Of */}
              <div className="pl-4 border-l-2 border-cyan-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">History of</h5>
                {renderFields('historyOfPresentIllness.historyOf', ['nasalDischarge', 'recurrentColdEpistaxis', 'recurrentHeadaches', 'weightLoss', 'anorexia', 'eveningRiseTemp', 'smoking', 'belching', 'regurgitationFood', 'hoarsenessVoice'])}
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

        {/* --- EXAMINATION SECTION --- */}
        <section className="border p-4 rounded-lg shadow-sm mt-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Examination</h3>

            {/* General Examination */}
            <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">General Examination</h4>
                 <div className="pl-4 border-l-2 border-blue-200 space-y-3">
                    {/* Standard sections condensed */}
                    <h5 className="font-medium text-md text-gray-600">Patient State, Anthropometry, Vitals, Physical</h5>
                    {renderFields('generalExamination.patientState', ['conscious', 'oriented', 'cooperative', 'obeyingCommands'])}
                    {renderFields('generalExamination.anthropometry', ['weightKg', 'heightM', 'bmi'])}
                    {renderFields('generalExamination.vitals', ['pulseRate', 'bpRightArm', 'respRate', 'respPattern', 'accessoryMuscles', 'jvpCm', 'temperatureC', 'spo2', 'painScore'])}
                    {renderFields('generalExamination.physicalExam', ['pallor', 'icterus', 'cyanosis', 'clubbing', 'lymphadenopathy', 'edema'])}

                    <h5 className="font-medium text-md text-gray-600 mt-3">Respiratory Head to Toe Signs</h5>
                     {renderFields('generalExamination.respiratoryHeadToToe', ['oralCavity', 'accessoryMuscleUse', 'tbMarkers', 'malignancyMarkers', 'respFailureFeatures'])}
                 </div>
            </div>

            {/* Systemic Examination (Respiratory) */}
            <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Systemic Examination (Respiratory)</h4>

                 {/* Upper Respiratory Tract */}
                <div className="pl-4 border-l-2 border-sky-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Upper Respiratory Tract</h5>
                     {renderFields('systemicExamination.upperRespiratoryTract', ['nostrils', 'nasalSeptum', 'nasalPolyps', 'sinusTenderness', 'tonsils', 'postPharyngealWall'])}
                 </div>

                 {/* Lower Respiratory Tract */}
                <div className="mt-4">
                    <h5 className="font-semibold text-md text-gray-600 mb-2">Lower Respiratory Tract</h5>

                    {/* Inspection */}
                    <div className="pl-4 border-l-2 border-indigo-200 space-y-3 mb-4 pb-3">
                        <h6 className="font-medium text-base text-gray-700">Inspection</h6>
                        {renderFields('systemicExamination.lowerRespiratoryTract.inspection', ['shapeSymmetry', 'spine', 'subcostalAngle', 'trachea', 'apexBeat', 'visiblePulsationsSinusScars'])}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Movements</label>
                            {renderMovementLRFields('systemicExamination.lowerRespiratoryTract.inspection.movements', ['upperAnterior', 'lowerAnterior', 'upperPosterior', 'lowerPosterior'])}
                        </div>
                    </div>

                    {/* Palpation */}
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

                     {/* Percussion */}
                    <div className="pl-4 border-l-2 border-indigo-200 space-y-3 mb-4 pb-3">
                         <h6 className="font-medium text-base text-gray-700">Percussion</h6>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Percussion Note by Area</label>
                            {renderStandardAreaLRFields('systemicExamination.lowerRespiratoryTract.percussion.areas')}
                        </div>
                         {renderFields('systemicExamination.lowerRespiratoryTract.percussion', ['shiftingDullness', 'tidalPercussion', 'traubesSpace', 'kronigsIsthmus', 'liverDullnessLevel', 'liverSpan', 'heartBorderRight', 'heartBorderLeft'])}
                    </div>

                     {/* Auscultation */}
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


        {/* --- OTHER SYSTEMS & DIAGNOSIS --- */}
        <section className="border p-4 rounded-lg shadow-sm mt-6">
             <h3 className="text-xl font-semibold mb-4 text-teal-700">Other Systems & Diagnosis</h3>
             <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Other Systems Review (Brief Summary)</h4>
                 {renderFields('otherSystemsReview', ['cardiovascular', 'gastrointestinal', 'nervousSystem'], 'textarea')}
             </div>
             <div className="mt-6">
                 <h4 className="font-semibold text-lg text-gray-700">Diagnosis Summary</h4>
                 <p className="text-sm text-gray-500 mb-2">Format: Anatomical (Lung/Lobe/Pleura) -&gt Pathological (Consolidation/Fibrosis/Effusion/etc.) -&gt Etiological (TB/Malignancy/Smoking/etc.) -&gt Complications (Resp Failure/Cor Pulmonale).</p>
                 <textarea
                    name="diagnosisSummary"
                    value={formData.diagnosisSummary}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows="5"
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
            Save Respiratory Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default RespiratorySystem;