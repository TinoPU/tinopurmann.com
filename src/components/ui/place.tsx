import Image from "next/image";
import {Badge} from "@/components/ui/badge";

interface PlaceProps {
    image_src: string;
    alt_text: string;
    link?: string;
    title: string;
}


export default function Place(place: PlaceProps) {
    
    return (
        <div className="flex flex-row w-full gap-3">
            <Image src={place.image_src} alt={place.alt_text} width={50} height={50}/>
            <a href={place.link} className="w-full h-[50px]">
                <div id="content" className="flex flex-row w-full h-full justify-between">
                    <div className="font-bold text-sm text-white">{place.title}</div>
                    <Badge className="bg-[#4285F4] text-white hover:bg-[#76A7FA] my-auto">Open in Google Maps</Badge>
                </div>
            </a>
        </div>
    );
}