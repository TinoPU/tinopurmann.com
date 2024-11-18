import QuickAccess from "@/components/ui/quickaccess";
import React from "react";


export default function ContactGrid() {
    return (
        <div className="grid grid-cols-2 gap-3 pr-6">
            <div className="flex flex-col gap-3">
                <QuickAccess image_src="/assets/microphone.svg" alt_text="Leave a note"
                             link="/voicenote"/>
                <QuickAccess image_src="/assets/linkedin.svg" alt_text="Linkedin"
                             link="https://www.linkedin.com/in/tinopurmann"/>
                <QuickAccess image_src="/assets/calendly.svg" alt_text="Calendly"
                             link="https://calendly.com/tino-p1q/30min"/>
                <QuickAccess image_src="/assets/spotify.svg" alt_text="Spotify"
                             link="https://open.spotify.com/user/119266932?si=1c266ef396104645"/>
            </div>
            <div className="flex flex-col gap-3">
                <QuickAccess image_src="/assets/github.svg" alt_text="GitHub" link="https://github.com/TinoPU"/>
                <QuickAccess image_src="/assets/instagram.svg" alt_text="Instagram"
                             link="https://www.instagram.com/tinopurmann/profilecard/?igsh=MzRlODBiNWFlZA=="/>
                <QuickAccess image_src="/assets/mail.svg" alt_text="Please don't email me" link="mailto:tinopurmann@gmail.com"/>
            </div>
        </div>
    );
}