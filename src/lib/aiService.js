import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase'; // Assuming 'app' is your initialized Firebase app

const functions = getFunctions(app);

export async function generateDiagnosisSuggestions(symptoms, patientInfo) {
  const generateDiagnosisCallable = httpsCallable(functions, 'generateDiagnosisSuggestionsCloud');
  try {
    const response = await generateDiagnosisCallable({ symptoms, patientInfo });
    // Assuming your cloud function returns { result: "..." }
    // The cloud function returns an object with a 'data' property, which itself has 'result'
    return response.data.result; 
  } catch (error) {
    console.error("Error calling generateDiagnosisSuggestionsCloud:", error);
    return "Unable to generate diagnosis suggestions via cloud function.";
  }
}

export async function generateTreatmentRecommendations(diagnosis, patientInfo) {
  const generateTreatmentCallable = httpsCallable(functions, 'generateTreatmentRecommendationsCloud');
  try {
    const response = await generateTreatmentCallable({ diagnosis, patientInfo });
    return response.data.result;
  } catch (error) {
    console.error("Error calling generateTreatmentRecommendationsCloud:", error);
    return "Unable to generate treatment recommendations via cloud function.";
  }
}

export async function explainMedicalTerminology(term) {
  const explainTerminologyCallable = httpsCallable(functions, 'explainMedicalTerminologyCloud');
  try {
    const response = await explainTerminologyCallable({ term });
    return response.data.result;
  } catch (error) {
    console.error("Error calling explainMedicalTerminologyCloud:", error);
    return "Unable to provide explanation via cloud function.";
  }
}

export async function analyzeSymptoms(symptoms) {
  const analyzeSymptomsCallable = httpsCallable(functions, 'analyzeSymptomsCloud');
  try {
    const response = await analyzeSymptomsCallable({ symptoms });
    return response.data.result;
  } catch (error) {
    console.error("Error calling analyzeSymptomsCloud:", error);
    return "Unable to analyze symptoms via cloud function.";
  }
}

export async function getChartingAssistance(text) {
  const chartingAssistanceCallable = httpsCallable(functions, 'getChartingAssistanceCloud');
  try {
    const response = await chartingAssistanceCallable({ text });
    return response.data.result; // This should be the structured JSON
  } catch (error) {
    console.error("Error calling getChartingAssistanceCloud:", error);
    // Return a default structure or null in case of error to prevent frontend crashes
    return {
      extractedSymptoms: [],
      extractedDuration: null,
      extractedSeverity: null,
      suggestedIcd10Code: null,
      error: "Failed to get AI assistance."
    };
  }
}
