"use client"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/lib/uploadthing"
import { useEffect } from "react"
import { showToast } from "nextjs-toast-notify"
import axios from "axios"

export default function DashboardPage() {
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;
  useEffect(() => {
    if (!session.isPending && !session.data) {
      router.push("/")
    }
  }, [session])

  const handleNewLyric = async (res: any) => {
    console.log("Files: ", res);
    const url = process.env.NEXT_PUBLIC_SERVER_URL = "/api/lyrics";
    try {
      const { data } = await axios.post(url, {
        user: user?.email,
        url: res[0].url
      })
      showToast.success("Upload complete!");
      console.log("Data: ", data)
    } catch (error) {
      showToast.error("Error during upload");
    }
  }

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="textUploader"
          onClientUploadComplete={handleNewLyric}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    </div>
  )
}
