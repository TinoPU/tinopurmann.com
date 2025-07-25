"use client";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import QuickAccess from "@/components/ui/quickaccess";
import React, {useCallback, useState} from "react";
import VoiceNote from "@/components/VoiceNote";
import Image from "next/image";


export default function VoiceRecorder() {
    const [open, setOpen] = useState(false);

    const Close = useCallback(() => {
        setOpen(false);
    }, []);



    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="w-full">
                <div className="md:hidden">
                    <QuickAccess image_src="/assets/contact/microphone.svg" alt_text="Leave a note"/>
                </div>
                <div className="hidden md:block">
                    <Image className="w-14 transition-transform duration-300 hover:scale-110 hover:brightness-125" src={"/assets/spotifyMic.png"} alt="Mic Icon" width={8} height={8} unoptimized={true}/>
                </div>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle className="text-primary gap-2 flex flex-row">
                       Tell me Something
                    </SheetTitle>
                    <div className="w-full flex justify-center">
                        <VoiceNote onClose={Close}/>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}