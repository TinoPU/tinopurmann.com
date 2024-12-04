import Image from "next/image";

interface QuickAccessProps {
    image_src: string;
    alt_text: string;
    link?: string;
}

export default function QuickAccess({image_src, alt_text, link}: QuickAccessProps) {
    return (
        <a href={link}>
            <div className="flex flex-row bg-onyx hover:bg-onyxLight rounded-sm md:w-48">
                <div className="w-1/3">
                    <Image className="h-full w-full rounded-sm" src={image_src} alt={alt_text} width={60} height={60}/>
                </div>
                <div className="px-2 text-xs md:text-sm w-2/3 flex justify-start items-center text-white font-bold">
                    <p>{alt_text}</p>
                </div>
            </div>
        </a>
)
}