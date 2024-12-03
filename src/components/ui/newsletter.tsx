import type {NewsletterProps} from "@/lib/interfaces";
import Tag from "@/components/ui/tag";
import {notionColorConversion} from "@/lib/utils";
import tinycolor from 'tinycolor2';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import InformationCircleIcon from "@/components/icons/info";



export default function Newsletter({newsletter}: {newsletter: NewsletterProps}) {

    const categoryHandle = newsletter.category.slice(0,2)
    const categoryColors = notionColorConversion(newsletter.categoryColor)
    const tagColors = (newsletter.tagColors?.map((color) => notionColorConversion(color)))
    const frequencyColors = notionColorConversion(newsletter.frequencyColor)
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
                    <SheetTrigger className="w-full flex-row flex">
                        <div className="items-start flex flex-col flex-grow">
                            <div className="font-bold text-sm text-white">{newsletter.name}</div>
                            <div className="flex flex-row gap-1 flex-wrap">
                                {newsletter.tags.slice(0, 3).map((tag, index) => (
                                    <Tag key={index} tagName={tag} bgColor={tagColors[index]?.background ?? "#191919"}
                                         textColor={tagColors[index]?.text ?? "#D4D4D4"} widthLimit={96}/>)
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-gray-400">
                            <InformationCircleIcon className="w-5"/>
                        </div>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                        <SheetHeader>
                            <SheetTitle className="text-wheat gap-2 flex flex-row">{newsletter.name}
                                <div className="flex flex-row gap-1 flex-wrap self-end">
                                        <Tag tagName={newsletter.frequency}
                                             bgColor={frequencyColors?.background ?? "#191919"}
                                             textColor={frequencyColors?.text ?? "#D4D4D4"}/>
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                                {newsletter.notes}
                            </SheetDescription>
                                <div className="text-lg text-white py-2">Category</div>
                                <Tag tagName={newsletter.category} bgColor={categoryColors?.background ?? "#191919"}
                                     textColor={categoryColors?.text ?? "#D4D4D4"}/>
                                <div className="text-lg text-white py-2">Tags</div>
                                <div className="flex flex-row gap-1 flex-wrap pb-3">
                                    {newsletter.tags.map((tag, index) => (
                                        <Tag key={index} tagName={tag}
                                             bgColor={tagColors[index]?.background ?? "#191919"}
                                             textColor={tagColors[index]?.text ?? "#D4D4D4"}/>)
                                    )}
                                </div>
                                <Button className="bg-wheat text-onyx font-bold w-full mb-6 py-7" asChild>
                                    <Link href={newsletter.link}>Signup</Link>
                                </Button>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
