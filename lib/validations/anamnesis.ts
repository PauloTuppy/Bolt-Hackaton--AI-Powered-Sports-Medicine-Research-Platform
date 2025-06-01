import { z } from 'zod';

const lifestyleSchema = z.object({
  smoking: z.boolean(),
  alcohol: z.boolean(),
  sleep: z.enum(['<6', '6-7', '7-8', '8+']),
  stress: z.enum(['low', 'moderate', 'high']),
});

export const anamnesisSchema = z.object({
  age: z.string().min(1, 'Age is required'),
  weight: z.string().min(1, 'Weight is required'),
  height: z.string().min(1, 'Height is required'),
  body_fat: z.string().optional(),
  medical_history: z.array(z.string()),
  current_medications: z.array(z.string()),
  allergies: z.array(z.string()),
  previous_injuries: z.array(z.string()),
  exercise_frequency: z.string().min(1, 'Exercise frequency is required'),
  exercise_intensity: z.enum(['low', 'moderate', 'high']),
  fitness_goals: z.array(z.string()).min(1, 'At least one fitness goal is required'),
  lifestyle: lifestyleSchema,
});

export type AnamnesisFormData = z.infer<typeof anamnesisSchema>;