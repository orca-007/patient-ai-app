import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { generateDiagnosisSuggestions, generateTreatmentRecommendations } from '../lib/aiService';

const diagnosisSummarySchema = z.object({
  primaryDiagnosis: z.string().min(1, { message: "Primary diagnosis is required" }),
  secondaryDiagnoses: z.string().optional(),
  differentialDiagnoses: z.string().optional(),
  treatmentPlan: z.string().min(1, { message: "Treatment plan is required" }),
  followUpPlan: z.string().min(1, { message: "Follow-up plan is required" }),
  additionalNotes: z.string().optional(),
});

function DiagnosisSummary({ patientInfo, symptoms, labResults, examFindings, onSave }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(diagnosisSummarySchema),
    defaultValues: {
      primaryDiagnosis: '',
      secondaryDiagnoses: '',
      differentialDiagnoses: '',
      treatmentPlan: '',
      followUpPlan: '',
      additionalNotes: ''
    }
  });

  const onSubmit = (data) => {
    if (onSave) {
      onSave(data);
    }
  };

  const generateAiSuggestions = async () => {
    setIsGenerating(true);
    try {
      // Combine all relevant patient data for AI analysis
      const patientData = {
        ...patientInfo,
        symptoms: symptoms || "No symptoms recorded",
        labResults: labResults || "No lab results recorded",
        examFindings: examFindings || "No examination findings recorded"
      };

      // Generate diagnosis suggestions
      const diagnosisSuggestions = await generateDiagnosisSuggestions(
        patientData.symptoms,
        patientData
      );

      // Use the first suggested diagnosis to generate treatment recommendations
      const treatmentRecommendations = await generateTreatmentRecommendations(
        diagnosisSuggestions.split('\n')[0], // Use first line as primary diagnosis
        patientData
      );

      setAiSuggestions({
        diagnosisSuggestions,
        treatmentRecommendations
      });
      
      setShowAiSuggestions(true);
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyAiSuggestions = () => {
    if (!aiSuggestions) return;

    // Extract primary diagnosis (first line) and differential diagnoses (rest)
    const diagnosisLines = aiSuggestions.diagnosisSuggestions.split('\n');
    const primaryDiagnosis = diagnosisLines[0].replace(/^\d+\.\s*/, '');
    const differentialDiagnoses = diagnosisLines.slice(1).join('\n');

    // Set values in the form
    setValue('primaryDiagnosis', primaryDiagnosis);
    setValue('differentialDiagnoses', differentialDiagnoses);
    setValue('treatmentPlan', aiSuggestions.treatmentRecommendations);
    
    // Hide AI suggestions panel
    setShowAiSuggestions(false);
  };

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-md my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800">Diagnosis & Treatment Summary</CardTitle>
        <Button
          onClick={generateAiSuggestions}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isGenerating ? "Generating..." : "Generate AI Suggestions"}
        </Button>
      </CardHeader>
      
      <CardContent>
        {showAiSuggestions && aiSuggestions && (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-purple-800">AI-Generated Suggestions</h3>
              <div className="space-x-2">
                <Button 
                  onClick={applyAiSuggestions}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                >
                  Apply Suggestions
                </Button>
                <Button 
                  onClick={() => setShowAiSuggestions(false)}
                  variant="outline"
                  className="text-sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-purple-700">Possible Diagnoses:</h4>
                <div className="p-3 bg-white rounded border border-purple-100 text-sm whitespace-pre-line">
                  {aiSuggestions.diagnosisSuggestions}
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-purple-700">Treatment Recommendations:</h4>
                <div className="p-3 bg-white rounded border border-purple-100 text-sm whitespace-pre-line">
                  {aiSuggestions.treatmentRecommendations}
                </div>
              </div>
              
              <p className="text-xs text-gray-500 italic">
                Note: These are AI-generated suggestions only. Clinical judgment is required.
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Diagnosis</label>
            <input
              {...register('primaryDiagnosis')}
              className={`w-full border rounded-lg px-3 py-2 ${errors.primaryDiagnosis ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter primary diagnosis"
            />
            {errors.primaryDiagnosis && <p className="text-red-500 text-xs mt-1">{errors.primaryDiagnosis.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Diagnoses (if any)</label>
            <textarea
              {...register('secondaryDiagnoses')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
              placeholder="Enter secondary diagnoses, separated by commas"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Differential Diagnoses</label>
            <textarea
              {...register('differentialDiagnoses')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
              placeholder="Enter differential diagnoses to consider"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan</label>
            <textarea
              {...register('treatmentPlan')}
              className={`w-full border rounded-lg px-3 py-2 min-h-[120px] ${errors.treatmentPlan ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter detailed treatment plan"
            />
            {errors.treatmentPlan && <p className="text-red-500 text-xs mt-1">{errors.treatmentPlan.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Plan</label>
            <textarea
              {...register('followUpPlan')}
              className={`w-full border rounded-lg px-3 py-2 min-h-[80px] ${errors.followUpPlan ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter follow-up instructions and timeline"
            />
            {errors.followUpPlan && <p className="text-red-500 text-xs mt-1">{errors.followUpPlan.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              {...register('additionalNotes')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
              placeholder="Any additional notes or comments"
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Diagnosis Summary
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Generate Report</h3>
          <div className="flex justify-end">
            <Button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => {/* Generate report logic */}}
            >
              Generate Patient Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DiagnosisSummary;
