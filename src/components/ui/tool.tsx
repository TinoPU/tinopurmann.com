import type {ToolProps} from "@/lib/interfaces";
import Tag from "@/components/ui/tag";
import {notionColorConversion} from "@/lib/utils";
import Share01Icon from "@/components/icons/share";
import tinycolor from 'tinycolor2';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Link from "next/link";



export default function Tool({tool}: {tool: ToolProps}) {

    const categoryHandle = tool.category.slice(0,2)
    const categoryColors = notionColorConversion(tool.categoryColor)
    const tagColors = (tool.tagColors?.map((color) => notionColorConversion(color)))
    const userColors = (tool.userColors?.map((color) => notionColorConversion(color)))
    const tinyCol = tinycolor(categoryColors?.background)
    const bg_color = tinyCol.saturate(40).brighten(15).toString()

    return (
        <div className="flex flex-row items-center w-full gap-3">
            <div className="flex justify-center text-md font-bold items-center rounded-sm text-wheat"
             style={{
                height: "50px",
                width: "50px",
                // color: categoryColors?.text,
                backgroundColor: bg_color,
            }}>
                {categoryHandle}
            </div>
            <div className="flex-grow flex flex-col gap-1 items-start">
                <Sheet>
                    <SheetTrigger>
                        <div className="w-full items-start flex flex-col">
                            <div className="font-bold text-sm text-white">{tool.name}</div>
                            <div className="flex flex-row gap-1 flex-wrap">
                                {tool.tags.slice(0, 3).map((tag, index) => (
                                    <Tag key={index} tagName={tag} bgColor={tagColors[index]?.background ?? "#191919"}
                                         textColor={tagColors[index]?.text ?? "#D4D4D4"} widthLimit={96}/>)
                                )}
                            </div>
                        </div>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                        <SheetHeader>
                            <SheetTitle className="text-wheat gap-2 flex flex-row">{tool.name}
                                <div className="flex flex-row gap-1 flex-wrap self-end">
                                    {tool.user.map((user, index) => (
                                        <Tag key={index} tagName={user}
                                             bgColor={userColors[index]?.background ?? "#191919"}
                                             textColor={userColors[index]?.text ?? "#D4D4D4"}/>)
                                    )}
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                                {tool.description}
                                <div className="text-lg text-white py-2">Category</div>
                                <Tag tagName={tool.category} bgColor={categoryColors?.background ?? "#191919"}
                                     textColor={categoryColors?.text ?? "#D4D4D4"}/>
                                <div className="text-lg text-white py-2">Tags</div>
                                <div className="flex flex-row gap-1 flex-wrap pb-3">
                                    {tool.tags.map((tag, index) => (
                                        <Tag key={index} tagName={tag}
                                             bgColor={tagColors[index]?.background ?? "#191919"}
                                             textColor={tagColors[index]?.text ?? "#D4D4D4"}/>)
                                    )}
                                </div>
                                <Button className="bg-wheat text-onyx font-bold w-full mb-6" asChild>
                                    <Link href={tool.link}>Open Website</Link>
                                </Button>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex items-center justify-center text-gray-400">
                <a href={`${tool.link}`}>
                    <Share01Icon className="w-5"/>
                </a>
            </div>
        </div>
    )
}
