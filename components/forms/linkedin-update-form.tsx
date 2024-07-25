"use client";

import { useUser } from "@clerk/nextjs";
import { useTransition } from "react";
import { updateLinkedInProfile } from "@/actions/get-linkedin-profile";
import { useLinkedInProfile } from "@/context/linkedin-profile-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import {
  linkedInProfileSchema,
  type LinkedInProfileFormData,
} from "@/lib/validations/linkedin-profile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";

interface LinkedInProfileFormProps {
  email: string;
}

export function LinkedInProfileForm({ email }: LinkedInProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const updateProfileWithId = updateLinkedInProfile.bind(null, email);
  const { profile, updateProfile } = useLinkedInProfile();
  const { isSignedIn, user } = useUser();

  const form = useForm<LinkedInProfileFormData>({
    resolver: zodResolver(linkedInProfileSchema),
    defaultValues: profile,
  });

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const onSubmit: SubmitHandler<LinkedInProfileFormData> = (data) => {
    if (!isSignedIn || user?.emailAddresses[0].emailAddress !== email) {
      toast({
        description: "You need to be signed in to update your profile.",
        className: "bg-green-500 text-white font-semibold",
      });
      return;
    }

    startTransition(async () => {
      const { status } = await updateProfileWithId(data);

      if (status !== "success") {
        toast({
          title: "Something went wrong.",
          description: "Your profile was not updated. Please try again.",
          variant: "destructive",
        });
      } else {
        updateProfile(data);
        toast({
          description: "Your profile has been updated.",
          className: "bg-green-500 text-white font-semibold",
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
              {/* 
                Personal Information
                - Full Name
                - Title
                - Description
                - Photo URL
              */}
              <AccordionItem value="personal-info">
                <AccordionTrigger>Personal Information</AccordionTrigger>
                <AccordionContent className="max-h-[60vh] overflow-y-auto">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
              {/*
                Work Experience
                - Title
                - Company Name
                - Date
                - Description
              */}
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
                              <FormLabel>Company Name</FormLabel>
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
                        onClick={() => removeWorkExperience(index)}
                        variant="destructive"
                        className="mt-2"
                      >
                        <Trash2 className="mr-2 size-4" /> Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      appendWorkExperience({
                        title: "",
                        company: "",
                        date: "",
                        description: "",
                      })
                    }
                    className="mt-2"
                  >
                    <Plus className="mr-2 size-4" /> Add Work Experience
                  </Button>
                </AccordionContent>
              </AccordionItem>
              {/*
                Education
                - School Name
                - Degree Name
                - Date
              */}
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
                              <FormLabel>School Name</FormLabel>
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
                              <FormLabel>Degree Name</FormLabel>
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
                        onClick={() => removeEducation(index)}
                        variant="destructive"
                        className="mt-2"
                      >
                        <Trash2 className="mr-2 size-4" /> Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      appendEducation({
                        name: "",
                        degree: "",
                        date: "",
                      })
                    }
                    className="mt-2"
                  >
                    <Plus className="mr-2 size-4" /> Add Education
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              <span>{isPending ? "Saving" : "Save"}</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
