import { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to your account',
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
