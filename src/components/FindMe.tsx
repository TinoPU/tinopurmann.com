import QuickAccess from "@/components/ui/quickaccess";
import React from "react";
import GoogleMapView from "@/components/GoogleMapView";
import {MapProps} from "@/lib/interfaces";


export default function FindMe(location: MapProps) {

    return (
        <div>
            <div className="text-white text-2xl font-bold">Find me</div>
            <div className="pr-6 rounded-sm">
                <GoogleMapView lat={location.lat} lng={location.lng}/>
            </div>
            <div className="grid grid-cols-2 gap-3 pr-6">
                <div className="flex flex-col gap-3">
                    <QuickAccess image_src="/assets/contact/linkedin.svg" alt_text="Linkedin"
                                 link="https://www.linkedin.com/in/tinopurmann"/>
                    <QuickAccess image_src="/assets/contact/spotify.svg" alt_text="Spotify"
                                 link="https://open.spotify.com/user/119266932?si=1c266ef396104645"/>
                </div>
                <div className="flex flex-col gap-3">
                    <QuickAccess image_src="/assets/contact/instagram.svg" alt_text="Instagram"
                                 link="https://www.instagram.com/tinopurmann/profilecard/?igsh=MzRlODBiNWFlZA=="/>
                    <QuickAccess image_src="/assets/contact/github.svg" alt_text="GitHub" link="https://github.com/TinoPU"/>
                </div>
            </div>
        </div>
    )
}