// Import required modules
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

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

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(400).json({ error: 'Error parsing form data' });
        }

        const { name, phoneNumber } = fields;
        let audioFile = files.audio as formidable.File | formidable.File[];

        if (!name || !phoneNumber || !audioFile) {
            return res.status(400).json({ error: 'Missing data in request' });
        }

        if (Array.isArray(audioFile)) {
            audioFile = audioFile[0];
        }

        if (!audioFile) {
            return res.status(400).json({ error: 'Missing audio file in request' });
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
            const fileStream = fs.createReadStream(audioFile.filepath);

            // Append the file with correct options
            mediaFormData.append('file', fileStream, {
                filename: audioFile.originalFilename || 'audio.m4a',
                contentType: audioFile.mimetype || 'audio/mp4',
                knownLength: audioFile.size,
            });

            // Get headers from FormData
            const formHeaders = mediaFormData.getHeaders();

            // Include the Authorization header
            const headers = {
                ...formHeaders,
                Authorization: `Bearer ${accessToken}`,
            };

            // Log the headers for debugging
            console.log('Headers being sent to WhatsApp media endpoint:', headers);

            // Send the request
            const mediaResponse = await axios.post(mediaUploadUrl, mediaFormData, {
                headers: headers,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });

            await new Promise((resolve) => setTimeout(resolve, 5000));

            console.log('Media upload response:', mediaResponse.data);

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

            const audioMessageResponse = await axios.post(messageUrl, audioMessageData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Audio message response:', audioMessageResponse.data);
            console.log(audioFile)
            console.log(audioFile.filepath)

            // Send name as text message
            const nameMessageData = {
                messaging_product: 'whatsapp',
                to: toPhoneNumber,
                type: 'text',
                text: {
                    body: String(name[0]),
                },
            };

            const NameMessageResponse = await axios.post(messageUrl, nameMessageData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Name message response:', NameMessageResponse.data);


            // Send phone number as text message
            const phoneMessageData = {
                messaging_product: 'whatsapp',
                to: toPhoneNumber,
                type: 'text',
                text: {
                    body: String(phoneNumber[0]),
                },
            };

            const PhoneMessageResponse = await axios.post(messageUrl, phoneMessageData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Phone message response:', PhoneMessageResponse.data);


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
