'use client';

import { OnboardingSourceForm } from '@/components/forms/onboard-question';
import Logo from '@/components/shared/logo';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border-2 border-purple-500 rounded-xl shadow-xl p-8">
        <div className="flex flex-row text-center items-center mb-6">
          <Logo className="w-12 h-12 mr-2" />
          <h1 className="text-3xl font-bold text-purple-950">
            Tell Us About You
          </h1>
        </div>

        <OnboardingSourceForm />
      </div>
    </div>
  );
}
