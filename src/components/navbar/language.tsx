import { Languages } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { uselanguageAll } from "@/querys";

const Language = () => {
    const language = uselanguageAll()?.data
    console.log(language);
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Languages /></DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[20px]">
                <DropdownMenuItem>Uz</DropdownMenuItem>
                <DropdownMenuItem>Ru</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default Language;