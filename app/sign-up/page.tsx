"use client";

import { SignUpForm, SignUpFormValues } from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setPending] = useState(false)

  const handleSubmit = (values: SignUpFormValues) => {
    console.log("Signup values: ", values);
    authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.firstName + " " + values.lastName,
    }, {
      onRequest: () => {
        setPending(true)
      },
      onResponse: () => {
        setPending(false)
      },
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: ({ error }) => {
        alert(error.message)
      }
    })
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <SignUpForm onSubmit={handleSubmit} isPending={isPending} />
    </main>
  )
}
