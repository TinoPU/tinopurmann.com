"use client";

import React, { useState, useEffect, useRef } from 'react';
import NeumorphismButton from "@/components/ui/NeumorphismButton";
import dynamic from "next/dynamic";
import {Trash} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BlinkBlur} from "react-loading-indicators";
import AudioVisualizer from "@/components/ui/AudioVisualizer";

const Waveform = dynamic(() => import('@/components/ui/WaveForm'), { ssr: false });

interface AudioDevice {
    id: string;
    name: string;
}

export default function VoiceNote() {

    const [isRecorderReady, setIsRecorderReady] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [microphonePermissionState, setMicrophonePermissionState] = useState<PermissionState | null>(null);
    const [availableAudioDevices, setAvailableAudioDevices] = useState<AudioDevice[]>([]);
    const [selectedAudioDevice, setSelectedAudioDevice] = useState<string | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);


    // Get Available Audio Devices
    function getAvailableAudioDevices(): Promise<AudioDevice[]> {
        return new Promise<AudioDevice[]>((resolve) => {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const availableDevices = devices
                    .filter((d) => d.kind === 'audioinput')
                    .map((d) => {
                        return {
                            id: d.deviceId,
                            name: d.label,
                        };
                    });
                resolve(availableDevices);
            });
        });
    }

    // Handle Permission State
    function handlePermissionState(state: "granted" | "denied" | "prompt") {
        setMicrophonePermissionState(state);
        console.log('Microphone Permission State:', microphonePermissionState);
        if (state === "granted") {
            getAvailableAudioDevices().then((devices) => {
                setAvailableAudioDevices(devices);
                console.log('Available Audio Devices:', availableAudioDevices);
                if (devices.length > 0) {
                    const defaultDeviceId = devices.find((device) => device.id === 'default')?.id ?? null;
                    setSelectedAudioDevice(defaultDeviceId);
                    console.log('Selected Audio Device:', defaultDeviceId);
                }
            });
        }
    }


    useEffect(() => {
        navigator.permissions.query({name: 'microphone' as PermissionName}).then((function (queryResults) {
            handlePermissionState(queryResults.state);
            queryResults.onchange = function (onChangeResult) {
                if (onChangeResult.target) {
                    handlePermissionState((onChangeResult.target as PermissionStatus).state);
                }
            };
        }));
    }, [selectedAudioDevice]);







    const setupRecorder = async () => {
        try {
            setIsRecorderReady(false);
            const audio = selectedAudioDevice && selectedAudioDevice.length > 0
                ? { deviceId: selectedAudioDevice }
                : true;
            const stream = await navigator.mediaDevices.getUserMedia({ audio });

            setMediaStream(stream);
            let mimeType = '';

            // Create an AudioContext
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            setAudioContext(audioCtx);

            // Create an AnalyserNode
            const analyser = audioCtx.createAnalyser();
            analyser.smoothingTimeConstant = 0.85; // Adjust for desired smoothness
            analyser.fftSize = 1024; // Adjust for desired frequency resolution
            setAnalyserNode(analyser);

            // Connect the stream to the AudioContext
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                mimeType = 'audio/webm';
            } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
                mimeType = 'audio/ogg;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4';
            } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                mimeType = 'audio/webm;codecs=opus';}
            else {
                console.error('No supported MIME type for MediaRecorder found');
                alert('Recording is not supported on this browser.');
                return;
            }

            const recorder = new MediaRecorder(stream, {mimeType});
            setMediaRecorder(recorder);
            setIsRecorderReady(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Microphone access is needed to use this feature.');
        }
    };


    useEffect(() => {
        // Request microphone access and set up MediaRecorder
        setupRecorder()
    }, []);

    useEffect(() => {
        if (mediaRecorder) {
            const handleDataAvailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    console.log('Received audio chunk:', event.data.size, 'bytes');
                    audioChunksRef.current.push(event.data);
                }
            };

            const handleStop = () => {
                try {
                    if (audioChunksRef.current.length === 0) {
                        console.warn('No audio data was recorded.');
                        setIsRecording(false);
                        setAudioURL(null);
                        return;
                    }
                    const audioBlob = new Blob(audioChunksRef.current, {type: audioChunksRef.current[0].type});
                    console.log('Created Audio Blob:', audioBlob.size, 'bytes, Type:', audioBlob.type);
                    setAudioBlob(audioBlob); // Ensure this state is set
                    const audioURL = URL.createObjectURL(audioBlob);
                    setAudioURL(audioURL);
                    audioChunksRef.current = []; // Reset chunks
                } catch (err) {
                    console.error('Error creating audio blob:', err);
                    setAudioURL(null);
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
        if (!isRecorderReady || !mediaRecorder || mediaRecorder.state !== 'inactive') {
            return;
        }
        setAudioURL(null);
        audioChunksRef.current = []; // Reset chunks
        mediaRecorder.start();
        setRecordingStartTime(Date.now());
        setIsRecording(true);
    };

    const handlePressEnd = () => {
        if (!isRecorderReady || !mediaRecorder || mediaRecorder.state !== 'recording') {
            return;
        }
        const recordingDuration = Date.now() - (recordingStartTime || 0);
        if (recordingDuration < 1000) { // 1 second minimum
            // alert('Recording is too short. Please record for at least 1 second.');
            mediaRecorder.stop();
            setIsRecording(false);
            return;
        }
        mediaRecorder.stop();
        setIsRecording(false);
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

        // Close the AudioContext
        if (audioContext) {
            audioContext.close();
            setAudioContext(null);
        }

        // Reset the AnalyserNode
        setAnalyserNode(null);

        // Reset the recorder to allow new recordings
        setMediaRecorder(null);
        setMediaStream(null);
        setupRecorder();
    return () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
    };
}

    const sendMessage = async () => {
        try {
            const formData = new FormData();
            if (audioBlob) {
                console.log('Client-Side Recorded Audio Blob MIME Type:', audioBlob.type);

                // Get the MIME type from the blob
                const mimeType = audioBlob.type;

                // Function to map MIME types to file extensions
                function getFileExtension(mimeType: string) {
                    const type = mimeType.split(';')[0];
                    switch (type) {
                        case 'audio/mpeg':
                            return 'mp3';
                        case 'audio/webm':
                            return 'webm';
                        case 'audio/ogg':
                            return 'ogg';
                        case 'audio/mp4':
                            return 'mp4';
                        default:
                            return 'dat';
                    }
                }

                // Get the file extension based on MIME type
                const extension = getFileExtension(mimeType);
                const filename = `audio.${extension}`;

                // Append the audio blob with the correct filename
                formData.append('audio', audioBlob, filename);
            }
            formData.append('name', name);
            formData.append('phoneNumber', phoneNumber);

            const response = await fetch('/api/sendnote', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                console.error('Error:', result.error);
                alert(`Failed to send message: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        } finally {
            // setLoading(false);
        }
    };




    return isRecorderReady ? (
         <div className="h-[60vh] flex flex-col px-6">
            <div className="h-2/3">
                {isRecording && (<div className="h-full w-full flex items-center justify-center px-3">
                    <AudioVisualizer analyserNode={analyserNode} />
                </div>)}
                {audioURL && (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                        <div className="flex flex-col items-center gap-3">
                            <audio controls src={audioURL}/>
                            <button onClick={handleDelete} className="text-wheat">
                                <Trash className="h-8 w-8" />
                            </button>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <Input
                                className="w-full bg-onyx text-white"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                className="w-full bg-onyx text-white"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="h-1/3 flex flex-col items-center text-select-disabled">
                {!audioURL && (<NeumorphismButton
                    onMouseDown={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    className={isRecording ? 'recording' : ''}
                />)}
                {audioURL && (<Button className="bg-wheat text-onyx font-bold w-full mb-6 py-7" onClick={sendMessage}>
                    Send Note
                </Button>)}
            </div>
        </div>) : (
            <div className="h-[60vh] flex items-center justify-center">
                <BlinkBlur color="#F5DDB2" size="medium" text="" textColor="" />
            </div>
    );
}
