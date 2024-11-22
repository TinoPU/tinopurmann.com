import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import QuickAccess from "@/components/ui/quickaccess";
import React from "react";
import VoiceNote from "@/components/VoiceNote";


export default function VoiceRecorder() {


    return (
        <Sheet>
            <SheetTrigger className="w-full">
                <QuickAccess image_src="/assets/contact/microphone.svg" alt_text="Leave a note"/>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle className="text-wheat gap-2 flex flex-row">
                       Tell me Something
                    </SheetTitle>
                    <VoiceNote/>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}