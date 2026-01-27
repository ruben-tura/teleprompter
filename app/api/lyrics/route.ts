import { connectDB } from "@/db/db";
import lyric from "@/schemas/lyric";

export async function POST(req: Request) {
  try {
    connectDB();
    const { user, url, order } = await req.json();
    const newLyric = new lyric({
      user,
      url,
      order
    });
    newLyric.save();
    return Response.json({ data: newLyric }, { status: 201 });
  } catch (error) {
    console.log("Error in POST call to /api/lyrics", error);
    return Response.json({ error: error }, { status: 400 })
  }
}
