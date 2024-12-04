import Image from "next/image";


export default function ResourcePreview({img_src, name, link}: {img_src: string, name: string, link: string}) {
    return (
        <div className="flex-shrink-0 md:hover:bg-onyxLight rounded-sm p-1.5">
            <a href={link}>
                <Image className="object-cover h-24 w-24 rounded-sm md:h-32 md:w-32" src={img_src} alt={name} height={30} width={30} unoptimized={true}/>
                <p className="text-gray-400 pt-1 text-xs md:text-sm">{name}</p>
            </a>
        </div>
    );
}