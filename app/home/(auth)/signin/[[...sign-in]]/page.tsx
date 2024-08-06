import { Metadata } from 'next';
import { SignInForm } from '@/components/clerk/signin-component';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to your account',
};

export default function SignInPage() {

  return <SignInForm />;
}
