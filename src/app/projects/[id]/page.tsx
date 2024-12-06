import BackButton from "@/components/BackButton";
import Image from "next/image";
import {Client} from "@notionhq/client";




export default async function ProjectPage({params,}: { params: Promise<{ id: string }> }) {

    const id = (await params).id
    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    const blocks_response = await notion.blocks.children.list({
        block_id: id,
        page_size: 50,
    });

    console.log(blocks_response)


    return (
        <div className="flex flex-col items-center">
            <div className="w-full fixed top-0 left-0 right-0 z-10 text-gray-400 p-3">
                <BackButton />
            </div>
            <div className="w-full bg-gradient-to-b from-lime-200 bg-opacity-20 pb-6 md:flex md:flex-col md:items-center">
                <div className="flex items-center justify-center px-16 pt-6 pb-3 md:px-3 md:w-1/3">
                    <Image className="w-full drop-shadow-2xl" src="/assets/resources/tools.png" alt="Tools" width={80} height={80} unoptimized={true}/>
                </div>
                <p className="text-gray-400 px-3 text-sm">
                    Collection of tools I personally use and like. Send me stuff you like!
                </p>
            </div>
            <div className="w-full md:w-1/3">
                Content
            </div>
        </div>
    );
}