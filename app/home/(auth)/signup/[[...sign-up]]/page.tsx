import { Metadata } from 'next';
import { SignUpForm } from '@/components/clerk/signup-component';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up for an account',
};

export default function SignUpPage({
  searchParams,
}: {
  searchParams: {
    email: string;
    firstName: string;
    lastName: string;
    redirect?: string;
  };
}) {
  const { email, firstName, lastName, redirect } = searchParams;

  const initialValues = {
    emailAddress: email,
    firstName: firstName,
    lastName: lastName,
  };

  console.log('Normal Redirect!');
  return <SignUpForm initialValues={initialValues} />;
}
