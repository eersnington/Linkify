'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CircleArrowRight, Loader } from 'lucide-react';
import Logo from '../shared/logo';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
  initialValues?: {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
  };
}

export default function SignUpForm({ initialValues }: SignUpFormProps) {
  // console.log('Initial Values: ', initialValues);

  const router = useRouter();

  const handleChangeEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/signup');
    window.location.reload();
  };

  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="w-full sm:w-96">
                  <Link href="/">
                    <Logo className="size-8 my-4 mx-auto" />
                  </Link>
                  <CardHeader className="text-center items-center justify-center">
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                      Welcome! Please fill in the details to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-4  ">
                      <Clerk.Field name="firstName" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>First name</Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input className="focus:ring-gray-200 focus:border-gray-300" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field name="lastName" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Last name</Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input className="focus:ring-gray-200 focus:border-gray-300" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </div>
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="email"
                        className="focus:ring-gray-200 focus:border-gray-300"
                        required
                        asChild
                      >
                        <Input className="focus:ring-gray-200 focus:border-gray-300" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter className="bg-slate-50 text-center">
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          className="bg-gradient-to-b from-gray-700 to-gray-800 hover:bg-gradient-to-t"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                'Continue'
                              );
                            }}
                          </Clerk.Loading>
                          <CircleArrowRight className="ml-4 size-4" />
                        </Button>
                      </SignUp.Action>
                      <p className="text-center text-sm text-zinc-500">
                        Already have an account?{' '}
                        <Link
                          href="/signin"
                          className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="w-full sm:w-96">
                    <CardHeader className="text-center items-center justify-center">
                      <Link href="/">
                        <Logo className="size-8 my-4 mx-auto" />
                      </Link>{' '}
                      <CardTitle>Verify your email</CardTitle>
                      <CardDescription>
                        Use the verification link sent to your email.
                        <br />
                        Please check your spam folder as well.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <div className="grid items-center justify-center gap-y-2">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">
                            Email address
                          </Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center has-[:disabled]:opacity-50"
                              autoSubmit
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className={cn(
                                      'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md focus:ring-gray-200 focus:border-gray-300',
                                      {
                                        'z-10 ring-2 ring-ring ring-offset-background':
                                          status === 'cursor' ||
                                          status === 'selected',
                                      }
                                    )}
                                  >
                                    {value}
                                    {status === 'cursor' && (
                                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                        <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-center text-sm text-destructive" />
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className="text-muted-foreground"
                          fallback={({ resendableAfter }) => (
                            <Button variant="link" size="sm" disabled>
                              Didn&apos;t recieve a code? Resend (
                              <span className="tabular-nums">
                                {resendableAfter}
                              </span>
                              )
                            </Button>
                          )}
                        >
                          <Button type="button" variant="link" size="sm">
                            <span className="text-foreground">
                              Didn&apos;t recieve a code? Resend
                            </span>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="bg-gradient-to-b from-gray-700 to-gray-800 hover:bg-gradient-to-t"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Loader className="size-4 animate-spin" />
                                ) : (
                                  'Continue'
                                );
                              }}
                            </Clerk.Loading>
                            <CircleArrowRight className="ml-4 size-4" />
                          </Button>
                        </SignUp.Action>
                        <p className="text-center text-sm text-zinc-500">
                          <Link
                            href="/signup"
                            className="font-medium decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                            onClick={handleChangeEmail}
                          >
                            Change email address?
                          </Link>
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
