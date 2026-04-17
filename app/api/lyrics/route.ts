import { connectDB } from "@/db/db";
import lyric from "@/schemas/lyric";

export async function POST(req: Request) {
  try {
    connectDB();
    const { name, user, url } = await req.json();
    const count = await lyric.countDocuments({ user });
    const order = count + 1;
    const newLyric = new lyric({
      name,
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

export async function PATCH(req: Request) {
  try {
    connectDB();
    const { user, order, direction } = await req.json();
    const res1 = await lyric.updateOne({ user, order }, { order: -1 });
    const res2 = await lyric.updateOne({ user, order: direction == "up" ? order - 1 : order + 1 }, { order });
    const res3 = await lyric.updateOne({ user, order: -1 }, { order: direction == "up" ? order - 1 : order + 1 });
    return Response.json({ res1, res2, res3 }, { status: 201 });
  } catch (error) {
    console.log("Error in PATCH call to /api/lyrics", error);
    return Response.json({ error: error }, { status: 400 });
  }
}
