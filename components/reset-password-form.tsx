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
import { Loader2 } from "lucide-react";
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
  email: z.string().email({
    message: "Please enter a valid email address.",
  })
});

export type ResetPasswordFormValues = z.infer<typeof formSchema>;

export type ResetPasswordFormProps = {
  onSubmit: (values: ResetPasswordFormValues) => void;
  isPending?: boolean;
  errorMessage?: string | null;
  redirectUrl?: string | null;
};

export function ResetPasswordForm({
  onSubmit,
  isPending,
  redirectUrl,
}: ResetPasswordFormProps) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Confirm your email address to reset your password:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage className="min-h-5" />
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
