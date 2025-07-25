import QuickAccess from "@/components/ui/quickaccess";
import React from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import IconLibraryToggle from "@/components/icons/IconLibaryToggle";


type ContactGridProps = {
    setIsOpen: (value: boolean) => void;
    isOpen: boolean;
};

export default function ContactGrid({setIsOpen, isOpen}: ContactGridProps) {
    return (
        <div className="flex flex-col gap-2 rounded-sm md:bg-onyx md:rounded md:p-4 md:min-h-screen md:h-full">
            <div className="grid grid-cols-2 gap-2 pr-6 md:pr-0 md:flex md:flex-col">
                <div className="flex flex-col gap-2 md:w-full">
                    <div className="flex md:hidden"><VoiceRecorder/></div>
                    <div className="hidden md:flex flex-row items-center gap-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 hover:opacity-80 transition ${isOpen ? "rotate-0" : "rotate-180"}`}
                        >
                            <IconLibraryToggle
                                color="#b3b3b3"
                                size={28}
                            />
                        </button>
                        <div
                            className={`text-mobileWhite md:text-white text-sm font-bold transition duration-300 ease-in-out ${isOpen ? "md:hidden" : ""}`}>Reach
                            me
                        </div>
                    </div>
                    <QuickAccess image_src="/assets/contact/mail.svg" alt_text="Email"
                                 link="mailto:tinopurmann@gmail.com?subject=Message%20from%20Tinopurmann.com"/>
                </div>
                <div className="flex flex-col gap-2">
                    <QuickAccess image_src="/assets/contact/post.png" alt_text="Postcard"
                                 link="https://www.post.ch/en/sending-letters/sending-letters/postcard-creator-app#app-herunterladen"/>
                    <QuickAccess image_src="/assets/contact/calendly.svg" alt_text="Calendly"
                                 link="https://calendly.com/tinop/30min"/>
                </div>
                <div className="hidden md:gap-2 md:flex md:flex-col">
                        <QuickAccess image_src="/assets/contact/linkedin.svg" alt_text="Linkedin"
                                     link="https://www.linkedin.com/in/tinopurmann"/>
                        <QuickAccess image_src="/assets/contact/spotify.svg" alt_text="Spotify"
                                     link="https://open.spotify.com/user/119266932?si=1c266ef396104645"/>
                        <QuickAccess image_src="/assets/contact/instagram.svg" alt_text="Instagram"
                                     link="https://www.instagram.com/tinopurmann/profilecard/?igsh=MzRlODBiNWFlZA=="/>
                        <QuickAccess image_src="/assets/contact/github.svg" alt_text="GitHub"
                                     link="https://github.com/TinoPU"/>
                </div>
            </div>
        </div>
    );
}