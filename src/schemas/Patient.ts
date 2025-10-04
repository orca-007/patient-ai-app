import { z } from 'zod';
import { HPOPhenotypeSchema } from './HPOPhenotype';
import { MonographSchema } from './Monograph';
import { ConditionRuleSchema } from './ConditionRule';
import { cardiovascularSystemSchema } from './CardiovascularSystem';
import { respiratorySystemSchema } from './RespiratorySystem';
import { gastrointestinalSystemSchema } from './GastrointestinalSystem';
import { neurologicalSystemSchema } from './NeurologicalSystem';
import { otherSystemicExaminationSchema } from './OtherSystemicExamination';

export const PatientSchema = z.object({
  demographics: z.object({
    name: z.string(),
    age: z.number(),
    sex: z.enum(['male', 'female', 'other']),
    economicStatus: z.enum(['low', 'middle', 'high']).optional(),
  }),
  phenotypes: z.array(HPOPhenotypeSchema).optional(),
  history: z.object({
    chiefComplaints: z.array(z.string()),
    pastMedicalHistory: z.array(z.string()).optional(),
    pastSurgicalHistory: z.array(z.string()).optional(),
    familyHistory: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    drugHistory: z.array(z.string()).optional(),
  }),
  examination: z.object({
    vitals: z.object({
      temperature: z.number().optional(),
      pulse: z.number().optional(),
      respiratoryRate: z.number().optional(),
      bloodPressure: z.string().optional(), // e.g., "120/80"
      oxygenSaturation: z.number().optional(),
    }),
    systemicExaminations: z.object({
      cardiovascular: cardiovascularSystemSchema,
      respiratory: respiratorySystemSchema,
      gastrointestinal: gastrointestinalSystemSchema,
      neurological: neurologicalSystemSchema,
      other: otherSystemicExaminationSchema,
    }),
  }),
  investigations: z.any().optional(), // To be refined later
  conditions: z.array(ConditionRuleSchema).optional(),
  medications: z.array(MonographSchema).optional(),
});

export type Patient = z.infer<typeof PatientSchema>;