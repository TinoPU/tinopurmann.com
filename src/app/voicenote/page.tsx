"use client";
import React, { useState, useEffect, useRef } from 'react';
import NeumorphismButton from "@/components/ui/NeumorphismButton";

export default function VoiceNote() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        // Request microphone access and set up MediaRecorder
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
            })
            .catch(err => {
                console.error('Error accessing microphone:', err);
            });
    }, []);

    useEffect(() => {
        if (mediaRecorder) {
            const handleDataAvailable = (event: BlobEvent) => {
                audioChunksRef.current.push(event.data);
            };

            const handleStop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg; codecs=opus' });
                const audioURL = URL.createObjectURL(audioBlob);
                setAudioURL(audioURL);
                audioChunksRef.current = []; // Reset chunks
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
    };

    return (
        <div className="h-[100vh] flex flex-col">
            <div className="h-2/3">
                {audioURL && (
                    <div className="mt-4 flex flex-col items-center">
                        <audio controls src={audioURL} />
                        <button onClick={handleDelete} className="text-white mt-2">
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="h-1/3 flex flex-col items-center">
                <NeumorphismButton
                    onMouseDown={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    className={isRecording ? 'recording' : ''}
                />
            </div>
        </div>
    );
}
