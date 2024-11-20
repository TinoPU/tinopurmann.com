import QuickAccess from "@/components/ui/quickaccess";
import React from "react";


export default function FindMe() {

    return (
        <div>
            <QuickAccess image_src="/assets/contact/spotify.svg" alt_text="Spotify"
                         link="https://open.spotify.com/user/119266932?si=1c266ef396104645"/>
            <QuickAccess image_src="/assets/contact/github.svg" alt_text="GitHub" link="https://github.com/TinoPU"/>
            <QuickAccess image_src="/assets/contact/instagram.svg" alt_text="Instagram"
                         link="https://www.instagram.com/tinopurmann/profilecard/?igsh=MzRlODBiNWFlZA=="/>
            <QuickAccess image_src="/assets/contact/linkedin.svg" alt_text="Linkedin"
                         link="https://www.linkedin.com/in/tinopurmann"/>
        </div>
    )
}