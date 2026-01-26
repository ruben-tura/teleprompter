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
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type SignInFormValues = z.infer<typeof formSchema>;

export type SignInFormProps = {
  onSubmit: (values: SignInFormValues) => void;
  onGitHubSignIn?: () => void;
  isPending?: boolean;
  errorMessage?: string | null;
  redirectUrl?: string | null;
};

export function SignInForm({
  onSubmit,
  onGitHubSignIn,
  isPending,
  redirectUrl,
}: SignInFormProps) {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full ${!onGitHubSignIn ? "mt-6" : ""}`}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </form>
        </Form>
        {onGitHubSignIn && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={onGitHubSignIn}
              disabled={isPending}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <span className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href={
              redirectUrl
                ? `/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`
                : "/sign-up"
            }
            className="text-primary underline hover:opacity-80"
          >
            Sign up
          </a>
        </span>
      </CardFooter>
    </Card>
  );
}
