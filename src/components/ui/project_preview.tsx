import Image from "next/image";


export default function ProjectPreview({img_src, title, description}: {img_src: string, title: string, description: string}) {
    return (
        <div className="flex-shrink-0 max-w-36">
            <Image className="object-cover h-36 w-36" src={img_src} alt={title} height={60} width={60}/>
            <p className="text-gray-400 pt-1 font-bold">{title}</p>
            <p className="text-gray-400 text-xs">{description}</p>
        </div>
    );
}