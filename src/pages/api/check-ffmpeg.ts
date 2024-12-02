import { execSync } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const ffmpegVersion = execSync('ffmpeg -version').toString();
        res.status(200).json({ ffmpegVersion });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'FFmpeg is not available', details: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred', details: String(error) });
        }
    }
}
