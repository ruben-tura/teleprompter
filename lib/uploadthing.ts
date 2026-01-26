import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { LyricsRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<LyricsRouter>();
export const UploadDropzone = generateUploadDropzone<LyricsRouter>();

