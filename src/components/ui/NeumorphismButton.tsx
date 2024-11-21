"use client";

import React from 'react';
import Mic02Icon from "@/components/icons/microphone";

type NeumorphismButtonProps = {
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onTouchStart?: () => void;
    onTouchEnd?: () => void;
    className?: string;
};

const NeumorphismButton: React.FC<NeumorphismButtonProps> = ({
                                                                 onMouseDown,
                                                                 onMouseUp,
                                                                 onTouchStart,
                                                                 onTouchEnd,
                                                                 className = '',
                                                             }) => {
    const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <button
            onContextMenu={handleContextMenu}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`
        p-8 rounded-full 
        flex items-center gap-2 
        text-slate-500
        shadow-[-5px_-5px_10px_rgba(156,_163,_175,_0.6),_5px_5px_10px_rgba(156,_163,_175,_0.4)]
        transition-all
        active:shadow-[-1px_-1px_5px_rgba(245,_221,_178,_1),_1px_1px_5px_rgba(255,_255,_255,_0.3),inset_-2px_-2px_5px_rgba(245,_221,_178,_1),inset_2px_2px_4px_rgba(255,_255,_255,_0.3)]
        active:text-wheat
        active:ring-wheat
        bg-onyx
        ${className}
    `}
        >
            <Mic02Icon className="h-8 w-8 text-gray-400" />
        </button>
    );
};

export default NeumorphismButton;
