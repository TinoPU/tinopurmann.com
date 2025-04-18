// test on mobile
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const ffmpegPath = path.resolve('./bin/ffmpeg');
const ffprobePath = path.resolve('./bin/ffprobe');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function sendWhatsAppMessage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields: Fields, files: Files) => {


        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(400).json({ error: 'Error parsing form data' });
        }

        const { name, phoneNumber } = fields;
        let audioFile: formidable.File | formidable.File[] | undefined = files.audio;

        if (!name || !phoneNumber || !audioFile) {
            return res.status(400).json({ error: 'Missing data in request' });
        }

        if (Array.isArray(audioFile)) {
            audioFile = audioFile[0];
        }

        if (!audioFile) {
            return res.status(400).json({ error: 'Missing audio file in request' });
        }

        const getAudioCodec = async (filePath: string) => {
            return new Promise((resolve, reject) => {
                ffmpeg.ffprobe(filePath, (err, metadata) => {
                    if (err) return reject(err);
                    const codec = metadata.streams[0]?.codec_name || 'unknown';
                    resolve(codec);
                });
            });
        };


        // Define the destination directory and file path
        const destinationDir = '/tmp';
        const fileExtension = path.extname(audioFile.originalFilename || '.audio');
        const destinationFilename = audioFile.newFilename + fileExtension;
        const destinationPath = path.join(destinationDir, destinationFilename);
        try {
            // Ensure the destination directory exists
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }

            // Copy the file to the destination directory
            fs.copyFileSync(audioFile.filepath, destinationPath);
        } catch (err) {
            console.error('Error saving file:', err);
            // Handle the error appropriately
        }

        const outputPath = path.join(destinationDir, `${audioFile.newFilename}.mp3`);

        const ffmpegCommand = ffmpeg(destinationPath);
        const codec = await getAudioCodec(destinationPath);

        if (audioFile.mimetype && audioFile.mimetype.includes('audio/mp4')) {
            if (codec === 'aac') {
                ffmpegCommand.inputOptions('-f mp4'); // Safari's typical format
            } else if (codec === 'opus') {
                // Opus in MP4 container (Brave) - No need to specify "webm" as it's still MP4
                ffmpegCommand.inputOptions('-f mp4');
            }
        } else if (audioFile.mimetype && audioFile.mimetype.includes('audio/webm')) {
            if (codec === 'opus') {
                ffmpegCommand.inputOptions('-f webm'); // Typical for webm
            }
        } else {
            console.warn(`Unrecognized format: ${audioFile.mimetype}`);
            // You may need to handle other cases or let FFmpeg auto-detect
        }

        // Convert to OPUS format
        await new Promise<void>((resolve, reject) => {
            ffmpegCommand
                .outputOptions([
                    '-af', 'aresample=async=1', // Normalize timestamps
                    '-ar', '44100',            // Standardize sample rate
                ])
                .outputOptions('-c:a libmp3lame') // Use MP3 codec
                .outputOptions('-q:a 2')
                .save(outputPath)
                .on('end', () => {
                    resolve();
                })
                .on('error', (err: Error) => {
                    console.error('FFmpeg Error:', err.message);
                    reject(err);
                });

        });




        // Retrieve environment variables
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const fromPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const toPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;

        if (!accessToken || !fromPhoneNumberId || !toPhoneNumber) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        try {
            // Upload the audio file to WhatsApp media endpoint
            const mediaUploadUrl = `https://graph.facebook.com/v21.0/${fromPhoneNumberId}/media`;

            const mediaFormData = new FormData();
            mediaFormData.append('messaging_product', 'whatsapp');

            // Read the file
            const fileStream = fs.createReadStream(outputPath);

            // Get the stats of the converted file
            const stats = fs.statSync(outputPath);
            const fileSizeInBytes = stats.size;

            // Append the file with correct options
            mediaFormData.append('file', fileStream, {
                filename: `${name}.mp3` || 'audio.mp3',
                contentType: 'audio/mpeg',
                knownLength: fileSizeInBytes,
            });

            // Get headers from FormData
            const formHeaders = mediaFormData.getHeaders();

            // Include the Authorization header
            const headers = {
                ...formHeaders,
                Authorization: `Bearer ${accessToken}`,
            };


            // Send the request
            const mediaResponse = await axios.post(mediaUploadUrl, mediaFormData, {
                headers: headers,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });

            console.log(mediaResponse.data)

            const mediaId = mediaResponse.data.id;

            // Send audio message with media ID
            const messageUrl = `https://graph.facebook.com/v21.0/${fromPhoneNumberId}/messages`;

            const audioMessageData = {
                messaging_product: 'whatsapp',
                recipient_type: "individual",
                to: toPhoneNumber,
                type: 'audio',
                audio: {
                    id: mediaId,
                },
            };

            try {
                const audioResponse = await axios.post(messageUrl, audioMessageData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log('✅ Audio message response:', audioResponse.data);
            } catch (error) {
                console.error('❌ Error sending audio message:', error);
            }

            // Send name as text message
            const nameMessageData = {
                messaging_product: 'whatsapp',
                to: toPhoneNumber,
                type: 'text',
                text: {
                    body: String(name[0]),
                },
            };

            try {
                const nameResponse = await axios.post(messageUrl, nameMessageData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log('✅ Name message response:', nameResponse.data);
            } catch (error) {
                console.error('❌ Error sending name message:', error || error);
            }

            // Send phone number as text message
            const phoneMessageData = {
                messaging_product: 'whatsapp',
                to: toPhoneNumber,
                type: 'text',
                text: {
                    body: String(phoneNumber[0]),
                },
            };

            try {
                const phoneResponse = await axios.post(messageUrl, phoneMessageData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log('✅ Phone message response:', phoneResponse.data);
            } catch (error: unknown) {

                if (axios.isAxiosError(error)) {
                    console.error('Error sending phone:', error.response?.data || error.message);
                    return res.status(500).json({
                        error: 'Failed to send messages',
                        details: error.response?.data || error.message,
                    });
                } else if (error instanceof Error) {
                    console.error('Error sending messages:', error.message);
                    return res.status(500).json({
                        error: 'Failed to send messages',
                        details: error.message,
                    });
                } else {
                    console.error('Unexpected error:', error);
                    return res.status(500).json({
                        error: 'Failed to send messages',
                        details: 'An unexpected error occurred',
                    });
                }
            }


            return res.status(200).json({ message: 'Messages sent successfully' });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error sending messages:', error.response?.data || error.message);
                return res.status(500).json({
                    error: 'Failed to send messages',
                    details: error.response?.data || error.message,
                });
            } else if (error instanceof Error) {
                console.error('Error sending messages:', error.message);
                return res.status(500).json({
                    error: 'Failed to send messages',
                    details: error.message,
                });
            } else {
                console.error('Unexpected error:', error);
                return res.status(500).json({
                    error: 'Failed to send messages',
                    details: 'An unexpected error occurred',
                });
            }
        }
    });
}
