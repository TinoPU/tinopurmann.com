"use client";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import QuickAccess from "@/components/ui/quickaccess";
import React, {useCallback, useState} from "react";
import VoiceNote from "@/components/VoiceNote";


export default function VoiceRecorder() {
    const [open, setOpen] = useState(false);

    const Close = useCallback(() => {
        setOpen(false);
    }, []);



    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="w-full">
                <QuickAccess image_src="/assets/contact/microphone.svg" alt_text="Leave a note"/>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle className="text-wheat gap-2 flex flex-row">
                       Tell me Something
                    </SheetTitle>
                    <VoiceNote onClose={Close}/>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}