import type { NextApiRequest, NextApiResponse } from "next";

/** Voice notes are temporarily disabled in the UI; keep the route as a stub
 *  so deploys don't need the 150MB ffmpeg binaries. */
export default async function sendWhatsAppMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(503).json({
    error: "Voice notes are temporarily disabled",
  });
}
