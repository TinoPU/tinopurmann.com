"use client";

import Image from "next/image";
import BackButton from "@/components/BackButton";
import Place from "@/components/ui/place";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";





export default function PlacePage() {

    const router = useRouter();

    const handleButtonClick = () => {
        router.push('https://maps.app.goo.gl/4ecuGGCTLv5utXar7'); // Replace with your desired URL
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full fixed top-0 left-0 right-0 z-10 text-gray-400 p-3">
                <BackButton />
            </div>
            <div className="w-full bg-gradient-to-b from-[#F6EED8] bg-opacity-20 pb-6 md:flex md:flex-col md:items-center">
                <div className="flex items-center justify-center px-16 pt-6 pb-3 md:px-3 md:w-1/3">
                    <Image className="w-full drop-shadow-2xl" src="/assets/resources/places.jpg" alt="Places" width={80} height={80} unoptimized={true}/>
                </div>
                <p className="text-gray-400 px-3 text-sm md:w-1/3">
                    My recs. Send me yours! 🌍
                </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/3 overflow-hidden px-4">
                <Place image_src="/assets/resources/restaurants.svg" alt_text="Restaurants" title="Restaurants" link="https://maps.app.goo.gl/YPHGzt5hSrXUDKG89"/>
                <Place image_src="/assets/resources/coffee.svg" alt_text="Cafés" title="Cafés" link="https://maps.app.goo.gl/r6PEcxUKuUu9FkWJ7"/>
                <Place image_src="/assets/resources/bar.svg" alt_text="Bars" title="Bars" link="https://maps.app.goo.gl/HH7QRS1WaEcYeSa98"/>
                <Place image_src="/assets/resources/kite.svg" alt_text="Kite Spots" title="Kite Spots" link="https://maps.app.goo.gl/GWWKNJaAbSgQ2Tus8"/>
            </div>
            <div className=" w-full flex justify-center items-center mt-12 md:w-1/3">
            <Button className="py-7 w-2/3 mb-6" onClick={handleButtonClick}>Recommend a place</Button>
            </div>
        </div>
    )
}