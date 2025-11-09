'use server';

/**
 * @fileOverview Server action for the AI Symptom Checker.
 *
 * This file defines the `checkSymptoms` server action, which is responsible for processing
 * the symptom checker form submissions from the client. It performs the following steps:
 *
 * 1.  **Input Validation:** It uses a Zod schema (`SymptomSchema`) to validate the raw `formData`
 *     to ensure the `symptoms` field is present and meets the minimum length requirement.
 *
 * 2.  **AI Flow Invocation:** If validation is successful, it calls the `aiSymptomChecker`
 *     Genkit flow with the validated symptoms.
 *
 * 3.  **State Management:** It returns a new state object (`SymptomCheckerState`) that reflects
 *     the outcome of the operation. This state can include:
 *     - The AI-generated result if successful.
 *     - A validation error message if the input is invalid.
 *     - An error message for any unexpected exceptions during the AI call.
 *     - The original form input to repopulate the form on error.
 *
 * This action is designed to be used with the `useFormState` hook on the client-side for
 * progressive enhancement and streamlined form state management in React.
 */

import {
  aiSymptomChecker,
  AISymptomCheckerInput,
  AISymptomCheckerOutput,
} from '@/ai/flows/ai-symptom-checker';
import { z } from 'zod';

/**
 * Zod schema for validating the symptoms input.
 * Ensures the symptoms string is at least 10 characters long.
 */
const SymptomSchema = z.object({
  symptoms: z
    .string()
    .min(10, 'Please describe your symptoms in more detail (at least 10 characters).'),
});

/**
 * Defines the shape of the state object for the symptom checker form.
 * This state is managed by `useFormState` in the `SymptomCheckerForm` component.
 */
export interface SymptomCheckerState {
  /** The form data, used to repopulate the form on errors. */
  form: {
    symptoms: string;
  };
  /** The successful result from the AI symptom checker flow. */
  result?: AISymptomCheckerOutput;
  /** An error message string if validation or the AI call fails. */
  error?: string;
}

/**
 * A server action that processes the symptom checker form submission.
 *
 * @param prevState The previous state of the form, provided by `useFormState`.
 * @param formData The `FormData` object submitted from the form.
 * @returns A `Promise` that resolves to the new `SymptomCheckerState`.
 */
export async function checkSymptoms(
  prevState: SymptomCheckerState,
  formData: FormData
): Promise<SymptomCheckerState> {
  const symptoms = formData.get('symptoms') as string;

  // Validate the input using the Zod schema.
  const validatedFields = SymptomSchema.safeParse({ symptoms });

  // If validation fails, return an error state with the validation message.
  if (!validatedFields.success) {
    return {
      form: { symptoms },
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  const input: AISymptomCheckerInput = {
    symptoms: validatedFields.data.symptoms,
  };

  try {
    // Call the AI flow and return a success state with the result.
    const result = await aiSymptomChecker(input);
    return {
      form: { symptoms: '' }, // Clear the form on success
      result,
    };
  } catch (error) {
    console.error('AI Symptom Checker Error:', {
      error: error instanceof Error ? error.message : String(error),
      symptoms: input.symptoms,
      timestamp: new Date().toISOString()
    });
    
    // Return specific error messages based on error type
    const errorMessage = error instanceof Error && error.message.includes('API')
      ? 'Service temporarily unavailable. Please try again later.'
      : 'An unexpected error occurred. Please try again.';
    
    return {
      form: { symptoms },
      error: errorMessage,
    };
  }
}
