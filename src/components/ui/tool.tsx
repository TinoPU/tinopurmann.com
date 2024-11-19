import type {ToolProps} from "@/lib/interfaces";
import Tag from "@/components/ui/tag";
import {notionColorConversion} from "@/lib/utils";
import Share01Icon from "@/components/icons/share";
import tinycolor from 'tinycolor2';



export default function Tool({tool}: {tool: ToolProps}) {

    const categoryHandle = tool.category.slice(0,2)
    const categoryColors = notionColorConversion(tool.categoryColor)
    const tagColors = (tool.tagColors?.map((color) => notionColorConversion(color)))
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
            <div className="flex-grow flex flex-col gap-1">
                <div className="font-bold text-sm text-white">{tool.name}</div>
                <div className="flex flex-row gap-1 flex-wrap">
                    {tool.tags.slice(0, 3).map((tag, index) => (
                        <Tag key={index} tagName={tag} bgColor={tagColors[index]?.background ?? "#191919"} textColor={tagColors[index]?.text ?? "#D4D4D4"}/>)
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center text-gray-400">
                <a href={`${tool.link}`}>
                    <Share01Icon className="w-5"/>
                </a>
            </div>
        </div>
    )
}
