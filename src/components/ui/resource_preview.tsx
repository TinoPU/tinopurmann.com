import Image from "next/image";


export default function ResourcePreview({img_src, name}: {img_src: string, name: string}) {
    return (
        <div className="flex-shrink-0">
            <Image className="object-cover h-24 w-24" src={img_src} alt={name} height={30} width={30} unoptimized={true}/>
            <p className="text-gray-400 pt-1 text-xs">{name}</p>
        </div>
    );
}