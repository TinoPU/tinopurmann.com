import Image from "next/image";


export default function ExpandedPreview({img_src, name, link, description }: {img_src: string, name: string, link: string, description: string}) {
    return (
        <div className="flex-shrink-0 md:hover:bg-onyxLight rounded-sm p-1.5">
            <a href={link}>
                <div className="flex flex-row gap-4">
                    <Image className="object-cover h-24 w-24 rounded-sm md:h-32 md:w-32" src={img_src} alt={name} height={30} width={30} unoptimized={true}/>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-white text-md font-medium">{name}</h1>
                        <p className="text-textLight text-sm">{description}</p>
                        <p className="text-white text-xs font-medium">86 tools</p>
                    </div>
                </div>
            </a>
            <div className="mt-8 bg-mobileOnyx h-[1px] w-full"/>
        </div>
    );
}