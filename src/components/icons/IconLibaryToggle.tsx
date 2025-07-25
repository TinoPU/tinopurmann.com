// components/icons/IconLibraryToggle.tsx

import React from 'react';

export default function IconLibraryToggle({
                                              size = 24,
                                              color = '#B3B3B3', // Spotify uses a muted gray
                                          }: {
    size?: number;
    color?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Outer rectangle */}
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2" stroke={color} fill="none" />

            {/* Vertical divider line */}
            <line x1="9" y1="4" x2="9" y2="20" stroke={color} />

            {/* Right-facing chevron (arrow) */}
            <polyline points="13 9 16 12 13 15" stroke={color} fill="none" />
        </svg>
    );
}
