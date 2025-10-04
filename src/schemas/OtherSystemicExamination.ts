import { z } from 'zod';

export const otherSystemicExaminationSchema = z.object({
  summary: z.string().optional(),
});

export type OtherSystemicExamination = z.infer<typeof otherSystemicExaminationSchema>;