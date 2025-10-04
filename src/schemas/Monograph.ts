import { z } from 'zod';

export const MonographSchema = z.object({
  genericName: z.string(),
  nlem: z.boolean().optional(),
  forms: z.array(z.string()).optional(),
  strengths: z.array(z.string()).optional(),
  indications: z.array(z.string()).optional(),
  dosing: z.string().optional(),
  contraindications: z.array(z.string()).optional(),
  interactions: z.array(z.string()).optional(),
  adverseEvents: z.array(z.string()).optional(),
  whoEssentialMedicine: z.boolean().optional(),
  citations: z.array(z.string()).optional(),
});

export type Monograph = z.infer<typeof MonographSchema>;