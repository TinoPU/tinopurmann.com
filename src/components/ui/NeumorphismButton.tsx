"use client";

import Mic02Icon from "@/components/icons/microphone";

const ButtonWrapper = () => {
    return (
        <div className="min-h-[200px] flex items-center justify-center">
            <NeumorphismButton />
        </div>
    );
};

const NeumorphismButton = () => {
    const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <button
            onContextMenu={handleContextMenu}
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
    `}
        >
            <Mic02Icon className="h-8 w-8 text-gray-400" />
        </button>
    );
};

export default ButtonWrapper;