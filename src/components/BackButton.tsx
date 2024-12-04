// src/components/BackButton.tsx
"use client";

import { useRouter } from 'next/navigation';
import Back from "@/components/icons/back";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()}>
            <Back />
        </button>
    );
}