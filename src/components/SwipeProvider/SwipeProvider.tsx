// src/components/SwipeRouter.tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SwipeProvider.module.css';

interface SwipeProviderProps {
    children: ReactNode;
}

export default function SwipeProvider({ children }: SwipeProviderProps) {
    const router = useRouter();

    // Refs to track touch positions
    const touchStartX = useRef<number | null>(null);
    const touchCurrentX = useRef<number | null>(null);
    const isNoSwipe = useRef<boolean>(false);

    // State to control visual feedback
    const [translateX, setTranslateX] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            // Check if touch started on an element that should disable swipe
            const targetElement = e.target as HTMLElement;
            if (targetElement.closest('.no-swipe')) {
                isNoSwipe.current = true;
                return;
            }

            isNoSwipe.current = false;
            touchStartX.current = e.touches[0].clientX;
            touchCurrentX.current = touchStartX.current;
            setIsAnimating(false);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isNoSwipe.current || touchStartX.current === null) return;

            touchCurrentX.current = e.touches[0].clientX;
            let deltaX = touchCurrentX.current - touchStartX.current;

            if (deltaX > 0) {
                const maxDeltaX = (window.innerWidth / 3) * 2; // Adjust this threshold
                deltaX = Math.min(deltaX, maxDeltaX);

                window.requestAnimationFrame(() => {
                    setTranslateX(deltaX);
                });
            }
        };

        const handleTouchEnd = () => {
            if (isNoSwipe.current || touchStartX.current === null) {
                resetTouchState();
                return;
            }

            const deltaX = (touchCurrentX.current ?? 0) - touchStartX.current;
            const minSwipeDistance = 100; // Adjust this threshold

            setIsAnimating(true); // Enable animation for snapping back or navigating

            if (deltaX > minSwipeDistance) {
                // Swipe distance sufficient to navigate back
                setTranslateX(window.innerWidth); // Move content off-screen
                setTimeout(() => {
                    router.back();
                    resetTouchState();
                }, 100); // Delay to match CSS transition duration
            } else {
                // Not enough swipe distance, snap back to original position
                setTranslateX(0);
                resetTouchState();
            }
        };

        const resetTouchState = () => {
            touchStartX.current = null;
            touchCurrentX.current = null;
            isNoSwipe.current = false;
        };

        // Attach touch event listeners
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);

        // Cleanup on unmount
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [router]);

    return (
        <div
            className={`${styles.swipeContainer} ${isAnimating ? styles.animating : ''}`}
            style={{ transform: `translateX(${translateX}px)` }}
        >
            {children}
        </div>
    );
}