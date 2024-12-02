// test on mobile
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';


ffmpeg.setFfmpegPath(ffmpegInstaller.path);


ffmpeg.getAvailableCodecs((err, codecs) => {
    if (err) {
        console.error('Error fetching codecs:', err);
    } else {
        const codecList: string[] = Object.keys(codecs).filter(codec => codecs[codec].type === 'audio');
        console.log('FFmpeg Available Audio Codecs:', codecList);
    }
});

import path from 'path';


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

        const getAudioCodec = async (filePath: string): Promise<string> => {
            return new Promise((resolve, reject) => {
                ffmpeg(filePath)
                    .outputOptions('-hide_banner') // Suppress FFmpeg banner
                    .outputOptions('-f', 'null') // Null output format to prevent actual output
                    .output('/tmp/null') // Dummy output file
                    .on('stderr', (stderrLine) => {
                        // FFmpeg logs metadata to stderr; capture codec info from it
                        const codecMatch = stderrLine.match(/Audio: (\w+)/);
                        if (codecMatch) {
                            resolve(codecMatch[1]); // Extract and resolve the codec
                        }
                    })
                    .on('error', (err) => reject(`Error extracting codec: ${err.message}`))
                    .on('end', () => reject('No audio stream found or unable to detect codec'))
                    .run();
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
            console.log('File saved to', destinationPath);
        } catch (err) {
            console.error('Error saving file:', err);
            // Handle the error appropriately
        }

        try {
            const codec = await getAudioCodec(destinationPath);
            console.log(`Input audio codec: ${codec}`);
        } catch (error) {
            console.error('Error detecting codec:', error);
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


        if (codec === 'aac') {
            const tempPCMPath = path.join(destinationDir, `${audioFile.newFilename}.wav`);
            const finalOutputPath = path.join(destinationDir, `${audioFile.newFilename}.mp3`);
            // Step 1: Convert AAC to PCM
            await new Promise<void>((resolve, reject) => {
                ffmpeg(destinationPath)
                    .outputOptions(['-f wav'])
                    .on('start', (cmd) => console.log('PCM Conversion Command:', cmd))
                    .on('end', () => {
                        console.log('PCM Conversion Complete');
                        resolve();
                    })
                    .on('error', (err) => {
                        console.error('Error during PCM conversion:', err.message);
                        reject(err);
                    })
                    .save(tempPCMPath);
            });
            // Step 2: Convert PCM to MP3
            await new Promise<void>((resolve, reject) => {
                ffmpeg(tempPCMPath)
                    .outputOptions([
                        '-c:a libmp3lame',
                        '-q:a 2',
                        '-ar 44100',
                    ])
                    .on('start', (cmd) => console.log('MP3 Conversion Command:', cmd))
                    .on('end', () => {
                        console.log('MP3 Conversion Complete');
                        resolve();
                    })
                    .on('error', (err) => {
                        console.error('Error during MP3 conversion:', err.message);
                        reject(err);
                    })
                    .save(finalOutputPath);
            });
                // Step 3: Clean Up Temporary PCM File
            try {
                fs.unlinkSync(tempPCMPath);
                console.log('Temporary PCM file deleted:', tempPCMPath);
            } catch (err) {
                console.error('Error deleting temporary PCM file:', err);
            }
        } else {
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
        }




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

            await axios.post(messageUrl, audioMessageData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // Send name as text message
            const nameMessageData = {
                messaging_product: 'whatsapp',
                to: toPhoneNumber,
                type: 'text',
                text: {
                    body: String(name[0]),
                },
            };

            await axios.post(messageUrl, nameMessageData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });



            // Send phone number as text message
            const phoneMessageData = {
                messaging_product: 'whatsapp',
                to: toPhoneNumber,
                type: 'text',
                text: {
                    body: String(phoneNumber[0]),
                },
            };

            await axios.post(messageUrl, phoneMessageData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });


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
