
interface TagProps {
    tagName: string;
    bgColor: string;
    textColor: string;
    widthLimit?: number;
}

export default function Tag(TagProps: TagProps) {


    return (
        <div className="flex items-center justify-center text-xs font-semibold p-1 rounded-sm text-nowrap"
             style={{
                 color: TagProps?.textColor,
                 backgroundColor: TagProps?.bgColor,
                 ...(TagProps.widthLimit && { maxWidth: `${TagProps.widthLimit}px` })
        }}>
            <div className="truncate">{TagProps.tagName}</div>
        </div>
    );
}