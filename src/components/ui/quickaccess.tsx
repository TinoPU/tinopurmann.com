"use client"

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

type QuickAccessProps = {
    image_src: string;
    alt_text: string;
    link: string;
};





export default function QuickAccess({ image_src, alt_text, link }: QuickAccessProps) {

    const containerRef = useRef(null);
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                // Hide text if container width less than 120px (adjust as needed)
                setShowText(width >= 120);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);



    return (
        <a href={link} className="block">
            <div
                ref={containerRef}
                className={`flex bg-mobileOnyx md:bg-onyx rounded-sm md:max-h-14 overflow-hidden ${ showText ? "hover:bg-onyxLight w-full" : "md:w-auto"}`}>
                {/* Image — fixed size, doesn't shrink */}
                <div className="w-12 shrink-0">
                    <Image
                        className={`h-full w-full object-cover rounded-sm md:rounded ${showText ? "" : "hover:brightness-125"}`}
                        src={image_src}
                        alt={alt_text}
                        width={60}
                        height={60}
                    />
                </div>
                {/* Text — shrinkable, truncates if needed */}
                <div className={`${showText ? "items-center px-2 md:px-4 text-xs md:text-sm text-white font-bold md:font-medium overflow-hidden flex" : "hidden"}`}>
                    <p>{alt_text}</p>
                </div>
            </div>
        </a>
    );
}
