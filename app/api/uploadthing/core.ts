import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const lyricsRouter = {
  textUploader: f({
    blob: {
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({
        headers: req.headers,
      });
      console.log("Req:", req); //on server

      if (!session?.user?.id) throw new UploadThingError("Unauthorized");

      return { userId: session?.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId); //on server
      console.log("file url", file.ufsUrl); //on server
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type LyricsRouter = typeof lyricsRouter;

