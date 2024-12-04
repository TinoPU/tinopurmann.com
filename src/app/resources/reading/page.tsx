import Image from "next/image";
import BackButton from "@/components/BackButton";
import ReadingList from "@/components/ReadingList";





export default function Reading() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full fixed top-0 left-0 right-0 z-10 text-gray-400 p-3">
                <BackButton />
            </div>
            <div className="w-full bg-gradient-to-b from-[#5e6d86] bg-opacity-20 pb-6 md:flex md:flex-col md:items-center">
                <div className="flex items-center justify-center px-16 pt-6 pb-3 md:px-3 md:w-1/3">
                    <Image className="w-full drop-shadow-2xl" src="/assets/resources/reading.jpg" alt="Newsletters" width={80} height={80} unoptimized={true}/>
                </div>
                <p className="text-gray-400 px-3 text-sm">
                    Current reading list. I need suggestions.
                </p>
            </div>
            <div className="w-full md:w-1/3">
                <ReadingList />
            </div>
        </div>
    )
}