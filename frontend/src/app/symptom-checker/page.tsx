import { SymptomCheckerForm } from '@/components/symptom-checker/SymptomCheckerForm';
import { ShieldAlert } from 'lucide-react';

export default function SymptomCheckerPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Symptom Checker</h1>
        <p className="mt-2 text-lg text-muted-foreground">Get initial insights into your health.</p>
      </div>

      <div className="mx-auto mb-8 max-w-4xl rounded-md border-l-4 border-destructive bg-destructive/5 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ShieldAlert className="h-5 w-5 text-destructive" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-destructive/80">
              This tool is for informational purposes only and does not provide medical advice. It is not a
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of
              your physician or other qualified health provider with any questions you may have regarding a
              medical condition.
            </p>
          </div>
        </div>
      </div>

      <SymptomCheckerForm />
    </div>
  );
}
