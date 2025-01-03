'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
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
import { useClerk } from '@clerk/nextjs';

export function SignInForm() {
  const { loaded } = useClerk();

  if (!loaded) {
    return (
      <Card className="w-full sm:w-96 shadow-lg">
        <CardHeader className="text-center">
          <Logo className="size-12 mx-auto mb-4" />
          <CardTitle className="text-xl font-semibold">Loading</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <div className="relative">
            <Loader className="size-12 animate-spin text-gray-300" />
            <Loader className="size-12 animate-spin text-gray-600 absolute top-0 left-0" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <Card className="w-full sm:w-96">
                  <Link href="/">
                    <Logo className="size-8 my-4 mx-auto" />
                  </Link>
                  <CardHeader className="text-center items-center justify-center">
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>
                      Welcome back! Please enter your details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter className="bg-slate-100 text-center pt-4">
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                'Continue'
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <p className="text-center text-sm text-zinc-500">
                        Don&apos;t have an account?{' '}
                        <Link
                          href="/signup"
                          className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>
              <SignIn.Step name="verifications">
                <SignIn.Strategy name="email_code">
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
                        <SignIn.Action
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
                        </SignIn.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
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
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
