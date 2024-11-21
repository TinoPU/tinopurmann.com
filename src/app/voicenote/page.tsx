"use client";

import React, { useState, useEffect, useRef } from 'react';
import NeumorphismButton from "@/components/ui/NeumorphismButton";
import dynamic from "next/dynamic";
import {Trash} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
const Waveform = dynamic(() => import('@/components/ui/WaveForm'), { ssr: false });

export default function VoiceNote() {


    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        // Request microphone access and set up MediaRecorder
        const setupRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                let mimeType = '';


                if (MediaRecorder.isTypeSupported('audio/mp3')) {
                    mimeType = 'audio/mp3';
                }
                else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                    mimeType = 'audio/webm;codecs=opus';
                } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
                    mimeType = 'audio/ogg;codecs=opus';
                } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                    mimeType = 'audio/mp4';
                } else {
                    console.error('No supported MIME type for MediaRecorder found');
                    alert('Recording is not supported on this browser.');
                    return;
                }

                const recorder = new MediaRecorder(stream, { mimeType });
                setMediaRecorder(recorder);
            } catch (err) {
                console.error('Error accessing microphone:', err);
                alert('Microphone access is needed to use this feature.');
            }
        };
        setupRecorder();
    }, []);

    useEffect(() => {
        if (mediaRecorder) {
            const handleDataAvailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            const handleStop = () => {
                try {
                    const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
                    const audioURL = URL.createObjectURL(audioBlob);
                    setAudioURL(audioURL);
                    audioChunksRef.current = []; // Reset chunks
                } catch (err) {
                    console.error('Error creating audio blob:', err);
                }
            };

            mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
            mediaRecorder.addEventListener('stop', handleStop);

            return () => {
                mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
                mediaRecorder.removeEventListener('stop', handleStop);
            };
        }
    }, [mediaRecorder]);

    const handlePressStart = () => {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
            audioChunksRef.current = []; // Reset chunks
            mediaRecorder.start();
            setIsRecording(true);
        }
    };

    const handlePressEnd = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const handleDelete = () => {
        if (audioURL) {
            URL.revokeObjectURL(audioURL);
            setAudioURL(null);
        }

        // Stop all tracks of the media stream to release the microphone
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        // Reset the recorder to allow new recordings
        setMediaRecorder(null);
        setMediaStream(null);

        // Set up a new MediaRecorder instance for the next recording
        const setupRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setMediaStream(stream);
                let mimeType = '';

                if (MediaRecorder.isTypeSupported('audio/mp3')) {
                    mimeType = 'audio/mp3';
                } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                    mimeType = 'audio/webm;codecs=opus';
                } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
                    mimeType = 'audio/ogg;codecs=opus';
                } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                    mimeType = 'audio/mp4';
                } else {
                    console.error('No supported MIME type for MediaRecorder found');
                    alert('Recording is not supported on this browser.');
                    return;
                }

                const recorder = new MediaRecorder(stream, { mimeType });
                setMediaRecorder(recorder);
            } catch (err) {
                console.error('Error accessing microphone:', err);
                alert('Microphone access is needed to use this feature.');
            }
        };
        setupRecorder();
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    };

    return (
        <div className="h-[100vh] flex flex-col px-6">
            <div className="h-2/3">
                {isRecording && (<div className="h-full w-full flex items-center justify-center">
                    <Waveform />
                </div>)}
                {audioURL && (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                        <div className="flex flex-row items-center gap-3">
                            <audio controls src={audioURL}/>
                            <button onClick={handleDelete} className="text-wheat">
                            <Trash className="h-9 w-9" />
                            </button>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <Input
                                className="w-full bg-onyx text-white"
                                placeholder="Name"
                            />
                            <Input
                                className="w-full bg-onyx text-white"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="h-1/3 flex flex-col items-center">
                {!audioURL && (<NeumorphismButton
                    onMouseDown={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    className={isRecording ? 'recording' : ''}
                />)}
                {audioURL && (<Button className="bg-wheat text-onyx font-bold w-full mb-6 py-7">
                    Send Note
                </Button>)}
            </div>
        </div>
    );
}
