import QuickAccess from "@/components/ui/quickaccess";
import React from "react";


export default function ContactGrid() {
    return (
        <div className="grid grid-cols-2 gap-3 pr-6">
            <div className="flex flex-col gap-3">
                <QuickAccess image_src="/assets/contact/microphone.svg" alt_text="Leave a note"
                             link="/voicenote"/>
                <QuickAccess image_src="/assets/contact/calendly.svg" alt_text="Calendly"
                             link="https://calendly.com/tino-p1q/30min"/>
            </div>
            <div className="flex flex-col gap-3">
                <QuickAccess image_src="/assets/contact/post.png" alt_text="Send me a Postcard" link="https://www.post.ch/en/sending-letters/sending-letters/postcard-creator-app#app-herunterladen"/>
                <QuickAccess image_src="/assets/contact/mail.svg" alt_text="Please don't email me" link="mailto:tinopurmann@gmail.com"/>
            </div>
        </div>
    );
}