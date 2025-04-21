import React, { useState } from 'react';

// Helper function to create labels from camelCase keys (optional, but improves readability)
const formatLabel = (key) => {
  if (!key) return '';
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

function NeurologicalSystem({ onSave }) {
  const initialFormData = {
    // --- HISTORY ---
    chiefComplaints: '', // Keep as top level
    historyOfPresentIllness: {
      higherMentalFunction: {
        alteredConsciousness: {
          onset: '',
          seizuresBlackouts: '',
          fallInjuries: '',
          earNoseBleed: '',
          fever: '',
          earPainDischarge: '',
          drugHistory: '',
          addictions: '',
        },
        mentalStateCognition: {
          memoryChanges: '',
          alertnessDrowsiness: '',
          moodAffectChanges: '',
          languageChanges: '',
          spatialOrientationLoss: '',
          diminishedAdl: '',
        },
        otherHigherMental: {
          speechDifficulty: '',
          recognitionDifficulty: '',
          inappropriateEmotion: '',
          lackOfInterest: '',
          socialDisinhibition: '',
          delusionsHallucinations: '',
        },
      },
      cranialNerveDysfunction: { // Simple text area for description + specific prompts
        description: '',
        lossVisionSmellTaste: '',
        facialFeelingAlteration: '',
        doubleVisionVisualSymptoms: '',
        swallowingChewingProblems: '',
        speechAlterations: '',
        vertigoHearingAbnormalities: '',
        hoarsenessDysphagiaNasalRegurgitationIntonation: '',
        painNeckMovements: '',
        exampleLmn7th: '', // Example text area
      },
      motorDysfunction: {
        weakness: {
          distribution: '',
          symmetry: '',
          paresisPlegia: '',
          limbsInvolved: '',
          ipsilateralContralateral: '',
          patternedWeakness: '',
          exampleMcaInfarct: '', // Example text area
          onsetProgression: '',
          ascendingDescending: '',
          ellsbergPhenomenon: '',
          diurnalVariation: '',
          proximalUpperLimb: '',
          distalUpperLimb: '',
          proximalLowerLimb: '',
          distalLowerLimb: '',
          neckMuscles: '',
          trunkWeakness: '',
          exampleGbs: '', // Example text area
        },
        wastingLossOfBulk: {
          wasting: '',
          fasciculations: '',
        },
        stiffness: {
          stiffness: '',
          heaviness: '',
        },
        gaitAbnormalities: {
          limpDragging: '',
          scissoringCircumduction: '',
        },
        involuntaryMovements: {
          type: '',
          symmetry: '',
          partInvolved: '',
          presentAtRest: '',
          functionalDisability: '',
        },
      },
      sensoryDysfunction: {
        numbnessLoss: '',
        alteredFeeling: {
          paraesthesia: '',
          dysesthesias: '',
          spontaneousPain: '',
        },
        pattern: '',
      },
      cerebellarHistory: {
        swayingToOneSide: '',
        tremorsReaching: '',
        lackOfCoordination: '',
        overshootingActs: '',
        abnormalEyeMovements: '',
      },
      meningitisRaisedICP: {
        headache: '',
        neckPain: '',
        projectileVomiting: '',
        blurringVision: '',
        seizures: '',
        photophobia: '',
      },
      autonomicDysfunction: {
        drynessSkin: '',
        palpitations: '',
        perspiration: '',
        syncopalAttacksPosturalGiddiness: '',
        bladderDysfunction: {
          retention: '',
          awarenessLoss: '',
          frequencyUrgency: '',
          urgeOverflowIncontinence: '',
        },
      },
    },
    reviewOfSymptoms: {
      headaches: { // Very detailed, mapping might be good here
        onsetDuration: '', location: '', severity: '', frequency: '', radiation: '',
        quality: '', typeContinuous: '', typePulsating: '', typeStabbing: '', typeSharp: '', typeThrobbing: '', typeDull: '', typeThunderclap: '',
        alleviatingFactors: '', triggersAggravatingFactors: '', temporalAssociation: '', associatedNauseaVomitingTearingRedness: '',
        visionChangesDuringHeadache: '', precipitatingStress: '', precipitatingMenses: '', precipitatingAllergens: '', precipitatingSleepDeprivation: '',
        precipitatingCoughStrainBend: '', associatedMotorSensorySymptoms: '', photophobiaPhonophobia: '',
        systemicSymptoms: '', feverNeckStiffness: '', historyHeadTrauma: '', historyMigraine: '', familyHistoryMigraine: '',
        effectOnDailyActivities: '', useOcp: '', caffeineIntake: '', smokingAlcohol: '',
        exampleMigraine: '', // Example text area
      },
      seizures: { // Detailed, mapping candidate
        onsetDuration: '', frequency: '', precipitatingFactors: '', injurySustained: '', postictalSymptoms: '',
        associatedSensoryDeficits: '', associatedMotorDeficits: '', associatedCognitiveDeficits: '', muscleSpasms: '',
        anatomicalProgression: '', auraSymptoms: '', associatedIncontinence: '', tongueBitingSalivation: '',
        automatisms: '', historyHeadTrauma: '', perinatalInfection: '', drugHistory: '', historySeizureDisorder: '',
        familyHistorySeizureDisorders: '', effectOnDailyActivities: '',
        exampleGtcs: '', // Example text area
      },
    },
    // Common History Sections (reuse structure from CVS)
    pastHistory: { // Specific Neuro-relevant points + general
        asthma: '', copd: '', tuberculosis: '', tbContact: '', diabetesMellitus: '', hypertension: '',
        ischemicHeartDisease: '', seizureDisorderDrugs: '', other: '',
    },
    familyHistory: '', // Text area for description + pedigree mention
    personalHistory: { // Specific points + general
        bowelHabits: '', bladderHabits: '', appetite: '', weightLoss: '', occupationalExposure: '',
        sleep: '', dietaryHabitsTaboo: '', foodAllergies: '', smokingIndexPackYears: '', alcoholGramsUnits: '', other: '',
    },
    menstrualObstetricHistory: { // Same as CVS
        gpala: '', ageMenarche: '', menopauseAge: '', flowDetails: '', other: '',
    },
    // --- EXAMINATION ---
    generalExamination: {
        patientState: { conscious: '', oriented: '', cooperative: '', obeyingCommands: '' },
        anthropometry: { weightKg: '', heightM: '', bmi: '', armSpan: '', upperLowerSegmentRatio: '' },
        vitals: {
            pulseRate: '', pulseRhythm: '', pulseVolume: '', pulseCharacter: '', vesselWall: '', radioRadialDelay: '', radioFemoralDelay: '', peripheralPulses: '',
            carotidVertebralBruit: '', bpRightArm: '', bpLeftArm: '', bpLegs: '', posturalDropBp: '',
            respRate: '', respPattern: '', accessoryMuscles: '', jvpWaveform: '', jvpCm: '', temperatureC: '', temperatureSite: '', spo2: '', painScore: '',
        },
        physicalExam: { pallor: '', icterus: '', cyanosis: '', clubbing: '', lymphadenopathy: '', edema: '' },
        neuroSpecificGeneral: { nerveThickening: '', neurocutaneousMarkers: '', atherosclerosisMarkers: '', nutritionalDeficiencySigns: '', other: '' },
    },
    nervousSystemExamination: {
      handedness: '',
      education: '',
      higherMentalFunctions: {
        consciousnessGlasgowScale: '', orientationTimePlacePerson: '',
        memoryImmediate: '', memoryRecent: '', memoryRemote: '',
        intelligence: '', moodEmotion: '', concentrationCalculation: '',
        speechSpontaneousComprehension: '', speechFluency: '', speechRepetition: '', speechReading: '', speechWriting: '', speechNaming: '', speechPhonation: '', speechAphasia: '', speechDysarthria: '',
        apraxias: '', hemineglect: '', hallucinationsDelusions: '',
      },
      cranialNerves: { // Structure per nerve with R/L where applicable
        olfactoryI: { right: '', left: '' },
        opticII: { acuityR: '', acuityL: '', fieldR: '', fieldL: '', colorVision: '', fundusR: '', fundusL: '' },
        oculomotorTrochlearAbducensIIIIIVI: {
          eyelidsPtosisR: '', eyelidsPtosisL: '', positionRest: '', eomSaccadic: '', eomPursuit: '', eomReflex: '', eomUniocularR: '', eomUniocularL: '', ophthalmoplegiaComment: '',
          pupilSizeR: '', pupilSizeL: '', pupilShapeR: '', pupilShapeL: '', directReflexR: '', directReflexL: '', consensualReflexR: '', consensualReflexL: '', accommodation: '', nystagmus: ''
        },
        trigeminalV: {
          sensoryTouchR: '', sensoryTouchL: '', sensoryPainR: '', sensoryPainL: '', sensoryTempR: '', sensoryTempL: '',
          motorJawDeviation: '', motorHollowing: '', motorClenching: '', motorOpenMouthResistance: '', motorSideToSide: '',
          reflexCornealR: '', reflexCornealL: '', reflexJawJerk: ''
        },
        facialVII: {
          facialAsymmetry: '', motorFrontalisR: '', motorFrontalisL: '', motorOrbicularisOculiR: '', motorOrbicularisOculiL: '',
          motorBuccinatorR: '', motorBuccinatorL: '', motorOrbicularisOrisR: '', motorOrbicularisOrisL: '', motorPlatysmaR: '', motorPlatysmaL: '', bellsPhenomenon: '',
          sensoryTasteAnterior23: '', lacrimation: '', hyperacusis: '', emotionalFibers: ''
        },
        vestibulocochlearVIII: { hearingScreenR: '', hearingScreenL: '', rinneR: '', rinneL: '', weber: '', caloricTest: '' },
        glossopharyngealVagusIXX: { swallowingEatingVoice: '', uvulaPosition: '', uvulaMovement: '', gagReflexR: '', gagReflexL: '', tastePosterior13: '' },
        spinalAccessoryXI: { scmR: '', scmL: '', trapeziusR: '', trapeziusL: '' },
        hypoglossalXII: {
          inspectionSizeSymmetryWasting: '', inspectionFasciculations: '', inspectionDeviation: '', inspectionTremors: '',
          palpationTone: '', palpationPower: '', speechImpact: ''
        }
      },
      motorSystem: {
        attitudeUpperLimb: '', attitudeLowerLimb: '',
        bulkInspection: '',
        bulkMeasurementArmR: '', bulkMeasurementArmL: '', bulkMeasurementForearmR: '', bulkMeasurementForearmL: '',
        bulkMeasurementThighR: '', bulkMeasurementThighL: '', bulkMeasurementLegR: '', bulkMeasurementLegL: '',
        toneUpperLimbR: '', toneUpperLimbL: '', toneLowerLimbR: '', toneLowerLimbL: '', toneComment: '',
        power: { // Group by joint/action, then R/L
          neckFlexors: { right: '', left: '' }, neckExtensors: { right: '', left: '' },
          shoulderAbduction: { right: '', left: '' }, shoulderAdduction: { right: '', left: '' }, shoulderFlexion: { right: '', left: '' }, shoulderExtension: { right: '', left: '' },
          elbowFlexion: { right: '', left: '' }, elbowExtension: { right: '', left: '' },
          wristFlexion: { right: '', left: '' }, wristExtension: { right: '', left: '' },
          handGrip: { right: '', left: '' }, smallMusclesHand: { right: '', left: '' },
          trunk: { elevation: '', beevorsSign: '', intercostalBinding: '', diaphragmaticBinding: '' },
          hipFlexion: { right: '', left: '' }, hipExtension: { right: '', left: '' }, hipAbduction: { right: '', left: '' }, hipAdduction: { right: '', left: '' },
          kneeFlexion: { right: '', left: '' }, kneeExtension: { right: '', left: '' },
          anklePlantarFlexion: { right: '', left: '' }, ankleDorsiflexion: { right: '', left: '' },
          smallMusclesFootEhl: { right: '', left: '' },
        }
      },
      reflexes: {
        superficial: {
          cornealR: '', cornealL: '', abdominalEpigastricR: '', abdominalEpigastricL: '', abdominalMidR: '', abdominalMidL: '', abdominalHypogastricR: '', abdominalHypogastricL: '',
          cremastericR: '', cremastericL: '', analReflex: '', plantarR: '', plantarL: '',
          chaddocksR: '', chaddocksL: '', gordonsR: '', gordonsL: '', oppenheimsR: '', oppenheimsL: '', schaffersR: '', schaffersL: '', gondasR: '', gondasL: '', stranskysR: '', stranskysL: '', bingsR: '', bingsL: '',
        },
        deepTendon: { // Add grade convention comment in UI
          jawJerk: '', bicepsR: '', bicepsL: '', brachioradialR: '', brachioradialL: '', tricepsR: '', tricepsL: '',
          kneeJerkR: '', kneeJerkL: '', ankleJerkR: '', ankleJerkL: '',
          clonusPatellarR: '', clonusPatellarL: '', clonusAnkleR: '', clonusAnkleL: ''
        },
        latent: { tromnerHoffmannR: '', tromnerHoffmannL: '', wartenbergR: '', wartenbergL: '' },
        primitive: { glabellarTap: '', palmoMentalR: '', palmoMentalL: '', sucking: '', rooting: '', poutSnout: '', grasp: '' },
        involuntaryMovementsDescription: '', // Text area
      },
      sensorySystem: {
        primary: {
          touchR: '', touchL: '', temperatureR: '', temperatureL: '', vibrationR: '', vibrationL: '', jointPositionR: '', jointPositionL: '',
          sensoryLevel: '', pattern: ''
        },
        cortical: {
          tactileLocalizationR: '', tactileLocalizationL: '', twoPointDiscriminationR: '', twoPointDiscriminationL: '',
          stereognosisR: '', stereognosisL: '', graphesthesiaR: '', graphesthesiaL: '', sensoryExtinction: ''
        },
        rombergsTest: '',
      },
      cerebellarSigns: {
        upperExtremity: {
          limbAtaxiaOutstretchedR: '', limbAtaxiaOutstretchedL: '', fingerNoseR: '', fingerNoseL: '', noseFingerNoseR: '', noseFingerNoseL: '', fingerFingerR: '', fingerFingerL: '',
          rapidAlternatingHandsR: '', rapidAlternatingHandsL: '', rapidAlternatingPronationSupinationR: '', rapidAlternatingPronationSupinationL: '', rapidAlternatingThighSlapR: '', rapidAlternatingThighSlapL: '',
          pointingPastPointingR: '', pointingPastPointingL: '', writingR: '', writingL: '', reboundPhenomenonR: '', reboundPhenomenonL: '', intentionTremorR: '', intentionTremorL: '',
        },
        lowerLimbs: {
          heelKneeR: '', heelKneeL: '', pendularKneeJerkR: '', pendularKneeJerkL: '', fingerToeR: '', fingerToeL: '', rapidAlternatingFootTapR: '', rapidAlternatingFootTapL: '',
        },
        general: { titubation: '', nystagmus: '', tremors: '', hypotonia: '', truncalAtaxia: '', tandemWalking: '' },
        gaitDescription: '', // Detailed description from list
      },
      meningealIrritation: { neckStiffness: '', kernigsSign: '', brudzinskisSign: '' },
      autonomicSigns: { skinDrynessSweating: '', posturalHypotension: '', heartRateVariability: '', palpableBladder: '', pupillaryReactions: '', valsalva: '' },
      skullSpine: { deformities: '', tenderness: '', shortNeck: '' },
      softNeurologicalSigns: { pyramidalDrift: '', cerebellarDrift: '', parietalDrift: '' }
    },
    // --- OTHER SYSTEMS & DIAGNOSIS ---
    otherSystemsReview: {
      respiratory: '',
      cardiovascular: '',
      gastrointestinal: '',
    },
    diagnosisSummary: '', // Text area for formatted diagnosis
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');
    const val = type === 'checkbox' ? checked : value; // Handle checkboxes if needed later

    setFormData(prev => {
      // Deep copy function to handle nested updates safely
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
        // Optional: Add check if path is invalid, though structured names should prevent this
        if (!current) {
          console.error("Invalid path in form data:", name);
          return prev; // Return previous state if path is broken
        }
      }
      current[keys[keys.length - 1]] = val;
      return newState;
    });
  };

  // Helper function to render input fields for a subsection
  const renderFields = (sectionPath, fieldKeys) => {
    return fieldKeys.map((key) => {
      const fullPath = `${sectionPath}.${key}`;
      // Access nested value safely
      const keys = fullPath.split('.');
      let value = formData;
      try {
          for (const k of keys) {
              value = value[k];
          }
      } catch (error) {
          // Handle cases where intermediate objects might not exist yet, though initial state should cover this.
          console.warn(`Error accessing formData for ${fullPath}, setting value to ''`);
          value = '';
      }
      // Ensure value is not undefined or null for controlled input
      const displayValue = value ?? '';

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

    // Helper function to render L/R input fields side-by-side
    const renderLRFields = (basePath, fieldBaseName, labelOverride = null) => {
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
                            type="text"
                            name={nameR}
                            value={valueR}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="R"
                        />
                    </div>
                    <div className="flex-1">
                         <span className="text-xs text-gray-500">Left</span>
                        <input
                            type="text"
                            name={nameL}
                            value={valueL}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="L"
                        />
                    </div>
                </div>
            </div>
        );
    };

   // Helper to safely get nested values for display
    const getNestedValue = (obj, pathArray) => {
        return pathArray.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : '', obj);
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Neurological Data:", formData); // Log before saving
    onSave(formData);
    // Resetting the form - ensure this matches the initial state structure exactly
    setFormData(initialFormData);
  };

  // --- Component Return (JSX) ---
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg my-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Neurological System</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* --- HISTORY SECTION --- */}
        <section className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">History</h3>

          {/* Chief Complaints */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chief Complaints (describe in chronological order)</label>
            <textarea
              name="chiefComplaints"
              value={formData.chiefComplaints}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>

          {/* History of Present Illness */}
          <div className="mt-4 space-y-4">
            <h4 className="font-semibold text-lg text-gray-700">History of Present Illness</h4>

            {/* Higher Mental Function History */}
            <div className="pl-4 border-l-2 border-blue-200 space-y-3">
              <h5 className="font-medium text-md text-gray-600">Higher Mental Function</h5>
              <div>
                 <h6 className="font-normal text-sm text-gray-500">Altered state of consciousness:</h6>
                 {renderFields('historyOfPresentIllness.higherMentalFunction.alteredConsciousness', ['onset', 'seizuresBlackouts', 'fallInjuries', 'earNoseBleed', 'fever', 'earPainDischarge', 'drugHistory', 'addictions'])}
              </div>
               <div>
                 <h6 className="font-normal text-sm text-gray-500">Mental state and cognition:</h6>
                 {renderFields('historyOfPresentIllness.higherMentalFunction.mentalStateCognition', ['memoryChanges', 'alertnessDrowsiness', 'moodAffectChanges', 'languageChanges', 'spatialOrientationLoss', 'diminishedAdl'])}
              </div>
              <div>
                 <h6 className="font-normal text-sm text-gray-500">Other higher mental functions:</h6>
                 {renderFields('historyOfPresentIllness.higherMentalFunction.otherHigherMental', ['speechDifficulty', 'recognitionDifficulty', 'inappropriateEmotion', 'lackOfInterest', 'socialDisinhibition', 'delusionsHallucinations'])}
              </div>
            </div>

            {/* Cranial Nerve Dysfunction History */}
            <div className="pl-4 border-l-2 border-blue-200 space-y-3">
              <h5 className="font-medium text-md text-gray-600">Cranial Nerve Dysfunction</h5>
              {renderFields('historyOfPresentIllness.cranialNerveDysfunction', [
                  'lossVisionSmellTaste', 'facialFeelingAlteration', 'doubleVisionVisualSymptoms', 'swallowingChewingProblems',
                  'speechAlterations', 'vertigoHearingAbnormalities', 'hoarsenessDysphagiaNasalRegurgitationIntonation', 'painNeckMovements'
              ])}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description / Examples (e.g., LMN 7th Palsy details)</label>
                <textarea name="historyOfPresentIllness.cranialNerveDysfunction.description" value={getNestedValue(formData, ['historyOfPresentIllness', 'cranialNerveDysfunction', 'description'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500" rows="3"/>
              </div>
            </div>

            {/* Motor Dysfunction History */}
            <div className="pl-4 border-l-2 border-blue-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Motor Dysfunction</h5>
               {/* Weakness Subsection */}
               <div>
                    <h6 className="font-normal text-sm text-gray-500">Weakness:</h6>
                    {renderFields('historyOfPresentIllness.motorDysfunction.weakness', [
                        'distribution', 'symmetry', 'paresisPlegia', 'limbsInvolved', 'ipsilateralContralateral', 'patternedWeakness',
                        'onsetProgression', 'ascendingDescending', 'ellsbergPhenomenon', 'diurnalVariation', 'proximalUpperLimb',
                        'distalUpperLimb', 'proximalLowerLimb', 'distalLowerLimb', 'neckMuscles', 'trunkWeakness'
                    ])}
                    <label className="block text-sm font-medium text-gray-700 mt-2">Example (MCA Infarct)</label>
                    <textarea name="historyOfPresentIllness.motorDysfunction.weakness.exampleMcaInfarct" value={getNestedValue(formData, ['historyOfPresentIllness', 'motorDysfunction', 'weakness', 'exampleMcaInfarct'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                    <label className="block text-sm font-medium text-gray-700 mt-2">Example (GBS)</label>
                    <textarea name="historyOfPresentIllness.motorDysfunction.weakness.exampleGbs" value={getNestedValue(formData, ['historyOfPresentIllness', 'motorDysfunction', 'weakness', 'exampleGbs'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
               </div>
                {/* Other Motor Subsections */}
                {renderFields('historyOfPresentIllness.motorDysfunction.wastingLossOfBulk', ['wasting', 'fasciculations'])}
                {renderFields('historyOfPresentIllness.motorDysfunction.stiffness', ['stiffness', 'heaviness'])}
                {renderFields('historyOfPresentIllness.motorDysfunction.gaitAbnormalities', ['limpDragging', 'scissoringCircumduction'])}
                {renderFields('historyOfPresentIllness.motorDysfunction.involuntaryMovements', ['type', 'symmetry', 'partInvolved', 'presentAtRest', 'functionalDisability'])}
            </div>

            {/* Sensory Dysfunction History */}
             <div className="pl-4 border-l-2 border-blue-200 space-y-3">
               <h5 className="font-medium text-md text-gray-600">Sensory Dysfunction</h5>
                {renderFields('historyOfPresentIllness.sensoryDysfunction', ['numbnessLoss', 'pattern'])}
                 <div>
                     <h6 className="font-normal text-sm text-gray-500">Altered feeling:</h6>
                    {renderFields('historyOfPresentIllness.sensoryDysfunction.alteredFeeling', ['paraesthesia', 'dysesthesias', 'spontaneousPain'])}
                 </div>
            </div>

            {/* Cerebellar History */}
            <div className="pl-4 border-l-2 border-blue-200 space-y-3">
              <h5 className="font-medium text-md text-gray-600">Cerebellar History</h5>
              {renderFields('historyOfPresentIllness.cerebellarHistory', ['swayingToOneSide', 'tremorsReaching', 'lackOfCoordination', 'overshootingActs', 'abnormalEyeMovements'])}
            </div>

            {/* Meningitis/Raised ICP History */}
             <div className="pl-4 border-l-2 border-blue-200 space-y-3">
              <h5 className="font-medium text-md text-gray-600">Meningitis / Raised ICP</h5>
              {renderFields('historyOfPresentIllness.meningitisRaisedICP', ['headache', 'neckPain', 'projectileVomiting', 'blurringVision', 'seizures', 'photophobia'])}
            </div>

            {/* Autonomic Dysfunction History */}
            <div className="pl-4 border-l-2 border-blue-200 space-y-3">
              <h5 className="font-medium text-md text-gray-600">Autonomic Dysfunction</h5>
               {renderFields('historyOfPresentIllness.autonomicDysfunction', ['drynessSkin', 'palpitations', 'perspiration', 'syncopalAttacksPosturalGiddiness'])}
                <div>
                    <h6 className="font-normal text-sm text-gray-500">Bladder Dysfunction:</h6>
                    {renderFields('historyOfPresentIllness.autonomicDysfunction.bladderDysfunction', ['retention', 'awarenessLoss', 'frequencyUrgency', 'urgeOverflowIncontinence'])}
                </div>
            </div>
          </div>

          {/* Review of Symptoms (Headaches, Seizures) */}
           <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Review of Common Neurological Symptoms</h4>
                {/* Headaches */}
                <div className="pl-4 border-l-2 border-green-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Headaches</h5>
                     {/* Render headache fields (can be long, consider grouping) */}
                     {renderFields('reviewOfSymptoms.headaches', [
                        'onsetDuration', 'location', 'severity', 'frequency', 'radiation', 'quality', 'typeContinuous', 'typePulsating', 'typeStabbing', 'typeSharp', 'typeThrobbing', 'typeDull', 'typeThunderclap',
                        'alleviatingFactors', 'triggersAggravatingFactors', 'temporalAssociation', 'associatedNauseaVomitingTearingRedness',
                        'visionChangesDuringHeadache', 'precipitatingStress', 'precipitatingMenses', 'precipitatingAllergens', 'precipitatingSleepDeprivation',
                        'precipitatingCoughStrainBend', 'associatedMotorSensorySymptoms', 'photophobiaPhonophobia',
                        'systemicSymptoms', 'feverNeckStiffness', 'historyHeadTrauma', 'historyMigraine', 'familyHistoryMigraine',
                        'effectOnDailyActivities', 'useOcp', 'caffeineIntake', 'smokingAlcohol'
                     ])}
                     <label className="block text-sm font-medium text-gray-700 mt-2">Example (Migraine)</label>
                     <textarea name="reviewOfSymptoms.headaches.exampleMigraine" value={getNestedValue(formData, ['reviewOfSymptoms', 'headaches', 'exampleMigraine'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                </div>
                 {/* Seizures */}
                <div className="pl-4 border-l-2 border-green-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Seizures</h5>
                     {renderFields('reviewOfSymptoms.seizures', [
                        'onsetDuration', 'frequency', 'precipitatingFactors', 'injurySustained', 'postictalSymptoms',
                        'associatedSensoryDeficits', 'associatedMotorDeficits', 'associatedCognitiveDeficits', 'muscleSpasms',
                        'anatomicalProgression', 'auraSymptoms', 'associatedIncontinence', 'tongueBitingSalivation',
                        'automatisms', 'historyHeadTrauma', 'perinatalInfection', 'drugHistory', 'historySeizureDisorder',
                        'familyHistorySeizureDisorders', 'effectOnDailyActivities'
                     ])}
                    <label className="block text-sm font-medium text-gray-700 mt-2">Example (GTCS)</label>
                    <textarea name="reviewOfSymptoms.seizures.exampleGtcs" value={getNestedValue(formData, ['reviewOfSymptoms', 'seizures', 'exampleGtcs'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                </div>
           </div>


          {/* Common History Sections */}
          <div className="mt-4 space-y-4">
             <h4 className="font-semibold text-lg text-gray-700">General History</h4>
             {/* Past History */}
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Past History</h5>
                {renderFields('pastHistory', ['asthma', 'copd', 'tuberculosis', 'tbContact', 'diabetesMellitus', 'hypertension', 'ischemicHeartDisease', 'seizureDisorderDrugs'])}
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Other Past History</label>
                    <textarea name="pastHistory.other" value={formData.pastHistory.other} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                 </div>
             </div>
             {/* Family History */}
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h5 className="font-medium text-md text-gray-600">Family History (Note pedigree chart separately)</h5>
                <textarea name="familyHistory" value={formData.familyHistory} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="3"/>
             </div>
              {/* Personal History */}
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                 <h5 className="font-medium text-md text-gray-600">Personal History</h5>
                 {renderFields('personalHistory', ['bowelHabits', 'bladderHabits', 'appetite', 'weightLoss', 'occupationalExposure', 'sleep', 'dietaryHabitsTaboo', 'foodAllergies', 'smokingIndexPackYears', 'alcoholGramsUnits'])}
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Other Personal History</label>
                    <textarea name="personalHistory.other" value={formData.personalHistory.other} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                 </div>
             </div>
             {/* Menstrual/Obstetric History */}
             <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                 <h5 className="font-medium text-md text-gray-600">Menstrual & Obstetric History</h5>
                 {renderFields('menstrualObstetricHistory', ['gpala', 'ageMenarche', 'menopauseAge', 'flowDetails'])}
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Other M/O History</label>
                    <textarea name="menstrualObstetricHistory.other" value={formData.menstrualObstetricHistory.other} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                 </div>
             </div>
          </div>
        </section>


        {/* --- EXAMINATION SECTION --- */}
        <section className="border p-4 rounded-lg shadow-sm mt-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Examination</h3>

             {/* General Examination */}
             <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">General Examination</h4>
                 {/* Subsections: Patient State, Anthropometry, Vitals, Physical, NeuroSpecific */}
                 <div className="pl-4 border-l-2 border-purple-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Patient State</h5>
                    {renderFields('generalExamination.patientState', ['conscious', 'oriented', 'cooperative', 'obeyingCommands'])}
                    <h5 className="font-medium text-md text-gray-600 mt-3">Anthropometry</h5>
                    {renderFields('generalExamination.anthropometry', ['weightKg', 'heightM', 'bmi', 'armSpan', 'upperLowerSegmentRatio'])}
                    <h5 className="font-medium text-md text-gray-600 mt-3">Vitals</h5>
                    {renderFields('generalExamination.vitals', [
                         'pulseRate', 'pulseRhythm', 'pulseVolume', 'pulseCharacter', 'vesselWall', 'radioRadialDelay', 'radioFemoralDelay', 'peripheralPulses',
                         'carotidVertebralBruit', 'bpRightArm', 'bpLeftArm', 'bpLegs', 'posturalDropBp',
                         'respRate', 'respPattern', 'accessoryMuscles', 'jvpWaveform', 'jvpCm', 'temperatureC', 'temperatureSite', 'spo2', 'painScore'
                    ])}
                     <h5 className="font-medium text-md text-gray-600 mt-3">Physical Exam</h5>
                    {renderFields('generalExamination.physicalExam', ['pallor', 'icterus', 'cyanosis', 'clubbing', 'lymphadenopathy', 'edema'])}
                    <h5 className="font-medium text-md text-gray-600 mt-3">Neuro Specific General Findings</h5>
                    {renderFields('generalExamination.neuroSpecificGeneral', ['nerveThickening', 'neurocutaneousMarkers', 'atherosclerosisMarkers', 'nutritionalDeficiencySigns', 'other'])}
                 </div>
            </div>

            {/* Nervous System Examination */}
            <div className="mt-4 space-y-4">
                 <h4 className="font-semibold text-lg text-gray-700">Nervous System Examination</h4>
                 {renderFields('nervousSystemExamination', ['handedness', 'education'])}

                 {/* Higher Mental Function Exam */}
                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                      <h5 className="font-medium text-md text-gray-600">Higher Mental Functions</h5>
                      {renderFields('nervousSystemExamination.higherMentalFunctions', [
                         'consciousnessGlasgowScale', 'orientationTimePlacePerson', 'memoryImmediate', 'memoryRecent', 'memoryRemote',
                         'intelligence', 'moodEmotion', 'concentrationCalculation',
                         'speechSpontaneousComprehension', 'speechFluency', 'speechRepetition', 'speechReading', 'speechWriting', 'speechNaming', 'speechPhonation', 'speechAphasia', 'speechDysarthria',
                         'apraxias', 'hemineglect', 'hallucinationsDelusions'
                      ])}
                 </div>

                 {/* Cranial Nerves Exam */}
                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Cranial Nerves</h5>
                     {/* Use renderLRFields for L/R pairs */}
                     {renderLRFields('nervousSystemExamination.cranialNerves.olfactoryI', 'smell', 'I - Olfactory (Smell)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.opticII', 'acuity', 'II - Optic (Acuity)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.opticII', 'field', 'II - Optic (Field)')}
                     {renderFields('nervousSystemExamination.cranialNerves.opticII', ['colorVision'])}
                     {renderLRFields('nervousSystemExamination.cranialNerves.opticII', 'fundus', 'II - Optic (Fundus)')}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">III, IV, VI - Oculomotor, Trochlear, Abducens:</h6>
                     {renderLRFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'eyelidsPtosis', 'Eyelids (Ptosis)')}
                     {renderFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', ['positionRest', 'eomSaccadic', 'eomPursuit', 'eomReflex', 'ophthalmoplegiaComment'])}
                     {renderLRFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'eomUniocular', 'Uniocular Movements')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'pupilSize', 'Pupil Size (mm)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'pupilShape', 'Pupil Shape')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'directReflex', 'Pupil Direct Reflex')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', 'consensualReflex', 'Pupil Consensual Reflex')}
                     {renderFields('nervousSystemExamination.cranialNerves.oculomotorTrochlearAbducensIIIIIVI', ['accommodation', 'nystagmus'])}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">V - Trigeminal:</h6>
                     {renderLRFields('nervousSystemExamination.cranialNerves.trigeminalV', 'sensoryTouch', 'Sensory (Touch)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.trigeminalV', 'sensoryPain', 'Sensory (Pain)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.trigeminalV', 'sensoryTemp', 'Sensory (Temperature)')}
                     {renderFields('nervousSystemExamination.cranialNerves.trigeminalV', ['motorJawDeviation', 'motorHollowing', 'motorClenching', 'motorOpenMouthResistance', 'motorSideToSide'])}
                     {renderLRFields('nervousSystemExamination.cranialNerves.trigeminalV', 'reflexCorneal', 'Reflex (Corneal)')}
                     {renderFields('nervousSystemExamination.cranialNerves.trigeminalV', ['reflexJawJerk'])}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">VII - Facial:</h6>
                     {renderFields('nervousSystemExamination.cranialNerves.facialVII', ['facialAsymmetry', 'bellsPhenomenon', 'sensoryTasteAnterior23', 'lacrimation', 'hyperacusis', 'emotionalFibers'])}
                     {renderLRFields('nervousSystemExamination.cranialNerves.facialVII', 'motorFrontalis', 'Motor (Frontalis - Raise Eyebrows)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.facialVII', 'motorOrbicularisOculi', 'Motor (Orbicularis Oculi - Shut Eyes)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.facialVII', 'motorBuccinator', 'Motor (Buccinator - Show Teeth/Smile)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.facialVII', 'motorOrbicularisOris', 'Motor (Orbicularis Oris - Close Lips/Pout)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.facialVII', 'motorPlatysma', 'Motor (Platysma - Pull Mouth Corners Down)')}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">VIII - Vestibulocochlear:</h6>
                     {renderLRFields('nervousSystemExamination.cranialNerves.vestibulocochlearVIII', 'hearingScreen', 'Hearing Screen (Rub Fingers)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.vestibulocochlearVIII', 'rinne', "Rinne's Test (AC/BC)")}
                     {renderFields('nervousSystemExamination.cranialNerves.vestibulocochlearVIII', ['weber', 'caloricTest'])}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">IX, X - Glossopharyngeal, Vagus:</h6>
                     {renderFields('nervousSystemExamination.cranialNerves.glossopharyngealVagusIXX', ['swallowingEatingVoice', 'uvulaPosition', 'uvulaMovement', 'tastePosterior13'])}
                     {renderLRFields('nervousSystemExamination.cranialNerves.glossopharyngealVagusIXX', 'gagReflex', 'Gag Reflex')}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">XI - Spinal Accessory:</h6>
                     {renderLRFields('nervousSystemExamination.cranialNerves.spinalAccessoryXI', 'scm', 'Sternocleidomastoid (Head Turn)')}
                     {renderLRFields('nervousSystemExamination.cranialNerves.spinalAccessoryXI', 'trapezius', 'Trapezius (Shoulder Shrug)')}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">XII - Hypoglossal:</h6>
                     {renderFields('nervousSystemExamination.cranialNerves.hypoglossalXII', ['inspectionSizeSymmetryWasting', 'inspectionFasciculations', 'inspectionDeviation', 'inspectionTremors', 'palpationTone', 'palpationPower', 'speechImpact'])}

                 </div>

                {/* Motor System Exam */}
                <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Motor System</h5>
                    {renderFields('nervousSystemExamination.motorSystem', ['attitudeUpperLimb', 'attitudeLowerLimb'])}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bulk (Inspection Notes)</label>
                        <textarea name="nervousSystemExamination.motorSystem.bulkInspection" value={getNestedValue(formData, ['nervousSystemExamination', 'motorSystem', 'bulkInspection'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                    </div>
                    {renderLRFields('nervousSystemExamination.motorSystem', 'bulkMeasurementArm', 'Bulk Measurement Arm (cm)')}
                    {renderLRFields('nervousSystemExamination.motorSystem', 'bulkMeasurementForearm', 'Bulk Measurement Forearm (cm)')}
                    {renderLRFields('nervousSystemExamination.motorSystem', 'bulkMeasurementThigh', 'Bulk Measurement Thigh (cm)')}
                    {renderLRFields('nervousSystemExamination.motorSystem', 'bulkMeasurementLeg', 'Bulk Measurement Leg (cm)')}

                    {renderLRFields('nervousSystemExamination.motorSystem', 'toneUpperLimb', 'Tone Upper Limb')}
                    {renderLRFields('nervousSystemExamination.motorSystem', 'toneLowerLimb', 'Tone Lower Limb')}
                    {renderFields('nervousSystemExamination.motorSystem', ['toneComment'])}

                    <h6 className="font-normal text-sm text-gray-500 mt-2">Power (MRC Scale 0-5)</h6>
                        {renderLRFields('nervousSystemExamination.motorSystem.power.neckFlexors', 'power', 'Neck Flexors')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.neckExtensors', 'power', 'Neck Extensors')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.shoulderAbduction', 'power', 'Shoulder Abduction')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.shoulderAdduction', 'power', 'Shoulder Adduction')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.shoulderFlexion', 'power', 'Shoulder Flexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.shoulderExtension', 'power', 'Shoulder Extension')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.elbowFlexion', 'power', 'Elbow Flexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.elbowExtension', 'power', 'Elbow Extension')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.wristFlexion', 'power', 'Wrist Flexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.wristExtension', 'power', 'Wrist Extension')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.handGrip', 'power', 'Hand Grip')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.smallMusclesHand', 'power', 'Small Muscles Hand')}
                        {renderFields('nervousSystemExamination.motorSystem.power.trunk', ['elevation', 'beevorsSign', 'intercostalBinding', 'diaphragmaticBinding'])}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.hipFlexion', 'power', 'Hip Flexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.hipExtension', 'power', 'Hip Extension')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.hipAbduction', 'power', 'Hip Abduction')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.hipAdduction', 'power', 'Hip Adduction')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.kneeFlexion', 'power', 'Knee Flexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.kneeExtension', 'power', 'Knee Extension')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.anklePlantarFlexion', 'power', 'Ankle Plantar Flexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.ankleDorsiflexion', 'power', 'Ankle Dorsiflexion')}
                        {renderLRFields('nervousSystemExamination.motorSystem.power.smallMusclesFootEhl', 'power', 'Small Muscles Foot / EHL')}
                </div>

                {/* Reflexes Exam */}
                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Reflexes</h5>
                    <h6 className="font-normal text-sm text-gray-500 mt-2">Superficial Reflexes</h6>
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'corneal', 'Corneal')}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'abdominalEpigastric', 'Abdominal (Epigastric T6-9)')}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'abdominalMid', 'Abdominal (Mid T9-11)')}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'abdominalHypogastric', 'Abdominal (Hypogastric T11-L1)')}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'cremasteric', 'Cremasteric (L1-L2)')}
                    {renderFields('nervousSystemExamination.reflexes.superficial', ['analReflex'])}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'plantar', 'Plantar (Babinski)')}
                    {/* Babinski Equivalents */}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'chaddocks', "Chaddock's")}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'gordons', "Gordon's")}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'oppenheims', "Oppenheim's")}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'schaffers', "Schaffer's")}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'gondas', "Gonda's")}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'stranskys', "Stransky's")}
                    {renderLRFields('nervousSystemExamination.reflexes.superficial', 'bings', "Bing's")}


                    <h6 className="font-normal text-sm text-gray-500 mt-2">Deep Tendon Reflexes (Grade 0-4+)</h6>
                    {renderFields('nervousSystemExamination.reflexes.deepTendon', ['jawJerk'])}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'biceps', 'Biceps (C5-6)')}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'brachioradial', 'Brachioradial (C5-6)')}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'triceps', 'Triceps (C6-8)')}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'kneeJerk', 'Knee Jerk (L2-4)')}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'ankleJerk', 'Ankle Jerk (L5-S2)')}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'clonusPatellar', 'Clonus (Patellar)')}
                    {renderLRFields('nervousSystemExamination.reflexes.deepTendon', 'clonusAnkle', 'Clonus (Ankle)')}


                    <h6 className="font-normal text-sm text-gray-500 mt-2">Latent Reflexes</h6>
                    {renderLRFields('nervousSystemExamination.reflexes.latent', 'tromnerHoffmann', "Tromner's / Hoffmann's")}
                    {renderLRFields('nervousSystemExamination.reflexes.latent', 'wartenberg', "Wartenberg's Sign")}


                    <h6 className="font-normal text-sm text-gray-500 mt-2">Primitive Reflexes</h6>
                    {renderFields('nervousSystemExamination.reflexes.primitive', ['glabellarTap', 'sucking', 'rooting', 'poutSnout', 'grasp'])}
                    {renderLRFields('nervousSystemExamination.reflexes.primitive', 'palmoMental', 'Palmo-mental')}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Involuntary Movements (Description)</label>
                        <textarea name="nervousSystemExamination.reflexes.involuntaryMovementsDescription" value={getNestedValue(formData, ['nervousSystemExamination', 'reflexes', 'involuntaryMovementsDescription'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                    </div>
                 </div>

                {/* Sensory System Exam */}
                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Sensory System</h5>
                    <h6 className="font-normal text-sm text-gray-500 mt-2">Primary Sensation</h6>
                    {renderLRFields('nervousSystemExamination.sensorySystem.primary', 'touch', 'Touch')}
                    {renderLRFields('nervousSystemExamination.sensorySystem.primary', 'temperature', 'Temperature')}
                    {renderLRFields('nervousSystemExamination.sensorySystem.primary', 'vibration', 'Vibration')}
                    {renderLRFields('nervousSystemExamination.sensorySystem.primary', 'jointPosition', 'Joint Position Sense')}
                    {renderFields('nervousSystemExamination.sensorySystem.primary', ['sensoryLevel', 'pattern'])}

                     <h6 className="font-normal text-sm text-gray-500 mt-2">Cortical Sensation</h6>
                     {renderLRFields('nervousSystemExamination.sensorySystem.cortical', 'tactileLocalization', 'Tactile Localization (Topognosis)')}
                     {renderLRFields('nervousSystemExamination.sensorySystem.cortical', 'twoPointDiscrimination', 'Two-Point Discrimination')}
                     {renderLRFields('nervousSystemExamination.sensorySystem.cortical', 'stereognosis', 'Stereognosis')}
                     {renderLRFields('nervousSystemExamination.sensorySystem.cortical', 'graphesthesia', 'Graphesthesia')}
                     {renderFields('nervousSystemExamination.sensorySystem.cortical', ['sensoryExtinction'])}

                     {renderFields('nervousSystemExamination.sensorySystem', ['rombergsTest'])}
                 </div>

                 {/* Cerebellar Signs Exam */}
                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    <h5 className="font-medium text-md text-gray-600">Cerebellar Signs</h5>
                    <h6 className="font-normal text-sm text-gray-500 mt-2">Upper Extremity</h6>
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'limbAtaxiaOutstretched', 'Limb Ataxia (Outstretched Arm)')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'fingerNose', 'Finger-Nose Test')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'noseFingerNose', 'Nose-Finger-Nose Test')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'fingerFinger', 'Finger-Finger Test')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'rapidAlternatingHands', 'Rapid Alternating (Hand Tapping)')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'rapidAlternatingPronationSupination', 'Rapid Alternating (Pronation/Supination)')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'rapidAlternatingThighSlap', 'Rapid Alternating (Thigh Slapping)')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'pointingPastPointing', 'Pointing and Past Pointing')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'writing', 'Writing (Micro/Macrographia)')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'reboundPhenomenon', 'Rebound Phenomenon')}
                    {renderLRFields('nervousSystemExamination.cerebellarSigns.upperExtremity', 'intentionTremor', 'Intention Tremor')}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">Lower Limbs</h6>
                     {renderLRFields('nervousSystemExamination.cerebellarSigns.lowerLimbs', 'heelKnee', 'Heel-Knee Test')}
                     {renderLRFields('nervousSystemExamination.cerebellarSigns.lowerLimbs', 'pendularKneeJerk', 'Pendular Knee Jerk')}
                     {renderLRFields('nervousSystemExamination.cerebellarSigns.lowerLimbs', 'fingerToe', 'Finger-Toe Test')}
                     {renderLRFields('nervousSystemExamination.cerebellarSigns.lowerLimbs', 'rapidAlternatingFootTap', 'Rapid Alternating (Foot Tapping)')}


                     <h6 className="font-normal text-sm text-gray-500 mt-2">General Cerebellar Signs</h6>
                     {renderFields('nervousSystemExamination.cerebellarSigns.general', ['titubation', 'nystagmus', 'tremors', 'hypotonia', 'truncalAtaxia', 'tandemWalking'])}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gait Description</label>
                        <textarea name="nervousSystemExamination.cerebellarSigns.gaitDescription" value={getNestedValue(formData, ['nervousSystemExamination', 'cerebellarSigns', 'gaitDescription'])} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="3"/>
                    </div>
                 </div>

                {/* Other Neuro Exam Sections */}
                 <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                     <h5 className="font-medium text-md text-gray-600">Other Neurological Signs</h5>
                    {renderFields('nervousSystemExamination.meningealIrritation', ['neckStiffness', 'kernigsSign', 'brudzinskisSign'])}
                    {renderFields('nervousSystemExamination.autonomicSigns', ['skinDrynessSweating', 'posturalHypotension', 'heartRateVariability', 'palpableBladder', 'pupillaryReactions', 'valsalva'])}
                    {renderFields('nervousSystemExamination.skullSpine', ['deformities', 'tenderness', 'shortNeck'])}
                    {renderFields('nervousSystemExamination.softNeurologicalSigns', ['pyramidalDrift', 'cerebellarDrift', 'parietalDrift'])}
                 </div>
            </div>

        </section>


        {/* --- OTHER SYSTEMS & DIAGNOSIS --- */}
        <section className="border p-4 rounded-lg shadow-sm mt-6">
             <h3 className="text-xl font-semibold mb-4 text-teal-700">Other Systems & Diagnosis</h3>

             {/* Other Systems Review */}
              <div className="mt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-700">Other Systems Review (Brief Summary)</h4>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Respiratory System</label>
                    <textarea name="otherSystemsReview.respiratory" value={formData.otherSystemsReview.respiratory} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Cardiovascular System</label>
                    <textarea name="otherSystemsReview.cardiovascular" value={formData.otherSystemsReview.cardiovascular} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gastrointestinal System</label>
                    <textarea name="otherSystemsReview.gastrointestinal" value={formData.otherSystemsReview.gastrointestinal} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows="2"/>
                 </div>
             </div>

            {/* Diagnosis Summary */}
             <div className="mt-6">
                 <h4 className="font-semibold text-lg text-gray-700">Diagnosis Summary</h4>
                 <p className="text-sm text-gray-500 mb-2">Follow the suggested format (Nature, Onset, Deficit, Site, Etiology, Risk Factors, Functional Status as applicable).</p>
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
            Save Neurological Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default NeurologicalSystem;
