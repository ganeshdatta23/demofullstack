'use client';

/**
 * @fileOverview A client-side form component for the AI Symptom Checker.
 *
 * This component provides the user interface for submitting symptoms to the AI checker.
 * It leverages modern React features for a robust and user-friendly experience:
 *
 * - **`useFormState` Hook:** Manages the form's state, including user input,
 *   validation errors, and the final AI-generated result. This hook seamlessly
 *   integrates with the `checkSymptoms` server action.
 *
 * - **`useFormStatus` Hook:** Provides the pending status of the form submission,
 *   allowing the submit button to show a loading state (`<Loader2 />`) while the
 *   server action is processing.
 *
 * - **State Handling:** The component conditionally renders different UI elements
 *   based on the `state` object returned from `useFormState`:
 *   - It displays validation errors using a toast notification.
 *   - It renders the AI analysis results in a separate card when they are available.
 *
 * - **Form Reset:** The form is automatically cleared upon a successful submission
 *   by using a `useRef` to call `form.reset()`.
 *
 * This component is self-contained and handles all client-side logic for the
 * symptom checker feature.
 */

import { useFormState, useFormStatus } from 'react-dom';
import { checkSymptoms, SymptomCheckerState } from '@/app/symptom-checker/actions';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Bot, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

/**
 * A submit button that shows a loading state while the form is pending.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Analyze Symptoms
        </>
      )}
    </Button>
  );
}

/**
 * The initial state for the symptom checker form.
 */
const initialState: SymptomCheckerState = {
  form: {
    symptoms: '',
  },
};

/**
 * The main form component for the Symptom Checker.
 */
export function SymptomCheckerForm() {
  const [state, formAction] = useFormState(checkSymptoms, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Effect to handle side-effects when the form state changes.
  useEffect(() => {
    if (state.error) {
      // Display a toast notification for any errors.
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: state.error,
      });
    }
    if (state.result) {
      // Reset the form on successful submission.
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Symptom Checker</CardTitle>
          <CardDescription>
            Enter your symptoms below, separated by commas. For example: "headache, fever, sore throat".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Textarea
              name="symptoms"
              placeholder="e.g., persistent cough, difficulty breathing, chest pain..."
              rows={5}
              defaultValue={state.form.symptoms}
              required
              aria-label="Enter your symptoms"
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {/* Conditionally render the results card when the AI analysis is complete. */}
      {state.result && (
        <Card className="mt-8 animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              AI Analysis Results
            </CardTitle>
            <CardDescription>
              Based on the symptoms you provided, here are some possibilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Possible Diagnoses:</h3>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {state.result.possibleDiagnoses}
              </p>
            </div>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Disclaimer</AlertTitle>
              <AlertDescription>{state.result.disclaimer}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
