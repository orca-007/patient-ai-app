const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const { OpenAI } = require('openai');

// IMPORTANT: Configure API key via environment variables in Firebase, e.g.,
// firebase functions:config:set openai.key="YOUR_ACTUAL_API_KEY"
// Do NOT hardcode the key here.
// The OpenAI client should NOT have dangerouslyAllowBrowser: true.
let openai;
if (functions.config().openai && functions.config().openai.key) {
  openai = new OpenAI({
    apiKey: functions.config().openai.key,
  });
} else {
  console.warn("OpenAI API key not found in Firebase functions config. Ensure 'openai.key' is set.");
  // Potentially use a dummy client or throw an error if preferred, 
  // but for now, we'll let it fail at runtime if a function is called without a key.
}


exports.generateDiagnosisSuggestionsCloud = functions.https.onCall(async (data, context) => {
  // Optional: Check for user authentication
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }
  
  if (!openai) {
    console.error("OpenAI client not initialized due to missing API key.");
    throw new functions.https.HttpsError('internal', 'OpenAI client not initialized. Missing API key.');
  }

  const { symptoms, patientInfo } = data;

  if (!symptoms || !patientInfo) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing symptoms or patientInfo.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        { role: "system", content: "You are a helpful medical AI assistant. Provide detailed and accurate medical information. Your role is to suggest possible diagnoses based on the patient's information and symptoms. Prioritize common conditions but also consider rarer possibilities if indicated. Explain your reasoning briefly for each suggestion." },
        { role: "user", content: `Patient Information: ${JSON.stringify(patientInfo)}\n\nSymptoms and Findings: ${symptoms}\n\nPlease suggest possible diagnoses, along with a brief rationale for each.` }
      ],
      temperature: 0.5,
      max_tokens: 300, 
    });
    return { result: response.choices[0].message.content };
  } catch (error) {
    console.error("Error in generateDiagnosisSuggestionsCloud:", error);
    throw new functions.https.HttpsError('internal', 'Failed to generate diagnosis suggestions.', error.message);
  }
});

exports.generateTreatmentRecommendationsCloud = functions.https.onCall(async (data, context) => {
  if (!openai) {
    console.error("OpenAI client not initialized due to missing API key.");
    throw new functions.https.HttpsError('internal', 'OpenAI client not initialized. Missing API key.');
  }

  const { diagnosis, patientInfo } = data;

  if (!diagnosis || !patientInfo) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing diagnosis or patientInfo.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful medical AI assistant. Your role is to provide potential treatment recommendations based on a given diagnosis and patient information. Focus on evidence-based treatments. Include pharmacological and non-pharmacological options where appropriate. Always state that these are general recommendations and a qualified healthcare professional should be consulted for actual treatment decisions." },
        { role: "user", content: `Patient Information: ${JSON.stringify(patientInfo)}\n\nDiagnosis: ${diagnosis}\n\nPlease provide potential treatment recommendations.` }
      ],
      temperature: 0.6,
      max_tokens: 400,
    });
    return { result: response.choices[0].message.content };
  } catch (error) {
    console.error("Error in generateTreatmentRecommendationsCloud:", error);
    throw new functions.https.HttpsError('internal', 'Failed to generate treatment recommendations.', error.message);
  }
});

exports.explainMedicalTerminologyCloud = functions.https.onCall(async (data, context) => {
  if (!openai) {
    console.error("OpenAI client not initialized due to missing API key.");
    throw new functions.https.HttpsError('internal', 'OpenAI client not initialized. Missing API key.');
  }

  const { term } = data;

  if (!term) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing medical term.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Can use a faster model for this
      messages: [
        { role: "system", content: "You are a helpful medical AI assistant. Your role is to explain complex medical terminology in simple, easy-to-understand language for patients. Avoid jargon where possible, or explain it if necessary. Be concise but comprehensive." },
        { role: "user", content: `Please explain the medical term: "${term}"` }
      ],
      temperature: 0.3,
      max_tokens: 200,
    });
    return { result: response.choices[0].message.content };
  } catch (error) {
    console.error("Error in explainMedicalTerminologyCloud:", error);
    throw new functions.https.HttpsError('internal', 'Failed to explain medical terminology.', error.message);
  }
});

exports.analyzeSymptomsCloud = functions.https.onCall(async (data, context) => {
  if (!openai) {
    console.error("OpenAI client not initialized due to missing API key.");
    throw new functions.https.HttpsError('internal', 'OpenAI client not initialized. Missing API key.');
  }

  const { symptoms } = data;

  if (!symptoms) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing symptoms string.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        { role: "system", content: "You are a helpful medical AI assistant. Your role is to analyze a list of symptoms, identify potential red flags, suggest relevant questions to ask the patient for clarification, and indicate possible body systems involved. Do not provide diagnoses. Focus on information gathering and preliminary analysis." },
        { role: "user", content: `Please analyze the following symptoms: "${symptoms}". Identify potential red flags, suggest clarifying questions for the patient, and list possible body systems involved.` }
      ],
      temperature: 0.5,
      max_tokens: 350,
    });
    return { result: response.choices[0].message.content };
  } catch (error) {
    console.error("Error in analyzeSymptomsCloud:", error);
    throw new functions.https.HttpsError('internal', 'Failed to analyze symptoms.', error.message);
  }
});

exports.getChartingAssistanceCloud = functions.https.onCall(async (data, context) => {
  if (!openai) {
    console.error("OpenAI client not initialized due to missing API key.");
    throw new functions.https.HttpsError('internal', 'OpenAI client not initialized. Missing API key.');
  }
  
  const { text } = data;
  if (!text || typeof text !== 'string' || text.trim() === '') {
    throw new functions.https.HttpsError('invalid-argument', 'Missing or invalid text for charting assistance.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are a medical charting assistant. Analyze the provided clinical text. Extract key symptoms, duration if mentioned, and severity if mentioned. Suggest a single relevant ICD-10 code for the primary symptom. Return your analysis as a JSON object with the following structure: {"extractedSymptoms": ["symptom1", ...], "extractedDuration": "duration", "extractedSeverity": "severity", "suggestedIcd10Code": "A00.0"}. If a value is not found, use null or omit the key. For extractedSymptoms, use an empty array if no specific symptoms are identified.`
        },
        { role: "user", content: text }
      ],
      temperature: 0.3, 
      max_tokens: 150,  
      // response_format: { type: "json_object" }, // Uncomment if model version supports
    });

    let structuredResponse;
    const messageContent = response.choices[0].message.content;
    
    // Attempt to find JSON within the response
    const jsonMatch = messageContent.match(/\{[\s\S]*\}/); // More robust regex for JSON
    if (jsonMatch && jsonMatch[0]) {
        try {
            structuredResponse = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            console.error("Failed to parse JSON from AI response:", parseError, "Raw content:", messageContent);
            throw new functions.https.HttpsError('internal', 'AI response was not valid JSON.', { rawResponse: messageContent });
        }
    } else {
        console.error("No JSON object found in AI response. Raw content:", messageContent);
        // Attempt to return a default or error structure if no JSON is found
        // This could also throw an error, depending on desired strictness
         return { 
          result: {
            extractedSymptoms: [],
            extractedDuration: null,
            extractedSeverity: null,
            suggestedIcd10Code: null,
            error: "AI response did not contain a parsable JSON object.",
            rawResponse: messageContent 
          }
        };
    }

    return { result: structuredResponse };

  } catch (error) {
    console.error("Error in getChartingAssistanceCloud:", error);
    if (error instanceof functions.https.HttpsError) throw error; 
    throw new functions.https.HttpsError('internal', 'Failed to get charting assistance.', error.message);
  }
});
