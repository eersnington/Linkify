"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparkleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ctaFormSchema } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CTAForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ctaFormSchema>>({
    resolver: zodResolver(ctaFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof ctaFormSchema>) {
    setIsSubmitting(true);
    // simulate a 0.2 sec delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/onboard?email=${data.email}`);
    }, 0.2 * 1000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:max-w-4xl"
      >
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormControl>
                  <Input
                    type="email"
                    className="h-16 rounded-lg border-4 bg-slate-100 px-4 text-lg text-slate-800 transition-colors duration-300 placeholder:text-slate-400 hover:border-purple-500 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your LinkedIn email address to"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="relative h-16 w-2/5 overflow-hidden rounded-lg p-[3px] focus:outline-none"
            disabled={isSubmitting}
          >
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1,#a855f7,#8B5CF6)]" />
            <span className="inline-flex size-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-white to-gray-100 px-3 py-1 text-lg font-medium text-slate-800 backdrop-blur-3xl">
              <SparkleIcon className="mx-2" /> Get Started
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
