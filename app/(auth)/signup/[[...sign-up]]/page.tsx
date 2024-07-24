import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
