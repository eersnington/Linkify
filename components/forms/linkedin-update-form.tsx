'use client';
import { useUser } from '@clerk/nextjs';
import { useTransition } from 'react';
import { updateLinkedInProfile } from '@/actions/update-linkedin';
import { useLinkedInData } from '@/context/linkedin-data-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import {
  linkedInProfileFormSchema,
  type LinkedInProfileFormData,
} from '@/lib/validations/linkedin-profile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/shared/icons';
import { useSignupModal } from '@/hooks/use-signup-modal';

export function LinkedInProfileForm() {
  const [isPending, startTransition] = useTransition();
  const { linkedInProfile, updateLinkedInProfile: updateProfileContext } =
    useLinkedInData();
  const { isSignedIn, user } = useUser();

  const userId = user?.id || 'anonymous';
  const userEmail = user?.emailAddresses[0].emailAddress || 'example@email.com';

  const signUpModal = useSignupModal();

  // Transform linkedInProfile to match the expected type
  // @ts-ignore
  const defaultValues: LinkedInProfileFormData = {
    ...linkedInProfile,
  };

  const form = useForm<LinkedInProfileFormData>({
    resolver: zodResolver(linkedInProfileFormSchema),
    defaultValues,
  });

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control: form.control,
    name: 'workExperiences',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  const onSubmit: SubmitHandler<LinkedInProfileFormData> = (data) => {
    if (!linkedInProfile) {
      signUpModal.onOpen();
      return;
    }
    startTransition(async () => {
      const { status, message } = await updateLinkedInProfile(userEmail, {
        id: userId,
        userEmail: userEmail,
        linkedInUrl: linkedInProfile.linkedInUrl,
        certifications: linkedInProfile.certifications,
        // recommendations: linkedInProfile.recommendations,
        skills: linkedInProfile.skills,
        ...data,
      });

      if (status !== 'success') {
        toast({
          title: 'Something went wrong.',
          description:
            message || 'Your profile was not updated. Please try again.',
          variant: 'destructive',
        });
      } else {
        updateProfileContext({
          ...linkedInProfile,
          ...data,
        });
        toast({
          description: message || 'Your profile has been updated.',
          className: 'bg-green-500 text-white font-semibold',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Profile</CardTitle>
            <CardDescription>
              Update your LinkedIn profile information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal-info">
                <AccordionTrigger>Personal Information</AccordionTrigger>
                <AccordionContent className="max-h-[60vh] overflow-y-auto">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-[400px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-[400px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-[400px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="w-full max-w-[800px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="photoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Photo URL</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-[400px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="work-experience">
                <AccordionTrigger>Work Experience</AccordionTrigger>
                <AccordionContent className="max-h-[60vh] overflow-y-auto">
                  {workExperienceFields.map((field, index) => (
                    <div key={field.id} className="mb-4 border-b pb-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`workExperiences.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full max-w-[400px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`workExperiences.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full max-w-[400px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`workExperiences.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full max-w-[400px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`workExperiences.${index}.description`}
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="w-full max-w-[800px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        className="mt-4"
                        onClick={() => removeWorkExperience(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendWorkExperience({
                        title: '',
                        company: '',
                        date: '',
                        description: '',
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Work Experience
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="education">
                <AccordionTrigger>Education</AccordionTrigger>
                <AccordionContent className="max-h-[60vh] overflow-y-auto">
                  {educationFields.map((field, index) => (
                    <div key={field.id} className="mb-4 border-b pb-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`education.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full max-w-[400px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full max-w-[400px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full max-w-[400px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        className="mt-4"
                        onClick={() => removeEducation(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendEducation({
                        name: '',
                        degree: '',
                        date: '',
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center"
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
