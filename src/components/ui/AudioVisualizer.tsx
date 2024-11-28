// Create a new file: AudioVisualizer.tsx

import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
    analyserNode: AnalyserNode;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ analyserNode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!analyserNode) return;

        const canvas = canvasRef.current!;
        const canvasCtx = canvas.getContext('2d')!;
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestAnimationFrame(draw);

            analyserNode.getByteTimeDomainData(dataArray);

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = '#F5DDB2'; // Waveform color

            canvasCtx.beginPath();

            const sliceWidth = (canvas.width * 3.0) / bufferLength;
            let previousX = 0;
            let previousY = (dataArray[0] / 128.0) * (canvas.height / 2);

            canvasCtx.moveTo(previousX, previousY);

            for (let i = 1; i < bufferLength; i++) {
                const x = i * sliceWidth;
                const v = dataArray[i] / 128.0;
                const y = v * (canvas.height / 2);

                const cpX = (previousX + x) / 2;
                const cpY = (previousY + y) / 2;

                canvasCtx.quadraticCurveTo(previousX, previousY, cpX, cpY);

                previousX = x;
                previousY = y;
            }

            canvasCtx.stroke();
        };

        draw();

        // Cleanup on unmount
        return () => {
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [analyserNode]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />;
};

export default AudioVisualizer;
