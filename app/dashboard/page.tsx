"use client"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/lib/uploadthing"
import { useEffect } from "react"
import { showToast } from "nextjs-toast-notify"
import axios from "axios"
import { useState } from "react"
import { Lyric } from "@/types/lyric"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;
  const [lyrics, setLyrics] = useState<Lyric[]>([])

  const getLyrics = async () => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL = "/api/lyrics?user=" + user?.email;
    const { data } = await axios.get(url);
    setLyrics(data);
  }

  const handleNewLyric = async (res: any) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL = "/api/lyrics";
    try {
      const { data } = await axios.post(url, {
        name: res[0].name,
        user: user?.email,
        url: res[0].ufsUrl
      })
      showToast.success("Upload complete!");
    } catch (error) {
      showToast.error("Error during upload");
    }
  }

  const moveLyric = async (order: number, direction: string) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL = "/api/lyrics";
    try {
      const { data } = await axios.patch(url, {
        user: user?.email,
        order,
        direction
      })
      showToast.success("Move complete!");
    } catch (error) {
      showToast.error("Error during lyrics move");

    }
  }

  useEffect(() => {
    if (!session.isPending && !session.data) {
      router.push("/")
    }
    getLyrics();
  }, [session])

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <h2>Lyrics list</h2>
      {lyrics.map((lyric, index) => (
        <div className="flex flex-row" key={index}>
          <div className="flex flex-row">
            <p className="mx-2">{lyric.order}</p>
            <button onClick={() => moveLyric(lyric.order, "up")}>UP</button>
            <button onClick={() => moveLyric(lyric.order, "down")}>DOWN</button>
            <a href={`/player/${lyric.url.split("/").pop()}`} >
              <p className="mx-2">Name: {lyric.name}</p>
            </a>
          </div>
        </div>
      ))}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="textUploader"
          onClientUploadComplete={handleNewLyric}
          onUploadError={(error: Error) => {
            showToast.error(`Error during upload: ${error}`);
          }}
        />
      </main>
    </div>
  )
}
