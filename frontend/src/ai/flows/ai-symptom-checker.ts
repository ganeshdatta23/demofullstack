'use server';

/**
 * @fileOverview This file defines an AI-powered symptom checker flow using Genkit.
 *
 * It includes the following key components:
 * - `AISymptomCheckerInputSchema`: Defines the Zod schema for the input, which is a string of symptoms.
 * - `AISymptomCheckerOutputSchema`: Defines the Zod schema for the output, including possible diagnoses and a disclaimer.
 * - `aiSymptomChecker`: The main server action function that is called from the frontend. It validates the input and invokes the Genkit flow.
 * - `aiSymptomCheckerFlow`: The Genkit flow that orchestrates the AI call. It takes the symptoms, passes them to a structured prompt, and returns the formatted output.
 * - `prompt`: A Genkit prompt configured to use the Gemini model. It takes the user's symptoms and generates a structured response based on the output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input to the AI Symptom Checker.
 * @property {string} symptoms - A comma-separated list of symptoms the patient is experiencing.
 */
const AISymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe("A comma separated list of symptoms the patient is experiencing."),
});

export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

/**
 * Defines the schema for the output of the AI Symptom Checker.
 * @property {string} possibleDiagnoses - A list of possible diagnoses based on the provided symptoms.
 * @property {string} disclaimer - A standard medical disclaimer.
 */
const AISymptomCheckerOutputSchema = z.object({
  possibleDiagnoses: z
    .string()
    .describe("A list of possible diagnoses based on the symptoms provided."),
  disclaimer: z
    .string()
    .describe("A disclaimer stating that the results are not a substitute for professional medical advice and that the user should always consult with a qualified healthcare provider for diagnosis and treatment."),
});

export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

/**
 * An exported async function that acts as a server action, callable from the client.
 * It takes the symptom checker input and passes it to the Genkit flow.
 * @param {AISymptomCheckerInput} input - The symptoms provided by the user.
 * @returns {Promise<AISymptomCheckerOutput>} - A promise that resolves to the AI-generated diagnoses and disclaimer.
 */
export async function aiSymptomChecker(input: AISymptomCheckerInput): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

/**
 * Defines the structured prompt for the AI model.
 * This prompt instructs the AI to act as a symptom checker and requests the output
 * to conform to the `AISymptomCheckerOutputSchema`.
 */
const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {schema: AISymptomCheckerInputSchema},
  output: {schema: AISymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker. You take a list of symptoms as input and return a list of possible diagnoses.

Symptoms: {{{symptoms}}}

Based on these symptoms, provide a numbered list of possible diagnoses. For each diagnosis, briefly explain why it might be relevant.

Disclaimer: This symptom checker is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.`,
});

/**
 * Defines the main Genkit flow for the symptom checker.
 * This flow takes the user's input, calls the structured prompt, and returns the output.
 */
const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AISymptomCheckerInputSchema,
    outputSchema: AISymptomCheckerOutputSchema,
  },
  async input => {
    const {
      output
    } = await prompt(input);
    return output!;
  }
);
