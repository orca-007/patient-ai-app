import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: 'sk-xxxxxxxxxxxxxxxxxxxx', // Replace with actual API key in production
  dangerouslyAllowBrowser: true // For demo purposes only
});

export async function generateDiagnosisSuggestions(symptoms, patientInfo) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant that helps doctors with diagnosis suggestions based on symptoms and patient information. Provide 3-5 possible diagnoses with brief explanations and confidence levels. Note that these are suggestions only and not definitive medical advice."
        },
        {
          role: "user",
          content: `Patient Information: ${JSON.stringify(patientInfo)}
          
          Symptoms and Findings: ${symptoms}
          
          Please suggest possible diagnoses based on these findings.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating diagnosis suggestions:", error);
    return "Unable to generate diagnosis suggestions at this time.";
  }
}

export async function generateTreatmentRecommendations(diagnosis, patientInfo) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant that helps doctors with treatment recommendations based on diagnoses and patient information. Provide evidence-based treatment options with brief explanations. Note that these are suggestions only and not definitive medical advice."
        },
        {
          role: "user",
          content: `Patient Information: ${JSON.stringify(patientInfo)}
          
          Diagnosis: ${diagnosis}
          
          Please suggest possible treatment approaches for this diagnosis.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating treatment recommendations:", error);
    return "Unable to generate treatment recommendations at this time.";
  }
}

export async function explainMedicalTerminology(term) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant that explains medical terminology in simple, easy-to-understand language."
        },
        {
          role: "user",
          content: `Please explain the medical term: "${term}" in simple language.`
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error explaining medical terminology:", error);
    return "Unable to provide explanation at this time.";
  }
}

export async function analyzeSymptoms(symptoms) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant that analyzes symptoms and provides insights on potential underlying causes and related symptoms to look for."
        },
        {
          role: "user",
          content: `Please analyze these symptoms: "${symptoms}" and suggest related symptoms to look for and potential underlying causes.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    return "Unable to analyze symptoms at this time.";
  }
}
