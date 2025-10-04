import { z } from 'zod';
import { MonographSchema } from './Monograph';

export const ConditionRuleSchema = z.object({
  conditionName: z.string(),
  criteria: z.array(z.string()),
  investigations: z.object({
    firstLine: z.array(z.string()),
    secondLine: z.array(z.string()).optional(),
  }),
  treatment: z.object({
    firstLine: z.array(MonographSchema),
    secondLine: z.array(MonographSchema).optional(),
    adjustments: z.object({
      renal: z.string().optional(),
      hepatic: z.string().optional(),
      pediatric: z.string().optional(),
      pregnancy: z.string().optional(),
    }).optional(),
  }),
  followUp: z.string().optional(),
  reviewTimerH: z.number().optional(), // For antibiotic stewardship
  citations: z.array(z.string()),
});

export type ConditionRule = z.infer<typeof ConditionRuleSchema>;