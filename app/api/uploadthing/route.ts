import { createRouteHandler } from "uploadthing/next";

import { lyricsRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: lyricsRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

