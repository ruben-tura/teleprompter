"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Github } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    }),
  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof formSchema>;

export type ChangePasswordFormProps = {
  onSubmit: (values: ChangePasswordFormValues) => void;
  isPending?: boolean;
  errorMessage?: string | null;
  redirectUrl?: string | null;
};

export function ChangePasswordForm({
  onSubmit,
  isPending,
  redirectUrl,
}: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back! Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col justify-center">
      </CardFooter>
    </Card>
  );
}
