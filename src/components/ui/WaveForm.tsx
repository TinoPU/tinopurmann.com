// components/Waveform.tsx
"use client";

import React, { useEffect } from 'react';

export default function Waveform() {
    useEffect(() => {
        (async () => {
            // Dynamically import 'ldrs' only on the client side
            const { waveform } = await import('ldrs');
            waveform.register();
        })();
    }, []);

    return (
        <l-waveform
            size="60"
            stroke="3.5"
            speed="1"
            color="#F5DDB2"
        ></l-waveform>
    );
}
