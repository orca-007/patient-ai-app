import { z } from 'zod';

export const CDSCardSchema = z.object({
  summary: z.string(),
  indicator: z.enum(['info', 'warning', 'critical']),
  source: z.object({
    label: z.string(),
    url: z.string().url().optional(),
  }),
  suggestions: z.array(z.object({
    label: z.string(),
    actions: z.array(z.object({
      type: z.string(),
      description: z.string(),
      resource: z.any().optional(), // This could be a reference to a medication, an order, etc.
    })),
  })),
  links: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
    type: z.string(),
  })).optional(),
});

export type CDSCard = z.infer<typeof CDSCardSchema>;