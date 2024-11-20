// src/components/SwipeRouter.tsx
"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SwipeProviderProps {
    children: ReactNode;
}

export default function SwipeProvider({ children }: SwipeProviderProps) {
    const router = useRouter();
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const isNoSwipe = useRef<boolean>(false);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            // Check if the touchstart event occurred within a 'no-swipe' element
            const targetElement = e.target as HTMLElement;
            if (targetElement.closest('.no-swipe')) {
                isNoSwipe.current = true;
                return;
            }

            isNoSwipe.current = false;
            touchStartX.current = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isNoSwipe.current) {
                // Reset and exit if swipe should be disabled
                touchStartX.current = null;
                touchEndX.current = null;
                isNoSwipe.current = false;
                return;
            }

            touchEndX.current = e.changedTouches[0].screenX;
            handleSwipeGesture();
        };

        const handleSwipeGesture = () => {
            if (touchStartX.current === null || touchEndX.current === null) return;

            const deltaX = touchEndX.current - touchStartX.current;
            const minSwipeDistance = 120; // Adjust as needed

            if (deltaX > minSwipeDistance) {
                // Swipe right detected, go back to the previous page
                router.back();
            }

            // Reset touch positions
            touchStartX.current = null;
            touchEndX.current = null;
        };

        // Attach event listeners
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Clean up event listeners on unmount
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [router]);

    return <>{children}</>;
}
