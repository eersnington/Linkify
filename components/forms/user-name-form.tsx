'use client';

import { useTransition } from 'react';
import { updateUserName, type FormData } from '@/actions/update-user-name';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { userNameSchema } from '@/lib/validations/user';
import { buttonVariants } from '@/components/ui/button';
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
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/shared/icons';

interface UserNameFormProps {
  user: Pick<User, 'id' | 'firstName' | 'lastName'>;
}

export function UserNameForm({ user }: UserNameFormProps) {
  const [isPending, startTransition] = useTransition();
  const updateUserNameWithId = updateUserName.bind(null, user.id);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status } = await updateUserNameWithId(data);

      if (status !== 'success') {
        toast({
          title: 'Something went wrong.',
          description: 'Your name was not updated. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          description: 'Your name has been updated.',
          className: 'bg-green-500 text-white font-semibold',
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your first name and last name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                className="w-full sm:w-[400px]"
                size={32}
                {...register('firstName')}
              />
              {errors?.firstName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                className="w-full sm:w-[400px]"
                size={32}
                {...register('lastName')}
              />
              {errors?.lastName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), 'bg-blue-500')}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            <span>{isPending ? 'Saving' : 'Save'}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
