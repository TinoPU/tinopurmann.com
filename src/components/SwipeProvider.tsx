// src/components/SwipeProvider.tsx
"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SwipeProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX.current = e.changedTouches[0].screenX;
            handleSwipeGesture();
        };

        const handleSwipeGesture = () => {
            if (touchStartX.current === null || touchEndX.current === null) return;

            const deltaX = touchEndX.current - touchStartX.current;
            const minSwipeDistance = 50;

            if (deltaX > minSwipeDistance) {
                router.back();
            }

            touchStartX.current = null;
            touchEndX.current = null;
        };

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchEnd, false);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart, false);
            document.removeEventListener('touchend', handleTouchEnd, false);
        };
    }, [router]);

    return <>{children}</>;
}
