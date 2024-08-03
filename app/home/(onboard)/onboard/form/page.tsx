'use client';

import { OnboardingSourceForm } from '@/components/forms/onboard-question';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border-4 border-purple-500 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-purple-950 mb-6 text-center">
          Tell Us About You
        </h1>
        <OnboardingSourceForm />
      </div>
    </div>
  );
}
