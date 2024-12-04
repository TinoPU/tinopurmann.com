import Image from "next/image";


export default function ProjectPreview({img_src, title, description}: {img_src: string, title: string, description: string}) {
    return (
        <div className="flex-shrink-0 max-w-40 md:max-w-52 p-2 md:hover:bg-onyxLight rounded-sm">
            <Image className="bg-black object-cover h-36 w-36 md:h-48 md:w-48 rounded-sm" src={img_src} alt={title} height={60} width={60}/>
            <p className="text-gray-400 pt-1 font-bold text-xs md:text-sm">{title}</p>
            <p className="text-gray-400 text-xs md:text-sm">{description}</p>
        </div>
    );
}