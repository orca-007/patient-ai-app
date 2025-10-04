import { z } from 'zod';

export const HPOPhenotypeSchema = z.object({
  id: z.string().startsWith('HP:'),
  label: z.string(),
});

export type HPOPhenotype = z.infer<typeof HPOPhenotypeSchema>;