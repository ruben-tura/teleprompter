"use client"
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { redirect, useRouter } from "next/navigation"
import { UploadButton } from "@/lib/uploadthing"
import { useEffect } from "react"

export default function DashboardPage() {
  const router = useRouter();
  const session = authClient.useSession();
  useEffect(() => {
    if (!session.isPending && !session.data) {
      router.push("/")
    }
  }, [session])

  const user = session.data?.user;

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="textUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    </div>
  )
}
