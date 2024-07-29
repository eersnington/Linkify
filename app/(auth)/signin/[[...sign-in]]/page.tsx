import { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to your account',
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
