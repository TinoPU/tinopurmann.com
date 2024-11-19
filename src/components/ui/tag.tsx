
interface TagProps {
    tagName: string;
    bgColor: string;
    textColor: string;
}

export default function Tag(TagProps: TagProps) {
    return (
        <div className="flex items-center justify-center text-xs font-semibold p-1 rounded-sm text-nowrap max-w-20"
             style={{
                 color: TagProps?.textColor,
                 backgroundColor: TagProps?.bgColor,
             }}>
            <p className="truncate">{TagProps.tagName}</p>
        </div>
    );
}