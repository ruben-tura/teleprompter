"use client";

import { ResetPasswordForm, ResetPasswordFormValues } from "@/components/reset-password-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSubmit = (values: ResetPasswordFormValues) => {
    console.log("Signin values: ", values);
    authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/change-password"
    })
    router.push("/")
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <ResetPasswordForm onSubmit={handleSubmit} />
    </main>
  )
}
