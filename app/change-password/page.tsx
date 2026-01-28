"use client";

import { ChangePasswordForm, ChangePasswordFormValues } from "@/components/change-password-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChangePasswordPage() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") ?? "");
  }, [])

  // const token = new URLSearchParams(window.location.search).get("token");
  const router = useRouter();

  const handleSubmit = (values: ChangePasswordFormValues) => {
    if (token) {
      authClient.resetPassword({
        newPassword: values.password,
        token,
      })
    }
    router.push("/sign-in");
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <ChangePasswordForm onSubmit={handleSubmit} />
    </main>
  )
}
