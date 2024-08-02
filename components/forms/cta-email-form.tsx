'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ctaFormSchema } from '@/lib/validations/user';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function CTAForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const form = useForm<z.infer<typeof ctaFormSchema>>({
    resolver: zodResolver(ctaFormSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(data: z.infer<typeof ctaFormSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push(`/onboard?email=${data.email}`);
    }, 500);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:max-w-4xl"
      >
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:w-3/5">
                <FormControl>
                  <Input
                    type="email"
                    className="h-16 rounded-lg border-4 bg-white px-4 text-base sm:text-lg text-purple-950 transition-colors duration-300 placeholder:text-purple-400 hover:border-purple-500 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your LinkedIn email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full md:w-2/5 h-16 font-semibold text-base sm:text-lg bg-purple-500 text-white hover:bg-purple-700 rounded-lg p-[3px] focus:outline-none hover:transform hover:scale-105 transition-transform duration-300"
            disabled={isSubmitting}
          >
            Get Started <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
