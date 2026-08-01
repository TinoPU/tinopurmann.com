import type { NextApiRequest, NextApiResponse } from "next";

/** Stub — ffmpeg binaries are excluded from Vercel deploys. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(503).json({
    error: "FFmpeg is not available in this deployment",
  });
}
