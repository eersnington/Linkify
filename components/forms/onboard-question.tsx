'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Linkedin, Search, Users } from 'lucide-react';
import {
  IconBrandTiktok as TikTok,
  IconBrandInstagram as Instagram,
  IconBrandYoutube as Youtube,
} from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { onboardFormSubmit } from '@/actions/source-form-submission';

const sourceSchema = z.object({
  source: z.enum(
    ['tiktok', 'linkedin', 'instagram', 'youtube', 'google', 'friend'],
    {
      required_error: 'Please select where you heard about us.',
    }
  ),
});

export function OnboardingSourceForm() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof sourceSchema>>({
    resolver: zodResolver(sourceSchema),
  });

  const handleSubmit = async (data: z.infer<typeof sourceSchema>) => {
    setIsSubmitting(true);
    try {
      await onboardFormSubmit(data.source, user?.id);
      router.push('/dashboard/');
    } catch (error) {
      console.error('Error saving source data:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const sourceOptions = [
    { value: 'tiktok', label: 'TikTok', icon: TikTok },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'google', label: 'Google Search', icon: Search },
    { value: 'friend', label: 'A Friend', icon: Users },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3"
                >
                  {sourceOptions.map((option) => (
                    <FormItem key={option.value}>
                      <FormControl>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={option.value}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-purple-500 p-4 hover:bg-purple-200 text-purple-950 peer-data-[state=checked]:bg-purple-400 [&:has([data-state=checked])]:bg-purple-700 cursor-pointer transition-colors"
                      >
                        <option.icon className="mb-3 h-6 w-6" />
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12 font-semibold text-base sm:text-lg bg-yellow-500 text-purple-950 hover:bg-yellow-600 rounded-lg focus:outline-none hover:transform hover:scale-105 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <ArrowRight className="h-6 w-6 mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <ArrowRight className="h-6 w-6 mr-2" />
              Submit
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
