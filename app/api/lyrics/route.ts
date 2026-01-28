import { connectDB } from "@/db/db";
import lyric from "@/schemas/lyric";

export async function POST(req: Request) {
  try {
    connectDB();
    const { user, url } = await req.json();
    const count = await lyric.countDocuments({ user });
    const order = count + 1;
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

export async function GET(req: Request) {
  try {
    connectDB();
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user")
    const lyrics = await lyric.find({ user }).sort({ order: 1 });
    return Response.json(lyrics, { status: 201 });
  } catch (error) {
    console.log("Error in GET call to /api/lyrics", error);
    return Response.json({ error: error }, { status: 400 })
  }
}
