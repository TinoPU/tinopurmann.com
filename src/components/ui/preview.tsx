import Image from "next/image";


export default function Preview({img_src, title, description}: {img_src: string, title: string, description: string}) {
    return (
        <div className="flex-shrink-0">
            <Image className="object-cover h-36 w-36" src={img_src} alt={title} height={60} width={60}/>
            <p className="text-gray-400">{title}</p>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}