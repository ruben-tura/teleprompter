"use client"
import LyricsComponent from "./components/lyrics-player";
import axios from "axios"
import { useState } from "react"
import { Lyric } from "@/types/lyric"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PageProps {
  params: Promise<{ lyricId: string }>;
}

export default async function PlayerPage({ params }: PageProps) {

  const router = useRouter();
  const { lyricId } = await params;
  const lyricUrl = process.env.UPLOADTHING_URL + lyricId;
  const res = await fetch(lyricUrl);
  const lyric = await res.text();

  const [lyricsList, setLyricsList] = useState<Lyric[]>([])
  const session = authClient.useSession();
  const user = session.data?.user;

  const getLyricsList = async () => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL = "/api/lyrics?user=" + user?.email;
    const { data } = await axios.get(url);
    setLyricsList(data);
  }

  const timeToMilliseconds = (time: string) => {
    const timeArray = time
      .split(/[\[\.\:\]]/)
      .filter((elem) => elem != "")
      .filter((elem) => !isNaN(Number(elem)))
      .map((elem) => Number(elem));
    return timeArray[0] * 60000 + timeArray[1] * 1000 + timeArray[2] * 10;
  }

  const splitLines = (str: string) => {
    const regex = /(\[\d+:\d+.\d+\])/;
    const array = str.split(regex);
    array.shift();
    const timestampsArray = array.filter((_elem, index) => index % 2 == 0)
    const linesArray = array.filter((_elem, index) => index % 2 != 0)
    const lyricObject = timestampsArray.map((elem, index) => ({
      time: timeToMilliseconds(elem),
      text: linesArray[index]
    }));
    return lyricObject;
  }

  const lyricLines = splitLines(lyric);

  useEffect(() => {
    if (!session.isPending && !session.data) {
      router.push("/")
    }
    getLyricsList();
    console.log(lyricsList);
  }, [session])

  return <div>
    <LyricsComponent lyrics={lyricLines} />
  </div>
}
