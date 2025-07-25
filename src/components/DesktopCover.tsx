import Image from "next/image";
import {Button} from "@/components/ui/button";
import VoiceRecorder from "@/components/VoiceRecorder";
import ExpandedPreview from "@/components/ui/Expanded_preview";
import ProjectsGallery from "@/components/ProjectsGallery";


export default function DesktopCover() {
    return (
        <div className="hidden md:flex md:h-screen">
            <div className="relative max-h-fit w-full flex flex-col rounded bg-onyx overflow-y-auto scrollbar">
                <div className="absolute z-0 w-full h-1/2 bg-gradient-to-b from-[#7191B7] rounded"/>
                <div className="flex flex-row z-10 px-4 py-8 gap-4">
                    <Image className="w-56 drop-shadow-2xl rounded" src="/assets/Headshot.png" alt="Tools" width={40} height={40} unoptimized={true}/>
                    <div className="flex flex-col justify-end">
                        <h1 className="font-normal text-md text-mobileWhite pb-4">Tino Purmann</h1>
                        <h1 className="font-extrabold text-7xl text-white">Hello There!</h1>
                        <h1 className="font-normal text-md text-mobileWhite pt-4">Ex-Founder | Business, Operations & Product</h1>
                        <div className="flex flex-row pt-2 items-center">
                            <Image className="w-6 h-6 mr-2" src={"/assets/logoround.png"} alt="logo" width={6} height={6}
                                   unoptimized={true}></Image>
                            <div className="flex flex-row">
                                <h1 className="font-light text-sm text-mobileWhite mr-1">Made for</h1>
                                <h1 className="font-bold text-sm text-mobileWhite">You</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full h-full px-8 py-4 z-20 backdrop-blur-md bg-onyx/30">
                    <div className="flex flex-row">
                        <div className="flex justify-center items-center">
                            <VoiceRecorder/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button variant="tab" size="tab">Projects</Button>
                        <Button variant="tab" size="tab">Resources</Button>
                    </div>
                    <div className="-mb-4">
                        <ExpandedPreview img_src="/assets/resources/tools.png" name="Tools I use" link="/resources/tools"
                                         description="Collection of tools I personally use and like. Send me stuff you like!" footernote="62 Tools"></ExpandedPreview>

                        <ExpandedPreview img_src="/assets/resources/places.jpg" name="Favorite places" link="/resources/places"
                                         description="My favorite cafés, bars, restaurants and more across the world" footernote="200+ Places"></ExpandedPreview>

                        <ExpandedPreview img_src="/assets/resources/news.jpg" name="Newsletter top picks" link="/resources/newsletters"
                                         description="Newsletters I subscribed to at some point. Send me your favorites!" footernote="14 Newsletters"></ExpandedPreview>

                        <ExpandedPreview img_src="/assets/resources/reading.jpg" name="Tools I use" link="/resources/reading"
                                         description="Current reading list. I need suggestions." footernote="6 items"></ExpandedPreview>
                    </div>
                    <ProjectsGallery />
                </div>
            </div>
        </div>
    )
}