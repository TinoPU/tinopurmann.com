import Image from "next/image";
import BackButton from "@/components/BackButton";
import NewsletterList from "@/components/NewsletterList";





export default function NewsletterPage() {
    return (
        <div className="flex flex-col">
            <div className="w-full fixed top-0 left-0 right-0 z-10 text-gray-400 p-3">
                <BackButton />
            </div>
            <div className="bg-gradient-to-b from-[#EAE7DF] bg-opacity-20 pb-6">
                <div className="flex items-center justify-center px-16 pt-6 pb-3">
                    <Image className="w-full drop-shadow-2xl" src="/assets/resources/news.jpg" alt="Newsletters" width={80} height={80} unoptimized={true}/>
                </div>
                <p className="text-gray-400 px-3 text-sm">
                    Newsletters I subscribed to at some point. Send me your favorites!
                </p>
            </div>
            <NewsletterList />
        </div>
    )
}