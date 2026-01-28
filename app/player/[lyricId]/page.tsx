import LyricsComponent from "./components/lyrics-player";

interface PageProps {
  params: Promise<{ lyricId: string }>;
}

export default async function PlayerPage({ params }: PageProps) {

  const { lyricId } = await params;
  const lyricUrl = process.env.UPLOADTHING_URL + lyricId;
  const res = await fetch(lyricUrl);
  const lyric = await res.text();

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
    console.log("lyricObject: ", lyricObject);
    return lyricObject;
  }

  const lyricLines = splitLines(lyric);

  return <div>
    <h1>PLAYER: {lyricId}</h1>
    <LyricsComponent lyrics={lyricLines} />
  </div>
}
