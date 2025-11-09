import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { env } from '@/lib/env';

let ai: any;

try {
  ai = genkit({
    plugins: [googleAI({ apiKey: env.GEMINI_API_KEY })],
    model: 'googleai/gemini-2.5-flash',
  });
} catch (error) {
  console.error('Failed to initialize AI:', error);
  // Fallback configuration
  ai = null;
}

export { ai };
