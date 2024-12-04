import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AudioinputIcon from "@/components/icons/audioinput";
import {AudioDevice} from "@/lib/interfaces";

interface MicSelectProps {
    options: AudioDevice[];
    setterfunction: (option: string) => void;
    currentOption: string | null;
}


export default function MicSelect({ options, setterfunction, currentOption }: MicSelectProps) {

    const color = currentOption
        ? "#77dd77"
        : "rgb(100 116 139)";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <AudioinputIcon className="w-8 h-8" style={{ color: color }} />            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Input</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options.map((option) => (
                    <DropdownMenuItem key={option.id} onClick={() => setterfunction(option.id)}>
                        {option.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}